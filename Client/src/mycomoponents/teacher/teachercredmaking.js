import React, { useState } from 'react';
import "../../css/Teacher/teachercred.css"
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state';

export const Teachercredmaking = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const apiUrl = process.env.REACT_APP_SERVER_URL
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const {setpagename}=bindActionCreators(actionCreators,dispatch)
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${apiUrl}/login/datalogger`,{
      method:'POST',
      body:JSON.stringify({Username:username,Password:password}),
      headers:{
        'Content-Type':'application/json'
      }
    })
    .then(response => response.json())
    .then(data=>{
      console.log("login button clicked response from server is :", data)


      if (data.value) {
      console.log("true credentials");
      navigate("Teachercredupdating")
      setpagename('TeacherSignup')

      
      }
      else {
        alert("false username or password")
      }
    })
  };

  return (
    <div className="body">
    <div className="containerr ">
    <div className="login-containerr">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
    </div>
    </div>
  );
};


