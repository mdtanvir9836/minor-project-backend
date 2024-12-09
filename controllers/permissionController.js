// controllers/permissionController.js
const Permission = require("../models/permission");

exports.createPermission = async (req, res) => {
  try {
    const { name } = req.body;
    const permission = new Permission({ name });
    await permission.save();
    res.status(201).json(permission);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getAllPermissions = async (req, res) => {
  try {
    const permissions = await Permission.find();
    res.status(200).json(permissions);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.getPermissionById = async (req, res) => {
  try {
    const permission = await Permission.findById(req.params.id);
    if (!permission) {
      return res.status(404).json({ message: "Permission not found" });
    }
    res.status(200).json(permission);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.updatePermission = async (req, res) => {
  try {
    const { name } = req.body;
    const permission = await Permission.findByIdAndUpdate(
      req.params.id,
      { name },
      { new: true }
    );
    if (!permission) {
      return res.status(404).json({ message: "Permission not found" });
    }
    res.status(200).json(permission);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.deletePermission = async (req, res) => {
  try {
    const permission = await Permission.findByIdAndDelete(req.params.id);
    if (!permission) {
      return res.status(404).json({ message: "Permission not found" });
    }
    res.status(200).json({ message: "Permission deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
