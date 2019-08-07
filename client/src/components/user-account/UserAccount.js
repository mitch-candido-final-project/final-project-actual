import React, { Component } from "react";
import "./user-account.css";
export default class UserAccount extends Component {
  render() {
    console.log("this is the user", this.props.currentlyLoggedIn);

    if (this.props.currentlyLoggedIn) {
      return (
        <div className="user-account-content">
          <div className="user-account-header">
            <a
              data-target="edit-project-modal"
              className="modal-trigger edit-btn"
            >
              <i className="fas fa-edit" />
            </a>
            <div className="user-image">test</div>
            <div className="user-info">
              <h5>Username: {this.props.currentlyLoggedIn.username}</h5>
              <p>
                Full Name: {this.props.currentlyLoggedIn.firstName}
                {this.props.currentlyLoggedIn.lastName}
              </p>
              <p>Email: {this.props.currentlyLoggedIn.email}</p>
              <p>Followers: {this.props.currentlyLoggedIn.followers.length}</p>
              <p>Following: {this.props.currentlyLoggedIn.following.length}</p>
            </div>
          </div>
        </div>
      );
    } else {
      return <h1>Loading...</h1>;
    }
  }
}
