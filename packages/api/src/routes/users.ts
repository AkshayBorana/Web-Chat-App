import { Router } from "express";
import { User } from "../models/User";
import bcrypt from "bcryptjs";

export const usersRouter = Router();

//get list of users...
usersRouter.get("/", async (_req, res, _next) => {
  const users = await User.findAll();
  res.json(users);
});

// find user by id...
usersRouter.get("/:userId", async (req, res, _next) => {
  const { userId } = req.params;
  const user = await User.findByPk(userId);
  res.json(user);
});

//create a user...
usersRouter.post("/", async (req, res, next) => {
  try {
    const { password: plain, ...userData } = req.body;

    const salt = bcrypt.genSaltSync(10);
    const password = bcrypt.hashSync(plain, salt);

    const user = new User({
      ...userData,
      password
    });

    await user.save();
    res.json(user);
  } catch (e) {
    next(e);
  }
});

//delete a user...
usersRouter.delete("/:userId", async (req, res, next) => {
  try {
    User.destroy({
      where: { id: req.params.userId }
    });
    res.json({
      message: `Successfully deleted the user`
    });
  } catch (e) {
    next(e);
  }
});
