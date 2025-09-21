import express from "express";
import auth from "../middleware/authMiddleware.js";
import {
  createAssignment,  updateAssignment,
  publishAssignment,  completeAssignment,
  teacherAssignments,
  studentAssignments,
  viewSubmissions,deleteAssignment
} from "../controllers/assignmentController.js";

const router = express.Router();

router.post("/", auth("teacher"), createAssignment);
router.put("/:id", auth("teacher"), updateAssignment);
router.delete("/:id", auth("teacher"), deleteAssignment);

router.put("/:id/publish", auth("teacher"), publishAssignment);
router.put("/:id/complete", auth("teacher"), completeAssignment);

router.get("/teacher", auth("teacher"), teacherAssignments);
router.get("/student", auth("student"), studentAssignments);
router.get("/:id/submissions", auth("teacher"), viewSubmissions);

export default router;
