const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');

// Import controller functions
const {
  submitReport,
  getReportsByUser,
  getAllReports,
  editReport,
  deleteReport
} = require('../controllers/reportController');

// Multer configuration for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// Routes
router.post('/', upload.single('media'), submitReport);

// 🔐 Optional routes — comment out if any function is missing
router.get('/user/:username', getReportsByUser);
router.get('/all', getAllReports);
router.put('/:id', editReport);
router.delete('/:id', deleteReport);

module.exports = router;
