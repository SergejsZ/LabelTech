# Mushies

label verification using camera vision

testing git user conflict

# MySQL Database Creation

-- Create the database
CREATE DATABASE IF NOT EXISTS labeltech;

-- Switch to the labeltech database
USE labeltech;

-- Create the Customer table
CREATE TABLE IF NOT EXISTS Customer (
CustomerID INT PRIMARY KEY,
CustomerName VARCHAR(255),
CustomerEmail VARCHAR(50)
);

-- Create the Product table
CREATE TABLE IF NOT EXISTS Product (
ProductCode INT PRIMARY KEY,
ProductName VARCHAR(255),
ProductWeight INT,
ProductCustomerID INT,
ProductExpiryDate DATE,
FOREIGN KEY (ProductCustomerID) REFERENCES Customer(CustomerID)
);

-- Create the Defects table
CREATE TABLE IF NOT EXISTS Defects (
DefectID VARCHAR(255) PRIMARY KEY,
DefectType VARCHAR(255),
Severity VARCHAR(50),
Description TEXT,
ImageURL VARCHAR(255)
);

-- Create the ProductsScannedLog table
CREATE TABLE IF NOT EXISTS ProductsScannedLog (
ProductScannedID INT PRIMARY KEY,
ProductScannedCode INT,
ProductScannedDate DATE,
TotalScanned INT,
TotalNumberErrors INT,
FOREIGN KEY (ProductScannedCode) REFERENCES Product(ProductCode)
);

-- Create the LabelErrorHistory table
CREATE TABLE IF NOT EXISTS LabelErrorHistory (
LabelErrorID INT PRIMARY KEY,
ProductCode INT,
DispatchDate DATE,
CameraCapture VARCHAR(255),
ErrorDispatchDate DATE,
Output VARCHAR(255),
FOREIGN KEY (ProductCode) REFERENCES Product(ProductCode)
);

-- Create the Users table
CREATE TABLE IF NOT EXISTS Users (
UserID INT PRIMARY KEY,
UserName VARCHAR(255),
UserPassword VARCHAR(255),
UserEmail VARCHAR(255),
UserLevel VARCHAR(50)
);

-- Create the BadProducts table
CREATE TABLE IF NOT EXISTS BadProducts (
BadProductID INT PRIMARY KEY,
ProductCode INT,
DateRecorded DATE,
DefectID VARCHAR(255),
ProductDefectTally INT,
FOREIGN KEY (ProductCode) REFERENCES Product(ProductCode),
FOREIGN KEY (DefectID) REFERENCES Defects(DefectID)
);
