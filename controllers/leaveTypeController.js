const LeaveType = require('../models/leaveTypeSchema');

class leaveTypeController {
  // Create a new LeaveType
  static createLeaveType = async (req, res) => {
    try {
        const {name,description,accrualPolicy}= req.body;
      const leaveType = new LeaveType({
        name,description,accrualPolicy,
      });
      await leaveType.save();
      res.status(201).json({message:"leave type created successfully",info:leaveType});
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Get all LeaveTypes
  static getLeaveTypes = async (req, res) => {
    try {
      const leaveTypes = await LeaveType.find();
      res.status(200).json(leaveTypes);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Get a LeaveType by ID
  static getLeaveTypeById = async (req, res) => {
    try {
      const leaveType = await LeaveType.findById(req.params.id);
      if (!leaveType) return res.status(404).json({ message: 'LeaveType not found' });
      res.status(200).json(leaveType);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  // Update a LeaveType by ID
  static updateLeaveType = async (req, res) => {
    try {
      const leaveType = await LeaveType.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!leaveType) return res.status(404).json({ message: 'LeaveType not found' });
      res.status(200).json(leaveType);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  };

  // Delete a LeaveType by ID
  static deleteLeaveType = async (req, res) => {
    try {
      const leaveType = await LeaveType.findByIdAndDelete(req.params.id);
      if (!leaveType) return res.status(404).json({ message: 'LeaveType not found' });
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };
}

module.exports = leaveTypeController;
