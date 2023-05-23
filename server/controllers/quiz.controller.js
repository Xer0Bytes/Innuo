import Module from "../models/module.model.js";
import Question from "../models/question.model.js";
import Exp from "../models/exp.model.js";
import User from "../models/user.model.js";

export const fetchModule = async (req, res, next) => {
  try {
    const module = await Module.findOne({
      moduleTitle: req.params.module_name,
    });
    const { lessons, questions, ...rest } = module;

    const allQuestions = await Question.find({
      questionID: { $in: questions },
    });

    const response = [lessons, allQuestions];

    res.status(201).send(response);
  } catch (err) {
    next(err);
    console.log(err);
  }
};

export const getExp = async (req, res, next) => {
  try {
    const exp = await Exp.findOne({ difficulty: req.body.difficulty });
    //console.log(exp);
    res.status(201).send(exp);
  } catch (err) {
    next(err);
    console.log(err);
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
    console.log(err);
  }
};
