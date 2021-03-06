import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./project-row.css";

export default class AllProjects extends Component {
  getAllProjects = () => {
    const setCurrentProj = id => {
      this.props.setCurrProj(id);
    };
    return this.props.allProjects.map(eachProject => {
      return (
        <div
          key={eachProject._id}
          className={
            this.props.currentProjId === eachProject._id
              ? "project-single-row selected"
              : "project-single-row"
          }
        >
          <button
            className="select-project"
            onClick={() => setCurrentProj(eachProject._id)}
          >
            {eachProject.name}
          </button>
          <span>Due Date: {eachProject.dueDate}</span>
          {eachProject.complete ? (
            <span className="project-status-home">Completed</span>
          ) : (
            <span className="project-status-home">In Progress</span>
          )}
          {eachProject.isPublic ? (
            <span className="project-status-home public-private">Public</span>
          ) : (
            <span className="project-status-home public-private">Private</span>
          )}
          <Link to={`/project/${eachProject._id}`}>
            <i className="fas fa-angle-double-right" />
          </Link>
        </div>
      );
    });
  };

  render() {
    return <div>{this.getAllProjects()}</div>;
  }
}
