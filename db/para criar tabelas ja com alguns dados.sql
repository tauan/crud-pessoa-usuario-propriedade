-- MySQL dump 10.13  Distrib 8.0.23, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: mydb
-- ------------------------------------------------------
-- Server version	8.0.23

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
-- Table structure for table `pessoa`
--

DROP TABLE IF EXISTS `pessoa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pessoa` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(45) NOT NULL,
  `sobrenome` varchar(90) NOT NULL,
  `cpf` char(14) NOT NULL,
  `perfil` enum('produtor','tecnico','administrador') NOT NULL,
  `criado_em` timestamp NOT NULL,
  `atualizado_em` timestamp NOT NULL,
  `desativado_em` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `cpf_UNIQUE` (`cpf`)
) ENGINE=InnoDB AUTO_INCREMENT=65 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pessoa`
--

LOCK TABLES `pessoa` WRITE;
/*!40000 ALTER TABLE `pessoa` DISABLE KEYS */;
INSERT INTO `pessoa` VALUES (5,'Tauan','Gabriel','12345678901','administrador','1970-01-01 03:00:01','2021-04-19 12:17:38',NULL),(52,'Iago','taberna','123456789003','produtor','2021-04-18 20:53:42','2021-04-19 19:46:22','2021-04-19 19:46:22'),(53,'João','pedro','123456789113','tecnico','2021-04-19 11:57:03','2021-04-19 11:57:03',NULL),(54,'João','Luiz1','223456789113','produtor','2021-04-19 11:57:03','2021-04-19 19:46:22',NULL),(55,'Lucas','Sampaio','223466789113','produtor','2021-04-19 12:17:38','2021-04-19 12:17:38',NULL),(56,'Bruna','Fernandes','1245787963','produtor','2021-04-19 12:17:38','2021-04-19 12:17:38',NULL),(57,'Julio','Cezar','875423123323','tecnico','2021-04-19 12:17:38','2021-04-19 12:17:38',NULL),(60,'Izzabel','dos Anjos','33366666555','tecnico','2021-04-19 12:17:38','2021-04-19 12:17:38',NULL),(61,'Michael','Jordan','987456321','produtor','2021-04-19 12:17:38','2021-04-19 19:46:22',NULL),(64,'Rafael','Marquesss','78445878965','tecnico','2021-04-20 11:18:51','2021-04-20 11:18:51',NULL);
/*!40000 ALTER TABLE `pessoa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `propriedade`
--

DROP TABLE IF EXISTS `propriedade`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `propriedade` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(90) NOT NULL,
  `criado_em` timestamp NOT NULL,
  `atualizado_em` timestamp NOT NULL,
  `desativado_em` timestamp NULL DEFAULT NULL,
  `produtor_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_propriedade_pessoa1_idx` (`produtor_id`),
  CONSTRAINT `fk_propriedade_pessoa1` FOREIGN KEY (`produtor_id`) REFERENCES `pessoa` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `propriedade`
--

LOCK TABLES `propriedade` WRITE;
/*!40000 ALTER TABLE `propriedade` DISABLE KEYS */;
INSERT INTO `propriedade` VALUES (1,'Fazenda São Bento','2021-04-19 11:50:23','2021-04-19 11:57:03',NULL,5);
/*!40000 ALTER TABLE `propriedade` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `login` varchar(90) NOT NULL,
  `senha` tinytext NOT NULL,
  `criado_em` timestamp NOT NULL,
  `atualizado_em` timestamp NOT NULL,
  `desativado_em` timestamp NULL DEFAULT NULL,
  `pessoa_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `login_UNIQUE` (`login`),
  KEY `fk_USUARIO_PESSOA_idx` (`pessoa_id`),
  CONSTRAINT `fk_USUARIO_PESSOA` FOREIGN KEY (`pessoa_id`) REFERENCES `pessoa` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES (7,'administrador','8d969eef6ecad3c29a3a629280e686cf0c3f5d5a86aff3ca12020c923adc6c92','2021-04-17 10:49:18','2021-04-17 10:49:18',NULL,5);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-04-20 10:58:22
