import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import NewRecipe from "./components/NewRecipe";
import App from "./components/App";
import Recipe from "./components/Recipe";
import Notificator from './components/Nsys';
import ws from 'websocket';

class Shift extends React.Component {
  state = {

  };

  _notificationSystem = null;

  constructor(props) {
    super(props);
    window.REMOTE = 'http://localhost:4500';
    // init websocket
    // localStorage.setItem("userId", "5c4edc01fc79b221b47f0d68");

    this.client = new ws.w3cwebsocket('ws://localhost:4500/', 'echo-protocol');

    this.client.onerror = () => {
      console.log('Connection Error');
    };

    this.client.onopen = () => {
      console.log('WebSocket Client Connected');

      // send its user ID
      const sendMy = () => {
        this.client.send(localStorage.getItem('userId'));
      };
      if (this.client.readyState === this.client.OPEN) {
        sendMy();
      } else {
        setTimeout(sendMy, 1000);
      }
    };

    this.client.onclose = () => {
      console.log('echo-protocol Client Closed');
    };

    this.client.onmessage = (e) => {
      if (typeof e.data === 'string') {
        const d = JSON.parse(e.data);
        if (d.type === 'notification') {
          if (d.payload.event === 'newRecipe') {
            this.addNotification({
              title: 'Новый рецепт',
              message: `${d.payload.info.username} выложил(а) рецепт "${d.payload.info.recipeName}", у вас есть подходящие ингредиенты!"`,
              level: 'info',
            }, {
                label: 'Перейти на страницу рецепта',
                callback: this.makeLink(`/recipe/${d.payload.info.recipeId}`),
              })
          }
        }
      }
    };

  }

  makeLink = (l) => () => {
    window.history.pushState({}, "", l);
    window.history.go();
  }

  addNotification = (payload, action) => {
    this._notificationSystem.addNotification({
      ...payload,
      action
    });
  };

  getNotificator = (n) => {
    this._notificationSystem = n;
  };

  render() {
    return (
      <div>
        <Router forceRefresh={false}>
          <Switch>
            <Route path="/" exact component={App} />
            <Route path="/newRecipe" component={NewRecipe} />
            <Route path="/recipe/:id" component={Recipe} />
            <Route path="/register" component={NewRecipe} />
            <Route path="/login" component={NewRecipe} />
          </Switch>
        </Router>
        <Notificator cb={this.getNotificator} />
      </div>
    );
  }
}

ReactDOM.render(<Shift />, document.getElementById("root"));
