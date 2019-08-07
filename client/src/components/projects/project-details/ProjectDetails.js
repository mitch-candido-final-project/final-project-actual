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
          <div className="project-details-info">
            <h3>{singleProject.name}</h3>
            <p>{singleProject.description}</p>
            <p>{singleProject.startDate}</p>
            <p>{singleProject.dueDate}</p>
            <p>{singleProject.timeSpent}</p>
            <p>{singleProject.complete}</p>
            <p>{singleProject.isPublic}</p>
            {/* still have to do the images */}
          </div>
          <div className="exit-details">
            <a data-target="edit-project-modal" className="modal-trigger">
              <i className="fas fa-edit" />
            </a>
            <Link to="/">
              <i className="fas fa-times-circle" />
            </Link>
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
