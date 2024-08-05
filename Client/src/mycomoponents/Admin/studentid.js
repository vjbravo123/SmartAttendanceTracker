import "./admin.css"
import React, { useState, useEffect } from 'react';

const DatabaseComponent = () => {
  const [databases, setDatabases] = useState([]);
  const [selectedDatabase, setSelectedDatabase] = useState('');
  const [studentIds, setStudentIds] = useState([]);
  const [emailInputs, setEmailInputs] = useState({});
  const apiUrl = process.env.REACT_APP_SERVER_URL;

  useEffect(() => {
    const fetchDatabases = async () => {
      try {
        const response = await fetch(`${apiUrl}/getDatabases`);
        const data = await response.json();
        setDatabases(data.databases);
      } catch (error) {
        console.error('Error fetching databases:', error);
      }
    };

    fetchDatabases();
  }, []);

  const handleDatabaseChange = (event) => {
    setSelectedDatabase(event.target.value);
  };

  const handleButtonClick = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/getStudentIds?database=${selectedDatabase}`);
      const data = await response.json();
      setStudentIds(data.studentIds);
      // Initialize emailInputs with empty values for each student
      const initialEmailInputs = {};
      data.studentIds.forEach(student => {
        initialEmailInputs[student.id] = '';
      });
      setEmailInputs(initialEmailInputs);
    } catch (error) {
      console.error('Error fetching student IDs:', error);
    }
  };

  const handleEmailInputChange = (event, studentId) => {
    const { value } = event.target;
    setEmailInputs(prevState => ({
      ...prevState,
      [studentId]: value,
    }));
  };

  const handleSendSignupId  = async (student) => {
    const email = emailInputs[student.id];
    try {
      await fetch(`${apiUrl}/sendEmail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          database: selectedDatabase,
          email,
          studentIds: [`${student.name} - ${student.id}`] // Send specific student IDs
        }),
      });
      console.log(`Email sent for ${student.name} (ID: ${student.id}) to ${email}`);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <>
      <div className="studadm">
        <div className="database-list">
          <h1 style={{ backgroundColor: "#333", color: "#fff", padding: "10px", textAlign: "center" }}>List of Databases</h1>
          <form onSubmit={handleButtonClick}>
            <div style={{ marginBottom: '20px' }}>
              <label htmlFor="selectDatabase" style={{ display: 'block', fontSize: '16px', marginBottom: '5px' }}>Select a Database:</label>
              <select id="selectDatabase" value={selectedDatabase} onChange={handleDatabaseChange} style={{ width: '100%', padding: '10px', fontSize: '16px', border: '1px solid #ccc', borderRadius: '5px' }}>
                <option value="">Select a database</option>
                {databases.map((database, index) => (
                  <option key={index} value={database}>{database}</option>
                ))}
              </select>
            </div>
            <div>
              <button type='submit'>Get students id's</button>
            </div>
          </form>

          {studentIds.length > 0 && (
            <div className='student-ids-section'>
              <header style={{ fontSize: '24px', marginTop: '20px' }}>Student IDs</header>
              {studentIds.map((student, index) => (
                <div key={index}>
                  <p>{student.name} - {student.id}</p>
                  <input
                    type="email"
                    placeholder="Enter email"
                    value={emailInputs[student.id]}
                    onChange={(e) => handleEmailInputChange(e, student.id)}
                    style={{ marginRight: '10px', padding: '5px', fontSize: '14px', border: '1px solid #ccc', borderRadius: '5px' }}
                  />
                  <button onClick={() => handleSendSignupId(student)} style={{ padding: '5px 10px', fontSize: '14px', backgroundColor: '#007bff', color: '#fff', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>Send Signup ID</button>
                </div>
              ))}
            </div>
          )}

        </div>
      </div>
    </>
  );
};

export default DatabaseComponent;


