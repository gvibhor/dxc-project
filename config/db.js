let Managers = require('../models/').managers;
let Employees = require('../models/').employees;

Employees.belongsTo(Managers,{foreignKey: 'manager_id', targetKey: 'id'});
Managers.hasMany(Employees,{ foreignKey: 'manager_id' });

module.exports = {
    tables:{
     Managers,Employees
    }
};