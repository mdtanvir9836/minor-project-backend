// middleware/checkRole.js

module.exports = function (allowedRoles) {
  return (req, res, next) => {
    try {
      // Assuming req.user is set by the authentication middleware (e.g., JWT)
      const userRole = req.user.role; // User's role
      console.log(userRole);

      // Check if user's role is in the allowed roles array
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({
          message: "Access forbidden: You don't have the required role.",
        });
      }

      // If the user has the right role, proceed to the next middleware or controller
      next();
    } catch (err) {
      return res.status(500).json({
        message: "Server error while checking role",
        error: err.message,
      });
    }
  };
};
