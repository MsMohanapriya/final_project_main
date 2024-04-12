
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateUser from './Components/Admin/CreateUser';
import LoginPage from './Components/Login/Login';
import ForgetPasswordEmailPage from './Components/Login/ForgetPasswordEmailPage';
import ChangePasswordPage from './Components/Login/NewPasswordsetPage';
import TimeSheet from './Components/TimeSheet/TimeSheet';
import HomePage from './Components/Login/Home';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Feedback from './Components/Feedback/Feedback';
import CreateProject from './Components/Admin/Project';
import AllocateProject from './Components/Admin/ProjectAllocation';
import FeedbackQuestionsPage from './Components/Admin/FeedbackQues';
// import ButtonAppBar from './Components/navbar/navbar';
{/* <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.4.1/dist/css/bootstrap.min.css" 
integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous"></link> */}
import UserForm from './Components/multiform/UserForm';
import CreateFeedbackQuestions from './Components/Admin/CreateFeedbackQuestions';
import Dashboard from './Components/Dashboard/Dashboard';
// import CreateTaskMultiStepFormContainer from './Components/Login/rrform';

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
            <Route path="/dashboard" element={<Dashboard/>}/>
          {/* <Route path="/" element={<ButtonAppBar />}> */}
            <Route path="/createuser" element={<CreateUser />} />
            <Route path="/forget-password/email" element={<ForgetPasswordEmailPage />} />
            <Route path="/changepassword" element={<ChangePasswordPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/timesheet" element={<TimeSheet />} />
            <Route path="/feedback" element={<Feedback />} />
            <Route path="/createproject" element={<CreateProject />} />
            <Route path="/allocateproject" element={<AllocateProject />} />
            <Route path="/createFeedbackQuestions" element={<CreateFeedbackQuestions />} />
            <Route path="/FeedbackQues" element={<FeedbackQuestionsPage />} />
          {/* <Route path="/CreateTaskMultiStepFormContainer" element={<CreateTaskMultiStepFormContainer/>}/> */}
          <Route path="/userform" element={<UserForm/>}/>
          {/* </Route> */}
          <Route path="/login" element={<LoginPage />} />
          {/* <AddDeleteTableRows /> */}
          {/* </Route> */}
        </Routes>
      </Router>
    </>
  )
}

export default App;

