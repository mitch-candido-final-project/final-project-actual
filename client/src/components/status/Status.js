import React, { Component } from "react";
import "../sidebar/sidebar.css";
export default class Status extends Component {
  render() {
    return (
      <div className="status">
        <p>Status</p>
        <div className="status-container">
          <select className="btn">
            <option value="1">Online</option>
            <option value="2">Busy</option>
            <option value="3">Do Not Disturb</option>
          </select>
          <p>Work Timer</p>
          <div className="clock-in">
            <div className="clock-in-button">
              <button>
                <i className="fas fa-stopwatch" />
              </button>
            </div>
            <div className="clock-in-label">
              <label>0:00</label>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
