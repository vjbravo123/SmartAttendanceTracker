import React, { useEffect, useState } from "react";
import "../../css/Teacher/query.css"
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";
export const Querypage = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const [queriespresent, setqueriespresent] = useState(false)
  const {makealert,setqueriedattendance,setpagename}=bindActionCreators(actionCreators,dispatch);
  const dbname=useSelector(state=>state.dbname)
  const collectionname=useSelector(state=>state.collectionname)
  const queries=useSelector(state=>state.queries)


  useEffect(() => {
    if (queries.length !== 0) {
      setqueriespresent(true)
    }
// eslint-disable-next-line
  }, [])

  const handleResolveQuery = (roll_no) => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/querydelete/${dbname}`, {
      method: 'POST',
      body: JSON.stringify({ roll_no: roll_no }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(async (data) => {
        console.log(data)
        makealert(data.message, "success")

      })
  }

  const handleCheckAttendance = (rollNo) => {
    fetch(`${process.env.REACT_APP_SERVER_URL}/queryattendance/${dbname}/${collectionname}`, {
      method: 'POST',
      body: JSON.stringify({ roll_no: rollNo }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(async (data) => {
        // Handle the server response here
        // let a = JSON.parse(data);

        console.log("attendance check button is clicked response from server is :", data.attendance)
        await setqueriedattendance(data.attendance);
      }
      )


    // setCurrentPage("Queryresolverpage");
    navigate("Queryresolverpage")
    setpagename("Queryresolverpage")
    // setroll_no(rollNo);
    // TODO: implement logic to check attendance for the given roll number
  }

  return (
    <>


      <div className="area" >
        <ul className="circles">
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
      </div >


      {queriespresent ? <div className="dimv">
        <h2>Student Queries</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Roll No.</th>
              <th>Email</th>
              <th>Query</th>
              <th>Check Attendance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {queries.map((query, index) => (
              <tr key={index}>
                <td>{query.name}</td>
                <td>{query.roll_no}</td>
                <td>{query.email}</td>
                <td>{query.question}</td>
                <td>
                  <button className="btn-sm btn-info" onClick={() => handleCheckAttendance(query.roll_no)}>Check</button>
                </td>
                <td>
                  {query.resolved ? (
                    <span>Resolved</span>
                  ) : (
                    <button className="btn-sm btn-info" onClick={() => handleResolveQuery(query.roll_no)}>Resolve</button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div> : <h1 className="d-flex" style={{ justifyContent: 'center', height: '100vh', width: '100vw', color: "lightblue", marginTop: '30vh' }}>No queries to display</h1>}






    </>
  );
};
