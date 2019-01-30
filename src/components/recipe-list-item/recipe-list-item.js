import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { formatMs } from "@material-ui/core/styles/transitions";
import "./recipe-list-item.css";

class RecipeListItem extends Component {
  ShowRecipe = () => {
    this.props.history.push(`/recipe/${this.props.id}`);
  };
  render() {
    const { name, onDeleted, from ,key,value,id,done} = this.props;
    return (
      <li key={id} className={`list-group-item ` + ((name.indexOf(value)==-1) ? 'hidden':'')}>
      <div className = {done ? 'recipe-item-ready':''}>
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
      </li>
    );
  }
}

export default withRouter(RecipeListItem);
