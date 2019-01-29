import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { formatMs } from "@material-ui/core/styles/transitions";
import "./recipe-list-item.css";

class RecipeListItem extends Component {
  ShowRecipe = () => {
    this.props.history.push(`/recipe/${this.props.id}`);
  };
  
  render() {
    const { name, onDeleted, from ,key} = this.props;
    console.log(this.props);
    return (
      
      <div>
        <div className="recipe-item" onClick={this.ShowRecipe}>
          <span className="recipe-list-item-label">{name}</span>
          <br />
          <span className="who-create">{from.name}</span>
        </div>
        <button
          type="button"
          className="btn btn-outline-danger btn-sm float-right"
          onClick={()=>onDeleted(key)}
        >
          <i className="fa fa-trash-o" />
        </button>
      </div>
    );
  }
}

export default withRouter(RecipeListItem);
