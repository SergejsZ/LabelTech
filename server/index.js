const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 4000;

// MySQL connection configuration
const db = mysql.createConnection({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
});

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// Your routes and other middleware go here

// Example route
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get('/api/users/first', async (req, res) => {
    try {
      // Execute the SQL query to get the first user's username where userid = 1
      const query = 'SELECT UserName FROM users WHERE UserID = 1';
      
      db.query(query, (error, results) => {
        if (error) {
          console.error('Error executing SQL query:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        // Assuming results is an array with the query results
        const user = results[0]; // Get the first result
  
        if (!user) {
          // If no user is found
          return res.status(404).json({ error: 'User not found' });
        }
  
        res.json({ username: user.UserName });
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  