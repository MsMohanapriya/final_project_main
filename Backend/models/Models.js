const mongoose = require('mongoose')

//User
const userSchema = new mongoose.Schema({
  user_id: {
    type: String,
    unique: true
  },
  userName: {
    type: String
  },
  dateOfJoin: {
    type: Date
  },
  mobileNumber: {
    type: String
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  city: {
    type: String
  },
  state: {
    type: String
  },
  pin: {
    type: String
  },
  dateOfBirth: {
    type: Date
  },
  gender: {
    type: String
  },
  reportingUserId: {
    type: String
  },
  reporterName: {
    type: String
  },
  roles: {
    type: String
  },
  designationId: {
    type: String
  },
  designation: {
    type: String
  },
  departmentId: {
    type: String
  },
  department: {
    type: String
  },
  user_status: {
    type: String
  },
  password: {
    type: String,
    require : true
  },
  requirePasswordChange: {
    type: Boolean,
    default: true // Assume first-time login requires password change
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const timesheetRow = new mongoose.Schema({
  
  pname: {
    type: String // Assuming pname is a string field
  },
  task: {
    type: String
  },
  mon: {
    type: Number
  },
  tue: {
    type: Number
  },
  wed: {
    type: Number
  },
  thu: {
    type: Number
  },
  fri: {
    type: Number
  },
  sat: {
    type: Number
  },
  sun: {
    type: Number
  },
  tot: {
    type: Number
  }
})

const timesheetSchema = new mongoose.Schema({
  user_id: {
    type: String
  },
  rowsData: [timesheetRow],
  start_period: {
    type: String
  },
  end_period: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  }
    
  
});



const TimesheetModel = mongoose.model('timesheet', timesheetSchema);
const UserModel = mongoose.model("users", userSchema);


module.exports = {
    UserModel,
  TimesheetModel,
   
};