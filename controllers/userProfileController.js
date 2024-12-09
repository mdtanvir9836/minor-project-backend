const UserProfile = require("../models/userProfile"); // Import the UserProfile model
const User = require("../models/user-model"); // Import the User model

class UserProfileController {
  // Create a new user profile
  static createUserProfile = async (req, res) => {
    try {
      const { userId, firstName, lastName, dob, contactNumber } = req.body;

      // Validate required fields
      if (!userId || !firstName || !lastName || !dob || !contactNumber) {
        return res.status(400).json({ error: "All fields are required" });
      }

      // Check if user exists
      const userExists = await User.findById(userId);
      if (!userExists) {
        return res.status(404).json({ error: "User not found" });
      }

      // Create and save the user profile
      const userProfile = new UserProfile({
        userId,
        firstName,
        lastName,
        dob,
        contactNumber,
      });
      const savedProfile = await userProfile.save();

      res
        .status(201)
        .json({
          message: "User profile created successfully",
          profile: savedProfile,
        });
    } catch (error) {
      res.status(500).json({ error: "Server error", details: error.message });
    }
  };

  // Get user profile by ID
  static getUserProfileById = async (req, res) => {
    const { id } = req.params;
    try {
      const profile = await UserProfile.findById(id);
      if (!profile) {
        return res.status(404).json({ error: "User profile not found" });
      }
      res.status(200).json(profile);
    } catch (error) {
      res.status(500).json({ error: "Server error", details: error.message });
    }
  };

  // Update user profile by ID
  static updateUserProfile = async (req, res) => {
    const { id } = req.params;
    try {
      const updatedProfile = await UserProfile.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      if (!updatedProfile) {
        return res.status(404).json({ error: "User profile not found" });
      }
      res
        .status(200)
        .json({
          message: "User profile updated successfully",
          profile: updatedProfile,
        });
    } catch (error) {
      res.status(500).json({ error: "Server error", details: error.message });
    }
  };

  // Delete user profile by ID
  static deleteUserProfile = async (req, res) => {
    const { id } = req.params;
    try {
      const deletedProfile = await UserProfile.findByIdAndDelete(id);
      if (!deletedProfile) {
        return res.status(404).json({ error: "User profile not found" });
      }
      res.status(200).json({ message: "User profile deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Server error", details: error.message });
    }
  };
}

module.exports = UserProfileController;
