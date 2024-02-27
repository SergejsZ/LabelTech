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
    const { productCode, productName, productWeight, productCustomerID, productExpiryDate, productUrl } =
      req.body;

    const updateQuery = "UPDATE product SET ProductCode = ?, ProductName = ?, ProductWeight = ?, ProductCustomerID = ?, ProductExpiryDate = ?, ProductImageURL = ? WHERE ProductId = ?";
    db.query(updateQuery, [productCode, productName, productWeight, productCustomerID, productExpiryDate, productUrl, productId], (error, results) => {
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
      'SELECT ProductId, ProductCode, ProductName, ProductWeight, ProductCustomerID, DATE_FORMAT(ProductExpiryDate, "%Y-%m-%d") AS ProductExpiryDate, ProductImageURL FROM product';
      //'SELECT ProductCode, ProductName, ProductWeight, ProductCustomerID, DATE_FORMAT(ProductExpiryDate, "%Y-%m-%d") AS ProductExpiryDate, ProductImageURL FROM product';

    db.query(query, (error, results) => {
      if (error) {
        console.error("Error executing SQL query:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      const products = results.map((product) => ({

        productId: product.ProductId,
        productCode: product.ProductCode,
        productName: product.ProductName,
        productWeight: product.ProductWeight,
        productCustomerID: product.ProductCustomerID,
        productExpiryDate: product.ProductExpiryDate,
        productUrl: product.ProductImageURL,
        
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
      productUrl,
    } = req.body;

    console.log("Request body:", req.body);

    const addQuery =
      "INSERT INTO product (ProductCode, ProductName, ProductWeight, ProductCustomerID, ProductExpiryDate, ProductImageURL) VALUES (?, ?, ?, ?, ?, ?)";
    db.query(
      addQuery,
      [
        productCode,
        productName,
        productWeight,
        productCustomerID,
        productExpiryDate,
        productUrl,
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

    const checkQuery = "SELECT * FROM ProductionLine WHERE LineLeader = ?";
    db.query(checkQuery, [userId], (error, results) => {
      if (error) {
        console.error("Error checking user:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (results.length > 0) {
        // return a list with all the results
        console.log(results[0].LineLeader);
        console.log("User is associated with a production line");
        return res.status(400).json({ error: "User is associated with a production line" });
      }

      const deleteQuery = "DELETE FROM users WHERE UserID = ?";
      db.query(deleteQuery, [userId], (error, results) => {
        if (error) {
          console.error("Error deleting user:", error);
          return res.status(500).json({ error: "Internal Server Error" });
        }

        res.json({ success: true });
      });
    });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//check if user is associated with a production line
app.get("/api/checkUser/:userId", async (req, res) => {
  const { userId } = req.params;
  const checkQuery = "SELECT * FROM ProductionLine WHERE LineLeader = ?";
  db.query(checkQuery, [userId], (error, results) => {
    if (error) {
      console.error("Error checking user:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.length > 0) {
      console.log("User is associated with a production line");
      return res.json({ isAssociated: true });
    } else {
      return res.json({ isAssociated: false });
    }
  });
});

// Add user
app.post("/api/users", async (req, res) => {
  try {
    const { userName, userPassword, userEmail, userLevel } = req.body;

    console.log("Request body:", req.body);

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
    const { userName, userLevel, userEmail } = req.body;

    console.log("Request body:", req.body);

    const editUserQuery =
      "UPDATE users SET UserName = ?, UserLevel = ?, UserEmail = ? WHERE UserID = ?";

    db.query(editUserQuery, [userName, userLevel, userEmail, userId], (error, results) => {
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

//update LineLeader
app.post('/api/line/:lineNumber', async (req, res) => {
  const { lineNumber } = req.params;
  const { lineLeader } = req.body;

  console.log("Request body:", req.body);

  const updateQuery = 'UPDATE `ProductionLine` SET `LineLeader` = ? WHERE `LineNumber` = ?';

  // Assuming db.query returns a promise. If not, you'll need to promisify it or handle it with callbacks.
  try {
    const results = await db.query(updateQuery, [lineLeader, lineNumber]);
    res.json({ success: true });
  } catch (error) {
    console.error('Error updating line leader:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//update LineState
app.post('/api/lineState/', async (req, res) => {
  const { lineNumber } = req.params;
  const { lineState } = req.body;

  console.log("Request body:", req.body);

  try{

    const updateQuery = 'UPDATE `ProductionLine` SET `State` = ? WHERE `LineNumber` = ?';

    db.query(updateQuery, [lineState, lineNumber], (error, results) => {
      if (error) {
        console.error("Error executing SQL query:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json({ success: true });
    }
    );
  } catch (error) {
    console.error("Error fetching product data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
);

//get all customers
app.get("/api/customers", async (req, res) => {

  try {
    const query = "SELECT CustomerID, CustomerName FROM Customer";

    db.query(query, (error, results) => {
      if (error) {
        console.error("Error executing SQL query:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      const customers = results.map((customer) => ({
        CustomerID: customer.CustomerID,
        CustomerName: customer.CustomerName,
      }));

      res.json(customers);
    });
  } catch (error) {
    console.error("Error fetching customers data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//get the quality errors for exporting
app.get('/api/qualityErrors', async (req, res) => {
  try {
      const errorQuery = "SELECT * FROM defects";
      db.query(errorQuery, (error, results) => {
          if (error) {
              return res.status(500).json({ error: "Internal Server Error" });
          }
          res.json(results);
      });
  } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
  }
});

//get the label errors for exporting
app.get('/api/labelErrors', async (req, res) => {
  try {
      const errorQuery = "SELECT * FROM labelerrorhistory";
      db.query(errorQuery, (error, results) => {
          if (error) {
              return res.status(500).json({ error: "Internal Server Error" });
          }
          res.json(results);
      });
  } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
  }
});