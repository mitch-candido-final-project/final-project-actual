import React, { Component } from "react";
import { Link } from "react-router-dom";
import M from "materialize-css";

import EditProjectModal from "../EditProject/EditProjectModal";
import "./project-details.css";

export default class ProjectDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount = () => {
    var getModal = document.querySelectorAll(".modal");
    var instances = M.Modal.init(getModal, {});
    // window.modalInit();
  };

  getProjectInfo = () => {
    const allProjects = this.props.allProjects;
    const projectId = this.props.match.params.id;
    const singleProject = allProjects.filter(project => {
      return project._id === projectId;
    });

    console.log("this is t prove to candido that its an array", singleProject);
    return singleProject.map(singleProject => {
      return (
        <div key={singleProject._id} className="project-details-content">
          <div className="exit-details">
            <a data-target="edit-project-modal" className="modal-trigger">
              <i className="fas fa-edit" />
            </a>
            <Link to="/">
              <i className="fas fa-times-circle" />
            </Link>
          </div>
          <div className="project-details-info">
            <div className="project-header">
              <h3>{singleProject.name}</h3>
            </div>
            <div className="project-details">
              <div className="project-details-text">
                <label>Description:</label>
                <p>{singleProject.description}</p>
                <label>Start Date:</label>
                <p>{singleProject.startDate}</p>
                <label>Due Date:</label>
                <p>{singleProject.dueDate}</p>
                <label>Time Spent</label>
                <p>{singleProject.timeSpent}</p>
              </div>
              <div className="project-details-right">
                <div
                  className="project-images"
                  style={{ backgroundImage: `url(${singleProject.image}` }}
                />
                <div className="option-switch">
                  {singleProject.isPublic ? (
                    <p>Visibility: Public</p>
                  ) : (
                    <p>Visibility: Private</p>
                  )}
                  {singleProject.complete ? (
                    <p>Status: Complete</p>
                  ) : (
                    <p>Status: In Progress</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <EditProjectModal
            {...this.props}
            singleProject={singleProject}
            getAllProjects={this.props.getAllProjects}
          />
        </div>
      );
    });
  };

  render() {
    return <div className="project-details">{this.getProjectInfo()}</div>;
  }
}
