import Assignment from "../models/Assignment.js";
import Submission from "../models/Submission.js";
export const createAssignment = async (req, res) => {
  try {
    const assignment = new Assignment({ ...req.body, createdBy: req.user.id });
    await assignment.save();
    res.json(assignment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const updateAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    if (assignment.status !== "draft") return res.status(400).json({ message: "Only draft can be edited" });

    Object.assign(assignment, req.body);
    await assignment.save();
    res.json(assignment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const publishAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    assignment.status = "published";
    await assignment.save();
    res.json(assignment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const completeAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findById(req.params.id);
    assignment.status = "completed";
    await assignment.save();
    res.json(assignment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const teacherAssignments = async (req, res) => {
  const assignments = await Assignment.find({ createdBy: req.user.id });
  res.json(assignments);
};

export const studentAssignments = async (req, res) => {
  const assignments = await Assignment.find({ status: "published" });
  res.json(assignments);
};

export const viewSubmissions = async (req, res) => {
  const submissions = await Submission.find({ assignment: req.params.id }).populate("student", "name email");
  res.json(submissions);
};

export const deleteAssignment = async (req, res) => {
  try {
    const delAssi = await Assignment.findById(req.params.id);
    if (!delAssi) return res.status(404).json({ message: "Assignment not found" });

    if (delAssi.status !== "draft") {
      return res.status(400).json({ message: "Only draft assignments can be deleted" });
    }
    await delAssi.deleteOne();
    res.json({ message: "Assignment deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
