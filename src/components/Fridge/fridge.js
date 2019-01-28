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
    const { classes, closeFridge, visible, fridge } = this.props;
    console.log(fridge[0]);
    return (
      <div className="cold">
        <div className={"container  " + (visible ? "" : "hidden")}>
          <div className="row">
            <div className="col-md-3" />
            <div className="col-md-6">
              <div className="cold_fridge">
                <b>FRIDGE</b>
                {fridge &&
                  fridge.map((el, index) => (
                    <div className = 'cold_fridge_item' key={index}>
                      {`${el.ingredient.name} шт `}
                      <span><b>{el.amount}</b></span>
                    </div>
                  ))}
              </div>
              <Fab
                onClick={closeFridge}
                color="primary"
                aria-label="Add"
                className={`buttonFridge ${classes.fab}`}
              >
                <AddIcon />
              </Fab>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default withStyles(styles)(withRouter(Fridge));
