const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcryptjs');
require('dotenv').config();

const uri = process.env.MONGODB_URI; // Make sure to set this in your .env file
console.log('Mongo URI:', uri); // Check if the URI is being logged correctly

// Sample student data
const studentData = [
  { _id: '65b5153553bd996069d21e8b', sno: 5, year: 'III', roll_no: '21/490', name: 'Abhishek Rana' },
  // Add more student data as needed
];

// Function to initialize the database
const initializeDatabase = async () => {
  const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

  try {
    // Connect to the MongoDB server
    await client.connect();
    console.log('Connected to MongoDB');

    // Create databases and collections
    const dbNames = [
      'BscphyScics_3rd_year',
      'Credentials'
    ];

    const collections = {
      'BscphyScics_3rd_year': ['cs', 'maths', 'physics', 'students_details', 'students_query'],
      'Credentials': ['Teachers', 'datalogger', 'students', 'users']
    };

    // Initialize databases and collections
    for (const dbName of dbNames) {
      const db = client.db(dbName);
      const collectionNames = collections[dbName] || [];
      
      for (const collectionName of collectionNames) {
        await db.createCollection(collectionName);
        console.log(`Created collection '${collectionName}' in database '${dbName}'`);
      }
    }

    // Initialize credentials in datalogger collection
    const credentialsDb = client.db('Credentials');
    const dataloggerCollection = credentialsDb.collection('datalogger');
    const credentials = [
      {
        Username: 'teacher',
        Password: await bcrypt.hash('pass', 10) // Hashing password with bcrypt
      },
      {
        Username: 'admin',
        Password: await bcrypt.hash('pass', 10) // Hashing password with bcrypt
      }
    ];
    await dataloggerCollection.insertMany(credentials);
    console.log('Database initialized with credentials in datalogger collection');

    // Initialize student data
    const studentsDetailsDb = client.db('BscphyScics_3rd_year');
    const studentsDetailsCollection = studentsDetailsDb.collection('students_details');
    await studentsDetailsCollection.insertMany(studentData);
    console.log('Database initialized with student documents');

  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    // Close the connection
    await client.close();
  }
};

// Run the initialization script
initializeDatabase();
