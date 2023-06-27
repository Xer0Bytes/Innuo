import User from "../models/user.model.js";
import Verification from "../models/verification.model.js";
import { sendVerificationEmail } from "../middleware/sendVerificationEmail.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { resetPassEmailFormat } from "../middleware/resetPasswordEmail.js";

dotenv.config();

export const forgotPassEmail = async (req, res, next) => {
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
          const currentURL = "http://localhost:5173/VerifyReset/";
          sendVerificationEmail(
            currentURL,
            resetPassEmailFormat,
            result[0],
            res
          );
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

export const verifyEmailReset = async (req, res, next) => {
  try {
    let { id, unique } = req.params;

    const userID = id;
    const uniqueString = unique;

    Verification.find({ userID: userID })
      .then((result) => {
        if (result.length > 0) {
          const { expiresAt } = result[0].expiredAt;
          const hashedUniqueString = result[0].uniqueString;

          if (expiresAt < Date.now()) {
            //record has expired
            Verification.deleteOne({ userID: userID })
              .then((result) => {
                res.status(404).send("Something went wrong. Please try again.");
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

                  //search if user exists
                  User.findById(userID)
                    .then(() => {
                      //verification details deleted
                      // Verification.deleteOne({ userID })
                      // .then(() => {
                        console.log("verified");
                      res.status(200).send("Email verified successfully");
                      // })
                      // .catch((error) => {
                      //   console.log(error);
                      // });
                    })
                    .catch((error) => {
                      //error finding user
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

export const resetPass = async (req, res, next) => {
  try {
    const userID = req.params.id;
    const password = req.body.password;

    console.log(userID);

    const passwordRegex =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;

    if (!passwordRegex.test(password)) {
      // Password format is invalid
      return res.status(400).send("Invalid password format");
    }

    const hashedPassword = bcrypt.hashSync(password, Number(process.env.SALT));

    const user = await User.findById(userID);

    if (!user) {
      return res.status(404).send("User not found");
    }

    user.password = hashedPassword;

    await user.save();

    res.status(200).send("Password updated successfully");
  } catch (err) {
    next(err);
    console.log(err);
  }
};
