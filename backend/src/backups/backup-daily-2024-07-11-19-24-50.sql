-- MySQL dump 10.13  Distrib 8.0.37, for Linux (x86_64)
--
-- Host: localhost    Database: myWeb
-- ------------------------------------------------------
-- Server version	8.0.37-0ubuntu0.22.04.3

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `devInfoId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `REL_f1f77d2e110c81f3ab14f8c60f` (`devInfoId`),
  CONSTRAINT `FK_f1f77d2e110c81f3ab14f8c60f1` FOREIGN KEY (`devInfoId`) REFERENCES `dev_info` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
INSERT INTO `admin` VALUES (1,'anthonyoppus2000@gmail.com','$2b$10$jTmscplZK3V7geRjA76g..OLBRRoWE0y6r2R0gIuWahfbDvV.fUw6','2024-05-19 07:32:27',1),(2,'anthonyoppus2000@gmail.com','$2b$10$MfDIYnGEVcpDsAHLxRTR.uPcvqFGccOyxYrhPCqHpz3E9ruf7CMHu','2024-06-24 06:24:19',NULL);
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `degree`
--

DROP TABLE IF EXISTS `degree`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `degree` (
  `id` int NOT NULL AUTO_INCREMENT,
  `degree` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `degree`
--

LOCK TABLES `degree` WRITE;
/*!40000 ALTER TABLE `degree` DISABLE KEYS */;
INSERT INTO `degree` VALUES (1,'High School Level','2024-06-24 06:28:05'),(2,'High School Graduate','2024-06-24 06:28:05'),(3,'Vocational School Graduate','2024-06-24 06:28:05'),(4,'College Level','2024-06-24 06:28:05'),(5,'College Graduate','2024-06-24 06:28:05');
/*!40000 ALTER TABLE `degree` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dev_info`
--

