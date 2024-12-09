const express = require("express");
const router = express.Router();
const DocumentSubmissionController = require("../controllers/DocumentSubmissionController");
const checkRole = require("../middleware/checkRole");
const upload = require("../middleware/fileUploads");
const authJwt = require("../middleware/authJwt");

// Submit a document for a document request
router.post(
  "/submit",
  authJwt(), // Employee must be authenticated
  upload.single("file"), // Multer middleware for handling file uploads
  DocumentSubmissionController.submitDocument
);

// Get all document submissions for the logged-in employee
router.get(
  "/employee/submissions",
  authJwt(), // Employee must be logged in
  DocumentSubmissionController.getEmployeeSubmissions
);

// HR/Admin reviews a document submission
router.post(
  "/review",
  authJwt(), // Ensure user is authenticated
  checkRole(["hr", "admin", "super_admin"]), // Only HR/Admin can review document submissions
  DocumentSubmissionController.reviewDocument
);

// Get all pending document submissions for HR/Admin to review
router.get(
  "/hr/pending",
  authJwt(), // Ensure user is authenticated
  checkRole(["hr", "admin"]), // Only HR/Admin can view pending submissions
  DocumentSubmissionController.getAllPendingSubmissions
);

// Get all submissions for a specific document request (HR/Admin)
router.get(
  "/hr/document/:documentRequestId",
  authJwt(), // Ensure user is authenticated
  checkRole(["hr", "admin"]), // Only HR/Admin can view submissions for a specific request
  DocumentSubmissionController.getSubmissionsForDocumentRequest
);

// Delete a document submission (HR/Admin only)
router.delete(
  "/hr/delete/:submissionId",
  authJwt(), // Ensure user is authenticated
  checkRole(["hr", "admin"]), // Only HR/Admin can delete submissions
  DocumentSubmissionController.deleteSubmission
);

module.exports = router;
