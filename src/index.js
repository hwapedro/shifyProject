import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import NewRecipe from "./components/NewRecipe";
import App from "./components/App";


class Shift extends React.Component {
  render() {
    return (
      <Router forceRefresh={true}>
        <Switch>
          <Route path="/" exact component={App} />
          <Route path="/newRecipe" component={NewRecipe} />
          <Route path="/recipe/:id" component={NewRecipe} />
          <Route path="/register" component={NewRecipe} />
          <Route path="/login" component={NewRecipe} />
        </Switch>
      </Router>
    );
  }
}

ReactDOM.render(<Shift />, document.getElementById("root"));
