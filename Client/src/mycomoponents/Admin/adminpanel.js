// AdminPanel.js

import React from 'react';
import '../../css/Admin/adminpanel.css';
import { Link } from 'react-router-dom';

const AdminPanel = () => {
  return (
    <div className="admin-panel">
      <h1>Admin Panel</h1>
      <div className="button-containerr">
        <Link to={"/admin"} className="big-button">Add New Students Data</Link>
        <Link to={"send-signup-ids"} className="big-button">Send Signup ID's</Link>
      </div>
    </div>
  );
};

export default AdminPanel;
