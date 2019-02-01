import "./index.css";
import React from "react";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

class RegistrationStreen extends React.Component {
  constructor() {
    super();

    if (localStorage.getItem("userId") !== null) {
      window.history.pushState({}, "", "/");
      window.history.go();
    }
  }
  state = {
    username: "",
    name: "",
    password: "",
    room: ""
  };

  handleChange = (f, r) => e => {
    const v = e.target.value;
    if (r && !r.test(v)) return;
    this.setState({
      [f]: v
    });
  };

  register = async () => {
    const myHeaders = new Headers({
      "Content-Type": "application/json"
    });
    const response = await fetch(`${window.REMOTE}/user/`, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        ...this.state
      })
    });
    const d = await response.json();
    if (d.success && d.content) {
      localStorage.setItem("userId", d.content._id);
      this.props.history.push("/");
    }
  };
  handleKeyPress = event => {
    if (event.key == "Enter") {
      this.register();
    }
  };
  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-3" />
          <div className="col-md-6">
            <div className="login-form" onKeyPress={this.handleKeyPress}>
                <h2 className="text-center">ENTER THE DATA</h2>
                <TextField
                  variant="outlined"
                  label="Your login"
                  value={this.state.username}
                  onChange={this.handleChange("username", /^[a-zA-Z_0-9]*?$/i)}
                  fullWidth
                  margin="normal"
                />
                <TextField
                  className="text-field"
                  variant="outlined"
                  label="Password"
                  type="password"
                  value={this.state.password}
                  autoComplete="off"
                  onChange={this.handleChange("password", /^[a-zA-Z_0-9]*?$/i)}
                  fullWidth
                  margin="normal"
                />
                <div className="row">
                  <div className="col-md-6">
                    <TextField
                      variant="outlined"
                      label="Your name"
                      value={this.state.name}
                      onChange={this.handleChange("name")}
                      fullWidth
                      margin="normal"
                    />
                  </div>
                  <div className="col-md-6">
                    <TextField
                      variant="outlined"
                      label="Room number"
                      value={this.state.room}
                      onChange={this.handleChange("room")}
                      type="number"
                      fullWidth
                      margin="normal"
                    />
                  </div>
                </div>
                <button className = 'logButtonForReg'
                 
                  onClick={this.register}
                >
                  SINGUP
                </button>
            </div>
          </div>

          <div className="col-md-3" />
        </div>
      </div>
    );
  }
}
export default withRouter(RegistrationStreen);
