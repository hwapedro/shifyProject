import "./index.css";
import React from "react";
import { withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

class LoginScreen extends React.Component {
  constructor() {
    super();
    console.log(localStorage.getItem("userId"));
    if (localStorage.getItem("userId") !== null) {
      window.history.pushState({}, "", "/");
      window.history.go();
    }
  }

  state = {
    username: "",
    password: ""
  };

  handleChange = (f, r) => e => {
    const v = e.target.value;
    if (r.test(v))
      this.setState({
        [f]: v
      });
  };

  login = async () => {
    const myHeaders = new Headers({
      "Content-Type": "application/json"
    });
    const response = await fetch(`${window.REMOTE}/user/login`, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        ...this.state
      })
    });
    const d = await response.json();
    if (d.success && d.content && d.content._id) {
      localStorage.setItem("userId", d.content._id);
      setImmediate(() => {
        this.props.history.push("/");
      });
    } else {
      if (d.content.reason === "wrong") {
        window.addNotification({
          title: "Неверное имя пользователя или пароль",
          level: "error"
        });
      }
    }
  };
  handleKeyPress = (event) => {
    if(event.key == 'Enter'){
      this.login()  
    }
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4" />
          <div className="col-md-4">
            <div className="login-form"  onKeyPress={this.handleKeyPress}>
              <h2 className="text-center">WELCOME</h2>
              <input
                placeholder="USERNAME"
                className="logUser"
                type="text"
                label="Имя пользователя"
                value={this.state.username}
                onChange={this.handleChange("username", /^[a-zA-Z_0-9]*?$/i)}
              />
              <input
                placeholder="PASSWORD"
                className="logUser"
                label="Пароль"
                type="password"
                value={this.state.password}
                autoComplete="off"
                onChange={this.handleChange("password", /^[a-zA-Z_0-9]*?$/i)}
              />
              <div className="logButtons">
                <span
                  className="regButton"
                  onClick={() => this.props.history.push("/register")}
                >
                  New user? <span style = {{color: '#8e4c4d'}}>SIGNUP</span>
                </span>
                <button
                  className="logButton"
                 
                  onClick={this.login}
                >
                  LOGIN
                </button>
              </div>
            </div>
          </div>
          <div className="col-md-4" />
        </div>
      </div>
    );
  }
}
export default withRouter(LoginScreen);
