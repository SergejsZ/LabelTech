const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const mysql = require("mysql");
require("dotenv").config();

//GCS
const multer = require('multer'); 
const { Storage } = require('@google-cloud/storage');
// GCP Storage Setup
const storage = new Storage();
const bucketName = 'labeltech'; // Replace with your bucket name
const bucket = storage.bucket(bucketName);
// Optional: Multer Configuration (customize as needed)
const upload = multer({ 
  // Example: Store uploads in memory
  storage: multer.memoryStorage(), 
}); 

let intervalId;

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

// Image Upload Route
app.post('/upload-image', upload.single('productImageFile'), async (req, res) => {
  const path = require('path');
  const filename = productImageFile.originalname;

  console.log("test a"+filename);
  const objectName = path.join(filename); 
  // Replace placeholders with your actual values
  // curl -X POST --data-binary @C:\Users\john8\Downloads\${filename} \
  // -H "Authorization: Bearer ya29.a0Ad52N381pilvFY8lEHpAdN3OiPKsY-_KNAAg6YAfbU7sfbILz5hb5y6JLFo7D4XNjMHmN5xl0ZWPGRM1PWTgMl4d36DinvTZqEUKX1E_DUEgWRK-3lCJ4UqLFKUV1_RBz2dTJsKpWpnSwXEHQ5mDdPHHtpYUVQhzDFLQaCgYKAXUSARASFQHGX2MipZy3Jq-UqOlrpo3IGxNGpQ0171" \ 
  // -H "Content-Type: ${productImageFile.mimetype}" \  // Replace with your image's content type
  // "https://storage.googleapis.com/upload/storage/v1/b/labeltech/o?uploadType=media&name=${filename}" 


  console.log("Incoming Request (req):", req); // Log the entire request object

  try {
    if (!req.file) {
      return res.status(400).send('Please select an image to upload');
    } 

    console.log("Parsed File Object (req.file):", req.file); // Log file object

    const blob = bucket.file(req.file.originalname);
    const blobStream = blob.createWriteStream({
      resumable: false,
      metadata: { contentType: req.file.mimetype }
    });

    blobStream.on('error', err => {
      console.error("Upload Error:", err);
      res.status(500).send('Error uploading image'); 
    });

    blobStream.on('finish', () => {
      const publicUrl = `https://storage.googleapis.com/${bucketName}/${req.file.originalname}`;
      res.status(200).send({ imageUrl: publicUrl });
    });

    blobStream.end(req.file.buffer); 

  } catch (error) {
    console.error("Error handling upload:", error);
    res.status(500).send('Error uploading image');
  }
});

//Charts
// Endpoint to get product data
// app.get('/api/productData', (req, res) => {
//   // Query to get latest values of TotalScanned and TotalNumberErrors
//   const query = "SELECT TotalScanned, TotalNumberErrors FROM productsscannedlog";

//   db.query(query, (error, results) => {
//     if (error) {
//       console.error("Error fetching product data:", error);
//       return res.status(500).json({ error: "Internal Server Error" });
//     }

//     // Extract TotalScanned and TotalNumberErrors from the result
//     const { TotalScanned, TotalNumberErrors } = results[0];

//     res.json({ TotalScanned, TotalNumberErrors });
//   });
// });

// Endpoint to get product data for the first 5 rows
app.get('/api/productData', (req, res) => {
  // Query to get the first 5 rows of product data
  const query = "SELECT TotalScanned, TotalNumberErrors FROM productsscannedlog LIMIT 10";

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching product data:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    // Send the results as JSON response
    res.json(results);
  });
});

// Endpoint to get product data for the Line 1 performace for week 14
app.get('/api/invidualLineData', (req, res) => {

  const query = "SELECT TotalScanned, TotalNumberErrors FROM productsscannedlog where ProductScannedCode = 31";

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching product data:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    // Send the results as JSON response
    res.json(results);
  });
});


