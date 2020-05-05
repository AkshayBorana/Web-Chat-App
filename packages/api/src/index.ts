import express from "express";
import cors from "cors";
import { sequelize } from "./database";
import bodyParser from "body-parser";
import { usersRouter } from "./routes/users";
import { conversationsRouter } from "./routes/conversations";
import { messagesRouter } from "./routes/messages";
import { authRouter } from "./routes/auth";
import { middlewareAuth } from "./middleware/auth";
import { meRouter } from "./routes/me";

const runApp = async () => {
  const app = express();

  try {
    await sequelize.authenticate();
    await sequelize.sync(); // sync changes to database...
  } catch (e) {
    console.log(e);
  }

  app.use(cors());
  app.use(bodyParser.json());
  app.use("/auth", authRouter);
  app.use("/users", middlewareAuth, usersRouter);
  app.use("me", middlewareAuth, meRouter);
  app.use("/conversations", middlewareAuth, conversationsRouter);
  app.use("/messages", middlewareAuth, messagesRouter);
  app.listen(4200);
  console.log("listening to port 4200");
};

runApp();
