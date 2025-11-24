
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { Exam, Video, Note, Quiz, Notification } = require('./models');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- API ROUTES ---

// 1. Get All Exams
app.get('/api/exams', async (req, res) => {
  try {
    const exams = await Exam.find({ active: true });
    res.json(exams);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 2. Get Videos (Optional filter by category)
app.get('/api/videos', async (req, res) => {
  try {
    const filter = req.query.category ? { category: req.query.category } : {};
    const videos = await Video.find(filter).sort({ createdAt: -1 });
    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 3. Get Notes (Filter by exam category)
app.get('/api/notes', async (req, res) => {
  try {
    const filter = req.query.categoryId ? { categoryId: req.query.categoryId } : {};
    const notes = await Note.find(filter).sort({ date: -1 });
    res.json(notes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 4. Get Quiz for specific Exam
app.get('/api/quiz/:examId', async (req, res) => {
  try {
    // Determine the ID (mock logic for prototype compatibility or real DB ID)
    const questions = await Quiz.find({ examId: req.params.examId });
    res.json(questions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 5. Get Notifications
app.get('/api/notifications', async (req, res) => {
  try {
    const notifications = await Notification.find({ active: true }).sort({ priority: -1 });
    res.json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
