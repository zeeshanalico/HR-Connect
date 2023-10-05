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
  PRIMARY KEY (`application_id`),
  KEY `job_id` (`job_id`),
  CONSTRAINT `applications_ibfk_1` FOREIGN KEY (`job_id`) REFERENCES `jobs` (`job_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `applications`
--

LOCK TABLES `applications` WRITE;
/*!40000 ALTER TABLE `applications` DISABLE KEYS */;
INSERT INTO `applications` VALUES (22,'waziurehman','wazi@gmail.com','23423-2343432-2','Lahore','34234234242','3','3_waziurehman.pdf','Interview','asdf',3,'Male','343','2+ year','GCU','sdf','df','http://www.applyPage/applyNow?job_title=Android%20Developer&job_id=12','http://www.applyPage/applyNow?job_title=Android%20Developer&job_id=12','3','2023-10-01'),(24,'hafiz islam','hmic828@gmail.com','22222-2222222-2','Lahore','30232334244','234','3_hafiz islam.pdf','Interview','this is my address',3,'Male','23422','2+ year','UCP','sdf','sdf','http://www.applyPage/applyNow?job_title=Android%20Developer&job_id=12','http://www.applyPage/applyNow?job_title=Android%20Developer&job_id=12','2','2023-10-01'),(26,'Munawar Hussain','munawar@gmail.com','33423-2323234-1','Lahore','3015372621','35000','12_Munawar Hussain.pdf','Pending','Johar Town',12,'Male','54990','6+ Months','ITU','BS','CS','https://github.com/zeeshanalico','https://linkedin.com/in/zeeshanalico','2.94','2023-10-01');
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
) ENGINE=InnoDB AUTO_INCREMENT=218 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attendance`
--

LOCK TABLES `attendance` WRITE;
/*!40000 ALTER TABLE `attendance` DISABLE KEYS */;
INSERT INTO `attendance` VALUES (9,2,'2023-09-18','Absent'),(10,2,'2023-09-25','Leave'),(11,2,'2023-09-19','Present'),(143,2,'2023-09-23','Absent'),(147,1,'2023-09-24','Absent'),(151,2,'2023-09-24','Absent'),(156,1,'2023-09-25','Absent'),(166,1,'2023-09-26','Absent'),(170,2,'2023-09-26','Absent'),(180,2,'2023-09-29','Absent'),(181,2,'2023-10-07','Leave'),(182,2,'2023-10-04','Leave'),(183,2,'2023-10-05','Leave'),(184,2,'2023-10-06','Leave'),(185,2,'2023-10-08','Leave'),(199,2,'2023-09-30','Absent'),(201,2,'2023-10-01','Present'),(203,2,'2023-11-09','Leave'),(205,2,'2023-10-02','Absent'),(206,2,'2023-10-03','Absent'),(207,3,'2023-10-04','Present'),(208,6,'2023-10-04','Present'),(209,1,'2023-10-03','Absent'),(210,3,'2023-10-03','Absent'),(211,6,'2023-10-03','Absent'),(212,1,'2023-10-04','Absent'),(213,25,'2023-10-05','Present'),(214,25,'2023-10-04','Absent'),(215,1,'2023-10-05','Absent'),(216,3,'2023-10-05','Absent'),(217,6,'2023-10-05','Absent');
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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,'Project Management Team'),(3,'Quality Assurance (QA) Team'),(4,'Development Team');
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
  `role_id` int DEFAULT NULL,
  `job_id` int DEFAULT NULL,
  `dep_id` int DEFAULT NULL,
  `cgpa` varchar(10) DEFAULT NULL,
  `major` varchar(20) DEFAULT NULL,
  `degree` varchar(20) DEFAULT NULL,
  `github_profile_url` varchar(200) DEFAULT NULL,
  `linkedin_profile_url` varchar(200) DEFAULT NULL,
  `university` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`emp_id`),
  KEY `role_id` (`role_id`),
  KEY `dep_id` (`dep_id`),
  KEY `job_id` (`job_id`),
  CONSTRAINT `employee_ibfk_1` FOREIGN KEY (`role_id`) REFERENCES `roles` (`role_id`),
  CONSTRAINT `employee_ibfk_2` FOREIGN KEY (`dep_id`) REFERENCES `department` (`dep_id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `employee_ibfk_3` FOREIGN KEY (`job_id`) REFERENCES `jobpositions` (`job_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'ihtishm ','muhammadihtisham60@gmail.com','03021055932','shakargarh','shakargarh narrowal','23443','2001-01-21','2351521391','Male','2021-01-21',10000.00,1,NULL,NULL,'3.8','CS','MS','www','www','GCU'),(2,'ali arshad','aliarshad@gmail.com','03021055932','lahore city',' Chattha Colony No.1 shrqpur road begum kot shahdara LHR','12343','2023-03-03','2342222323232','Male','2023-09-27',23240.00,2,2,1,'3.4','CS','BS','www','www','ITU'),(3,'huzaifa Waheed','huzaifa@gmail.com','39292324234','lahore city','asdf','52221','2023-10-01','3453223443432','Male','2023-10-04',2342.00,2,2,1,'2.4','CS','dfs','http://www.applyPage/applyNow?job_title=Android%20Developer&job_id=12','http://www.applyPage/applyNow?job_title=Android%20Developer&job_id=12','GCU'),(6,'Bruce Banner','bb@mail','74902704733','Lahore','Lahore ','33433','2023-08-31','987654321','Male','2023-10-04',2321.00,2,2,NULL,'3','CS','CS','http://www.applyPage/applyNow?job_title=Android%20Developer&job_id=12','http://www.applyPage/applyNow?job_title=Android%20Developer&job_id=12','GCU'),(25,'Zeeshan Ali','zeeshanalico24@gmail.com','30221055932','lahore city','Johar Town , Lahore C block','23223','2023-10-01','2222222222222','Male','2023-10-05',234239.00,2,1,4,'2.95','ss','cv','https://github.com','http://www.linkedin.com','fd');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
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
  `job_name` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`job_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobpositions`
