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
  `cnic` varchar(13) NOT NULL,
  `city` varchar(50) DEFAULT NULL,
  `phone_number` varchar(20) DEFAULT NULL,
  `desired_salary` varchar(20) DEFAULT NULL,
  `cv_pdf` varchar(255) NOT NULL,
  `status` enum('Pending','Rejected','Interview','Hired') NOT NULL DEFAULT 'Pending',
  `address` text,
  `job_id` int NOT NULL,
  PRIMARY KEY (`application_id`),
  KEY `job_id` (`job_id`),
  CONSTRAINT `applications_ibfk_1` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`job_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications`
--

LOCK TABLES `applications` WRITE;
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
INSERT INTO `applications` VALUES (12,'Applit 1','applicant1@example.com','17890123','City 1','12345890','50000','cv1.pdf','Interview','Address 1',5),(13,'Applit 1','applicant1@example.com','17890123','City 1','12345890','50000','cv1.pdf','Pending','Address 1',7),(14,'Applicant 2','applicant2@example.com','2234567890123','City 2','2234567890','55000','cv2.pdf','Rejected','Address 2',6);
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
  `status` enum('Present','Late','Leave') DEFAULT NULL,
  PRIMARY KEY (`attendance_id`),
  UNIQUE KEY `emp_id` (`emp_id`,`attendance_date`),
  CONSTRAINT `attendance_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `employee` (`emp_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
/*!40000 ALTER TABLE `attendance` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,'Department 1'),(2,'Department 2'),(3,'Department 3'),(4,'Department 4'),(5,'Department 5'),(6,'HR'),(7,'Finance'),(8,'Marketing'),(9,'IT'),(10,'Operations'),(11,'Generative Ai');
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
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
  `login_email` varchar(255) DEFAULT NULL,
  `login_password` varchar(255) DEFAULT NULL,
  `role_id` int DEFAULT NULL,
  `job_id` int DEFAULT NULL,
  `dep_id` int DEFAULT NULL,
  PRIMARY KEY (`emp_id`),
  KEY `dep_id` (`dep_id`),
  KEY `role_id` (`role_id`),
  KEY `job_id` (`job_id`),
  CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`dep_id`) REFERENCES `department` (`dep_id`),
  CONSTRAINT `employee_ibfk_2` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`),
  CONSTRAINT `employee_ibfk_3` FOREIGN KEY (`job_id`) REFERENCES `jobpositions` (`job_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'John Doe','john.doe@example.com','123-456-7890','New York','123 Main St','12345','1990-01-15','1234567890123','Male','2020-03-15',75000.00,'john_login@example.com','hashed_password_1',1,1,5),(2,'Jane Smith','jane.smith@example.com','987-654-3210','Los Angeles','456 Elm St','54321','1985-07-20','9876543210987','Female','2019-05-20',65000.00,'jane_login@example.com','hashed_password_2',2,2,6);
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `jobpositions`
--

DROP TABLE IF EXISTS `jobpositions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `jobpositions` (
  `job_id` int NOT NULL AUTO_INCREMENT,
  `job_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`job_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobpositions`
--

LOCK TABLES `jobpositions` WRITE;
/*!40000 ALTER TABLE `jobpositions` DISABLE KEYS */;
INSERT INTO `jobpositions` VALUES (1,'Job Position 1'),(2,'Job Position 2'),(3,'Job Position 3'),(4,'Job Position 4'),(5,'Job Position 5'),(6,'Software Engineer'),(7,'Marketing Specialist'),(8,'Financial Analyst'),(9,'HR Manager'),(10,'Operations Coordinator');
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
  PRIMARY KEY (`job_id`),
  KEY `dep_id` (`dep_id`),
  CONSTRAINT `jobs_ibfk_1` FOREIGN KEY (`dep_id`) REFERENCES `department` (`dep_id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` VALUES (5,'Job Title 1','2 years','2023-09-01','2023-09-30','Description 1',1),(6,'Job Title 2','3 years','2023-09-02','2023-09-29','Description 2',2),(7,'Job Title 3','4 years','2023-09-03','2023-09-28','Description 3',3),(8,'Job Title 4','5 years','2023-09-04','2023-09-27','Description 4',4),(9,'Job Title 5','6 years','2023-09-05','2023-09-26','Description 5',5),(10,'Job Title 1','2 years','2023-09-01','2023-09-30','Description 1',1),(11,'Job Title 2','3 years','2023-09-02','2023-09-29','Description 2',2),(12,'Job Title 3','4 years','2023-09-03','2023-09-28','Description 3',3),(13,'Job Title 4','5 years','2023-09-04','2023-09-27','Description 4',4),(14,'Job Title 5','6 years','2023-09-05','2023-09-26','Description 5',5);
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
  PRIMARY KEY (`leave_req_id`),
  KEY `emp_id` (`emp_id`),
  CONSTRAINT `leaverequest_ibfk_1` FOREIGN KEY (`emp_id`) REFERENCES `employee` (`emp_id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leaverequest`
--

LOCK TABLES `leaverequest` WRITE;
/*!40000 ALTER TABLE `leaverequest` DISABLE KEYS */;
INSERT INTO `leaverequest` VALUES (17,'Pending','2023-09-10','Vacation','2023-08-25',1),(18,'Approved','2023-09-12','Family event','2023-09-05',2),(19,'Pending','2023-09-14','Sick leave','2023-09-09',1),(20,'Rejected','2023-09-11','Personal reasons','2023-09-07',1),(21,'Approved','2023-09-13','Medical appointment','2023-09-10',2),(27,'Pending','2023-09-10','Vacation','2023-08-25',1),(28,'Approved','2023-09-12','Family event','2023-09-05',2);
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
INSERT INTO `roles` VALUES (1,'Employee'),(2,'HR');
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'hr'
--

--
-- Dumping routines for database 'hr'
--
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `attendanceRejected`(IN emp_id_param INT)
BEGIN
UPDATE leaverequest
    SET att_status = 'Rejected'
    WHERE emp_id = emp_id_param;
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
    lr.emp_id,    lr.att_status,
    lr.leave_date,
    lr.reason,
    lr.applying_date,
    e.name AS emp_name,
    d.dep_name,
    d.dep_id
FROM
    leaverequest lr
INNER JOIN
    employee e ON lr.emp_id = e.emp_id
LEFT JOIN
    Department d ON e.dep_id = d.dep_id;

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

-- Dump completed on 2023-09-11 16:04:14
