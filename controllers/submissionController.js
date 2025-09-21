import Submission from "../models/Submission.js";

export const submitAnswer = async (req, res) => {
  try {
    const existing = await Submission.findOne({ assignment: req.params.id, student: req.user.id });
    if (existing) return res.status(400).json({ message: "Already submitted" });

    const submission = new Submission({ assignment: req.params.id, student: req.user.id, answer: req.body.answer });
    await submission.save();
    res.json(submission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const reviewSubmission = async (req, res) => {
  try {
    const submission = await Submission.findById(req.params.id);
    submission.reviewed = true;
    await submission.save();
    res.json(submission);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
export const mySubmissions = async (req, res) => {
  try {
    const submissions = await Submission.find({ student: req.user.id })
      .populate("assignment", "title description dueDate status");

    const data = submissions.map(s => ({
      _id: s._id,
      assignmentId: s.assignment._id,
      title: s.assignment.title,
      description: s.assignment.description,
      dueDate: s.assignment.dueDate,
      status: s.assignment.status,
      answer: s.answer,
      submittedAt: s.submittedAt,
    }));

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};