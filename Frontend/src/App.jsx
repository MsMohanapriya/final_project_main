
import './App.css'
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateUser from './Components/Login/CreateUser';
import LoginPage from './Components/Login/Login';
import ForgetPasswordEmailPage from './Components/Login/ForgetPasswordEmailPage';
import ChangePasswordPage from './Components/Login/NewPasswordsetPage';
import AddDeleteTableRows from './Components/add-delete-table-rows/AddDeleteTableRows';
import HomePage from './Components/Login/Home';
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css" 
integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"></link>
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Feedback from './Components/Feedback/Feedback';
function App() {


  return (
    <>
      <Router>
        <Routes>
        {/* <Route element={renderLayout()}> */}
        <Route path="/createuser" element={<CreateUser/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/forget-password/email" element={<ForgetPasswordEmailPage/>}/>
        <Route path="/changepassword" element={<ChangePasswordPage/>}/>
        <Route path="/home" element={<HomePage/>}/>
        <Route path="/timesheet" element={<AddDeleteTableRows/>}/>
        <Route path="/feedback" element={<Feedback/>}/>
        {/* <AddDeleteTableRows /> */}
        {/* </Route> */}
        </Routes>
      </Router>
    </>
  )
}
 
export default App;
 
