import mongoose from "mongoose";

const reportSchema = new mongoose.Schema(
  {
    patientName: String,
    patientId: String,
    testName: String,
    testResult: String,
  },
  { timestamps: true }
);

export default mongoose.models.Report || mongoose.model("Report", reportSchema);
