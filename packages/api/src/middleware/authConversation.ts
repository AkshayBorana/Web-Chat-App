import { RequestHandler } from "express";
import { checkUserConvo } from "../lib/CheckUserConvo";

export const middlewareConvo: RequestHandler = async (req, res, next) => {
  const { conversationId } = req.params;
  const { userId } = res.locals.user.id;

  try {
    await checkUserConvo(userId, conversationId);
  } catch (e) {
    next(e);
  }

  next();
};
