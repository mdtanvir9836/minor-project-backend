const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeLeaveAllocationSchema = new Schema({
    employeeId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true },   
    leaveTypeId: { type: mongoose.Schema.Types.ObjectId, ref: 'leave_types', required: true },   
    allocatedLeaves: { type: Number, required: true },  // Total allocated leaves for this employee
    usedLeaves: { type: Number, default: 0 },  // Number of leaves the employee has used
});

const EmployeeLeaveAllocation = mongoose.model('employee_leave_allocations', employeeLeaveAllocationSchema);
module.exports = EmployeeLeaveAllocation;
