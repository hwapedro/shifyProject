import './index.css';
import React from 'react';
import { withRouter } from "react-router-dom";
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class LoginScreen extends React.Component {
    constructor(props) {
        super(props);
    }
    state = {
        username: '',
        password: '',
    };

    handleChange = (f, r) => e => {
        const v = e.target.value;
        if (r.test(v))
            this.setState({
                [f]: v,
            });
    }

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
            localStorage.setItem('userId', d.content._id);
            this.props.history.push('/');
        } else {
            if (d.content.reason === 'wrong') {
                window.addNotification({
                    title: 'Неверное имя пользователя или пароль',
                    level: 'error',
                });
            }
        }
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-3" />
                    <div className="col-md-6">
                        <form noValidate autoComplete="off" className="login-form">
                            <h2 className="text-center">Добро пожаловать</h2>
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
                            <Button
                                variant="contained" color="primary"
                                onClick={this.login}
                                style={{
                                    width: '100%'
                                }}
                            >Войти</Button>
                            <Button
                                variant="contained" color="secondary"
                                style={{
                                    width: '100%',
                                    marginTop: '1rem'
                                }}
                                onClick={() => this.props.history.push('/register')}
                            >Зарегистрироваться</Button>
                        </form>
                    </div>
                    <div className="col-md-3" />
                </div>
            </div>
        );
    }
}
export default withRouter(LoginScreen);