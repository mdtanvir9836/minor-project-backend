const express = require('express');
const { signUp, addOrganization, viewOrganization, getOrganizationByUserId }=require('../controllers/authController');
// const authMiddleware = require('../middleware/authJwt');
const router = express.Router();

router.post('/add',signUp);
router.post('/addOrganization',addOrganization);
router.get('/addOrganization/view/:id',viewOrganization); //get organization by organization id
router.get('/addOrganization/get/:id',getOrganizationByUserId);//get organization by userId
// router.post('/addOrganization',authMiddleware("create"),addOrganization);

module.exports=router;