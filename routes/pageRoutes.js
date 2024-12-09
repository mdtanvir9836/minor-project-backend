// routes/pageRoutes.js
const express = require("express");
const router = express.Router();
const PagesController = require("../controllers/pageController");

// Routes for managing pages
router.post("/create", PagesController.createPage); // Create a new page
router.get("/viewall", PagesController.getAllPages); // Get all pages
router.get("/viewbyid/:id", PagesController.getPageById); // Get a specific page
router.put("/update/:id", PagesController.updatePage); // Update a specific page
router.delete("/delete/:id", PagesController.deletePage); // Delete a specific page

module.exports = router;
