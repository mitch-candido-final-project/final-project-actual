import React, { Component } from "react";
import ProjectService from "../services/ProjectService";

class NewProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      description: "",
      startDate: "",
      dueDate: "",
      isPublic: false,
      image: ""
    };
    this.service = new ProjectService();
  }

  handleFormSubmit = event => {
    event.preventDefault();
    const data = new FormData();
    for (let key in this.state) {
      data.append(key, this.state[key]);
    }
    this.service
      .addProject(data)
      .then(() => {
        this.props.getAllProjects();
        this.setState({
          name: "",
          description: "",
          startDate: "",
          dueDate: "",
          isPublic: false,
          image: ""
        });
      })
      .catch(error => console.log(error));
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

  render() {
    return (
      <div id="add-project-modal" className="modal add-project">
        <form onSubmit={this.handleFormSubmit}>
          <div className="modal-content">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={this.state.name}
              onChange={e => this.handleChange(e)}
            />
            <label>Description:</label>
            <textarea
              name="description"
              value={this.state.description}
              onChange={e => this.handleChange(e)}
            />
            <label>start Date:</label>
            <input
              type="date"
              name="startDate"
              value={this.state.startDate}
              onChange={e => this.handleChange(e)}
            />
            <label>Due Date:</label>
            <input
              type="date"
              name="dueDate"
              value={this.state.dueDate}
              onChange={e => this.handleChange(e)}
            />
            <label>
              <input
                type="checkbox"
                name="isPublic"
                onChange={e => this.handleChangeCheckbox(e)}
                checked={this.state.isPublic && "checked"}
                style={{ position: "initial" }}
              />
              <span>Public?:</span>
            </label>
            <input
              type="file"
              name="image"
              onChange={e => this.handleChangeFile(e)}
            />
            <button className="btn modal-close">Submit</button>
          </div>
          <div className="modal-footer">
            <a href="#!" className="modal-close waves-effect waves-green">
              close
            </a>
          </div>
        </form>
      </div>
    );
  }
}

export default NewProject;
