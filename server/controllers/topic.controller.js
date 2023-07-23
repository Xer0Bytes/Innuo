import Topic from "../models/topic.model.js";
import Counter from "../models/counter.model.js";
import Admin from "../models/admin.model.js";

export const addTopic = async (req, res) => {
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
      topicTitle: req.topicTitle,
    });

    // Validate and save the new topic
    const savedTopic = await newTopic.save();

    // Get all topics with topicID and topicTitle fields only
    const topics = await Topic.find({}, "topicID topicTitle modules");

    const cons = await Admin.find({});
    res.status(200).send(cons);
  } catch (err) {
    //next(err);
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

export const sendAdminTopic = async (req, res, next) => {
  try {
    const saved = await Admin.create(req.body);
    
    if(saved) {
      res.status(201).send("Saved Successfully.");
    } else {
      res.status(401).send("Something went wrong.");
    }
  } catch (err) {
    next(err);
    console.log(err);
  }
};
