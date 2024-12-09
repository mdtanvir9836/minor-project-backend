const {
  DocumentSubmission,
  DocumentRequest,
} = require("../models/documentSchema");

const path = require("path");
const BASE_URL = process.env.BASE_URL;
const upload_URL = `${BASE_URL}images/`;

class DocumentSubmissionController {
  // Submit a document for a request
  static async submitDocument(req, res) {
    try {
      const { documentRequestId } = req.body;

      // Check if user is authenticated
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      // Check if file is uploaded
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
      }

      // Find the corresponding document request to validate
      const documentRequest = await DocumentRequest.findById(documentRequestId);
      if (!documentRequest) {
        return res.status(404).json({ message: "Document request not found" });
      }

      // Check if the employee submitting the document matches the requested employee
      if (!documentRequest.employees) {
        return res.status(400).json({
          message: "Document request does not have an employee assigned.",
        });
      }

      if (req.user.id.toString() !== documentRequest.employee.toString()) {
        return res.status(403).json({
          message:
            "Unauthorized submission. Only the assigned employee can submit this document.",
        });
      }

      const upload_URL = `${process.env.BASE_URL}images/${path.basename(
        req.file.path
      )}`;

      // Create new document submission
      const newSubmission = new DocumentSubmission({
        documentRequestId,
        submittedBy: req.user.id, // Employee submitting the document
        filePath: upload_URL, // Multer handles file upload
        status: "pending", // Default status is pending until reviewed
      });

      await newSubmission.save();

      return res.status(201).json({
        message: "Document submitted successfully",
        submission: newSubmission,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Server error", error: err.message });
    }
  }

  // Employee views their own document submissions
  static async getEmployeeSubmissions(req, res) {
    try {
      // Fetch submissions by the employee, including details of the document request
      const submissions = await DocumentSubmission.find({
        submittedBy: req.user.id, // Employee ID from the JWT token
      }).populate("documentRequestId"); // Populates document request details

      // Iterate over submissions to adjust status if needed (e.g., pending, approved, rejected)
      const updatedSubmissions = submissions.map((submission) => {
        // Check the current status of the submission
        let currentStatus = submission.status;

        // If not yet reviewed, status will remain "pending"
        if (submission.status === "pending") {
          currentStatus = "pending"; // Default status until reviewed
        } else if (submission.status === "approved") {
          currentStatus = "approved"; // Approved status
        } else if (submission.status === "rejected") {
          currentStatus = "rejected"; // Rejected status
        }

        return {
          ...submission._doc, // Spread submission details
          status: currentStatus, // Dynamic status based on current value
        };
      });

      return res.status(200).json(updatedSubmissions); // Return updated submissions with dynamic status
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Server error", error: err.message });
    }
  }

  // Review a submitted document (HR/Admin only)
  static async reviewDocument(req, res) {
    try {
      const { submissionId, status, feedback } = req.body;

      // Validate status
      if (!["approved", "rejected"].includes(status)) {
        return res.status(400).json({
          message: "Invalid status. Must be 'approved' or 'rejected'.",
        });
      }

      // Find the submission
      const submission = await DocumentSubmission.findById(submissionId);
      if (!submission) {
        return res
          .status(404)
          .json({ message: "Document submission not found" });
      }

      // Update the submission with review details
      submission.status = status;
      submission.feedback = feedback || "";
      submission.reviewedAt = Date.now();
      submission.reviewedBy = req.user._id; // Assuming HR/Admin

      await submission.save();
      return res.status(200).json({
        message: "Document reviewed successfully",
        submission,
      });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Server error", error: err.message });
    }
  }

  // HR/Admin fetches all pending submissions for review
  static async getAllPendingSubmissions(req, res) {
    try {
      const submissions = await DocumentSubmission.find({
        status: "pending",
      }).populate("submittedBy documentRequestId");

      return res.status(200).json(submissions);
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Server error", error: err.message });
    }
  }

  // HR/Admin fetches all submissions for a specific document request
  static async getSubmissionsForDocumentRequest(req, res) {
    try {
      const { documentRequestId } = req.params;

      const submissions = await DocumentSubmission.find({
        documentRequestId,
      }).populate("submittedBy");

      if (submissions.length === 0) {
        return res
          .status(404)
          .json({ message: "No submissions found for this request" });
      }

      return res.status(200).json(submissions);
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Server error", error: err.message });
    }
  }

  // Delete a document submission (HR/Admin only)
  static async deleteSubmission(req, res) {
    try {
      const { submissionId } = req.params;

      const deletedSubmission = await DocumentSubmission.findByIdAndDelete(
        submissionId
      );

      if (!deletedSubmission) {
        return res
          .status(404)
          .json({ message: "Document submission not found" });
      }

      return res
        .status(200)
        .json({ message: "Document submission deleted successfully" });
    } catch (err) {
      return res
        .status(500)
        .json({ message: "Server error", error: err.message });
    }
  }
}

module.exports = DocumentSubmissionController;
