CREATE DATABASE  IF NOT EXISTS `hr` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `hr`;
-- MySQL dump 10.13  Distrib 8.0.33, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: hr
-- ------------------------------------------------------
-- Server version	8.0.33

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `applications`
--

DROP TABLE IF EXISTS `applications`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `applications` (
  `application_id` int NOT NULL AUTO_INCREMENT,
  `applicant_name` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `cnic` varchar(15) NOT NULL,
  `city` varchar(50) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `desired_salary` varchar(20) DEFAULT NULL,
  `cv_pdf` varchar(255) NOT NULL,
  `status` enum('Pending','Rejected','Interview','Hired') NOT NULL DEFAULT 'Pending',
  `address` text,
  `job_id` int NOT NULL,
  `gender` varchar(40) DEFAULT NULL,
  `zipcode` varchar(40) DEFAULT NULL,
  `experience` varchar(30) DEFAULT NULL,
  `university` varchar(100) DEFAULT NULL,
  `degree` varchar(30) DEFAULT NULL,
  `major` varchar(30) DEFAULT NULL,
  `github_profile_url` varchar(200) DEFAULT NULL,
  `linkedin_profile_url` varchar(200) DEFAULT NULL,
  `cgpa` varchar(30) DEFAULT NULL,
  `dob` date DEFAULT NULL,
  `qualification` varchar(255) DEFAULT NULL,
  `dep_id` int DEFAULT NULL,
  PRIMARY KEY (`application_id`),
  KEY `job_id` (`job_id`),
  KEY `fk_dep_id` (`dep_id`),
  CONSTRAINT `applications_ibfk_1` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`job_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `applications_ibfk_2` FOREIGN KEY (`dep_id`) REFERENCES `department` (`dep_id`),
  CONSTRAINT `fk_dep_id` FOREIGN KEY (`dep_id`) REFERENCES `department` (`dep_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications`
--

LOCK TABLES `applications` WRITE;
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
INSERT INTO `applications` VALUES (50,'ahsan ali','ahsam@gmail.com','22232-2222222-2','SDFLSJ','34424232423','222222','22_ahsan ali.pdf','Pending','sdf',22,'Male','22222','4 years','GCU','Computer Science',NULL,'https://www.github.com','https://www.linkedin.com','3','2023-10-29','Master\'s Degree',1),(51,'muhammad husnain ','sssw@gmail.com','22232-2222222-2','SDFLSJ','12233232322','222222','7_muhammad husnain .pdf','Pending','sdf',7,'Female','22222','5 years +','GCU','Information Technology',NULL,'https://www.github.com','https://www.linkedin.com','2','2023-10-30','Doctor of Philosophy',1);
/*!40000 ALTER TABLE `applications` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attendance`
--

DROP TABLE IF EXISTS `attendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attendance` (
  `attendance_id` int NOT NULL AUTO_INCREMENT,
  `emp_id` int DEFAULT NULL,
  `attendance_date` date DEFAULT NULL,
  `status` enum('Present','Late','Leave','Absent') DEFAULT NULL,
  PRIMARY KEY (`attendance_id`),
  UNIQUE KEY `emp_id` (`emp_id`,`attendance_date`),
  CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `employee` (`emp_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=448 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
INSERT INTO `attendance` VALUES (9,2,'2023-09-18','Absent'),(10,2,'2023-09-25','Leave'),(11,2,'2023-09-19','Present'),(143,2,'2023-09-23','Absent'),(147,1,'2023-09-24','Absent'),(151,2,'2023-09-24','Absent'),(156,1,'2023-09-25','Absent'),(166,1,'2023-09-26','Absent'),(170,2,'2023-09-26','Absent'),(180,2,'2023-09-29','Absent'),(181,2,'2023-10-07','Leave'),(182,2,'2023-10-04','Leave'),(183,2,'2023-10-05','Leave'),(184,2,'2023-10-06','Leave'),(185,2,'2023-10-08','Leave'),(199,2,'2023-09-30','Absent'),(201,2,'2023-10-01','Present'),(203,2,'2023-11-09','Leave'),(205,2,'2023-10-02','Absent'),(206,2,'2023-10-03','Absent'),(209,1,'2023-10-03','Absent'),(212,1,'2023-10-04','Absent'),(213,25,'2023-10-05','Present'),(214,25,'2023-10-04','Absent'),(215,1,'2023-10-05','Absent'),(218,1,'2023-10-06','Absent'),(220,25,'2023-10-06','Absent'),(221,1,'2023-10-07','Absent'),(223,25,'2023-10-07','Absent'),(227,27,'2023-10-08','Present'),(228,997,'2023-10-08','Present'),(229,27,'2023-10-07','Absent'),(230,997,'2023-10-07','Absent'),(232,1,'2023-10-08','Absent'),(234,25,'2023-10-08','Absent'),(235,1,'2023-10-09','Absent'),(236,2,'2023-10-09','Absent'),(237,25,'2023-10-09','Absent'),(238,27,'2023-10-09','Absent'),(239,997,'2023-10-09','Absent'),(242,24,'2023-10-18','Present'),(243,24,'2023-10-09','Absent'),(245,1,'2023-10-10','Absent'),(246,2,'2023-10-10','Absent'),(247,24,'2023-10-10','Absent'),(248,25,'2023-10-10','Absent'),(249,27,'2023-10-10','Absent'),(250,997,'2023-10-10','Absent'),(252,1,'2023-10-11','Absent'),(253,2,'2023-10-11','Absent'),(254,24,'2023-10-11','Absent'),(255,25,'2023-10-11','Absent'),(256,27,'2023-10-11','Absent'),(257,997,'2023-10-11','Absent'),(258,1,'2023-10-12','Absent'),(259,2,'2023-10-12','Absent'),(260,24,'2023-10-12','Absent'),(261,25,'2023-10-12','Absent'),(262,27,'2023-10-12','Absent'),(263,997,'2023-10-12','Absent'),(265,1,'2023-10-13','Absent'),(266,2,'2023-10-13','Absent'),(267,24,'2023-10-13','Absent'),(268,25,'2023-10-13','Absent'),(269,27,'2023-10-13','Absent'),(270,997,'2023-10-13','Absent'),(272,1,'2023-10-15','Absent'),(273,2,'2023-10-15','Absent'),(274,24,'2023-10-15','Absent'),(275,25,'2023-10-15','Absent'),(276,27,'2023-10-15','Absent'),(277,997,'2023-10-15','Absent'),(279,1,'2023-10-17','Absent'),(280,2,'2023-10-17','Absent'),(281,24,'2023-10-17','Absent'),(282,25,'2023-10-17','Absent'),(283,27,'2023-10-17','Absent'),(284,997,'2023-10-17','Absent'),(286,2,'2023-10-19','Present'),(287,1,'2023-10-19','Absent'),(288,24,'2023-10-19','Absent'),(289,25,'2023-10-19','Absent'),(290,27,'2023-10-19','Absent'),(291,997,'2023-10-19','Absent'),(297,2,'2023-10-20','Absent'),(301,36,'2023-10-24','Present'),(305,37,'2023-10-24','Present'),(306,38,'2023-10-24','Present'),(307,39,'2023-10-24','Present'),(308,40,'2023-10-24','Present'),(346,1,'2023-10-28','Absent'),(347,2,'2023-10-28','Absent'),(348,24,'2023-10-28','Absent'),(349,25,'2023-10-28','Absent'),(350,27,'2023-10-28','Absent'),(351,36,'2023-10-28','Absent'),(352,37,'2023-10-28','Absent'),(353,38,'2023-10-28','Absent'),(354,39,'2023-10-28','Absent'),(355,40,'2023-10-28','Absent'),(356,997,'2023-10-28','Absent'),(357,1,'2023-10-29','Absent'),(358,2,'2023-10-29','Absent'),(359,24,'2023-10-29','Absent'),(360,25,'2023-10-29','Absent'),(361,27,'2023-10-29','Absent'),(362,36,'2023-10-29','Absent'),(363,37,'2023-10-29','Absent'),(364,38,'2023-10-29','Absent'),(365,39,'2023-10-29','Absent'),(366,40,'2023-10-29','Absent'),(367,997,'2023-10-29','Absent'),(372,1,'2023-10-31','Absent'),(373,2,'2023-10-31','Absent'),(374,24,'2023-10-31','Absent'),(375,25,'2023-10-31','Absent'),(376,27,'2023-10-31','Absent'),(377,36,'2023-10-31','Absent'),(378,37,'2023-10-31','Absent'),(379,38,'2023-10-31','Absent'),(380,39,'2023-10-31','Absent'),(381,40,'2023-10-31','Absent'),(382,997,'2023-10-31','Absent'),(387,48,'2023-11-01','Present'),(388,48,'2023-10-31','Present'),(394,2,'2023-11-02','Leave'),(395,2,'2023-11-04','Leave'),(396,2,'2023-11-10','Leave'),(397,2,'2023-11-11','Leave'),(398,2,'2023-11-14','Leave'),(399,2,'2023-11-18','Leave'),(400,2,'2023-11-19','Leave'),(401,2,'2023-11-20','Leave'),(417,200,'2023-11-01','Present'),(418,197,'2023-11-01','Present'),(419,2031,'2023-11-01','Present'),(420,49,'2023-11-01','Present'),(421,1,'2023-11-01','Present'),(422,2,'2023-11-01','Present'),(423,24,'2023-11-01','Present'),(424,25,'2023-11-01','Present'),(425,27,'2023-11-01','Present'),(426,36,'2023-11-01','Present'),(427,37,'2023-11-01','Present'),(428,38,'2023-11-01','Present'),(429,39,'2023-11-01','Present'),(430,40,'2023-11-01','Present'),(431,997,'2023-11-01','Present'),(432,1,'2023-11-08','Absent'),(433,2,'2023-11-08','Absent'),(434,24,'2023-11-08','Absent'),(435,25,'2023-11-08','Absent'),(436,27,'2023-11-08','Absent'),(437,36,'2023-11-08','Absent'),(438,37,'2023-11-08','Absent'),(439,38,'2023-11-08','Absent'),(440,39,'2023-11-08','Absent'),(441,40,'2023-11-08','Absent'),(442,48,'2023-11-08','Absent'),(443,49,'2023-11-08','Absent'),(444,197,'2023-11-08','Absent'),(445,200,'2023-11-08','Absent'),(446,997,'2023-11-08','Absent'),(447,2031,'2023-11-08','Absent');
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_performanceScore_on_insert` AFTER INSERT ON `attendance` FOR EACH ROW BEGIN
    DECLARE empId INT;
    SET empId = NEW.emp_id;

    -- Call the function to calculate the performanceScore for the employee
    UPDATE employee
    SET performanceScore = CalculatePerformanceScore(empId)
    WHERE emp_id = empId;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_performanceScore_on_update` AFTER UPDATE ON `attendance` FOR EACH ROW BEGIN
    DECLARE empId INT;
    SET empId = NEW.emp_id;

    -- Call the function to calculate the performanceScore for the employee
    UPDATE employee
    SET performanceScore = CalculatePerformanceScore(empId)
    WHERE emp_id = empId;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `degrees`
--

DROP TABLE IF EXISTS `degrees`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `degrees` (
  `deg_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`deg_id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `degrees`
--

LOCK TABLES `degrees` WRITE;
/*!40000 ALTER TABLE `degrees` DISABLE KEYS */;
INSERT INTO `degrees` VALUES (1,'Computer Science'),(2,'Computer Applications'),(3,'Information Technology'),(4,'Software Engineering'),(5,'Business Administration in Information Systems'),(6,'Information Management'),(7,'Computer and Information Science'),(9,'Data Science');
/*!40000 ALTER TABLE `degrees` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department` (
  `dep_id` int NOT NULL AUTO_INCREMENT,
  `dep_name` varchar(30) DEFAULT NULL,
  PRIMARY KEY (`dep_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,'Project Management Team '),(3,'Development Team'),(12,'CA'),(13,'Sales and Marketing');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `department_degree`
--

DROP TABLE IF EXISTS `department_degree`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `department_degree` (
  `dep_id` int NOT NULL,
  `deg_id` int NOT NULL,
  PRIMARY KEY (`dep_id`,`deg_id`),
  KEY `deg_id` (`deg_id`),
  CONSTRAINT `department_degree_ibfk_1` FOREIGN KEY (`dep_id`) REFERENCES `department` (`dep_id`) ON DELETE CASCADE,
  CONSTRAINT `department_degree_ibfk_2` FOREIGN KEY (`deg_id`) REFERENCES `degrees` (`deg_id`),
  CONSTRAINT `department_degree_ibfk_3` FOREIGN KEY (`deg_id`) REFERENCES `degrees` (`deg_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_department_degree_dep` FOREIGN KEY (`dep_id`) REFERENCES `department` (`dep_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department_degree`
--

LOCK TABLES `department_degree` WRITE;
/*!40000 ALTER TABLE `department_degree` DISABLE KEYS */;
INSERT INTO `department_degree` VALUES (1,1),(3,1),(12,1),(1,2),(1,3),(12,3),(1,4),(3,4),(12,4),(3,5),(12,5),(13,5),(13,6),(3,7),(13,9);
/*!40000 ALTER TABLE `department_degree` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `emp_id` int NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone_number` varchar(15) DEFAULT NULL,
  `city` varchar(100) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `zipcode` varchar(10) DEFAULT NULL,
  `DOB` date DEFAULT NULL,
  `cnic` varchar(15) DEFAULT NULL,
  `gender` enum('Male','Female') DEFAULT NULL,
  `hire_date` date DEFAULT NULL,
  `salary` decimal(10,2) DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  `dep_id` int DEFAULT NULL,
  `cgpa` varchar(10) DEFAULT NULL,
  `major` varchar(20) DEFAULT NULL,
  `degree` varchar(255) DEFAULT NULL,
  `github_profile_url` varchar(200) DEFAULT NULL,
  `linkedin_profile_url` varchar(200) DEFAULT NULL,
  `university` varchar(255) DEFAULT NULL,
  `qualification` varchar(255) DEFAULT NULL,
  `job_id` int DEFAULT NULL,
  `Tax` decimal(10,2) GENERATED ALWAYS AS ((case when (`salary` >= 300000) then (`salary` * 0.15) when ((`salary` >= 200000) and (`salary` < 300000)) then (`salary` * 0.12) when ((`salary` >= 100000) and (`salary` < 200000)) then (`salary` * 0.10) when ((`salary` >= 50000) and (`salary` < 100000)) then (`salary` * 0.08) else (`salary` * 0.05) end)) STORED,
  `performanceScore` decimal(5,2) DEFAULT NULL,
  `Bonus` decimal(10,2) GENERATED ALWAYS AS ((case when (`performanceScore` = 100) then (`salary` * 0.02) else 0.0 end)) STORED,
  `netSalary` decimal(10,2) GENERATED ALWAYS AS (((`salary` + `Bonus`) - `Tax`)) STORED,
  PRIMARY KEY (`emp_id`),
  KEY `role_id` (`role_id`),
  KEY `dep_id` (`dep_id`),
  KEY `job_id` (`job_id`),
  CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`),
  CONSTRAINT `employee_ibfk_2` FOREIGN KEY (`dep_id`) REFERENCES `department` (`dep_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `employee_ibfk_3` FOREIGN KEY (`job_id`) REFERENCES `jobpositions` (`job_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` (`emp_id`, `name`, `email`, `phone_number`, `city`, `address`, `zipcode`, `DOB`, `cnic`, `gender`, `hire_date`, `salary`, `role_id`, `dep_id`, `cgpa`, `major`, `degree`, `github_profile_url`, `linkedin_profile_url`, `university`, `qualification`, `job_id`, `performanceScore`) VALUES (1,'ihtishm ','muhammadihtisham269@gmail.com','03021055932','shakargarh','shakargarh narrowal','23443','2001-01-21','2351521391','Male','2021-01-21',23532.00,1,NULL,'3.8','CS','Computer Applications','www','www','GCU','Master\'s Degree',2,95.45),(2,'ali arshad','aliarshad@gmail.com','03021055932','lahore city',' Chattha Colony No.1 shrqpur road begum kot shahdara LHR','12343','2023-03-03','2342222323232','Male','2023-09-27',92630.00,2,1,'3.4','CS','Computer Applications','www','www','ITU','Master\'s Degree',2,95.45),(24,'hafiz islam','hmic828@gmail.com','30232334244','Lahore','this is my address','23422','2023-10-01','2222222222222','Female','2023-10-18',10800.00,2,1,'2','SE','Computer Applications','https://github.com/','http://www.linkedin.com','UCP','Master\'s Degree',3,95.45),(25,'Zeeshan Ali','zeeshanalico24@gmail.com','30221055932','lahore city','Johar Town , Lahore C block','23223','2023-10-01','2222222222222','Male','2023-10-05',23532.00,2,3,'2.95','SE','Computer Applications','https://github.com','http://www.linkedin.com','ITU','Master\'s Degree',7,95.45),(27,'AbdurRafay Nasir','abdulrafaynasir@gmail.com','3021212123','lahore','Lahore','34343','2008-01-28','3454321312321','Male','2023-10-08',24000.00,2,1,'2.3','DS','Business Administration in Information Systems','https://github.com/ihtisham','https://linkedin.com/ihtis','COMSAT','Bachelor\'s Degree',3,95.45),(36,'we','zeeshanalico24@gmail.com','39292324234','fdf','Lahore','23422','2023-10-10','2344223231211','Female','2023-10-24',100000.00,2,1,'4',NULL,'Information Technology','https://github.com','http://www.linkedin.com','UCP','Bachelor\'s Degree',7,95.45),(37,'anas swat','zeeshanalico24@gmail.com','39292324234','ada','this is my address','52221','2023-10-11','2344223231211','Male','2023-10-24',2319.00,2,1,'2',NULL,'Computer Science','https://github.com/shanalico','https://linkedin.com/ihtis','GCU','Master\'s Degree',9,95.45),(38,'quratualain','zeeshanalico24@gmail.com','39292324234','LAHORE','this is my address','23422','2023-10-02','2344223231211','Female','2023-10-24',100000.00,2,1,'2.95',NULL,'Information Technology','https://github.com','https://linkedin.com/zeeshanaer','sdf','Bachelor\'s Degree',22,95.45),(39,'qaisar abbas','zeeshanalico24@gmail.com','39292324234','Lahore','this is my address','23422','2023-10-15','3453223443432','Male','2023-10-24',100000.00,2,1,'2.95',NULL,'Information Technology','https://github.com','http://www.linkedin.com','UCP','Master\'s Degree',10,95.45),(40,'Musa chaudhry','zeeshanalico24@gmail.com','39292324234','lahore','this is my address','52221','2023-10-15','2344223231211','Male','2023-10-24',100000.00,2,1,'2',NULL,'Computer Applications','https://github.com/ihtisham','http://www.linkedin.com','ITU','Master\'s Degree',9,95.45),(48,'wfsd','zeeshanalico24@gmail.com','12342232322','SDFLSJ','sdf','22222','2023-10-01','2223222222222','Male','2023-11-01',111212.00,2,1,'2',NULL,'Computer Applications','https://www.github.com','https://www.linkedin.com','sd','Master\'s Degree',7,95.45),(49,'asdsfdfsds','zeeshanalico24@gmail.com','23234234234','SDFLSJ','sdf','22222','2023-10-03','2223222222222','Male','2023-11-01',22226.00,2,3,'2',NULL,'Software Engineering','https://www.github.com','https://www.linkedin.com','sd','Master\'s Degree',12,95.45),(197,'alikhan','zeeshanalico24@gmail.com','23232323232','SDFLSJ','sdf','22222','2023-10-30','2223222222222','Male','2023-11-01',33333.00,2,3,'2.3',NULL,'4','https://www.github.com','https://www.linkedin.com','GCU','Master\'s Degree',8,95.45),(200,'alikhan','zeeshanalico24@gmail.com','23232323232','SDFLSJ','sdf','22222','2023-10-30','2223222222222','Male','2023-11-01',33333.00,2,3,'2.3',NULL,'4','https://www.github.com','https://www.linkedin.com','GCU','Master\'s Degree',8,95.45),(997,'Shahzaib Ghani','shahzaib@gmail.com','02123423423','lahore city','Johar Town , Lahore C block','23322','2023-10-02','2222222222222','Male','2023-10-08',47000.00,2,1,'3.2','AI','Computer Applications','https://github.com','http://www.linkedin.com','GCU','Master\'s Degree',7,95.45),(2031,'alikhan','zeeshanalico24@gmail.com','23232323232','SDFLSJ','sdf','22222','2023-10-30','2223222222222','Male','2023-11-01',33333.00,2,3,'2.3',NULL,'4','https://www.github.com','https://www.linkedin.com','GCU','Master\'s Degree',8,95.45);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_tax_on_insert` BEFORE INSERT ON `employee` FOR EACH ROW BEGIN
    SET NEW.tax = CASE
        WHEN NEW.Salary >= 300000 THEN NEW.Salary * 0.15
        WHEN NEW.Salary >= 200000 AND NEW.Salary < 300000 THEN NEW.Salary * 0.12
        WHEN NEW.Salary >= 100000 AND NEW.Salary < 200000 THEN NEW.Salary * 0.10
        WHEN NEW.Salary >= 50000 AND NEW.Salary < 100000 THEN NEW.Salary * 0.08
        ELSE NEW.Salary * 0.05
    END;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `calculate_netSalary_insert` BEFORE INSERT ON `employee` FOR EACH ROW BEGIN
    SET NEW.netSalary = NEW.salary + NEW.bonus - NEW.tax;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_tax_on_update` BEFORE UPDATE ON `employee` FOR EACH ROW BEGIN
    SET NEW.tax = CASE
        WHEN NEW.Salary >= 300000 THEN NEW.Salary * 0.15
        WHEN NEW.Salary >= 200000 AND NEW.Salary < 300000 THEN NEW.Salary * 0.12
        WHEN NEW.Salary >= 100000 AND NEW.Salary < 200000 THEN NEW.Salary * 0.10
        WHEN NEW.Salary >= 50000 AND NEW.Salary < 100000 THEN NEW.Salary * 0.08
        ELSE NEW.Salary * 0.05
    END;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_netSalary_after_update` BEFORE UPDATE ON `employee` FOR EACH ROW BEGIN
    SET NEW.netSalary = NEW.salary + NEW.bonus - NEW.tax;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
/*!50003 CREATE*/ /*!50017 DEFINER=`root`@`localhost`*/ /*!50003 TRIGGER `update_netSalary_after_delete` AFTER DELETE ON `employee` FOR EACH ROW BEGIN
    -- You might not need to update netSalary for deleted rows, but you can include it for consistency.
    -- You can also set it to NULL if desired.
    -- For example:
    -- SET NEW.netSalary = NULL;
END */;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Table structure for table `experience`
--

DROP TABLE IF EXISTS `experience`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `experience` (
  `id` int NOT NULL AUTO_INCREMENT,
  `experience` text,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `experience`
--

LOCK TABLES `experience` WRITE;
/*!40000 ALTER TABLE `experience` DISABLE KEYS */;
INSERT INTO `experience` VALUES (1,'0 Experience'),(2,'1 year'),(3,'2 years'),(4,'3 years'),(5,'4 years'),(6,'5 years +');
/*!40000 ALTER TABLE `experience` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `images`
--

DROP TABLE IF EXISTS `images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `images` (
  `img_id` int NOT NULL AUTO_INCREMENT,
  `image_file_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`img_id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `images`
--

LOCK TABLES `images` WRITE;
/*!40000 ALTER TABLE `images` DISABLE KEYS */;
INSERT INTO `images` VALUES (1,'2.png'),(2,'2.png'),(3,'2.png'),(4,'2.png'),(5,'2.jpeg'),(6,'2.JPG'),(7,'2.jpeg'),(8,'2.png'),(9,'2.png'),(10,'2.png'),(11,'2.png'),(12,'2.png');
/*!40000 ALTER TABLE `images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobpositions`
--

DROP TABLE IF EXISTS `jobpositions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobpositions` (
  `job_id` int NOT NULL AUTO_INCREMENT,
  `job_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`job_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobpositions`
--

LOCK TABLES `jobpositions` WRITE;
/*!40000 ALTER TABLE `jobpositions` DISABLE KEYS */;
INSERT INTO `jobpositions` VALUES (2,'Mern Developer'),(3,'Data Analyst'),(7,'SQA'),(8,'Mern intern'),(9,'Fellowship Program'),(10,'Assistant Manager'),(12,'Android Developer'),(13,'Software Engineer'),(22,'Lead Generation');
/*!40000 ALTER TABLE `jobpositions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobs`
--

DROP TABLE IF EXISTS `jobs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobs` (
  `job_id` int NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `experience` varchar(20) DEFAULT NULL,
  `date_posted` date DEFAULT NULL,
  `expiry_date` date DEFAULT NULL,
  `description` text NOT NULL,
  `dep_id` int DEFAULT NULL,
  `salary` varchar(40) DEFAULT NULL,
  `location` varchar(40) DEFAULT NULL,
  `summary` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`job_id`),
  KEY `dep_id` (`dep_id`),
  CONSTRAINT `jobs_ibfk_1` FOREIGN KEY (`dep_id`) REFERENCES `department` (`dep_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` VALUES (2,'Mern Developer','0 experience','2023-09-17','2023-10-03','The MERN stack is a popular and powerful technology stack for building modern web applications. It consists of four main technologies: MongoDB, Express.js, React, and Node.js. Each component of the stack plays a specific role in the development process, and together they provide a robust and efficient platform for creating web applications.\n\n',1,'2232300','lahore','Lead Generation Specialist & this is  Full-Time job, On-Site.'),(3,'Data Analyst','1 years','2023-09-18','2023-10-30','As a Data Analyst, you will play a crucial role in our organization by turning data into actionable insights. You will be responsible for collecting, analyzing, and interpreting complex data sets to provide valuable information that drives informed decision-making.\n\nKey Responsibilities:\n\nData Collection: Gather and consolidate data from various sources, including databases, spreadsheets, and external APIs.\n\nData Cleaning: Clean, preprocess, and validate data to ensure accuracy and reliability.\n\nData Analysis: Utilize statistical techniques and data visualization tools to identify trends, patterns, and outliers in the data.\n\nReporting: Create clear and concise reports and dashboards that communicate insights to stakeholders.\n\nPredictive Modeling: Develop and implement predictive models to forecast future trends and outcomes.\n\nA/B Testing: Design and analyze A/B tests to optimize product performance and user experience.\n\nData Insights: Collaborate with cross-functional teams to provide data-driven insights and recommendations.\n\nData Governance: Ensure data integrity and compliance with data privacy regulations.\n\nQualifications:\n\nBachelor\'s degree in a related field (e.g., Statistics, Mathematics, Computer Science).\nProficiency in data analysis tools such as Python, R, or SQL.\nStrong knowledge of data visualization tools like Tableau or Power BI.\nExperience with data cleaning, transformation, and manipulation.\nExcellent problem-solving skills and attention to detail.\nStrong communication skills to convey complex findings in a clear and understandable way.\nAbility to work independently and as part of a team.\nPreferred Qualifications:\n\nMaster\'s degree in Data Science or a related field.\nExperience with machine learning algorithms and predictive modeling.\nKnowledge of big data technologies (e.g., Hadoop, Spark).\nFamiliarity with cloud computing platforms (e.g., AWS, Azure, Google Cloud).',1,'800000','islamabad','Lead Generation Specialist & this is  Full-Time job, On-Site.'),(7,'SQA','2 years','2023-09-18','2023-12-28','\nCertainly! Here\'s a description for a Software Quality Assurance (SQA) position:\n\nJob Title: Software Quality Assurance (SQA) Engineer\n\nJob Description:\n\nAs a Software Quality Assurance (SQA) Engineer, you will play a vital role in ensuring the quality and reliability of our software products. You will work closely with cross-functional teams to develop and execute test plans, identify defects, and contribute to the delivery of high-quality software solutions.\n\nKey Responsibilities:\n\nTest Planning: Collaborate with product managers and developers to create comprehensive test plans and test cases that cover all aspects of software functionality.\n\nTest Execution: Conduct manual and automated tests to identify defects, verify fixes, and validate new features.\n\nRegression Testing: Continuously monitor and conduct regression testing to ensure that software updates do not introduce new issues.\n\nBug Tracking: Document defects accurately, including steps to reproduce and relevant information, and manage defect tracking systems.\n\nTest Automation: Develop and maintain automated test scripts to increase testing efficiency and coverage.\n\nPerformance Testing: Perform load and performance testing to identify bottlenecks and ensure optimal system performance.\n\nSecurity Testing: Conduct security testing to identify vulnerabilities and ensure that our software is secure.\n\nQuality Assurance Processes: Contribute to the improvement of quality assurance processes and best practices within the organization.\n\nQualifications:\n\nBachelor\'s degree in Computer Science, Software Engineering, or a related field.\nProven experience in software quality assurance and testing.\nKnowledge of testing methodologies, tools, and best practices.\nProficiency in test automation tools such as Selenium, JUnit, or similar.\nStrong analytical and problem-solving skills.\nExcellent communication and collaboration skills to work effectively with development and product teams.\nFamiliarity with Agile and DevOps methodologies is a plus.\nPreferred Qualifications:\n\nISTQB or similar certification is a plus.\nExperience with continuous integration and continuous delivery (CI/CD) pipelines.\nKnowledge of performance testing tools like JMeter or LoadRunner.\nUnderstanding of security testing principles and tools.\nExperience with testing mobile applications and web services.\n',1,'3450000','lahore','Lead Generation Specialist & this is  Full-Time job, On-Site.'),(8,'Mern intern','3 years','2023-09-18','2023-10-30','With these changes, you can now filter jobs by providing a minimum and maximum salary range. The jobs displayed will be filtered based on the selected range.',1,'30,000k','lahore','Lead Generation Specialist & this is  Full-Time job, On-Site.'),(9,'Fellowship Program','4 years','2023-09-18','2023-11-28','Type Conversion: If job.salary is stored as a string and you are comparing it to numeric values, you might need to convert it to a number using parseFloat or parseInt to ensure accurate comparisons.\n\nError Handling: Implement error handling in your code to catch any potential issues with data retrieval or filtering. This can help you identify any specific errors that occur during the filtering process.',1,'230000','islamabad','Lead Generation Specialist & this is  Full-Time job, On-Site.'),(10,'Assistant Manager','5 years +','2023-09-18','2023-11-04','Data in Your Database: Make sure that the data in your database includes jobs with salaries that fall within the specified range. If there are no jobs that match the given salary range, it will appear as if no jobs are shown.\n\nData Type Matching: Ensure that the data type of the salary attribute in your job objects matches the data type you\'re comparing it to in the filter. If the salary attribute in your data is stored as a string, you might need to convert it to a number for accurate filtering.\n\nCheck for Typos: Double-check that there are no typos or case sensitivity issues in the job.salary values or in the filter input.',1,'3400000','Islamabad','Lead Generation Specialist & this is  Full-Time job, On-Site.'),(12,'Android Developer','5 years +','2023-09-29','2023-12-07','About Us:\n[Your Company Name] is a leading technology company that specializes in [mention your company\'s area of expertise, e.g., mobile app development, e-commerce solutions, etc.]. We are dedicated to pushing the boundaries of innovation and creating cutting-edge solutions that enhance the lives of our users.\n\nJob Description:\n\nAre you passionate about Android app development and eager to work on exciting projects in a dynamic team environment? If so, we want you to join our team as an Android Developer! In this role, you will play a pivotal role in designing, developing, and maintaining high-quality Android applications that delight our users.\n\nKey Responsibilities:\n\nCollaborate with cross-functional teams to define, design, and ship new features for our Android apps.\nTranslate designs and wireframes into high-quality code.\nEnsure the performance, quality, and responsiveness of applications.\nIdentify and fix bottlenecks and bugs in the Android applications.\nMaintain code quality and participate in code reviews.\nStay up-to-date with the latest industry trends, technologies, and best practices to continuously improve our Android apps.\nRequirements:\n\nBachelor\'s degree in Computer Science or a related field (or equivalent experience).\nProven experience in Android app development using Java or Kotlin.\nStrong understanding of Android design principles and guidelines.\nExperience with RESTful APIs and third-party libraries.\nProficient understanding of code versioning tools, such as Git.\nAbility to work independently and as part of a collaborative team.\nExcellent problem-solving skills and attention to detail.\nStrong communication and interpersonal skills.',3,'85k+','Lahore','Lead Generation Specialist & this is  Full-Time job, On-Site.'),(13,'Software Engineer','3 years','2023-10-07','2024-03-08','Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod aliquet est, eu malesuada nunc fringilla at. Nulla facilisi. Vestibulum sodales sem sit amet dui placerat, non tristique libero gravida. Proin vulputate bibendum urna, nec dignissim risus fringilla ac.',3,'85k','Lahore','Lead Generation Specialist & this is  Full-Time job, On-Site.'),(22,'Lead Generation','1 year','2023-10-08','2023-11-11','CREATE DEFINER=`root`@`localhost` PROCEDURE `postjob`(\n    IN p_title VARCHAR(255),\n    IN p_experience VARCHAR(255),\n    IN p_expiry_date DATE,\n    IN p_description TEXT,\n    IN p_dep_id INT,\n    IN p_salary DECIMAL(10, 2),\n    IN p_location VARCHAR(255),\n    in p_summary varchar(400)\n)\nBEGIN\n    DECLARE job_id INT;\n    INSERT INTO jobs(title, experience, date_posted, expiry_date, description, dep_id, salary, location,summary)\n    VALUES(p_title, p_experience, NOW(), p_expiry_date, p_description, p_dep_id, p_salary, p_location,p_summary);\n    \n    INSERT INTO jobpositions(title)\n    VALUES(p_title);\n    \nEND',1,'100000.00','Johar Town Lahore','Lead Generation Specialist & this is  Full-Time job, On-Site.');
/*!40000 ALTER TABLE `jobs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `leaverequest`
--

DROP TABLE IF EXISTS `leaverequest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `leaverequest` (
  `leave_req_id` int NOT NULL AUTO_INCREMENT,
  `att_status` enum('Pending','Rejected','Approved') DEFAULT 'Pending',
  `leave_date` date DEFAULT NULL,
  `reason` text,
  `applying_date` date DEFAULT NULL,
  `emp_id` int DEFAULT NULL,
  `toDate` date DEFAULT NULL,
  PRIMARY KEY (`leave_req_id`),
  KEY `emp_id` (`emp_id`),
  CONSTRAINT `leaverequest_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `employee` (`emp_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leaverequest`
--

LOCK TABLES `leaverequest` WRITE;
/*!40000 ALTER TABLE `leaverequest` DISABLE KEYS */;
INSERT INTO `leaverequest` VALUES (3,'Rejected','2023-09-27','232','2023-09-18',2,NULL),(21,'Approved','2023-10-04','Testing aliArshad 2','2023-09-30',2,'2023-10-06'),(22,'Approved','2023-10-07','oneDayLeave','2023-09-29',2,NULL),(23,'Approved','2023-10-08','8','2023-09-29',2,NULL),(24,'Approved','2023-11-09','no ','2023-10-01',2,'2023-11-11'),(25,'Rejected','2023-11-09','sick leave','2023-10-01',2,NULL),(26,'Approved','2023-11-11','sd','2023-10-03',2,'2023-11-15'),(27,'Rejected','2023-10-12','sdasdsdas','2023-10-03',2,NULL),(28,'Rejected','2023-10-08','we','2023-10-03',2,NULL),(29,'Pending','2023-10-05','nop','2023-10-03',2,'2023-10-16'),(30,'Approved','2023-11-02','NO','2023-10-31',2,'2023-11-04'),(31,'Approved','2023-11-02','NO1','2023-10-31',2,NULL),(32,'Approved','2023-11-02','NO2','2023-10-31',2,'2023-11-04'),(33,'Approved','2023-11-02','N0','2023-10-31',2,NULL),(34,'Rejected','2023-11-02','no','2023-10-31',2,'2023-11-03'),(35,'Approved','2023-11-04','dsfs','2023-10-31',2,'2023-11-06'),(36,'Approved','2023-11-10','10triik','2023-10-31',2,NULL),(37,'Approved','2023-11-11','11-13','2023-10-31',2,'2023-11-13'),(38,'Approved','2023-11-14','14-17','2023-10-31',2,'2023-11-17'),(39,'Approved','2023-11-18','18-20','2023-10-31',2,'2023-11-20');
/*!40000 ALTER TABLE `leaverequest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `roles` (
  `role_id` int NOT NULL AUTO_INCREMENT,
  `role_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'HR'),(2,'Employee');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `salary`
--

DROP TABLE IF EXISTS `salary`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `salary` (
  `salary_id` int NOT NULL AUTO_INCREMENT,
  `emp_id` int DEFAULT NULL,
  `salary_amount` varchar(255) DEFAULT NULL,
  `salary_status` varchar(255) DEFAULT NULL,
  `salary_date` date DEFAULT NULL,
  PRIMARY KEY (`salary_id`),
  KEY `emp_id` (`emp_id`),
  CONSTRAINT `salary_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `employee` (`emp_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `salary`
--

LOCK TABLES `salary` WRITE;
/*!40000 ALTER TABLE `salary` DISABLE KEYS */;
/*!40000 ALTER TABLE `salary` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `user_email` varchar(50) DEFAULT NULL,
  `user_password` varchar(150) DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  `emp_id` int DEFAULT NULL,
  PRIMARY KEY (`user_id`),
  KEY `role_id` (`role_id`),
  KEY `emp_id` (`emp_id`),
  CONSTRAINT `users_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`) ON DELETE CASCADE,
  CONSTRAINT `users_ibfk_2` FOREIGN KEY (`emp_id`) REFERENCES `employee` (`emp_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=60 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'aliarshad@gmail.com','$2b$10$eh3Ln9Wd28b.x8ZugZ6x.uibpjFvc6WbcN8U3/55QagcPixONBLLq',2,2),(2,'muhammadihtisham269@gmail.com','$2b$10$8gpm.48ECA2WtT7ds0cIPOcyi7496Uq1NZdtVci1tkzxrN7mT.pNy',1,1),(40,'zeeshanalico24@gmail.com','$2b$10$wuMSsh7LH9rqgdY9YJ.lu.O1ouvdqbz37thQrvwctOHhH2xAKFjL2',2,25),(43,'abdulrafaynasir@gmail.com','$2b$10$TUzw3TLHLkny4r2PKJ3/3e7kHlqS7clTWBg4/kzsuhZGtP2Q2HopO',2,27),(44,'shahzaib@gmail.com','$2b$10$Nhp5yXPuioroWCgmK3FcQuzarkybQkf/uZafThAU1F8KtF3SUmv5a',2,997),(45,'hmic828@gmail.com','$2b$10$gPHAsh1Y3Mdg4Ypr1eJGgO1iESU0aUL5hu.oMLKrrKCzsqsfzupNO',2,24),(48,'zeeshanalico24@gmail.com','$2b$10$fbrH4XUT6CZ6KNhUqYrzMeoh.uRgjKzzcPxTzktdER3hL2fHF3rMe',2,36),(49,'zeeshanalico24@gmail.com','$2b$10$OojtGGGcDQ4uFroAz9qJaOGfCnOZw2XNtj5JkLvJpWBcGdXIThuj.',2,37),(50,'zeeshanalico24@gmail.com','$2b$10$w3dZ6f.UXSPd8WG6EsXzf.JN4F6U82bF5ciG1Sv4V8ucjNMdIOlnC',2,38),(51,'zeeshanalico24@gmail.com','$2b$10$Z/moRfPyw9aUxR.jHATevevFrkSBSOcvA/aEdSHexemz5OvLBJ.Mm',2,39),(52,'zeeshanalico24@gmail.com','$2b$10$QC0wNq.TDqSin5w6/ccqnugU2rIVmpSFABsB/UVCWxD6ZT3R3Q5qu',2,40),(54,'zeeshanalico24@gmail.com','$2b$10$VLDP3SlXCZ6Wm569sqM2mOrZXCRX3lub059KnQHir.PEBxDBvigZ2',2,48),(56,'zeeshanalico24@gmail.com','$2b$10$o/t/1.Pj0CCxGRCNn9MiSumrlAUVTYNMCURPSIxmcPAwCwvSZy84u',2,200),(57,'zeeshanalico24@gmail.com','$2b$10$vD9BButEGAyKQC0.rrpjQeoA9eJiDOTYl5gmA8dcyZ/GbmMY.pDw6',2,197),(58,'zeeshanalico24@gmail.com','$2b$10$NiUdesvQSRZaTJ6/P7z.p.1LIXu.qAH.8QKIWfC65mJtYIEd.HG8m',2,2031),(59,'zeeshanalico24@gmail.com','$2b$10$RUyfxWdiCVI/X9oxozyGduibWBC98l0qKDzfPElxqOQfbkeXL3T3i',2,49);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'hr'
--

--
-- Dumping routines for database 'hr'
--
/*!50003 DROP FUNCTION IF EXISTS `CalculatePerformanceScore` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `CalculatePerformanceScore`(empId INT) RETURNS decimal(5,2)
    DETERMINISTIC
BEGIN
    DECLARE totalPresent INT;
    DECLARE totalAbsent INT;
    DECLARE score DECIMAL(5, 2);
    DECLARE totalWorkingDays INT;
    SET totalWorkingDays = 22;

   SELECT SUM(CASE WHEN status = 'Present' AND MONTH(attendance_date) = MONTH(CURDATE()) THEN 1 ELSE 0 END) INTO totalPresent
FROM attendance
WHERE emp_id = empId;
SELECT SUM(CASE WHEN status = 'Absent' AND MONTH(attendance_date) = MONTH(CURDATE()) THEN 1 ELSE 0 END) INTO totalAbsent
FROM attendance
WHERE emp_id = empId;
        SET score = 100 - (((totalAbsent) / totalWorkingDays) * 100);
    RETURN score;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `attendanceApproval` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `attendanceApproval`(IN id INT, IN p_att_status VARCHAR(10), IN p_date DATE)
BEGIN
	-- inserting into attendance
    INSERT INTO attendance (emp_id, attendance_date, status) VALUES (id, p_date, p_att_status);
    -- updating leave request
    UPDATE leaverequest
    SET att_status = 'Approved'
    WHERE emp_id = id AND leave_date = p_date;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `attendanceRejected` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `attendanceRejected`(IN req_id_param INT)
BEGIN
UPDATE leaverequest
    SET att_status = 'Rejected'
    WHERE leave_req_id = req_id_param;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `deleteEmp` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `deleteEmp`(p_emp_id int)
BEGIN
delete from employee where emp_id = p_emp_id ;
delete from salary where emp_id=p_emp_id ;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `deletejob` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `deletejob`(p_job_id int)
BEGIN
DELETE FROM jobs WHERE job_id = p_job_id;
-- delete from jobpositions where job_id=p_job_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `employeeLeaveHistory` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `employeeLeaveHistory`(IN id INT)
BEGIN
	SELECT * FROM leaverequest 
	WHERE emp_id = id
	ORDER BY leave_date DESC;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getAttendanceHistory` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getAttendanceHistory`()
BEGIN
SELECT
    e.emp_id,
    e.name,
    a.attendance_date,
    a.status
FROM
    employee e
LEFT JOIN
    attendance a ON e.emp_id = a.emp_id
ORDER BY
    e.emp_id, a.attendance_date;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getDashboardStats` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getDashboardStats`()
BEGIN
    DECLARE totalEmployees INT;
    DECLARE presentEmployees INT;
    DECLARE absentEmployees INT;
    DECLARE leaveEmployees INT;

    -- Get the total number of employees
    SELECT COUNT(*) INTO totalEmployees FROM employee;

    -- Get the number of present employees
    SELECT COUNT(*) INTO presentEmployees
    FROM attendance
    WHERE attendance_date = DATE(NOW()) AND status = 'Present';

    -- Get the number of absent employees
    SELECT COUNT(*) INTO absentEmployees
    FROM attendance
    WHERE attendance_date = DATE(NOW()) AND status = 'Late';

    -- Get the number of employees on leave
    SELECT COUNT(*) INTO leaveEmployees
    FROM attendance
    WHERE attendance_date = DATE(NOW()) AND status = 'Leave';

    -- Return the results
    SELECT totalEmployees AS no_of_employees,
           presentEmployees AS no_of_present_employees,
           absentEmployees AS no_of_absent_employees,
           leaveEmployees AS no_of_leave_employees;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getDashboardTotals` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getDashboardTotals`()
BEGIN
    DECLARE totalEmployees INT;
    DECLARE totalDepartments INT;
    DECLARE totalJobs INT;
    DECLARE totalApplications INT;
    DECLARE totalPresent INT;
    DECLARE totalAbsent INT;
	DECLARE totalLeave INT;
    
    SELECT COUNT(*) INTO totalEmployees FROM employee;
    SELECT COUNT(*) INTO totalDepartments FROM department;
    SELECT COUNT(*) INTO totalJobs FROM jobs;
    SELECT COUNT(*) INTO totalApplications FROM applications;
    SELECT COUNT(*) INTO totalPresent
    
    FROM attendance
    WHERE DATE(attendance_date) = CURDATE() AND status = 'Present';

    -- Calculate total absent employees for today
    SELECT COUNT(*) INTO totalAbsent
    FROM attendance
    WHERE DATE(attendance_date) = CURDATE() AND status = 'Absent';
    
    SELECT COUNT(*) INTO totalLeave
    FROM attendance
    WHERE DATE(attendance_date) = CURDATE() AND status = 'Leave';
    
    SELECT totalEmployees, totalDepartments, totalJobs, totalApplications, totalPresent, totalAbsent, totalLeave;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetDepartmentsWithTotalEmployees` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetDepartmentsWithTotalEmployees`()
BEGIN
    SELECT
        d.dep_id,
        d.dep_name,
        COUNT(e.emp_id) AS total_employees
    FROM
        Department d
    LEFT JOIN
        employee e ON d.dep_id = e.dep_id
    GROUP BY
        d.dep_id, d.dep_name;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getLeaveApplication` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getLeaveApplication`()
BEGIN
    SELECT
        lr.emp_id,
        lr.att_status,
        lr.leave_date,
        lr.toDate,
        lr.reason,
        lr.applying_date,
        lr.leave_req_id,
        e.name AS emp_name,
        d.dep_name,
        d.dep_id
    FROM
        leaverequest lr
    INNER JOIN
        employee e ON lr.emp_id = e.emp_id
    LEFT JOIN
        Department d ON e.dep_id = d.dep_id order by lr.applying_date desc;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getPayroll` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getPayroll`()
BEGIN
    SELECT
        ei.emp_id,
        ei.name,
        ei.salary,
        d.dep_name,
        jp.job_name,
        SUM(CASE WHEN a.status = 'Present' THEN 1 ELSE 0 END) AS present_days,
        (SUM(CASE WHEN a.status = 'Present' THEN 1 ELSE 0 END) / 21) * 100 AS performanceScore,
        CASE
            WHEN EXISTS (
                SELECT 1
                FROM salary s
                WHERE s.emp_id = ei.emp_id
                    AND YEAR(s.salary_date) = YEAR(CURRENT_DATE()) -- Filter by current year
                    AND MONTH(s.salary_date) = MONTH(CURRENT_DATE()) -- Filter by current month
                    AND s.salary_status = 'Paid'
            ) THEN 'Paid'
            ELSE 'Not Paid'
        END AS salaryStatus
    FROM employee ei
    JOIN department d ON ei.dep_id = d.dep_id
    JOIN jobpositions jp ON ei.job_id = jp.job_id
    LEFT JOIN attendance a ON a.emp_id = ei.emp_id
    WHERE YEAR(a.attendance_date) = YEAR(CURRENT_DATE()) -- Filter by current year
        AND MONTH(a.attendance_date) = MONTH(CURRENT_DATE()) -- Filter by current month
    GROUP BY
        ei.emp_id,
        ei.name,
        d.dep_name,
        jp.job_name;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getTodayAttendance` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getTodayAttendance`()
BEGIN

SELECT
    e.emp_id,
    e.name ,
    e.dep_id,
    e.email,
    e.gender,
    e.phone_number,
    a.status,
    d.dep_name
FROM
    employee e
LEFT JOIN
    attendance a ON e.emp_id = a.emp_id
inner join 
	department d on d.dep_id=e.dep_id
WHERE
    DATE(a.attendance_date) = CURDATE();
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `markAbsentIntoAttendance` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `markAbsentIntoAttendance`()
BEGIN 
  CREATE TEMPORARY TABLE temp_employee_ids (emp_id INT);
-- Insert the employee IDs into the temporary table
INSERT INTO temp_employee_ids (emp_id)
SELECT e.emp_id
FROM employee e
WHERE e.emp_id NOT IN (
    SELECT a.emp_id
    FROM attendance a
    WHERE a.attendance_date = DATE(NOW())
);

-- Insert records into the 'attendance' table from the temporary table
INSERT INTO attendance (emp_id, attendance_date, status)
SELECT t.emp_id, DATE(NOW()), 'Absent'
FROM temp_employee_ids t;

-- Drop the temporary table when no longer needed
DROP TEMPORARY TABLE temp_employee_ids;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `markAttendance` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `markAttendance`()
begin 
	INSERT INTO attendance (emp_id, attendance_date, status)
	SELECT emp_id, Date(NOW()), "Absent" FROM employee WHERE emp_id NOT IN (
		SELECT emp_id FROM attendance WHERE attendance_date = DATE(NOW())
	);
end ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `multipleAttendanceApproval` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `multipleAttendanceApproval`(IN id INT, IN p_att_status VARCHAR(10), IN p_fromDate DATE, IN p_toDate DATE)
BEGIN
		DECLARE currentDate DATE;
		SET currentDate = p_fromDate;
        WHILE currentDate <= p_toDate DO
			INSERT INTO attendance (emp_id, attendance_date, status) VALUES (id, currentDate, p_att_status);
			SET currentDate = DATE_ADD(currentDate, INTERVAL 1 DAY);
		END WHILE;
        
		UPDATE leaverequest	SET att_status = 'Approved'
		WHERE emp_id = id AND leave_date = p_fromDate;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `postjob` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `postjob`(
    IN p_title VARCHAR(255),
    IN p_experience VARCHAR(255),
    IN p_expiry_date DATE,
    IN p_description TEXT,
    IN p_dep_id INT,
    IN p_salary DECIMAL(10, 2),
    IN p_location VARCHAR(255),
    in p_summary varchar(400)
)
BEGIN
    DECLARE job_id INT;
    INSERT INTO jobs(title, experience, date_posted, expiry_date, description, dep_id, salary, location,summary)
    VALUES(p_title, p_experience, NOW(), p_expiry_date, p_description, p_dep_id, p_salary, p_location,p_summary);
    
    INSERT INTO jobpositions(job_name)
    VALUES(p_title);
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `registerEmployee` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `registerEmployee`(
    IN p_address VARCHAR(255),
    IN p_applicant_name VARCHAR(255),
    IN p_cgpa varchar(10),
    IN p_city VARCHAR(255),
    IN p_cnic VARCHAR(15),
    IN p_degree VARCHAR(255),
    IN p_dep_id INT,
    IN p_dob DATE,
    IN p_email VARCHAR(255),
    IN p_hashed_password varchar(255),
    IN p_emp_id int,
    IN p_gender VARCHAR(10),
    IN p_github_profile_url VARCHAR(255),
    IN p_hire_date DATE,
    IN p_job_id INT,
    IN p_linkedin_profile_url VARCHAR(255),
    IN p_qualification VARCHAR(255),
    IN p_phone_number VARCHAR(15),
    IN p_role_id INT,
    IN p_salary DECIMAL(10, 2),
    IN p_university VARCHAR(255),
    IN p_zipcode VARCHAR(10)
)
BEGIN
    INSERT INTO employee (
        address,
        name,
        cgpa,
        city,
        cnic,
        degree,
        dep_id,
        dob,
        email,
        emp_id,
        gender,
        github_profile_url,
        hire_date,
        job_id,
        linkedin_profile_url,
        qualification,
        phone_number,
        role_id,
        salary,
        university,
        zipcode
    )
    VALUES (
        p_address,
        p_applicant_name,
        p_cgpa,
        p_city,
        p_cnic,
        p_degree,
        p_dep_id,
        p_dob,
        p_email,
        p_emp_id,
        p_gender,
        p_github_profile_url,
        p_hire_date,
        p_job_id,
        p_linkedin_profile_url,
        p_qualification,
        p_phone_number,
        p_role_id,
        p_salary,
        p_university,
        p_zipcode
    );

    INSERT INTO users (user_email, user_password, role_id, emp_id)
    VALUES (p_email, p_hashed_password, p_role_id, p_emp_id);

    INSERT INTO attendance (emp_id, attendance_date, status)
    VALUES (p_emp_id, p_hire_date, 'Present');
    
	DELETE FROM applications WHERE application_id = p_emp_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `rejectApplication` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `rejectApplication`(p_application_id int)
BEGIN
	delete from applications where application_id =p_application_id;
    select * from applicatons where application_id=p_application_id;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-11-12 20:57:08
