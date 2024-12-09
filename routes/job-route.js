const express = require('express');
const router = express.Router();
const JobController = require('../controllers/job-controller');  
const authMiddleware = require('../middleware/authJwt');
 
router.post('/job/post', authMiddleware("create"), JobController.postJob);

 
router.get('/job/list', authMiddleware("viewall"), JobController.viewJobs);
 
router.put('/job/update/:id', authMiddleware("update"), JobController.updateJob);

 
router.delete('/job/delete/:id', authMiddleware("delete"), JobController.deleteJob);

module.exports = router;
