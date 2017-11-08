import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import http from '../http';
import jsonwebtoken from 'jsonwebtoken'

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: '',
            password: ''
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        http.post('login', {
            body:
            {
                email: this.state.user,
                password: this.state.password
            }
        }).then(response => {
            console.log(response.data)
            const { token } = response.data
            http.defaults.headers.Authorization = `JWT ${token}`
            localStorage.setItem('jwtToken', token)
            console.log(jsonwebtoken.decode(token))
        }).catch(errorResponse => {
            console.log(errorResponse.data.errors.message)
        })
    }

    handleChangeUser(event) {
        this.setState({ user: event.target.value });
    }

    handleChangePassword(event) {
        this.setState({ password: event.target.value });
    }

    render() {
        console.log(this.props)
        return (
            <form onSubmit={this.handleSubmit}>
                <label>Usuário
                    <input type="text" value={this.state.user} onChange={this.handleChangeUser.bind(this)} />
                </label>
                <label>
                    Senha
                    <input type="password" value={this.state.password} onChange={this.handleChangePassword.bind(this)} />
                </label>
                <RaisedButton label="Entrar" type="submit" value="Submit" />
            </form>
        );
    }
}

export default Login;