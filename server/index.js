import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import userRoute from "./routes/user.route.js";
import tokenRoute from "./routes/token.route.js";
import achievementRoute from "./routes/achievement.route.js";
import topicRoute from "./routes/topic.route.js";
import moduleRoute from "./routes/module.route.js";
import questionRoute from "./routes/question.route.js";
import authRoute from "./routes/auth.route.js";

const app = express();
dotenv.config();

const connection = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
    console.log("Connected successfully!");
  } catch (error) {
    console.log(error);
  }
};

//Middlewares
//allow input apart from user input in json format
app.use(express.json()); 
app.use(cookieParser());

//Routing
app.use("/api/user", userRoute);
app.use("/api/token", tokenRoute);
app.use("/api/achievement", achievementRoute);
app.use("/api/topic", topicRoute);
app.use("/api/question", questionRoute);
app.use("/api/module", moduleRoute);
app.use("/api/auth", authRoute);

app.use((err, req, res, next)=>{
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went wrong!";

  return res.status(errorStatus).send(errorMessage);
});

app.listen(7000, () => {
  connection();
  console.log("Backend server is running!");
});
