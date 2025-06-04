const errorHandler = (err, req, res, next) => {
  // 1. Default Values
  const statusCode = err.statusCode || 500;
  const statusText = err.message || "Internal Server Error";

  // Always return JSON
  res.setHeader("Content-Type", "application/json");
  console.log("middleare called errorhandler");
  res.status(statusCode).json({
    success: false,
    message: statusText,
  });
};

export default errorHandler;
