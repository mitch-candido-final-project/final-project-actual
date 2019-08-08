import React, { Component } from "react";
import EditUserModal from "./edit-account-modal";
import { Link } from "react-router-dom";
import M from "materialize-css";

import "./user-account.css";
export default class UserAccount extends Component {
  componentDidMount = () => {
    var getModal = document.querySelectorAll(".modal");
    var instances = M.Modal.init(getModal, {});
    // window.modalInit();
  };

  showAllProjects = () => {
    return this.props.allProjects.map(singleProject => {
      return (
        <div className="project-card">
          <img src={`${singleProject.image}`} />
          <div className="project-card-content">
            <Link to={`/project/${singleProject._id}`} className="project-link">
              {singleProject.name}
            </Link>
          </div>
        </div>
      );
    });
  };

  render() {
    console.log("this is the user", this.props.currentlyLoggedIn);
    if (this.props.currentlyLoggedIn) {
      return (
        <div className="user-account-content">
          <div className="user-account-header">
            <a data-target="edit-user-modal" className="modal-trigger edit-btn">
              <i className="fas fa-edit" />
            </a>
            <div
              className="user-image"
              style={{
                backgroundImage: `url(${this.props.currentlyLoggedIn.image})`
              }}
            />
            <div className="user-info">
              <h5>@{this.props.currentlyLoggedIn.username}</h5>
              <em>
                {this.props.currentlyLoggedIn.firstName}{" "}
                {this.props.currentlyLoggedIn.lastName}
              </em>
              <p>{this.props.currentlyLoggedIn.email}</p>
              <p>
                Followers: {this.props.currentlyLoggedIn.followers.length}{" "}
                <span>
                  Following: {this.props.currentlyLoggedIn.following.length}
                </span>
              </p>
            </div>
          </div>
          <div className="all-projects-container">
            <div className="actual-project">{this.showAllProjects()}</div>
          </div>
          <EditUserModal
            {...this.props}
            currentlyLoggedIn={this.props.currentlyLoggedIn}
            refreshUser={this.props.refreshUser}
          />
        </div>
      );
    } else {
      return <h1>Loading...</h1>;
    }
  }
}
