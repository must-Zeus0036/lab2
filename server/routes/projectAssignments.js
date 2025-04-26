const express = require('express');
const router = express.Router();
const ProjectAssignment = require('../models/ProjectAssignment.js');

router.post('/', async (req, res) => {
    try {
        const { employee_id, project_code, start_date } = req.body;
        const assignment = new ProjectAssignment({
            employee_id,
            project_code,
            start_date: new Date(start_date),
        });
        await assignment.save();
        res.status(201).json(assignment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});
// the get route to fetch all project assignments
router.get('/', async (req, res) => {
    try {
        const assignments = await ProjectAssignment.find()
            .populate('employee_id') // Populate employee details
            .populate('project_code') // Populate project details
            .sort({ start_date: -1 }); // Sort by start date (latest first)
        res.json(assignments);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;