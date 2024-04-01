const mongoose = require('mongoose')
const conn_str = "mongodb+srv://Mohana:mohana123@user.11jyqrm.mongodb.net/timesheet?retryWrites=true&w=majority"
mongoose.connect(conn_str).then(() => console.log("Connected Successsfully")).catch((err) => console.log(err))
module.exports = {
    mongoose
}