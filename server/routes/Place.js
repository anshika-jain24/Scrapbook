import express from "express";
import { getPlaces } from '../controllers/Place.js';

const router = express.Router();

router.get('/', getPlaces);
