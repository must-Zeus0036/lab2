const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

router.post('/', async (req, res) => {
    try {
        const { project_code, project_name, project_description } = req.body;
        const project = new Project({ project_code, project_name, project_description });
        await project.save();
        res.status(201).json(project);
    } catch (err) {
        res.status(400).json({ error: err.message });
}
});
/*// Implementing the get route to fetch all projects just for testing the route
router.get('/', async (req, res) => {
    try {
        const projects = await Project.find().populate('project_assignments');
        res.status(200).json(projects);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}
);*/

module.exports = router;
