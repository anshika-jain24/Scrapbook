import express from "express";
import { getToVisit, addToVisit, removeToVisit } from "../controllers/placeToVisit.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getToVisit);
router.post("/", auth, addToVisit);
router.patch("/", auth, removeToVisit);

export default router;
