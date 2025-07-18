"use client";
import React, { useEffect, useState } from "react";
import jsPDF from "jspdf";

const Reports = () => {
  const [patientName, setPatientName] = useState("");
  const [patientId, setPatientId] = useState("");
  const [testName, setTestName] = useState("");
  const [testResult, setTestResult] = useState("");
  const [reports, setReports] = useState([]);
  const [selectedReport, setSelectedReport] = useState(null);

  const fetchReports = async () => {
    const res = await fetch("/api/reports");
    const data = await res.json();
    setReports(data);
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const submitHandle = async (e) => {
    e.preventDefault();

    const res = await fetch("/api/reports", {
      method: "POST",
      body: JSON.stringify({ patientName, patientId, testName, testResult }),
    });

    const newReport = await res.json();
    setReports([newReport, ...reports]);

    setPatientName("");
    setPatientId("");
    setTestName("");
    setTestResult("");
  };

  const downloadPDF = async (report) => {
    const doc = new jsPDF();

    // 1. Load logo (70x30) and draw on left
    const logo = await getBase64FromUrl("/logo.png"); // Must be PNG
    doc.addImage(logo, "PNG", 15, 10, 60, 20); // x=15, y=10, width=70, height=30

    // 2. Right-side header text
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.text("Healix Hospital", 150, 20, { align: "right" }); // right-aligned

    doc.setFontSize(14);
    doc.setFont("helvetica", "normal");
    doc.text("Lab Test Report", 150, 30, { align: "right" });

    // 3. Horizontal line under header
    doc.setLineWidth(0.5);
    doc.line(15, 45, 195, 45);

    // 4. Report Body
    let y = 60;
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text("Patient Information", 15, y);
    doc.setFont("helvetica", "normal");

    y += 10;
    doc.text(`Patient Name: ${report.patientName}`, 15, y);
    y += 8;
    doc.text(`Patient ID: ${report.patientId}`, 15, y);
    y += 8;
    doc.text(`Test Name: ${report.testName}`, 15, y);

    y += 15;
    doc.setFont("helvetica", "bold");
    doc.text("Test Result", 15, y);
    y += 8;
    doc.setFont("helvetica", "normal");

    const splitResult = doc.splitTextToSize(report.testResult, 170);
    doc.text(splitResult, 15, y);

    // Save
    doc.save(`report-${report.patientId}.pdf`);
  };

  // 🔁 Helper: convert image to base64
  const getBase64FromUrl = async (url) => {
    const res = await fetch(url);
    const blob = await res.blob();

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };

  return (
   <>
  <form
    onSubmit={submitHandle}
    className=" shadow-md p-6 rounded-lg max-w-xl mx-auto space-y-4"
  >
    <h2 className="text-2xl font-bold text-center">
      Submit Lab Report
    </h2>

    <input
      value={patientName}
      onChange={(e) => setPatientName(e.target.value)}
      placeholder="Patient Name"
      className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    />

    <input
      value={patientId}
      onChange={(e) => setPatientId(e.target.value)}
      placeholder="Patient ID"
      className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    />

    <input
      value={testName}
      onChange={(e) => setTestName(e.target.value)}
      placeholder="Test Name"
      className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
    />

    <textarea
      value={testResult}
      onChange={(e) => setTestResult(e.target.value)}
      placeholder="Test Result"
      className="w-full border border-gray-300 p-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      rows={4}
    />

    <button
      type="submit"
      className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded hover:bg-blue-700 transition"
    >
      Submit
    </button>
  </form>

  <hr className="my-10 border-gray-300" />

  <div className="max-w-6xl text-center mx-auto mb-10">
    <h2 className="text-2xl font-semibold mb-6">
      Lab Test Reports
    </h2>

    <div className="grid grid-cols-1 p-10 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {reports.map((report) => (
        <div
          key={report._id}
          className="border p-4 rounded-lg shadow-sm hover:shadow-md transition cursor-pointer"
          onClick={() => setSelectedReport(report)}
        >
          <h3 className="text-lg font-semibold text-blue-700">
            {report.testName}
          </h3>
          <p className="">Patient: {report.patientName}</p>
          <p className="">Patient: {report.patientId}</p>
        </div>
      ))}
    </div>
  </div>

  {selectedReport && (
    <div className="max-w-2xl mx-auto mb-10 mt-10 text-black bg-white border border-gray-300 p-6 rounded-lg shadow">
      <h3 className="text-xl font-bold  mb-4">Report Details</h3>

      <p className="mb-2">
        <strong>Patient ID:</strong> {selectedReport.patientId}
      </p>
      <p className="mb-2">
        <strong>Patient Name:</strong> {selectedReport.patientName}
      </p>
      <p className="mb-2">
        <strong>Test Name:</strong> {selectedReport.testName}
      </p>
      <p className="mb-4 whitespace-pre-line">
        <strong>Test Result:</strong> {selectedReport.testResult}
      </p>

      <button
        onClick={() => downloadPDF(selectedReport)}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Download PDF
      </button>
    </div>
  )}
</>

  );
};

export default Reports;
