import jwt from "jsonwebtoken";
import blacklistedToken from "../schema/blacklistedToken.js";

export const verifyToken = async (req, res, next) => {
  try {
    // 1. Check if Authorization header exists
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "Authorization header missing",
        code: "AUTH_HEADER_MISSING",
      });
    }

    // 2. Verify header format (Bearer token)
    const parts = authHeader.split(" ");
    if (parts.length !== 2 || parts[0] !== "Bearer") {
      return res.status(401).json({
        success: false,
        message: "Authorization header format should be: Bearer <token>",
        code: "INVALID_AUTH_FORMAT",
      });
    }

    // 3. Get and verify token
    const token = parts[1];
    if (!token || token.trim() === "") {
      return res.status(401).json({
        success: false,
        message: "Token not provided",
        code: "TOKEN_MISSING",
      });
    }
    const blacklistedToken = await blacklistedToken.findOne({ token });
    if (blacklistedToken) {
      return res.status(401).json({
        success: false,
        message: "Token has been invalidated. Please login again.",
        code: "TOKEN_BLACKLISTED",
      });
    }

    // 4. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = decoded;
    req.token = token; // Store original token for logout

    next();
  } catch (error) {
    // Handle specific JWT errors
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({
        success: false,
        message: "Invalid token format",
        code: "INVALID_TOKEN",
      });
    }
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({
        success: false,
        message: "Token expired",
        code: "TOKEN_EXPIRED",
      });
    }
    // Other errors
    next(error);
  }
};