// Endpoint for stopping the simulation
app.post("/api/simulation/stop", async (req, res) => {
  try {
    // Clear the intervals to stop updating TotalScanned and TotalNumberErrors
    clearInterval(scanIntervalId);
    clearInterval(errorUpdateIntervalId);
    res.json({ success: true, message: "Simulation stopped" });
    console.log("Simulation stopped");
  } catch (error) {
    console.error("Error stopping simulation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/simulation/stop/:line", async (req, res) => {
  try {
    const selectedLine = req.params.line;
    // Clear the intervals associated with the selected line
    clearInterval(scanIntervalId[selectedLine]);
    clearInterval(errorUpdateIntervalId[selectedLine]);
    res.json({ success: true, message: "Simulation stopped" });
    console.log("Simulation stopped");
  } catch (error) {
    console.error("Error stopping simulation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


//Simulation 1 Line
let scanIntervalId; // Declare scanIntervalId variable globally
let errorUpdateIntervalId; // Declare errorUpdateIntervalId variable globally

// Endpoint for starting the simulation by inserting a row and updating TotalScanned and having an error after minute
// 1 line scanning every 2 seconds, error after 1 minute, based on analysis intervention after 8 seconds -> stop the line
app.post("/api/systemSimulation1", async (req, res) => {
  try {
    // const insertQuery = "INSERT INTO Productsscannedlog (ProductScannedCode, ProductScannedDate, TotalScanned, TotalNumberErrors) VALUES (?, ?, ?, ?)";
    // const insertValues = [4, '2023-04-12', 0, 0];

    db.query(
       (insertError, insertResults) => {
      // if (insertError) {
      //   console.error("Error inserting row:", insertError);
      //   return res.status(500).json({ error: "Internal Server Error" });
      // }

      //update TotalScanned every 2 seconds
      scanIntervalId = setInterval(() => {
        const updateQuery = "UPDATE Productsscannedlog SET TotalScanned = TotalScanned + 1 WHERE ProductScannedCode = ?";
        const updateValues = [88];

        db.query(updateQuery, updateValues, (updateError, updateResults) => {
          if (updateError) {
            console.error("Error updating TotalScanned:", updateError);
            clearInterval(scanIntervalId); // Stop the interval if an error occurs
            return res.status(500).json({ error: "Internal Server Error" });
          }
        });
      }, 2000);

      //loop to execute the error update query four times with a 2-second delay between each execution
      setTimeout(() => {
      
        errorUpdateIntervalId = setInterval(() => {
        

          const updateQuery = "UPDATE Productsscannedlog SET TotalNumberErrors = TotalNumberErrors + 1 WHERE ProductScannedCode = ?";
          const updateValues = [88];

          db.query(updateQuery, updateValues, (updateError, updateResults) => {
            if (updateError) {
              console.error("Error updating TotalNumberErrors:", updateError);
              clearInterval(scanIntervalId); // Stop the scan interval if an error occurs
              clearInterval(errorUpdateIntervalId); // Stop the error update interval if an error occurs
              return res.status(500).json({ error: "Internal Server Error" });
            }
          });

         
        }, 2000); 
      }, 60000); 

      res.json({ success: true, message: "Simulation started" });
      console.error("Simulation started");
    });
  } catch (error) {
    console.error("Error starting simulation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/startLine/:line", async (req, res) => {
  try {
    const selectedLine = req.params.line;
    const lineCodeMap = {
      Line1: 11,
      Line2: 12,
      Line3: 13,
      Line4: 14,
      Line5: 15,
      Line6: 16,
      Line7: 17,
      Line8: 18,
      Line9: 19,
      Line10: 20,
    };

    const lineCode = lineCodeMap[selectedLine];
    if (!lineCode) {
      return res.status(400).json({ error: "Invalid line" });
    }

    db.query(
      (insertError, insertResults) => {
        // update TotalScanned every 2 seconds
        const scanIntervalId = setInterval(() => {
          const updateQuery = "UPDATE Productsscannedlog SET TotalScanned = TotalScanned + 1 WHERE ProductScannedCode = ?";
          const updateValues = [lineCode];
          db.query(updateQuery, updateValues, (updateError, updateResults) => {
            if (updateError) {
              console.error("Error updating TotalScanned:", updateError);
              clearInterval(scanIntervalId); // Stop the interval if an error occurs
              return res.status(500).json({ error: "Internal Server Error" });
            }
          });
        }, 2000);

        // loop to execute the error update query four times with a 2-second delay between each execution
        setTimeout(() => {
          const errorUpdateIntervalId = setInterval(() => {
            const updateQuery = "UPDATE Productsscannedlog SET TotalNumberErrors = TotalNumberErrors + 1 WHERE ProductScannedCode = ?";
            const updateValues = [lineCode];
            db.query(updateQuery, updateValues, (updateError, updateResults) => {
              if (updateError) {
                console.error("Error updating TotalNumberErrors:", updateError);
                clearInterval(scanIntervalId); // Stop the scan interval if an error occurs
                clearInterval(errorUpdateIntervalId); // Stop the error update interval if an error occurs
                return res.status(500).json({ error: "Internal Server Error" });
              }
            });
          }, 2000);
        }, 60000);

        res.json({ success: true, message: "Simulation started" });
        console.log("Simulation started");
      }
    );
  } catch (error) {
    console.error("Error starting simulation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post("/api/systemSimulation2", async (req, res) => {
  try {
    // const insertQuery = "INSERT INTO productsscannedlog (ProductScannedCode, ProductScannedDate, TotalScanned, TotalNumberErrors) VALUES (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?)";
    // const insertValues = [5, '2023-04-12', 0, 0, 6, '2023-04-12', 0, 0, 7, '2023-04-12', 0, 0, 8, '2023-04-12', 0, 0, 10, '2023-04-12', 0, 0];

    // db.query(insertQuery, insertValues, (insertError, insertResults) => {
    //   if (insertError) {
    //     console.error("Error inserting rows:", insertError);
    //     return res.status(500).json({ error: "Internal Server Error" });
    //   }

     db.query((insertError, insertResults) => {
      // if (insertError) {
      //   console.error("Error inserting rows:", insertError);
      //   return res.status(500).json({ error: "Internal Server Error" });
      // }

      scanIntervalId = setInterval(() => {
        const updateQueries = [
          "UPDATE productsscannedlog SET TotalScanned = TotalScanned + 1 WHERE ProductScannedCode IN (?, ?, ?, ?, ?)",
        ];
        const updateValues = [5, 6, 7, 8, 10];

        db.query(updateQueries.join(';'), updateValues, (updateError, updateResults) => {
          if (updateError) {
            console.error("Error updating TotalScanned:", updateError);
            clearInterval(scanIntervalId); 
            return res.status(500).json({ error: "Internal Server Error" });
          }
        });
      }, 2000); 

      setTimeout(() => {
        errorUpdateIntervalId = setInterval(() => {
          const errorUpdateQueries = [
            "UPDATE productsscannedlog SET TotalNumberErrors = TotalNumberErrors + 1 WHERE ProductScannedCode IN (?, ?, ?, ?, ?)",
          ];
          const errorUpdateValues = [5, 6, 7, 8, 10];

          db.query(errorUpdateQueries.join(';'), errorUpdateValues, (updateError, updateResults) => {
            if (updateError) {
              console.error("Error updating TotalNumberErrors:", updateError);
              clearInterval(errorUpdateIntervalId); 
              return res.status(500).json({ error: "Internal Server Error" });
            }
          });
        }, 2000);
      }, 60000);

      res.json({ success: true, message: "Simulation started" });
      console.error("Simulation started");
    }); 
  } catch (error) {
    console.error("Error starting simulation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/api/systemSimulation3", async (req, res) => {
  try {
    // const insertQuery = "INSERT INTO productsscannedlog (ProductScannedCode, ProductScannedDate, TotalScanned, TotalNumberErrors) VALUES (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?), (?, ?, ?, ?)";
    // const insertValues = [5, '2023-04-12', 0, 0, 6, '2023-04-12', 0, 0, 7, '2023-04-12', 0, 0, 8, '2023-04-12', 0, 0, 10, '2023-04-12', 0, 0];

    // db.query(insertQuery, insertValues, (insertError, insertResults) => {
    //   if (insertError) {
    //     console.error("Error inserting rows:", insertError);
    //     return res.status(500).json({ error: "Internal Server Error" });
    //   }

      db.query((insertError, insertResults) => {
        // if (insertError) {
        //   console.error("Error inserting rows:", insertError);
        //   return res.status(500).json({ error: "Internal Server Error" });
        // }

      scanIntervalId = setInterval(() => {
        const updateQueries = [
          "UPDATE productsscannedlog SET TotalScanned = TotalScanned + 1 WHERE ProductScannedCode IN (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        ];
        const updateValues = [1, 2, 3, 4, 5, 6, 7, 8, 10, 88];

        db.query(updateQueries.join(';'), updateValues, (updateError, updateResults) => {
          if (updateError) {
            console.error("Error updating TotalScanned:", updateError);
            clearInterval(scanIntervalId); 
            return res.status(500).json({ error: "Internal Server Error" });
          }
        });
      }, 2000); 

      setTimeout(() => {
        errorUpdateIntervalId = setInterval(() => {
          const errorUpdateQueries = [
            "UPDATE productsscannedlog SET TotalNumberErrors = TotalNumberErrors + 1 WHERE ProductScannedCode IN (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
          ];
          const errorUpdateValues = [1, 2, 3, 4, 5, 6, 7, 8, 10, 88];

          db.query(errorUpdateQueries.join(';'), errorUpdateValues, (updateError, updateResults) => {
            if (updateError) {
              console.error("Error updating TotalNumberErrors:", updateError);
              clearInterval(errorUpdateIntervalId); 
              return res.status(500).json({ error: "Internal Server Error" });
            }
          });
        }, 2000);
      }, 60000);

      res.json({ success: true, message: "Simulation started" });
      console.error("Simulation started");
    }); 
  } catch (error) {
    console.error("Error starting simulation:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




//edit a product
app.put("/api/products/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const { productCode, productName, productWeight, productCustomerID, productExpiryDate, productUrl } =
      req.body;

    const updateQuery = "UPDATE Product SET ProductCode = ?, ProductName = ?, ProductWeight = ?, ProductCustomerID = ?, ProductExpiryDate = ?, ProductImageURL = ? WHERE ProductId = ?";
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

// Filter by Customer ID Route
app.get("/api/products/by-customer/:customerId", async (req, res) => {
  try {
    const customerId = req.params.customerId;

    // Basic Validation for Customer ID
    if (!customerId || isNaN(customerId)) {
      return res.status(400).json({ error: "Invalid customer ID" });
    }

    const query = `
      SELECT ProductId, ProductCode, ProductName, ProductWeight, ProductCustomerID, 
             DATE_FORMAT(ProductExpiryDate, "%Y-%m-%d") AS ProductExpiryDate, 
             ProductImageURL 
      FROM Product
      WHERE ProductCustomerID = ? 
    `;

    db.query(query, [customerId], (error, results) => {
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

// Product Search Route
app.get("/api/products/search", async (req, res) => {
  try {
    const searchTerm = req.query.name;

    if (!searchTerm) {
      return res.status(400).json({ error: "Please provide a 'name' query parameter" });
    }

    const query = `
      SELECT ProductId, ProductCode, ProductName, ProductWeight, ProductCustomerID, 
             DATE_FORMAT(ProductExpiryDate, "%Y-%m-%d") AS ProductExpiryDate, 
             ProductImageURL 
      FROM Product
      WHERE LOWER(ProductName) LIKE ? 
    `;

    db.query(query, ['%' + searchTerm.toLowerCase() + '%'], (error, results) => {
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

//display all products
app.get("/api/products", async (req, res) => {
  try {
    const query =
      'SELECT ProductId, ProductCode, ProductName, ProductWeight, ProductCustomerID, DATE_FORMAT(ProductExpiryDate, "%Y-%m-%d") AS ProductExpiryDate, ProductImageURL FROM Product';
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

//display a specific product
app.get("/api/products/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    const query = `
      SELECT ProductId, ProductCode, ProductName, ProductWeight, ProductCustomerID, 
             DATE_FORMAT(ProductExpiryDate, "%Y-%m-%d") AS ProductExpiryDate, 
             ProductImageURL 
      FROM Product
      WHERE ProductId = ?
    `;

    db.query(query, [productId], (error, results) => {
      if (error) {
        console.error("Error executing SQL query:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (results.length === 0) {
        return res.status(404).json({ error: "Product not found" });
      }

      const product = results[0];
      res.json({
        productId: product.ProductId,
        productCode: product.ProductCode,
        productName: product.ProductName,
        productWeight: product.ProductWeight,
        productCustomerID: product.ProductCustomerID,
        productExpiryDate: product.ProductExpiryDate,
        productUrl: product.ProductImageURL,
      });
    });

  } catch (error) {
    console.error("Error fetching product data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
);

//login
app.post("/api/login", async (req, res) => {
  try {
    const { id, password } = req.body;

    if (!id || !password) {
      console.error("Invalid request body:", req.body);
      return res.status(400).json({ error: "Invalid request body" });
    }

    const query = "SELECT UserID, UserPassword, UserLevel FROM Users WHERE BINARY UserName = ?";

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

      const token = jwt.sign(
        { userId: user.UserID, username: user.UserName, role: user.UserLevel },
        process.env.JWT_SECRET, // Assurez-vous d'avoir une clé secrète pour JWT dans vos variables d'environnement
        { expiresIn: '24h' } 
      );

      const userLevel = user.UserLevel.toLowerCase();
      if (userLevel === "admin") {
        return res.json({ redirect: "/admin/productManagement", token });
      } else if (userLevel === "leader") {
        return res.json({ redirect: "/line_leader", token });
      } else {
        return res.json({ redirect: "/quality", token });
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
      "INSERT INTO Product (ProductCode, ProductName, ProductWeight, ProductCustomerID, ProductExpiryDate, ProductImageURL) VALUES (?, ?, ?, ?, ?, ?)";
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
}
);

// Add this route to get all users
app.get("/api/users", async (req, res) => {
  try {
    const query = "SELECT UserID, UserName, UserLevel, UserEmail FROM Users";

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

      const deleteQuery = "DELETE FROM Users WHERE UserID = ?";
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

    const addUserQuery = "INSERT INTO Users (UserName, UserPassword, UserEmail, UserLevel) VALUES (?, ?, ?, ?)";
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
      "UPDATE Users SET UserName = ?, UserLevel = ?, UserEmail = ? WHERE UserID = ?";

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

// //display all errors
// app.get("/api/errors", async (req, res) => {
//   try {
//     const query =
//       'SELECT `LabelErrorID`, `ProductCode`, `DispatchDate`, `CameraCapture`, `ErrorDispatchDate`, `Output`, `ErrorLine`, `ErrorTime`, `ErrorDate` FROM `LabelErrorHistory` WHERE 1';

//     db.query(query, (error, results) => {
//       if (error) {
//         console.error("Error executing SQL query:", error);
//         return res.status(500).json({ error: "Internal Server Error" });
//       }

//       const errors = results.map((error) => ({
//         labelErrorID: error.LabelErrorID,
//         productCode: error.ProductCode,
//         dispatchDate: error.DispatchDate,
//         cameraCapture: error.CameraCapture,
//         errorDispatchDate: error.ErrorDispatchDate,
//         output: error.Output,
//         errorLine: error.ErrorLine,
//         errorTime: error.ErrorTime,
//         errorDate: error.ErrorDate,
//       }));

//       res.json(errors);
//     });
//   } catch (error) {
//     console.error("Error fetching product data:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });


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
      const errorQuery = "SELECT * FROM Defects";
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
      const errorQuery = "SELECT * FROM Labelerrorhistory";
      db.query(errorQuery, (error, results) => {
          if (error) {
              return res.status(500).json({ error: "Internal Server Error" });
          }
          res.json(results);
          // console.log(results);
      });
  } catch (error) {
      res.status(500).json({ error: "Internal Server Error" });
  }
});

//add customer
app.post("/api/customer", async (req, res) => {
  try {
    const { customerName, customerEmail } = req.body;

    console.log("Request body:", req.body);

    const addQuery = "INSERT INTO Customer (CustomerName, CustomerEmail) VALUES (?, ?)";
    db.query(addQuery, [customerName, customerEmail], (error, results) => {
      if (error) {
        console.error("Error adding customer:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json({ success: true });
    });
  } catch (error) {
    console.error("Error adding customer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//edit customer
app.put("/api/customer/:customerId", async (req, res) => {
  try {
    const { customerId } = req.params;
    const { customerName, customerEmail } = req.body;

    console.log("Request body:", req.body);

    const updateQuery = "UPDATE Customer SET CustomerName = ? , CustomerEmail = ? WHERE CustomerID = ?";
    db.query(updateQuery, [customerName, customerEmail, customerId], (error, results) => {
      if (error) {
        console.error("Error updating customer:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }
      res.json({ success: true });
    });
  } catch (error) {
    console.error("Error updating customer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//delete customer
app.delete("/api/customer/:customerId", async (req, res) => {
  try {
    const { customerId } = req.params;

    console.log("Request body:", req.params);

    const deleteQuery = "DELETE FROM Customer WHERE CustomerID = ?";
    db.query(deleteQuery, [customerId], (error, results) => {
      if (error) {
        console.error("Error deleting customer:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      res.json({ success: true });
    });
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// get all Customers
app.get("/api/customersManagement", async (req, res) => {
  try {
    const query = "SELECT CustomerID, CustomerName, CustomerEmail FROM Customer";

    db.query(query, (error, results) => {
      if (error) {
        console.error("Error executing SQL query:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      const customers = results.map((customer) => ({
        id: customer.CustomerID,
        customerName: customer.CustomerName,
        customerEmail: customer.CustomerEmail,
      }));

      res.json(customers);
    });
  } catch (error) {
    console.error("Error fetching customers data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// check if customer is associated with a product
app.get("/api/checkCustomer/:userId", async (req, res) => {
  const { userId } = req.params;
  const checkQuery = "SELECT * FROM Product WHERE ProductCustomerID = ?";
  db.query(checkQuery, [userId], (error, results) => {
    if (error) {
      console.error("Error checking customer:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.length > 0) {
      console.log("Customer is associated with a product");
      return res.json({ isAssociated: true });
    } else {
      return res.json({ isAssociated: false });
    }
  });
}
);

const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

app.get("/api/protected", authenticateToken, (req, res) => {
  res.json({ message: "Authorize" });
});


app.post("/api/logout", (req, res) => {

  const { refreshToken } = req.body;

  invalidateRefreshToken(refreshToken).then(() => {
    res.json({ message: "disconected" });
  }).catch(error => {
    console.error("error on disconection:", error);
    res.status(500).json({ error: "internal server error" });
  });
});

//get the productscanlog of the product select
app.get('/api/productscanlog/:productCode', async (req, res) => {
  try {
    const { productCode } = req.params;

    const query = 'SELECT * FROM `ProductsScannedLog` WHERE ProductScannedCode = (SELECT ProductId FROM `Product` WHERE ProductCode = ?)';

    db.query(query, [productCode], (error, results) => {
      if (error) {
        console.error('Error executing SQL query:', error);
        return res.status(500).json({ error: 'Internal Server Error' });
      }

      const productScanLog = results.map((product) => ({
        productScannedCode: product.ProductScannedCode,
        productScannedDate: product.ProductScannedDate,
        totalScanned: product.TotalScanned,
        totalNumberErrors: product.TotalNumberErrors,
      }));

      res.json(productScanLog);
    });
  } catch (error) {
    console.error('Error fetching product data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
