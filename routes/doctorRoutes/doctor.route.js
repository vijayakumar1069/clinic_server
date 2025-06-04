import express from "express";
import { getDoctorsForContactForm } from "../../controllers/doctorsControllers/doctor.controller.js";

const doctorRouter = express.Router();

doctorRouter.get("/all-doctors",getDoctorsForContactForm)

export default doctorRouter;