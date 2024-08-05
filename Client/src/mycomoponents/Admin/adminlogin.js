import React, { useState } from 'react';
import '../../css/Admin/adminlogin.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state';
export const LoginPage = (props) => {
  const dispatch=useDispatch();
  const {setpagename}=bindActionCreators(actionCreators,dispatch);
const apiUrl = process.env.REACT_APP_SERVER_URL
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // const formData = new FormData(event.target); // Get the form data

    fetch(`${apiUrl}/adminlogin/datalogger`, {
      method: 'POST',
      body: JSON.stringify({ Username: username, Password: password }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        // Handle the server response here

        console.log("login button clicked response from server is :", data)


        if (data.value) {
          // props.setteacherloggedin(true)
          // props.setdbname(data.data[0].Subcourse)
          // props.setcollectioname(data.data[0].Subject)
          
          // console.log("subcourse",data.data[0].Subcourse)
          // console.log("subject",data.data[0].Subject)
          navigate("/adminlogin/adminpanel")
          setpagename("Adminpage")

          
        }
        else {
          alert("false username or password")
        }

      })
      .catch(error => {
        console.log('Error:', error);
      });
    // Your login logic here
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={handleUsernameChange}
            className="login-input"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className="login-input"
          />
          <button type="submit" className="login-button">Login</button>
        </form>
      </div>
    </div>
  );
};

// export default LoginPage;
