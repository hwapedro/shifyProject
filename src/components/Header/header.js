import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "./header.css";

export default class Header extends Component {
  render() {
    return (
      <Button variant="contained" color="primary">
        {" "}
        Hello World{" "}
      </Button>
    );
  }
}
