-- phpMyAdmin SQL Dump
-- version 4.2.3deb1.precise~ppa.1
-- http://www.phpmyadmin.net
--
-- Host: localhost
-- Generation Time: Dec 04, 2014 at 10:34 PM
-- Server version: 5.5.38-0ubuntu0.12.04.1
-- PHP Version: 5.5.16-1+deb.sury.org~precise+1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `SEP_Chess`
--

-- --------------------------------------------------------

--
-- Table structure for table `Users`
--

CREATE TABLE IF NOT EXISTS `Users` (
  `username` varchar(50) NOT NULL,
  `inGame` tinyint(1) NOT NULL DEFAULT '0',
  `waitingToConnect` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `Whos_Playing`
--

CREATE TABLE IF NOT EXISTS `Whos_Playing` (
  `user1` text NOT NULL,
  `user2` text NOT NULL,
  `user1Pieces` text NOT NULL,
  `user2Pieces` text NOT NULL,
  `user1CapturedPieces` text NOT NULL,
  `user2CapturedPieces` text NOT NULL,
  `user1Time` varchar(6) NOT NULL,
  `user2Time` varchar(6) NOT NULL,
  `whosTurn` tinyint(4) NOT NULL,
  `clockEnabled` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Users`
--
ALTER TABLE `Users`
 ADD PRIMARY KEY (`username`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
