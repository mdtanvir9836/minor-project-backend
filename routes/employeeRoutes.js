const express = require("express");
const employeeController = require("../controllers/employeeController");
const authMiddleware = require("../middleware/authJwt");
const router = express.Router();

 
router.post('/employees/add',authMiddleware("create"), employeeController.addEmployee);
 
router.get('/employees/view/:id',authMiddleware("view"), employeeController.viewEmployee);
 
router.get('/employees/viewall/',authMiddleware("viewall"), employeeController.viewAllEmployees);
router.delete('/employees/delte/:id',authMiddleware("delete"), employeeController.deleteEmployee);
router.put('/employees/edit/:id',authMiddleware("update"), employeeController.updateEmployee);

module.exports = router;
