import adminSchema from "../../schema/admin.schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import blacklistedToken from "../../schema/blacklistedToken.js";
export async function adminLogin(req, res, next) {
  try {
    const { email, password } = req.body;
   
    if (!email || !password) {
      const error = new Error("Email and password are required");
      error.statusCode = 400;
      throw error;
    }
    const currentAdmin = await adminSchema.findOne({ email });
    if (!currentAdmin) {
      const error = new Error("Admin does not exist");
      error.statusCode = 400;
      throw error;
    }
    const checkPasswordMatches = await bcrypt.compare(
      password,
      currentAdmin.password
    );
    if (!checkPasswordMatches) {
      const error = new Error("Incorrect password");
      error.statusCode = 400;
      throw error;
    }

    const { password: pass, ...rest } = currentAdmin._doc;
    const token = jwt.sign(
      {
        id: currentAdmin._id,
        role: currentAdmin.role,
        email: currentAdmin.email,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );
    res.status(200).json({
      success: true,
      message: "Logged in successfully",
      data: rest,
      token,
    });
  } catch (error) {
    next(error);
  }
}

export async function adminLogout(req, res, next) {
  try {
    // Get token from middleware (req.token) and user info (req.user)
    const token = req.token;
    const userId = req.user.id;
   

    if (!token) {
      const error = new Error("Token not found");
      error.statusCode = 400;
      throw error;
    }
    if (!userId) {
      const error = new Error("User ID not found");
      error.statusCode = 400;
      throw error;
    }

    // Decode token to get expiration time
    const decoded = jwt.decode(token);
    const expiresAt = new Date(decoded.exp * 1000);

    // Add token to blacklist
    await blacklistedToken.create({
      token,
      userId,
      expiresAt,
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    // Even if blacklisting fails, we should not block logout
    console.error("Error blacklisting token:", error);
    next(error);
  }
}
