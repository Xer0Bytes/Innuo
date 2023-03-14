const router = require("express").Router();
const { User, validate } = require("../models/user");
const Token = require("../models/token");
const crypto = require("crypto");
const sendEmail = require("../utils/sendEmail");
const bcrypt = require("bcrypt");
const ErrorResponse = require("../utils/errorResponse");

router.post("/", async (req, res) => {
	try {
		const { error } = validate(req.body);
		if (error)
			return res.status(400).send({ message: error.details[0].message });

		let user = await User.findOne({ email: req.body.email });
		if (user)
			return res
				.status(409)
				.send({ message: "User with given email already Exist!" });

		const salt = await bcrypt.genSalt(Number(process.env.SALT));
		const hashPassword = await bcrypt.hash(req.body.password, salt);

		user = await new User({ ...req.body, password: hashPassword }).save();

		//console.log(user);


		const token = await new Token({
			userEmail : user.email,
			token: crypto.randomBytes(32).toString("hex"),
		}).save();
		// const url = `http://localhost:5173/users/${user.id}/verify/${token.token}`;
		const url = `http://localhost:5173/EmailVerify/${user.email}/${token.token}`;

		console.log(token.token);
		console.log(url);

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

		//console.log(token.token);

		res
			.status(201)
			.send({ message: "An Email sent to your account please verify" });
	} catch (error) {
		console.log(error);
		res.status(500).send({ message: "Internal Server Error" });
	}
});

router.get("/verify/:token", async (req, res, next) => {
	try {
		console.log(req);
		const token = await Token.findOne({
		  token: req.params.token,
		});
	
		let user;

		

		if (!token) {
		  return next(new ErrorResponse("Invalid Link", 400));
		} else {
		  console.log("token paisi!");
		  user = await User.findOne({
			email: token.userEmail,
		  });
	
		  if (!user) {
			return next(new ErrorResponse("User doesn't exist!", 400));
		  } else {
			console.log("user paisi!");
		  }
		}

		await User.findOneAndUpdate({ email: user.email }, { verified: true });
		//await Token.deleteMany({ email: user.email });
		res.status(200).send({ message: "Email verified successfully" });
		// res.redirect("http://localhost:5173/login");
	  } catch (error) {
		next(new ErrorResponse("An error occured", 400));
	  }
	
	
	// try {
	// 	const user = await User.findOne({ _id: req.params.id });
	// 	if (!user) return res.status(400).send({ message: "Invalid link" });

	// 	const token = await Token.findOne({
	// 		userId: user._id,
	// 		token: req.params.token,
	// 	});
	// 	if (!token) return res.status(400).send({ message: "Invalid link" });

	// 	await User.updateOne(
	// 		{
	// 		  _id : user._id
	// 		},
	// 		{
	// 		  $set:
	// 		  {
	// 			verified : true
	// 		  }
	// 		}
	// 	  );
	// 	await token.remove(token._id);

	// 	res.status(200).send({ message: "Email verified successfully" });
	// } catch (error) {
	// 	res.status(500).send({ message: "Internal Server Error" });
	// }
});

module.exports = router;
