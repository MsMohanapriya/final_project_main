const mongoose = require('mongoose');



const feedbackSchema = new mongoose.Schema({
    user_id: String,
    overallProgress: Number,
    communication: Number,
    timeline: Number,
    qualityOfWork: Number,
    projectManagement: Number    
});

const FeedbackModel = mongoose.model('Feedback', feedbackSchema);


module.exports = FeedbackModel