import React, { useState, useEffect } from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "./history";
import { HomePage } from "../pages/Home/Home.page";
import { ConversationPage } from "../pages/Conversation/Conversation.page";
import { LoginPage } from "../pages/Login/Login.page";
import { api } from "../lib/API";

export const AppRouter = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const loadMe = async () => {
    const me = await api.me();
    setLoading(false);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) setLoading(false);
    else loadMe();
  }, []);

  if (loading) return <span>loading...</span>;

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
