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
        return res.status(420).send("Error while updating. Please try again.");
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
    const objType = req.body.type;
    const data = req.body.data;
    
    const fieldUpdates = {
      question: {
        topicTitle: data.topicTitle,
        moduleTitle: data.moduleTitle,
        questionText: data.questionText,
        questionImageURL: data.questionImageURL || null,
        choice1Text: data.choice1Text || null,
        choice1ImageURL: data.choice1ImageURL || null,
        choice2Text: data.choice2Text || null,
        choice2ImageURL: data.choice2ImageURL || null,
        choice3Text: data.choice3Text || null,
        choice3ImageURL: data.choice3ImageURL || null,
        choice4Text: data.choice4Text || null,
        choice4ImageURL: data.choice4ImageURL || null,
        correctChoice: data.correctChoice,
      },
      lesson: {
        topicTitle: data.topicTitle,
        moduleTitle: data.moduleTitle,
        lessonText: data.lessonText,
        lessonImageURL: data.lessonImageURL,
      },
      module: {
        topicTitle: data.topicTitle,
        moduleTitle: data.moduleTitle,
      },
      topic: {
        topicTitle: data.topicTitle,
      },
    };

    const updatedContent = fieldUpdates[objType];

    if (!updatedContent) {
      return res.status(420).send("Invalid type of object.");
    }

    //checking and updating status
    const updatedDocument = await Admin.updateOne(
      { _id: req.params.id },
      { $set: { data: updatedContent } }
    );

    if (!updatedDocument) {
      return res.status(420).send("Error while updating. Please try again.");
    } else {
      const cons = await Admin.find({}).sort({ createdAt: -1 });
      res.status(200).send(cons);
    }
  } catch (err) {
    next(err);
    console.log(err);
  }
};

export const rejectContribution = async (req, res, next) => {
  try {
    //checking and updating status
    const updatedDocument = await Admin.updateOne(
      { _id: req.params.id },
      { $set: { status: "rejected" } }
    );

    if (!updatedDocument) {
      return res.status(420).send("Error while updating. Please try again.");
    } else {
      const cons = await Admin.find({}).sort({ createdAt: -1 });
      res.status(200).send(cons);
    }
  } catch (err) {
    next(err);
    console.log(err);
  }
};

export const deleteAllPastRequests = async (req, res, next) => {
  try {
    const deletedRequests = await Admin.deleteMany({
      status: { $in: ["approved", "rejected"] },
    });

    const cons = await Admin.find({}).sort({ createdAt: -1 });
    res.status(200).send(cons);
  } catch (err) {
    next(err);
    console.log(err);
  }
};

export const getAllContributions = async (req, res, next) => {
  try {
    const cons = await Admin.find({}).sort({ createdAt: -1 });
    res.status(200).send(cons);
  } catch (err) {
    next(err);
    console.log(err);
  }
};
