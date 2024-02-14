-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Feb 09, 2024 at 07:01 PM
-- Server version: 8.2.0
-- PHP Version: 8.2.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `trackedu`
--

-- --------------------------------------------------------

--
-- Table structure for table `academic_staff`
--

DROP TABLE IF EXISTS `academic_staff`;
CREATE TABLE IF NOT EXISTS `academic_staff` (
  `Academic_Staff_ID` int NOT NULL AUTO_INCREMENT,
  `Academic_Staff_Name` varchar(50) NOT NULL,
  `Academic_Staff_Email` varchar(100) NOT NULL,
  `Academic_Staff_Contact_Number` varchar(15) DEFAULT NULL,
  `Academic_Staff_NIC` varchar(15) NOT NULL,
  `Academic_Staff_Password` varchar(100) NOT NULL,
  PRIMARY KEY (`Academic_Staff_ID`),
  UNIQUE KEY `Academic_Staff_Email` (`Academic_Staff_Email`),
  UNIQUE KEY `Academic_Staff_NIC` (`Academic_Staff_NIC`)
) ENGINE=MyISAM AUTO_INCREMENT=991303 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `academic_staff`
--

INSERT INTO `academic_staff` (`Academic_Staff_ID`, `Academic_Staff_Name`, `Academic_Staff_Email`, `Academic_Staff_Contact_Number`, `Academic_Staff_NIC`, `Academic_Staff_Password`) VALUES
(176816, 'Miyutu Pathiraja', 'dyhup@sltc.ac.lk', '0721980234', '297878657V', 'sltc@111');

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
CREATE TABLE IF NOT EXISTS `admin` (
  `Admin_ID` int NOT NULL AUTO_INCREMENT,
  `Admin_Name` varchar(50) NOT NULL,
  `Admin_Email` varchar(100) NOT NULL,
  `Admin_Password` varchar(100) NOT NULL,
  PRIMARY KEY (`Admin_ID`),
  UNIQUE KEY `Admin_Email` (`Admin_Email`),
  KEY `Admin_Name` (`Admin_Name`),
  KEY `Admin_Name_2` (`Admin_Name`)
) ENGINE=MyISAM AUTO_INCREMENT=829195058 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`Admin_ID`, `Admin_Name`, `Admin_Email`, `Admin_Password`) VALUES
(126180172, 'Roshan Ravindra', 'rosuiiuiui@gmail.com', '989289238'),
(829195057, 'Ahkh', 'rjhjhjh@gmail.com', '$2b$10$x2M8EIWOn8kYK8WyHqWt0eh0mpf3YVcMys6HXW.7blImohvy1mUwC');

-- --------------------------------------------------------

--
-- Table structure for table `batches`
--

