import express from "express";
import {
  getRandomCountry,
  getSingleName,
} from "../controllers/country.controllers.js";

const router = express.Router();

router.get("/random", getRandomCountry);
router.post("/get/:name", getSingleName);

export default router;
