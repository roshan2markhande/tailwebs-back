import express from "express";
import auth from "../middleware/authMiddleware.js";
import { submitAnswer, reviewSubmission, mySubmissions } from "../controllers/submissionController.js";

const router = express.Router();

router.post("/:id/submit", auth("student"), submitAnswer);
router.put("/:id/review", auth("teacher"), reviewSubmission);
router.get("/my", auth("student"), mySubmissions);
export default router;
