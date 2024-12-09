const express = require("express");
const router = express.Router();
const authJwt = require("../middleware/authJwt"); // Assuming you have these middlewares
const checkRole = require("../middleware/checkRole");
const DocumentRequestController = require("../controllers/documentRequestController");
const upload = require("../middleware/fileUploads");

// Create a new document request
router.post(
  "/create",
  authJwt(), // User must be logged in
  checkRole(["hr", "super_admin", "admin"]), // Only HR or Admin can create document requests
  DocumentRequestController.createDocumentRequest
);

// Get all document requests for the logged-in employee
router.get(
  "/employee/requests",
  authJwt(), // Only the logged-in employee can see their own requests
  DocumentRequestController.getEmployeeDocumentRequests
);

// Update a document request (HR/Admin only)
router.put(
  "/update/:id",
  authJwt(), // User must be logged in
  checkRole(["hr", "super_admin"]), // Only HR or Admin can update requests
  DocumentRequestController.updateDocumentRequest
);

// Delete a document request (HR/Admin only)
router.delete(
  "/delete/:id",
  authJwt(), // User must be logged in
  checkRole(["hr", "super_admin"]), // Only HR or Admin can delete requests
  DocumentRequestController.deleteDocumentRequest
);

// Employee submits a document in response to a request
router.post(
  "/submit/:documentRequestId",
  authJwt(), // Employee must be logged in
  upload.single("file"),
  DocumentRequestController.submitDocument
);

// Get all pending document submissions for HR/Admin to review
router.get(
  "/hr/submissions",
  authJwt(), // Ensure user is authenticated
  checkRole(["hr", "admin"]), // Only HR/Admin can access this
  DocumentRequestController.getSubmissionsForReview
);

// HR/Admin reviews and updates the submission status (approve/reject)
router.put(
  "/hr/review/:submissionId",
  authJwt(), // Ensure user is authenticated
  checkRole(["hr", "admin"]), // Only HR/Admin can access this
  DocumentRequestController.reviewSubmission
);

// Get all document requests made by HR/Admin
router.get(
  "/hr/requests",
  authJwt(), // Ensure user is authenticated
  checkRole(["hr", "super_admin"]), // Only HR/Admin can access this
  DocumentRequestController.getAllDocumentRequests
);

module.exports = router;
