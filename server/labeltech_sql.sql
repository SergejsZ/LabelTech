-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Hôte : localhost
-- Généré le : mar. 13 fév. 2024 à 15:40
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
(1, 'Tesco', 'tesco@gmail.com'),
(2, 'Lidl', 'lidl@gmail.com'),
(3, 'M&S', 'mands@gmail.com'),
(12, 'dunnes', 'dunnes@gmail.com');

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
  `Output` varchar(255) DEFAULT NULL,
  `ErrorLine` int(11) NOT NULL,
  `ErrorTime` varchar(255) NOT NULL,
  `ErrorDate` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `LabelErrorHistory`
--

INSERT INTO `LabelErrorHistory` (`LabelErrorID`, `ProductCode`, `DispatchDate`, `CameraCapture`, `ErrorDispatchDate`, `Output`, `ErrorLine`, `ErrorTime`, `ErrorDate`) VALUES
(1, 1, '2024-02-15', 'error.png', '2024-02-16', 'bad dispatch date', 2, '17:11', '2024-02-05');

-- --------------------------------------------------------

--
-- Structure de la table `Product`
--

CREATE TABLE `Product` (
  `ProductId` int(11) NOT NULL,
  `ProductCode` varchar(255) NOT NULL,
  `ProductName` varchar(255) DEFAULT NULL,
  `ProductWeight` int(11) DEFAULT NULL,
  `ProductCustomerID` int(11) DEFAULT NULL,
  `ProductExpiryDate` date DEFAULT NULL,
  `ProductImage` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `Product`
--

INSERT INTO `Product` (`ProductId`, `ProductCode`, `ProductName`, `ProductWeight`, `ProductCustomerID`, `ProductExpiryDate`, `ProductImage`) VALUES
(1, '1A1985B1', 'Slice mushrooms', 122, 12, NULL, NULL),
(3, '2P3901A4', 'Organic Mushrooms', 140, 1, NULL, NULL),
(4, '6H1944B1', 'Portobello mushrooms', 230, 2, NULL, NULL),
(10, '1P19A121', 'Paris Mushrooms', 310, 3, NULL, NULL),
(11, '1J1901C1', 'Baby mushrooms', 200, 3, NULL, NULL);

-- --------------------------------------------------------

--
-- Structure de la table `ProductionLine`
--

CREATE TABLE `ProductionLine` (
  `LineNumber` int(11) NOT NULL,
  `LineLeader` int(11) DEFAULT NULL,
  `State` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Déchargement des données de la table `ProductionLine`
--

INSERT INTO `ProductionLine` (`LineNumber`, `LineLeader`, `State`) VALUES
(1, 18, 'Active'),
(2, NULL, 'Ready'),
(3, NULL, 'Ready'),
(4, NULL, 'Ready'),
(5, NULL, 'Ready'),
(6, NULL, 'Ready'),
(7, NULL, 'Ready'),
(8, NULL, 'Ready');

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
(18, 'Alexandre', '$2b$10$mKf1kkT52l0LX5yMPH8TWurDjocN/Iaw1nKzFKk6RirD33TIIVT1u', 'alexandre@gmail.com', 'Admin'),
(20, 'Sergej', '$2b$10$UGkIyPye6stQ.3lhhFPQceqzJJ2MP5M7FasMzKfsGHoL6X8w3U1Iq', 'sergej@gmail.com', 'Leader'),
(21, 'John', '$2b$10$a.cEANnMvp.zaCCtliUQF.Vj46uS575aERJa49paHrDWNkKM1lP8.', 'john@gmail.com', 'Quality'),
(23, 'Patrick', '$2b$10$0MDfnqp5AmuZkp/rNdrnhuFRCz9h2zQrISHmc3jHJo6wbffNYNkaK', 'patrick@gmail.com', 'Admin'),
(25, 'Enda', '$2b$10$09Y5axCJwl3fAOym3WECFerIYJHzUDC1WcVU9w1cwsKhMXt587WMW', 'enda@gmail.com', 'Admin'),
(26, 'Nathan', '$2b$10$QHxwbFT3D3TSPn12/dYsYe2H5Y543bv7hT75.MQqkcr5nqtM6Q3lO', 'nathan@gmail.com', 'Leader');

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
-- AUTO_INCREMENT pour la table `Product`
--
ALTER TABLE `Product`
  MODIFY `ProductId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT pour la table `Users`
--
ALTER TABLE `Users`
  MODIFY `UserID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

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
