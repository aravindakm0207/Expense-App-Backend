const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const employeeSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    position: { type: String }, // Optional field
    projects: [{ type: mongoose.Schema.Types.ObjectId, ref: "Project" }] // Relation with projects
}, { timestamps: true });

const Employee = model("Employee", employeeSchema);
module.exports = Employee;
