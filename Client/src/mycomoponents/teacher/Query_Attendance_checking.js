import React from "react";
import "../../css/Teacher/query_resolving.css"
import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators } from "../../state";
export const Queryresolver = () => {
 const dispatch=useDispatch();
 const {setqueriedattendance,makealert}=bindActionCreators(actionCreators,dispatch);
 const dbname = useSelector(state=>state.dbname)
 const collectionname = useSelector(state=>state.collectionname)
 const queried_attendance = useSelector(state=>state.queried_attendance)


 const handleAttendanceChange = (index, field, value) => {
  // Create a shallow copy of the queried_attendance array
  const newAttendance = [...queried_attendance];
  // Create a shallow copy of the object being modified
  const updatedAttendance = { ...newAttendance[index] };
  // Update the specified field in the copied object
  updatedAttendance[field] = value;
  // Update the copied array with the modified object at the specified index
  newAttendance[index] = updatedAttendance;
  // Call setqueriedattendance with the new array
  setqueriedattendance(newAttendance);
};


const handleSaveAttendance = () => {
  fetch(`${process.env.REACT_APP_SERVER_URL}/queriedattendancechange/${dbname}/${collectionname}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(queried_attendance)
  })
  .then(response => response.text())
  .then(data => {
    console.log(data);
    makealert("Attendance Updated Successfully","success")
  })
  .catch(error => {
    console.error(error);
  });
};


  return (
    <div className="attendance">
      <h2>Attendance</h2>
      <table>
        <thead>
          <tr>
            <th>Roll No.</th>
            <th>Date</th>
            <th>Attendance Status</th>
            <th>Change Attendance Status</th>
          </tr>
        </thead>
        <tbody>
          {queried_attendance.map((student, index) => (
            <tr key={index}>
              <td>{student.roll_no}</td>
              <td>{student.date}</td>
              <td>{student.attendance_status}</td>
              <td>
                <select
                  value={student.attendance_status}
                  onChange={(e) =>
                    handleAttendanceChange(
                      index,
                      "attendance_status",
                      e.target.value
                    )
                  }
                >
                  <option value="Present">Present</option>
                  <option value="Absent">Absent</option>
                </select>
                <button onClick={handleSaveAttendance}>Save</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};