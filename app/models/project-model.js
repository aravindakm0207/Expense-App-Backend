const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const projectSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    employees: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }] // Relation with employees
}, { timestamps: true });

const Project = model("Project", projectSchema);
module.exports = Project;
