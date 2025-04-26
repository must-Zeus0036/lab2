const mongoose = require('mongoose');

// definfing the schema for project assignment collection
const ProjectAssignmentSchema = new mongoose.Schema({
    employee_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Employee', required: true },
    project_code: { type: mongoose.Schema.Types.ObjectId, ref: 'Project', required: true },
    start_date: { type: Date, default: Date.now },
});

const ProjectAssignment = mongoose.model('ProjectAssignment', ProjectAssignmentSchema);

module.exports = ProjectAssignment;