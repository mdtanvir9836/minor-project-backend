const mongoose = require("mongoose");

const pageElementSchema = new mongoose.Schema({
  pageId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "pages",
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: [
      "input",        // Text input field
      "button",       // Button element
      "text",         // Static text
      "dropdown",     // Select dropdown
      "checkbox",     // Checkbox element
      "radio",        // Radio buttons
      "textarea",     // Multi-line text area
      "date",         // Date picker
      "number",       // Number input
      "file",         // File upload input
      "password",     // Password input
      "image",        // Image element
      "switch",       // Toggle switch (on/off)
      "color",        // Color picker
      "range",        // Range slider
      "email",        // Email input
      "time",         // Time picker
      "phone",        // Phone number input
    ]  
  },
 disabledForRoles: [{
    type: String,
    enum: ["admin", "hr", "employee", "manager"],
  }],

  
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "active"
  },
 

}, { timestamps: true });

const PageElement = mongoose.model("pageelements", pageElementSchema);
module.exports = PageElement;
