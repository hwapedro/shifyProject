import React, { Component } from "react";

import Header from "../Header";
import Fridge from "../Fridge";

import RecipeList from "../recipe-list";

import "./app.css";

class App extends Component {
  constructor() {

    super();
    console.log(localStorage.getItem('userId') )
    if(localStorage.getItem('userId') === null ){
    window.history.pushState({}, "", '/login');
    window.history.go();
    }
    
   }
  state = {
    fridgeVisible: false,
    succsess: true,
    error: undefined,
    fridge: [],
    value: "",
    openFlagDoor: false
  };
  handleChange = event => {
    this.setState({ value: event.target.value });
  };
  componentDidMount = async () => {
    const userId = localStorage.getItem("userId");

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
      fridgeVisible: false,
      openFlagDoor: false
    });
  };

  openFridgeDoor = () => {
    this.setState({
      openFlagDoor: !this.state.openFlagDoor
    });
  };

  render() {
    const { value } = this.state;
    return (
      <div>
        <div className="sosi">
          <Header
            value={value}
            addRecipe={this.addRecipe}
            handleChange={this.handleChange}
            openFridge={this.openFridge}
          />
        </div>
        <div>
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <RecipeList value={value} />
              </div>
            </div>
          </div>
          <div
            className={"Black  " + (this.state.fridgeVisible ? "" : "hidden")}
            onClick={this.closeFridge}
          />
        </div>
        <div className="fridge1">
          <Fridge
            openFridgeDoor={this.openFridgeDoor}
            openFlagDoor={this.state.openFlagDoor}
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
