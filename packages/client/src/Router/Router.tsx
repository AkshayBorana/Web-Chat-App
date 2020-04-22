import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import { history } from "./history";
import { HomePage } from "../pages/Home/home.page";

export const AppRouter = () => {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" component={HomePage} />
      </Switch>
    </Router>
  );
};
