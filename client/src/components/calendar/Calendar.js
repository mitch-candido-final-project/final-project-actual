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
  render() {
    return (
      <div className="calender-container">
        <FullCalendar
          defaultView="dayGridWeek"
          plugins={[dayGridPlugin, interactionPlugin]}
          events={this.props.events}
          dateClick={this.props.dateClick}
        />
      </div>
    );
  }
}

export default Calendar;
