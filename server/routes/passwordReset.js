const router = require("express").Router();
const { User } = require("../models/user");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const Joi = require("joi");
const passwordComplexity = require("joi-password-complexity");
const bcrypt = require("bcrypt");

// send password link
router.post("/", async (req, res) => {
	try {
		const emailSchema = Joi.object({
			email: Joi.string().email().required().label("Email"),
		});

		const { error } = emailSchema.validate(req.body);

		if (error)
			return res.status(400).send({ message: error.details[0].message });

		let user = await User.findOne({ email: req.body.email });
		if (!user)
			return res
				.status(409)
				.send({ message: "User with given email does not exist!" });

		let token = await Token.findOne({ userEmail: user.email });

		if (!token) {
			token = await new Token({
				userEmail: user.email,
				token: crypto.randomBytes(32).toString("hex"),
			}).save();
		}

		const url = `http://localhost:5173/password-reset/${user.email}/${token.token}`;

		const message = `
		<!DOCTYPE html>
		<html>
        <head>
        <title>Forgot Password</title>
        </head>
        <body>
        <p><strong>Dear ${user.name},</strong></p>
        <p>This is an email to verify your email in case you forgot your password. Click below link to verify your email and be redirected to reset your password.</p>
        <p><a href='${url}'>Verify Email</a></p>
        </body>
        </html>`;

		await sendEmail(user.email, "Forgot Password", message);

		res
			.status(200)
			.send({ message: "Password reset link sent to your email account" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

// verify password reset link
router.get("/:email/:token", async (req, res, next) => {
	try {
		
		const user = await User.findOne({email: req.params.email});
		if(!user) return res.status(400).send({message: "Invalid link"});

		const token = await Token.findOne({
			userEmail: user.email,
		  	token: req.params.token,
		});

		if (!token) return res.status(400).send({message: "Invalid link"});

		res.status(200).send("Valid Url");

		//await Token.deleteMany({ email: user.email });
		// res.status(200).send({ message: "Email verified successfully" });
		// res.redirect("http://localhost:5173/login");
	  } catch (error) {
		res.status(500).send({message: "Internal Server Error"});
	  }

});

//  set new password
router.post("/:email/:token", async (req, res) => {
	try {
		const passwordSchema = Joi.object({
			password: passwordComplexity().required().label("Password"),
		});
		const { error } = passwordSchema.validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.params.email });
		if (!user) return res.status(400).send({ message: "Invalid link" });

		const token = await Token.findOne({
			userEmail: user.email,
			token: req.params.token,
		});
		if (!token) return res.status(400).send({ message: "Invalid link" });

		if (!user.verified) user.verified = true;

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		user.password = hashPassword;
		await user.save();
		await token.remove();

		res.status(200).send({ message: "Password reset successfully" });
	} catch (error) {
		res.status(500).send({ message: "Internal Server Error" });
	}
});

module.exports = router;
