-- MySQL dump 10.13  Distrib 8.0.38, for Win64 (x86_64)
--
-- Host: localhost    Database: car_selling_nodejs
-- ------------------------------------------------------
-- Server version	8.0.39

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
-- Table structure for table `cthoadon`
--

DROP TABLE IF EXISTS `cthoadon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `cthoadon` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ID_HoaDon` int NOT NULL,
  `IDSanPham` int NOT NULL,
  `SoLuong` int NOT NULL,
  `ThanhTien` float NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_HoaDon` (`ID_HoaDon`),
  KEY `sanpham` (`IDSanPham`),
  CONSTRAINT `cthoadon_ibfk_1` FOREIGN KEY (`ID_HoaDon`) REFERENCES `hoadon` (`ID`),
  CONSTRAINT `sanpham` FOREIGN KEY (`IDSanPham`) REFERENCES `sanpham` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cthoadon`
--

LOCK TABLES `cthoadon` WRITE;
/*!40000 ALTER TABLE `cthoadon` DISABLE KEYS */;
INSERT INTO `cthoadon` VALUES (1,1,1,1,30000),(2,2,2,2,70000),(15,49,1,3,90000),(16,49,3,1,50000);
/*!40000 ALTER TABLE `cthoadon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `giohang`
--

DROP TABLE IF EXISTS `giohang`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `giohang` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `IDTK` int NOT NULL,
  `IDSanPham` int NOT NULL,
  `TenSanPham` varchar(100) NOT NULL,
  `XuatXu` varchar(100) NOT NULL,
  `DonGia` float NOT NULL,
  `SoLuong` int NOT NULL,
  `ThanhTien` float NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `IDTK` (`IDTK`),
  CONSTRAINT `giohang_ibfk_1` FOREIGN KEY (`IDTK`) REFERENCES `taikhoan_kh` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=26 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `giohang`
--

LOCK TABLES `giohang` WRITE;
/*!40000 ALTER TABLE `giohang` DISABLE KEYS */;
INSERT INTO `giohang` VALUES (2,2,2,'Honda CR-V','USA',35000,2,70000);
/*!40000 ALTER TABLE `giohang` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `hoadon`
--

DROP TABLE IF EXISTS `hoadon`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `hoadon` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `IDTK` int NOT NULL,
  `TenKH` varchar(100) NOT NULL,
  `DiaChi` varchar(100) NOT NULL,
  `SDT` varchar(10) NOT NULL,
  `TongTien` float NOT NULL,
  `NgayMua` datetime NOT NULL,
  `GhiChu` varchar(200) NOT NULL,
  `TrangThai` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `IDTK` (`IDTK`),
  KEY `TrangThai` (`TrangThai`),
  CONSTRAINT `hoadon_ibfk_1` FOREIGN KEY (`IDTK`) REFERENCES `taikhoan_kh` (`ID`),
  CONSTRAINT `hoadon_ibfk_2` FOREIGN KEY (`TrangThai`) REFERENCES `trangthai` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=50 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `hoadon`
--

LOCK TABLES `hoadon` WRITE;
/*!40000 ALTER TABLE `hoadon` DISABLE KEYS */;
INSERT INTO `hoadon` VALUES (1,1,'John Doe','123 Main St','1234567890',30000,'2024-12-11 14:56:05','First car purchase',2),(2,2,'Jane Smith','456 Elm St','0987654321',70000,'2024-12-11 14:56:05','SUV for family',1),(49,1,'Nguyễn Sỹ Thủy','338/41 Trường Chinh - Trà Bá - Pleiku - Phường Linh Trung - Quận Thủ Đức - Thành phố Hồ Chí Minh','0962843303',140000,'2024-12-11 22:32:35','hehee',1);
/*!40000 ALTER TABLE `hoadon` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lichsusanpham`
--

DROP TABLE IF EXISTS `lichsusanpham`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `lichsusanpham` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `LoaiSanPham` varchar(255) NOT NULL,
  `Image` varchar(255) NOT NULL,
  `TenSanPham` varchar(255) NOT NULL,
  `GiaNhap` varchar(255) NOT NULL,
  `GiaBan` varchar(255) NOT NULL,
  `SoLuong` varchar(255) NOT NULL,
  `NgayNhap` varchar(255) NOT NULL,
  `XuatXu` varchar(255) NOT NULL,
  `NgayThaoTac` datetime NOT NULL,
  `ThaoTac` varchar(200) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lichsusanpham`
--

LOCK TABLES `lichsusanpham` WRITE;
/*!40000 ALTER TABLE `lichsusanpham` DISABLE KEYS */;
INSERT INTO `lichsusanpham` VALUES (1,'Sedan','camry.jpg','Toyota Camry','25000','30000','10','2023-01-01','Vietnam','2024-12-11 14:56:05','Added new car'),(2,'SUV','crv.jpg','Honda CR-V','28000','35000','15','2023-01-02','USA','2024-12-11 14:56:05','Added new car');
/*!40000 ALTER TABLE `lichsusanpham` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `loaisanpham`
--

DROP TABLE IF EXISTS `loaisanpham`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `loaisanpham` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `Ten` varchar(100) NOT NULL,
  `NgayThem` datetime NOT NULL,
  `update_at` datetime NOT NULL,
  `showw` int NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `loaisanpham`
--

LOCK TABLES `loaisanpham` WRITE;
/*!40000 ALTER TABLE `loaisanpham` DISABLE KEYS */;
INSERT INTO `loaisanpham` VALUES (1,'Sedan','2024-12-11 14:56:05','2024-12-11 22:31:25',1),(2,'SUV','2024-12-11 14:56:05','2024-12-11 14:56:05',1),(3,'Truck','2024-12-11 14:56:05','2024-12-11 14:56:05',1);
/*!40000 ALTER TABLE `loaisanpham` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sanpham`
--

DROP TABLE IF EXISTS `sanpham`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sanpham` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `ID_LoaiSanPham` int NOT NULL,
  `TenSanPham` varchar(100) NOT NULL,
  `imgName` text NOT NULL,
  `Image` longtext NOT NULL,
  `GiaNhap` float NOT NULL,
  `GiaBan` float NOT NULL,
  `SoLuong` int NOT NULL,
  `NgayNhap` datetime NOT NULL,
  `update_at` datetime NOT NULL,
  `XuatXu` int NOT NULL,
  `show_lsp` int NOT NULL,
  `show_xx` int NOT NULL,
  `show_sp` int NOT NULL,
  PRIMARY KEY (`ID`),
  KEY `ID_LoaiSanPham` (`ID_LoaiSanPham`),
  KEY `XuatXu` (`XuatXu`),
  CONSTRAINT `sanpham_ibfk_1` FOREIGN KEY (`ID_LoaiSanPham`) REFERENCES `loaisanpham` (`ID`),
  CONSTRAINT `sanpham_ibfk_2` FOREIGN KEY (`XuatXu`) REFERENCES `xuatxu` (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=62 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sanpham`
--

LOCK TABLES `sanpham` WRITE;
/*!40000 ALTER TABLE `sanpham` DISABLE KEYS */;
INSERT INTO `sanpham` VALUES (1,1,'Toyota Camry','camry.jpg','camry_image_path',25000,30000,8,'2024-12-11 14:56:05','2024-12-11 14:56:05',1,1,1,1),(2,2,'Honda CR-V','crv.jpg','crv_image_path',28000,35000,15,'2024-12-11 14:56:05','2024-12-11 14:56:05',2,1,1,1),(3,3,'Ford F-150','f150.jpg','f150_image_path',40000,50000,4,'2024-12-11 14:56:05','2024-12-11 14:56:05',3,1,1,1);
/*!40000 ALTER TABLE `sanpham` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taikhoan_admin`
--

DROP TABLE IF EXISTS `taikhoan_admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `taikhoan_admin` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `TenTK` varchar(100) NOT NULL,
  `MatKhau` varchar(100) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taikhoan_admin`
--

LOCK TABLES `taikhoan_admin` WRITE;
/*!40000 ALTER TABLE `taikhoan_admin` DISABLE KEYS */;
INSERT INTO `taikhoan_admin` VALUES (1,'admin1','password123'),(2,'admin2','password456');
/*!40000 ALTER TABLE `taikhoan_admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `taikhoan_kh`
--

DROP TABLE IF EXISTS `taikhoan_kh`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `taikhoan_kh` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `TenTK` varchar(100) NOT NULL,
  `MatKhau` varchar(100) NOT NULL,
  `TrangThai` int NOT NULL,
  `NgayDK` datetime NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `taikhoan_kh`
--

LOCK TABLES `taikhoan_kh` WRITE;
/*!40000 ALTER TABLE `taikhoan_kh` DISABLE KEYS */;
INSERT INTO `taikhoan_kh` VALUES (1,'user1','pass1',1,'2024-12-11 14:56:05'),(2,'user2','pass2',1,'2024-12-11 14:56:05'),(3,'user3','pass3',1,'2024-12-11 14:56:05');
/*!40000 ALTER TABLE `taikhoan_kh` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trangthai`
--

DROP TABLE IF EXISTS `trangthai`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trangthai` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `TenTT` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trangthai`
--

LOCK TABLES `trangthai` WRITE;
/*!40000 ALTER TABLE `trangthai` DISABLE KEYS */;
INSERT INTO `trangthai` VALUES (1,'Pending'),(2,'Completed'),(3,'Cancelled'),(4,'Processing');
/*!40000 ALTER TABLE `trangthai` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `xuatxu`
--

DROP TABLE IF EXISTS `xuatxu`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `xuatxu` (
  `ID` int NOT NULL AUTO_INCREMENT,
  `XuatXu` varchar(100) NOT NULL,
  `NgayThem` datetime NOT NULL,
  `update_at` datetime DEFAULT NULL,
  `showw` int NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `xuatxu`
--

LOCK TABLES `xuatxu` WRITE;
/*!40000 ALTER TABLE `xuatxu` DISABLE KEYS */;
INSERT INTO `xuatxu` VALUES (1,'Vietnam','2024-12-11 14:56:05','2024-12-11 14:56:05',1),(2,'USA','2024-12-11 14:56:05','2024-12-11 14:56:05',1),(3,'China','2024-12-11 14:56:05','2024-12-11 14:56:05',1),(4,'Japan','2024-12-11 14:56:05','2024-12-11 14:56:05',1);
/*!40000 ALTER TABLE `xuatxu` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-12-14 23:53:15
