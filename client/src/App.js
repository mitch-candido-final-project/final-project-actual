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
import Footer from "./components/footer/footer";
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
    setTimeout(() => {
      this.getAllProjects();
    }, 300);
    // var elems = document.querySelectorAll('.sidenav');
    // var instances = M.Sidenav.init(elems, {});
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Route
            path="/"
            render={props => (
              <Nav
                {...props}
                user={this.state.currentlyLoggedIn}
                getUser={this.getCurrentlyLoggedInUser}
              />
            )}
          />
          {this.state.currentlyLoggedIn && (
            <button
              data-target="slide-out"
              className="sidenav-trigger btn side-nav-btn"
            >
              <i className="material-icons">keyboard_arrow_right</i>
            </button>
          )}
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
                    {...props}
                    currentlyLoggedIn={this.state.currentlyLoggedIn}
                    refreshUser={this.getCurrentlyLoggedInUser}
                    allProjects={this.state.allProjects}
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
        <Footer />
      </div>
    );
  }
}
