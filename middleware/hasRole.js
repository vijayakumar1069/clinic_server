export const hasRole = (role) => (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized - User not authenticated",
      code: "UNAUTHENTICATED",
    });
  }

  if (role !== req.user.role) {
    return res.status(403).json({
      success: false,
      message: "Forbidden - Insufficient permissions",
      code: "INSUFFICIENT_PERMISSIONS",
    });
  }

  next();
};
