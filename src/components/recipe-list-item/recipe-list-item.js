import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import "./recipe-list-item.css";
import check from '../recipe-list-item/img/read.png'
class RecipeListItem extends Component {
  state = {
    amountOdReady: 0
  };
  ShowRecipe = () => {
    this.props.history.push(`/recipe/${this.props.id}`);
  };
  componentDidMount = async () => {
    let ArrayOfReady = [];
    let count = 0;
    console.log(this.props.ingredients.length);
    for (let j = 0; j < this.props.ingredients.length; j++) {
      let ShellowCopyIngredients = this.props.ingredients[j];
      if (ShellowCopyIngredients.done) {
        count++;
      }
    }
    this.setState({
      amountReadyIngredients: count
    });
  };
  render() {
    const { amountReadyIngredients } = this.state;
    const {
      name,
      onDeleted,
      from,
      key,
      value,
      id,
      done,
      ingredients
    } = this.props;
    return (
      <li
        key={id}
        className={
          `list-group-items ` + (name.indexOf(value) == -1 ? "hidden" : "")
        }
      >
        <div className="col-md-12">
          <div className="row">
            <div className="col-md-10">
              <div className={done ? "recipe-item-ready" : ""}>
                <div className="recipe-item" onClick={this.ShowRecipe}>
                  <span className="recipe-list-item-label">{name}</span>
                  <br />
                  <span className="who-create">{`${from.name} `}</span>
                </div>
              </div>
            </div>
            {/* <button
                  type="button"
                  className="btn btn-outline-danger btn-sm float-right"
                  onClick={() => onDeleted(key)}
                >
                  <i className="fa fa-trash-o" />
                
                </button> */}

            <div className="col-md-2">
              <span
                className={
                  amountReadyIngredients === ingredients.length
                    ? "hidden ready-list"
                    : "amount-of-needs"
                }
              >{`${amountReadyIngredients} / ${ingredients.length}`}</span>
              <img src = {check} height = '80px' width = '90px'
                className={
                  amountReadyIngredients === ingredients.length
                    ? "ready-list"
                    : "hidden"
                }
              ></img>
            </div>
          </div>
        </div>
      </li>
    );
  }
}

export default withRouter(RecipeListItem);
