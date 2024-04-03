
// const timesheetModel =  require('../models/Models').timesheetModel;
// const jwt = require('jsonwebtoken');
// const storeTimesheetData = async (req, res) => {

//     console.log(req.body, req.headers)
//     try {
//         const token = req.headers.authorization.split(' ')[1];
//         const decodedToken = jwt.verify(token, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vaGFuYXRoYW5nYW1hbml2a0BnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiTW9oYW5hIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzEyMTM2NzAxfQ.EIkbrr_JM0o8D2S3WZIS2f6bDa4bZoAoeDBFJ7rYSIg');

//         /*
//  authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6Im1vaGFuYXRoYW5nYW1hbml2a0BnbWFpbC5jb20iLCJmaXJzdF9uYW1lIjoiTW9oYW5hIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzEyMTM2NzAxfQ.EIkbrr_JM0o8D2S3WZIS2f6bDa4bZoAoeDBFJ7rYSIg',
//  decode and fetch the user and assign to request
//         */
//         // const user = req.user.email;
//         if (!decodedToken) {
//             return res.status(403).json({ message: "Unauthorized access" });
//         }

//         const { proj,  mon, tue, wed, thur, fri, sat, sun , tot } = req.body;
//         // if (req.user) {
//             const newTimesheet = new timesheetModel({
//                 // UID: UID,
//                 // PID: PID,
//                 // activity: activity,
//                 // comments: comments,
//                 // start_period: startdate,
//                 // end_period: enddate,
//                 pname: proj,
//                 mon: mon,
//                 tue: tue,
//                 wed: wed,
//                 thur: thur,
//                 fri: fri,
//                 sat: sat,
//                 sun: sun,
//                 total_hrs : tot,
//                 created_at: new Date()
//             });

//             try {
//                 const result = await newTimesheet.save();
//                 console.log(result);
//                 res.json({ message: "Timesheet data stored successfully", timesheet: result });
//             } catch (error) {
//                 console.error(error.message);
//                 res.status(500).json({ message: "Error storing timesheet data" });
//             }
//         } else {
//             res.status(403).json({ message: "Unauthorized access" });
//         }
//     } catch (err) {
//         console.error('Error storing timesheet data', err);
//         res.status(500).json({ message: "Error storing timesheet data" });
//     }
// };

// module.exports = {
//     storeTimesheetData
// };

const timesheetModel = require('../models/Models').TimesheetModel;
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';
const storeTimesheetData = async (req, res) => {
    console.log(req.body, req.headers);
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: "Unauthorized access: No token provided" });
        }
        
        const decodedToken = jwt.verify(token, accessTokenSecret);
        console.log(decodedToken)
        if (!decodedToken) {
            return res.status(403).json({ message: "Unauthorized access: Invalid token" });
        }

        const [{ proj, mon, tue, wed, thur, fri, sat, sun, tot }] = req.body;
        if(decodedToken.email){

            const newTimesheet = new timesheetModel({
                pname: proj,
                mon: mon,
                tue: tue,
                wed: wed,
                thur: thur,
                fri: fri,
                sat: sat,
                sun: sun,
                total_hrs: tot,
                created_at: new Date()
            });
            const result = await newTimesheet.save();
            console.log(result);
            res.json({ message: "Timesheet data stored successfully", timesheet: result });
        }

    } catch (err) {
        console.error('Error storing timesheet data', err);
        res.status(500).json({ message: "Error storing timesheet data" });
    }
};

module.exports = {
    storeTimesheetData
};

