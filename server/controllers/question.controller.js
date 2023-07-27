import Topic from "../models/topic.model.js";
import createError from "../utils/createError.js";
import Admin from "../models/admin.model.js";

export const addQuestions = async (req, res) => {
  try {
    //checking if module exists for this topic
    const topic = await Topic.findOne({
      topicID: req.topicID,
      "modules.moduleID": req.moduleID,
    });

    if (!topic) {
      return res.status(420).send("No such modules exist for this topic.");
    }

    const newQuestion = {
      questionText: req.questionText,
      questionImageURL: req.questionImageURL,
      correctChoice: req.correctChoice,
      choices: [
        {
          choiceText: req.choice1Text,
          choiceImageURL: req.choice1ImageURL,
        },
        {
          choiceText: req.choice2Text,
          choiceImageURL: req.choice2ImageURL,
        },
        {
          choiceText: req.choice3Text,
          choiceImageURL: req.choice3ImageURL,
        },
        {
          choiceText: req.choice4Text,
          choiceImageURL: req.choice4ImageURL,
        },
      ],
    };

    const result = await Topic.updateOne(
      { "modules.moduleID": req.moduleID },
      { $push: { "modules.$.questions": newQuestion } }
    );

    // Get all topics with topicID and topicTitle and modules fields only
    const topics = await Topic.find({}, "topicID topicTitle modules");

    const cons = await Admin.find({});
    res.status(200).send(cons);
  } catch (err) {
    //next(err);
  }
};

export const sendAdminQuestion = async (req, res, next) => {
  try {
    const topic = await Topic.findOne({
      topicID: req.body.data.topicID,
      "modules.moduleID": req.body.data.moduleID,
    });

    const topicTitle = topic.topicTitle;

    const module = topic.modules.find((module) => module.moduleID === req.body.data.moduleID);
    const moduleTitle = module ? module.moduleTitle : null;

    req.body.data = { ...req.body.data, topicTitle, moduleTitle };

    const newContribution = new Admin(req.body);
    const saved = await newContribution.save();
    
    if(saved) {
      res.status(201).send("Saved Successfully.");
    } else {
      res.status(401).send("Something went wrong.");
    }
  } catch (err) {
    next(err);
  }
};
