const { Router } = require('express'); 
const utils = require('../utils/utils')
const TimeSheetController = require('../controllers/TimeSheet')
const ProjectController = require('../controllers/Project')
const router = Router();
const AuthControllers = require('../controllers/Auth');

//main apis
// router.get('/test',AuthControllers.test);
router.post('/login',AuthControllers.login);
router.post('/registerUser',utils.authenticateJWT,AuthControllers.register_user);
router.post('/generateOtp',AuthControllers.generate_otp);
router.post('/changePassword',AuthControllers.change_password);
// router.post('/userDetail',AuthControllers.user_detail);
router.post('/registerTimesheet',TimeSheetController.storeTimesheetData);
router.post('/createProject', ProjectController.createProject);
router.post('/allocateProject',ProjectController.AllocateProject)
router.post('/createFeedbackQuestions', ProjectController.createFeedbackQuestions);
router.get('/projects', ProjectController.fetchAllProject)
router.post('/user/projects', ProjectController.fetchUserProject)
router.get('/users', AuthControllers.fetchAllUsers)
// router.post('/feedback',ProjectController.)

module.exports = router;