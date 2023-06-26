import User from "../models/user.model.js";
import Verification from "../models/verification.model.js";
import { sendVerificationEmail } from "../middleware/sendVerificationEmail.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
import { verifyEmailFormat } from "../middleware/verificationEmail.js";
import { resetPassEmailFormat } from "../middleware/resetPasswordEmail.js";

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

    // Check if email already exists in the database
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).send("Email already exists");
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
        const currentURL = "http://localhost:5173/EmailVerify/";
        sendVerificationEmail(currentURL, verifyEmailFormat, result, res);
      })
      .catch((err) => {
        //user not saved properly
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
    let { id, unique } = req.params;

    const userID = id;
    const uniqueString = unique;

    Verification.find({ userID })
      .then((result) => {
        if (result.length > 0) {
          const { expiresAt } = result[0].expiredAt;
          const hashedUniqueString = result[0].uniqueString;

          if (expiresAt < Date.now()) {
            //record has expired
            Verification.deleteOne({ userID })
              .then((result) => {
                User.deleteOne({ _id: userID })
                  .then()
                  .catch((error) => {
                    //error while deleting expired user details
                    console.log(error);
                  });
              })
              .catch((error) => {
                //error while deleting expired verification details
                console.log(error);
              });
          } else {
            //valid record exists
            bcrypt
              .compare(uniqueString, hashedUniqueString)
              .then((result) => {
                if (result) {
                  //strings match

                  //user updated to verified
                  User.updateOne({ _id: userID }, { verifiedEmail: true })
                    .then(() => {
                      //verification details deleted
                      Verification.deleteOne({ userID })
                        .then(() => {
                          res
                            .status(200)
                            .send({ message: "Email verified successfully" });
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    })
                    .catch((error) => {
                      //error updating user to verified
                      console.log(error);
                    });
                } else {
                  //strings do not match
                  console.log("Strings do not match!");
                }
              })
              .catch((error) => {
                //error comparing strings
                console.log(error);
              });
          }
        } else {
          console.log("No record found!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
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

    if (!user.verifiedEmail) {
      return next(createError(400, "User Not Verified!"));
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

export const forgotPassEmail = async (req, res) => {
  try {
    const email = req.body.email;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      // Email format is invalid
      return res.status(400).send("Invalid email format");
    }

    User.find({ email })
      .then((result) => {
        if (result.length > 0) {
          const currentURL = "http://localhost:5173/password-reset/";
          sendVerificationEmail(currentURL, resetPassEmailFormat, result[0], res);
        } else {
          console.log("No such records exist!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (error) {
    next(error);
    console.log(error);
  }
};

export const resetPass = async (req, res) => {
  try {
    let { id, unique } = req.params;

    const userID = id;
    const uniqueString = unique;

    Verification.find({ userID })
      .then((result) => {
        if (result.length > 0) {
          const { expiresAt } = result[0].expiredAt;
          const hashedUniqueString = result[0].uniqueString;

          if (expiresAt < Date.now()) {
            //record has expired
            Verification.deleteOne({ userID })
              .then((result) => {
                User.deleteOne({ _id: userID })
                  .then()
                  .catch((error) => {
                    //error while deleting expired user details
                    console.log(error);
                  });
              })
              .catch((error) => {
                //error while deleting expired verification details
                console.log(error);
              });
          } else {
            //valid record exists
            bcrypt
              .compare(uniqueString, hashedUniqueString)
              .then((result) => {
                if (result) {
                  //strings match

                  //user updated to verified
                  User.updateOne({ _id: userID }, { verifiedEmail: true })
                    .then(() => {
                      //verification details deleted
                      Verification.deleteOne({ userID })
                        .then(() => {
                          res
                            .status(200)
                            .send({ message: "Email verified successfully" });
                        })
                        .catch((error) => {
                          console.log(error);
                        });
                    })
                    .catch((error) => {
                      //error updating user to verified
                      console.log(error);
                    });
                } else {
                  //strings do not match
                  console.log("Strings do not match!");
                }
              })
              .catch((error) => {
                //error comparing strings
                console.log(error);
              });
          }
        } else {
          console.log("No record found!");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } catch (err) {
    next(err);
    console.log(err);
  }
};
