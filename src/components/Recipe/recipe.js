import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./recipe.css";
import Fridge from "../Fridge";

import userLogo from "../img/user.png";
import gif from "../img/gif12.gif";
import ready from "../img/read.png";

class Recipe extends Component {
  state = {
    amount: 0,
    recipeOne: [],
    name: "",
    ingredients: [],
    id: "",
    ingredientsGlobal: [],
    fridgeVisible: false,
    openFlagDoor: false,
    fridge: [],
    room: "",
    goAnime: false,
    warningErorrRecipe: false
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
      `${window.REMOTE}/recipe/${this.props.match.params.id}/?user=babin`,
      { method: "GET", headers: myHeaders }
    );

    const responseFridge = await fetch(
      `${window.REMOTE}/user/${userId}/fridge`,
      {
        method: "GET",
        headers: myHeaders
      }
    );

    const dataFridge = await responseFridge.json();

    const data = await response.json();

    const res = await fetch(`${window.REMOTE}/ingredient`, {
      method: "GET",
      headers: myHeaders
    });
    const dataIngredient = await res.json();

    this.setState(
      {
        fridge: dataFridge.content.fridge,
        ingredientsGlobal: dataIngredient.content,
        recipeOne: data.content,
        name: data.content.from.name,
        ingredients: data.content.ingredients,
        room: data.content.from.room
      },
      this.forceUpdate
    );
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
  plus = async id => {
    const userId = localStorage.getItem("userId");
    const myHeaders = new Headers({
      "Content-Type": "application/json"
    });

    const response = await fetch(
      `${window.REMOTE}/recipe/${this.props.match.params.id}`,
      {
        method: "PUT",
        headers: myHeaders,
        body: JSON.stringify({
          ingredient: id,
          plus: 1,
          from: userId
        })
      }
    );
    const data = await response.json();
    if (data.content.added) {
      this.setState(
        {
          ingredients: data.content.updated.ingredients
        },
        this.forceUpdate
      );
    } else {
      if (this.state.warningErorr !== true) {
        this.setState({
          warningErorrRecipe: !this.state.warningErorrRecipe
        });

        setTimeout(() => {
          this.setState({
            warningErorrRecipe: !this.state.warningErorrRecipe
          });
        }, 1000);
      }
    }
  };
  BackToList = () => {
    this.props.history.push(`/`);
  };

  render() {
    const {
      recipeOne,
      name,
      room,
      ingredients,
      ingredientsGlobal,
      warningErorrRecipe
    } = this.state;


    const elements = ingredients
      .sort((a, b) => a.done - b.done)
      .map(item => {
        const { ingredient, done, ...itemProps } = item;
        return (
          <li key={ingredient} className="recipe-item2">
            <span
              className="recipe-item-name-span"
              {...itemProps}
              id={ingredient}
            >
              {ingredientsGlobal.find(el => el._id === item.ingredient).name}
            </span>
            <span className={done ? "recipe-ing-ready" : "hidden"}>
              <img width="30px" height="30px" src={ready} alt="" />
            </span>
            <button
              onClick={() => {
                this.plus(ingredient);
              }}
              className={`ingredients_items_button${done ? " hidden" : ""}`}
            >
              +
            </button>
          </li>
        );
      });
    return (
      <div>
        <div className="recipe-header">
          <div className="container">
            <div className="row">
              <div className="col-md-2" />
              <div className="col-md-6 ">
                <div className="headName">
                  <h1 className="h1nameOfRecipe">
                    {recipeOne && recipeOne.name}
                  </h1>
                  <h2 className="h2whoCreatedRecipe">
                    {recipeOne && name} {recipeOne && room}
                  </h2>
                </div>
              </div>
              <div className="col-md-2">
                <div className="user-recipe">
                  <img
                    alt="Logo"
                    src={userLogo}
                    width="45px"
                    height="45px"
                    className="user_purpleAvatar"
                    onClick={this.openFridge}
                  />
                </div>
              </div>
              <div className="col-md-2" />
            </div>
          </div>
        </div>
        <div>
          <div className={`${recipeOne && name ? " " : "hidden"}`}>
            <div className="container">
              <div className="row">
                <div className="col-md-2" />
                <div className="col-md-4">
                  <div>
                    <ul className="ingredients">{elements}</ul>
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="recipe-gif">
                    <img src={gif} alt="" />
                  </div>
                  <div className="goToMenu">
                    <button onClick={this.BackToList}>MAIN MENU</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="container">
            <div className="row">
              <div
                className={
                  "Black  " + (this.state.fridgeVisible ? "" : "hidden")
                }
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
            <div className={"warning " + (warningErorrRecipe ? "" : "hidden")}>
              NOT ENOUGH INGREDIANTS
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(Recipe);
