-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 06, 2023 at 08:12 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `verdiquest_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `achievements`
--

CREATE TABLE `achievements` (
  `AchievementId` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `Status` varchar(50) NOT NULL,
  `AchievementName` varchar(100) NOT NULL,
  `PointsRequired` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `adminstrator`
--

CREATE TABLE `adminstrator` (
  `adminstrator` int(11) NOT NULL,
  `OrganizationId` int(11) NOT NULL,
  `Username` varchar(100) NOT NULL,
  `Password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `coordinator`
--

CREATE TABLE `coordinator` (
  `CoordinatorId` int(11) NOT NULL,
  `OrganizationId` int(11) DEFAULT NULL,
  `PersonId` int(11) NOT NULL,
  `Rank` int(11) NOT NULL,
  `Username` varchar(50) NOT NULL,
  `Password` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `dailytask`
--

CREATE TABLE `dailytask` (
  `TaskId` int(11) NOT NULL,
  `DifficultyId` int(11) NOT NULL,
  `OrganizationId` int(11) NOT NULL,
  `TaskImage` varchar(150) NOT NULL,
  `TaskName` varchar(50) NOT NULL,
  `TaskDescription` varchar(255) NOT NULL,
  `TaskDuration` int(11) NOT NULL,
  `TaskPoints` int(11) NOT NULL,
  `Status` varchar(50) NOT NULL,
  `isDeleted` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `difficulty`
--

CREATE TABLE `difficulty` (
  `DifficultyId` int(11) NOT NULL,
  `Level` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `event`
--

CREATE TABLE `event` (
  `EventId` int(11) NOT NULL,
  `OrganizationId` int(11) NOT NULL,
  `EventName` varchar(50) NOT NULL,
  `EventImage` varchar(100) DEFAULT NULL,
  `EventDescription` varchar(255) NOT NULL,
  `EventVenue` varchar(255) NOT NULL,
  `EventDate` datetime NOT NULL,
  `EventEndDate` datetime DEFAULT NULL,
  `EventPoints` int(11) NOT NULL,
  `EventStatus` varchar(50) NOT NULL DEFAULT 'INCOMING',
  `isDeleted` tinyint(4) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `organization`
--

CREATE TABLE `organization` (
  `OrganizationId` int(11) NOT NULL,
  `OrganizationImage` varchar(100) DEFAULT NULL,
  `OrganizationName` varchar(100) NOT NULL,
  `OrganizationAddress` varchar(100) NOT NULL,
  `OrganizationType` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `participants`
--

CREATE TABLE `participants` (
  `ParticipantId` int(11) NOT NULL,
  `EventId` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `OrganizationId` int(11) NOT NULL,
  `Status` varchar(50) NOT NULL DEFAULT 'UNVERIFIED',
  `Feedback` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `person`
--

CREATE TABLE `person` (
  `PersonId` int(11) NOT NULL,
  `UserId` int(11) DEFAULT NULL,
  `FirstName` varchar(50) NOT NULL,
  `LastName` varchar(50) NOT NULL,
  `Initial` varchar(5) NOT NULL,
  `Birthdate` date NOT NULL,
  `PhoneNumber` varchar(20) NOT NULL,
  `Gender` varchar(10) NOT NULL,
  `Street` varchar(50) NOT NULL,
  `Barangay` varchar(50) NOT NULL,
  `City` varchar(50) NOT NULL,
  `Province` varchar(50) NOT NULL,
  `UpdateAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `products`
--

CREATE TABLE `products` (
  `ProductId` int(11) NOT NULL,
  `OrganizationId` int(11) NOT NULL,
  `ProductName` varchar(50) NOT NULL,
  `ProductImage` varchar(100) DEFAULT NULL,
  `ProductDescription` varchar(100) NOT NULL,
  `ProductSize` varchar(10) NOT NULL,
  `ProductQuantity` int(4) NOT NULL,
  `PointsRequired` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `redeem`
--

CREATE TABLE `redeem` (
  `RedeemId` int(11) NOT NULL,
  `ProductId` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `Status` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `redeemtransaction`
--

CREATE TABLE `redeemtransaction` (
  `TransactionId` int(11) NOT NULL,
  `RedeemId` int(11) NOT NULL,
  `TransactionDate` datetime NOT NULL,
  `Destination` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subscription`
--

CREATE TABLE `subscription` (
  `SubscriptionId` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `Status` varchar(50) NOT NULL,
  `SubscriptionEnd` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `subscriptiontransaction`
--

CREATE TABLE `subscriptiontransaction` (
  `TransactionId` int(11) NOT NULL,
  `SubscriptionId` int(11) NOT NULL,
  `SubscriptionCost` decimal(10,2) NOT NULL,
  `ModeOfTransaction` varchar(50) NOT NULL,
  `ReferenceNum` varchar(50) NOT NULL,
  `SubscriptionDate` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `UserId` int(11) NOT NULL,
  `OrganizationId` int(11) DEFAULT NULL,
  `SubscriptionStatus` varchar(10) NOT NULL,
  `VerdiPoints` int(10) NOT NULL,
  `Email` varchar(50) NOT NULL,
  `Password` varchar(255) NOT NULL,
  `ProfilePicture` varchar(255) NOT NULL,
  `UserDescription` varchar(255) NOT NULL,
  `TaskCount` int(11) NOT NULL,
  `DateRegistered` date NOT NULL,
  `LastActive` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `userdailytask`
--

CREATE TABLE `userdailytask` (
  `UserDailyTaskId` int(11) NOT NULL,
  `UserId` int(11) NOT NULL,
  `TaskId` int(11) NOT NULL,
  `DateTaken` datetime NOT NULL DEFAULT current_timestamp(),
  `DateFinished` datetime DEFAULT NULL,
  `TaskProof1` varchar(100) DEFAULT NULL,
  `TaskProof2` varchar(100) DEFAULT NULL,
  `TaskProof3` varchar(100) DEFAULT NULL,
  `TaskStatus` varchar(50) NOT NULL DEFAULT 'ONGOING',
  `HasBeenCancelled` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `achievements`
--
ALTER TABLE `achievements`
  ADD PRIMARY KEY (`AchievementId`),
  ADD KEY `UserId` (`UserId`);

--
-- Indexes for table `adminstrator`
--
ALTER TABLE `adminstrator`
  ADD PRIMARY KEY (`adminstrator`),
  ADD KEY `OrganizationId` (`OrganizationId`);

--
-- Indexes for table `coordinator`
--
ALTER TABLE `coordinator`
  ADD PRIMARY KEY (`CoordinatorId`),
  ADD KEY `PersonId` (`PersonId`),
  ADD KEY `coordinator_org` (`OrganizationId`);

--
-- Indexes for table `dailytask`
--
ALTER TABLE `dailytask`
  ADD PRIMARY KEY (`TaskId`),
  ADD KEY `DifficultyId` (`DifficultyId`),
  ADD KEY `OrganizationId` (`OrganizationId`);

--
-- Indexes for table `difficulty`
--
ALTER TABLE `difficulty`
  ADD PRIMARY KEY (`DifficultyId`);

--
-- Indexes for table `event`
--
ALTER TABLE `event`
  ADD PRIMARY KEY (`EventId`),
  ADD KEY `event_ibfk_1` (`OrganizationId`);

--
-- Indexes for table `organization`
--
ALTER TABLE `organization`
  ADD PRIMARY KEY (`OrganizationId`);

--
-- Indexes for table `participants`
--
ALTER TABLE `participants`
  ADD PRIMARY KEY (`ParticipantId`),
  ADD KEY `EventId` (`EventId`),
  ADD KEY `UserId` (`UserId`),
  ADD KEY `OrganizationId` (`OrganizationId`);

--
-- Indexes for table `person`
--
ALTER TABLE `person`
  ADD PRIMARY KEY (`PersonId`),
  ADD KEY `UserId` (`UserId`);

--
-- Indexes for table `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`ProductId`),
  ADD KEY `CoordinatorId` (`OrganizationId`);

--
-- Indexes for table `redeem`
--
ALTER TABLE `redeem`
  ADD PRIMARY KEY (`RedeemId`),
  ADD KEY `ProductId` (`ProductId`),
  ADD KEY `UserId` (`UserId`);

--
-- Indexes for table `redeemtransaction`
--
ALTER TABLE `redeemtransaction`
  ADD PRIMARY KEY (`TransactionId`),
  ADD KEY `RedeemId` (`RedeemId`);

--
-- Indexes for table `subscription`
--
ALTER TABLE `subscription`
  ADD PRIMARY KEY (`SubscriptionId`),
  ADD KEY `UserId` (`UserId`);

--
-- Indexes for table `subscriptiontransaction`
--
ALTER TABLE `subscriptiontransaction`
  ADD PRIMARY KEY (`TransactionId`),
  ADD KEY `SubscriptionId` (`SubscriptionId`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`UserId`),
  ADD KEY `user_ibfk_1` (`OrganizationId`);

--
-- Indexes for table `userdailytask`
--
ALTER TABLE `userdailytask`
  ADD PRIMARY KEY (`UserDailyTaskId`),
  ADD KEY `UserId` (`UserId`),
  ADD KEY `TaskId` (`TaskId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `achievements`
--
ALTER TABLE `achievements`
  MODIFY `AchievementId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `adminstrator`
--
ALTER TABLE `adminstrator`
  MODIFY `adminstrator` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `coordinator`
--
ALTER TABLE `coordinator`
  MODIFY `CoordinatorId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `dailytask`
--
ALTER TABLE `dailytask`
  MODIFY `TaskId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `difficulty`
--
ALTER TABLE `difficulty`
  MODIFY `DifficultyId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `event`
--
ALTER TABLE `event`
  MODIFY `EventId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `organization`
--
ALTER TABLE `organization`
  MODIFY `OrganizationId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `participants`
--
ALTER TABLE `participants`
  MODIFY `ParticipantId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `person`
--
ALTER TABLE `person`
  MODIFY `PersonId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `products`
--
ALTER TABLE `products`
  MODIFY `ProductId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `redeem`
--
ALTER TABLE `redeem`
  MODIFY `RedeemId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `redeemtransaction`
--
ALTER TABLE `redeemtransaction`
  MODIFY `TransactionId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subscription`
--
ALTER TABLE `subscription`
  MODIFY `SubscriptionId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `subscriptiontransaction`
--
ALTER TABLE `subscriptiontransaction`
  MODIFY `TransactionId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `UserId` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `userdailytask`
--
ALTER TABLE `userdailytask`
  MODIFY `UserDailyTaskId` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `achievements`
--
ALTER TABLE `achievements`
  ADD CONSTRAINT `achievements_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `user` (`UserId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `adminstrator`
--
ALTER TABLE `adminstrator`
  ADD CONSTRAINT `adminstrator_ibfk_1` FOREIGN KEY (`OrganizationId`) REFERENCES `organization` (`OrganizationId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `coordinator`
--
ALTER TABLE `coordinator`
  ADD CONSTRAINT `coordinator_ibfk_2` FOREIGN KEY (`PersonId`) REFERENCES `person` (`PersonId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `coordinator_org` FOREIGN KEY (`OrganizationId`) REFERENCES `organization` (`OrganizationId`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `dailytask`
--
ALTER TABLE `dailytask`
  ADD CONSTRAINT `dailytask_ibfk_1` FOREIGN KEY (`DifficultyId`) REFERENCES `difficulty` (`DifficultyId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `dailytask_ibfk_2` FOREIGN KEY (`OrganizationId`) REFERENCES `organization` (`OrganizationId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `event`
--
ALTER TABLE `event`
  ADD CONSTRAINT `event_ibfk_1` FOREIGN KEY (`OrganizationId`) REFERENCES `organization` (`OrganizationId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `participants`
--
ALTER TABLE `participants`
  ADD CONSTRAINT `participants_ibfk_1` FOREIGN KEY (`EventId`) REFERENCES `event` (`EventId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `participants_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `user` (`UserId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `participants_ibfk_3` FOREIGN KEY (`OrganizationId`) REFERENCES `organization` (`OrganizationId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `person`
--
ALTER TABLE `person`
  ADD CONSTRAINT `person_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `user` (`UserId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_ibfk_1` FOREIGN KEY (`OrganizationId`) REFERENCES `organization` (`OrganizationId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `redeem`
--
ALTER TABLE `redeem`
  ADD CONSTRAINT `redeem_ibfk_1` FOREIGN KEY (`ProductId`) REFERENCES `products` (`ProductId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `redeem_ibfk_2` FOREIGN KEY (`UserId`) REFERENCES `user` (`UserId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `redeemtransaction`
--
ALTER TABLE `redeemtransaction`
  ADD CONSTRAINT `redeemtransaction_ibfk_1` FOREIGN KEY (`RedeemId`) REFERENCES `redeem` (`RedeemId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `subscription`
--
ALTER TABLE `subscription`
  ADD CONSTRAINT `subscription_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `user` (`UserId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `subscriptiontransaction`
--
ALTER TABLE `subscriptiontransaction`
  ADD CONSTRAINT `subscriptiontransaction_ibfk_1` FOREIGN KEY (`SubscriptionId`) REFERENCES `subscription` (`SubscriptionId`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`OrganizationId`) REFERENCES `organization` (`OrganizationId`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `userdailytask`
--
ALTER TABLE `userdailytask`
  ADD CONSTRAINT `userdailytask_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `user` (`UserId`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `userdailytask_ibfk_2` FOREIGN KEY (`TaskId`) REFERENCES `dailytask` (`TaskId`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
