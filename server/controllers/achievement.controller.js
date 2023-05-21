import Achievement from "../models/achievement.model.js";
import User from "../models/user.model.js";
import Exp from "../models/exp.model.js";

export const getAllAch = async (req, res, next) => {
  try {
    //all chieves
    const ach = await Achievement.find({});

    res.status(200).send(ach);
  } catch (err) {
    next(err);
    console.log(err);
  }
};

export const areYaWinningSon = async (req, res, next) => {
  try {
    
    //getting all ach
    const ach = await Achievement.find(
      {},
      { achieveID: 1, achieveCondition: 1 }
    );

    //getting user difficulty points
    const user = await User.findById(req.params.id);
    const exp = await Exp.findOne({ difficulty: user.difficulty });
    const points = exp.correctPoints;
    const userAchieved = user.achieved ? user.achieved : [1, 2, 3];

    //checking
    const achieveIDArray = [];
    ach.forEach((achievement) => {
      if (achievement.achieveCondition*points <= req.body.userExp) {
        achieveIDArray.push(achievement.achieveID);
      }
    });

    const didSonLose = achieveIDArray.every((value) => userAchieved.includes(value));
    //false = new achievement
    //true = no new achievement

    res.status(200).send(didSonLose);
  } catch (err) {
    next(err);
    console.log(err);
  }
};
