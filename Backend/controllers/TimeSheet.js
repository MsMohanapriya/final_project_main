

const { TimesheetModel, FeedbackModel } = require('../models/Models');
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';
const storeTimesheetData = async (req, res) => {
    console.log("body: headers",req.body, req.headers);
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: "Unauthorized access: No token provided" });
        }
        
        const decodedToken = jwt.verify(token, accessTokenSecret);
        console.log('decoded_uid: ', decodedToken['user_id'])
        console.log('decoded: ',decodedToken)
        if (!decodedToken) {
            return res.status(403).json({ message: "Unauthorized access: Invalid token" });
        }

        if (!decodedToken || !decodedToken.user_id) {
            return res.status(403).json({ message: "Unauthorized access: Invalid token" });
        }

        // const user_id = decodedToken.user_id;
        // console.log('User ID:', user_id);

        const { user_id, rowsData, startDate, endDate } = req.body;
        console.log(req.body)

        // console.log(user_id)
        // console.log('bckend timesheet:', req.body)
        if(decodedToken.email){

            const newTimesheet = new TimesheetModel({
                user_id,
                rowsData,
                start_period: startDate,
                end_period: endDate
            });
            // console.log(newTimesheet)
            const result = await newTimesheet.save();
            // console.log("result:",result);
            res.json({ message: "Timesheet data stored successfully", timesheet: result });
        }

    } catch (err) {
        console.error('Error storing timesheet data', err);
        res.status(500).json({ message: "Error storing timesheet data" });
    }
};



// const submitFeedback = async (req, res) => {
//     try {
//         const newFeedback = new FeedbackModel(req.body);
//         console.log(req.body);
//         await newFeedback.save();
//         res.status(201).json({ success: true, message: "Feedback submitted successfully" });
//     } catch (error) {
//         console.error("Error submitting feedback:", error);
//         res.status(500).json({ success: false, message: "Failed to submit feedback" });
//     }
// };

module.exports = {
    storeTimesheetData,
    // submitFeedback
};

