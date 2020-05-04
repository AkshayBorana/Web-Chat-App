import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "./history";
import { HomePage } from "../pages/Home/Home.page";
import { ConversationPage } from "../pages/Conversation/Conversation.page";
import { LoginPage } from "../pages/Login/Login.page";

export const AppRouter = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={HomePage} />
        <Route
          exact
          path="/conversation/:conversationId"
          component={ConversationPage}
        />
        <Route path="/login" component={LoginPage}></Route>
      </Switch>
    </Router>
  );
};
