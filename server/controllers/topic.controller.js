import Topic from "../models/topic.model.js";
import Counter from "../models/counter.model.js";

export const addTopic = async (req, res, next) => {
  try {
    const sequence = await Counter.findOneAndUpdate(
      { _id: "topicID" },
      { $inc: { seq: 1 } },
      { new: true }
    );

    const nextTopicID = sequence.seq;

    // Add new topic with topicID
    const newTopic = new Topic({
      topicID: nextTopicID,
      topicTitle: req.body.topicTitle,
    });

    // Validate and save the new topic
    const savedTopic = await newTopic.save();

    //all topics
    const topics = await Topic.find({});

    res.status(201).send(topics);
  } catch (err) {
    next(err);
    console.log(err);
  }
};

export const getAllTopics = async (req, res, next) => {
  try {
    //all topics
    const topics = await Topic.find({});

    res.status(200).send(topics);
  } catch (err) {
    next(err);
    console.log(err);
  }
};
