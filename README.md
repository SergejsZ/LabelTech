# LabelTech

![teamlogo](https://github.com/SergejsZ/LabelTech/assets/93885587/c0bfda70-fa8b-4335-ba7c-5f6cbcbd47a8)

# Application

LabelTech is a web app used to spot manufacturing label issues due to human error. It uses a camera and smart image analysis system to scan for incorrect labels of various products. The app provides admins and users to spot incorrectly labeled products by comparing the human input data label to the correct data in the database. Our goal is to correct human error and finds ways to allow for a more seamless factory line system. Our software system is planning to provide the best quality assurance of on-the-shelf goods and items for manufacturers.

# SQL Database
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

-- Create the ProductionLine table

CREATE TABLE IF NOT EXISTS ProductionLine (
LineNumber INT PRIMARY KEY,
LineLeader INT,
State VARCHAR(255),
FOREIGN KEY (LineLeader) REFERENCES Users(UserID)
);
