import Topic from "../models/topic.model.js";
import createError from "../utils/createError.js";
import Counter from "../models/counter.model.js";
import Admin from "../models/admin.model.js";

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
      moduleTitle: req.moduleTitle,
    };

    const result = await Topic.updateOne(
      { topicID: req.topicID },
      { $push: { modules: newModule } }
    );

    // Get all topics with topicID and topicTitle and modules fields only
    const topics = await Topic.find({}, "topicID topicTitle modules");

    const cons = await Admin.find({});
    res.status(200).send(cons);
  } catch (err) {
    //next(err);
  }
};

export const addLesson = async (req, res) => {
  try {
    //checking if module exists for this topic
    const topic = await Topic.findOne({
      topicID: req.topicID,
      "modules.moduleID": req.moduleID,
    });

    if (!topic) {
      return res.status(420).send("No such modules exist for this topic.");
    }

    const newLesson = {
      lessonText: req.lessonText,
      lessonImageURL: req.lessonImageURL,
    };

    const result = await Topic.updateOne(
      { "modules.moduleID": req.moduleID },
      { $push: { "modules.$.lessons": newLesson } }
    );
    // Get all topics with topicID and topicTitle and modules fields only
    const topics = await Topic.find({}, "topicID topicTitle modules");

    const cons = await Admin.find({});
    res.status(200).send(cons);
  } catch (err) {
    // next(err);
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
  }
};

export const sendAdminModule = async (req, res, next) => {
  try {
    const topic = await Topic.findOne({ topicID: req.body.data.topicID });
    const topicTitle = topic.topicTitle;

    req.body.data = { ...req.body.data, topicTitle };

    const newContribution = new Admin(req.body);
    const saved = await newContribution.save();

    if (saved) {
      res.status(201).send("Saved Successfully.");
    } else {
      res.status(401).send("Something went wrong.");
    }
  } catch (err) {
    next(err);
  }
};

export const sendAdminLesson = async (req, res, next) => {
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

    if (saved) {
      res.status(201).send("Saved Successfully.");
    } else {
      res.status(401).send("Something went wrong.");
    }
  } catch (err) {
    next(err);
  }
};
