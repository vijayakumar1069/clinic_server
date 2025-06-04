import adminSchema from "../../schema/admin.schema.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export async function adminLogin(req, res, next) {
  try {
    const { email, password } = req.body;
    console.log(email, password);
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
      { expiresIn: "12h" }
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
