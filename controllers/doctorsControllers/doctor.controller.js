import doctorSchema from "../../schema/doctor.schema.js";

export async function getDoctorsForContactForm(req, res, next) {
  try {
    const doctors = await doctorSchema.find().select("name specialization");
    if (!doctors) {
      const error = new Error("Doctors not found");
      error.statusCode = 400;
      throw error;
    }
    res.status(200).json({
      success: true,
      message: "Doctors fetched successfully",
      data: doctors,
    });
  } catch (error) {
    next(error);
  }
}
