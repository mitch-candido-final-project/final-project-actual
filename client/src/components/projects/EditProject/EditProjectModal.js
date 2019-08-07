import React, { Component } from "react";
import ProjectService from "../../services/ProjectService";
import "./edit-project-modal.css";
class EditProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.singleProject.name,
      description: this.props.singleProject.description,
      startDate: this.props.singleProject.startDate,
      dueDate: this.props.singleProject.dueDate,
      isPublic: this.props.singleProject.isPublic,
      image: this.props.singleProject.image
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
      .updateProject(this.props.singleProject._id, data)
      .then(() => {
        this.props.history.push(`/project/${this.props.singleProject._id}`);
        this.props.getAllProjects();
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

  deleteProject = () => {
    this.service
      .deleteProject(this.props.singleProject._id)
      .then(() => {
        this.props.history.push("/");
        this.props.getAllProjects();
        console.log("worked");
      })
      .catch(err => {
        console.log(err);
      });
  };
  showProjectInfo = () => {
    return (
      <div id="edit-project-modal" className="modal add-project">
        <div className="modal-content">
          <div className="edit-header">
            <h5>Edit Project</h5>
            <button onClick={this.deleteProject} className="modal-close">
              <span>Delete Project</span>
              <i className="fas fa-minus-circle" />
            </button>
          </div>
          <form onSubmit={this.handleFormSubmit}>
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
    return <div className="edit-modal">{this.showProjectInfo()}</div>;
  }
}

export default EditProject;
