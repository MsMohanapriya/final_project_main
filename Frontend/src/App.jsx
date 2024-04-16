
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './Components/Login/Login';
import ForgetPasswordEmailPage from './Components/Login/ForgetPasswordEmailPage';
import ChangePasswordPage from './Components/Login/NewPasswordsetPage';
import TimeSheet from './Components/TimeSheet/TimeSheet';

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import './index.css';
import CreateProject from './Components/Admin/Project';
import AllocateProject from './Components/Admin/ProjectAllocation';
import FeedbackQuestionsPage from './Components/Admin/FeedbackQues';
import UserForm from './Components/Admin/Userform/UserForm';
import UserProfiles from './Components/Admin/Dashboards';
import FeedbackForm from './Components/Feedback/Feedback';
import UserDashboard from './Components/users/UserDashboard';

function App() {


  return (
    <>
      <Router>


        <Routes>

          <Route path="/dashboard" element={<UserProfiles />} />
          <Route path="/forget-password/email" element={<ForgetPasswordEmailPage />} />
          <Route path="/changepassword" element={<ChangePasswordPage />} />
          <Route path="/timesheet" element={<TimeSheet />} />
          <Route path="/Feedback" element={<FeedbackForm />} />
          <Route path="/createproject" element={<CreateProject />} />
          <Route path="/allocateproject" element={<AllocateProject />} />
          <Route path="/createFeedback" element={<FeedbackQuestionsPage />} />
          <Route path="/userform" element={<UserForm />} />
          <Route path="/userdashboard" element={<UserDashboard />} />
          <Route path="/" element={<LoginPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App;

