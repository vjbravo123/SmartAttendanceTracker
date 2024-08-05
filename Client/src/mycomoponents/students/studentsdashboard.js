import React from 'react'
import { useEffect } from 'react';
import "../../css/Students/studentsdashboard.css"
import { useSelector } from 'react-redux';
export const Studentsdashboard = () => {
  const dbname=useSelector(state=>state.dbname)
  const attendancce_result=useSelector(state=>state.attendancce_result)
  const presentdays=useSelector(state=>state.presentdays)
  const workingdays=useSelector(state=>state.workingdays)
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the form from reloading the page

    const formData = new FormData(event.target); // Get the form data

    fetch(`${process.env.REACT_APP_SERVER_URL}/students-queries/${dbname}/`, {
      method: 'POST',
      body: JSON.stringify({ name: formData.get('name'), email: formData.get('email'), question:formData.get('question') , roll_no:formData.get('Roll_no') }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then((data) => {
        // let a = JSON.parse(data)
        // if (a.value) {
        //   setCurrentPage("studentslogin")
        // }
        // else {
        //   setCurrentPage("signup")
        //   console.log("false username or paasword")
        // }
        // // Handle the server response here 
        if(data.success){
          alert("Query Submitted",data)
          document.getElementById("myForm").reset();
        }
        // let a = JSON.parse(data)
        // console.log(a.userid)
        // let a = document.getElementById("bc")
        // a.innerHTML= <h1>${data}</h1>

      })
      .catch(error => {
        console.log(`error happened ${error}`)
      });
  };


  const populateTable = (a) => {

    let table = document.getElementById("tullu");
    let tbody = table.getElementsByTagName("tbody")[0];

    for (let i = 0; i < a.length; i++) {
      const row = document.createElement("tr");
      const datestring = document.createElement("td");
      // console.log(a[i].date)
      datestring.textContent = a[i].date;
      row.appendChild(datestring);

      const attendanceCell = document.createElement("td");
      attendanceCell.textContent = a[i].attendance_status;
      row.appendChild(attendanceCell);
      tbody.appendChild(row);

    

    }
  }

  useEffect(() => {
    const table = document.getElementById("tullu");
    const tbody = table.getElementsByTagName("tbody")[0];
  
    if (tbody.children.length === 0) {
    // Only populate the table if it doesn't have any rows
    populateTable(attendancce_result);
    }
  }, );


  return (
    <>
      <header className='heamder'>
        <h1>Student Dashboard</h1>
      </header>


      <main className='sdmain'>
        <section className="attendancce">
          <h2>Attendance</h2>
          <div className="containerr">
            <div className="progress">
              <span className="title timer" data-from="0" data-to={presentdays} data-speed="1800">{presentdays}</span>
              <div className="overlay"></div>
              <div className="left"></div>
              <div className="right"></div>
            </div>
            <div className="status">{presentdays}/{workingdays}</div>
          </div>
          <table id='tullu'>
            <thead>
              <tr>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
            
            </tbody>
          </table>

        </section>

        <section className="query">
          <h2>Ask a Question</h2>
          <form id='myForm' onSubmit={handleSubmit}>
            <div>
              <label htmlFor="name">Name</label>
              <input type="text" id="name" name="name" required />
            </div>
            <div>
              <label htmlFor="email">Email</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div>
              <label htmlFor="Roll_no">Roll_no</label>
              <input type="text" id="Roll_no" name="Roll_no" required />
            </div>
            <div>
              <label htmlFor="question">Question</label>
              <textarea id="question" name="question" rows="5" required></textarea>
            </div>
            <button type="submit">Submit</button>
          </form>
        </section>
      </main>

      <footer className='footerr'>
        <p>&copy; 2023 Student Dashboard</p>
      </footer>
    </>
  )
}

