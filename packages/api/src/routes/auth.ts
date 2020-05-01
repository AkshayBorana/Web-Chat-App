import { Router } from "express";
import { User } from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

export const authRouter = Router();

authRouter.post("/login", async (req, res, _next) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: { email }
  });

  const throwError = () => {
    res.status(400);
    res.json({
      error: `Invalid login credentials`
    });
  };

  // if user details not found or incorrect throw error...
  if (!user) throwError();
  if (!bcrypt.compareSync(password, user!.password)) throwError();

  const { password: p, ...userData } = user!.toJSON() as User;
  const token = jwt.sign(userData, JWT_SECRET);
  res.json({
    token
  });
});
