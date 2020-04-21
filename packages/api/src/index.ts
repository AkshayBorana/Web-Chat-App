import express from "express";
import { sequelize } from "./database";
import bodyParser from "body-parser";
import { usersRouter } from "./routes/user";

const runApp = async () => {
  const app = express();

  try {
    await sequelize.authenticate();
    await sequelize.sync(); // sync changes to database...
  } catch (e) {
    console.log(e);
  }

  app.use(bodyParser.json());
  app.use("/users", usersRouter);
  app.listen(4200);
  console.log(`listening to port 4200`);
};

runApp();
