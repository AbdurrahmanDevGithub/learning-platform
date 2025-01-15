const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      // Ensure the user exists and has a role
      if (!req.user || !req.user.role) {
        return res.status(401).json({ message: "Unauthorized access" });
      }

      // Check if the user's role is allowed
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: "Access denied" });
      }

      next(); // Proceed if the role is authorized
    } catch (err) {
      console.error("Error in authorizeRoles middleware:", err);
      res.status(500).json({ message: "Server error" });
    }
  };
};

module.exports = { authorizeRoles };
