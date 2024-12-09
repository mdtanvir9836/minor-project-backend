const mongoose = require('mongoose');

// Define Job Schema
const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    
  },
  companyName: {
    type: String,
    required: true,
    trim: true,
  },
  companyLogo: {
    type: String, // This will store the URL/path of the logo
     
  },
  location: {
    city:{
      type: String,
     
    },
    country: {
      type: String,
       
    }
  },
  salaryRange: {
    type: String,
    required: true,
    trim: true,
  },
  jobType: {
    type: String,
    enum: ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship'],
    
  },
  description: {
    type: String,
   
  },
  // responsibilities:[{
  //   type: String, // List of responsibilities
   
  // }],
  // skills: [{
  //   type: String, // List of job requirements
    
  // }],
  experienceLevel: {
    type: String,
    enum: ['0-1yr', '1-3yr', '3-5yr', '5-8yr', '8above'],
   
  },
  postedDate: {
    type: Date,
    default: Date.now,
  },
  // closingDate: {
  //   type: Date,
  // },
  contactEmail: {
    type: String,
    required: true,
    trim: true,
  },
  websiteUrl: {
    type: String,
  },
});

module.exports = mongoose.model('Job', jobSchema);
