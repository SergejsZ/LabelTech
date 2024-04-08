-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : dim. 07 avr. 2024 à 16:24
-- Version du serveur : 10.4.28-MariaDB
-- Version de PHP : 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `labeltech`
--

-- --------------------------------------------------------

--
-- Structure de la table `BadProducts`
--

CREATE TABLE `BadProducts` (
  `BadProductID` int(11) NOT NULL,
  `ProductCode` int(11) DEFAULT NULL,
  `DateRecorded` date DEFAULT NULL,
  `DefectID` varchar(255) DEFAULT NULL,
  `ProductDefectTally` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `Customer`
--

CREATE TABLE `Customer` (
  `CustomerID` int(11) NOT NULL,
  `CustomerName` varchar(255) DEFAULT NULL,
  `CustomerEmail` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Customer`
--

INSERT INTO `Customer` (`CustomerID`, `CustomerName`, `CustomerEmail`) VALUES
(1, 'Dunnes store', 'dunnes.store@gmail.com'),
(3, 'Tesco', 'tesco@gmail.com'),
(4, 'SuperValu', 'supervalu@gmail.com'),
(5, 'Morrisons', 'morrisons@gmail.com'),
(6, 'Lidl', 'lidl@gmail.com'),
(7, 'Monaghan', 'monaghan.mushies@gmail.com'),
(8, 'sainsbury', 'sainsbury@gmail.com');

-- --------------------------------------------------------

--
-- Structure de la table `Defects`
--

CREATE TABLE `Defects` (
  `DefectID` varchar(255) NOT NULL,
  `DefectType` varchar(255) DEFAULT NULL,
  `Severity` varchar(50) DEFAULT NULL,
  `Description` text DEFAULT NULL,
  `ImageURL` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `LabelErrorHistory`
--

CREATE TABLE `LabelErrorHistory` (
  `LabelErrorID` int(11) NOT NULL,
  `ProductCode` int(11) DEFAULT NULL,
  `DispatchDate` date DEFAULT NULL,
  `CameraCapture` varchar(255) DEFAULT NULL,
  `ErrorDispatchDate` date DEFAULT NULL,
  `Output` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `LabelErrorHistory`
--

INSERT INTO `LabelErrorHistory` (`LabelErrorID`, `ProductCode`, `DispatchDate`, `CameraCapture`, `ErrorDispatchDate`, `Output`) VALUES
(1, 1, '2024-03-12', 'cam.png', '2024-03-21', 'date'),
(2, 1, '2024-03-20', NULL, '2024-03-20', 'missplacement'),
(3, 2, '2024-03-06', NULL, '2024-03-13', 'date'),
(4, 8, '2024-03-06', NULL, '2024-03-14', 'date');

-- --------------------------------------------------------

--
-- Structure de la table `Product`
--

CREATE TABLE `Product` (
  `ProductId` int(11) NOT NULL,
  `ProductCode` int(11) DEFAULT NULL,
  `ProductName` varchar(255) DEFAULT NULL,
  `ProductWeight` int(11) DEFAULT NULL,
  `ProductCustomerID` int(11) DEFAULT NULL,
  `ProductExpiryDate` date DEFAULT NULL,
  `ProductImageURL` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Product`
--

INSERT INTO `Product` (`ProductId`, `ProductCode`, `ProductName`, `ProductWeight`, `ProductCustomerID`, `ProductExpiryDate`, `ProductImageURL`) VALUES
(1, 123, 'Chestnut Mushrooms', 200, 1, '2024-12-31', 'https://storage.googleapis.com/labeltech/chestnut_mushrooms.jpg'),
(2, 456, 'Sliced', 150, 1, NULL, 'https://storage.googleapis.com/labeltech/sliced_mushrooms.jpg'),
(3, 652, 'Mushroom Medley', 250, 3, NULL, 'https://storage.googleapis.com/labeltech/mushroom_medley.jpg'),
(4, 789, 'Baby button', 250, 1, NULL, 'https://storage.googleapis.com/labeltech/baby_button_mushrooms.jpg'),
(8, 60131, 'Organic baby button', 150, 7, NULL, 'https://storage.googleapis.com/labeltech/monaghan_organicbabybutton.jpg'),
(9, 169, 'Chestnut mushrooms', 250, 7, NULL, 'https://storage.googleapis.com/labeltech/early_chestnut.jpeg'),
(10, 50131, 'Organic chestnut', 250, 7, NULL, 'https://storage.googleapis.com/labeltech/monaghan_organicChestnut.jpg'),
(11, 56381, 'Oyster', 120, 7, NULL, 'https://storage.googleapis.com/labeltech/monaghan_oyster.jpg'),
(13, 715312, 'Closed cup', 250, 5, NULL, 'https://storage.googleapis.com/labeltech/closed_cup.jpeg'),
(14, 173548, 'Baby button white', 200, 7, NULL, 'https://storage.googleapis.com/labeltech/sainsburyswhite.jpeg'),
(15, 90686, 'Button Mushrooms', 180, 5, NULL, 'https://storage.googleapis.com/labeltech/button.jpeg'),
(17, 567485, 'Rustica ', 150, 7, NULL, 'https://storage.googleapis.com/labeltech/monaghan_rustica.jpg'),
(18, 658163, 'Closed cup', 230, 7, NULL, 'https://storage.googleapis.com/labeltech/monaghan_closed_cup.jpg'),
(19, 658254, 'Sliced', 240, 7, NULL, 'https://storage.googleapis.com/labeltech/monghan_sliced.jpg'),
(20, 873654, 'Sliced', 120, 5, NULL, 'https://storage.googleapis.com/labeltech/sliced.jpg'),
(21, 202831, 'Mini portobello', 250, 7, NULL, 'https://storage.googleapis.com/labeltech/monaghan_portabello.jpg'),
(22, 674267, 'Baby button', 120, 7, NULL, 'https://storage.googleapis.com/labeltech/monaghan_baby_button.jpg'),
(23, 671364, 'Sliced', 200, 4, NULL, 'https://storage.googleapis.com/labeltech/sv_mushrooms.jpeg'),
(24, 784812, 'Irish large', 120, 1, NULL, 'https://storage.googleapis.com/labeltech/irish_large_mushrooms.jpg'),
(25, 674874, 'Irish', 200, 1, NULL, 'https://storage.googleapis.com/labeltech/irish_mushrooms.jpg'),
(26, 613845, 'Irish closed cup', 250, 1, NULL, 'https://storage.googleapis.com/labeltech/irish_closed_cup_mushrooms.jpg');

-- --------------------------------------------------------

--
-- Structure de la table `ProductionLine`
--

CREATE TABLE `ProductionLine` (
  `LineNumber` int(11) NOT NULL,
  `LineLeader` int(11) DEFAULT NULL,
  `State` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Structure de la table `ProductsScannedLog`
--

CREATE TABLE `ProductsScannedLog` (
  `ProductScannedID` int(11) NOT NULL,
  `ProductScannedCode` int(11) DEFAULT NULL,
  `ProductScannedDate` date DEFAULT NULL,
  `TotalScanned` int(11) DEFAULT NULL,
  `TotalNumberErrors` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `ProductsScannedLog`
--

INSERT INTO `ProductsScannedLog` (`ProductScannedID`, `ProductScannedCode`, `ProductScannedDate`, `TotalScanned`, `TotalNumberErrors`) VALUES
(7, 4, '2023-04-12', 39, 0),
(9, 4, '2023-04-12', 34, 0);

-- --------------------------------------------------------

--
-- Structure de la table `Users`
--

CREATE TABLE `Users` (
  `UserID` int(11) NOT NULL,
  `UserName` varchar(255) DEFAULT NULL,
  `UserPassword` varchar(255) DEFAULT NULL,
  `UserEmail` varchar(255) DEFAULT NULL,
  `UserLevel` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Users`
--

INSERT INTO `Users` (`UserID`, `UserName`, `UserPassword`, `UserEmail`, `UserLevel`) VALUES
(1, 'Alex', '$2b$10$4OAvN2nAlgjoNl/pqaPr8.nxlxnp9.Az.MPtRFUlz8VTgEcGDrlIm', 'Alex.desbos@gmail.com', 'Admin'),
(2, 'john', '$2b$10$/HrmJqZwnvt17Kx4y1zK3unZMYj6YNlAkmQ1RUWLGlrB.TTN60l2e', 'john@gmail.com', 'Admin'),
(3, 'Yue', '$2b$10$h.ePNs2F2.bcdfl9AzN7AeFwoXOVANr91bpnXQ61dpIQDW9Zd1BPO', 'yue@gmail.com', 'Leader'),
(4, 'Nathan', '$2b$10$tWjtGL4sbbD.nTAL0ZCoguRCBiU01Fd4CCgfyMa.wvh39v/nnbQD.', 'nathan@gmail.com', 'Leader'),
(6, 'Patrick', '$2b$10$x0bYfMFqxS.uIV.Imn1OX.R3dWIX6g38pEXKgXNDeCLX6ybLGYZhy', 'patrick@gmail.com', 'Admin'),
(7, 'Sergej', '$2b$10$7UOuFX1sMDNbhp3Ue9zJwu4DdwnzV0I5zaSxNcXYCmsa3RZmCupw.', 'sergej@gmail.com', 'Leader');

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `BadProducts`
--
ALTER TABLE `BadProducts`
  ADD PRIMARY KEY (`BadProductID`),
  ADD KEY `ProductCode` (`ProductCode`),
  ADD KEY `DefectID` (`DefectID`);

--
-- Index pour la table `Customer`
--
ALTER TABLE `Customer`
  ADD PRIMARY KEY (`CustomerID`);

--
-- Index pour la table `Defects`
--
ALTER TABLE `Defects`
  ADD PRIMARY KEY (`DefectID`);

--
-- Index pour la table `LabelErrorHistory`
--
ALTER TABLE `LabelErrorHistory`
  ADD PRIMARY KEY (`LabelErrorID`),
  ADD KEY `ProductCode` (`ProductCode`);

--
-- Index pour la table `Product`
--
ALTER TABLE `Product`
  ADD PRIMARY KEY (`ProductId`),
  ADD KEY `ProductCustomerID` (`ProductCustomerID`);

--
-- Index pour la table `ProductionLine`
--
ALTER TABLE `ProductionLine`
  ADD PRIMARY KEY (`LineNumber`),
  ADD KEY `LineLeader` (`LineLeader`);

--
-- Index pour la table `ProductsScannedLog`
--
ALTER TABLE `ProductsScannedLog`
  ADD PRIMARY KEY (`ProductScannedID`),
  ADD KEY `ProductScannedCode` (`ProductScannedCode`);

--
-- Index pour la table `Users`
--
ALTER TABLE `Users`
  ADD PRIMARY KEY (`UserID`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `Customer`
--
ALTER TABLE `Customer`
  MODIFY `CustomerID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `LabelErrorHistory`
--
ALTER TABLE `LabelErrorHistory`
  MODIFY `LabelErrorID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT pour la table `Product`
--
ALTER TABLE `Product`
  MODIFY `ProductId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- AUTO_INCREMENT pour la table `ProductsScannedLog`
--
ALTER TABLE `ProductsScannedLog`
  MODIFY `ProductScannedID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `Users`
--
ALTER TABLE `Users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `BadProducts`
--
ALTER TABLE `BadProducts`
  ADD CONSTRAINT `badproducts_ibfk_1` FOREIGN KEY (`ProductCode`) REFERENCES `Product` (`ProductId`),
  ADD CONSTRAINT `badproducts_ibfk_2` FOREIGN KEY (`DefectID`) REFERENCES `Defects` (`DefectID`);

--
-- Contraintes pour la table `LabelErrorHistory`
--
ALTER TABLE `LabelErrorHistory`
  ADD CONSTRAINT `labelerrorhistory_ibfk_1` FOREIGN KEY (`ProductCode`) REFERENCES `Product` (`ProductId`);

--
-- Contraintes pour la table `Product`
--
ALTER TABLE `Product`
  ADD CONSTRAINT `product_ibfk_1` FOREIGN KEY (`ProductCustomerID`) REFERENCES `Customer` (`CustomerID`);

--
-- Contraintes pour la table `ProductionLine`
--
ALTER TABLE `ProductionLine`
  ADD CONSTRAINT `productionline_ibfk_1` FOREIGN KEY (`LineLeader`) REFERENCES `Users` (`UserID`);

--
-- Contraintes pour la table `ProductsScannedLog`
--
ALTER TABLE `ProductsScannedLog`
  ADD CONSTRAINT `productsscannedlog_ibfk_1` FOREIGN KEY (`ProductScannedCode`) REFERENCES `Product` (`ProductId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
