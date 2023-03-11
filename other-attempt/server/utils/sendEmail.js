const nodemailer = require("nodemailer");

module.exports = async (email, subject, text) => {
	try {
		const transporter = nodemailer.createTransport({
			host: process.env.HOST,
			service: "gmail",
			port: Number(process.env.EMAIL_PORT),
			secure: Boolean(process.env.SECURE),
			auth: {
				user: "teaminnuo@gmail.com",
				pass: "uhtfntyroxcqetif",
			},
		});

		await transporter.sendMail({
			from: "teaminnuo@gmail.com",
			to: email,
			subject: "Verification",
			text: "Welcome to Innuo",
		});
		console.log("email sent successfully");
	} catch (error) {
		console.log("email not sent!");
		console.log(error);
		return error;
	}
};
