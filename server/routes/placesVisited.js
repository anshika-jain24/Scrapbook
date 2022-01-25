import express from "express";
import { getVisited, addVisited } from "../controllers/placeVisited.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getVisited);
router.post("/", auth, addVisited);

export default router;