DROP TABLE IF EXISTS `dev_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dev_info` (
  `id` int NOT NULL AUTO_INCREMENT,
  `firstName` varchar(255) NOT NULL,
  `middleName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `birthDate` datetime NOT NULL,
  `gender` varchar(255) NOT NULL,
  `devMotto` varchar(255) NOT NULL,
  `devImage` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `age` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dev_info`
--

LOCK TABLES `dev_info` WRITE;
/*!40000 ALTER TABLE `dev_info` DISABLE KEYS */;
INSERT INTO `dev_info` VALUES (1,'Anthony','Balaquit','Oppus','2000-12-04 00:00:00','Male','Crafting you Dream Website into reality','583b6b43f551e91ec74568f17fb9eb2a-1719215666684.jpg','2024-05-19 10:42:45',23);
/*!40000 ALTER TABLE `dev_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `education`
--

DROP TABLE IF EXISTS `education`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `education` (
  `id` int NOT NULL AUTO_INCREMENT,
  `schoolName` varchar(255) NOT NULL,
  `course` varchar(255) NOT NULL,
  `monthGraduated` varchar(255) NOT NULL,
  `yearGraduated` varchar(255) NOT NULL,
  `schoolAddress` varchar(255) NOT NULL,
  `schoolImage` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `degreeId` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_44ad3ba6f9df653cc3946c50375` (`degreeId`),
  CONSTRAINT `FK_44ad3ba6f9df653cc3946c50375` FOREIGN KEY (`degreeId`) REFERENCES `degree` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=28 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `education`
--

LOCK TABLES `education` WRITE;
/*!40000 ALTER TABLE `education` DISABLE KEYS */;
INSERT INTO `education` VALUES (24,'Bilar National High School','Information Communication Technology','April','2019','Yanaya, Bilar, Bohol','bilar logo-1719283590156-1719283757909-1719283770432.jpg','2024-06-25 02:46:30',2),(26,'Bohol Island State University','Bachelor of Science in Computer Science','June','2023','Zamora, Bilar, Bohol','bisu Logo-1719283937752.jpg','2024-06-25 02:52:17',5);
/*!40000 ALTER TABLE `education` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `migrations` (
  `id` int NOT NULL AUTO_INCREMENT,
  `timestamp` bigint NOT NULL,
  `name` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (1,1716096713661,'AdminController1716096713661'),(2,1716103332160,'AdminAccont1716103332160'),(6,1716103808774,'AnthonyAccount1716103808774'),(9,1719207496452,'Degree1719207496452');
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project`
--

DROP TABLE IF EXISTS `project`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `project` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `link` varchar(255) DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  `techStack` varchar(255) NOT NULL,
  `phoneImage` varchar(255) NOT NULL,
  `desktopImage` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project`
--

LOCK TABLES `project` WRITE;
/*!40000 ALTER TABLE `project` DISABLE KEYS */;
INSERT INTO `project` VALUES (12,'Amazing Portfolio Website','https://vercel.app/anthony-oppus','jghjghhvgchgfhdghjfghgfghfhg','Reactjs, Typescript and Tailwind','html-1719589342121.jpg','typescript-1719589309861-1719589342121.jpg','2024-06-28 15:41:10'),(13,'Amazing Portfolio Websiteadsfadf','https://vercel.app/anthony-oppus','asdadfadfsdf','Reactjs, Typescript and Tailwind','reactjs-1720001152095.jpg','pngtree-vintage-retro-blank-labels-logo-image_83079-1720001152117.jpg','2024-07-03 10:05:52');
/*!40000 ALTER TABLE `project` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `skill`
--

DROP TABLE IF EXISTS `skill`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `skill` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `level` varchar(255) NOT NULL,
  `image` varchar(255) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `yrsExperience` float NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `skill`
--

LOCK TABLES `skill` WRITE;
/*!40000 ALTER TABLE `skill` DISABLE KEYS */;
INSERT INTO `skill` VALUES (41,'Typescript','Average','typescript-1717941614986.jpg','2024-06-09 14:00:15',1.5),(42,'Redux','Average','redux-1717941850258.jpg','2024-06-09 14:04:10',0.8),(43,'Tailwindcss','Average','tailwindcss-1717942043215.jpg','2024-06-09 14:07:23',1.5),(44,'Vuejs','Average','vuejs-1717942255571.jpg','2024-06-09 14:10:55',0.8),(45,'Nextjs','Beginner','nextjs-1717942465758.jpg','2024-06-09 14:14:25',0.5),(46,'Axios','Average','axios-1717942745383.jpg','2024-06-09 14:19:05',1.5),(47,'Javascript','Advanced','javascript-1717942990887.jpg','2024-06-09 14:23:10',3),(48,'CSS','Advanced','css-1717943202958.jpg','2024-06-09 14:26:42',3),(49,'HTML','Expert','html-1717943492656.jpg','2024-06-09 14:31:32',4),(50,'MySQL','Average','MySQL-1717943741431-1718001391475.jpg','2024-06-09 14:35:41',1),(51,'MongoDB','Average','mongoDB-1717943994120.jpg','2024-06-09 14:39:54',0.8),(52,'Nodejs','Average','nodejs-1717944182089.jpg','2024-06-09 14:43:02',1),(54,'Nestjs','Beginner','nestjs-1717944654673.jpg','2024-06-09 14:50:54',0.6),(56,'Inertiajs','Beginner','inertiajs-1717945123949.jpg','2024-06-09 14:58:43',0.6),(58,'Reactjs','Advanced','React-white-1717945566352-1717945886251.jpg','2024-06-09 15:06:06',1.5),(59,'PHP','Average','Php-1717945636635.jpg','2024-06-09 15:07:16',1),(62,'Express.js','Average','expressJs-1718032232695.jpg','2024-06-10 15:10:32',1),(63,'Styled Components','Beginner','styledComponents-1718032383924.jpg','2024-06-10 15:13:03',0.5);
/*!40000 ALTER TABLE `skill` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `workExperience`
--

DROP TABLE IF EXISTS `workExperience`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `workExperience` (
  `id` int NOT NULL AUTO_INCREMENT,
  `companyName` varchar(255) NOT NULL,
  `jobTitle` varchar(255) NOT NULL,
  `employmentType` varchar(255) NOT NULL,
  `startMonth` varchar(255) NOT NULL,
  `startYear` varchar(255) NOT NULL,
  `endMonth` varchar(255) DEFAULT NULL,
  `endYear` varchar(255) DEFAULT NULL,
  `jobDescription` varchar(255) NOT NULL,
  `monthlySalary` float NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `untilPresent` enum('Present','Not Present') NOT NULL DEFAULT 'Not Present',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `workExperience`
--

LOCK TABLES `workExperience` WRITE;
/*!40000 ALTER TABLE `workExperience` DISABLE KEYS */;
INSERT INTO `workExperience` VALUES (29,'zongHa SoftWare Solution','Software Developer','Full Time','February','2024','','','Front End Developer of the day',22500,'2024-06-13 02:34:02','Present'),(30,'Rooche Digital Company','Software Developer','Part Time','February','2024','March','2024','Software Developer',12500,'2024-06-13 02:35:08','Not Present'),(31,'Gecko Solution Inc','Software Developer','Full Time','May','2023','February','2024','QCGI Programming Language',15000,'2024-06-13 02:37:29','Not Present');
/*!40000 ALTER TABLE `workExperience` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-07-11 19:24:50
