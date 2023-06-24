//models
import Verification from "../models/verification.model.js";

//pw hashing
import bcrypt from "bcrypt";

//env variable
import dotenv from "dotenv";

//error handling
import createError from "../utils/createError.js";

//email handling
import nodemailer from "nodemailer";

//uuid
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
      console.log(error);
    } else {
      console.log("Ready for messages");
      console.log(success);
    }
  });

export const sendVerificationEmail = (result, res, next) => {
  const { _id, email } = result;

  //url to be used in the email
  const currentURL = "http://localhost:7000/";

  const uniqueString = uuidv4() + _id;

  //mail option
  const mailOptions = {
    from: process.env.USER,
    to: email,
    subject: "Verify Your Email",
    html: `<p>Verify <a href=${currentURL + "api/user/verify/" + _id + "/" + uniqueString}>here</a></p>`,
  };

  //hash the uniqueString
  const salt = 10;
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
              res.status(201).send("Email sent SUCESSFULLYYYYYY");
            //   next();
            })
            .catch((error) => {
              console.log("Email not sent");
              console.log(error);
            });
        })
        .catch((error) => {
          console.log("verification data not saved");
          
        });
    })
    .catch(() => {
      console.log("not hashed");
    });
};
