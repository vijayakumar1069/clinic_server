import mongoose from "mongoose";
import moment from "moment-timezone";
const contactFormSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    timing: {
      type: String,
      required: true,
      enum: ["morning", "afternoon", "evening", "night"],
    },
    doctor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    date: {
      type: Date,
      default: moment.tz("Asia/Kolkata").format(),
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("contactForm", contactFormSchema);
