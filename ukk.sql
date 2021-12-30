-- phpMyAdmin SQL Dump
-- version 5.1.0
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Apr 21, 2021 at 04:30 AM
-- Server version: 10.4.18-MariaDB
-- PHP Version: 8.0.3

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ukk`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_barang`
--

CREATE TABLE `tbl_barang` (
  `id` int(11) NOT NULL,
  `kode` varchar(255) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `harga` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_barang`
--

INSERT INTO `tbl_barang` (`id`, `kode`, `nama`, `harga`) VALUES
(2, 'PK-002', 'Burger', 12000),
(3, 'PK-003', 'Steakdddd', 30000),
(4, 'PK-004', 'Kentang Goreng', 5000),
(5, 'PK-005', 'Bakso', 10000),
(6, 'PK-006', 'Mie Ayam', 12000),
(7, 'PK-007', 'Ayam Bakar', 20000),
(8, 'PK-008', 'asdhakd', 1222),
(9, 'PK-009', 'awdawfeafgaef', 2129124),
(10, 'PK-010', 'ojawojdowjfpas', 298170274),
(11, 'PK-011', 'ajowdiajowidi', 3979),
(12, 'PK-012', 'iasojdowh', 821047),
(13, 'PK-013', 'akhwdjh', 87777),
(14, 'aaaa', 'aaaa', 1111),
(15, 'dasda', 'add', 324),
(16, 'wsaw', '1231', 123124),
(17, 'jajdw', '028', 9218302),
(18, 'ddd', 'byy', 111),
(19, 'fff', 'buuuu', 4444),
(20, 'awdad', 'addddd', 23);

-- --------------------------------------------------------

--
-- Table structure for table `tbl_login`
--

CREATE TABLE `tbl_login` (
  `username` varchar(255) NOT NULL,
  `password` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_login`
--

INSERT INTO `tbl_login` (`username`, `password`) VALUES
('test', '098f6bcd4621d373cade4e832627b4f6');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_pelanggan`
--

CREATE TABLE `tbl_pelanggan` (
  `id` int(11) NOT NULL,
  `kode` varchar(255) NOT NULL,
  `nama` varchar(255) NOT NULL,
  `alamat` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_pelanggan`
--

INSERT INTO `tbl_pelanggan` (`id`, `kode`, `nama`, `alamat`) VALUES
(14, 'dad', 'add', 'ddd');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_transaksi`
--

CREATE TABLE `tbl_transaksi` (
  `id` int(11) NOT NULL,
  `id_barang` int(11) NOT NULL,
  `id_pelanggan` int(11) NOT NULL,
  `tanggal` datetime NOT NULL,
  `jumlah_barang` int(11) NOT NULL,
  `jumlah_harga` int(11) NOT NULL,
  `diskon` int(11) NOT NULL,
  `harga_setelah_diskon` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `tbl_transaksi`
--

INSERT INTO `tbl_transaksi` (`id`, `id_barang`, `id_pelanggan`, `tanggal`, `jumlah_barang`, `jumlah_harga`, `diskon`, `harga_setelah_diskon`) VALUES
(6, 4, 10, '2021-04-09 03:06:00', 6, 30000, 0, 30000);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_barang`
--
ALTER TABLE `tbl_barang`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_pelanggan`
--
ALTER TABLE `tbl_pelanggan`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_transaksi`
--
ALTER TABLE `tbl_transaksi`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_barang`
--
ALTER TABLE `tbl_barang`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `tbl_pelanggan`
--
ALTER TABLE `tbl_pelanggan`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT for table `tbl_transaksi`
--
ALTER TABLE `tbl_transaksi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
