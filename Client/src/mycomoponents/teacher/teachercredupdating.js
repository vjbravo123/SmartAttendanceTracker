import React, { useState, useEffect } from 'react';
import "../../css/Teacher/tcu.css"
export const Teachercredupdating = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [subject, setSubject] = useState('');
  const [course, setCourse] = useState('');
  const [Year, setYear] = useState('');
  const [subCourse, setSubCourse] = useState('');
  const [subjects, setSubjects] = useState([]);

  function generateCourseCode(subcourse, year) {
    // Remove spaces from subcourse
    var modifiedSubcourse = subcourse.replace(/\s/g, '');
  
    // Combine modified subcourse with the year
    var courseCode = modifiedSubcourse + "_" + year +"_year";
  
    return courseCode;
  }

  const handleSubmit =async (event) => {
    event.preventDefault();
          const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/subjects/${generateCourseCode(subCourse,Year)}/updatingcreds`,{
            method:'POST',
            body:JSON.stringify({Username:username,Password:password,Course:course, Subcourse:generateCourseCode(subCourse,Year),Subject:subject}),
            headers:{
              'Content-Type':'application/json'
            }
          })
          const data =await response.json();
          if(data.value){
            alert(data.msg)
          }
          else{
            alert("ERROR HAPPENED")
          }
  }
      
  

  const fetchSubjects = async () => {

    try {
      console.log(generateCourseCode(subCourse,Year));
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/api/subjects/${generateCourseCode(subCourse,Year)}/subject`);
      const data = await response.json();
      setSubjects(data.subjects);

    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (subCourse) {
      fetchSubjects();
    } else {
      setSubjects([]);
    }
  }, [subCourse]);

  const renderSubCourses = () => {
    if (course === 'B.sc.') {
      return (
        <select
          id="subCourse"
          value={subCourse}
          onChange={(e) => setSubCourse(e.target.value)}
        >
          <option value="">Select Sub Course</option>
          <option value="Bsc phy Sci cs">Bsc phy Sci cs</option>
          <option value="Bsc phy Sci chem">Bsc phy Sci chem</option>
          <option value="B.sc. Hons. Electronics">Bsc Hons Electronics</option>
          <option value="B.sc. Mathematical Science">Bsc Mathematical Science</option>
        </select>
      );
    } else if (course === 'B.com') {
      return (
        <select
          id="subCourse"
          value={subCourse}
          onChange={(e) => setSubCourse(e.target.value)}
        >
          <option value="">Select Sub Course</option>
          <option value="Bcom Hons">BCom Hons</option>
        </select>
      );
    } else if (course === 'B.A.') {
      return (
        <select
          id="subCourse"
          value={subCourse}
          onChange={(e) => setSubCourse(e.target.value)}
        >
          <option value="">Select Sub Course</option>
          <option value="BA_Jrnlsm_Hons">B.A. Jrnlsm Hons</option>
          <option value="BA_Biz_Econ_Hons">B.A. Biz Econ Hons</option>
          <option value="BA_Eng_Hons">B.A. Eng Hons</option>
          <option value="BA_Pol_Sci_Hons">B.A. Pol Sci Hons</option>
          <option value="BA_OMSP_Math">B.A. (OMSP, Math)</option>
          <option value="BA_Hindi_Hons">B.A. Hindi Hons</option>
          <option value="BA_Comp_Appl_Pol_Sci">B.A. (Comp Appl, Pol Sci)</option>
          <option value="BA_Hindi_Hist">B.A. (Hindi, Hist)</option>
          <option value="BA_OMSP_Hist">B.A. (OMSP, Hist)</option>
          <option value="BA_Comp_Appl_Econ">B.A. (Comp Appl, Econ)</option>
          <option value="BA_Comp_Appl_Math">B.A. (Comp Appl, Math)</option>
          <option value="BA_Eng_Econ">B.A. (Eng, Econ)</option>
          <option value="BA_OMSP_Econ">B.A. (OMSP, Econ)</option>
          <option value="BA_Eng_Math">B.A. (Eng, Math)</option>
          <option value="BA_Eng_Hist">B.A. (Eng, Hist)</option>
          <option value="BA_Comp_Appl_Hist">B.A. (Comp Appl, Hist)</option>
          <option value="BA_OMSP_Pol_Sci">B.A. (OMSP, Pol Sci)</option>
          <option value="BA_Hindi_Math">B.A. (Hindi, Math)</option>
          <option value="BA_Hindi_Econ">B.A. (Hindi, Econ)</option>
          <option value="BA_Hindi_Pol_Sci">B.A. (Hindi, Pol Sci)</option>
          <option value="BA_Eng_Pol_Sci">B.A. (Eng, Pol Sci)</option>
        </select>
      );
    } else {
      return (
        <select disabled>
          <option value="">No SubCourse available</option>
        </select>
      );
    }
  };
  const renderSubjectsDropdown = () => {
    if (subjects.length === 0) {
      return (
        <select disabled>
          <option value="">No subjects available</option>
        </select>
      );
    } else {
      return (
        <select
        id="subject"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
      >
        <option value="">Select Subject</option>
        {subjects.map((subjectName) => (
          <option key={subjectName} value={subjectName}>
            {subjectName}
          </option>
        ))}
      </select>
      );
    }
  };

  


  return (
    <div className="bodi">
      <form onSubmit={handleSubmit}>
        <div id="login-boxx">
          <div className="lefti">
            <h1>Details</h1>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="Year">Year:</label>
              <select
                id="Year"
                value={Year}
                onChange={(e) => setYear(e.target.value)}
              >
                <option value="">Select Year</option>
                <option value="1st">1st</option>
                <option value="2nd">2nd</option>
                <option value="3rd">3rd</option>
              </select>
            </div>
          </div>
          <div className="righti">
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="course">Course:</label>
              <select
                id="course"
                value={course}
                onChange={(e) => setCourse(e.target.value)}
              >
                <option value="">Select Course</option>
                <option value="B.sc.">B.sc.</option>
                <option value="B.com">B.com</option>
                <option value="B.A.">B.A.</option>
              </select>
            </div>
            <div>
              <label htmlFor="subCourse">Sub Course:</label>
              {renderSubCourses()}
            </div>
            <div>
              <label htmlFor="subject">Subject:</label>
              {renderSubjectsDropdown()}
            </div>
          </div>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};