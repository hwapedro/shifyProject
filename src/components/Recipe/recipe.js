import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import "./recipe.css";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

import Grid from "@material-ui/core/Grid";

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

class Recipe extends Component {
  state = {
    amount: 0,
    recipeOne: [],
    name: "",
    ingredients: [],
    id: "",
    ingredientsGlobal: []
  };

  

  componentDidMount = async () => {
    const myHeaders = new Headers({
      "Content-Type": "application/json"
    });

    const response = await fetch(
      `http://germangorodnev.com:4500/recipe/${this.props.match.params.id}`,
      { method: "GET", headers: myHeaders }
    );

    const data = await response.json();
    console.log(this.props);

    const res = await fetch(`http://germangorodnev.com:4500/ingredient`, {
      method: "GET",
      headers: myHeaders
    });
    const dataIngredient = await res.json();

    this.setState(
      {
        ingredientsGlobal: dataIngredient.content,
        recipeOne: data.content,
        name: data.content.from.name,
        ingredients: data.content.ingredients
      },
      this.forceUpdate
    );
  };

  plus = async id => {
    const userId =
      localStorage.getItem("userId") ||
      (localStorage.setItem("userId", "5c4edc01fc79b221b47f0d68") ||
        "5c4edc01fc79b221b47f0d68");
    const myHeaders = new Headers({
      "Content-Type": "application/json"
    });
    console.log(id);
    const response = await fetch(
      `http://germangorodnev.com:4500/recipe/${this.props.match.params.id}`,
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
    console.log(data);
    if (data.content.added) {
      this.setState(
        {
          ingredients: data.content.updated.ingredients
        },
        this.forceUpdate
      );
    }
  };
  BackToList = () => {
    this.props.history.push(`/`);
  };
  render() {
    const { recipeOne, name, ingredients, ingredientsGlobal } = this.state;
    const{classes} = this.props
    console.log(ingredientsGlobal);
    const elements = ingredients
      .sort((a, b) => a.done - b.done)
      .map(item => {
        const { ingredient, done, ...itemProps } = item;
        return (
          <li key={ingredient} className="list-group-item">
            <span className={done ? "" : "hidden"}>x</span>
            <span className="col-md-3" {...itemProps} id={ingredient}>
              {ingredientsGlobal.find(el => el._id === item.ingredient).name}
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
        <div className="container">
          <div className="row">
            <div className="col-md-3" />
            <div className="col-md-3 headColor">
              <h1>{recipeOne && recipeOne.name}</h1>
              <h2>{recipeOne && name}</h2>
            </div>
            <div className="col-md-3 headColor">
              <div className="user">
                <Grid className="user_GridRight" alignItems="center" container>
                  <Avatar
                    className="user_purpleAvatar"
                    onClick={this.openFridge}
                  >
                    I
                  </Avatar>
                </Grid>
              </div>
            </div>
            <div className="col-md-3" />
            <div>
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div>
                      <ul className="ingredients">{elements}</ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
      </div>
    );
  }
}

export default withStyles(styles)(withRouter(Recipe));
