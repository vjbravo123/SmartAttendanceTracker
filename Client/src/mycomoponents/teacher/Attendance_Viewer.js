import React, { useState, useEffect } from 'react';
import "../../css/Teacher/att.css";
import { useSelector } from 'react-redux';

export const AttendanceViewer = () => {
  const dbname=useSelector(state=>state.dbname)
  const collectionname=useSelector(state=>state.collectionname)
  const [data, setData] = useState([]);
  const apiUrl = process.env.REACT_APP_SERVER_URL;
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());

  useEffect(() => {
    // console.log(dbname,collectionname);
    const fetchData = async () => {
      // const year = new Date().getFullYear();
      const month = currentMonth;
      const url = `${apiUrl}/api/collections/${dbname}/${collectionname}/?month=${month}`;
      try {
        const studentsData = await fetch(url);
        const parsedData = await studentsData.json();
        // console.log(parsedData);

        if (Array.isArray(parsedData)) {
          const sortedData = parsedData.sort((a, b) => a.sno - b.sno);
          setData(sortedData);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, [currentMonth, dbname, collectionname]);

  const getDateAttendance = (student, date) => {
    const dateString = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
    const attendanceData = student[dateString];
    if (attendanceData) {
      return attendanceData;
    }
    return "";
  };

  const getStatusDisplay = (attendanceStatus) => {
    if (attendanceStatus.includes("PP")) return "PP";
    if (attendanceStatus.includes("AP")) return "AP";
    if (attendanceStatus.includes("AA")) return "AA";
    if (attendanceStatus.includes("PA")) return "PA";
    if (attendanceStatus.includes("Absent")) return "A";
    if (attendanceStatus.includes("Present")) return "P";
    return "";
  };

  const getTotalPresents = (student) => {
    return student.Total_Present;
  };

  const handlePreviousMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
  };
  
  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
  };
  

  return (
    <>
     <div className="table-container">
      <table className="tulla">
        <thead>
          <tr>
            <th>Sno</th>
            <th>Name</th>
            {[...Array(31).keys()].map((date) => (
              <th key={date}>{date + 1}</th>
            ))}
            <th>Total Present</th>
          </tr>
        </thead>
        <tbody>
          {data.map((student, index) => (
            <tr key={index}>
              <td>{student.sno}</td>
              <td>{student.name}</td>
              {[...Array(31).keys()].map((date) => {
                const currentDate = new Date();
                const currentYear = currentDate.getFullYear();
                const month = currentMonth;
                const year = currentYear;

                const nextDate = new Date(year, month, date + 1);
                const attendanceStatus = getDateAttendance(student, nextDate);
                const statusDisplay = getStatusDisplay(attendanceStatus);
                return <td key={date}>{statusDisplay}</td>;
              })}
              <td>{getTotalPresents(student)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>

      <div className="button-container">
        <button className="left-button" onClick={handlePreviousMonth}>
          Previous Month
        </button>
        <button className="right-button" onClick={handleNextMonth}>
          Next Month
        </button>
      </div>
    </>
  );
};
