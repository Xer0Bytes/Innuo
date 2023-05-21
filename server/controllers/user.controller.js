import User from "../models/user.model.js";
import createError from "../utils/createError.js";

export const deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);

  if (req.userId != user._id.toString()) {
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
    console.log(err);
  }
};
