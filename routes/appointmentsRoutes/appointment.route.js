import express from "express"
import { bookAnAppointment } from "../../controllers/appointmentControllers/appointment.controller.js"
const AppointmentRouter = express.Router()
AppointmentRouter.post("/book-an-appointmet",bookAnAppointment)

export default AppointmentRouter