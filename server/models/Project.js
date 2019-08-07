const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const projectSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  owner: { type: Schema.Types.ObjectId, ref: "User" },
  startDate: { type: String },
  dueDate: { type: String },
  timeSpent: { type: String },
  complete: { type: Boolean },
  isPublic: { type: Boolean },
  image: { type: String },
  status: { type: String },
  tasks: [{ title: String, date: String, isComplete: Boolean }]
});
//TODO: Missing tasks
const Project = mongoose.model("Project", projectSchema);

module.exports = Project;
