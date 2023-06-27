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

    const user = await User.find({ email });

    //checking if user exists
    if (user.length > 0) {
      const currentURL = "http://localhost:5173/VerifyReset/";
      sendVerificationEmail(currentURL, resetPassEmailFormat, user[0], res);

      res.status(200).send("Email sent successfully.");
    } else {
      return res.status(404).send("User does not exist!");
    }
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

    const result = await Verification.find({ userID: userID });

    //checking if such a verification link exists or not
    if (result.length > 0) {
      const { expiresAt } = result[0].expiredAt;
      const hashedUniqueString = result[0].uniqueString;

      //checking is link expired or not
      if (expiresAt < Date.now()) {
        //record has expired
        const check = await Verification.deleteOne({ userID: userID });

        if (check) {
          return res.status(400).send("Verification link has expired.");
        }
      } else {
        //record didnt expire so valid
        const isValid = bcrypt.compare(uniqueString, hashedUniqueString);

        if (isValid) {
          //strings match

          //search if user exists
          const doesExist = await User.findById(userID);
          //verification details deleted
          // const updateVerification = await Verification.deleteOne({
          //   userID: userID,
          // });

          // if (doesExist && updateVerification) {
          if (doesExist) {
            return res.status(200).send("Email verified successfully");
          } else {
            res.status(400).send("User not saved.");
          }
        } else {
          res.status(400).send("Invalid verification information.");
        }
      }
    } else {
      res.status(404).send("Link does not exist!");
    }
  } catch (err) {
    next(err);
    console.log(err);
  }
};

export const resetPass = async (req, res, next) => {
  try {
    const userID = req.params.id;
    const uniqueString = req.params.unique;
    const password = req.body.password;
    //write code for deleting validation
    const result = await Verification.find({ userID: userID });
    if (result.length > 0) {
      const { expiresAt } = result[0].expiredAt;
      const hashedUniqueString = result[0].uniqueString;

      //checking is link expired or not
      if (expiresAt < Date.now()) {
        //record has expired
        const check = await Verification.deleteOne({ userID: userID });

        if (check) {
          return res.status(400).send("Verification link has expired.");
        }
      } else {
        //record didnt expire so valid
        const isValid = bcrypt.compare(uniqueString, hashedUniqueString);

        if (isValid) {
          //strings match

          //search if user exists
          const doesExist = await User.findById(userID);

          if (doesExist) {
            const passwordRegex =
              /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;

            if (!passwordRegex.test(password)) {
              // Password format is invalid
              return res.status(400).send("Invalid password format");
            }

            const hashedPassword = bcrypt.hashSync(
              password,
              Number(process.env.SALT)
            );
            const user = await User.findById(userID);

            if (!user) {
              return res.status(404).send("User not found");
            }
            //verification details deleted
            const updateVerification = await Verification.deleteOne({
              userID: userID,
            });
            user.password = hashedPassword;
            const savedUser = await user.save();

            if (savedUser) {
              return res.status(200).send("Password updated successfully");
            } else {
              return res
                .status(404)
                .send("Something went wrong. Please try again.");
            }
          } else {
            res.status(400).send("User not saved.");
          }
        } else {
          res.status(400).send("Invalid verification information.");
        }
      }
    } else {
      res.status(404).send("Link does not exist!");
    }
  } catch (err) {
    next(err);
    console.log(err);
  }
};
