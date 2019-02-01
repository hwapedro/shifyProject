import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import { Switch, BrowserRouter as Router, Route } from "react-router-dom";
import NewRecipe from "./components/NewRecipe";
import App from "./components/App";
import Recipe from "./components/Recipe";
import Notificator from './components/Nsys';
import ws from 'websocket';
import LoginScreen from './components/LoginScreen';
import RegistrationStreen from './components/RegistrationStreen';

class Shift extends React.Component {
  state = {

  };

  _notificationSystem = null;

  constructor(props) {
    super(props);
    window.REMOTE = 'http://germangorodnev.com:4500';
    // window.REMOTE = 'http://localhost:4500';
    window.addNotification = this.addNotification;
    // init websocket
    // localStorage.setItem("userId", "5c4edc01fc79b221b47f0d68");
    this.client = new ws.w3cwebsocket('ws://germangorodnev.com:4500/', 'echo-protocol');

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
              }
            );
          } else if (d.payload.event === 'recipeDone') {
            this.addNotification({
              title: 'Блюдо готово!',
              message: `${d.payload.info.from} из ${d.payload.info.room} зовет на: ${d.payload.info.name}`,
              level: 'success',
            });
          }
        }
      }
    };

  }

  componentDidMount() {
    if (!localStorage.getItem('userId')
      && window.location.pathname !== '/login'
        && window.location.pathname !== '/register') {
      // pass to login
      window.history.pushState({}, "", '/login');
      window.history.go();
      return;
    }
  }

  makeLink = (l) => () => {
    window.history.pushState({}, "", l);
    window.history.go();
  }

  addNotification = (payload, action = {}) => {
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
            <Route path="/register" component={RegistrationStreen} />
            <Route path="/login" component={LoginScreen} />
          </Switch>
        </Router>
        <Notificator cb={this.getNotificator} />
      </div>
    );
  }
}

ReactDOM.render(<Shift />, document.getElementById("root"));
