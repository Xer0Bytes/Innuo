import Question from "../models/question.model.js";
import Topic from "../models/topic.model.js";
import Module from "../models/module.model.js";
import createError from "../utils/createError.js";

export const addQuestions = async (req, res, next) => {
  try {
    //checking if module exists for this topic
    const topic = await Topic.findOne({
      topicTitle: req.body.topicTitle,
      "modules.moduleTitle": req.body.moduleTitle,
    });

    if (!topic) {
      return next(createError(420, "No such modules exist in that topic."));
    }

    const module = await Module.findOne({
        moduleTitle: req.body.moduleTitle
      });

    const newQuestion = new Question({
        moduleID: module.moduleID,
        questionID: req.body.questionID, 
        questionText: req.body.questionText,     
        questionImageURL: req.body.questionImageURL,
        correctChoice: req.body.correctChoice,
        choices: [
            {
                choiceText: req.body.choice1Text,
                choiceImageURL: req.body.choice1ImageURL 
            },
            {
                choiceText: req.body.choice2Text,
                choiceImageURL: req.body.choice2ImageURL 
            },
            {
                choiceText: req.body.choice3Text,
                choiceImageURL: req.body.choice3ImageURL 
            },
            {
                choiceText: req.body.choice4Text,
                choiceImageURL: req.body.choice4ImageURL 
            },
        ]
    });
  
    await newQuestion.save();

    const moduleUpdate = await Module.findOneAndUpdate(
        {moduleTitle: req.body.moduleTitle},
        {
          $push: {
            questions: req.body.questionID,
          },
        },
        { new: true }
      );

    //console.log(moduleUpdate);

    res.status(201).send("Successfully added");
  } catch (err) {
    next(err);
    console.log(err);
  }
};
