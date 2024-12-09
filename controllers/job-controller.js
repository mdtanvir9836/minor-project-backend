const Job = require("../models/job-model");
const upload = require("../middleware/fileUploads");

const BASE_URL = "http://localhost:8080/";
const upload_URL = `${BASE_URL}images/`;

class JobController {
   
  static handleFileUpload = (req, res, next) => {
    upload.single("companyLogo")(req, res, (err) => {
      if (err) {
        console.error("Error uploading file:", err);
        return res.status(400).json({ message: "Error uploading file" });
      }
      next();
    });
  };

   
  static postJob = async (req, res) => {
    try {
       
      JobController.handleFileUpload(req, res, async () => {
        const {
          title,
          companyName,
          salaryRange,
          jobType,
          description,
          responsibilities,
          skills,
          experienceLevel,
          contactEmail,
          websiteUrl,
        } = req.body;

        const city = req.body['location.city'];
        const country = req.body['location.country'];

        if (!city || !country) {
          return res.status(400).json({ message: "City and country are required." });
        }

        if (!companyName || !salaryRange || !jobType || !description || !experienceLevel || !contactEmail) {
          return res.status(400).json({ message: "Missing required fields" });
        }

        const newJob = new Job({
          title,
          companyName,
          companyLogo: req.file ? `${upload_URL}${req.file.filename}` : undefined,
          location: { city, country },
          salaryRange,
          jobType,
          description,
          responsibilities,
          skills,
          experienceLevel,
          contactEmail,
          websiteUrl,
        });

        try {
          const savedJob = await newJob.save();
          res.status(201).json({ message: "Job created successfully", job: savedJob });
        } catch (err) {
          console.error("Database Error:", err);
          res.status(500).json({ message: "Error saving job", error: err.message });
        }
      });
    } catch (err) {
      console.error("Error creating job:", err);
      res.status(500).json({ message: "Error creating job", error: err.message });
    }
  };

   
  static viewJobs = async (req, res) => {
    try {
      const jobs = await Job.find();  
      res.status(200).json(jobs);  
    } catch (err) {
      console.error("Error fetching jobs:", err);
      res.status(500).json({ message: "Error fetching jobs", error: err.message });
    }
  };

  // Update a job by ID
  static updateJob = async (req, res) => {
    const jobId = req.params.id;  

    try {
       
      JobController.handleFileUpload(req, res, async () => {
        const updateData = req.body;

        if (req.file) {
          updateData.companyLogo = `${upload_URL}${req.file.filename}`;  
        }

        const updatedJob = await Job.findByIdAndUpdate(jobId, updateData, { new: true });  
        if (!updatedJob) {
          return res.status(404).json({ message: "Job not found" });
        }

        res.status(200).json({ message: "Job updated successfully", job: updatedJob });
      });
    } catch (err) {
      console.error("Error updating job:", err);
      res.status(500).json({ message: "Error updating job", error: err.message });
    }
  };

  
  static deleteJob = async (req, res) => {
    const jobId = req.params.id;  
    try {
      const deletedJob = await Job.findByIdAndDelete(jobId);  
      if (!deletedJob) {
        return res.status(404).json({ message: "Job not found" });
      }

      res.status(200).json({ message: "Job deleted successfully", job: deletedJob });
    } catch (err) {
      console.error("Error deleting job:", err);
      res.status(500).json({ message: "Error deleting job", error: err.message });
    }
  };
}

module.exports = JobController;
