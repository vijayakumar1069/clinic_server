import contactFormSchema from "../../schema/contactForm.schema.js";

export async function bookAnAppointment(req, res, next) {
  try {
    const { name, email, mobile, timing, doctor, date } = req.body;
    console.log(name, email, mobile, timing, doctor, date);
    if (!name || !email || !mobile || !timing || !doctor || !date) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      throw error;
    }

    const appointment = await contactFormSchema.create({
      name,
      email,
      mobile,
      timing,
      doctor,
      date,
    });
    if (!appointment) {
      const error = new Error("Appointment not found");
      error.statusCode = 400;
      throw error;
    }
    res.status(200).json({
      success: true,
      message: "Appointment booked successfully",
    });
  } catch (error) {
    next(error);
  }
}
