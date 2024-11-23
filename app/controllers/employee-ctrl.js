const Employee = require("../models/employee-model");
const Project = require("../models/project-model"); // Adjust the path if needed

const employeeCtrl = {};

// Create an employee
employeeCtrl.create = async (req, res) => {
    try {
        const { name, email, position, projects } = req.body;

        // Validate project IDs
        if (projects && projects.length > 0) {
            const validProjects = await Project.find({ _id: { $in: projects } });
            if (validProjects.length !== projects.length) {
                return res.status(400).json({ error: "One or more projects not found" });
            }
        }

        // Save employee
        const employee = new Employee({ name, email, position, projects });
        await employee.save();

        // Add employee reference to projects
        if (projects && projects.length > 0) {
            await Project.updateMany(
                { _id: { $in: projects } },
                { $push: { employees: employee._id } }
            );
        }

        res.status(201).json(employee);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
};

// Get all employees
employeeCtrl.list = async (req, res) => {
    try {
        const employees = await Employee.find().populate("projects", "name description");
        res.json(employees);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
};

// Delete an employee
employeeCtrl.delete = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const employee = await Employee.findByIdAndDelete(employeeId);
        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }

        await Project.updateMany(
            { _id: { $in: employee.projects } },
            { $pull: { employees: employeeId } }
        );

        res.json({ message: "Employee deleted successfully" });
    } catch (err) {
        console.error("Error deleting employee:", err); // Log error here
        res.status(500).json({ error: "Something went wrong" });
    }
};

// Edit (Update) an employee
employeeCtrl.update = async (req, res) => {
    try {
        const { employeeId } = req.params;
        const { name, email, position, projects } = req.body;

        // Find the employee by ID
        const employee = await Employee.findById(employeeId);
        if (!employee) {
            return res.status(404).json({ error: "Employee not found" });
        }

        // Update the employee details
        employee.name = name || employee.name;
        employee.email = email || employee.email;
        employee.position = position || employee.position;

        // If projects are updated, validate and update
        if (projects) {
            const validProjects = await Project.find({ _id: { $in: projects } });
            if (validProjects.length !== projects.length) {
                return res.status(400).json({ error: "One or more projects not found" });
            }

            // Update projects for the employee
            employee.projects = projects;
            // Update employee references in the projects
            await Project.updateMany(
                { _id: { $in: projects } },
                { $push: { employees: employee._id } }
            );
        }

        await employee.save();
        res.json(employee);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Something went wrong" });
    }
};

module.exports = employeeCtrl;
