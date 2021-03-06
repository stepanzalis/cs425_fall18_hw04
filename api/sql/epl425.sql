-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Nov 28, 2018 at 11:21 AM
-- Server version: 10.1.36-MariaDB
-- PHP Version: 7.2.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT = @@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS = @@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION = @@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `epl425`
--

-- --------------------------------------------------------

--
-- Table structure for table `general`
--

CREATE TABLE `general` (
  `id`                   int(11)     NOT NULL,
  `name`                 varchar(30) NOT NULL,
  `address`              varchar(30) NOT NULL,
  `latitude`             double      NOT NULL,
  `longitude`            double      NOT NULL,
  `operator`             varchar(20) NOT NULL,
  `date`                 date        NOT NULL,
  `description`          varchar(50),
  `photo_path`           varchar(50) NOT NULL,
  `ef_system_power`      double      NOT NULL,
  `ef_annual_production` double      NOT NULL,
  `ef_co2_avoided`       double      NOT NULL,
  `ef_reimbursement`     double      NOT NULL,
  `ha_solar_panel`       varchar(50) NOT NULL,
  `ha_azimuth_angle`     float       NOT NULL,
  `ha_inclination_angle` float       NOT NULL,
  `ha_communication`     varchar(50) NOT NULL,
  `ha_inverter`          varchar(50) NOT NULL,
  `ha_sensors`           varchar(50) NOT NULL
)
  ENGINE = InnoDB
  DEFAULT CHARSET = utf8;

--
-- Dumping data for table `general`
--

INSERT INTO `general` (`id`,
                       `name`,
                       `address`,
                       `latitude`,
                       `longitude`,
                       `operator`,
                       `date`,
                       `description`,
                       `photo_path`,
                       `ef_system_power`,
                       `ef_annual_production`,
                       `ef_co2_avoided`,
                       `ef_reimbursement`,
                       `ha_solar_panel`,
                       `ha_azimuth_angle`,
                       `ha_inclination_angle`,
                       `ha_communication`,
                       `ha_inverter`,
                       `ha_sensors`)
VALUES (8,
        'post',
        'aglantia',
        63,
        53,
        'operator',
        '2018-11-14',
        'description',
        'photo',
        0,
        0,
        0,
        0,
        'solar panel',
        23,
        22,
        'wifi',
        'sony',
        'se');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `general`
--
ALTER TABLE `general`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `general`
--
ALTER TABLE `general`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 9;
COMMIT;

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id`         int(11)     NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name`  varchar(255) DEFAULT NULL,
  `email`      varchar(255) DEFAULT NULL,
  `password`   varchar(255) DEFAULT NULL,
  `token`      varchar(100) CHARACTER SET utf16
  COLLATE utf16_unicode_ci NOT NULL
)
  ENGINE = InnoDB
  DEFAULT CHARSET = latin1;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `first_name`, `last_name`, `email`, `password`, `token`)
VALUES (1,
        'admin',
        'admin',
        'admin@ucy.cy',
        '$2y$12$R6rMiOTK2gAYo6ZvUaXZ3uoBAArJG.hOu6YhuCdmuLFmnHuaIoNFa',
        'a$2y$12$R6rMiOTK2gAYo6ZvUaXZ3uoBAArJG.hOu6YhuCdmuLFmnHuaIoNFa'),
       (2,
        'Stepan',
        'Zalis',
        'stepan.zalis@gmail.com',
        '$2y$04$D22E5dq2khL/bk9tjgqOnunADWowqv0iUmIIEXIGkN0KDeN51Wdd2',
        'b$2y$04$D22E5dq2khL/bk9tjgqOnunADWowqv0iUmIIEXIGkN0KDeN51Wdd2');
--
-- Indexes for dumped tables
--

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT,
  AUTO_INCREMENT = 3;
COMMIT;


/*!40101 SET CHARACTER_SET_CLIENT = @OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS = @OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION = @OLD_COLLATION_CONNECTION */;
