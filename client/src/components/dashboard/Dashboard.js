//React imports
import React, { Component } from "react";
//css
import "./dashboard.css";
//components
import TaskPanel from "../taskPanel/TaskPanel";
import ProjectPanel from "../projects/project-panel/ProjectPanel";
import ProjectDetails from "../projects/project-details/ProjectDetails";
import Calendar from "../calendar/Calendar.js";

import M from "materialize-css";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: [],
      currentProject: this.props.allProjects[0],
      currentTasks: []
    };
  }

  setCurrentProject = id => {
    let newCurrPrj = this.props.allProjects.find(eachPrj => eachPrj._id === id);
    this.setState({ currentProject: newCurrPrj });
  };

  handleDateClick = arg => {
    console.log(this.state.currentProject.tasks);
    let newCurrTasks = this.state.currentProject.tasks.filter(eachTask => {
      if (eachTask.date === arg.dateStr) {
        return eachTask;
      }
    });
    console.log("current task: ", newCurrTasks);
    this.setState({ currentTasks: newCurrTasks });
  };
  componentDidMount() {
    // window.modalInit();
    var getModal = document.querySelectorAll(".modal");
    var instances = M.Modal.init(getModal, {});
  }

  render() {
    return (
      <div className="dashboard">
        <div className="dashboard-components row">
          <div className="top-dash-contents">
            <TaskPanel tasks={this.state.currentTasks} />
            <ProjectPanel
              {...this.props}
              allProjects={this.props.allProjects}
              setCurrProj={this.setCurrentProject}
            />
          </div>
          <div className="calendar col s12">
            {this.state.currentProject && (
              <Calendar
                events={
                  this.state.currentProject && this.state.currentProject.tasks
                }
                dateClick={this.handleDateClick}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
