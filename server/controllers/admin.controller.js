import Admin from "../models/user.model.js";
import createError from "../utils/createError.js";
import { addQuestions } from "./question.controller.js";
import { addModule, addLesson } from "./module.controller.js";
import { addTopic } from "./topic.controller.js";

export const saveContribution = async (req, res, next) => {
  try {
    const reqProperties = Object.keys(req.body);

    const conditions = [
      {
        properties: ["questionText"],
        action: () => {
          // addQuestion
          addQuestions(req, res); 
        },
      },
      {
        properties: ["lessonText"],
        action: () => {
          // addLesson
          addLesson(req, res); 
        },
      },
      {
        properties: ["moduleTitle"],
        action: () => {
          // addModule
          addModule(req, res); 
        },
      },
      {
        properties: ["topicTitle"],
        action: () => {
          // addTopic
          addTopic(req, res);
        },
      },
    ];

    const matchedCondition = conditions.find((condition) =>
      condition.properties.every((property) => reqProperties.includes(property))
    );

    if (matchedCondition) {
      matchedCondition.action();
    } else {
      res.status(404).send("Invalid contribution data."); 
    }
  } catch (err) {
    next(err);
    console.log(err);
  }
};

export const editContribution = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
    console.log(err);
  }
};

export const deleteContribution = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
    console.log(err);
  }
};
