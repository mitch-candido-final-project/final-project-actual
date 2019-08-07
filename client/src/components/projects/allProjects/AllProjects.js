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
        <div key={eachProject._id} className="project-single-row">
          <button
            className="select-project"
            onClick={() => setCurrentProj(eachProject._id)}
          >
            {eachProject.name}
          </button>
          <span>{eachProject.startDate}</span>
          <span>{eachProject.dueDate}</span>
          <span>{eachProject.isPublic}</span>
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
