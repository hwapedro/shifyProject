import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import RecipeListItem from "../recipe-list-item";

import "./recipe-list.css";

class RecipeList extends Component {
  state = {
    recipe: [],
    value: ""
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
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
      console.log(id);
      console.log(recipe);
      const idx = recipe.findIndex(el => el._id === id);
      const before = recipe.slice(0, idx);
      const after = recipe.slice(idx + 1);
      const newArray = [...before, ...after];

      console.log(idx);

      return {
        recipe: newArray
      };
    });
  };

  render() {
    const { recipe,value } = this.state;
    const elements = recipe.map(item => {
    const { _id, ...itemProps } = item;
      console.log({...itemProps})
      return (
        
          <RecipeListItem
            value = {value}
            {...itemProps}
            id={_id}
            onDeleted={() => this.deleteItem(_id)}
          />

      );
    });

    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3" />
          <div className="col-md-6">
            <form action="">
              <input
                type="text"
                name="name"
                value={value}
                onChange={this.handleChange}
              />
            </form>
            <div className="receipe">
              <ul className="list-group todo-list">{elements}</ul>
            </div>
          </div>

          <div className="col-md-3" />
        </div>
      </div>
    );
  }
}

export default withRouter(RecipeList);
