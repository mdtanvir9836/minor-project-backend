const { default: mongoose } = require("mongoose");
const Leave = require("../models/leaveSchema");
const User = require("../models/user-model");
const EmployeeLeaveAllocation = require("../models/employeeLeaveAllocation");
class leaveController {
  static createLeaveRequest = async (req, res) => {
    const {
      employeeId,
      leaveTypeId,
      startDate,
      endDate,
      reason,
      supportingDocuments,
    } = req.body;

    try {
      const leaveRequest = new Leave({
        employeeId,
        leaveTypeId,
        startDate,
        endDate,
        reason,
        supportingDocuments,
      });

      await leaveRequest.save();
      res
        .status(201)
        .json({ message: "Leave request created successfully", leaveRequest });
    } catch (err) {
      console.error("Error creating leave request:", err);
      res.status(500).json({ error: "Error creating leave request" });
    }
  };

  // static    approveLeaveRequest = async (req, res) => {
  //         const { leaveId } = req.params;
  //         const { managerComments } = req.body;

  //         try {
  //             const leaveRequest = await Leave.findById(leaveId).populate('employeeId').populate('leaveTypeId');

  //             if (!leaveRequest) {
  //                 return res.status(404).json({ message: 'Leave request not found' });
  //             }

  //             leaveRequest.status = 'approved';
  //             leaveRequest.managerComments = managerComments;
  //             await leaveRequest.save();

  //             // const user = leaveRequest.employeeId;
  //             const allocatedLeaves = leaveRequest.leaveTypeId.allocatedLeaves;
  //             if(allocatedLeaves == undefined || allocatedLeaves==null)
  //                 {
  //                     return res.status(400).json({message:"allocated leaves is not defined for this leavve type"});

  //                 }
  //               const leaveDays = this.calculateLeaveDays(leaveRequest.startDate, leaveRequest.endDate); // Update the leave balance

  //               if(leaveDays > allocatedLeaves)
  //               {
  //                 return res.status(400).json({message:"  insufficient allocated  leaves "});
  //               }
  //               allocatedLeaves -= leaveDays;
  //               leaveRequest.leaveTypeId.allocatedLeaves = allocatedLeaves;

  //               await leaveRequest.leaveTypeId.save();

  //             res.status(200).json({ message: 'Leave request approved', leaveRequest });
  //         } catch (err) {
  //             console.error('Error approving leave request:', err);
  //             res.status(500).json({ error: 'Error approving leave request' });
  //         }
  //     };

  static approveLeaveRequest = async (req, res) => {
    const { leaveId } = req.params;
    const { managerComments } = req.body;

    try {
      // Find the leave request
      const leaveRequest = await Leave.findById(leaveId)
        .populate("employeeId")
        .populate("leaveTypeId");
      if (!leaveRequest) {
        return res.status(404).json({ message: "Leave request not found" });
      }

      // Approve the leave request and update manager comments
      leaveRequest.status = "approved";
      leaveRequest.managerComments = managerComments;

      // Calculate the number of leave days
      const leaveDays = this.calculateLeaveDays(
        leaveRequest.startDate,
        leaveRequest.endDate
      );

      // Fetch the employee's specific leave allocation
      const employeeLeaveAllocation = await EmployeeLeaveAllocation.findOne({
        employeeId: leaveRequest.employeeId._id,
        leaveTypeId: leaveRequest.leaveTypeId._id,
      });

      if (!employeeLeaveAllocation) {
        return res
          .status(400)
          .json({ message: "No leave allocation found for this employee" });
      }

      // Check if the employee has enough allocated leaves
      const remainingLeaves =
        employeeLeaveAllocation.allocatedLeaves -
        employeeLeaveAllocation.usedLeaves;
      if (leaveDays > remainingLeaves) {
        return res
          .status(400)
          .json({ message: "Insufficient allocated leaves" });
      }

      // Update the used leaves for the employee
      employeeLeaveAllocation.usedLeaves += leaveDays;

      // Save the updated leave request and employee leave allocation
      await leaveRequest.save();
      await employeeLeaveAllocation.save();

      res.status(200).json({ message: "Leave request approved", leaveRequest });
    } catch (err) {
      console.error("Error approving leave request:", err);
      res.status(500).json({ error: "Error approving leave request" });
    }
  };

  static rejectLeaveRequest = async (req, res) => {
    try {
      const { leaveId } = req.params;
      const { managerComments } = req.body;
      const leaveRequest = await Leave.findById(leaveId).populate("employeeId");

      if (!leaveRequest) {
        return res.status(404).json({ message: "Leave request not found" });
      }

      leaveRequest.status = "rejected";
      leaveRequest.managerComments = managerComments;
      await leaveRequest.save();

      res.status(200).json({ message: "Leave request rejected", leaveRequest });
    } catch (error) {
      console.error("Error approving leave request:", err);
      res.status(500).json({
        message: "Error approving leave request",
        error: error.message,
      });
    }
  };

  static calculateLeaveDays(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // +1 to include the end date
    return diffDays;
  }
  static viewLeave = async (req, res) => {
    try {
      const organizationId =
        req.user?.organizationId || req.body.organizationId;

      if (!organizationId) {
        return res.status(404).json({ message: "Organization ID is missing" });
      }

      // Convert organizationId to ObjectId for the query
      const validOrganizationId = new mongoose.Types.ObjectId(organizationId);

      const leaveRequest = await Leave.find().populate({
        path: "employeeId",
        select: "name organizationId",
        match: { organizationId: validOrganizationId },
      });

      return res.status(200).json({
        message: "Leave requests retrieved successfully",
        info: leaveRequest,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error retrieving data", error: error.message });
    }
  };

  static viewLeaveById = async (req, res) => {
    try {
      const userId = req.user._id;
      const organizationId = req.user?.organizationId || req.user.body;

      if (!organizationId) {
        return res.status(404).json({ message: " organization Id is missing" });
      }
      const validOrganizationId = new mongoose.Types.ObjectId(organizationId);

      const leaveRequest = await Leave.findById(userId).populate({
        path: "employeeId",
        select: "name organizationId",
        match: { organizationId: validOrganizationId },
      });
      return res.status(200).json({
        message: "Leave requests retrieved successfully",
        info: leaveRequest,
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: "error retrieving leaves", error: error.message });
    }
  };
}

module.exports = leaveController;
