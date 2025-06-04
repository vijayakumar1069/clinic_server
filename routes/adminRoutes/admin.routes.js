import express from "express";
import {
  adminLogin,
  adminLogout,
} from "../../controllers/adminControllers/admin.controller.js";
import { verifyToken } from "../../middleware/verifyToken.js";
import { hasRole } from "../../middleware/hasRole.js";

const adminRouter = express.Router();

adminRouter.post("/admin-login", adminLogin);
adminRouter.post("/admin-logout", verifyToken, hasRole("admin"), adminLogout);

export default adminRouter;
