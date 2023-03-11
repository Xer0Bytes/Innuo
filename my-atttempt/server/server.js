const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const app = express();

app.use(cors());
app.use(bodyParser.json());

//Database connection backend
mongoose.connect("mongodb+srv://innuo:336572@innuocluster.1qrimuv.mongodb.net/test", { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log('Connected to database!');
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

//Registration backend
app.post('/api/register', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000);

        // Send email with OTP
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "teaminnuo@gmail.com",
                pass: "uhtfntyroxcqetif"
            }
        });

        const mailOptions = {
            from: "teaminnuo@gmail.com",
            to: email,
            subject: 'Verify your registration',
            text: `Your OTP is ${otp}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        // Save user to database
        const user = new User({
            name,
            email,
            password: hashedPassword
        });
        const savedUser = await user.save();

        // Create and sign JWT token
        const token = jwt.sign({ _id: savedUser._id }, process.env.TOKEN_SECRET);

        res.json({ message: 'User registered successfully', token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

app.listen(5000, () => {
    console.log('Server started on port 5000');
});

//login backend
app.post('/api/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Email or password is incorrect' });
        }

        // Check if password is correct
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: 'Email or password is incorrect' });
        }

        // Create and sign JWT token
        const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);

        res.json({ message: 'Logged in successfully', token });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

app.post('/api/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'User does not exist' });
        }

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000);

        // Send email with OTP
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: "teaminnuo@gmail.com",
                pass: "uhtfntyroxcqetif"
            }
        });

        const mailOptions = {
            from: "teaminnuo@gmail.com",
            to: email,
            subject: 'Reset your password',
            text: `Your OTP is ${otp}`
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.json({ message: 'OTP sent to email' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Something went wrong' });
    }
});

