/* eslint-disable no-script-url */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {Component} from 'react';
import './Login.css';
import {
    Link
  } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.handleForgetPassword = this.handleForgetPassword.bind(this);
        this.state = { 
            login: "",
            password: "",
        };
    }

    handleButtonClick() {
        console.log(this.state.login);
        console.log(this.state.password);
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({"login": this.state.login, "password": this.state.password})
        };
        
        fetch('api/login', requestOptions)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                localStorage.setItem('isLoggedIn', true);
                localStorage.setItem('UserId', this.state.login);
                window.location.href = '/';
                // Handle successful login
            } else {
                toast.error('Login failed');
                toast.error(data.message);
                // Handle login failure
            }
        });
    }

    handleTextChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    toggleRegister = () => {
        this.setState({ showRegister: !this.state.showRegister });
    }

    handleForgetPassword() {
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({"login": this.state.login})
        };

        fetch('api/forgot-password', requestOptions)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                toast.info('Check your email for your password');
            } else if (data.message === 'User does not exist') {
                toast.error('User does not exist');
            } else {
                toast.error('Failed to send password email');
                toast.error(data.message);
            }
        });
    }

    render() {
        return (
            <div class="container">
        <span style={{ "--clr": "#eeff00" }}></span>
        <span style={{ "--clr": "#00ffdd" }}></span>
        <span style={{ "--clr": "#e900d5" }}></span>
        <div class="form-container">
            <h2>Login</h2>
            <div class="input-container">
                <input type="text" placeholder="Username" name = "login" value = {this.state.login} onChange={this.handleTextChange}></input>
            </div>
            <div class="input-container">
                <input type="password" placeholder="Password" name = "password" value = {this.state.password} onChange={this.handleTextChange}></input>
            </div>
            <div class="input-container">
                <input type="submit" value="Sign in" onClick={this.handleButtonClick} ></input>
            </div>
            <div class="links-container">
                <a href="javascript:void(0)" /*onClick={this.handleForgetPassword}*/>Forget Password</a>
                <Link to = "/register" style={{outline:"none",border:"none"}}><a>Signup</a></Link>
            </div>
        </div>
        <ToastContainer />
    </div>
        );
    }
}

export default Login;