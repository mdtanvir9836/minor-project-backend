const express = require('express');
const router = express.Router();
const pageElementController = require('../controllers/pageElementController');

 
router.post('/pageelements/add', pageElementController.createPageElement);   
router.get('/pageelements/viewall', pageElementController.getAllPageElements);   
router.get('/pageelements/view/:id', pageElementController.getPageElementById);  
router.put('/pageelements/update/:id', pageElementController.updatePageElement);   
router.delete('/pageelements/delete/:id', pageElementController.deletePageElement);   

module.exports = router;
