import { Router } from "express";
import { Conversation } from "../models/Conversation";
import { middlewareConvo } from "../middleware/authConversation";

export const conversationsRouter = Router();

// 1. to get all the list of conversations...
conversationsRouter.get("/", async (_req, res, _next) => {
  const conversations = await Conversation.findAll();
  res.json(conversations);
});

//2. create a conversation...
conversationsRouter.post("/", async (req, res, next) => {
  try {
    const conversation = new Conversation(req.body);
    await conversation.save();
    await conversation.$add("user", res.locals.user);
    res.json(conversation);
  } catch (e) {
    next(e);
  }
});

//3. get a conversation with a particular id...
conversationsRouter.get(
  "/:conversationId",
  middlewareConvo,
  async (req, res, _next) => {
    const { conversationId } = req.params;
    const conversation = await Conversation.findByPk(conversationId);
    res.json(conversation);
  }
);

// 4. Delete a conversation...
conversationsRouter.delete(
  "/:conversationId",
  middlewareConvo,
  async (req, res, next) => {
    try {
      Conversation.destroy({
        where: { id: req.params.conversationId }
      });

      res.json({
        message: `Successfully deleted`
      });
    } catch (e) {
      next(e);
    }
  }
);

// getting list of all messages that belog to a particular conversation...
conversationsRouter.get(
  "/:conversationId/messages",
  middlewareConvo,
  async (req, res, next) => {
    const { conversationId } = req.params;
    const conversation = await Conversation.findByPk(conversationId);
    if (!conversation)
      return next(new Error(`No conversation with this id found.`));
    const messages = await conversation.$get("messages");
    res.json(messages);
  }
);
