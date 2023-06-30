import Topic from "../models/topic.model.js";
import createError from "../utils/createError.js";
import Counter from "../models/counter.model.js";

export const addModule = async (req, res) => {
  try {
    const sequence = await Counter.findOneAndUpdate(
      { _id: "moduleID" },
      { $inc: { seq: 1 } },
      { new: true }
    );

    const nextModuleID = sequence.seq;

    const newModule = {
      moduleID: nextModuleID,
      moduleTitle: req.body.moduleTitle,
    };

    const result = await Topic.updateOne(
      { topicID: req.body.topicID },
      { $push: { modules: newModule } }
    );

    
    // Get all topics with topicID and topicTitle and modules fields only
    const topics = await Topic.find({}, "topicID topicTitle modules");

    // res.status(201).send(topics);
    res.status(201).send("Saved Successfully.");
  } catch (err) {
    //next(err);
    console.log(err);
  }
};

export const addLesson = async (req, res) => {
  try {
    //checking if module exists for this topic
    const topic = await Topic.findOne({
      topicID: req.body.topicID,
      "modules.moduleID": req.body.moduleID,
    });

    if (!topic) {
      return res.status(420).send("No such modules exist for this topic.");
    }

    const newLesson = {
      lessonText: req.body.lessonText,
      lessonImageURL: req.body.lessonImageURL,
    };

    const result = await Topic.updateOne(
      { "modules.moduleID": req.body.moduleID },
      { $push: { "modules.$.lessons": newLesson } },
    );
    // Get all topics with topicID and topicTitle and modules fields only
    const topics = await Topic.find({}, "topicID topicTitle modules");

    // res.status(201).send(topics);
    res.status(201).send("Saved Successfully.");
  } catch (err) {
    // next(err);
    console.log(err);
  }
};

export const getAllModules = async (req, res, next) => {
  try {
    //all topics
    const modules = await Topic.find(
      {},
      { _id: 0, "modules.moduleID": 1, "modules.moduleTitle": 1 }
    );

    res.status(200).send(modules);
  } catch (err) {
    next(err);
    console.log(err);
  }
};