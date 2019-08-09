import React, { Component } from "react";
import { Link } from "react-router-dom";
import AuthService from "../services/AuthService.js";
import M from "materialize-css";
import "./nav.css";

export default class Nav extends Component {
  constructor(props) {
    super(props);

    this.authService = new AuthService();
  }
  componentDidMount() {
    var elemsRight = document.querySelectorAll(".sidenav.sidenavRight");
    var elemsLeft = document.querySelectorAll(".sidenav.sidenavLeft");
    var instances1 = M.Sidenav.init(elemsRight, { edge: "right" });
    var instances2 = M.Sidenav.init(elemsLeft, { edge: "left" });
  }

  logoutCall = () => {
    this.authService.logout().then(() => {
      this.props.getUser();
      console.log("call from nav logout", this.props);
      this.props.history.push("/");
    });
  };

  render() {
    return (
      <div className="nav-container">
        <nav className="nav-custom">
          <div className="nav-wrapper nav-custom-wrapper">
            <a href="#!" className="brand-logo">
              <img src={"/images/ProjectPocketLogo.svg"} />
            </a>
            <a
              href="#"
              data-target="slide-out"
              className="left sidenav-trigger"
            >
              <i className="material-icons">details</i>
            </a>
            <a
              href="#"
              data-target="mobile-demo"
              className="right sidenav-trigger"
            >
              <i className="material-icons">menu</i>
            </a>
            {this.props.user ? (
              <ul className="right hide-on-med-and-down">
                <li>
                  <Link to="/" className="nav-links link-1">
                    Dashboard
                  </Link>
                </li>
                <li>
                  <a className="nav-links link-2">News Feed</a>
                </li>
                <li>
                  <Link to="/account" className="nav-links link-3">
                    Account
                  </Link>
                </li>
                <li>
                  <a className="nav-links link-4" onClick={this.logoutCall}>
                    Logout
                  </a>
                </li>
              </ul>
            ) : (
              <ul className="right hide-on-med-and-down">
                <li>
                  <a data-target="modal1" className="nav-links modal-trigger">
                    About
                  </a>
                </li>
                <li>
                  <a data-target="modal1" className="nav-links modal-trigger">
                    Login
                  </a>
                </li>
              </ul>
            )}
          </div>
        </nav>
        <ul className="sidenav sidenavRight mobile-nav" id="mobile-demo">
          <li>
            <Link to="/" className="btn">
              Dashboard
            </Link>
          </li>
          <li>
            <Link to="/account" className="btn">
              Account
            </Link>
          </li>
          <li>
            <a className="btn" onClick={this.props.logout}>
              Logout
            </a>
          </li>
        </ul>
      </div>
    );
  }
}
