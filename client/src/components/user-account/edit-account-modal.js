import React, { Component } from "react";
import AuthService from "../services/AuthService";
// import "./edit-project-modal.css";
class UserAccount extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.currentlyLoggedIn.username,
      firstName: this.props.currentlyLoggedIn.firstName,
      lastName: this.props.currentlyLoggedIn.lastName,
      email: this.props.currentlyLoggedIn.email,
      image: this.props.currentlyLoggedIn.image
    };
    this.service = new AuthService();
  }
  componentDidMount = () => {
    const uploadButton = document.querySelector(".browse-btn");
    const fileInfo = document.querySelector(".file-info");
    const realInput = document.getElementById("real-input");

    uploadButton.addEventListener("click", e => {
      realInput.click();
    });

    realInput.addEventListener("change", () => {
      const name = realInput.value.split(/\\|\//).pop();
      const truncated = name.length > 20 ? name.substr(name.length - 20) : name;

      fileInfo.innerHTML = truncated;
    });
  };
  handleFormSubmit = event => {
    event.preventDefault();
    const data = new FormData();
    for (let key in this.state) {
      data.append(key, this.state[key]);
    }

    this.service
      .updateUser(this.props.currentlyLoggedIn._id, data)
      .then(() => {
        this.props.history.push("/account");
        this.props.refreshUser();
      })
      .catch(error => console.log(error));
    // console.log("this is the data from the form submit", data);
  };

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };
  handleChangeFile = event => {
    this.setState({ [event.target.name]: event.target.files[0] });
  };

  showUserInfo = () => {
    return (
      <div id="edit-user-modal" className="modal add-project">
        <div className="modal-content">
          <div className="edit-header">
            <h5>Edit User</h5>
          </div>
          <form onSubmit={this.handleFormSubmit}>
            <label>First Name:</label>
            <input
              type="text"
              name="firstName"
              value={this.state.firstName}
              onChange={e => this.handleChange(e)}
            />
            <label>Last Name:</label>
            <input
              type="text"
              name="lastName"
              value={this.state.lastName}
              onChange={e => this.handleChange(e)}
            />
            <label>Username: </label>
            <input
              type="text"
              name="username"
              value={this.state.username}
              onChange={e => this.handleChange(e)}
            />
            <label>Email:</label>
            <input
              type="text"
              name="email"
              value={this.state.email}
              onChange={e => this.handleChange(e)}
            />
            <div className="input-container">
              <input
                className="upload"
                type="file"
                name="image"
                id="real-input"
                onChange={e => this.handleChangeFile(e)}
              />
              <a className="browse-btn">Browse Files</a>
              <span className="file-info">Upload a profile picture</span>
            </div>
            <button className="btn modal-close submit-button">Submit</button>
          </form>
        </div>
        <div className="modal-footer">
          <a href="#!" className="modal-close waves-effect waves-green">
            close
          </a>
        </div>
      </div>
    );
  };

  render() {
    return <div className="edit-modal">{this.showUserInfo()}</div>;
  }
}

export default UserAccount;
