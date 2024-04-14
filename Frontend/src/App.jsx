
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateUser from './Components/Admin/CreateUser';
import LoginPage from './Components/Login/Login';
import ForgetPasswordEmailPage from './Components/Login/ForgetPasswordEmailPage';
import ChangePasswordPage from './Components/Login/NewPasswordsetPage';
import TimeSheet from './Components/TimeSheet/TimeSheet';
import HomePage from './Components/Login/Home';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import CreateProject from './Components/Admin/Project';
import AllocateProject from './Components/Admin/ProjectAllocation';
import FeedbackQuestionsPage from './Components/Admin/FeedbackQues';

import UserForm from './Components/multiform/UserForm';
// import Dashboard from './Components/Dashboard/Dashboard';
import UserProfiles from './Components/Admin/Dashboards';

import FeedbackForm from './Components/Feedback/Feedback';

function App() {

  // const location = useLocation();

  // // Check if the current route is '/login'
  // const isLoginPage = location.pathname === '/login';




  return (
    <>
      <Router>


        {/* <ButtonAppBar /> */}
        <Routes>
          {/* <Route element={renderLayout()}> */}
          <Route path="/dashboard" element={<UserProfiles />} />
          {/* <Route path="/profile" element={<UserProfiles/>}/> */}
          {/* <Route path="/" element={<ButtonAppBar />}> */}
            <Route path="/createuser" element={<CreateUser />} />
            <Route path="/forget-password/email" element={<ForgetPasswordEmailPage />} />
            <Route path="/changepassword" element={<ChangePasswordPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/timesheet" element={<TimeSheet />} />
            <Route path="/Feedback" element={<FeedbackForm />} />
            <Route path="/createproject" element={<CreateProject />} />
            <Route path="/allocateproject" element={<AllocateProject />} />
            {/* <Route path="/createFeedbackQuestions" element={<CreateFeedbackQuestions />} /> */}
          <Route path="/createFeedback" element={<FeedbackQuestionsPage />} />
          {/* <Route path="/CreateTaskMultiStepFormContainer" element={<CreateTaskMultiStepFormContainer/>}/> */}
          <Route path="/userform" element={<UserForm/>}/>
          {/* </Route> */}
          <Route path="/" element={<LoginPage />} />
          {/* <AddDeleteTableRows /> */}
          {/* </Route> */}
        </Routes>
      </Router>
    </>
  )
}

export default App;

