import mongoose from "mongoose";

const DoctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },

    specialization: {
      type: String,
      required: true,
    },
    availableTimeSlot: {
      type: String,
      enum: ["morning", "afternoon", "evening", "night"],
      required: true,
    },
    adminId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Doctor", DoctorSchema);
