import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.js";
import placeRoutes from "./routes/place.js";
import placeToVisitRoutes from "./routes/placesToVisit.js";

const app = express();

app.use(bodyParser.json({ limit: "30mb", extented: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/places", placeRoutes);
app.use("/api/placesToVisit", placeToVisitRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
