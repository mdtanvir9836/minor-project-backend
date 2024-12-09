const  Allocation = require('../models/employeeLeaveAllocation');

class  leaveAllocationController {
    
    // Create a new leave allocation
    static createLeaveAllocation = async (req, res) => {
        try {
            const { employeeId, leaveTypeId, allocatedLeaves } = req.body;
            const newAllocation = new  Allocation({
                employeeId,
                leaveTypeId,
                allocatedLeaves,
                usedLeaves: 0  // Default value
            });
            const savedAllocation = await newAllocation.save();
            res.status(201).json({message:"created successfully",info:savedAllocation});
        } catch (err) {
            res.status(500).json({ message: 'Error creating leave allocation', error: err.message });
        }
    };

    // Get all leave allocations
    static getLeaveAllocations = async (req, res) => {
        try {
            const allocations = await  Allocation.find()
                .populate('employeeId')
                .populate('leaveTypeId');
            res.status(200).json(allocations);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching leave allocations', error: err.message });
        }
    };

    // Get leave allocations for a specific employee
    static getLeaveAllocationByEmployee = async (req, res) => {
        try {
            const { employeeId } = req.params;
            const allocation = await  Allocation.find({ employeeId })
                .populate('leaveTypeId');
            if (!allocation) {
                return res.status(404).json({ message: 'Leave allocation not found' });
            }
            res.status(200).json(allocation);
        } catch (err) {
            res.status(500).json({ message: 'Error fetching leave allocation', error: err.message });
        }
    };

    // Update leave allocation (allocated or used leaves)
    static updateLeaveAllocation = async (req, res) => {
        try {
            const { allocationId } = req.params;
            const updatedData = req.body;  // Expecting `allocatedLeaves` or `usedLeaves` in body
            const updatedAllocation = await  Allocation.findByIdAndUpdate(
                allocationId,
                updatedData,
                { new: true }
            );
            if (!updatedAllocation) {
                return res.status(404).json({ message: 'Leave allocation not found' });
            }
            res.status(200).json(updatedAllocation);
        } catch (err) {
            res.status(500).json({ message: 'Error updating leave allocation', error: err.message });
        }
    };

    // Delete leave allocation
    static deleteLeaveAllocation = async (req, res) => {
        try {
            const { allocationId } = req.params;
            const deletedAllocation = await  Allocation.findByIdAndDelete(allocationId);
            if (!deletedAllocation) {
                return res.status(404).json({ message: 'Leave allocation not found' });
            }
            res.status(200).json({ message: 'Leave allocation deleted successfully' });
        } catch (err) {
            res.status(500).json({ message: 'Error deleting leave allocation', error: err.message });
        }
    };
}

module.exports =  leaveAllocationController;
