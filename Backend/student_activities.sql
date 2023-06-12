-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 02, 2023 at 12:08 PM
-- Server version: 10.4.24-MariaDB
-- PHP Version: 7.4.29

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `student_activities`
--

-- --------------------------------------------------------

--
-- Table structure for table `d_task`
--

CREATE TABLE `d_task` (
  `dtid` int(11) NOT NULL,
  `sid` varchar(50) DEFAULT NULL,
  `cid` varchar(50) DEFAULT NULL,
  `d_task` text DEFAULT NULL,
  `date` varchar(50) DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `lve`
--

CREATE TABLE `lve` (
  `sid` varchar(50) DEFAULT NULL,
  `wdate` varchar(50) DEFAULT NULL,
  `edate` varchar(50) DEFAULT NULL,
  `Reason` text DEFAULT NULL,
  `date` varchar(50) DEFAULT current_timestamp(),
  `lid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `material`
--

CREATE TABLE `material` (
  `mid` int(11) NOT NULL,
  `sid` varchar(50) DEFAULT NULL,
  `cid` varchar(50) DEFAULT NULL,
  `material` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `student`
--

CREATE TABLE `student` (
  `sid` varchar(50) NOT NULL,
  `cid` varchar(50) NOT NULL,
  `task_status` varchar(50) DEFAULT 'pending',
  `lid` int(11) NOT NULL,
  `mark` int(11) DEFAULT NULL,
  `answer_request` varchar(50) DEFAULT NULL,
  `chance` int(11) DEFAULT NULL,
  `daily_task_status` varchar(50) DEFAULT 'pending',
  `grade` varchar(50) NOT NULL,
  `date` datetime DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `student_details`
--

CREATE TABLE `student_details` (
  `sid` varchar(50) NOT NULL,
  `name` varchar(50) DEFAULT NULL,
  `phone` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `cid` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `student_d_task`
--

CREATE TABLE `student_d_task` (
  `dtid` int(11) NOT NULL,
  `sid` varchar(50) DEFAULT NULL,
  `question` varchar(50) DEFAULT NULL,
  `answer` varchar(50) DEFAULT NULL,
  `output` varchar(50) DEFAULT NULL,
  `mark` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `student_task`
--

CREATE TABLE `student_task` (
  `sid` varchar(50) DEFAULT NULL,
  `qid` int(11) DEFAULT NULL,
  `question` text DEFAULT NULL,
  `code` text DEFAULT NULL,
  `output` text DEFAULT NULL,
  `mark` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `task`
--

CREATE TABLE `task` (
  `tid` int(11) NOT NULL,
  `cid` varchar(50) DEFAULT NULL,
  `sid` varchar(50) DEFAULT NULL,
  `task_stage` varchar(50) DEFAULT NULL,
  `question` text DEFAULT NULL,
  `answer` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `d_task`
--
ALTER TABLE `d_task`
  ADD PRIMARY KEY (`dtid`);

--
-- Indexes for table `lve`
--
ALTER TABLE `lve`
  ADD PRIMARY KEY (`lid`);

--
-- Indexes for table `material`
--
ALTER TABLE `material`
  ADD PRIMARY KEY (`mid`);

--
-- Indexes for table `student`
--
ALTER TABLE `student`
  ADD PRIMARY KEY (`lid`);

--
-- Indexes for table `student_details`
--
ALTER TABLE `student_details`
  ADD PRIMARY KEY (`sid`);

--
-- Indexes for table `task`
--
ALTER TABLE `task`
  ADD PRIMARY KEY (`tid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `d_task`
--
ALTER TABLE `d_task`
  MODIFY `dtid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lve`
--
ALTER TABLE `lve`
  MODIFY `lid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `material`
--
ALTER TABLE `material`
  MODIFY `mid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `student`
--
ALTER TABLE `student`
  MODIFY `lid` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `task`
--
ALTER TABLE `task`
  MODIFY `tid` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
