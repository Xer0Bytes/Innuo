import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import createError from "../utils/createError.js";
import sendEmail from "../utils/sendEmail.js";

export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const nameRegex = /^[a-zA-Z\s]+$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/;

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

    const res = await newUser.save();

    //const user = await User.findOne({email: email});

    // const emailToken = "84cf232a0d16867b4269b3d4c6e79f04";
    // const verifyEmail = `http://localhost:5173/user/${user._id}/verify/${emailToken}`;
    // const resEmail = await sendEmail(user.email, "Verify Email", verifyEmail);

    //res.status(201).send(resEmail);
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