DROP TABLE IF EXISTS `batches`;
CREATE TABLE IF NOT EXISTS `batches` (
  `Batch_ID` int NOT NULL,
  `Batch_Start_Year` int NOT NULL,
  `Batch_End_Year` int NOT NULL,
  `Batch_Code` varchar(20) NOT NULL,
  PRIMARY KEY (`Batch_ID`),
  UNIQUE KEY `Batch_Code` (`Batch_Code`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `batches`
--

INSERT INTO `batches` (`Batch_ID`, `Batch_Start_Year`, `Batch_End_Year`, `Batch_Code`) VALUES
(382554141, 2021, 2025, 'semester 8');

-- --------------------------------------------------------

--
-- Table structure for table `clubs`
--

DROP TABLE IF EXISTS `clubs`;
CREATE TABLE IF NOT EXISTS `clubs` (
  `Club_ID` int NOT NULL,
  `Club_Name` varchar(100) NOT NULL,
  `Club_Code` varchar(20) NOT NULL,
  PRIMARY KEY (`Club_ID`),
  UNIQUE KEY `Club_Code` (`Club_Code`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `clubs`
--

INSERT INTO `clubs` (`Club_ID`, `Club_Name`, `Club_Code`) VALUES
(998756524, 'My Society', '');

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

DROP TABLE IF EXISTS `courses`;
CREATE TABLE IF NOT EXISTS `courses` (
  `Course_ID` int NOT NULL AUTO_INCREMENT,
  `Course_Name` varchar(100) NOT NULL,
  `Course_Code` varchar(20) NOT NULL,
  `Lecturer_ID` int DEFAULT NULL,
  `Semester` varchar(55) NOT NULL,
  `is_core` tinyint(1) NOT NULL,
  PRIMARY KEY (`Course_ID`),
  UNIQUE KEY `Course_Code` (`Course_Code`),
  KEY `Lecturer_ID` (`Lecturer_ID`),
  KEY `Semester` (`Semester`),
  KEY `Course_Name` (`Course_Name`)
) ENGINE=MyISAM AUTO_INCREMENT=963148764 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `courses`
--

INSERT INTO `courses` (`Course_ID`, `Course_Name`, `Course_Code`, `Lecturer_ID`, `Semester`, `is_core`) VALUES
(963148763, 'Small Data', 'CCS111', 382479330, '', 0),
(880679925, 'Blockchain', 'CCS333', 382479330, 'Semester 2', 0);

-- --------------------------------------------------------

--
-- Table structure for table `jwttokensacademicstaff`
--

DROP TABLE IF EXISTS `jwttokensacademicstaff`;
CREATE TABLE IF NOT EXISTS `jwttokensacademicstaff` (
  `TokenID` int NOT NULL AUTO_INCREMENT,
  `Token` varchar(255) NOT NULL,
  `RefreshToken` varchar(255) NOT NULL,
  `UserID` int DEFAULT NULL,
  PRIMARY KEY (`TokenID`),
  KEY `UserID` (`UserID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jwttokensadmin`
--

DROP TABLE IF EXISTS `jwttokensadmin`;
CREATE TABLE IF NOT EXISTS `jwttokensadmin` (
  `TokenID` int NOT NULL AUTO_INCREMENT,
  `Token` varchar(255) NOT NULL,
  `RefreshToken` varchar(255) NOT NULL,
  `UserID` int DEFAULT NULL,
  PRIMARY KEY (`TokenID`),
  KEY `UserID` (`UserID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jwttokenslecturer`
--

DROP TABLE IF EXISTS `jwttokenslecturer`;
CREATE TABLE IF NOT EXISTS `jwttokenslecturer` (
  `TokenID` int NOT NULL AUTO_INCREMENT,
  `Token` varchar(255) NOT NULL,
  `RefreshToken` varchar(255) NOT NULL,
  `UserID` int DEFAULT NULL,
  PRIMARY KEY (`TokenID`),
  KEY `UserID` (`UserID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jwttokensnonacademicstaff`
--

DROP TABLE IF EXISTS `jwttokensnonacademicstaff`;
CREATE TABLE IF NOT EXISTS `jwttokensnonacademicstaff` (
  `TokenID` int NOT NULL AUTO_INCREMENT,
  `Token` varchar(255) NOT NULL,
  `RefreshToken` varchar(255) NOT NULL,
  `UserID` int DEFAULT NULL,
  PRIMARY KEY (`TokenID`),
  KEY `UserID` (`UserID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `jwttokensstudent`
--

DROP TABLE IF EXISTS `jwttokensstudent`;
CREATE TABLE IF NOT EXISTS `jwttokensstudent` (
  `TokenID` int NOT NULL AUTO_INCREMENT,
  `Token` varchar(255) NOT NULL,
  `RefreshToken` varchar(255) NOT NULL,
  `UserID` int DEFAULT NULL,
  PRIMARY KEY (`TokenID`),
  KEY `UserID` (`UserID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lecturers`
--

DROP TABLE IF EXISTS `lecturers`;
CREATE TABLE IF NOT EXISTS `lecturers` (
  `Lecturer_ID` int NOT NULL AUTO_INCREMENT,
  `Lecturer_Name` varchar(50) NOT NULL,
  `Lecturer_Email` varchar(100) NOT NULL,
  `Lecturer_Contact_Number` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Lecturer_NIC` varchar(15) NOT NULL,
  `Lecturer_Password` varchar(100) NOT NULL,
  PRIMARY KEY (`Lecturer_ID`),
  UNIQUE KEY `Lecturer_Email` (`Lecturer_Email`),
  UNIQUE KEY `Lecturer_NIC` (`Lecturer_NIC`)
) ENGINE=MyISAM AUTO_INCREMENT=415917430 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `lecturers`
--

INSERT INTO `lecturers` (`Lecturer_ID`, `Lecturer_Name`, `Lecturer_Email`, `Lecturer_Contact_Number`, `Lecturer_NIC`, `Lecturer_Password`) VALUES
(1, '537841096', 'Sampath Deegalle', 'sampathd@sltc.a', '0771980569', '767878657V'),
(415917429, 'Achintha Madhusanka', 'achintham@sltc.ac.lk', '0779745674', '763478657V', '$2b$10$ovrFyXIc.YCjmWOkf.wkP.3hXoDSfGs6HI.n7IBAqEbqa5W8U6Egu'),
(382479330, 'Chiyaan Vikram', 'chiyaanv@sltc.ac.lk', '0776725674', '663478657V', '$2b$10$rO3L/Dw3DAQThXlfhE/ve.Tee9GxnlJxjb8WqAEwKZ0Fx8EZYT.Am');

-- --------------------------------------------------------

--
-- Table structure for table `lecturer_courses`
--

DROP TABLE IF EXISTS `lecturer_courses`;
CREATE TABLE IF NOT EXISTS `lecturer_courses` (
  `Lecturer_ID` int NOT NULL,
  `Course_ID` int NOT NULL,
  PRIMARY KEY (`Lecturer_ID`,`Course_ID`),
  KEY `Course_ID` (`Course_ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `login_details`
--

DROP TABLE IF EXISTS `login_details`;
CREATE TABLE IF NOT EXISTS `login_details` (
  `Login_ID` int NOT NULL AUTO_INCREMENT,
  `User_ID` int DEFAULT NULL,
  `Login_Time` datetime DEFAULT NULL,
  PRIMARY KEY (`Login_ID`),
  KEY `User_ID` (`User_ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `non_academic_staff`
--

DROP TABLE IF EXISTS `non_academic_staff`;
CREATE TABLE IF NOT EXISTS `non_academic_staff` (
  `Non_Academic_Staff_ID` int NOT NULL AUTO_INCREMENT,
  `Non_Academic_Staff_Name` varchar(50) NOT NULL,
  `Non_Academic_Staff_Email` varchar(100) NOT NULL,
  `Non_Academic_Staff_Contact_Number` varchar(15) DEFAULT NULL,
  `Non_Academic_Staff_NIC` varchar(15) NOT NULL,
  `Non_Academic_Staff_Password` varchar(100) NOT NULL,
  `Club_ID` int DEFAULT NULL,
  PRIMARY KEY (`Non_Academic_Staff_ID`),
  UNIQUE KEY `Non_Academic_Staff_Email` (`Non_Academic_Staff_Email`),
  UNIQUE KEY `Non_Academic_Staff_NIC` (`Non_Academic_Staff_NIC`),
  KEY `Club_ID` (`Club_ID`)
) ENGINE=MyISAM AUTO_INCREMENT=636222 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `non_academic_staff`
--

INSERT INTO `non_academic_staff` (`Non_Academic_Staff_ID`, `Non_Academic_Staff_Name`, `Non_Academic_Staff_Email`, `Non_Academic_Staff_Contact_Number`, `Non_Academic_Staff_NIC`, `Non_Academic_Staff_Password`, `Club_ID`) VALUES
(497260, 'WWW WWWW', 'wwwg@sltc.ac.lk', '0771765311', '667871157V', '$2b$10$mMuyx6.GpcqF5PunjEAAauyrLjHarUnryBYSGpA/XA5O9B.sRZN4q', 998756524);

-- --------------------------------------------------------

--
-- Table structure for table `semester_courses`
--

DROP TABLE IF EXISTS `semester_courses`;
CREATE TABLE IF NOT EXISTS `semester_courses` (
  `Semester_ID` int NOT NULL,
  `Course_ID` int NOT NULL,
  PRIMARY KEY (`Semester_ID`,`Course_ID`),
  KEY `Course_ID` (`Course_ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `semester_details`
--

DROP TABLE IF EXISTS `semester_details`;
CREATE TABLE IF NOT EXISTS `semester_details` (
  `Semester_ID` int NOT NULL AUTO_INCREMENT,
  `Semester_Name` varchar(50) NOT NULL,
  PRIMARY KEY (`Semester_ID`)
) ENGINE=MyISAM AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `semester_details`
--

INSERT INTO `semester_details` (`Semester_ID`, `Semester_Name`) VALUES
(1, '675517648'),
(2, 'Semester 3'),
(3, 'Semester 3'),
(4, 'Semester 3'),
(5, '189907483'),
(6, '872865087'),
(7, '662565860'),
(8, '243848119'),
(9, 'Semester 6'),
(10, 'Semester 6'),
(11, 'Semester 6');

-- --------------------------------------------------------

--
-- Table structure for table `students`
--

DROP TABLE IF EXISTS `students`;
CREATE TABLE IF NOT EXISTS `students` (
  `Student_ID` int NOT NULL AUTO_INCREMENT,
  `Student_Name` varchar(50) NOT NULL,
  `Student_Reg_Num` varchar(20) NOT NULL,
  `Student_Email` varchar(100) NOT NULL,
  `Student_Contact_Number` varchar(15) DEFAULT NULL,
  `Student_NIC` varchar(15) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Student_Password` varchar(100) NOT NULL,
  `Batch_ID` int DEFAULT NULL,
  `Club_ID` int DEFAULT NULL,
  PRIMARY KEY (`Student_ID`),
  UNIQUE KEY `Student_Reg_Num` (`Student_Reg_Num`),
  UNIQUE KEY `Student_Email` (`Student_Email`),
  UNIQUE KEY `Lecturer_NIC` (`Student_NIC`),
  KEY `Batch_ID` (`Batch_ID`),
  KEY `Club_ID` (`Club_ID`),
  KEY `Student_Contact_Number` (`Student_Contact_Number`),
  KEY `Student_Name` (`Student_Name`)
) ENGINE=MyISAM AUTO_INCREMENT=491206 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Dumping data for table `students`
--

INSERT INTO `students` (`Student_ID`, `Student_Name`, `Student_Reg_Num`, `Student_Email`, `Student_Contact_Number`, `Student_NIC`, `Student_Password`, `Batch_ID`, `Club_ID`) VALUES
(1, 'AA1860', 'laksisig@sltc.ac.lk', '0771980569', '997172647V', '$2b$10$wPILcHTH', '382554141', 998756524, NULL),
(491205, ' Dunuke Rathnayake', 'AA1567', 'dudnu@sltc.ac.lk', '0771786567', '887172647V', '$2b$10$0c0QtEeiBLsikr/vjIA5WeNBU2qtUESQGhTL4nkQUcREsrpdLD1mG', 382554141, 998756524);

-- --------------------------------------------------------

--
-- Table structure for table `student_results`
--

DROP TABLE IF EXISTS `student_results`;
CREATE TABLE IF NOT EXISTS `student_results` (
  `Result_ID` int NOT NULL AUTO_INCREMENT,
  `Student_ID` int DEFAULT NULL,
  `Course_ID` int DEFAULT NULL,
  `Academic_Staff_ID` int DEFAULT NULL,
  `Lecturer_ID` int DEFAULT NULL,
  `Assignment_1` int DEFAULT NULL,
  `Assignment_2` int DEFAULT NULL,
  `Assignment_3` int DEFAULT NULL,
  `Assignment_4` int DEFAULT NULL,
  `Assignment_5` int DEFAULT NULL,
  `Mid_Exam` int DEFAULT NULL,
  `End_Exam` int DEFAULT NULL,
  `Total_Result` int DEFAULT NULL,
  `Grade` varchar(1) DEFAULT NULL,
  `Semester_ID` int DEFAULT NULL,
  PRIMARY KEY (`Result_ID`),
  KEY `Student_ID` (`Student_ID`),
  KEY `Course_ID` (`Course_ID`),
  KEY `Semester_ID` (`Semester_ID`),
  KEY `Academic_Staff_ID` (`Academic_Staff_ID`),
  KEY `Lecturer_ID` (`Lecturer_ID`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `UserID` int NOT NULL,
  `UserName` varchar(50) NOT NULL,
  `UserType` varchar(20) NOT NULL,
  PRIMARY KEY (`UserID`)
) ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
