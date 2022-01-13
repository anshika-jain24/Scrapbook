import express from "express";
import { getPlaces, addPlaces } from "../controllers/Place.js";

const router = express.Router();

router.get("/", getPlaces);
router.post("/", addPlaces);

export default router;
