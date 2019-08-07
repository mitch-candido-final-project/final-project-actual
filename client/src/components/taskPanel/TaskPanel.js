import React, { Component } from "react";
import "./taskPanel.css";
export default class TaskPannel extends Component {
  // constructor(props) {
  //   super(props);
  // }
  displayTasks = () => {
    let allTasks = this.props.tasks;
    console.log(allTasks);
    if (allTasks.length === 0) {
      return <div>No Tasks set for this date yet</div>;
    }
    return allTasks.map((eachTask, i) => {
      return (
        <div key={i}>
          <label>
            <input type="checkbox" checked={eachTask.isComplete && "checked"} />
            <span>{eachTask.title}</span>
          </label>
        </div>
      );
    });
  };
  render() {
    return <div className="task-container">{this.displayTasks()}</div>;
  }
}
