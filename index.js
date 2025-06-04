import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { corsOptions } from "./utils/corsOptions.js";
import { connectToDB } from "./utils/connectToDB.js";
import adminRouter from "./routes/adminRoutes/admin.routes.js";
import adminDoctorRouter from "./routes/adminRoutes/admin.doctor.js";

dotenv.config();

const port = process.env.PORT || 5000;
const app = express();
connectToDB();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors(corsOptions));
app.options("*", cors(corsOptions));
app.use("/api/admin-auth", adminRouter);
app.use("/api/admin-doctor", adminDoctorRouter);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
