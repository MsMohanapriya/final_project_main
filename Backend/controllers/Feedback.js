

const FeedbackModel = require('../models/FeedbackModel');
// Controller function to handle feedback submission
const submitFeedback = async (req, res) => {
    try {
        // Extract feedback data from request body
        const { overallProgress, communication, timeline, qualityOfWork, projectManagement } = req.body;
        console.log('feedback',req.body);
        // Create a new feedback document
        const feedback = new FeedbackModel({
            overallProgress,
            communication,
            timeline,
            qualityOfWork,
            projectManagement            
        });

        // Save the feedback to the database
        await feedback.save();

        res.status(201).json({ message: 'Feedback submitted successfully!' });
    } catch (error) {
        console.error('Error submitting feedback:', error);
        res.status(500).json({ error: 'Failed to submit feedback' });
    }
};


module.exports = {
    submitFeedback
};
