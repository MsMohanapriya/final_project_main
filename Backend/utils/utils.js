// const jwt = require('jsonwebtoken');
// const accessTokenSecret = 'youraccesstokensecret';
// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//     port: 465,               // true for 465, false for other ports
//     host: "smtp.gmail.com",
//        auth: {
//             user: 'mohanathangamanivk@gmail.com',
//             pass: 'rryt kyor ewdl msbi',
//          },
//     secure: true,
//     });


// const authenticateJWT = (req, res, next) => {
//   const authHeader = req.headers.authorization;

//   if (authHeader && authHeader.startsWith('Bearer ')) {
//     const token = authHeader.split(' ')[1];

//     jwt.verify(token, accessTokenSecret, (err, decoded) => {
//       if (err) {
//         res.status(401).send('Invalid token');
//       } else {
//         req.user = decoded; // Attach decoded user data to the request
//         next();
//       }
//     });
//   } else {
//     res.status(401).send('Unauthorized');
//   }
// };


// module.exports = {
//     authenticateJWT,
//     transporter
//   }

const jwt = require('jsonwebtoken');
const accessTokenSecret = 'youraccesstokensecret';
const nodemailer = require('nodemailer');
 
const transporter = nodemailer.createTransport({
    port: 465,               // true for 465, false for other ports
    host: "smtp.gmail.com",
       auth: {
            user: 'mohanathangamanivk@gmail.com',
            pass: 'rryt kyor ewdl msbi',
         },
    secure: true,
    }); 
 
 
const authenticateJWT = (req, res, next) => {
  const authHeader = req.headers.authorization;
  console.log(req.headers)
  
  console.log(authHeader, authHeader && authHeader.startsWith('Bearer '))
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
 
    jwt.verify(token, accessTokenSecret, (err, decoded) => {
      if (err) {
        res.status(401).send('Invalid token');
      } else {
        req.user = decoded; // Attach decoded user data to the request
        console.log("Googin to next middleware")
        next();
      }
    });
  } else {
    console.log("error")
    res.status(401).send('Unauthorized');
  }
};
 
 
module.exports = {
    authenticateJWT,
    transporter
  }