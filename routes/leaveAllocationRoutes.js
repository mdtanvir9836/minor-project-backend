const express = require('express');
const router = express.Router();
const EmployeeLeaveAllocationController = require('../controllers/leaveAllocationController');

router.post('/allocations/create', EmployeeLeaveAllocationController.createLeaveAllocation);
router.get('/allocations/viewall', EmployeeLeaveAllocationController.getLeaveAllocations);
router.get('/allocations/:employeeId', EmployeeLeaveAllocationController.getLeaveAllocationByEmployee);
router.put('/allocations/:allocationId', EmployeeLeaveAllocationController.updateLeaveAllocation);
router.delete('/allocations/:allocationId', EmployeeLeaveAllocationController.deleteLeaveAllocation);

module.exports = router;
