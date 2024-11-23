const Project = require("../models/project-model");
const Employee = require("../models/employee-model");

const projectCtrl = {};

// Create a project
projectCtrl.create = async (req, res) => {
    try {
        const { name, description } = req.body;
        const project = new Project({ name, description });
        await project.save();
        res.status(201).json(project);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
};

// Get all projects
projectCtrl.list = async (req, res) => {
    try {
        const projects = await Project.find().populate("employees", "name email");
        res.json(projects);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
};

// Add employee to project
projectCtrl.addEmployee = async (req, res) => {
    try {
        const { projectId, employeeId } = req.body;
        const project = await Project.findById(projectId);
        const employee = await Employee.findById(employeeId);

        if (!project || !employee) {
            return res.status(404).json({ error: "Project or Employee not found" });
        }

        if (!project.employees.includes(employeeId)) {
            project.employees.push(employeeId);
            employee.projects.push(projectId);
            await project.save();
            await employee.save();
        }

        res.json({ project, employee });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
};

// Remove employee from project
projectCtrl.removeEmployee = async (req, res) => {
    try {
        const { projectId, employeeId } = req.body;
        const project = await Project.findById(projectId);
        const employee = await Employee.findById(employeeId);

        if (!project || !employee) {
            return res.status(404).json({ error: "Project or Employee not found" });
        }

        project.employees = project.employees.filter(id => id.toString() !== employeeId);
        employee.projects = employee.projects.filter(id => id.toString() !== projectId);

        await project.save();
        await employee.save();

        res.json({ project, employee });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
};

// Delete a project
projectCtrl.delete = async (req, res) => {
    try {
        const { projectId } = req.params;
        const project = await Project.findByIdAndDelete(projectId);
        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }

        // Remove project reference from employees
        await Employee.updateMany(
            { _id: { $in: project.employees } },
            { $pull: { projects: projectId } }
        );

        res.json({ message: "Project deleted successfully" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
};

// Edit (Update) a project
projectCtrl.update = async (req, res) => {
    try {
        const { projectId } = req.params;
        const { name, description } = req.body;

        // Find the project by ID
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(404).json({ error: "Project not found" });
        }

        // Update the project details
        project.name = name || project.name;
        project.description = description || project.description;

        await project.save();
        res.json(project);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
};

module.exports = projectCtrl;
