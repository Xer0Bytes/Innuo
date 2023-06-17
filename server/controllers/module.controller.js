import Topic from "../models/topic.model.js";
import Module from "../models/module.model.js";
import createError from "../utils/createError.js";
import Counter from "../models/counter.model.js";

export const addModule = async (req, res, next) => {
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
      { topicTitle: req.body.topicTitle },
      { $push: { modules: newModule } }
    );

    const modules = await Topic.find(
      {},
      { _id: 0, "modules.moduleID": 1, "modules.moduleTitle": 1 }
    );

    res.status(201).send(modules);
  } catch (err) {
    next(err);
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

export const addLesson = async (req, res, next) => {
  try {
    //checking if module exists for this topic
    const topic = await Topic.findOne({
      topicTitle: req.body.topicTitle,
      "modules.moduleTitle": req.body.moduleTitle,
    });

    if (!topic) {
      return next(createError(420, "No such modules exist in that topic."));
    }

    const module = await Module.findOneAndUpdate(
      { moduleTitle: req.body.moduleTitle },
      {
        $push: {
          lessons: [
            {
              lessonID: req.body.lessonID,
              lessonText: req.body.lessonText,
              lessonImageURL: req.body.lessonImageURL,
            },
          ],
        },
      },
      { new: true }
    );

    console.log(module);

    res.status(201).send("Successfully added");
  } catch (err) {
    next(err);
    console.log(err);
  }
};
