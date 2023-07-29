import User from "../models/user.model.js";
import Admin   from "../models/admin.model.js";
import createError from "../utils/createError.js";

export const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (req.params.id != user._id.toString()) {
    return next(createError(403, "You can only delete your own account!"));
  }

  await User.findByIdAndDelete(req.params.id);
  res.status(200).send("Successfully Deleted.");
};

export const updateUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        difficulty: req.body.difficulty,
        pfpLink: req.body.pfpLink,
      },
      { new: true }
    );

    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};

export const getAllUsers = async (req, res, next) => {
  try {
    //all users for ranking
    const users = await User.find(
      { isAdmin: false },
      { name: 1, experiencePoints: 1, difficulty: 1 }
    );

    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    //all users
    const user = await User.findById(req.body.id);

    res.status(200).send(user);
  } catch (err) {
    next(err);
  }
};

export const getConNotifs = async (req, res, next) => {
  try {
    //checking if current user exists
    const user = await User.findById(req.params.id);

    if(user) {
      const contributions = await Admin.find({con_id: req.params.id}).sort({ updatedAt: -1 });

      // if(contributions.length > 0) {
        res.status(200).send(contributions);

      // } else {
      //   res.status(404).send("No contributions found!");
      // }

    } else {
      res.status(404).send("No such users exist!");
    }

  } catch (err) {
    next(err);
  }
};
