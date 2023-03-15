const router = require("express").Router();
const { User } = require("../models/user");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const Joi = require("joi");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		const user = await User.findOne({ email: req.body.email });
		if (!user)
			return res.status(401).send({ message: "Invalid Email or Password" });

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword)
			return res.status(401).send({ message: "Invalid Email or Password" });

		if (!user.verified) {
			let token = await Token.findOne({ userEmail: user.email });
			if (!token) {
				token = await new Token({
					userEmail: user.email,
					token: crypto.randomBytes(32).toString("hex"),
				}).save();
				const url = `http://localhost:5173/EmailVerify/${user.email}/${token.token}`;

				const message = `
				<!DOCTYPE html>
				<html>
				<head>
				<title>Verify Email</title>
				</head>
				<body>
				<p><strong>Dear ${user.name},</strong></p>
				<p>Thanks for registration! Verify your email to access our website. Click below link to verify your email.</p>
				<p><a href='${url}'>Verify Email</a></p>
				</body>
				</html>`;

				await sendEmail(user.email, "Verify Email", message);
			}

			return res
				.status(400)
				.send({ message: "An Email sent to your account please verify" });
		}

		const token = user.generateAuthToken();
		res.status(200).send({ data: token, message: "Logged in successfully!" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

module.exports = router;
