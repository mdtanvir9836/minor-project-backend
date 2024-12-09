const mongoose = require("mongoose");

const rolePermissionSchema = new mongoose.Schema(
  {
    roleId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "roles",
      required: true,
    },
    permissionId: [{
      type : mongoose.Schema.Types.ObjectId,
      ref : "permission",
      required :true,
    }]
  },
  { timestamps: true }
);

module.exports = mongoose.model("rolepermissions", rolePermissionSchema);
