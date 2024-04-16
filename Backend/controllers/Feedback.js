

const FeedbackModel = require('../models/FeedbackModel');
const { TimesheetModel } = require('../models/Models');
// Controller function to handle feedback submission
const submitFeedback = async (req, res) => {
    try {
        // Extract feedback data from request body
        const { overallProgress, communication, timeline, qualityOfWork, projectManagement, user_id } = req.body;
        console.log('feedback',req.body);
        // Create a new feedback document
        const feedback = new FeedbackModel({
            user_id,
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

const getFeedBacks = (req,res) => {
    FeedbackModel.find({user_id:req.params.id})
        .then((feedbackData) => {
            return TimesheetModel.find({ user_id: req.params.id }).then((timesheetData) => {
                return { feedbackData, timesheetData };
            });
        })
        .then((combinedData) => {
            res.status(200).json({ message: 'Fetched all data', data: combinedData });
        })
        .catch((err) => {
            console.log(err);
            res.status(400).json({ message: err.message });
        });
}


module.exports = {
    submitFeedback,
    getFeedBacks
};
