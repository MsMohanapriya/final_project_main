// const jwt = require('jsonwebtoken');
// const accessTokenSecret = 'youraccesstokensecret';
// const { UserModel,otpModel } = require('../models/Models')
// const { transporter } = require('../utils/utils')

// const login = async (req, res) => {
//     try {
//         const result = await UserModel.find();
//         const { email, password } = req.body;
//         const user = await result.find(u => { return u.email === email && u.password === password });

//         if (user) {
//             const accessToken = jwt.sign({ user_id: user.user_id, email: user.email, first_name: user.first_name, role: user.role }, accessTokenSecret);
//             res.json({
//                 accessToken,
//                 role:user.role
//             });
//         } else {
//             res.json({ message: 'Username or password incorrect' });
//         }
//     } catch (err) {
//         console.error('Error executing query', err);
//         res.status(500).json({ message: 'Error retrieving users' });
//     }
// };

// const register_user = async (req, res) => {
//     const link = 'http://localhost:3001/login'
//     try {
//         const { first_name, last_name, role, password, email, phone_number } = req.body;

//         if (req.user && req.user.role === "admin") {
//             const newUser = new UserModel({
//                 first_name: first_name,
//                 last_name: last_name,
//                 role: role,
//                 password: password,
//                 email: email,
//                 phone_number: phone_number,
//                 created_at: new Date()
//               });
              
              
//               try {
//                 const result = await newUser.save();
//                 console.log(result);
                
//               } catch (error) {
//                 console.error(error);
//               }
            
//             const user = await UserModel.findOne({ email: email });
//             if (user) {

//                 const mailData = {
//                     from: 'mohanathangamanivk@gmail.com', 
//                       to: email,   
//                       subject: 'welcome to appliation',
//                       text: 'mail added',
//                       html: `<b>Hey there! </b> <br> Admin has added your mail to our application <br/> <br>visit ${link} to change your password</br>`,
//                     };

//                 transporter.sendMail(mailData, function (err, info) {
//                     if(err)
//                         console.log(err)
//                     else
//                         console.log(info);
//                     });
                    
//                 res.json({ message: "User created successfully", user: user });

//             } else {
//                 res.status(500).json({ message: "Error creating user" });
//             }
//         } else {
//             res.status(403).json({ message: "Only admins can perform this function" });
//         }
//     } catch (err) {
//         console.error('Error creating user', err);
//         res.status(500).json({ message: "Error creating user" });
//     }
// };

// const generate_otp = async (req, res) => {
//     try {
//         const { email } = req.body;
//         const result = await UserModel.find();
//         const user = await result.find(u => { return u.email === email});
    
//         if (user) {
//             const otp = Math.floor(10000 + Math.random() * 90000).toString();

//             const newTempOTP = new otpModel({
//                 email: email,
//                 otp: otp,
//                 created_at: new Date()
//               });
              
//               // Save the tempOTP document to the database
//               try {
//                 const result = await newTempOTP.save();
//                 console.log(result); 
//               } catch (error) {
//                 console.error(error);
//               }

//             res.json({ message: "OTP created successfully", payload: result });

//             const mailData = {
//                 from: 'mohanathangamanivk@gmail.com', 
//                   to: email,   
//                   subject: 'OTP - please do not share dude',
//                   text: 'OTP requested',
//                   html: `<b>Hey there! </b> <br> your otp is ${otp}<br/>`,
//                 };

//             transporter.sendMail(mailData, function (err, info) {
//                 if(err)
//                     console.log(err)
//                 else
//                     console.log(info);
//                 });
//         } else {
//             res.json({ message: "There is no email in db" })
//         }

//     } catch (err) {
//         console.error('Error executing query', err);
//         res.status(500).json({ message: 'Error generating otp' });
//     }
// };

// const change_password = async (req, res) => {
//     try {
//         const { email, new_password, otp } = req.body;

//         if (email && otp) {
//             const check_otp = await otpModel.findOne({ email: email, otp: otp });
//             if (check_otp) {
//                 try {
//                     const updatedUser = await UserModel.findOneAndUpdate(
//                         { email: email },
//                         { password: new_password },
//                         { new: true }
//                     );

//                     await otpModel.deleteOne({ email: email });

