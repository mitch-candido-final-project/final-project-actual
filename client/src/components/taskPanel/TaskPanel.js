import React, { Component } from "react";
import "./taskPanel.css";
export default class TaskPannel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editText: "",
      editId: "",
      newTask: false,
      newTaskText: ""
    };
  }
  displayTasks = () => {
    let allTasks = this.props.getTasks();
    if (allTasks.length === 0) {
      return <div>No Tasks set for this date yet</div>;
    }
    return allTasks.map((eachTask, i) => {
      console.log(eachTask.taskId);
      if (eachTask.taskId === this.state.editId)
        return (
          <div key={i} className="project-single-row">
            <form
              onSubmit={this.submitTaskEdit}
              style={{ display: "contents" }}
            >
              <input
                type="text"
                name="editText"
                value={this.state.editText}
                onChange={this.handleChange}
                data-taskid={eachTask.taskId}
                style={{ height: "25px" }}
              />
              <button>
                <i className="material-icons right">save</i>
              </button>
            </form>
          </div>
        );
      else
        return (
          <div key={i} className="project-single-row">
            <label>
              <input
                type="checkbox"
                checked={eachTask.isComplete}
                data-taskid={eachTask.taskId}
                onChange={this.handleTaskCheck}
              />
              <span className="strikethrough">{eachTask.title}</span>
            </label>
            <span>
              <i
                className="material-icons right"
                onClick={() => {
                  this.deleteTask(eachTask);
                }}
              >
                delete
              </i>
              <i
                className="material-icons right"
                onClick={() => {
                  this.setEditTask(eachTask);
                }}
              >
                create
              </i>
            </span>
          </div>
        );
    });
  };
  deleteTask = taskDelete => {
    this.props.deleteTask(taskDelete);
  };
  setEditTask = taskToEdit => {
    this.setState({ editText: taskToEdit.title, editId: taskToEdit.taskId });
  };
  handleTaskCheck = event => {
    this.props.handleTaskCheck(event);
  };
  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  submitTaskEdit = event => {
    event.preventDefault();
    let task = {};
    task.taskId = this.state.editId;
    task.title = this.state.editText;
    this.props.handleTaskEdit(task);
    this.setState({ editText: "", editId: "" });
  };
  submitNewTask = event => {
    event.preventDefault();
    let task = {};
    task.taskId = Date.now();
    task.title = this.state.newTaskText;
    task.date = this.props.daySelected;
    task.isComplete = false;
    this.props.handleNewTask(task);
    this.setState({ newTaskText: "", newTask: false });
  };
  addATask = () => {
    let value = this.state.newTask;
    this.setState({ newTask: !value });
  };
  render() {
    return (
      <div className="task-container">
        <div className="all-project-header">
          <h5>
            All Tasks - <span>{this.props.daySelected.slice(5)}</span>
          </h5>
          {this.props.currentProjectId && (
            <a onClick={this.addATask}>
              <i className="fas fa-plus-circle fa-2x" />
            </a>
          )}
        </div>
        {this.displayTasks()}
        {this.state.newTask && (
          <div className="project-single-row">
            <form onSubmit={this.submitNewTask} style={{ display: "contents" }}>
              <input
                type="text"
                name="newTaskText"
                value={this.state.newTaskText}
                onChange={e => this.handleChange(e)}
                style={{ height: "25px" }}
              />
              <button>
                <i className="material-icons right">save</i>
              </button>
            </form>
          </div>
        )}
      </div>
    );
  }
}
