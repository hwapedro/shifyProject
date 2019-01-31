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
        <button className = 'header-button' onClick={this.addRecipe}>
          {" "}
          ADD{" "}
        </button>
      </div>
    );
  }
}
export default withRouter(Header);
