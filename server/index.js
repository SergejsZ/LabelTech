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
//Fixed issue with git branch problems
// Example route
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.get('/api/users/first', async (req, res) => {
    try {
      const query = 'SELECT UserName FROM users WHERE UserID = 1';
      
      db.query(query, (error, results) => {
        if (error) {
          console.error('Error executing SQL query:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        const user = results[0];
  
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

  app.post('/api/login', async (req, res) => {
    try {
      const { id, password } = req.body;
  
      if (!id || !password) {
        console.error('Invalid request body:', req.body);
        return res.status(400).json({ error: 'Invalid request body' });
      }
  
      console.log('Request body:', req.body);
  
      // Query the database to check if the user with the given id and password exists
      const query = 'SELECT UserID, UserLevel FROM users WHERE UserName = ? AND UserPassword = ?';
  
      db.query(query, [id, password], (error, results) => {
        if (error) {
          console.error('Error executing SQL query:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        const user = results[0];
        if (!user) {
          // User not found
          console.log('User not found');
          return res.status(404).json({ error: 'User not found' });
        }
  
        // User found, redirect based on UserLevel
        if (user.UserLevel === 'admin') {
          return res.json({ redirect: '/admin' });
        } else {
          // Add more conditions based on user roles and corresponding redirects
          return res.json({ redirect: '/admin' });
        }
      });
    } catch (error) {
      console.error('Error processing login request:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.post('/api/products', async (req, res) => {
    try {
      const { productCode, productName, productWeight, productCustomerID, productExpiryDate } = req.body;
  
      // Insert the new product directly
      const addQuery = 'INSERT INTO product (ProductCode, ProductName, ProductWeight, ProductCustomerID, ProductExpiryDate) VALUES (?, ?, ?, ?, ?)';
      db.query(addQuery, [productCode, productName, productWeight, productCustomerID, productExpiryDate], (error, results) => {
        if (error) {
          console.error('Error adding product:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        // Product added successfully
        res.json({ success: true });
      });
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  

  