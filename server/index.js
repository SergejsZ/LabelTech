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

// app.get('/api/users/first', async (req, res) => {
//     try {
//       const query = 'SELECT UserName FROM users WHERE UserID = 1';
      
//       db.query(query, (error, results) => {
//         if (error) {
//           console.error('Error executing SQL query:', error);
//           return res.status(500).json({ error: 'Internal Server Error' });
//         }
  
//         const user = results[0];
  
//         if (!user) {
//           return res.status(404).json({ error: 'User not found' });
//         }
  
//         res.json({ username: user.UserName });
//       });
//     } catch (error) {
//       console.error('Error fetching user data:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });

  //edit a product
  app.put('/api/products/:productId', async (req, res) => {
    try {
      const { productId } = req.params;
      const { productName, productWeight, productCustomerID, productExpiryDate } = req.body;
  
      const updateQuery = 'UPDATE product SET ProductName = ?, ProductWeight = ?, ProductCustomerID = ?, ProductExpiryDate = ? WHERE ProductCode = ?';
      db.query(updateQuery, [productName, productWeight, productCustomerID, productExpiryDate, productId], (error, results) => {
        if (error) {
          console.error('Error updating product:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        res.json({ success: true });
      });
    } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  //delete a product
  app.delete('/api/products/:productId', async (req, res) => {
  try {
    const { productId } = req.params;

    const deleteQuery = 'DELETE FROM product WHERE ProductCode = ?';
    db.query(deleteQuery, [productId], (error, results) => {
      if (error) {
        console.error('Error deleting product:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      res.json({ success: true });
    });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
  });

  //display all products
  app.get('/api/products', async (req, res) => {
    try {
      const query = 'SELECT ProductCode, ProductName, ProductWeight, ProductCustomerID, DATE_FORMAT(ProductExpiryDate, "%Y-%m-%d") AS ProductExpiryDate FROM product';
  
      db.query(query, (error, results) => {
        if (error) {
          console.error('Error executing SQL query:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        const products = results.map(product => ({
          productCode: product.ProductCode,
          productName: product.ProductName,
          productWeight: product.ProductWeight,
          productCustomerID: product.ProductCustomerID,
          productExpiryDate: product.ProductExpiryDate
        }));
  
        res.json(products);
      });
    } catch (error) {
      console.error('Error fetching product data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
  //login
  app.post('/api/login', async (req, res) => {
    try {
      const { id, password } = req.body;
  
      if (!id || !password) {
        console.error('Invalid request body:', req.body);
        return res.status(400).json({ error: 'Invalid request body' });
      }
  
      console.log('Request body:', req.body);
  
      const query = 'SELECT UserID, UserLevel FROM users WHERE BINARY UserName = ? AND UserPassword = ?';
  
      db.query(query, [id, password], (error, results) => {
        if (error) {
          console.error('Error executing SQL query:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        const user = results[0];
        if (!user) {
          console.log('User not found');
          return res.status(404).json({ error: 'User not found' });
        }
  
        if (user.UserLevel === 'admin') {
          return res.json({ redirect: '/admin' });
        } else {
          return res.json({ redirect: '/admin' });
        }
      });
    } catch (error) {
      console.error('Error processing login request:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  //add products
  app.post('/api/products', async (req, res) => {
    try {
      const { productCode, productName, productWeight, productCustomerID, productExpiryDate } = req.body;
  
      const addQuery = 'INSERT INTO product (ProductCode, ProductName, ProductWeight, ProductCustomerID, ProductExpiryDate) VALUES (?, ?, ?, ?, ?)';
      db.query(addQuery, [productCode, productName, productWeight, productCustomerID, productExpiryDate], (error, results) => {
        if (error) {
          console.error('Error adding product:', error);
          return res.status(500).json({ error: 'Internal Server Error' });
        }
  
        res.json({ success: true });
      });
    } catch (error) {
      console.error('Error adding product:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  

  