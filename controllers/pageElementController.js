const PageElement = require('../models/pageElements');  

class PageElementController {
  
  static createPageElement = async (req, res) => {
    try {
      const { pageId, type, disabledForRoles, status } = req.body;
 
      const newPageElement = new PageElement({
        pageId,
        type,
        disabledForRoles,
        status
      });

      const savedElement = await newPageElement.save();
      res.status(201).json({
        message: 'Page element created successfully',
        pageElement: savedElement
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error creating page element',
        error: error.message
      });
    }
  }

  // Get all page elements
  static getAllPageElements = async (req, res) => {
    try {
      const pageElements = await PageElement.find().populate('pageId');
      res.status(200).json(pageElements);
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching page elements',
        error: error.message
      });
    }
  }

  // Get a specific page element by ID
  static getPageElementById = async (req, res) => {
    try {
      const pageElementId = req.params.id;
      const pageElement = await PageElement.findById(pageElementId).populate('pageId');

      if (!pageElement) {
        return res.status(404).json({ message: 'Page element not found' });
      }

      res.status(200).json(pageElement);
    } catch (error) {
      res.status(500).json({
        message: 'Error fetching page element',
        error: error.message
      });
    }
  }

  // Update a page element
  static updatePageElement = async (req, res) => {
    try {
      const pageElementId = req.params.id;
      const updatedData = req.body;

      const updatedElement = await PageElement.findByIdAndUpdate(
        pageElementId,
        updatedData,
        { new: true, runValidators: true }
      );

      if (!updatedElement) {
        return res.status(404).json({ message: 'Page element not found' });
      }

      res.status(200).json({
        message: 'Page element updated successfully',
        pageElement: updatedElement
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error updating page element',
        error: error.message
      });
    }
  }

  // Delete a page element
  static deletePageElement = async (req, res) => {
    try {
      const pageElementId = req.params.id;

      const deletedElement = await PageElement.findByIdAndDelete(pageElementId);

      if (!deletedElement) {
        return res.status(404).json({ message: 'Page element not found' });
      }

      res.status(200).json({
        message: 'Page element deleted successfully'
      });
    } catch (error) {
      res.status(500).json({
        message: 'Error deleting page element',
        error: error.message
      });
    }
  }
}

module.exports = PageElementController;
