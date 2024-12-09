const mongoose = require("mongoose");
const { Schema } = mongoose;

const UserProfileSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    organizationId :{type: Schema.Types.ObjectId, ref: "organizations"},
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    dob: { type: Date, required: true },
    contactNumber: { type: String, required: true},
  },
  { timestamps: true }
);

module.exports = mongoose.model("userprofile", UserProfileSchema);
