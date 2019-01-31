import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

class NewReceipe extends Component {
  addRecipe = () => {};
  maxId = 1;
  state = {
    value: "",
    ingredientsGlobal: [],
    amount: 1,
    selectorArray: [],
    ingredients: []
  };
  plusRecipe = async () => {
    const reqArray = this.state.ingredients.map(el => el.event);
    console.log(reqArray);
    const userId =
      localStorage.getItem("userId") ||
      (localStorage.setItem("userId", "5c4edc01fc79b221b47f0d68") ||
        "5c4edc01fc79b221b47f0d68");
    const myHeaders = new Headers({
      "Content-Type": "application/json"
    });
    const response = await fetch(`${window.REMOTE}/recipe/`, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        name:  this.state.value,
        from: userId,
        ingredients: reqArray
      })
    });

    const data = await response.json();
    console.log(data);
    this.props.history.push("/");
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
    const myHeaders = new Headers({
      "Content-Type": "application/json"
    });

    const res = await fetch(`${window.REMOTE}/ingredient`, {
      method: "GET",
      headers: myHeaders
    });
    const dataIngredient = await res.json();

    this.setState(
      {
        ingredientsGlobal: dataIngredient.content
      },
      this.forceUpdate
    );
  };

  handleChange = event => {
    const reqArray = this.state.ingredients.map(el => el.event);
    console.log({
      body: JSON.stringify({
        String: this.state.value,
        from: 1,
        ingredients: reqArray
      })
    });
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
    const { classes } = this.props;
    const { value, ingredientsGlobal, selectorArray } = this.state;
    const { id } = selectorArray;
    console.log(value);
    const ingredients = ingredientsGlobal.map(el => {
      return (
        <option value={el._id} id={el._id}>
          {el.name}
        </option>
      );
    });
    const selectors = selectorArray.map(el => {
      return (
        <div key={el.id}>
          <select
            onChange={e => this.selectorChange(e, el.id)}
            className="select-item"
            name=""
          >
            <option selected="selected">CHOOSE ONE</option>
            {ingredients}
          </select>

          <button onClick={() => this.onDeleted(el.id)}>x</button>
        </div>
      );
    });
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3" />

          <div className="col-md-6">
            <form>
              <label>
                YOUR RECIPE :
                <input
                  type="text"
                  name="name"
                  value={value}
                  onChange={this.handleChange}
                />
              </label>
            </form>

            {/* <select name="" id="">
              {ingredients}
            </select>
            <button
              className={selectorArray.length > 0 ? "" : "hidden"}
              onClick={()=>this.onDeleted({id})}
            >
              x
            </button> */}
            {selectors}
            <button onClick={this.addSelect}>add option</button>
          </div>
          <button onClick={this.plusRecipe}>add recipe</button>

          <div className="col-md-3" />
        </div>
        <Fab
          onClick={this.BackToList}
          color="primary"
          aria-label="Add"
          className={`buttonFridge ${classes.fab}`}
        >
          <AddIcon />
        </Fab>
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(NewReceipe));
