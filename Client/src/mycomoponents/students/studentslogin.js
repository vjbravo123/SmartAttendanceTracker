import React from 'react';
import '../../css/Students/studentslogin.css';
import logo from "../../images/logo.jpg";
import backgroundImg from "../../images/pexels-fwstudio-131683.jpg";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state';


export const StudentsLogin = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const {setpagename,setsubarr,setdbname,setrollno}=bindActionCreators(actionCreators,dispatch);
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);

    fetch(`${process.env.REACT_APP_SERVER_URL}/studentslogin/students`, {
      method: 'POST',
      body: JSON.stringify({Username: formData.get('username'), Password: formData.get('password')}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log("login button clicked response from server is :", data)

      if(data.value){
        navigate("StudentsProfile")
        setpagename("StudentsProfile")
        setsubarr(data.subarr)
        setdbname(data.Subcourse)
        setrollno(data.roll_no)
      } else {
        console.log("false username or password",data)
      }
    })
    .catch(error => {
      console.log('Error:', error);
    });
  };



  const handleclick = () => {
    navigate("/signup");
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
  
          <Link type="button" to={"/signup"} className="new-user-button">New User?</Link>
          <button type="submit">SUBMIT</button>
        </form>
      </div>
      </div>
    </>
      );
};
