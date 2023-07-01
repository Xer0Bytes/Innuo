import User from "../models/user.model.js";
import Verification from "../models/verification.model.js";
import { sendVerificationEmail } from "../middleware/sendVerificationEmail.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
import { verifyEmailFormat } from "../middleware/verificationEmail.js";

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

    const hashedPassword = bcrypt.hashSync(password, Number(process.env.SALT));

    const newUser = new User({
      name: name,
      email: email,
      isContributer: req.body.isContributer,
      password: hashedPassword,
    });

    const result = await newUser.save();

    if (result) {
      const currentURL = "http://localhost:5173/EmailVerify/";
      sendVerificationEmail(currentURL, verifyEmailFormat, result, res);

      // res.status(200).send("Email sent successfully.");
    } else {
      res.status(400).send("Email not sent! Please try again.");
    }
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

          //user updated to verified
          const updatedUser = await User.updateOne(
            { _id: userID },
            { verifiedEmail: true }
          );
          //verification details deleted
          const updateVerification = await Verification.deleteOne({
            userID: userID,
          });

          if (updatedUser && updateVerification) {
            res.status(200).send("Email verified successfully");
          } else {
            res.status(400).send("User not updated properly.");
          }
        } else {
          res.status(400).send("Invalid verification information.");
        }
      }
    } else {
      res.status(404).send("Link does not exist.");
    }
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
