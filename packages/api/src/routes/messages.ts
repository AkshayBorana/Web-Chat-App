import { Router } from "express";
import { Message } from "../models/Message";
import { checkUserConvo } from "../lib/CheckUserConvo";

export const messagesRouter = Router();

// // 1. get list of all messages
// messagesRouter.get("/", async (_req, res, _next) => {
//   const messages = await Message.findAll();
//   res.json(messages);
// });

//1. Create a message...
messagesRouter.post("/", async (req, res, next) => {
  try {
    await checkUserConvo(res.locals.user.id, req.body.conversationId);
    const { content, userId, conversationId } = req.body;
    const message = new Message({ content, userId, conversationId });
    await message.save();
    res.json(message);
  } catch (e) {
    next(e);
  }
});
