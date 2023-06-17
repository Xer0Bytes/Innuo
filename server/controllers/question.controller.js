import Topic from "../models/topic.model.js";
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

    const newQuestion = {
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
    };
  
    const result = await Topic.updateOne(
      { "modules.moduleTitle": req.body.moduleTitle },
      { $push: { "modules.$.questions": newQuestion } },
    );

    res.status(201).send("Successfully added");
  } catch (err) {
    next(err);
    console.log(err);
  }
};
