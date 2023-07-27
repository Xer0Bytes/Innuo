import Verification from "../models/verification.model.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import nodemailer from "nodemailer";
import { v4 as uuidv4 } from "uuid";

dotenv.config();

let transporter = nodemailer.createTransport({
  host: process.env.HOST,
  service: process.env.SERVICE,
  port: Number(process.env.EMAIL_PORT),
  secure: Boolean(process.env.SECURE),
  auth: {
    user: process.env.USER,
    pass: process.env.PASS,
  },
});

transporter.verify((error, success) => {
  if (error) {
  } else {
    console.log("Ready for messages");
  }
});

export const sendVerificationEmail = (link, emailFormat, result, res, next) => {
  const { _id, email } = result;
  const uniqueString = uuidv4() + _id;
  const verificationLink =
    link + _id + "/" + uniqueString;

  //mail option
  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: "Verify Your Email",
    html: emailFormat(verificationLink),
  };

  //hash the uniqueString
  const salt = Number(process.env.SALT);
  bcrypt
    .hash(uniqueString, salt)
    .then((hashedUniqueString) => {
      //set values in db
      const newVerification = new Verification({
        userID: _id,
        uniqueString: hashedUniqueString,
        createdAt: Date.now(),
        expiredAt: Date.now() + 86400000,
      });

      newVerification
        .save()
        .then(() => {
          transporter
            .sendMail(mailOptions)
            .then(() => {
              //mail sent and verification info saved
              res.status(201).send("Email sent successfully.");
              //   next();
            })
            .catch((error) => {
              console.log("Email not sent");
            });
        })
        .catch((error) => {
          console.log("verification data not saved");
        });
    })
    .catch((error) => {
      //error hashing string
      console.log(error);
    });
};
