import express from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import { hasRole } from "../../middleware/hasRole.js";
import {
  addDoctor,
  deleteDoctor,
  getDoctors,
  updateDoctor,
} from "../../controllers/adminControllers/admin.doctor.controller.js";
const adminDoctorRouter = express.Router();

adminDoctorRouter.post("/add-doctor", verifyToken, hasRole("admin"), addDoctor);
adminDoctorRouter.get(
  "/get-doctors",
  verifyToken,
  hasRole("admin"),
  getDoctors
);
adminDoctorRouter.patch(
  "/update-doctor/:id",
  verifyToken,
  hasRole("admin"),
  updateDoctor
);
adminDoctorRouter.delete(
  "/delete-doctor/:id",
  verifyToken,
  hasRole("admin"),
  deleteDoctor
);

export default adminDoctorRouter;
