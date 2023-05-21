import Achievement from "../models/achievement.model.js";

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