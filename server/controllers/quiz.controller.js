import Module from "../models/module.model.js";
import Question from "../models/question.model.js";
import Exp from "../models/exp.model.js";

export const fetchModule = async (req, res, next) => {
  try {
    const module = await Module.findOne({moduleTitle: req.params.module_name});
    const {lessons, questions, ...rest} = module;

    const allQuestions = await Question.find({
        questionID: { $in: questions }
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
    const exp = await Exp.findOne({difficulty: req.body.difficulty});
    //console.log(exp);
    res.status(201).send(exp);
  } catch (err) {
    next(err);
    console.log(err);
  }
};
