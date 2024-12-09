// routes/roleRoutes.js
const express = require("express");
const router = express.Router();
const roleController = require("../controllers/roleController");

router.post("/add", roleController.createRole);
router.get("/viewall", roleController.getAllRoles);
router.get("/viewbyid/:id", roleController.getRoleById);
router.put("/update/:id", roleController.updateRole);
router.delete("/delte/:id", roleController.deleteRole);

module.exports = router;
