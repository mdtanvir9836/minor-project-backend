const mongoose = require("mongoose");
const leaveSchema = mongoose.Schema({
  employeeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  leaveTypeId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "leave_types",
    required: true,
  },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected", "allocated", "cancelled"],
    default: "pending",
  },

  managerComments: { type: String },
  hrComments: { type: String },
  reason: { type: String },
  supportingDocuments: { type: String },
});

module.exports = mongoose.model("leaves", leaveSchema);
