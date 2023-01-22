const db = require('./db');
const Employee = db.Employee;
const Setting = db.Setting;
module.exports = {
    insertEmployee,
    updateEmployee,
    getOneEmployee,
    getAllEmployees,
    deleteEmployee,
    insertEmployeeSettings,
    findAllEmployees,
    findEmployeeSettings
};
async function insertEmployee(name, position, email, wage) {
    await Employee.create({ name, position, email, wage });
}
async function  insertEmployeeSettings(theme, autoLogin, EmployeeId) {   
    await Setting.create({ theme, autoLogin, EmployeeId});     
}
async function findAllEmployees(){ 
    const employees= await Employee.findAll({       
      include: [ 
        {
          model: Setting,
           attributes: ['theme', 'autoLogin'],
        },
      ]
    });      
    return employees;   
}
async function findEmployeeSettings(id){ 
    const employee= await Employee.findByPk(id, {
      include: [ 
        {
          model: Setting ,            
          attributes: ["theme", "autoLogin"], 
        },
      ],
    });      
    return employee;
}
async function updateEmployee(name, position, email, wage, id) {
    await Employee.update({ name, position, email, wage }, { where: { id: id } });
}
async function getOneEmployee(id) {
    const employee = await Employee.findByPk(id);
    return employee;
}
async function getAllEmployees() {
    const employees = await Employee.findAll();
    return employees;
}
async function deleteEmployee(id) {
    const employee = await getOneEmployee(id);
    await employee.destroy();
}