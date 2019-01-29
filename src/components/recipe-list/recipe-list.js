import React, { Component } from "react";
import { withRouter } from "react-router-dom";

import RecipeListItem from '../recipe-list-item'

import './recipe-list.css'

class RecipeList extends Component {
  state = {
    recipe:[],
  }
  
  componentDidMount = async () => {
    const userId =
      localStorage.getItem("userId") ||
      (localStorage.setItem("userId", "5c4edc01fc79b221b47f0d68") ||
        "5c4edc01fc79b221b47f0d68");
  
    const myHeaders = new Headers({
      "Content-Type": "application/json"
    });
    const response = await fetch(
      `${window.REMOTE}/recipe/`,
      { method: "GET", headers: myHeaders }
    );
    const data = await response.json();
    this.setState({
      recipe: data.content
    });
  };

  deleteItem = id => {
    
    this.setState(({recipe})=> {
      console.log(id)
    console.log(recipe)
      const idx = recipe.findIndex((el) => el._id === id)
      const before = recipe.slice(0,idx)
      const after = recipe.slice(idx + 1)
      const newArray = [...before, ...after]
     
      console.log(idx)
      
      return{
        recipe: newArray
      }
    })
  };
  
  render() {
    
    const {recipe} =this.state
    const elements = recipe.map(item => {
      const { _id, ...itemProps } = item;

      return (
        <li key={_id} className="list-group-item">
          <RecipeListItem {...itemProps} id={_id} onDeleted={() => this.deleteItem(_id)} />
        </li>
      );
    });

    return (
<div className="container">
        <div className="row">
        
          <div className="col-md-3" />
          <div className="col-md-6">
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
