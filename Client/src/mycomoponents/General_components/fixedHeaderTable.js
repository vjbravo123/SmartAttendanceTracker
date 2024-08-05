import React from 'react';

export const FixedHeaderTable = ({ header, data, handleCheckboxClick }) => {
  const currentDate = new Date();
  const d = currentDate.getDate();
  const m = currentDate.getMonth() + 1;
  const y = currentDate.getFullYear();
  const formattedDate = `${d} / ${m} / ${y}`;

  // FixedHeaderTable component
return (
  <div className="table-container">
    <table className="fixed-header-table">
      <thead>{header}</thead>
      <tbody>
        {data.map((item, index) => (
          <tr key={index}><td>{item.sno}</td>
            <td>{item.year}</td>
            <td>{item.roll_no}</td>
            <td>{item.name}</td>
            <td>{formattedDate}</td>
            <td><input type="checkbox" name="attendance_status[]" value="present" className="attendance-checkbox" onClick={handleCheckboxClick} /></td></tr>
        ))}
      </tbody>
    </table>
  </div>
);

};
