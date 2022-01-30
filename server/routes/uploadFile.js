import express from "express";
import auth from "../middleware/auth.js";
import { updateProfilePicture } from "../controllers/UploadRM.js";
// import {uploadFile} from '../controllers/UploadFiles.js';

const router = express.Router();

router.post("/", auth, updateProfilePicture);

export default router;