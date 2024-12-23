import React, {Component} from 'react';
import './Register.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    Link
  } from "react-router-dom";
class Register extends Component {
    constructor(props) {
        super(props);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleButtonClick = this.handleButtonClick.bind(this);
        this.state = { 
            email: "",
            login: "",
            password: ""
        };
        
    }

    handleButtonClick() {
        console.log(this.state.email);
        console.log(this.state.login);
        console.log(this.state.password);
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
            body: JSON.stringify({"login": this.state.login, "password": this.state.password,"email": this.state.email})
        };
        
        fetch('/api/register', requestOptions)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Handle successful registration
                toast.success('Registration successful');
                window.location.href = '/#/login';
            } else {
                toast.error('Registration failed');
                toast.error(data.message);
                // Handle registration failure
            }
        });
    }

    handleTextChange(e) {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <div class="container">
        <span style={{ "--clr": "#eeff00" }}></span>
        <span style={{ "--clr": "#00ffdd" }}></span>
        <span style={{ "--clr": "#e900d5" }}></span>
        <div class="form-container">
            <h2>Register</h2>
            <div class="input-container">
                <input type="email" placeholder="example@gmail.com" name = "email" value = {this.state.email} onChange={this.handleTextChange}></input>
            </div>
            <div class="input-container">
                <input type="text" placeholder="Username" name = "login" value = {this.state.login} onChange={this.handleTextChange}></input>
            </div>
            <div class="input-container">
                <input type="password" placeholder="Password" name = "password" value = {this.state.password} onChange={this.handleTextChange}></input>
            </div>
            <div class="input-container">
                <input type="submit" value="Register" onClick={this.handleButtonClick}></input>
            </div>
            <div class="links-container">
                <Link to="/login" style={{outline:"none",border:"none"}}><a>already have an account ?</a></Link>
            </div>
        </div>
        <ToastContainer />
    </div>
        );
    }
}

export default Register;