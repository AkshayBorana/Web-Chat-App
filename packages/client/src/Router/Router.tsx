import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "./history";
import { HomePage } from "../pages/Home/home.page";
import { ConversationPage } from "../pages/Conversation/conversation.page";

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
      </Switch>
    </Router>
  );
};
