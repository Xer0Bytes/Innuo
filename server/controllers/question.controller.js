import Topic from "../models/topic.model.js";
import createError from "../utils/createError.js";

export const addQuestions = async (req, res) => {
  try {
    //checking if module exists for this topic
    const topic = await Topic.findOne({
      topicID: req.body.topicID,
      "modules.moduleID": req.body.moduleID,
    });

    if (!topic) {
      return res.status(420).send("No such modules exist for this topic.");
    }

    const newQuestion = {
      questionText: req.body.questionText,
      questionImageURL: req.body.questionImageURL,
      correctChoice: req.body.correctChoice,
      choices: [
        {
          choiceText: req.body.choice1Text,
          choiceImageURL: req.body.choice1ImageURL,
        },
        {
          choiceText: req.body.choice2Text,
          choiceImageURL: req.body.choice2ImageURL,
        },
        {
          choiceText: req.body.choice3Text,
          choiceImageURL: req.body.choice3ImageURL,
        },
        {
          choiceText: req.body.choice4Text,
          choiceImageURL: req.body.choice4ImageURL,
        },
      ],
    };

    const result = await Topic.updateOne(
      { "modules.moduleID": req.body.moduleID },
      { $push: { "modules.$.questions": newQuestion } }
    );

    // Get all topics with topicID and topicTitle and modules fields only
    const topics = await Topic.find({}, "topicID topicTitle modules");

    // res.status(201).send(topics);
    res.status(201).send("Saved Successfully");
  } catch (err) {
    //next(err);
    console.log(err);
  }
};
