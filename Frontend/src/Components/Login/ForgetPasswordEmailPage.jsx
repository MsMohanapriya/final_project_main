import React, { useState,useEffect } from 'react';
import { useNavigate,useLocation } from 'react-router-dom';

function ForgetPasswordOTPPage() {
    const [email, setEmail] = useState('');
    const [otp, setOTP] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const encodedEmail = searchParams.get('email');
        const decodedEmail = decodeURIComponent(encodedEmail);
        setEmail(decodedEmail);
      }, [location.search]);
      
    const handleOTPChange = (event) => {
        setOTP(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/generateOtp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: email, otp: otp, new_password: password }), // Send email in the request body
            });

            const res = await response.json();

            if (res.message !== 'User password changed successfully') {
                alert('Failed to change password');
            }

            else {
                alert('password changed succufully')
                navigate('/login');
            }

        } catch (error) {
            console.error('Error:', error.message);
            // Handle error, show error message to the user, etc.
        }
    navigate('/login');
};

return (
    <div>
        <h1>Reset Password</h1>
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="otp">Enter OTP</label>
                <input
                    type="text"
                    id="otp"
                    value={otp}
                    onChange={handleOTPChange}
                    required
                />
            </div>
            <div>
                <label htmlFor="password">Enter new password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={handlePasswordChange}
                    required
                />
            </div>
            <button type="submit">Reset Password</button>
        </form>
    </div>
);
}
export default ForgetPasswordOTPPage;

// import { useState,createContext } from "react";
// import * as React from 'react';
// import Typography from '@mui/material/Typography';

// import Snackbar from '@mui/material/Snackbar';
// import MuiAlert from '@mui/material/Alert';
// // import StepperCustom from "../atoms/StepperCustom";
// // import VerifyAcc from "../atoms/VerifyAcc";
// // import SendForgotMail from "../atoms/SendForgotMail";
// // import MailSuccessfull from "../atoms/MailSuccessfull";
// import Button from '@mui/material/Button';
 
// export const ForgotPassContext = createContext()
 
// const ForgetPasswordOTPPage = () =>{
 
//     const [openSnackbar, setOpenSnackbar] = useState(false);
//     const [msg,setMsg]=useState("");
//     const [sev,setSev]=useState("");
//     const [user,setUser]=useState(null)
//     const [step,setStep]=useState(0)
 
//     const Alert = React.forwardRef(function Alert(props, ref) {
//         return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
//       });
   
//       const handleClose = () => {
//         setOpenSnackbar(false);
//       };
 
    
 
//     return(
//         <>
//             <ForgotPassContext.Provider value={[msg,setMsg,sev,setSev,openSnackbar,setOpenSnackbar,user,setUser,step,setStep]}>
//             <Snackbar open={openSnackbar} autoHideDuration={5000} onClose={handleClose}>
//             <Alert onClose={handleClose} severity={sev} sx={{ width: '100%' }}>
//             {msg}
//             </Alert>
//             </Snackbar>
//             <Typography component="h1" variant="h4" className="text-center" sx={{marginTop:'15px',marginBottom:'20px'}}>
//                 <b>Forgot Password ?</b>
//             </Typography>
//             <StepperCustom steps={['Verify Your Account','Send Mail','Mail Successfull',]} step={step} />
//             <div className={"flex flex-col items-center justify-center h-96"}>
//                 {
//                     step==0?<VerifyAcc />:step==1?<SendForgotMail />:step>=2?<MailSuccessfull />:<></>
//                 }
//                 {step==1?<Button variant="outlined" color="primary" sx={{maxWidth:'10px',marginTop:'15px'}}
//                 onClick={()=>{
//                     setStep(step=>step-1)
//                 }}
//                 >
//                     BACK
//                 </Button>:<></>}
//             </div>
//             </ForgotPassContext.Provider>
//         </>
//     )
// }
// export default ForgetPasswordOTPPage