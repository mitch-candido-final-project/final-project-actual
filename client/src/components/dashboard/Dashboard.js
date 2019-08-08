//React imports
import React, { Component } from "react";
//css
import "./dashboard.css";
//components
import TaskPanel from "../taskPanel/TaskPanel";
import ProjectPanel from "../projects/project-panel/ProjectPanel";
import ProjectDetails from "../projects/project-details/ProjectDetails";
import Calendar from "../calendar/Calendar.js";
import ProjectService from "../services/ProjectService.js";

import M from "materialize-css";

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentProjectId: "",
      daySelected: this.getToday() || ""
    };
    this.projectService = new ProjectService();
  }
  getToday = () => {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    if (day < 10) {
      day = "0" + day;
    }
    if (month < 10) {
      month = "0" + month;
    }

    return `${year}-${month}-${day}`;
  };
  //sets the currentlly selected project
  setCurrentProject = id => {
    //if we want to reset the day to current day  when changing projects
    // let today = this.getToday();
    // this.setState({ currentProjectId: id, daySelected: today });
    this.setState({ currentProjectId: id });
  };

  //returns the info of the currently selected project
  getCurrentProjectInfo = () => {
    return this.props.allProjects.find(
      eachProj => eachProj._id === this.state.currentProjectId
    );
  };

  //all the tasks of the currently selected project (all dates)
  getCurrentProjectTasks = () => {
    let currProj = this.getCurrentProjectInfo();
    return currProj.tasks;
  };

  //returns all tasks for that day fromo current project
  getSelectedDayTasks = () => {
    let currProj = this.getCurrentProjectInfo();
    if (!currProj) {
      return [];
    }
    return currProj.tasks.filter(eachTask => {
      if (eachTask.date === this.state.daySelected) {
        return eachTask;
      }
    });
  };

  //function that runs when a date is clicked in the calendar
  handleDateClick = arg => {
    this.setState({ daySelected: arg.dateStr });
  };

  //handles when a task is being cheked off
  handleTaskCheck = event => {
    let currProj = this.getCurrentProjectInfo();
    currProj.tasks.forEach(eachTask => {
      console.log("event.target.dataset.taskid", event.target.dataset.taskid);
      console.log("eachTask.id", eachTask.taskId);
      if (eachTask.taskId === event.target.dataset.taskid) {
        eachTask.isComplete = event.target.checked;
      }
    });
    this.projectService
      .updateProject(this.state.currentProjectId, currProj)
      .then(() => {
        this.props.history.push("/");
      });
  };
  //handles when a task is being edited
  handleTaskEdit = task => {
    let currProj = this.getCurrentProjectInfo();
    currProj.tasks.forEach(eachTask => {
      if (eachTask.taskId === task.taskId) {
        eachTask.title = task.title;
      }
    });
    this.projectService
      .updateProject(this.state.currentProjectId, currProj)
      .then(() => {
        this.props.history.push("/");
      });
  };

  //handles when a task is being created
  handleNewTask = task => {
    let currProj = this.getCurrentProjectInfo();
    currProj.tasks.push(task);
    this.projectService
      .updateProject(this.state.currentProjectId, currProj)
      .then(() => {
        this.props.history.push("/");
      });
  };
  //takes care of the modal
  componentDidMount() {
    var getModal = document.querySelectorAll(".modal");
    var instances = M.Modal.init(getModal, {});
  }

  render() {
    return (
      <div className="dashboard">
        <div className="dashboard-components row">
          <div className="top-dash-contents">
            <TaskPanel
              getTasks={this.getSelectedDayTasks}
              handleTaskCheck={this.handleTaskCheck}
              handleTaskEdit={this.handleTaskEdit}
              daySelected={this.state.daySelected}
              currentProjectId={this.state.currentProjectId}
              handleNewTask={this.handleNewTask}
            />
            <ProjectPanel
              {...this.props}
              allProjects={this.props.allProjects}
              setCurrProj={this.setCurrentProject}
            />
          </div>
          <div className="calendar col s12">
            {this.state.currentProjectId && (
              <Calendar
                getEvents={this.getCurrentProjectTasks}
                dateClick={this.handleDateClick}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}
