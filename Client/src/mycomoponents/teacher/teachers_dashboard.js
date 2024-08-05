import React from 'react'
import "../../css/Teacher/teachers_dashboard.css"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state';
export const Teachersdashboard = () => {
  const navigate = useNavigate();
  const  dbname = useSelector(state =>state.dbname)
  const  collectionname = useSelector(state =>state.collectionname)
  const dispatch=useDispatch();
  const {setpagename,setattendancedata,setqueries}=bindActionCreators(actionCreators,dispatch);

 


  const handleclick = async () => {
    await fetch(`${process.env.REACT_APP_SERVER_URL}/attendancetabledata/${dbname}/${collectionname}`)
      .then(data => (data.json()))
      .then(async (data) => {
        // console.log(data)
        await setattendancedata(data.data);
      })
    navigate("attendance")
    setpagename("Attendance")
    // props.setCurrentPage("attendance")

  }

  const handleclick2 = () => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/api/documents/${dbname}/`)
      .then(response => response.json())
      .then(data => {
          if(data.success){
            // console.log(data.data);
            setqueries(data.data);
            setpagename("Querypage")
            navigate("Querypage")
          }
          else{
            // alert("NO QUERIES")
            // console.log(data.success);
            setqueries([]);
            navigate("Querypage")
          }
      })
      .catch(error => {
        // handle any errors
      });
  }
  const handleclick3 = () => {
    navigate("AttendanceViewer")
  }

  return (
    
        <> 
           <div className="bg"></div>
        <div className="bg bg2"></div>
        <div className="bg bg3"></div>
   
          

          <div className="body">
            <h1>Welcome, Teacher!</h1>

            <section>
              <h2>Take Attendance</h2>
              <p>Click the button below to take attendance for your class.</p>
              <button onClick={handleclick}>Take Attendance</button>
            </section>

            <section>
              <h2>Student Queries</h2>
              <p>Click the button below to view and respond to student queries.</p>
              <button onClick={handleclick2}>Student Queries</button>
            </section>

            <section>
              <h2>Check Attendance</h2>
              <p>Click the button below to check the Attendance of your class.</p>
              <button onClick={handleclick3}>Check Attendance</button>
            </section>

          </div>
          <footer>
            <p>&copy; 2023 Teacher Dashboard</p>
          </footer>
        
    </>
  )
}
