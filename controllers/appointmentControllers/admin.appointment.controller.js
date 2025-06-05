import contactFormSchema from "../../schema/contactForm.schema.js";

export async function getAllAppointments(req, res, next) {
  try {
    const { doctorId, date, timeSlot } = req.query;

    // Build dynamic filter based on available query params
    const filter = {};

    if (doctorId) {
      filter.doctor = doctorId;
    }

    if (date) {
      // Handle date filtering - convert to proper date range
      const selectedDate = new Date(date);
      const nextDay = new Date(selectedDate);
      nextDay.setDate(nextDay.getDate() + 1);

      filter.date = {
        $gte: selectedDate,
        $lt: nextDay,
      };
    }

    // Fix: Use 'timing' instead of 'timeSlot' to match your schema
    if (timeSlot) {
      filter.timing = timeSlot;
    }

    console.log("Filter being applied:", filter);
    const appointments = await contactFormSchema
      .find(filter)
      .populate({
        path: "doctor",
        select: "name specialization _id", 
      })
      .sort({ createdAt: -1 });

    console.log("Appointments found:", appointments.length);

    if (!appointments || appointments.length === 0) {
      return res.status(200).json({
        success: true,
        message: "No appointments found with the given criteria",
        data: [],
      });
    }

    res.status(200).json({
      success: true,
      message: "Appointments fetched successfully",
      data: appointments,
      count: appointments.length,
    });
  } catch (error) {
    console.error("Error in getAllAppointments:", error);
    next(error);
  }
}
