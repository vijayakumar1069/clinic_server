import bcryptjs from "bcryptjs";
import doctorSchema from "../../schema/doctor.schema.js";

export async function addDoctor(req, res, next) {
  try {
    const { name, email, availableTimeSlot, specialization } = req.body;
    if (!name || !email || !availableTimeSlot || !specialization) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      throw error;
    }
    const password = bcryptjs.hashSync("doctor123", 10);
    const doctor = await doctorSchema.create({
      name,
      email,
      availableTimeSlot,
      specialization,
      password,
      adminId: req.user.id,
    });
    res.status(200).json({
      success: true,
      message: "Doctor added successfully",
      data: doctor,
    });
  } catch (error) {
    next(error);
  }
}
export async function getDoctors(req, res, next) {
  try {
    const {
      searchTerm = "",
      specialization = "all",
      timeSlot = "all",
    } = req.query;
  

    // Base query: only doctors for the logged-in admin
    const query = {
      adminId: req.user.id,
    };

    // Optional search by name or email
    if (searchTerm.trim() !== "") {
      query.$or = [
        { name: { $regex: searchTerm, $options: "i" } },
        { email: { $regex: searchTerm, $options: "i" } },
      ];
    }

    // Filter by specialization if not "all"
    if (specialization !== "all") {
      query.specialization = specialization;
    }

    // Filter by availableTimeSlot if not "all"
    if (timeSlot !== "all") {
      query.availableTimeSlot = timeSlot;
    }

    const doctors = await doctorSchema.find(query);

    res.status(200).json({
      success: true,
      message: "Doctors fetched successfully",
      data: doctors,
    });
  } catch (error) {
    next(error);
  }
}

export async function updateDoctor(req, res, next) {
  try {
    const { id } = req.params;
    const { name, email, availableTimeSlot, specialization } = req.body;
    if (!name || !email || !availableTimeSlot || !specialization) {
      const error = new Error("All fields are required");
      error.statusCode = 400;
      throw error;
    }
    const doctor = await doctorSchema.findOneAndUpdate(
      { _id: id },
      {
        name,
        email,
        availableTimeSlot,
        specialization,
        adminId: req.user.id,
      },
      { new: true }
    );
    if (!doctor) {
      const error = new Error("Doctor not found");
      error.statusCode = 400;
      throw error;
    }
    res.status(200).json({
      success: true,
      message: "Doctor updated successfully",
      data: doctor,
    });
  } catch (error) {
    next(error);
  }
}

export async function deleteDoctor(req, res, next) {
  try {
    const { id } = req.params;
  
    const doctor = await doctorSchema.findOneAndDelete({ _id: id });
    if (!doctor) {
      const error = new Error("Doctor not found");
      error.statusCode = 400;
      throw error;
    }
    res.status(200).json({
      success: true,
      message: "Doctor deleted successfully",
      data: doctor,
    });
  } catch (error) {
    next(error);
  }
}
