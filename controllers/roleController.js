const Role = require("../models/role"); // Assuming this is the correct path for your Role model

class roleController{

  static createRole = async (req, res) => {
    try {
      const { name } = req.body;
      const role = new Role({ name });
      await role.save();
      res.status(201).json(role);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  
  static getAllRoles = async (req, res) => {
    try {
      const roles = await Role.find();
      res.status(200).json(roles);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  
  static getRoleById = async (req, res) => {
    try {
      const role = await Role.findById(req.params.id);
      if (!role) {
        return res.status(404).json({ message: "Role not found" });
      }
      res.status(200).json(role);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  
  static updateRole = async (req, res) => {
    try {
      const { name } = req.body;
      const role = await Role.findByIdAndUpdate(
        req.params.id,
        { name },
        { new: true }
      );
      if (!role) {
        return res.status(404).json({ message: "Role not found" });
      }
      res.status(200).json(role);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  
  static deleteRole = async (req, res) => {
    try {
      const role = await Role.findByIdAndDelete(req.params.id);
      if (!role) {
        return res.status(404).json({ message: "Role not found" });
      }
      res.status(200).json({ message: "Role deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
}

module.exports= roleController;
