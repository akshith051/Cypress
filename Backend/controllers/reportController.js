const Report = require('../models/Report');
const path = require('path');

exports.submitReport = async (req, res) => {
  try {
    console.log("📥 Incoming Report:");
    console.log("Body:", req.body);
    console.log("File:", req.file);

    const { issueType, description, user, lat, lng, notify } = req.body;

    if (!issueType || !description || !user || !lat || !lng) {
      return res.status(400).json({
        message: 'Missing required fields. Please ensure issue type, location, and description are filled in.'
      });
    }

    if (lat.trim() === '' || lng.trim() === '') {
      return res.status(400).json({ message: 'Map location is required' });
    }

    const existing = await Report.findOne({ lat, lng, issueType });
    if (existing) {
      return res.json({ message: 'Duplicate report detected', duplicate: true });
    }

    const newReport = new Report({
      issueType,
      description,
      user,
      lat,
      lng,
      notify,
      mediaUrl: req.file ? '/uploads/' + req.file.filename : null
    });

    await newReport.save();
    res.status(201).json({ message: 'Report submitted successfully' });
  } catch (err) {
    console.error("❌ Error in submitReport:", err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// ✅ Placeholder safe functions to prevent crashes
exports.getReportsByUser = async (req, res) => {
  try {
    const reports = await Report.find({ user: req.params.username });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllReports = async (req, res) => {
  try {
    const reports = await Report.find();
    res.json(reports);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.editReport = (req, res) => {
  res.status(501).json({ message: 'Edit report not implemented yet' });
};

exports.deleteReport = (req, res) => {
  res.status(501).json({ message: 'Delete report not implemented yet' });
};
