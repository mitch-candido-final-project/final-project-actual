import React, { Component } from "react";
import { Route, Link, Switch } from "react-router-dom";
import M from "materialize-css";

//services
import AuthService from "./components/services/AuthService.js";
import ProjectService from "./components/services/ProjectService.js";

//materialize
import "materialize-css"; // It installs the JS asset only
import "materialize-css/dist/css/materialize.min.css";

//components:
import Sidebar from "./components/sidebar/Sidebar";
import Nav from "./components/navbar/Nav";
import Signup from "./components/signup/Signup";
import LoginModal from "./components/login/LoginModal";
import DashBoard from "./components/dashboard/Dashboard";
import UserAccount from "./components/user-account/UserAccount";
//projects
import ProjectDetails from "./components/projects/project-details/ProjectDetails";

//misc
import "./App.css";

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentlyLoggedIn: null,
      allProjects: [],
      accountLinkClicked: false
    };
    this.authService = new AuthService();
    this.projectService = new ProjectService();
  }

  toggleUserAccountView = () => {
    console.log("Acount toggled", this.state.accountLinkClicked);
    this.setState({ accountLinkClicked: !this.state.accountLinkClicked });
  };

  getCurrentlyLoggedInUser = () => {
    this.authService
      .currentUser()
      .then(user => {
        this.setState({ currentlyLoggedIn: user });
        console.log("current user", this.state.currentlyLoggedIn);
      })
      .catch(() => {
        this.setState({ currentlyLoggedIn: null });
      });
  };

  getAllProjects = () => {
    this.projectService
      .getAllProjects()
      .then(response => {
        this.setState({ allProjects: [...response] });
      })
      .catch(() => {
        this.setState({ allProjects: [] });
      });
  };

  componentDidMount() {
    this.getCurrentlyLoggedInUser();
    this.getAllProjects();
    // var elems = document.querySelectorAll('.sidenav');
    // var instances = M.Sidenav.init(elems, {});
  }
  logoutCall = () => {
    this.authService.logout().then(() => {
      console.log("call from nav logout");
      //
      this.setState({ currentlyLoggedIn: null });
    });
  };
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Nav logout={this.logoutCall} user={this.state.currentlyLoggedIn} />
          <button
            data-target="slide-out"
            className="sidenav-trigger btn side-nav-btn"
          >
            <i className="material-icons">keyboard_arrow_right</i>
          </button>
          {this.state.currentlyLoggedIn && <Sidebar />}
          <Switch>
            <Route
              exact
              path="/"
              render={props =>
                !this.state.currentlyLoggedIn ? (
                  <Signup {...props} getUser={this.getCurrentlyLoggedInUser} />
                ) : (
                  <DashBoard
                    {...props}
                    allProjects={this.state.allProjects}
                    accountToggleState={this.state.accountLinkClicked}
                    currentlyLoggedIn={this.state.currentlyLoggedIn}
                    getAllProjects={this.getAllProjects}
                  />
                )
              }
            />
            <Route
              exact
              path="/project/:id"
              render={props => (
                <ProjectDetails
                  {...props}
                  allProjects={this.state.allProjects}
                  getAllProjects={this.getAllProjects}
                />
              )}
            />
            <Route
              exact
              path="/account"
              render={props => (
                <div className="user-account-container">
                  <UserAccount
                    currentlyLoggedIn={this.state.currentlyLoggedIn}
                  />
                </div>
              )}
            />
          </Switch>
          <Route
            path="/"
            render={props => (
              <LoginModal {...props} getUser={this.getCurrentlyLoggedInUser} />
            )}
          />
        </header>
      </div>
    );
  }
}
