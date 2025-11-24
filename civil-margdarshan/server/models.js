
const mongoose = require('mongoose');

// Exam Category Schema
const examSchema = new mongoose.Schema({
  title: { type: String, required: true },
  icon: { type: String, required: true }, // FontAwesome class
  description: { type: String, required: true },
  active: { type: Boolean, default: true }
});

// Video Resource Schema
const videoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  category: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
  videoUrl: { type: String, required: true }, // YouTube URL or ID
  duration: String,
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now }
});

// Note/Download Schema
const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date: { type: String }, // Or Date type if you want to format on client
  size: { type: String, required: true },
  categoryId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam', required: true },
  downloadUrl: { type: String, required: true }
});

// Quiz Schema
const quizSchema = new mongoose.Schema({
  examId: { type: mongoose.Schema.Types.ObjectId, ref: 'Exam' },
  question: { type: String, required: true },
  options: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true }
});

// Notification/Ticker Schema
const notificationSchema = new mongoose.Schema({
  text: { type: String, required: true },
  isHighlight: { type: Boolean, default: false }, // For bold/underline styling
  active: { type: Boolean, default: true },
  priority: { type: Number, default: 0 }
});

module.exports = {
  Exam: mongoose.model('Exam', examSchema),
  Video: mongoose.model('Video', videoSchema),
  Note: mongoose.model('Note', noteSchema),
  Quiz: mongoose.model('Quiz', quizSchema),
  Notification: mongoose.model('Notification', notificationSchema)
};
