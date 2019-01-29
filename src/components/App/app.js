import React, { Component } from "react";

import Header from "../Header";
import Fridge from "../Fridge";



import RecipeList from "../recipe-list"
import Avatar from "@material-ui/core/Avatar";
import Grid from "@material-ui/core/Grid";
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
    fridge: []
  };

  

  componentDidMount = async () => {
    const userId =
      localStorage.getItem("userId") ||
      (localStorage.setItem("userId", "5c4edc01fc79b221b47f0d68") ||
        "5c4edc01fc79b221b47f0d68");

    const myHeaders = new Headers({
      "Content-Type": "application/json"
    });
    const response = await fetch(
      `http://germangorodnev.com:4500/user/${userId}/fridge`,
      { method: "GET", headers: myHeaders }
    );
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
    const { list } =this.state
    return (
      <div className="sosi">
        <div className="header">
          <div className="container">
            <div className="row">
              <div className="col-md-3" />
              <div className="col-md-3 headColor">
                <Header />
              </div>
              <div className="col-md-3 headColor">
                <div className="user">
                  <Grid
                    className="user_GridRight"
                    alignItems="center"
                    container
                  >
                    <Avatar
                      className="user_purpleAvatar"
                      onClick={this.openFridge}
                    >
                      I
                    </Avatar>
                  </Grid>
                </div>
              </div>
            </div>
            <RecipeList />
            <div className="col-md-3" />
          </div>
        </div>
      <div className="fridge1">
      <Fridge
        fridge={this.state.fridge}
        closeFridge={this.closeFridge}
        visible={this.state.fridgeVisible}
      />
    </div>
    </div>
    );
  }
}
export default App;
