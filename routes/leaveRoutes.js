const express = require("express");
const router = express.Router();
const LeaveController = require("../controllers/leaveController");
const authMiddleware = require("../middleware/authJwt");

// Routes
router.post("/leaves", LeaveController.createLeaveRequest);
router.put("/leaves/:leaveId/approve", LeaveController.approveLeaveRequest);
router.get(
  "/leave/viewall",
  authMiddleware("viewall"),
  LeaveController.viewLeave
);
router.put("/leaves/:leaveId/reject", LeaveController.rejectLeaveRequest);
router.get("/leave/view", LeaveController.viewLeaveById);

module.exports = router;
