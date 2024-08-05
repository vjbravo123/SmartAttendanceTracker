import React, { useState } from 'react';
import "../../css/Teacher/attendence.css"
import { FixedHeaderTable } from '../General_components/fixedHeaderTable';
import { useDispatch, useSelector } from 'react-redux';
import { bindActionCreators } from 'redux';
import { actionCreators } from '../../state';
export const Attendancepage = () => {
  const dbname  = useSelector(state=>state.dbname)
  const attendance_data  = useSelector(state=>state.attendance_data)
  const collectionname  = useSelector(state=>state.collectionname)
  const dispatch = useDispatch();
  const {makealert} = bindActionCreators(actionCreators,dispatch);
  const [present, setPresent] = useState([]);
  const [isDownloading, setIsDownloading] = useState(false);
  const data = attendance_data;


  const handleCheckboxClick = (event) => {
    const checkbox = event.target;
    if (checkbox.checked) {
      const row = checkbox.parentNode.parentNode;
      const sno = row.cells[0].textContent;
      const roll_no = row.cells[2].textContent;

      // const obj = { roll_no:roll_no };
      const obj = { sno: parseInt(sno), roll_no: roll_no };
      setPresent((prevPresent) => [...prevPresent, obj]);
    }
  };


  const handleDownloadagain = async () => {
    const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/attendance/${dbname}/${collectionname}/again`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(present)
    });


    if (response.ok) {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const downloadLink = document.createElement('a');
      downloadLink.href = url;
      downloadLink.download = 'attendance.xlsx';
      downloadLink.click();
      setIsDownloading(false);
      makealert("Excel file downloaded successfully.","success")

    }
    else {
      console.log('Server error:', response.status);
      setIsDownloading(false);
    }

  }
  const handleDownload = async () => {
    // console.log(present);
    setIsDownloading(true);
  
    try {
      const response = await fetch(`${process.env.REACT_APP_SERVER_URL}/attendance/${dbname}/${collectionname}/first`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/octet-stream', // Indicate that you expect binary data
        },
        body: JSON.stringify(present)
      });
  
      if (response.ok) {
        const buffer = await response.arrayBuffer();
        const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = URL.createObjectURL(blob);
        const downloadLink = document.createElement('a');
        downloadLink.href = url;
        downloadLink.download = 'attendance.xlsx';
        downloadLink.click();
        setIsDownloading(false);
        // alert("Excel file downloaded successfully.");
        makealert("Excel file downloaded successfully.","success")
     
      }
      else if(response.status===500){
        let obj = await response.json()
        setIsDownloading(false);
      
        makealert(obj.message,"warning")
        
      }
      else {
        setIsDownloading(false);
        makealert(`Server error: ${response.status}`,"warning")
      }
    } catch (error) {
      makealert(error,"danger")
      setIsDownloading(false);
    }
  };
  

  const header = (
    <tr><th>S.NO.</th>
      <th>YEAR</th>
      <th>ROLL NO.</th>
      <th>NAME</th>
      <th>DATE</th>
      <th>ATTENDANCE STATUS</th></tr>
  );



  return (
    <>
      <div className="tb">
        <div className="table-container2">
          <FixedHeaderTable header={header} data={data} handleCheckboxClick={handleCheckboxClick} />
        </div>

        <div className="flexxx">
          <div className='downbtn'>
            <button onClick={handleDownloadagain}>Take Attendance Again</button>
          </div>

          <div className='downbtn' style={{ marginRight: "150px" }}>
            <button onClick={handleDownload} disabled={isDownloading} >{isDownloading ? "Downloading..." : "Download Excel File"}</button>
          </div>
        </div>


      </div>

    </>
  );
}


