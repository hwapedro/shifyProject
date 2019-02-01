import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import Fridge from "../Fridge";
import userLogo from "../img/user.png";
import gif from "../img/gif12.gif";

import "./newRecipe.css";

class NewReceipe extends Component {
  addRecipe = () => { };
  maxId = 1;
  state = {
    value: "",
    ingredientsGlobal: [],
    amount: 1,
    selectorArray: [],
    ingredients: [],
    warningErorr: false,
    fridge: [],
    warningErorrRecipe: false
  };
  plusRecipe = async () => {
    if (this.state.value !== "") {
      
      if (this.state.ingredients.length !== 0) {
        const reqArray = this.state.ingredients.map(el => el.event);
        console.log(reqArray);
        const userId = localStorage.getItem("userId") 
        const myHeaders = new Headers({
          "Content-Type": "application/json"
        });
        const response = await fetch(`${window.REMOTE}/recipe/`, {
          method: "POST",
          headers: myHeaders,
          body: JSON.stringify({
            name: this.state.value,
            from: userId,
            ingredients: reqArray
          })
        });

        const data = await response.json();
        console.log(data);
        this.props.history.push("/");
      } else { 
        
        console.log('это массив ' + this.state.ingredients)
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
    } else {
      console.log(this.state.value);
      if (this.state.warningErorr !== true) {
        this.setState({
          warningErorr: !this.state.warningErorr
        });

        setTimeout(() => {
          this.setState({
            warningErorr: !this.state.warningErorr
          });
        }, 1000);
      }
    }
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
  addSelect = () => {
    let array = [...this.state.selectorArray];
    array.push({ id: this.maxId++ });
    this.setState({ selectorArray: array });
  };
  onDeleted = id => {
    console.log(id);

    this.setState(({ selectorArray, ingredients }) => {
      let afterDeleted = [...ingredients];

      const idx = selectorArray.findIndex(el => el.id === id);
      const before = selectorArray.slice(0, idx);

      const after = selectorArray.slice(idx + 1);
      const newArray = [...before, ...after];

      for (let i = 0; i < afterDeleted.length; i++) {
        console.log(id, afterDeleted[i].index);
        if (id === afterDeleted[i].index) {
          afterDeleted.splice(i, 1);
        }
      }

      console.log(afterDeleted);
      return {
        ingredients: afterDeleted,
        selectorArray: newArray
      };
    });
  };
  componentDidMount = async () => {
    const userId =
      localStorage.getItem("userId") ||
      (localStorage.setItem("userId", "5c4edc01fc79b221b47f0d68") ||
        "5c4edc01fc79b221b47f0d68");
    const myHeaders = new Headers({
      "Content-Type": "application/json"
    });

    const res = await fetch(`${window.REMOTE}/ingredient`, {
      method: "GET",
      headers: myHeaders
    });
    const dataIngredient = await res.json();

    const responseFridge = await fetch(
      `${window.REMOTE}/user/${userId}/fridge`,
      {
        method: "GET",
        headers: myHeaders
      }
    );

    const dataFridge = await responseFridge.json();

    this.setState(
      {
        fridge: dataFridge.content.fridge,
        ingredientsGlobal: dataIngredient.content
      },
      this.forceUpdate
    );
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  selectorChange = (event, index) => {
    let array = [...this.state.ingredients];

    if (array.length !== 0) {
      console.log(array);
      for (let i = 0; i < array.length; i++) {
        if (index === array[i].index) {
          array.splice(i, 1, { index: index, event: event.target.value });
          break;
        } else if (i === array.length - 1) {
          {
            array.push({ index: index, event: event.target.value });
            break;
          }
        }
      }
    } else {
      array.push({ index: index, event: event.target.value });
    }
    this.setState({
      ingredients: array
    });
  };
  BackToList = () => {
    this.props.history.push(`/`);
  };
  render() {
    const {
      value,
      ingredientsGlobal,
      selectorArray,
      warningErorr,
      warningErorrRecipe
    } = this.state;
    const { id } = selectorArray;
    console.log(value);
    const ingredients = ingredientsGlobal.map(el => {
      return (
        <option className="select-option" value={el._id} id={el._id}>
          {el.name}
        </option>
      );
    });
    const selectors = selectorArray.map(el => {
      return (
        <div className="all-select" key={el.id}>
          <select
            onChange={e => this.selectorChange(e, el.id)}
            className="select-item"
            name=""
          >
            <option selected="selected" disabled="disabled">
              CHOOSE ONE
            </option>
            {ingredients}
          </select>

          <button
            className="deleteOptionButton"
            onClick={() => this.onDeleted(el.id)}
          >
            x
          </button>
        </div>
      );
    });
    return (
      <div>
        <div className="recipe-header">
          <div className="container">
            <div className="row">
              <div className="col-md-2" />
              <div className="col-md-6 ">
                <h1 className="h1nameOfRecipe">NEW RECIPE</h1>
              </div>
              <div className="col-md-2">
                <div className="user-recipe">
                  <img
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
          <div className="container">
            <div className="row">
              <div className="col-md-2" />
              <div className="col-md-4">
                <div className="form-new-recipe">
                  <div className="yournewrecipe">
                    <form>
                      <label>
                        <span>YOUR NEW RECIPE</span>
                        <input
                          className="yourNameRecipe"
                          autoComplete="off"
                          type="text"
                          name="name"
                          value={value}
                          onChange={this.handleChange}
                        />
                      </label>
                    </form>
                  </div>
                  {selectors}
                  <div className="addRecipeIngredients">
                    <button onClick={this.addSelect}>ADD INGREDIENTS</button>
                  </div>
                </div>
              </div>
              <div className="col-md-6">
                <div className="recipe-gif">
                  <img src={gif} alt="" />
                </div>
                <div className="confirmRecipe">
                  <button onClick={this.plusRecipe}>CONFIRM</button>
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
              className={"Black  " + (this.state.fridgeVisible ? "" : "hidden")}
              onClick={this.closeFridge}
            />
          </div>
          <div className={"warning " + (warningErorr ? "" : "hidden")}>
            YOU HAVEN'T FILLED THE FORM
          </div>
          <div className={"warning " + (warningErorrRecipe ? "" : "hidden")}>
            YOU HAVEN'T ADD INGREDIENTS
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
      </div>
    );
  }
}

export default withRouter(NewReceipe);
