import Topic from "../models/topic.model.js";

export const addTopic = async (req, res, next) => {
  try {
    //add new topic
    const newTopic = new Topic({
        ...req.body,
    })

    await newTopic.save();

    //all topics
    const topics = await Topic.find({});

    res.status(201).send(topics);
  } catch (err) {
    next(err);
    console.log(err);
  }
};
