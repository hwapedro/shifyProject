import React, { Component } from "react";

import { withRouter } from "react-router-dom";
import NotificationSystem from 'react-notification-system';

class Notificator extends Component {
    state = {
        ingridients: []
    };

    componentDidMount = () => {
        this.props.cb(this.refs.ns);
    }

    render() {
        return (
            <NotificationSystem ref="ns" />
        )
    }
}
export default Notificator; //(withRouter(Notificator));

