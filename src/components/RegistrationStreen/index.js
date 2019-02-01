import './index.css';
import React from 'react';
import { withRouter } from "react-router-dom";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

class RegistrationStreen extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        username: '',
        name: '',
        password: '',
        room: '',
    };

    handleChange = (f, r) => e => {
        const v = e.target.value;
        if (r && !r.test(v))
            return;
        this.setState({
            [f]: v,
        });
    }

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
            localStorage.setItem('userId', d.content._id);
            this.props.history.push('/');
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-3" />
                    <div className="col-md-6">
                        <form noValidate autoComplete="off" className="login-form">
                            <h2 className="text-center">Введите данные</h2>
                            <TextField
                                label="Имя пользователя"
                                value={this.state.username}
                                onChange={this.handleChange('username', /^[a-zA-Z_0-9]*?$/i)}
                                fullWidth
                                margin="normal"
                            />
                            <TextField
                                label="Пароль"
                                type="password"
                                value={this.state.password}
                                autoComplete="off"
                                onChange={this.handleChange('password', /^[a-zA-Z_0-9]*?$/i)}
                                fullWidth
                                margin="normal"
                            />
                            <div className="row">
                                <div className="col-md-6">
                                    <TextField
                                        label="Ваше имя"
                                        value={this.state.name}
                                        onChange={this.handleChange('name')}
                                        fullWidth
                                        margin="normal"
                                    />
                                </div>
                                <div className="col-md-6">
                                    <TextField
                                        label="Номер комнаты"
                                        value={this.state.room}
                                        onChange={this.handleChange('room')}
                                        type="number"
                                        fullWidth
                                        margin="normal"
                                    />
                                </div>
                            </div>
                            <Button
                                variant="contained" color="primary"
                                style={{
                                    width: '100%',
                                    height: '3rem',
                                    marginTop: '1rem'
                                }}
                                onClick={this.register}
                            >Зарегистрироваться</Button>
                        </form>
                    </div>
                    <div className="col-md-3" />
                </div>
            </div>
        );
    }
}
export default withRouter(RegistrationStreen);