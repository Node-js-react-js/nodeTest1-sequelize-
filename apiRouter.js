//apiRouter.js
const express = require('express');
const apiRouter = express.Router();
const { getAllCompaniesEmployees, getOneCompanyEmployees } = require('./controller.js');
// Get all companies with employees  
apiRouter.get('/', async (req, res, next) => {
    try {
        const companies = await getAllCompaniesEmployees();
        res.status(200).json({ companies: companies });
    } catch (e) {
        console.log(e);
        res.sendStatus(500);
    }
});
apiRouter.param('companyId', async (req, res, next, companyId) => {
    try {
        const company = await getOneCompanyEmployees(companyId);
        req.company = company;
        next(); // go to apiRouter.get('/:companyId')
    } catch (e) {
        console.log(e);
        res.sendStatus(404);
    }
});
// Get company with its employees  
apiRouter.get('/:companyId', (req, res, next) => {
    res.status(200).json({ company: req.company });
});
module.exports = apiRouter;