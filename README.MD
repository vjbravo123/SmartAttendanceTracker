SmartAttendanceTracker

SmartAttendanceTracker is a comprehensive MERN stack application designed for managing student attendance. The application provides robust features for recording, tracking, and analyzing attendance data, making it user-friendly for both students and administrators.
Project Structure

    Client: Frontend of the application built with React.
    Server: Backend of the application built with Express.js.

Setup Instructions

To set up and run the SmartAttendanceTracker application, follow these steps:
Prerequisites

    MongoDB Database: Create a MongoDB database and obtain the connection string.
    Gmail App Password: Generate an app password for Gmail.

Configuration

    Environment Variables: Create a .env file in the Server directory and add the following variables:

    plaintext

    MONGODB_URI=your_mongodb_connection_string
    EMAIL_PASSWORD=your_gmail_app_password

Backend Setup

    Navigate to the Server directory:

    bash

cd Server

Install the required dependencies:

bash

npm install

Initialize the database:

bash

node InitializeDatabase.js

Start the server:

bash

    npm start

Frontend Setup

    Navigate to the Client directory:

    bash

cd Client

Install the required dependencies:

bash

npm install

Create a .env file in the Client directory and add the server URL:

plaintext

REACT_APP_SERVER_URL=http://your-server-url

Start the frontend:

bash

    npm start

Usage

    Access the frontend at http://localhost:3000.
    The backend server will be running at http://localhost:5000 (or your configured port).

Features

    User Authentication: Secure login and registration.
    Attendance Management: Record and track attendance easily.
    Dashboard: Admin and user dashboards for data visualization.
    Notifications: Email notifications for important events.

Technologies Used

    Frontend: React, Redux
    Backend: Node.js, Express.js
    Database: MongoDB
    Authentication: JWT, bcrypt
    Email Service: Nodemailer

Contributing

Contributions are welcome! Please fork this repository and submit pull requests.
License

This project is licensed under the MIT License. See the LICENSE file for details.
Contact

For any inquiries, please contact vjoshii822@gmail.com