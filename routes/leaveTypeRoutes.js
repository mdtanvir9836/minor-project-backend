const express = require("express");
const { createLeaveType, getLeaveTypes, getLeaveTypeById, updateLeaveType, deleteLeaveType }=require('../controllers/leaveTypeController');


const router = express.Router();

router.post('/leaveType/create',createLeaveType);
router.get('/leaveType/view',getLeaveTypes);
router.get('/leaveType/viewbyid/:id',getLeaveTypeById);
router.put('/leaveType/update/:id',updateLeaveType);
router.delete('/leaveType/delete/:id',deleteLeaveType);

module.exports=router;