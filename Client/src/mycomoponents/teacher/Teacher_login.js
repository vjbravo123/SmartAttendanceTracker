import React from 'react'
import "../../css/Teacher/login.css"
import { Link, useNavigate } from "react-router-dom";
import logo from "../../images/logo.jpg"
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state';
const apiUrl = process.env.REACT_APP_SERVER_URL;

export const Loginpage = () => {
  const dispatch=useDispatch();
  const {setteacherloggedin,setdbname,setcollectionname,setpagename}= bindActionCreators(actionCreators,dispatch)

  const navigate = useNavigate();
  const handleSubmit = (event) => {
    // console.log(process.env.REACT_APP_SERVER_URL)
    event.preventDefault(); 

    fetch(`${apiUrl}/login/users`, {
      method: 'POST',
      body: JSON.stringify({ Username: document.getElementById("username").value, Password: document.getElementById("password").value }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {


        if (data.value) {
          setteacherloggedin(true)
          
          setdbname(data.data.Subcourse)
          setcollectionname(data.data.Subject)

         
          navigate("teachersdashboard")
         setpagename("Teachersdashboard")


        }
        else {
          alert("false username or password")
        }

      })
      .catch(error => {
        console.log('Error:', error);
      });
  };


  return (  <>
  <div className='boxmod'>
    <nav className='naver'>
      <div>
        <img className='logo' src={logo} alt="" />
      </div>
    </nav>

    <div className="login-box">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>

        <div className="user-box">
          <input type="text" id='username' name="username" placeholder='Username'/>
          <i className="bx bx-user"></i>
         
        </div>

        <div className="user-box">
          <input type="password" id='password' name="password" placeholder='Password'/>
          <i className="bx bx-lock-alt"></i>
        
        </div>

        <Link type="button" to={"/teachercredlogin/Teachercredupdating"} className="new-user-button">New User?</Link>
        <button type="submit">SUBMIT</button>
      </form>
    </div>
    </div>
  </>
    )
  }