--

LOCK TABLES `jobpositions` WRITE;
/*!40000 ALTER TABLE `jobpositions` DISABLE KEYS */;
INSERT INTO `jobpositions` VALUES (1,'software engineer'),(2,'Lead Project Manager');
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
  PRIMARY KEY (`job_id`),
  KEY `dep_id` (`dep_id`),
  CONSTRAINT `jobs_ibfk_1` FOREIGN KEY (`dep_id`) REFERENCES `department` (`dep_id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `jobs`
--

LOCK TABLES `jobs` WRITE;
/*!40000 ALTER TABLE `jobs` DISABLE KEYS */;
INSERT INTO `jobs` VALUES (2,'Mern Developer','3+years','2023-09-17','2023-10-03','The MERN stack is a popular and powerful technology stack for building modern web applications. It consists of four main technologies: MongoDB, Express.js, React, and Node.js. Each component of the stack plays a specific role in the development process, and together they provide a robust and efficient platform for creating web applications.\n\n',1,'2232300','lahore'),(3,'Data Analyst','4+years','2023-09-18','2023-10-07','As a Data Analyst, you will play a crucial role in our organization by turning data into actionable insights. You will be responsible for collecting, analyzing, and interpreting complex data sets to provide valuable information that drives informed decision-making.\n\nKey Responsibilities:\n\nData Collection: Gather and consolidate data from various sources, including databases, spreadsheets, and external APIs.\n\nData Cleaning: Clean, preprocess, and validate data to ensure accuracy and reliability.\n\nData Analysis: Utilize statistical techniques and data visualization tools to identify trends, patterns, and outliers in the data.\n\nReporting: Create clear and concise reports and dashboards that communicate insights to stakeholders.\n\nPredictive Modeling: Develop and implement predictive models to forecast future trends and outcomes.\n\nA/B Testing: Design and analyze A/B tests to optimize product performance and user experience.\n\nData Insights: Collaborate with cross-functional teams to provide data-driven insights and recommendations.\n\nData Governance: Ensure data integrity and compliance with data privacy regulations.\n\nQualifications:\n\nBachelor\'s degree in a related field (e.g., Statistics, Mathematics, Computer Science).\nProficiency in data analysis tools such as Python, R, or SQL.\nStrong knowledge of data visualization tools like Tableau or Power BI.\nExperience with data cleaning, transformation, and manipulation.\nExcellent problem-solving skills and attention to detail.\nStrong communication skills to convey complex findings in a clear and understandable way.\nAbility to work independently and as part of a team.\nPreferred Qualifications:\n\nMaster\'s degree in Data Science or a related field.\nExperience with machine learning algorithms and predictive modeling.\nKnowledge of big data technologies (e.g., Hadoop, Spark).\nFamiliarity with cloud computing platforms (e.g., AWS, Azure, Google Cloud).',1,'800000','islamabad'),(7,'SQA','3+year','2023-09-18','2023-09-12','\nCertainly! Here\'s a description for a Software Quality Assurance (SQA) position:\n\nJob Title: Software Quality Assurance (SQA) Engineer\n\nJob Description:\n\nAs a Software Quality Assurance (SQA) Engineer, you will play a vital role in ensuring the quality and reliability of our software products. You will work closely with cross-functional teams to develop and execute test plans, identify defects, and contribute to the delivery of high-quality software solutions.\n\nKey Responsibilities:\n\nTest Planning: Collaborate with product managers and developers to create comprehensive test plans and test cases that cover all aspects of software functionality.\n\nTest Execution: Conduct manual and automated tests to identify defects, verify fixes, and validate new features.\n\nRegression Testing: Continuously monitor and conduct regression testing to ensure that software updates do not introduce new issues.\n\nBug Tracking: Document defects accurately, including steps to reproduce and relevant information, and manage defect tracking systems.\n\nTest Automation: Develop and maintain automated test scripts to increase testing efficiency and coverage.\n\nPerformance Testing: Perform load and performance testing to identify bottlenecks and ensure optimal system performance.\n\nSecurity Testing: Conduct security testing to identify vulnerabilities and ensure that our software is secure.\n\nQuality Assurance Processes: Contribute to the improvement of quality assurance processes and best practices within the organization.\n\nQualifications:\n\nBachelor\'s degree in Computer Science, Software Engineering, or a related field.\nProven experience in software quality assurance and testing.\nKnowledge of testing methodologies, tools, and best practices.\nProficiency in test automation tools such as Selenium, JUnit, or similar.\nStrong analytical and problem-solving skills.\nExcellent communication and collaboration skills to work effectively with development and product teams.\nFamiliarity with Agile and DevOps methodologies is a plus.\nPreferred Qualifications:\n\nISTQB or similar certification is a plus.\nExperience with continuous integration and continuous delivery (CI/CD) pipelines.\nKnowledge of performance testing tools like JMeter or LoadRunner.\nUnderstanding of security testing principles and tools.\nExperience with testing mobile applications and web services.\n',1,'3450000','lahore'),(8,'Mern intern','no experience','2023-09-18','2023-09-14','With these changes, you can now filter jobs by providing a minimum and maximum salary range. The jobs displayed will be filtered based on the selected range.',1,'30,000k','lahore'),(9,'Fellowship Program','2+years','2023-09-18','2023-09-28','Type Conversion: If job.salary is stored as a string and you are comparing it to numeric values, you might need to convert it to a number using parseFloat or parseInt to ensure accurate comparisons.\n\nError Handling: Implement error handling in your code to catch any potential issues with data retrieval or filtering. This can help you identify any specific errors that occur during the filtering process.',1,'230000','islamabad'),(10,'Assistant Manager','3+years','2023-09-18','2023-10-04','Data in Your Database: Make sure that the data in your database includes jobs with salaries that fall within the specified range. If there are no jobs that match the given salary range, it will appear as if no jobs are shown.\n\nData Type Matching: Ensure that the data type of the salary attribute in your job objects matches the data type you\'re comparing it to in the filter. If the salary attribute in your data is stored as a string, you might need to convert it to a number for accurate filtering.\n\nCheck for Typos: Double-check that there are no typos or case sensitivity issues in the job.salary values or in the filter input.',NULL,'3400000','Islamabad'),(12,'Android Developer','2+ year','2023-09-29','2023-10-07','About Us:\n[Your Company Name] is a leading technology company that specializes in [mention your company\'s area of expertise, e.g., mobile app development, e-commerce solutions, etc.]. We are dedicated to pushing the boundaries of innovation and creating cutting-edge solutions that enhance the lives of our users.\n\nJob Description:\n\nAre you passionate about Android app development and eager to work on exciting projects in a dynamic team environment? If so, we want you to join our team as an Android Developer! In this role, you will play a pivotal role in designing, developing, and maintaining high-quality Android applications that delight our users.\n\nKey Responsibilities:\n\nCollaborate with cross-functional teams to define, design, and ship new features for our Android apps.\nTranslate designs and wireframes into high-quality code.\nEnsure the performance, quality, and responsiveness of applications.\nIdentify and fix bottlenecks and bugs in the Android applications.\nMaintain code quality and participate in code reviews.\nStay up-to-date with the latest industry trends, technologies, and best practices to continuously improve our Android apps.\nRequirements:\n\nBachelor\'s degree in Computer Science or a related field (or equivalent experience).\nProven experience in Android app development using Java or Kotlin.\nStrong understanding of Android design principles and guidelines.\nExperience with RESTful APIs and third-party libraries.\nProficient understanding of code versioning tools, such as Git.\nAbility to work independently and as part of a collaborative team.\nExcellent problem-solving skills and attention to detail.\nStrong communication and interpersonal skills.',4,'85k+','Lahore');
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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `leaverequest`
--

LOCK TABLES `leaverequest` WRITE;
/*!40000 ALTER TABLE `leaverequest` DISABLE KEYS */;
INSERT INTO `leaverequest` VALUES (3,'Rejected','2023-09-27','232','2023-09-18',2,NULL),(21,'Approved','2023-10-04','Testing aliArshad 2','2023-09-30',2,'2023-10-06'),(22,'Approved','2023-10-07','oneDayLeave','2023-09-29',2,NULL),(23,'Approved','2023-10-08','8','2023-09-29',2,NULL),(24,'Approved','2023-11-09','no ','2023-10-01',2,'2023-11-11'),(25,'Rejected','2023-11-09','sick leave','2023-10-01',2,NULL),(26,'Pending','2023-11-11','sd','2023-10-03',2,'2023-11-15'),(27,'Pending','2023-10-12','sdasdsdas','2023-10-03',2,NULL),(28,'Pending','2023-10-08','we','2023-10-03',2,NULL),(29,'Pending','2023-10-05','nop','2023-10-03',2,'2023-10-16');
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
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'aliarshad@gmail.com','$2b$10$eh3Ln9Wd28b.x8ZugZ6x.uibpjFvc6WbcN8U3/55QagcPixONBLLq',2,2),(2,'muhammadihtisham60@gmail.com','$2b$10$8gpm.48ECA2WtT7ds0cIPOcyi7496Uq1NZdtVci1tkzxrN7mT.pNy',1,1),(38,'huzaifa@gmail.com','$2b$10$ZhrcwS71N4MnkVG8KF7UYOynenDHokEHHzQZBgsfvU36zt3fDqSTi',2,3),(39,'bb@mail','$2b$10$r4XgNsFIR5E4BhyXMUu0K.KEu69gK1NCDcYq4Ky0r.bOx/PvBilIK',2,6),(40,'zeeshanalico24@gmail.com','$2b$10$wuMSsh7LH9rqgdY9YJ.lu.O1ouvdqbz37thQrvwctOHhH2xAKFjL2',2,25);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'hr'
--

--
-- Dumping routines for database 'hr'
--
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
        Department d ON e.dep_id = d.dep_id;
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
	INSERT INTO attendance (emp_id, attendance_date, status)
	SELECT emp_id, Date(NOW()), "Absent" FROM employee WHERE emp_id NOT IN (
		SELECT emp_id FROM attendance WHERE attendance_date = DATE(NOW())
	);
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
    IN p_major VARCHAR(255),
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
        major,
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
        p_major,
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

-- Dump completed on 2023-10-05 10:57:04
