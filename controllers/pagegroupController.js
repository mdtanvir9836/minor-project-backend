const PageGroup = require("../models/pageGroups");

class PageGroupController {
  static async createPageGroup(req, res) {
    try {
      const { groupName, description, icon, order, isVisible } = req.body;

      // Create a new page group instance
      const newPageGroup = new PageGroup({
        groupName,
        description,
        icon,
        order,
        isVisible,
      });

      // Save to the database
      await newPageGroup.save();

      // Respond with success
      res.status(201).json({
        message: "Page group created successfully",
        data: newPageGroup,
      });
    } catch (error) {
      // Respond with error
      res.status(500).json({
        message: "Error creating page group",
        error: error.message,
      });
    }
  }
}

module.exports = PageGroupController;
