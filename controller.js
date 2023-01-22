const db = require('./db');
const Employee = db.Employee;
const Company = db.Company;
module.exports = {
    getAllCompaniesEmployees,
    getOneCompanyEmployees
};
async function getOneCompanyEmployees(id) {
    const company = await Company.findByPk(id, { include: [Employee] });
    return company;
}
async function getAllCompaniesEmployees() {
    const companies = await Company.findAll({ include: [Employee] });
    return companies;
}