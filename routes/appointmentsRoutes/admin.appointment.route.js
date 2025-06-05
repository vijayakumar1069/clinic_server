import express from "express";
import { verifyToken } from "../../middleware/verifyToken.js";
import { hasRole } from "../../middleware/hasRole.js";
import { getAllAppointments } from "../../controllers/appointmentControllers/admin.appointment.controller.js";
const adminAppointmentRouter = express.Router();
adminAppointmentRouter.get(
  "/get-appointments",
  verifyToken,
  hasRole("admin"),
  getAllAppointments
);

export default adminAppointmentRouter;
