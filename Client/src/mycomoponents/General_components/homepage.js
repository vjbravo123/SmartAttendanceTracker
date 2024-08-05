import React from 'react'
import { useNavigate, Link } from "react-router-dom";
import "../../css/Genral_components/homepage.css"

import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state';
import { useDispatch } from 'react-redux';



export const Homepage = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { setpagename } = bindActionCreators(actionCreators, dispatch);





  const handleTeacherLoginClick = () => {

    navigate("/teacherlogin")

    setpagename("Teacherlogin")

  };


  const handleStudentLoginClick = () => {
    navigate("/studentslogin")

    setpagename("StudentsLogin")

  };
  const handleTeacherClick = () => {
    setpagename("TeahcerLogin")
  };
  const handleAboutClick = () => {
    setpagename("About")
  };
  const handleAdminClick = () => {
    setpagename("Admin")
  };

  return (
    <>

      <div className="homebody">

        <input type="checkbox" id="check" />
        <label htmlFor="check">
        <i className="fas fa-bars" id="btn" aria-hidden="true"></i>
        <i className="fas fa-times" id="cancel" aria-hidden="true"></i>
        </label>


        <div className="sidebar">
          <header>My Menu</header>
          <ul>
            <li><Link ><i className="fas fa-qrcode" aria-hidden="true"></i>Dashboard</Link></li>
            <li><Link ><i className="fas fa-link" aria-hidden="true"></i>Shortcuts</Link></li>
            <li><Link ><i className="fas fa-stream" aria-hidden="true"></i>Overview</Link></li>
            <li><Link onClick={handleTeacherClick} to={"/teachercredlogin"} ><i className="fa-solid fa-chalkboard-user" aria-hidden="true"></i>Teachers</Link></li>
            <li><Link onClick={handleAboutClick} to={"/about"}   ><i className="fa-solid fa-user" aria-hidden="true"></i>About</Link></li>
            <li><Link onClick={handleAdminClick} to={"/adminlogin"} ><i className="fa-solid fa-lock" aria-hidden="true"></i>Admin</Link></li>
            <li><Link ><i className="far fa-envelope" aria-hidden="true"></i>Contact</Link></li>
          </ul>
        </div>


        <div className="headerr">

          <span className="headerleft"><img className="logo" src="/static/media/logo.ddb252b92aad513ef276.jpg" alt="Logo" /></span>

          <div className="centter">
            <h1 style={{ fontStyle: 'italic' }} className=" headerright college-heading">Maharaja Agrasen College<p >University of Delhi</p>
            </h1>
          </div>
        </div>

        <h1 className="heading" style={{ fontStyle: 'italic' }}><u>Teacher and Student Login</u></h1>
        <div className="conntainerrrrrr">
          <div className="login-option" onClick={handleTeacherLoginClick}>
            <div className="icon"><i className="fas fa-chalkboard-teacher" aria-hidden="true"></i></div>
            <h2>Login as Teacher</h2>
          </div>
          <div className="login-option" onClick={handleStudentLoginClick}>
            <div className="icon"><i className="fas fa-user-graduate" aria-hidden="true"></i></div>
            <h2>Login as Student</h2>
          </div>
        </div>
      </div>
    </>
  );
}
