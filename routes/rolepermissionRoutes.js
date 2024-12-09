// routes/rolePermissionRoutes.js
const express = require("express");
const router = express.Router();
const rolePermissionController = require("../controllers/rolepermissionController");

router.post("/addrole", rolePermissionController.assignPermissionToRole);
router.get("/viewrole", rolePermissionController.getRolePermissionsByRoleId);

//router.delete("/:id", rolePermissionController.removePermissionFromRole);

module.exports = router;
