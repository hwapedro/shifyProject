import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import RecipeListItem from "../recipe-list-item";

import "./recipe-list.css";

class RecipeList extends Component {
  state = {
    recipe: []
  };

  

  componentDidMount = async () => {
    const myHeaders = new Headers({
      "Content-Type": "application/json"
    });
    const response = await fetch(`${window.REMOTE}/recipe/`, {
      method: "GET",
      headers: myHeaders
    });
    const data = await response.json();

    this.setState({
      recipe: data.content
    });
  };

  deleteItem = id => {
    this.setState(({ recipe }) => {

      const idx = recipe.findIndex(el => el._id === id);
      const before = recipe.slice(0, idx);
      const after = recipe.slice(idx + 1);
      const newArray = [...before, ...after];



      return {
        recipe: newArray
      };
    });
  };

  render() {
    const { recipe } = this.state;
    const {value} = this.props

    const elements = recipe.map(item => {
      const { _id, ...itemProps } = item;
      return (
        <RecipeListItem
          value={value}
          {...itemProps}
          key ={_id}
          id={_id}
          onDeleted={() => this.deleteItem(_id)}
        />
      );
    });

    return (
        <div className="row">
          <div className="col-md-2" />
          <div className="col-md-8">
            <div className="row">
              <div className="receipe">
                
                <ul className="todo-list">{elements}</ul>
              </div>
            </div>
          </div>
          <div className="col-md-2" />
        </div>
    
    );
  }
}

export default withRouter(RecipeList);
