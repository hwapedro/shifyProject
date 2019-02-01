import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import { withRouter } from "react-router-dom";
import "./header.css";
import userLogo from "../img/user.png";

class Header extends Component {
  addRecipe = () => {
    this.props.history.push("/newRecipe");
  };

  render() {
    const{handleChange,openFridge,value} = this.props
    return (
      <div className="header">
      <div className="container">
        <div className="row">
          <div className="col-md-2" />
          <div className="col-md-2 headColor">
            <div>
              <button className="header-button" onClick={this.addRecipe}>
                {" "}
                ADD{" "}
              </button>
            </div>
          </div>
          <div className="col-md-4 headColor">
            <form action="">
              <input
                className="searchRecipe"
                placeholder="Search"
                autoComplete="off"
                type="text"
                name="name"
                value={value}
                onChange={handleChange}
              />
            </form>
          </div>

          <div className="col-md-2">
            <div className="user">
              <img
                src={userLogo}
                width="45px"
                height="45px"
                className="user_purpleAvatar"
                onClick={openFridge}
              />
            </div>
          </div>
          <div className="col-md-2" />
        </div>
      </div>
    </div>
    );
  }
}
export default withRouter(Header);
