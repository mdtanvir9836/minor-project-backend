 
const RolePermission = require("../models/rolePermission");
const Role = require("../models/role");
const Permission = require("../models/permission");

 
class rolePermissionController 
{
   static assignPermissionToRole = async (req, res) => {
    try {
      const { roleId, permissionId } = req.body;
  
      const role = await Role.findById(roleId);
      const permission = await Permission.findById(permissionId);
  
      if (!role || !permission) {
        return res.status(404).json({ message: "Role or Permission not found" });
      }
  
      const rolePermission = new RolePermission({ roleId, permissionId });
      await rolePermission.save();
  
      res.status(201).json(rolePermission);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  
  static getAllRolePermissions = async (req, res) => {
    try {
      const rolePermissions = await RolePermission.find()
        .populate("roleId")
        .populate("permissionId");
      res.status(200).json(rolePermissions);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  
  static getRolePermissionsByRoleId = async (req, res) => {
    try {
      const rolePermissions = await RolePermission.find({
        roleId: req.params.roleId,
      }).populate("permissionId");
      res.status(200).json(rolePermissions);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  
  static removePermissionFromRole = async (req, res) => {
    try {
      const rolePermission = await RolePermission.findByIdAndDelete(
        req.params.id
      );
      if (!rolePermission) {
        return res.status(404).json({ message: "Role permission not found" });
      }
      res.status(200).json({ message: "Role permission removed successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  

}

module.exports= rolePermissionController;

