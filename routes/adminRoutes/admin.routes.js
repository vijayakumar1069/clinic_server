import express from "express";
import { adminLogin } from "../../controllers/adminControllers/admin.controller.js";

const adminRouter = express.Router();

adminRouter.post("/admin-login", adminLogin);

export default adminRouter;