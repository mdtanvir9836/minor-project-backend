const mongoose = require("mongoose");
const { Schema } = mongoose;

const PagesSchema = new Schema({
  pageName: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  pageGroupId: {
    type: Schema.Types.ObjectId,
    ref: "pagegroups",
    required: true,
  },
  order: { type: Number, default: 0 },
  isVisible: { type: Boolean, default: true },
  accessRoles: [{ type: Schema.Types.ObjectId, ref: "roles" }], // Array of Role references
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("pages", PagesSchema);
