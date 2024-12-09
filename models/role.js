const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const roleSchema = new Schema(
  {
    name: {
      type: String,
      enum: ["super_admin", "admin", "hr", "employee", "HR_Manager"],
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

const Role = mongoose.model("roles", roleSchema);

module.exports = Role;