//                     if (updatedUser) {
//                         res.json({ message: "User password changed successfully", user: updatedUser });
//                     } else {
//                         res.status(500).json({ message: "Error changing password" });
//                     }
//                 }
//                 catch (err) {
//                     console.error('Error executing query', err);
//                     res.status(500).json({ message: 'Error changing password' });
//                 }
//             } else {
//                 res.json({ message: "otp not found" })
//             }
//         } else {
            
//             res.json({ message: "There is no email or otp" })
//         }

//     } catch (err) {
//         console.error('Error executing query', err);
//         res.status(500).json({ message: 'Error changing password' });
//     }
// };

// const user_detail = async (req,res) => {
//     res.json(req.user)
// }

// const test = async (req, res) => {
//     console.log("Health Check!")
//     res.send("Server UP!!")
// }

// module.exports = {
//     login,
//     test,
//     register_user,
//     generate_otp,
//     change_password,
//     user_detail
// }

 
const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';
const { UserModel,otpModel } = require('../models/Models')
const { transporter } = require('../utils/utils')
 
const login = async (req, res) => {
    try {
        const result = await UserModel.find();
        const { email, password } = req.body;
        const user = await result.find(u => { return u.email === email && u.password === password });
 
        if (user) {
            const accessToken = jwt.sign({
                user_id: user.user_id,
                email: user.email,
                first_name: user.first_name,
                role: user.role }, accessTokenSecret);
            const isFirstLogin = user.requirePasswordChange;
            res.json({
                accessToken,
                role:user.role,
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
        const { first_name, last_name, role, password, email, phone_number, employeeId,department,roleCategory } = req.body;
        console.log(req.body)
        if (req.user && req.user.role === "admin") {
            const newUser = new UserModel({
                first_name: first_name,
                last_name: last_name,
                email: email,
                employeeid: employeeId,
                role: role,
                department: department,
                role_category: roleCategory,
                password: password,
                phone_number: phone_number,
                created_at: new Date()
              });
             
             
              try {
                const result = await newUser.save();
                console.log(result);
               
              } catch (error) {
                console.error(error);
              }
           
            const user = await UserModel.findOne({ email: email });
            if (user) {
 
                const mailData = {
                    from: 'mohanathangamanivk@gmail.com',
                      to: email,  
                      subject: 'welcome to appliation',
                      text: 'mail added',
                      html: `<b>Hey there! </b> <br> Admin has added your mail to our application <br/> <br>visit ${link} to change your password</br>`,
                    };
 
                transporter.sendMail(mailData, function (err, info) {
                    if(err)
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
 
const generate_otp = async (req, res) => {
    try {
        const { email } = req.body;
        const result = await UserModel.find();
        const user = await result.find(u => { return u.email === email});
        console.log(req.body)
        if (user) {
            const otp = Math.floor(10000 + Math.random() * 90000).toString();
 
            const newTempOTP = new otpModel({
                email: email,
                otp: otp,
                created_at: new Date()
              });
             
              // Save the tempOTP document to the database
              try {
                const result = await newTempOTP.save();
                console.log(result);
              } catch (error) {
                console.error(error);
              }
 
            res.json({ message: "OTP created successfully", payload: result });
 
            const mailData = {
                from: 'mohanathangamanivk@gmail.com',
                  to: email,  
                  subject: 'OTP - please do not share dude',
                  text: 'OTP requested',
                  html: `<b>Hey there! </b> <br> your otp is ${otp}<br/>`,
                };
 
            transporter.sendMail(mailData, function (err, info) {
                if(err)
                    console.log(err)
                else
                    console.log(info);
                });
        } else {
            res.json({ message: "There is no email in db" })
        }
 
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ message: 'Error generating otp' });
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
        const updatedUser = await UserModel.findOneAndUpdate({ email: email }, { password: newPassword, requirePasswordChange: false}, { new: true });
 
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
 
 
const user_detail = async (req,res) => {
    res.json(req.user)
}
 
const test = async (req, res) => {
    console.log("Health Check!")
    res.send("Server UP!!")
}
 
module.exports = {
    login,
    test,
    register_user,
    generate_otp,
    change_password,
    user_detail
}