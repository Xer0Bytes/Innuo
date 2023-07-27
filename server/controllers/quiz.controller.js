import Topic from "../models/topic.model.js";
import Exp from "../models/exp.model.js";
import User from "../models/user.model.js";

export const fetchModule = async (req, res, next) => {
  try {
    const module = await Topic.findOne(
      {
        "modules.moduleID": Number(req.params.module_id),
      },
      "modules"
    );
    const { lessons, questions } = module?.modules[0];

    const response = [lessons, questions];

    res.status(201).send(response);
  } catch (err) {
    next(err);
  }
};

export const getExp = async (req, res, next) => {
  try {
    const exp = await Exp.findOne({ difficulty: req.body.difficulty });
    res.status(201).send(exp);
  } catch (err) {
    next(err);
  }
};

export const updateExpAndCompModules = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const updateExp = req.body.updateExp;
    const moduleID = req.body.moduleID;

    const user = await User.findOneAndUpdate(
      {
        _id: userId,
        modulesCompleted: { $ne: moduleID },
      },
      {
        $set: { experiencePoints: updateExp },
        $push: { modulesCompleted: moduleID },
      },
      { new: true }
    );
    res.status(201).send(user);
  } catch (err) {
    next(err);
  }
};
