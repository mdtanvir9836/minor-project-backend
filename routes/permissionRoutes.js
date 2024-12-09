// routes/permissionRoutes.js
const express = require("express");
const router = express.Router();
const PC = require("../controllers/permissionController");

router.post("/add", PC.createPermission);
router.get("/viewall",PC.getAllPermissions);
router.get("/viewbyid/:id",PC.getPermissionById);
router.put("/update/:id",PC.updatePermission);
router.delete("/delete/:id",PC.deletePermission);

module.exports = router;
