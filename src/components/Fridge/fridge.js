import React, { Component } from "react";

import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import "./fridge.css";

import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  }
});

class Fridge extends Component {
  state = {
    ingridients: []
  };

  render() {
    const {
      classes,
      closeFridge,
      visible,
      fridge,
      openFlagDoor,
      openFridgeDoor
    } = this.props;
    return (
      <div className={"container  " + (visible ? "" : "hidden")}>
        <div className="row">
          <div className="col-md-4" />
          <div className="col-md-4">
            <div className="cold">
              <div className="topOfFridge">
                <button className="openDoor" />
              </div>
              <div className="cold_fridge">
                <div
                  onClick={openFridgeDoor}
                  className={"doorOfFridge " + (openFlagDoor ? "hidden" : "")}
                >
                  <button className="openDoor"  />
                </div>

                {fridge &&
                  fridge.map((el, index) => (
                    <div className="cold_fridge_item" key={index}>
                      {`${el.ingredient.name} шт `}
                      <span>
                        <b>{el.amount}</b>
                      </span>
                    </div>
                  ))}
               
                <button
                  className={"closeDoor " + (openFlagDoor ? "" : "hidden")}
                  onClick={openFridgeDoor}
                >
                  x
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
export default withStyles(styles)(withRouter(Fridge));
