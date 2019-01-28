import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import "./header.css";

class Header extends Component {
  addRecipe = () => {
    this.props.history.push("/newRecipe");
  };

  render() {
    return (
      <div>
        <Button variant="contained" color="primary" onClick={this.addRecipe}>
          {" "}
          CREATE RECIPE{" "}
        </Button>
      </div>
    );
  }
}
export default withRouter(Header);
