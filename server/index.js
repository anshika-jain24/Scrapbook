import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.js";
import placeRoutes from "./routes/place.js";
import placeToVisitRoutes from "./routes/placesToVisit.js";
import placesVisitedRoutes from "./routes/placesVisited.js";
import uploadRoutes from "./routes/uploadFile.js";
// import multer from "multer";
// var upload = multer();

const app = express();

app.use(bodyParser.json({ extented: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
// app.use(upload.array());
// app.use(express.static("public"));
connectDB();

app.get('/', (req, res) => {
    res.send("Hello to Scrapbook API");
});



app.use("/api/auth", authRoutes);
app.use("/api/places", placeRoutes);
app.use("/api/placesToVisit", placeToVisitRoutes);
app.use("/api/placesVisited", placesVisitedRoutes);
app.use("/api/upload", uploadRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));
