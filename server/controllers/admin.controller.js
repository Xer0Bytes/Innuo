import Admin from "../models/admin.model.js";
import createError from "../utils/createError.js";
import { addQuestions } from "./question.controller.js";
import { addModule, addLesson } from "./module.controller.js";
import { addTopic } from "./topic.controller.js";

export const approveContribution = async (req, res, next) => {
  try {
    const input = req.body.data;

    const conditions = [
      {
        type: "question",
        action: (input) => {
          // addQuestion
          addQuestions(input, res);
        },
      },
      {
        type: "lesson",
        action: (input) => {
          // addLesson
          addLesson(input, res);
        },
      },
      {
        type: "module",
        action: (input) => {
          // addModule
          addModule(input, res);
        },
      },
      {
        type: "topic",
        action: (input) => {
          // addTopic
          addTopic(input, res);
        },
      },
    ];

    const contributionType = req.body.type;
    const matchedCondition = conditions.find(
      (condition) => condition.type === contributionType
    );

    if (matchedCondition) {
      //checking and updating status
      const updatedDocument = await Admin.updateOne(
        { _id: req.params.id },
        { $set: { status: "approved" } } 
      );

      if (!updatedDocument) {
        return res.status(420).send("No such modules exist for this topic.");
      }

      matchedCondition.action(input);

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

export const rejectContribution = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
    console.log(err);
  }
};

export const deleteAllPastRequests = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
    console.log(err);
  }
};

export const getAllContributions = async (req, res, next) => {
  try {
    const cons = await Admin.find({});
    res.status(200).send(cons);
  } catch (err) {
    next(err);
    console.log(err);
  }
};
