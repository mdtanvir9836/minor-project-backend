const mongoose = require("mongoose");
const { Schema } = mongoose;

const PageGroupSchema = new Schema(
  {
    groupName: { type: String, required: true, unique: true }, // Unique name of the page group
    description: { type: String }, // Description of the group
    order: { type: Number, default: 0 },
    isVisible: { type: Boolean, default: true }, // Visibility flag
  },
  { timestamps: true }
);

module.exports = mongoose.model("pagegroups", PageGroupSchema);
