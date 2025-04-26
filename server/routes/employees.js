const router = require('express').Router();
const Employee = require('../models/Employee');

router.post('/', async (req, res) => {
    try {
    const employee = new Employee(req.body);
    await employee.save();
    res.status(201).json(employee);
} catch (err) {
    res.status(400).json({ error: err.message });
}
});


/* //implementing the get route to fetch all employees just for testing the route

router.get('/', async (req, res) => {
    try {
        const employees = await Employee.find().populate('project_assignments');
        res.status(200).json(employees);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});*/

module.exports = router;
