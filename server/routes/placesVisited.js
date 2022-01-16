import express from "express";
import { getVisited } from "../controllers/placeVisited.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getVisited);


export default router;