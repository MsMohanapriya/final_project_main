const mongoose = require('mongoose')

//User
const userSchema = new mongoose.Schema({
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  role: {
    type: String
  },
  role_category: {
    type: String
  },
  employeeid: {
    type: String,
    unique: true
    
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  phone_number: {
    type: String
  },
  department: {
    type: String
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


const otpSchema = new mongoose.Schema({
    email: {
      type: String
    },
    otp: {
      type: String,
      required:true
    },
    created_at: {
      type: Date,
      default: Date.now
    }
  });

 

const timesheetSchema = new mongoose.Schema({
    
    email: {
        type: String
    },
    // PID: {
    //     type: String
    // },
    // activity: {
    //     type: String
    // },
    // comments: {
    //     type: String
    // },
    pname: {
        type: String // Assuming pname is a string field
    },
    start_period: {
        type: Date
    },
    end_period: {
        type: Date
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
    thur: {
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
    total_hrs:{
      type: Number
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    visible: {}
});



const TimesheetModel = mongoose.model('timesheet', timesheetSchema);
const UserModel = mongoose.model("users", userSchema)
const otpModel = mongoose.model("temp_otps", otpSchema)

module.exports = {
    UserModel,
    otpModel,
    TimesheetModel
};