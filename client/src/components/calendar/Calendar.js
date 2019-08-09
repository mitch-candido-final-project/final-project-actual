import React, { Component } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import "./calendar.css";

import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  getTasksCurProj = () => {
    let tasks = this.props.getEvents();
    console.log("it ran", tasks);
    tasks.forEach(eachTask => {
      if (eachTask.isComplete) {
        eachTask.backgroundColor = "#3FB485";
      } else {
        eachTask.backgroundColor = "#CE4AD8";
      }
    });
    return tasks;
  };
  componentDidMount() {
    this.getTasksCurProj();
  }
  render() {
    return (
      <div className="calender-container">
        <FullCalendar
          defaultView="dayGridWeek"
          plugins={[dayGridPlugin, interactionPlugin]}
          selectable="true"
          events={this.getTasksCurProj()}
          dateClick={this.props.dateClick}
          header={{
            left: "prev,next today",
            center: "title",
            right: "dayGridMonth,dayGridWeek,dayGridDay"
          }}
        />
      </div>
    );
  }
}

export default Calendar;
