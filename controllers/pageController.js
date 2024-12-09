const Pages = require("../models/pages");
const PageGroup = require("../models/pageGroups");
const Role = require("../models/role");

class PagesController {
  // Create a new page
  static async createPage(req, res) {
    try {
      const { pageName, slug, pageGroupId, order, isVisible, accessRoles } =
        req.body;

      // Validate pageGroupId
      const pageGroup = await PageGroup.findById(pageGroupId);
      if (!pageGroup) {
        return res.status(400).json({ message: "Invalid page group ID" });
      }

      // Validate accessRoles
      const roles = await Role.find({ _id: { $in: accessRoles } });
      if (roles.length !== accessRoles.length) {
        return res
          .status(400)
          .json({ message: "One or more role IDs are invalid" });
      }

      // Create a new page instance
      const newPage = new Pages({
        pageName,
        slug,
        pageGroupId,
        order,
        isVisible,
        accessRoles,
      });

      // Save the page to the database
      await newPage.save();

      // Respond with success
      res
        .status(201)
        .json({ message: "Page created successfully", page: newPage });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating page", error: error.message });
    }
  }

  // Get all pages
  static async getAllPages(req, res) {
    try {
      const pages = await Pages.find().populate("pageGroupId accessRoles");
      res.status(200).json({ message: "Pages retrieved successfully", pages });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving pages", error: error.message });
    }
  }

  // Get a single page by ID
  static async getPageById(req, res) {
    const { id } = req.params;
    try {
      const page = await Pages.findById(id).populate("pageGroupId accessRoles");
      if (!page) {
        return res.status(404).json({ message: "Page not found" });
      }
      res.status(200).json({ message: "Page retrieved successfully", page });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error retrieving page", error: error.message });
    }
  }

  // Update a page
  static async updatePage(req, res) {
    const { id } = req.params;
    const { pageName, slug, pageGroupId, order, isVisible, accessRoles } =
      req.body;
    try {
      // Validate accessRoles (optional)
      const roles = await Role.find({ _id: { $in: accessRoles } });
      if (roles.length !== accessRoles.length) {
        return res
          .status(400)
          .json({ message: "One or more role IDs are invalid" });
      }

      // Update the page
      const updatedPage = await Pages.findByIdAndUpdate(
        id,
        {
          pageName,
          slug,
          pageGroupId,
          order,
          isVisible,
          accessRoles,
          updatedAt: Date.now(),
        },
        { new: true } // Return the updated document
      ).populate("pageGroupId accessRoles");

      if (!updatedPage) {
        return res.status(404).json({ message: "Page not found" });
      }

      res
        .status(200)
        .json({ message: "Page updated successfully", page: updatedPage });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating page", error: error.message });
    }
  }

  // Delete a page
  static async deletePage(req, res) {
    const { id } = req.params;
    try {
      const deletedPage = await Pages.findByIdAndDelete(id);
      if (!deletedPage) {
        return res.status(404).json({ message: "Page not found" });
      }
      res
        .status(200)
        .json({ message: "Page deleted successfully", page: deletedPage });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting page", error: error.message });
    }
  }
}

module.exports = PagesController;
