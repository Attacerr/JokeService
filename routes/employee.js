// employee.js
const controller = require("../controllers/controller");
const express = require('express');
const router = express.Router();

router
    .get('/', async (request, response) => {
        try {
            let employees = await controller.getEmployees();
            response.send(employees);
        } catch (e) {
            sendStatus(e, response);
        }
    })
    .post('/', async (request, response) => {
            try {
                let {title, name, wage, companyId} = request.body;
                let company = await controller.getCompany(companyId);
                let employee = await controller.createEmployee(title, name, wage);
                await controller.connectEmployeeToCompany(company, employee);
                response.send({message: 'Employee saved!'});
            } catch (e) {
                sendStatus(e, response);
            }
        }
    );

function sendStatus(e, response) {
    console.error("Exception: " + e);
    if (e.stack) console.error(e.stack);
    response.status(500).send(e);
}

module.exports = router;