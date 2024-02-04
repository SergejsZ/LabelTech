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
app.put("/api/products/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const { productName, productWeight, productCustomerID, productExpiryDate, productImage } =
      req.body;

    console.log("Request body:", req.body);

    const updateQuery =
      "UPDATE product SET ProductName = ?, ProductWeight = ?, ProductCustomerID = ?, ProductExpiryDate = ? WHERE ProductCode = ?";
    db.query(
      updateQuery,
      [
        productName,
        productWeight,
        productCustomerID,
        productExpiryDate,
        productId,
        productImage,
      ],
      (error, results) => {
        if (error) {
          console.error("Error updating product:", error);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        res.json({ success: true });
      }
    );
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//delete a product
app.delete("/api/products/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    
    console.log("Request body:", req.params);
    
    const deleteQuery = "DELETE FROM `Product` WHERE ProductCode = ?";
    db.query(deleteQuery, [productId], (error, results) => { 
      if (error) {
        console.error("Error deleting product:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      res.json({ success: true });
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//display all products
app.get("/api/products", async (req, res) => {
  try {
    const query =
      'SELECT ProductCode, ProductName, ProductWeight, ProductCustomerID, DATE_FORMAT(ProductExpiryDate, "%Y-%m-%d") AS ProductExpiryDate, ProductImage FROM product';

    db.query(query, (error, results) => {
      if (error) {
        console.error("Error executing SQL query:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      const products = results.map((product) => ({
        productCode: product.ProductCode,
        productName: product.ProductName,
        productWeight: product.ProductWeight,
        productCustomerID: product.ProductCustomerID,
        productExpiryDate: product.ProductExpiryDate,
        productImage: product.ProductImage,
      }));

      res.json(products);
    });
  } catch (error) {
    console.error("Error fetching product data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//login
app.post("/api/login", async (req, res) => {
  try {
    const { id, password } = req.body;

    if (!id || !password) {
      console.error("Invalid request body:", req.body);
      return res.status(400).json({ error: "Invalid request body" });
    }

    const query = "SELECT UserID, UserPassword, UserLevel FROM users WHERE BINARY UserName = ?";

    db.query(query, [id], async (error, results) => {
      if (error) {
        console.error("Error executing SQL query:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      const user = results[0];
      if (!user) {
        console.log("User not found");
        return res.status(404).json({ error: "User not found" });
      }

      const match = await bcrypt.compare(password, user.UserPassword);
      if (!match) {
        return res.status(401).json({ error: "Invalid login credentials" });
      }

      const userLevel = user.UserLevel.toLowerCase();
      if (userLevel === "admin") {
        return res.json({ redirect: "/admin/productManagement" });
      } else if (userLevel === "leader") {
        return res.json({ redirect: "/line_leader" });
      } else {
        return res.json({ redirect: "/quality" });
      }
    });
  } catch (error) {
    console.error("Error processing login request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//add products
app.post("/api/products", async (req, res) => {
  try {
    const {
      productCode,
      productName,
      productWeight,
      productCustomerID,
      productExpiryDate,
      NameImage,
    } = req.body;

    console.log("Request body:", req.body);

    const addQuery =
      "INSERT INTO product (ProductCode, ProductName, ProductWeight, ProductCustomerID, ProductExpiryDate, ProductImage) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(
      addQuery,
      [
        productCode,
        productName,
        productWeight,
        productCustomerID,
        productExpiryDate,
        NameImage,
      ],
      (error, results) => {
        if (error) {
          console.error("Error adding product:", error);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        res.json({ success: true });
      }
    );
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add this route to get all users
app.get("/api/users", async (req, res) => {
  try {
    const query = "SELECT UserID, UserName, UserLevel, UserEmail FROM users";

    db.query(query, (error, results) => {
      if (error) {
        console.error("Error executing SQL query:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      const users = results.map((user) => ({
        id: user.UserID,
        userName: user.UserName,
        userLevel: user.UserLevel,
        userEmail: user.UserEmail,
      }));

      res.json(users);
      console.log(users);
    });
  } catch (error) {
    console.error("Error fetching users data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//delete a user
app.delete("/api/users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    console.log("Request body:", req.params);

    const deleteQuery = "DELETE FROM users WHERE UserID = ?";
    db.query(deleteQuery, [userId], (error, results) => {
      if (error) {
        console.error("Error deleting user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      res.json({ success: true });
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add user
app.post("/api/users", async (req, res) => {
  try {
    const { userName, userPassword, userEmail, userLevel } = req.body;

    const hasUpperCase = /[A-Z]/.test(userPassword);
    const hasLowerCase = /[a-z]/.test(userPassword);
    const hasNumbers = /\d/.test(userPassword);
    const hasSpecialChars = /[\W_]/.test(userPassword);
    const isLongEnough = userPassword.length >= 8;

    if (!hasUpperCase || !hasLowerCase || !hasNumbers || !hasSpecialChars || !isLongEnough) {
      return res.status(400).json({
        error: "Password does not meet the strength criteria. It must be at least 8 characters long and include upper and lower case letters, numbers, and special characters."
      });
    }

    const hashedPassword = await bcrypt.hash(userPassword, 10);

    const addUserQuery = "INSERT INTO users (UserName, UserPassword, UserEmail, UserLevel) VALUES (?, ?, ?, ?)";
    db.query(addUserQuery, [userName, hashedPassword, userEmail, userLevel], (error, results) => {
      if (error) {
        console.error("Error adding user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json({ success: true });
    });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// Edit user
app.put("/api/users/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const { userName, userLevel } = req.body;

    const editUserQuery =
      "UPDATE users SET UserName = ?, UserLevel = ? WHERE UserID = ?";

    db.query(editUserQuery, [userName, userLevel, userId], (error, results) => {
      if (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      res.json({ success: true });
    });
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//display all errors
app.get("/api/errors", async (req, res) => {
  try {
    const query =
      'SELECT `LabelErrorID`, `ProductCode`, `DispatchDate`, `CameraCapture`, `ErrorDispatchDate`, `Output`, `ErrorLine`, `ErrorTime`, `ErrorDate` FROM `LabelErrorHistory` WHERE 1';

    db.query(query, (error, results) => {
      if (error) {
        console.error("Error executing SQL query:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      const errors = results.map((error) => ({
        labelErrorID: error.LabelErrorID,
        productCode: error.ProductCode,
        dispatchDate: error.DispatchDate,
        cameraCapture: error.CameraCapture,
        errorDispatchDate: error.ErrorDispatchDate,
        output: error.Output,
        errorLine: error.ErrorLine,
        errorTime: error.ErrorTime,
        errorDate: error.ErrorDate,
      }));

      res.json(errors);
    });
  } catch (error) {
    console.error("Error fetching product data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


//display LineDetails
app.get("/api/lineDetails", async (req, res) => {
  try {
    const query =
      'SELECT `LineNumber`, `LineLeader`, `State` FROM `ProductionLine` WHERE 1';

    db.query(query, (error, results) => {
      if (error) {
        console.error("Error executing SQL query:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      const lineDetails = results.map((lineDetail) => ({
        number: lineDetail.LineNumber,
        leader: lineDetail.LineLeader,
        state: lineDetail.State,
      }));

      res.json(lineDetails);
    }
    );
  } catch (error) {
    console.error("Error fetching product data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
);

