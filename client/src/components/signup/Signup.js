import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/AuthService";
import "./signup.css";
export default class User extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      userName: "",
      email: "",
      password: ""
    };
    this.service = new AuthService();
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  tryToSignUp = e => {
    e.preventDefault();
    const username = this.state.userName;
    const password = this.state.password;
    const firstName = this.state.firstName;
    const lastName = this.state.lastName;
    const email = this.state.email;

    this.service
      .signup(username, password, firstName, lastName, email)
      .then(() => {
        console.log("singup");
        this.props.getUser();
      });
  };

  render() {
    return (
      <div className="sign-up">
        <form className="signup-form" onSubmit={this.tryToSignUp}>
          <h3>Sign Up:</h3>
          <div className="full-name">
            <div className="first-name">
              <legend>First Name:</legend>
              <input
                type="text"
                value={this.state.firstName}
                onChange={this.handleChange}
                name="firstName"
              />
            </div>
            <div className="last-name">
              <legend>Last Name</legend>
              <input
                type="text"
                value={this.state.lastName}
                onChange={this.handleChange}
                name="lastName"
              />
            </div>
          </div>
          <legend>Email:</legend>
          <input
            type="text"
            value={this.state.email}
            onChange={this.handleChange}
            name="email"
          />
          <legend>Username:</legend>
          <input
            type="text"
            value={this.state.userName}
            onChange={this.handleChange}
            name="userName"
          />
          <legend>Password:</legend>
          <input
            type="password"
            value={this.state.password}
            onChange={this.handleChange}
            name="password"
          />
          <button className="waves-effect waves-light btn-large">Submit</button>
        </form>
      </div>
    );
  }
}
