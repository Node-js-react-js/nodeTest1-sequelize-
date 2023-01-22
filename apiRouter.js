//apiRouter.js
const express = require('express');
const apiRouter = express.Router();
const { insertEmployee,
    insertEmployeeSettings,
    findAllEmployees,
    findEmployeeSettings
} = require('./controller.js');
// Create an employee
apiRouter.post('/employee', async (req, res, next) => {
    try {
        const name = req.body.employee.name;
        const position = req.body.employee.position;
        const email = req.body.employee.email;
        const wage = req.body.employee.wage;
        console.log(name);
        if (!name || !position || !wage) {
            return res.sendStatus(400);
        }
        const employee = await insertEmployee(name, position, email, wage).then(() => res.json({ message: 'Employee created.' }));
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});
// add an employee settings
apiRouter.post('/employee-settings', async (req, res, next) => {
    try {
        const EmployeeId = req.body.settings.employeeId;
        const theme = req.body.settings.theme;
        const autoLogin = req.body.settings.autoLogin;

        if (!EmployeeId || !theme || !autoLogin) {
            return res.sendStatus(400);
        }
        const settings = await insertEmployeeSettings(theme, autoLogin, EmployeeId).then(() => res.json({ message: 'settings created.' }));
    } catch (e) {
        console.log(e);
        res.sendStatus(400);
    }
});
apiRouter.get('/employee-settings', async (req, res, next) => {
    try {
        const employees = await findAllEmployees();
        res.status(200).json({ employees: employees });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
// Get an employee settings
apiRouter.param('employeeId', async (req, res, next, employeeId) => {
    try {
        const employee = await findEmployeeSettings(employeeId);
        console.log(employee);
        req.employee = employee;
        next(); // go to apiRouter.get('/employee-settings/:employeeId')
    } catch (e) {
        console.log(e);
        res.sendStatus(404);
    }
});
apiRouter.get('/employee-settings/:employeeId', (req, res, next) => {
    res.status(200).json({ employee: req.employee });
});
module.exports = apiRouter;