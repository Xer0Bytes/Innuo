import Topic from "../models/topic.model.js";
import Module from "../models/module.model.js";
import createError from '../utils/createError.js'

export const addModule = async (req, res, next) => {
  try {
    //add new module
    const newModule = new Module({
      ...req.body,
    });

    await newModule.save();
    
    const topic = await Topic.findOneAndUpdate(
      {topicTitle: req.body.topicTitle},
      {
        $push: {
          modules: [
            { moduleID: req.body.moduleID, moduleTitle: req.body.moduleTitle },
          ],
        },
      },
      { new: true }
    );

    console.log(topic);

    const modules = await Module.find({});

    res.status(201).send(modules);
  } catch (err) {
    next(err);
    console.log(err);
  }
};

export const getAllModules = async (req, res, next) => {
  try {
    //all topics
    const modules = await Module.find({});

    res.status(200).send(modules);
  } catch (err) {
    next(err);
    console.log(err);
  }
};

export const addLesson = async (req, res, next) => {
  try {

    const topic = await Topic.findOne({topicTitle: req.body.topicTitle,
      "modules.moduleTitle": req.body.moduleTitle});

    if(!topic) {
      return next(createError(420, "No such modules exist in that topic."));
    }

    const module = await Module.findOneAndUpdate(
      {moduleTitle: req.body.moduleTitle},
      {
        $push: {
          lessons: [
            { lessonID: req.body.lessonID, lessonText: req.body.lessonText, lessonImageURL: req.body.lessonImageURL },
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