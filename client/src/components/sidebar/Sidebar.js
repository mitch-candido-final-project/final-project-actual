import React, { Component } from "react";
import M from "materialize-css";
import Status from "../status/Status";
import "./sidebar.css";
export default class Sidebar extends Component {
  componentDidMount() {
    var elems = document.querySelectorAll(".sidenav.sidenavLeft");
    var instances = M.Sidenav.init(elems, { edge: "left" });
  }
  render() {
    return (
      <div>
        {/* <button
          className="side-nav-open"
          data-target="slide-out"
          className="sidenav-trigger btn hide-on-med-and-down"
        >
          test
        </button> */}
        <div className="sidebar sidenav sidenavLeft" id="slide-out">
          <Status />
          <div className="social-content">
            <div className="group-container">
              <p>Groups</p>
            </div>
            <div className="message-container">
              <p>Messages</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
