import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from "react-redux";
import { NotFoundPage } from "./mycomoponents/General_components/errorpage";
import { Header } from "./mycomoponents/General_components/header";
import { About } from "./mycomoponents/General_components/aboutpage";
import { Loginpage } from "./mycomoponents/teacher/Teacher_login";
import { Studentsdashboard } from "./mycomoponents/students/studentsdashboard";
import { StudentsProfile } from "./mycomoponents/students/students_Profile";
import { StudentsLogin } from "./mycomoponents/students/studentslogin";
import { Homepage } from "./mycomoponents/General_components/homepage";
import { Attendancepage } from "./mycomoponents/teacher/Attendance_page";
import { Querypage } from "./mycomoponents/teacher/query_page";
import { Queryresolver } from "./mycomoponents/teacher/Query_Attendance_checking";
import { Teachersdashboard } from "./mycomoponents/teacher/teachers_dashboard";
import { Footer } from "./mycomoponents//General_components/footer";
import { Signup } from './mycomoponents/students/Students_signup';
import  {LoginPage}  from './mycomoponents/Admin/adminlogin';
import { Admincomponent  } from "./mycomoponents/Admin/admincomponent";
import { Teachercredmaking } from "./mycomoponents/teacher/teachercredmaking";
import { Teachercredupdating } from "./mycomoponents/teacher/teachercredupdating";
import { AttendanceViewer } from "./mycomoponents/teacher/Attendance_Viewer";
import { Alert } from "./mycomoponents/General_components/alert";
import AdminPanel from "./mycomoponents/Admin/adminpanel";
import DatabaseComponent from "./mycomoponents/Admin/studentid";




function App() {
  const teacherloggedin = useSelector(state => state.pagename);



  return (
    <Router>
      <Routes>
   

        <Route exact path="/about"  element={<> <Header/>  <About/> <Footer/> </> } />
        <Route exact path="/adminlogin"  element={<> <Header/> <LoginPage/>  <Footer/> </> } />
        <Route exact path="/adminlogin/adminpanel"  element={<> <Header/> <AdminPanel/>  <Footer/> </> } />
        <Route exact path="/adminlogin/adminpanel/send-signup-ids"  element={<> <DatabaseComponent/>  <Footer/> </> } />
        <Route exact path="/admin"  element={<> <Header/>  <Admincomponent/> <Footer/> </> } />

        <Route exact path="/"  element={<> <Homepage/> <Footer/> </> } />
        
        <Route exact path="/teacherlogin" element={<> <Header/> <Loginpage/> </> } />

        <Route exact path="/signup" element={<> <Header/> <Signup/> <Footer/> </> } />

        <Route exact path="/studentslogin" element={ <> <Header/> <StudentsLogin/> <Footer/> </>} />

        <Route exact path="/studentslogin/StudentsProfile/Studentsdashboard" element={ <> <Studentsdashboard/> </> } />
       
      <Route exact path="/studentslogin/StudentsProfile" element={  <StudentsProfile/> } />



        <Route exact path="/teacherlogin/teachersdashboard" element={ teacherloggedin ?
         <> 
         <Header/> <Teachersdashboard/> 
         </> 
        
        :
         <>
          <Header/> <NotFoundPage/> <Footer/> 
        </> 

        } />

        <Route exact path="/teacherlogin/teachersdashboard/attendance" element={ 
        teacherloggedin ?
        <> 
        <Header/> <Alert/> <Attendancepage/> 
        <Footer/> 
        </>
        :
        <>
        <Header/> <NotFoundPage/> <Footer/> 
      </> 
      } /> 


        <Route exact path="/teacherlogin/teachersdashboard/Querypage" element={ teacherloggedin ?
        <> 
        <Header/>  <Alert/> <Querypage /> <Footer /> 
        </>
        :
        <>
           <Header/> <NotFoundPage/> <Footer/> 
        </> 
      } /> 


        <Route exact path="/teacherlogin/teachersdashboard/Querypage/Queryresolverpage" element={<> <Header/> <Alert/> <Queryresolver/> </>} /> 
       
       
        <Route exact path="/teachercredlogin" element={<> <Header /> <Teachercredmaking/> <Footer/> </>} /> 
       
        <Route exact path="/teachercredlogin/Teachercredupdating" element={<> <Header /> <Teachercredupdating/> <Footer/> </>} /> 
        

        <Route exact path="/teacherlogin/teachersdashboard/AttendanceViewer" element={ <><Header/> <AttendanceViewer/>
        <Footer/> 
        </>
        } />

      </Routes>
    </Router>
  );
}


export default App;

