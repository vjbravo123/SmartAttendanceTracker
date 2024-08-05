import React from 'react';
import { useNavigate } from "react-router-dom";
import "../../css/Students/StudentsProfile.css"
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state';
export const StudentsProfile = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const {setattendanceresult,setpagename,setpresentdays}=bindActionCreators(actionCreators,dispatch);
  const dbname=useSelector(state=>state.dbname);
  const roll_no=useSelector(state=>state.roll_no);
  const subarr=useSelector(state=>state.subarr);
  const handleLogout = () => {
    // Handle logout functionality here
    navigate("/studentslogin");
  };

  const handleSubjectClick = (subject) => {
    console.log(dbname);
    fetch(`${process.env.REACT_APP_SERVER_URL}/studentAttendancePage`, {
      method: 'POST',
      body: JSON.stringify({Subject:subject ,dbname:dbname , roll_no:roll_no}),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(response => response.json())
    .then(data => {
          navigate("Studentsdashboard")
          setpagename("Studentsdashboard")
          setpresentdays(data.attendance)
          setattendanceresult(data.attendance_data)

    })
    .catch(error => {
      console.log('Error:', error);
    });
    
  };

  return (
    <div className="students-profile">
      <header className='hdder'>
        <div className="profile-section">
          <span className="profile-icon">&#128221;</span>
          <h2>Welcome, {subarr[subarr.length-1]}</h2>
        </div>
        <button onClick={handleLogout}>Logout</button>
      </header>

   
      <main className='mainnn'>
        <h3>Check Attendance</h3>
        <ul>
        {subarr.slice(0, -1).map((subject, index) => (
          <li key={index}>
            <button onClick={() => handleSubjectClick(subject)}>{subject}</button>
          </li>
        ))}
      </ul>
      </main>
    </div>
  );
};
