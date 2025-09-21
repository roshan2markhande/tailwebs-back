import mongoose from "mongoose";

const submissionSchema = new mongoose.Schema({
  assignment: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Assignment"
 },
  student: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User" 
},
  answer: String,
  submittedAt: { 
    type: Date, 
    default: Date.now
 },
  reviewed: {
     type: Boolean, 
     default: false
     }
});

export default mongoose.model("Submission", submissionSchema);
