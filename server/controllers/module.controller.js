import Topic from "../models/topic.model.js";
import Module from "../models/module.model.js";

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
