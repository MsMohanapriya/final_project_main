
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';
const { UserModel } = require('../models/Models')
const { transporter } = require('../utils/utils');
const { ProjectModel } = require('../models/Admin');



const login = async (req, res) => {
    try {
        const result = await UserModel.find();
        const { email, password } = req.body;
        const user = await result.find(u => { return u.email === email && u.password === password });

        if (user) {
            const accessToken = jwt.sign({
                user_id: user.user_id,
                email: user.email,
                userName: user.userName,
                roles: user.roles
            }, accessTokenSecret);
            const isFirstLogin = user.requirePasswordChange;
            res.json({
                accessToken,
                roles: user.roles,
                userId: user.user_id,
                userName: user.userName,
                requirePasswordChange: isFirstLogin
            });
        } else {
            res.json({ message: 'Username or password incorrect' });
        }
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ message: 'Error retrieving users' });
    }
};

const register_user = async (req, res) => {
    const link = 'http://localhost:5173/login'
    try {
        const { userId, userName, dateOfJoin, mobileNumber, email, city, state, pin, dateOfBirth, gender, reportingUserId, reporterName, roles, designationId, designation, departmentId, department, user_status, password } = req.body;
        console.log(req.body)

        const currentUser = await UserModel.findOne({ email: email });

        if (currentUser) {
            console.log("errrrrrrrrrrrrrr");
            return res.status(400).json({message: 'User already exists'});
        }

        console.log("user", req.user)
        if (req.user && req.user.roles === "admin") {
            const newUser = new UserModel({
                user_id: userId,
                userName: userName,
                dateOfJoin: dateOfJoin,
                mobileNumber: mobileNumber,
                email: email,
                city: city,
                state: state,
                pin: pin,
                dateOfBirth: dateOfBirth,
                gender: gender,
                reportingUserId: reportingUserId,
                reporterName: reporterName,
                roles: roles,
                designationId: designationId,
                designation: designation,
                departmentId: departmentId,
                department: department,
                user_status: user_status,
                password: password,
                requirePasswordChange: true,
                created_at: new Date()
            });


            try {
                const result = await newUser.save();
                console.log("res", result);

            } catch (error) {
                console.error(error);
            }

            const user = await UserModel.findOne({ email: email });
            console.log(user, email)
            if (user) {

                const mailData = {
                    from: 'mohanathangamanivk@gmail.com',
                    to: email,
                    subject: 'Welcome to Application',
                    text: 'Mail added',
                    html: `<p><b>Hey there!</b></p>
                        <p>Welcome to the Company Portal! we have  added your email to our portal.</p>
                        <p>To get started, please <a href="${link}">click here</a> to login to the portal using the following credentials:</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Password:</strong> ${password}</p>
                        <p>Once logged in, you'll be directed to the change password page where you can update your password.</p>
                        <p>If you have any questions or need assistance, feel free to reach out.</p>
                        <p>Best regards,<br/>Your Company Team</p>`
                };

                transporter.sendMail(mailData, function (err, info) {
                    if (err)
                        console.log(err)
                    else
                        console.log(info);
                });

                res.json({ message: "User created successfully", user: user });

            } else {
                res.status(500).json({ message: "Error creating user" });
            }
        } else {
            res.status(403).json({ message: "Only admins can perform this function" });
        }
    } catch (err) {
        console.error('Error creating user', err);
        res.status(500).json({ message: "Error creating user" });
    }
};





const change_password = async (req, res) => {
    try {
        const { email, newPassword } = req.body;

        // Validate if email and newPassword are provided
        if (!email || !newPassword) {
            return res.status(400).json({ message: "Email and new password are required" });
        }

        // Update the user's password in the database
        const updatedUser = await UserModel.findOneAndUpdate({ email: email }, { password: newPassword, requirePasswordChange: false }, { new: true });

        if (updatedUser) {
            return res.json({ message: "User password changed successfully", user: updatedUser });
        } else {
            return res.status(500).json({ message: "Error changing password" });
        }
    } catch (err) {
        console.error('Error executing query', err);
        return res.status(500).json({ message: 'Error changing password' });
    }
};


const fetchAllUsers = async (req, res) => {
    try {
        const users = await UserModel.find({});
        // console.log("Users fetched successfully:", users);
        return res.status(200).json({ users: users });

    } catch (error) {
        console.error(err);
        return res.status(400).json({ message: err.message });
    }

}



module.exports = {
    login,
    register_user,
    change_password,
    fetchAllUsers
}