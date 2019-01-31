import React, { Component } from "react";

import Header from "../Header";
import Fridge from "../Fridge";

import RecipeList from "../recipe-list";
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
import userLogo from "../img/user.png";
import "./app.css";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

class App extends Component {
  state = {
    fridgeVisible: false,
    succsess: true,
    error: undefined,
    fridge: [],
    value: ""
  };
  handleChange = event => {
    this.setState({ value: event.target.value });
  };
  componentDidMount = async () => {
    const userId =
      localStorage.getItem("userId") ||
      (localStorage.setItem("userId", "5c4edc01fc79b221b47f0d68") ||
        "5c4edc01fc79b221b47f0d68");

    const myHeaders = new Headers({
      "Content-Type": "application/json"
    });
    const response = await fetch(`${window.REMOTE}/user/${userId}/fridge`, {
      method: "GET",
      headers: myHeaders
    });
    const data = await response.json();
    this.setState({
      fridge: data.content.fridge
    });
  };

  showRecipe = () => {
    this.props.history.push("/recipe/:id");
  };

  openFridge = () => {
    this.setState({
      fridgeVisible: true
    });
  };

  closeFridge = () => {
    this.setState({
      fridgeVisible: false
    });
  };

  render() {
    const { value } = this.state;
    return (
      <div>
        <div className="sosi">
          <div className="header">
            <div className="container">
              <div className="row">
                <div className="col-md-2" />
                <div className="col-md-2 headColor">
                  <Header />
                </div>
                <div className="col-md-4 headColor">
                  <form action="">
                    <input
                      className="searchRecipe"
                      type="text"
                      name="name"
                      value={value}
                      onChange={this.handleChange}
                    />
                  </form>
                </div>

                <div className="col-md-2">
                  <div className="user">
                    <img
                      src={userLogo}
                      width = '45px'
                      height = '45px'
                      className="user_purpleAvatar"
                      onClick={this.openFridge}
                    ></img>
                  </div>
                  <div className="fridge1">
                    <Fridge
                      fridge={this.state.fridge}
                      closeFridge={this.closeFridge}
                      visible={this.state.fridgeVisible}
                    />
                  </div>
                </div>
                <div className="col-md-2" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <div className="container">
            <div className="tow">
              <div className="col-md-12">
                <RecipeList value={value} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default App;
