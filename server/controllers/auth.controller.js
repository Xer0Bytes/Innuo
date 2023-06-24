//models
import User from "../models/user.model.js";
import Verification from "../models/verification.model.js";
import { sendVerificationEmail } from "../middleware/sendVerificationEmail.js";

//pw hashing
import bcrypt from "bcrypt";

//env variable
import dotenv from "dotenv";

//token
import jwt from "jsonwebtoken";

//error handling
import createError from "../utils/createError.js";

//email handling
import nodemailer from "nodemailer";

//uuid
import { v4 as uuidv4 } from "uuid";

//path for static verified page
import path from "path";

dotenv.config();



export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;

    if (!passwordRegex.test(password)) {
      // Password format is invalid
      return res.status(400).send("Invalid password format");
    }

    if (!nameRegex.test(name)) {
      // Name format is invalid
      return res.status(400).send("Invalid name format");
    }

    if (!emailRegex.test(email)) {
      // Email format is invalid
      return res.status(400).send("Invalid email format");
    }
    const hashedPassword = bcrypt.hashSync(password, 10);

    const newUser = new User({
      name: name,
      email: email,
      isContributer: req.body.isContributer,
      password: hashedPassword,
    });

    newUser
      .save()
      .then((result) => {
        //handle account verification
        sendVerificationEmail(result, res);
      })
      .catch((err) => {
        console.log(err);
      });

  } catch (err) {
    next(err);
    console.log(err);
  }
};

//verify email
export const verifyEmail = async (req, res, next) => {
  try {
    let {userID, uniqueString} =req.params;

    Verification
      .find({userID})
      .then((result) => {
        if(result.length > 0) {
          const {expiresAt} = result[0];
          const hashedUniqueString = result[0].hashedUniqueString;

          if (expiresAt < Date.now()) {
            //record has expired
            Verification
              .deleteOne({userID})
              .then((result) => {
                User
                  .deleteOne({_id: userID})
                  .then()
                  .catch((error) => {
                    console.log("error while deleting user record")
                  })
              })
              .catch((error) => {
                console.log("error while deleting expired user");
              })

          } else {
            //valid record exists
            bcrypt
              .compare(uniqueString, hashedUniqueString)
              .then((result) => {
                if(result) {
                  //strings match
                  User
                    .updateOne({_id: userID}, {verified: true})
                    .then(() => {
                      Verification
                        .deleteOne({userID})
                        .then(() => {
                          res.sendFile(path.join(__dirname, "http://localhost:5173/"));
                        })
                        .catch((error) => {
                          console.log(error);
                        })
                    })
                    .catch((error) => {
                      console.log("error while updating user");
                    })

                } else {
                  console.log("invalid verification details")
                }
              })
              .catch((error) => {
                console.log("error while comparing hashed strings");
              });
          }

        } else {
          console.log("No record found");
        }
      })
      .catch((error) => {
        console.log(error);
      })

  } catch(err) {
    next(err);
    console.log(err);
  }
};

//verified page route
export const redirection = async(req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, "http://localhost:5173/"));
  

  } catch (err) {
    next(err);
    console.log(err);
  }
};

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return next(createError(404, "User Not Found!"));
    }

    const isCorrect = bcrypt.compareSync(req.body.password, user.password);

    if (!isCorrect) {
      return next(createError(400, "Wrong Password or Email!"));
    }

    const token = jwt.sign(
      {
        id: user._id,
        isContributer: user.isContributer,
      },
      process.env.JWT_KEY
    );

    const { password, ...info } = user._doc;
    res
      .cookie("accessToken", token, {
        httpOnly: true,
      })
      .status(200)
      .send(info);
  } catch (err) {
    next(err);
    console.log(err);
  }
};

export const logout = async (req, res) => {
  res
    .clearCookie("accessToken", {
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .send("User has been logged out.");
};
