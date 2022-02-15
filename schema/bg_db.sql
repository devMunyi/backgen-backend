-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 05, 2022 at 04:02 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.0.13

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `bg_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `pr_code_snippets`
--

CREATE TABLE `pr_code_snippets` (
  `uid` int(11) NOT NULL,
  `row_code` text NOT NULL,
  `file_extension` varchar(10) NOT NULL,
  `language_id` int(5) NOT NULL COMMENT 'From pr_languages',
  `framework_id` int(5) NOT NULL COMMENT 'from pr_frameworks',
  `implementation_id` int(5) NOT NULL COMMENT 'from pr_implementations',
  `dbms_id` int(5) NOT NULL COMMENT 'from pr_dbms',
  `platform_id` int(5) NOT NULL,
  `instructions` text NOT NULL,
  `added_by` int(5) NOT NULL DEFAULT 0,
  `added_date` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_date` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `upvoters` int(5) NOT NULL DEFAULT 0,
  `downvoters` int(5) NOT NULL DEFAULT 0,
  `status` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pr_code_snippets`
--

INSERT INTO `pr_code_snippets` (`uid`, `row_code`, `file_extension`, `language_id`, `framework_id`, `implementation_id`, `dbms_id`, `platform_id`, `instructions`, `added_by`, `added_date`, `updated_date`, `upvoters`, `downvoters`, `status`) VALUES
(1, 'function envList() {\r\n            $.ajax({\r\n            url: \"/api/v1/environments\",\r\n            type: \"GET\",\r\n            dataType: \"json\",\r\n            success: (data) => {\r\n              $(\"#env\").html(\"\");\r\n              for (var i = 0; i < data.response.length; i++) {\r\n                $(\"#env\").append(\r\n                  \'<li class=\"list-group-item\">\' + data.response[name] + \"</li>\";\r\n                );\r\n              }\r\n            },\r\n          });\r\n        }', '.js', 1, 51, 2, 1, 1, 'testing', 1, '0000-00-00 00:00:00', '2021-12-06 18:09:24', 48, 3, 1),
(2, 'Testing0', '.js', 1, 2, 3, 1, 1, 'testing', 1, '0000-00-00 00:00:00', '2021-12-06 18:09:53', 48, 3, 1),
(3, 'testing', '.php', 2, 0, 2, 1, 2, 'testing', 2, '2022-01-03 20:19:44', '2022-01-03 22:19:24', 11, 3, 1),
(4, 'testing', '.php', 2, 0, 2, 1, 2, 'testing', 2, '2022-01-25 18:49:09', '2022-01-25 18:50:52', 11, 3, 0),
(5, 'testing', '.php', 2, 0, 1, 1, 2, 'testing', 1, '2022-01-29 12:39:47', '2022-01-29 12:44:07', 11, 3, 0);

-- --------------------------------------------------------

--
-- Table structure for table `pr_comments`
--

CREATE TABLE `pr_comments` (
  `uid` int(11) NOT NULL,
  `code_snippet_id` int(11) NOT NULL COMMENT 'From  pr_code_snippets',
  `text` text NOT NULL,
  `replies_to` int(11) NOT NULL DEFAULT 0,
  `added_by` int(11) DEFAULT NULL,
  `added_date` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_date` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `upvoters` int(11) NOT NULL DEFAULT 0,
  `downvoters` int(11) NOT NULL DEFAULT 0,
  `status` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pr_comments`
--

INSERT INTO `pr_comments` (`uid`, `code_snippet_id`, `text`, `replies_to`, `added_by`, `added_date`, `updated_date`, `upvoters`, `downvoters`, `status`) VALUES
(2, 2, 'The is not working in my case. I using mac book', 0, 2, '2021-10-07 23:15:02', '2022-01-03 22:19:51', 8, 2, 1),
(3, 2, 'What error are you getting?', 2, 2, '2022-01-03 20:30:34', '2022-01-03 20:30:34', 15, 4, 1),
(4, 2, 'The is not working in my case. I using mac book', 0, 2, '2022-01-25 18:52:08', '2022-01-25 18:54:50', 8, 2, 0),
(5, 1, 'The is not working in my case. I using mac book', 0, 1, '2022-01-29 13:44:42', '2022-01-29 14:11:16', 8, 2, 1);

-- --------------------------------------------------------

--
-- Table structure for table `pr_counters`
--

CREATE TABLE `pr_counters` (
  `uid` int(5) NOT NULL,
  `name` varchar(10) NOT NULL,
  `count_` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- --------------------------------------------------------

--
-- Table structure for table `pr_countries`
--

CREATE TABLE `pr_countries` (
  `uid` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `abbrev` char(3) NOT NULL,
  `flag` varchar(20) DEFAULT NULL,
  `added_by` int(1) DEFAULT 0,
  `added_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `pr_countries`
--

INSERT INTO `pr_countries` (`uid`, `name`, `abbrev`, `flag`, `added_by`, `added_at`, `updated_at`, `status`) VALUES
(1, 'Afghanistan', 'AFG', 'af.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(2, 'Åland', 'ALA', 'ax.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(3, 'Albania', 'ALB', 'al.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(4, 'Algeria', 'DZA', 'dz.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(5, 'American Samoa', 'ASM', 'as.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(6, 'Andorra', 'AND', 'ad.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(7, 'Angola', 'AGO', 'ao.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(8, 'Anguilla', 'AIA', 'ai.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(9, 'Antarctica', 'ATA', 'aq.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(10, 'Antigua and Barbuda', 'ATG', 'ag.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(11, 'Argentina', 'ARG', 'ar.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(12, 'Armenia', 'ARM', 'am.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(13, 'Aruba', 'ABW', 'aw.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(14, 'Australia', 'AUS', 'au.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(15, 'Austria', 'AUT', 'at.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(16, 'Azerbaijan', 'AZE', 'az.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(17, 'Bahamas', 'BHS', 'bs.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(18, 'Bahrain', 'BHR', 'bh.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(19, 'Bangladesh', 'BGD', 'bd.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(20, 'Barbados', 'BRB', 'bb.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(21, 'Belarus', 'BLR', 'by.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(22, 'Belgium', 'BEL', 'be.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(23, 'Belize', 'BLZ', 'bz.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(24, 'Benin', 'BEN', 'bj.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(25, 'Bermuda', 'BMU', 'bm.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(26, 'Bhutan', 'BTN', 'bt.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(27, 'Bolivia', 'BOL', 'bo.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(28, 'Bonaire', 'BES', 'bq.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(29, 'Bosnia and Herzegovina', 'BIH', 'ba.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(30, 'Botswana', 'BWA', 'bw.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(31, 'Bouvet Island', 'BVT', 'bv.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(32, 'Brazil', 'BRA', 'br.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(33, 'British Indian Ocean Territory', 'IOT', 'io.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(34, 'British Virgin Islands', 'VGB', 'vg.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(35, 'Brunei', 'BRN', 'bn.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(36, 'Bulgaria', 'BGR', 'bg.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(37, 'Burkina Faso', 'BFA', 'bf.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(38, 'Burundi', 'BDI', 'bi.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(39, 'Cambodia', 'KHM', 'kh.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(40, 'Cameroon', 'CMR', 'cm.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(41, 'Canada', 'CAN', 'ca.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(42, 'Cape Verde', 'CPV', 'cv.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(43, 'Cayman Islands', 'CYM', 'ky.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(44, 'Central African Republic', 'CAF', 'cf.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(45, 'Chad', 'TCD', 'td.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(46, 'Chile', 'CHL', 'cl.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(47, 'China', 'CHN', 'cn.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(48, 'Christmas Island', 'CXR', 'cx.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(49, 'Cocos [Keeling] Islands', 'CCK', 'cc.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(50, 'Colombia', 'COL', 'co.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(51, 'Comoros', 'COM', 'km.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(52, 'Cook Islands', 'COK', 'ck.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(53, 'Costa Rica', 'CRI', 'cr.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(54, 'Croatia', 'HRV', 'hr.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(55, 'Cuba', 'CUB', 'cu.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(56, 'Curacao', 'CUW', 'cw.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(57, 'Cyprus', 'CYP', 'cy.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(58, 'Czech Republic', 'CZE', 'cz.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(59, 'Democratic Republic of the Congo', 'COD', 'cd.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(60, 'Denmark', 'DNK', 'dk.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(61, 'Djibouti', 'DJI', 'dj.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(62, 'Dominica', 'DMA', 'dm.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(63, 'Dominican Republic', 'DOM', 'do.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(64, 'East Timor', 'TLS', 'tl.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(65, 'Ecuador', 'ECU', 'ec.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(66, 'Egypt', 'EGY', 'eg.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(67, 'El Salvador', 'SLV', 'sv.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(68, 'Equatorial Guinea', 'GNQ', 'gq.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(69, 'Eritrea', 'ERI', 'er.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(70, 'Estonia', 'EST', 'ee.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(71, 'Ethiopia', 'ETH', 'et.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(72, 'Falkland Islands', 'FLK', 'fk.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(73, 'Faroe Islands', 'FRO', 'fo.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(74, 'Fiji', 'FJI', 'fj.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(75, 'Finland', 'FIN', 'fi.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(76, 'France', 'FRA', 'fr.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(77, 'French Guiana', 'GUF', 'gf.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(78, 'French Polynesia', 'PYF', 'pf.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(79, 'French Southern Territories', 'ATF', 'tf.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(80, 'Gabon', 'GAB', 'ga.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(81, 'Gambia', 'GMB', 'gm.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(82, 'Georgia', 'GEO', 'ge.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(83, 'Germany', 'DEU', 'de.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(84, 'Ghana', 'GHA', 'gh.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(85, 'Gibraltar', 'GIB', 'gi.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(86, 'Greece', 'GRC', 'gr.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(87, 'Greenland', 'GRL', 'gl.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(88, 'Grenada', 'GRD', 'gd.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(89, 'Guadeloupe', 'GLP', 'gp.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(90, 'Guam', 'GUM', 'gu.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(91, 'Guatemala', 'GTM', 'gt.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(92, 'Guernsey', 'GGY', 'gg.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(93, 'Guinea', 'GIN', 'gn.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(94, 'Guinea-Bissau', 'GNB', 'gw.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(95, 'Guyana', 'GUY', 'gy.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(96, 'Haiti', 'HTI', 'ht.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(97, 'Heard Island and McDonald Islands', 'HMD', 'hm.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(98, 'Honduras', 'HND', 'hn.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(99, 'Hong Kong', 'HKG', 'hk.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(100, 'Hungary', 'HUN', 'hu.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(101, 'Iceland', 'ISL', 'is.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(102, 'India', 'IND', 'in.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(103, 'Indonesia', 'IDN', 'id.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(104, 'Iran', 'IRN', 'ir.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(105, 'Iraq', 'IRQ', 'iq.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(106, 'Ireland', 'IRL', 'ie.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(107, 'Isle of Man', 'IMN', 'im.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(108, 'Israel', 'ISR', 'il.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(109, 'Italy', 'ITA', 'it.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(110, 'Ivory Coast', 'CIV', 'ci.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(111, 'Jamaica', 'JAM', 'jm.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(112, 'Japan', 'JPN', 'jp.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(113, 'Jersey', 'JEY', 'je.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(114, 'Jordan', 'JOR', 'jo.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(115, 'Kazakhstan', 'KAZ', 'kz.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(116, 'Kenya', 'KEN', 'ke.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(117, 'Kiribati', 'KIR', 'ki.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(118, 'Kosovo', 'XKX', 'xk.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(119, 'Kuwait', 'KWT', 'kw.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(120, 'Kyrgyzstan', 'KGZ', 'kg.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(121, 'Laos', 'LAO', 'la.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(122, 'Latvia', 'LVA', 'lv.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(123, 'Lebanon', 'LBN', 'lb.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(124, 'Lesotho', 'LSO', 'ls.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(125, 'Liberia', 'LBR', 'lr.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(126, 'Libya', 'LBY', 'ly.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(127, 'Liechtenstein', 'LIE', 'li.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(128, 'Lithuania', 'LTU', 'lt.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(129, 'Luxembourg', 'LUX', 'lu.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(130, 'Macao', 'MAC', 'mo.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(131, 'Macedonia', 'MKD', 'mk.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(132, 'Madagascar', 'MDG', 'mg.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(133, 'Malawi', 'MWI', 'mw.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(134, 'Malaysia', 'MYS', 'my.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(135, 'Maldives', 'MDV', 'mv.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(136, 'Mali', 'MLI', 'ml.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(137, 'Malta', 'MLT', 'mt.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(138, 'Marshall Islands', 'MHL', 'mh.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(139, 'Martinique', 'MTQ', 'mq.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(140, 'Mauritania', 'MRT', 'mr.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(141, 'Mauritius', 'MUS', 'mu.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(142, 'Mayotte', 'MYT', 'yt.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(143, 'Mexico', 'MEX', 'mx.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(144, 'Micronesia', 'FSM', 'fm.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(145, 'Moldova', 'MDA', 'md.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(146, 'Monaco', 'MCO', 'mc.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(147, 'Mongolia', 'MNG', 'mn.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(148, 'Montenegro', 'MNE', 'me.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(149, 'Montserrat', 'MSR', 'ms.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(150, 'Morocco', 'MAR', 'ma.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(151, 'Mozambique', 'MOZ', 'mz.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(152, 'Myanmar [Burma]', 'MMR', 'mm.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(153, 'Namibia', 'NAM', 'na.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(154, 'Nauru', 'NRU', 'nr.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(155, 'Nepal', 'NPL', 'np.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(156, 'Netherlands', 'NLD', 'nl.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(157, 'New Caledonia', 'NCL', 'nc.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(158, 'New Zealand', 'NZL', 'nz.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(159, 'Nicaragua', 'NIC', 'ni.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(160, 'Niger', 'NER', 'ne.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(161, 'Nigeria', 'NGA', 'ng.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(162, 'Niue', 'NIU', 'nu.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(163, 'Norfolk Island', 'NFK', 'nf.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(164, 'North Korea', 'PRK', 'kp.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(165, 'Northern Mariana Islands', 'MNP', 'mp.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(166, 'Norway', 'NOR', 'no.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(167, 'Oman', 'OMN', 'om.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(168, 'Pakistan', 'PAK', 'pk.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(169, 'Palau', 'PLW', 'pw.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(170, 'Palestine', 'PSE', 'ps.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(171, 'Panama', 'PAN', 'pa.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(172, 'Papua New Guinea', 'PNG', 'pg.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(173, 'Paraguay', 'PRY', 'py.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(174, 'Peru', 'PER', 'pe.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(175, 'Philippines', 'PHL', 'ph.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(176, 'Pitcairn Islands', 'PCN', 'pn.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(177, 'Poland', 'POL', 'pl.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(178, 'Portugal', 'PRT', 'pt.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(179, 'Puerto Rico', 'PRI', 'pr.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(180, 'Qatar', 'QAT', 'qa.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(181, 'Republic of the Congo', 'COG', 'cg.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(182, 'Réunion', 'REU', 're.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(183, 'Romania', 'ROU', 'ro.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(184, 'Russia', 'RUS', 'ru.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(185, 'Rwanda', 'RWA', 'rw.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(186, 'Saint Barthélemy', 'BLM', 'bl.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(187, 'Saint Helena', 'SHN', 'sh.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(188, 'Saint Kitts and Nevis', 'KNA', 'kn.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(189, 'Saint Lucia', 'LCA', 'lc.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(190, 'Saint Martin', 'MAF', 'mf.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(191, 'Saint Pierre and Miquelon', 'SPM', 'pm.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(192, 'Saint Vincent and the Grenadines', 'VCT', 'vc.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(193, 'Samoa', 'WSM', 'ws.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(194, 'San Marino', 'SMR', 'sm.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(195, 'São Tomé and Príncipe', 'STP', 'st.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(196, 'Saudi Arabia', 'SAU', 'sa.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(197, 'Senegal', 'SEN', 'sn.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(198, 'Serbia', 'SRB', 'rs.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(199, 'Seychelles', 'SYC', 'sc.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(200, 'Sierra Leone', 'SLE', 'sl.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(201, 'Singapore', 'SGP', 'sg.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(202, 'Sint Maarten', 'SXM', 'sx.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(203, 'Slovakia', 'SVK', 'sk.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(204, 'Slovenia', 'SVN', 'si.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(205, 'Solomon Islands', 'SLB', 'sb.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(206, 'Somalia', 'SOM', 'so.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(207, 'South Africa', 'ZAF', 'za.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(208, 'South Georgia and the South Sandwich Islands', 'SGS', 'gs.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(209, 'South Korea', 'KOR', 'kr.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(210, 'South Sudan', 'SSD', 'ss.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(211, 'Spain', 'ESP', 'es.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(212, 'Sri Lanka', 'LKA', 'lk.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(213, 'Sudan', 'SDN', 'sd.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(214, 'Suriname', 'SUR', 'sr.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(215, 'Svalbard and Jan Mayen', 'SJM', 'sj.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(216, 'Swaziland', 'SWZ', 'sz.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(217, 'Sweden', 'SWE', 'se.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(218, 'Switzerland', 'CHE', 'ch.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(219, 'Syria', 'SYR', 'sy.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(220, 'Taiwan', 'TWN', 'tw.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(221, 'Tajikistan', 'TJK', 'tj.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(222, 'Tanzania', 'TZA', 'tz.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(223, 'Thailand', 'THA', 'th.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(224, 'Togo', 'TGO', 'tg.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(225, 'Tokelau', 'TKL', 'tk.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(226, 'Tonga', 'TON', 'to.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(227, 'Trinidad and Tobago', 'TTO', 'tt.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(228, 'Tunisia', 'TUN', 'tn.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(229, 'Turkey', 'TUR', 'tr.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(230, 'Turkmenistan', 'TKM', 'tm.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(231, 'Turks and Caicos Islands', 'TCA', 'tc.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(232, 'Tuvalu', 'TUV', 'tv.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(233, 'U.S. Minor Outlying Islands', 'UMI', 'um.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(234, 'U.S. Virgin Islands', 'VIR', 'vi.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(235, 'Uganda', 'UGA', 'ug.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(236, 'Ukraine', 'UKR', 'ua.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(237, 'United Arab Emirates', 'ARE', 'ae.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(238, 'United Kingdom', 'GBR', 'gb.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(239, 'United States', 'USA', 'us.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(240, 'Uruguay', 'URY', 'uy.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(241, 'Uzbekistan', 'UZB', 'uz.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(242, 'Vanuatu', 'VUT', 'vu.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(243, 'Vatican City', 'VAT', 'va.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(244, 'Venezuela', 'VEN', 've.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(245, 'Vietnam', 'VNM', 'vn.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(246, 'Wallis and Futuna', 'WLF', 'wf.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(247, 'Western Sahara', 'ESH', 'eh.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(248, 'Yemen', 'YEM', 'ye.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(249, 'Zambia', 'ZMB', 'zm.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(250, 'Zimbabwe', 'ZWE', 'zw.png', 0, '2022-02-01 13:19:33', '2022-02-01 13:19:33', 1),
(251, 'CountrySample', 'SMP', 'ke-1643716817363.png', 1, '2022-02-01 14:56:37', '2022-02-01 15:02:33', 0),
(252, 'CountrySample', 'SMP', 'ke-1644069506347.png', 1, '2022-02-05 16:28:31', '2022-02-05 16:58:26', 1),
(253, 'CountrySample2', 'SMP', '', 1, '2022-02-05 16:29:45', '2022-02-05 17:01:40', 0);

-- --------------------------------------------------------

--
-- Table structure for table `pr_dbms`
--

CREATE TABLE `pr_dbms` (
  `uid` int(10) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `icon` varchar(250) NOT NULL,
  `added_by` int(1) NOT NULL,
  `added_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pr_dbms`
--

INSERT INTO `pr_dbms` (`uid`, `name`, `description`, `icon`, `added_by`, `added_at`, `updated_at`, `status`) VALUES
(1, 'MySQL', 'MySQL is an open-source relational database management system. Its name is a combination of \"My\", the name of co-founder Michael Widenius\'s daughter, and \"SQL\", the abbreviation for Structured Query Language.', 'mysql.png', 0, '2021-12-27 10:48:58', '2021-12-27 10:48:58', 1),
(2, 'PostgreSQL', 'PostgreSQL, also known as Postgres, is a free and open-source relational database management system emphasizing extensibility and SQL compliance. It was originally named POSTGRES, referring to its origins as a successor to the Ingres database developed at the University of California, Berkeley', 'pgr.png', 0, '2021-12-27 10:48:58', '2021-12-27 10:48:58', 1),
(3, 'Oracle', 'Oracle Database is a multi-model database management system produced and marketed by Oracle Corporation. It is a database commonly used for running online transaction processing, data warehousing and mixed database workloads.', 'oracle.png', 0, '2021-12-27 10:48:58', '2021-12-27 10:48:58', 1),
(4, 'MongoDb', 'MongoDB is a source-available cross-platform document-oriented database program. Classified as a NoSQL database program, MongoDB uses JSON-like documents with optional schemas. MongoDB is developed by MongoDB Inc. and licensed under the Server Side Public License', 'mgdb.png', 0, '2021-12-27 10:48:58', '2021-12-27 10:48:58', 1),
(5, 'SQLite ', 'SQLite is a relational database management system contained in a C library. In contrast to many other database management systems, SQLite is not a client–server database engine. Rather, it is embedded into the end program. SQLite generally follows PostgreSQL syntax.', 'slt.png', 0, '2021-12-27 10:48:58', '2021-12-27 10:48:58', 1),
(6, 'IBM DB2', 'Db2 is a family of data management products, including database servers, developed by IBM. They initially supported the relational model, but were extended to support object–relational features and non-relational structures like JSON and XML.', 'db2.png', 0, '2021-12-27 10:48:58', '2021-12-27 10:48:58', 1),
(7, 'Apache CouchDB', 'Apache CouchDB is an open-source document-oriented NoSQL database, implemented in Erlang. CouchDB uses multiple formats and protocols to store, transfer, and process its data. It uses JSON to store data, JavaScript as its query language using MapReduce, and HTTP for an API.', 'acdb.png', 0, '2021-12-27 10:48:58', '2022-01-03 22:18:46', 1),
(8, 'Raima ', 'Raima Database Manager is an ACID-compliant embedded database management system designed for use in embedded systems applications. RDM has been designed to utilize multi-core computers, networking, and on-disk or in-memory storage management.', 'raima.png', 0, '2021-12-27 10:48:58', '2021-12-27 10:48:58', 1),
(9, 'Ingres', 'Ingres Database is a proprietary SQL relational database management system intended to support large commercial and government applications.', 'ing.png', 0, '2021-12-27 10:48:58', '2021-12-27 10:48:58', 1),
(10, 'InterBase ', 'InterBase is a relational database management system currently developed and marketed by Embarcadero Technologies. InterBase is distinguished from other RDBMSs by its small footprint, close to zero administration requirements, and multi-generational architecture.', 'ibdb.png', 0, '2021-12-27 10:48:58', '2021-12-27 10:48:58', 1),
(12, 'InterSystems Caché', 'InterSystems Caché is a commercial operational database management system from InterSystems, used to develop software applications for healthcare management, banking and financial services, government, and other sectors. Customer software can use the database with object and SQL code.', 'isc.png', 0, '2021-12-27 10:48:58', '2022-01-03 22:18:46', 1),
(13, 'LibreOffice Base', 'LibreOffice Base is a free and open-source relational database management system that is part of the LibreOffice office suite. LibreOffice Base was built off of a fork of OpenOffice.org and was first released as version 3.4.0.1 on October 4, 2011', 'lob.png', 0, '2021-12-27 10:48:58', '2022-01-03 22:18:46', 1),
(14, 'MonetDB ', 'MonetDB is an open-source column-oriented relational database management system originally developed at the Centrum Wiskunde & Informatica in the Netherlands. It is designed to provide high performance on complex queries against large databases, such as combining tables with hundreds of columns and millions of rows', 'mtdb.png', 0, '2021-12-27 10:48:58', '2021-12-27 10:48:58', 1),
(15, 'EXtremeDB', 'eXtremeDB is a high performance, low-latency, ACID-compliant embedded database management system using an in-memory database system architecture and designed to be linked into C/C++ based programs. It works on Windows, Linux, and other real-time and embedded operating systems.', 'xtdb.png', 0, '2021-12-27 10:48:58', '2021-12-27 10:48:58', 1),
(16, 'MAxDB', 'MaxDB is an ANSI SQL-92 compliant relational database management system from SAP AG, which was also delivered by MySQL AB from 2003 to 2007. MaxDB is targeted for large SAP environments e.g. mySAP Business Suite and other applications that require enterprise-level database functionality.', 'mxdb.png', 0, '2021-12-27 10:48:58', '2021-12-27 10:48:58', 1),
(17, 'Oracle Rdb', 'Oracle Rdb is a relational database management system for the OpenVMS operating system. It was originally released by Digital Equipment Corporation in 1984 as VAX Rdb/VMS.', 'ordb.png', 0, '2021-12-27 10:48:58', '2021-12-27 10:48:58', 1),
(18, 'Linter', 'Linter SQL RDBMS is the main product of RELEX Group. Linter is a Russian DBMS compliant with the SQL:2003 standard and supporting the majority of operating systems, among them Windows, various versions of Unix, QNX, and others.', 'lnt.png', 0, '2021-12-27 10:48:58', '2021-12-27 10:48:58', 1),
(19, 'RDM Server', 'RDM Server is an embeddable, heterogeneous, client/server database management system supporting both C/C++ and SQL APIs for programming flexibility. The databases can be disk resident and/or memory resident.', 'rdms.png', 0, '2021-12-27 10:48:58', '2021-12-27 10:48:58', 1),
(20, 'Lotus Approach', 'Lotus Approach is a relational database management system included in IBM\'s Lotus SmartSuite for Microsoft Windows. As a start-up company, Approach was formed in 1991 and won over 30 awards the first year, including \"best of show\" at Comdex.', 'lta.png', 0, '2021-12-27 10:48:58', '2022-01-03 22:18:46', 1),
(21, 'ArangoDB', 'ArangoDB is a free and open-source native multi-model database system developed by ArangoDB GmbH. The database system supports three data models with one database core and a unified query language AQL. The query language is declarative and allows the combination of different data access patterns in a single query.', 'ardb.png', 0, '2021-12-27 10:48:58', '2021-12-27 10:48:58', 1),
(22, 'Mnesia', 'Mnesia is a distributed, soft real-time database management system written in the Erlang programming language. It is distributed as part of the Open Telecom Platform', 'mns.png', 0, '2021-12-27 10:48:58', '2021-12-27 10:48:58', 1),
(23, 'PouchDB ', 'PouchDB is an open-source, NoSQL, in-line database. It is written in JavaScript and is basically a javascript implementation of CouchDB. It is modeled after CouchDB – a NoSQL database that powers npm. We can also create applications using PouchDB which can work offline and online and thus it saves data locally.', 'pch.png', 0, '2021-12-27 10:48:58', '2021-12-27 10:48:58', 1),
(24, 'OpenTSDB', 'OpenTSDB is a distributed, scalable Time Series Database (TSDB) written on top of HBase. OpenTSDB was written to address a common need: store, index and serve metrics collected from computer systems (network gear, operating systems, applications) at a large scale, and make this data easily accessible and graphable.', 'ots.png', 0, '2021-12-27 10:48:58', '2021-12-27 10:48:58', 1),
(26, 'FlockDB ', 'FlockDB is an open-source distributed, fault-tolerant graph database for managing wide but shallow network graphs. It was initially used by Twitter to store relationships between users, e.g. followings and favorites.', 'fl.png', 0, '2021-12-27 10:48:58', '2021-12-27 10:48:58', 1),
(27, 'SciDB ', 'SciDB is a column-oriented database management system designed for multidimensional data management and analytics common to scientific, geospatial, financial, and industrial applications. It is developed by Paradigm4 and co-created by Michael Stonebraker.', 'sci.png', 0, '2021-12-27 10:48:58', '2021-12-27 10:48:58', 1),
(28, 'C-Store ', 'C-Store is a database management system based on a column-oriented DBMS developed by a team at Brown University, Brandeis University, Massachusetts Institute of Technology and the University of Massachusetts Boston including Michael Stonebraker, Stanley Zdonik, and Samuel Madden.', 'cst.png', 0, '2021-12-27 10:48:58', '2022-01-03 22:18:46', 1),
(29, 'Navicat ', 'Navicat is a series of graphical database management and development software produced by CyberTech Ltd. for MySQL, MariaDB, MongoDB, Oracle, SQLite, PostgreSQL and Microsoft SQL Server. It has an Explorer-like graphical user interface and supports multiple database connections for local and remote databases.', 'nvt.png', 0, '2021-12-27 10:48:58', '2021-12-27 10:48:58', 1),
(31, 'Kexi ', 'Kexi is a visual database applications creator tool by KDE, designed to fill the gap between spreadsheets and database solutions requiring more sophisticated development. Kexi can be used for designing and implementing databases, data inserting and processing, and performing queries.', 'kxi.png', 0, '2021-12-27 10:48:58', '2021-12-27 10:48:58', 1),
(32, 'WebScaleSQL ', 'WebScaleSQL was an open-source relational database management system created as a software branch of the production-ready community releases of MySQL.', 'wbs.png', 0, '2021-12-27 10:48:58', '2021-12-27 10:48:58', 1),
(33, 'Drizzle ', 'Drizzle is a discontinued free software/open-source relational database management system that was forked from the now-defunct 6.0 development branch of the MySQL DBMS. Like MySQL, Drizzle had a client/server architecture and uses SQL as its primary command language.', 'drz.png', 0, '2021-12-27 10:48:58', '2021-12-27 10:48:58', 1),
(34, 'MySQL2', 'testing', 'drz-1641235556685.png', 3, '2022-01-03 21:42:05', '2022-01-03 22:26:18', 0),
(35, 'sample', 'testing', '', 3, '2022-02-05 17:13:23', '2022-02-05 17:24:09', 0);

-- --------------------------------------------------------

--
-- Table structure for table `pr_environment_details`
--

CREATE TABLE `pr_environment_details` (
  `uid` int(5) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `icon` varchar(50) NOT NULL,
  `status` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pr_environment_details`
--

INSERT INTO `pr_environment_details` (`uid`, `name`, `description`, `icon`, `status`) VALUES
(1, 'Microsoft Windows', 'Microsoft Windows, commonly referred to as Windows, is a group of several proprietary graphical operating system families, all of which are developed and marketed by Microsoft. Each family caters to a certain sector of the computing industry. ', 'wds.png', 1),
(2, 'Linux ', 'Linux is a family of open-source Unix-like operating systems based on the Linux kernel, an operating system kernel first released on September 17, 1991, by Linus Torvalds. Linux is typically packaged in a Linux distribution.', 'lnx.png', 1),
(3, 'Unix ', 'Unix is a family of multitasking, multiuser computer operating systems that derive from the original AT&T Unix, whose development started in the 1970s at the Bell Labs research center by Ken Thompson, Dennis Ritchie, and others.', 'unx.png', 1),
(4, 'macOS', 'macOS is a proprietary graphical operating system developed and marketed by Apple Inc. since 2001. It is the primary operating system for Apple\'s Mac computers. ', 'mcs.png', 1),
(5, 'Android ', 'Android is a mobile operating system based on a modified version of the Linux kernel and other open source software, designed primarily for touchscreen mobile devices such as smartphones and tablets.', 'adrd.png', 1),
(6, 'iOS', 'iOS (formerly iPhone OS) is a mobile operating system created and developed by Apple Inc. exclusively for its hardware. It is the operating system that powers many of the company\'s mobile devices, including the iPhone and iPod Touch; the term also included the versions running on iPads until the name iPadOS was introduced with version 13 in 2019. It is the world\'s second-most widely installed mobile operating system, after Android. It is the basis for three other operating systems made by Apple: iPadOS, tvOS, and watchOS.', 'ios.png', 1),
(9, 'FreeBSD', 'FreeBSD is a free and open-source Unix-like operating system descended from the Berkeley Software Distribution, which was based on Research Unix. The first version of FreeBSD was released in 1993.', 'fbsd.png', 1),
(11, 'AmigaOS', 'AmigaOS is a family of proprietary native operating systems of the Amiga and AmigaOne personal computers. It was developed first by Commodore International and introduced with the launch of the first Amiga, the Amiga 1000, in 1985.', 'amg.png', 1),
(12, 'Fedora Linux', 'Fedora Linux is a Linux distribution developed by the community-supported Fedora Project which is sponsored primarily by Red Hat, a subsidiary of IBM, with additional support from other companies.', 'fdl.png', 1),
(13, 'OS/360 and successors', 'OS/360, officially known as IBM System/360 Operating System, is a discontinued batch processing operating system developed by IBM for their then-new System/360 mainframe computer, announced in 1964', 'o360.png', 1),
(14, 'z/OS', 'z/OS is a 64-bit operating system for IBM z/Architecture mainframes, introduced by IBM in October 2000. It derives from and is the successor to OS/390, which in turn followed a string of MVS versions. Like OS/390, z/OS combines a number of formerly separate, related products, some of which are still optional.', 'zos.png', 1),
(15, '86-DOS', '86-DOS is a discontinued operating system developed and marketed by Seattle Computer Products for its Intel 8086-based computer kit. Initially known as QDOS, the name was changed to 86-DOS once SCP started licensing the operating system in 1980', 'dos.png', 1),
(16, 'OpenBSD', 'OpenBSD is a security-focused, free and open-source, Unix-like operating system based on the Berkeley Software Distribution. Theo de Raadt created OpenBSD in 1995 by forking NetBSD.', 'obs.png', 1),
(17, 'Minix', 'Minix is a POSIX-compliant, Unix-like operating system based on a microkernel architecture. Early versions of MINIX were created by Andrew S. Tanenbaum for educational purposes. ', 'mnx.png', 1),
(18, 'Apple ProDOS', 'ProDOS is the name of two similar operating systems for the Apple II series of personal computers. The original ProDOS, renamed ProDOS 8 in version 1.2, is the last official operating system usable by all 8-bit Apple II series computers, and was distributed from 1983 to 1993.', 'pdos.png', 1),
(19, 'Plan 9', 'Plan 9 from Bell Labs is a distributed operating system, originating in the Computing Science Research Center at Bell Labs in the mid-1980s, and building on UNIX concepts first developed there in the late 1960s. Since 2000, Plan 9 is free and open-source. The final official release was in early 2015.', 'pl9.png', 1),
(20, 'macOS Big Sur', 'macOS Big Sur is the 17th and current major release of macOS, Apple Inc.\'s operating system for Macintosh computers. It was announced at Apple\'s Worldwide Developers Conference on June 22, 2020, and was released to the public on November 12, 2020.', 'mcsb.png', 1),
(21, 'OS/390', 'OS/390 is an IBM operating system for the System/390 IBM mainframe computers', 'o390.png', 1),
(22, 'Haiku', 'Haiku is a free and open-source operating system compatible with the now discontinued BeOS. Its development began in 2001, and the operating system became self-hosting in 2008.', 'haiku.png', 1),
(23, 'VxWorks', 'VxWorks is a real-time operating system developed as proprietary software by Wind River Systems, a wholly owned subsidiary of TPG Capital, US.', 'vx.png', 1),
(24, 'watchOS ', 'watchOS is the operating system of the Apple Watch, developed by Apple Inc. It is based on iOS, the operating system used by the iPhone and iPod Touch, and has many similar features. It was released on April 24, 2015, along with the Apple Watch, the only device that runs watchOS.', 'wos.png', 1),
(25, 'MenuetOS', 'MenuetOS is an operating system with a monolithic preemptive, real-time kernel written in FASM assembly language. The system also includes video drivers. It runs on 64-bit and 32-bit x86 architecture computers. Its author is Ville M. Turjanmaa. It has a graphical desktop, games, and networking abilities.', 'mtos.png', 1),
(26, 'BeIA', 'BeIA, or BeOS for Internet Appliances, was a minimized version of Be Inc.\'s BeOS operating system for embedded systems. The BeIA system presents a browser-based interface to the user. The browser was based on the Opera 4.0 code base, and was named Wagner. ', 'bea.png', 1),
(27, 'Tizen ', 'Tizen is a Linux-based mobile operating system backed by the Linux Foundation but developed and used primarily by Samsung Electronics. The project was originally conceived as an HTML5-based platform for mobile devices to succeed MeeGo.', 'tizen.png', 1);

-- --------------------------------------------------------

--
-- Table structure for table `pr_frameworks`
--

CREATE TABLE `pr_frameworks` (
  `uid` int(11) NOT NULL,
  `language_id` int(11) NOT NULL COMMENT 'From pr_languages table',
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `icon` varchar(250) NOT NULL,
  `added_by` int(5) NOT NULL,
  `added_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pr_frameworks`
--

INSERT INTO `pr_frameworks` (`uid`, `language_id`, `name`, `description`, `icon`, `added_by`, `added_at`, `updated_at`, `status`) VALUES
(1, 2, 'Laravel', 'Laravel is a free, open-source PHP web framework, created by Taylor Otwell and intended for the development of web applications following the model–view–controller architectural pattern and based on Symfony.', 'laravel.png', 0, '2021-12-26 20:27:07', '2022-01-03 22:20:58', 1),
(2, 2, 'Symfony ', 'Symfony is a PHP web application framework and a set of reusable PHP components/libraries. It was published as free software on October 18, 2005 and released under the MIT license.', 'symfony.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(3, 2, 'CodeIgniter ', 'CodeIgniter is an open-source software rapid development web framework, for use in building dynamic web sites with PHP', 'codeigniter.png ', 0, '2021-12-26 20:27:07', '2022-01-03 22:20:58', 1),
(4, 2, 'CakePHP ', 'CakePHP is an open-source web framework. It follows the model–view–controller approach and is written in PHP, modeled after the concepts of Ruby on Rails, and distributed under the MIT License.', 'cakephp.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(5, 2, 'Yii', 'Yii is an open source, object-oriented, component-based MVC PHP web application framework. Yii is pronounced as \"Yee\" or [ji:] and in Chinese it means \"simple and evolutionary\" and it can be an acronym for \"Yes It Is!\".', 'yii.png', 0, '2021-12-26 20:27:07', '2022-01-03 22:20:58', 1),
(6, 2, 'Phalcon ', 'Phalcon is a PHP web framework based on the model–view–controller pattern. Originally released in 2012, it is an open-source framework licensed under the terms of the BSD License.', 'phalcon.png ', 0, '2021-12-26 20:27:07', '2022-01-03 22:20:58', 1),
(7, 2, 'Laminas/Zend ', 'Laminas is an open source, object-oriented web application framework implemented in PHP 7 and licensed under the New BSD License. The framework is basically a collection of professional PHP-based packages.', 'laminas.png', 0, '2021-12-26 20:27:07', '2022-01-03 22:20:58', 1),
(8, 2, 'FuelPHP ', 'FuelPHP is an open-source web application framework written in PHP which implements the HMVC pattern.', 'fuelphp.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(9, 2, 'Drupal ', 'Drupal is a free and open-source web content management system written in PHP and distributed under the GNU General Public License. Drupal provides a back-end framework for at least 13% of the top 10,000 websites worldwide – ranging from personal blogs to corporate, political, and government sites.', 'drupal.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(10, 2, 'PHPixie', 'PHPixie is a lightweight Open source PHP MVC based web framework specially designed for rapid development, speed and simplicity. PHPixie started as a micro-framework and has gradually grown to be one of the most popular full-stack PHP frameworks while retaining its high performance.', 'phpixie.png', 0, '2021-12-26 20:27:07', '2022-01-03 22:20:58', 1),
(11, 2, 'Fat-Free', 'Fat-Free Framework is an open-source web framework distributed under the GNU General Public License and hosted by GitHub and Sourceforge. The software seeks to combine a full featureset with a lightweight code base while being easy to learn, use and extend.', 'fatfree.png', 0, '2021-12-26 20:27:07', '2022-01-03 22:20:58', 1),
(12, 2, 'Kohana ', 'Kohana was a PHP5 HMVC framework. Kohana was licensed under the BSD license and hosted on GitHub. It was noted for its performance when compared to CodeIgniter and other high-performance PHP frameworks.', 'kohana.png', 0, '2021-12-26 20:27:07', '2022-01-03 22:20:58', 1),
(13, 2, 'Silex ', 'Silex is a micro web framework written in PHP and based on Symfony, Twig and Doctrine. It is MIT Licensed. The general purpose of Silex is to be as lightweight as you need it to be, as it is made for it to be as easy as possible to add features and extend the Silex base.', 'silex.png ', 0, '2021-12-26 20:27:07', '2022-01-03 22:20:58', 1),
(14, 2, 'Pop PHP', 'The Pop PHP Framework a free and open source PHP Web framework that was created by Nick Sagona. It is distributed under the BSD License and hosted on GitHub. The framework is intended to be utilized for rapid application development, with an emphasis on web applications.', 'pop.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(15, 2, 'Agavi ', 'Agavi is a PHP web framework that follows the model–view–controller design pattern. It does not use the convention over configuration paradigm, but focuses on design decisions, which allow for better scalability.', 'agavi.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(16, 2, 'Flow ', 'Flow is a free and open source web application framework written in PHP. The first final version was released on October 20, 2011. It was primarily designed as a basis for the content management system Neos, but can also be used independently.', 'flow.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(17, 2, 'Horde ', 'Horde is a free web-based groupware. The components of this groupware rest on the Horde framework. This PHP-based framework provides all the elements required for rapid web application development.', 'horde.png', 0, '2021-12-26 20:27:07', '2022-01-03 22:20:58', 1),
(18, 2, 'PRADO ', 'PRADO is an open source, object-oriented, event-driven, component-based PHP web framework. PRADO is used for the development of interactive web pages and applications. In 2013, it was considered by Computer Science educators to be one of the top six PHP web frameworks.', 'prado.png', 0, '2021-12-26 20:27:07', '2022-01-03 22:20:58', 1),
(19, 2, 'LI3', 'li3 is a full-stack web framework, for producing web applications. It is written in PHP, supporting PHP 5.3 and onwards and is based on the model–view–controller development architecture. It is described as adhering to no-nonsense philosophies. The project is sponsored by Engine Yard, Radify and Atelier Disko.', 'li3.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(20, 2, 'Qcodo ', 'Qcodo is an open-source PHP web application framework which builds an object-relational model, CRUD UI pages, and AJAX hooks from an existing data model. It additionally includes a tightly integrated HTML and JavaScript form toolkit which interfaces directly with the generated entities.', 'qcodo.png ', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(21, 2, 'Zikula ', 'Zikula is Free Open Source Software (FOSS). It allows you to build simple one-page websites to individual web applications utilising different types of extensions for making your project to something special. For this you can extend Zikula\'s functionality with modules and realise a custom look using themes.', 'zikula.png ', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(22, 2, 'QCubed ', 'QCubed (pronounced \'Q\' - cubed) is a PHP Model-View-Controller Rapid Application Development framework with support for PHP5 (5.4 and above) and PHP7. The goal of the framework is to save development time around mundane, repetitive tasks - allowing you to concentrate on things that are useful AND fun. QCubed excels in situations where you have a large database structure that you quickly want to make available to users.', 'cubed.png ', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(23, 2, 'Smart Framework', 'The PHP Smart Framework is a free, BSD licensed, open-source web framework that claims to fit small, medium as well as large web projects. It provides a hybrid architecture, a mix between multi-tier and Middleware, combined with clean code separation as Model–view–controller architecture.', 'sf.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(24, 2, 'Fusebox ', 'Fusebox was a web application framework for CFML and PHP. Originally released in 1997, the final version, 5.5.2, was released in May 2012. In January 2012 the rights to Fusebox were transferred from TeraTech to a team of five developers, who removed the rights and placed the framework in the hands of the community.', 'fusebox.png ', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(25, 3, 'Apache Struts 1', 'Apache Struts 1 is an open-source web application framework for developing Java EE web applications. It uses and extends the Java Servlet API to encourage developers to adopt a model–view–controller architecture. It was originally created by Craig McClanahan and donated to the Apache Foundation in May 2000.', 'as1.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(26, 3, 'Vaadin', 'Vaadin is an open-source web application development platform for Java. Vaadin includes a set of Web Components, a Java web framework, and a set of tools that enable developers to implement modern web graphical user interfaces using the Java programming language only, TypeScript only, or a combination of both.', 'vaadin.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(27, 3, 'Grails ', 'Grails is an open source web application framework that uses the Apache Groovy programming language. It is intended to be a high-productivity framework by following the \"coding by convention\" paradigm, providing a stand-alone development environment and hiding much of the configuration detail from the developer. ', 'grails.png ', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(28, 3, 'Play Framework ', 'Play Framework is an open-source web application framework which follows the model–view–controller architectural pattern. It is written in Scala and usable from other programming languages that are compiled to JVM bytecode', 'pf.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(29, 3, 'Apache Wicket', 'Apache Wicket, commonly referred to as Wicket, is a component-based web application framework for the Java programming language conceptually similar to JavaServer Faces and Tapestry. It was originally written by Jonathan Locke in April 2004. Version 1.0 was released in June 2005.', 'aw.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(30, 3, 'Apache Struts 2', 'Apache Struts 2 is an open-source web application framework for developing Java EE web applications. It uses and extends the Java Servlet API to encourage developers to adopt a model–view–controller architecture.', 'ap2.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(31, 3, 'Spring Security', 'Spring Security is a Java/Java EE framework that provides authentication, authorization and other security features for enterprise applications. The project was started in late 2003 as \'Acegi Security\' by Ben Alex, with it being publicly released under the Apache License in March 2004.', 'ss.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(32, 3, 'Spark ', 'Spark is a free and open-source software web application framework and domain-specific language written in Java. It is an alternative to other Java web application frameworks such as JAX-RS, Play framework and Spring MVC. \r\n', 'spark.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(33, 3, 'Apache Tapestry', 'Apache Tapestry is an open-source component-oriented Java web application framework conceptually similar to JavaServer Faces and Apache Wicket. Tapestry was created by Howard Lewis Ship, and was adopted by the Apache Software Foundation as a top-level project in 2006', 'at.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(34, 3, 'JBoss Seam', 'Seam was a web application framework developed by JBoss, a division of Red Hat. ', 'jbs.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(35, 3, 'Apache MyFaces', 'Apache MyFaces is an Apache Software Foundation project that creates and maintains an open-source JavaServer Faces implementation, along with several libraries of JSF components that can be deployed on the core implementation. ', 'am.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(36, 3, 'Apache Cocoon', 'Apache Cocoon, usually just called Cocoon, is a web application framework built around the concepts of pipeline, separation of concerns and component-based web development. The framework focuses on XML and XSLT publishing and is built using the Java programming language', 'ac.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(37, 3, 'Eclipse Jersey', 'The Jersey RESTful Web Services, formerly Glassfish Jersey, currently Eclipse Jersey, framework is an open source framework for developing RESTful Web Services in Java. It provides support for JAX-RS APIs and serves as a JAX-RS Reference Implementation.', 'ej.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(38, 3, 'Apache Shiro', 'Apache Shiro is an open source software security framework that performs authentication, authorization, cryptography and session management. Shiro has been designed to be an intuitive and easy-to-use framework while still providing robust security features.', 'as.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(39, 3, 'Apache Sling ', 'Apache Sling is an open source Web framework for the Java platform designed to create content-centric applications on top of a JSR-170-compliant content repository such as Apache Jackrabbit. ', 'apsl.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(40, 3, 'AppFuse ', 'AppFuse is an open-source Java EE web application framework. It is designed for quick and easy start up of development, while also using open-source Java technologies such as Spring Framework, Hibernate and Struts. ', 'appfuse.png ', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(41, 3, 'Aache Flex', 'Apache Flex, formerly Adobe Flex, is a software development kit for the development and deployment of cross-platform rich web applications based on the Adobe Flash platform. ', 'apfl.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(42, 3, 'Stripes ', 'Stripes is an open source web application framework based on the model–view–controller pattern. It aims to be a lighter weight framework than Struts by using Java technologies such as annotations and generics that were introduced in Java 1.5, to achieve \"convention over configuration\".', 'strp.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(44, 3, 'JBoss Enterprise Application Platform', 'The JBoss Enterprise Application Platform is a subscription-based/open-source Java EE-based application server runtime platform used for building, deploying, and hosting highly-transactional Java applications and services developed and maintained by Red Hat. ', 'jbo.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(45, 3, 'RIFE', 'RIFE is a content management framework designed for rapid web application development in Java, without using J2EE. RIFE\'s design blends together in a consistent component object model two approaches, request-based and component-based.', 'rife.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(46, 3, 'Spring Framework', 'Java Spring is a tool that makes developing web application and microservices with Spring Framework faster and easier through three core capabilities: Autoconfiguration. An opinionated approach to configuration. The ability to create standalone applications', 'spfr-1641235626049.png', 1, '2021-12-26 20:27:07', '2022-01-03 21:47:06', 1),
(47, 3, 'Spring Boot', 'Spring Boot is an open source Java-based framework used to create a micro Service. It is developed by Pivotal Team and is used to build stand-alone and production ready spring applications. ', 'spbt.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(48, 3, 'Hibernate', 'Hibernate ORM is a stable object-relational mapping framework for Java. It makes better communication possible between the Java programming language and relational database management systems (RDBMS).', 'hb.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(49, 3, 'Blade', 'Blade is a simple and lightweight and high-performance Java framework used for providing a full-stack web framework. Blade is a lightweight MVC Framework that provides a restful routing interface, making the web API cleaner and much easier to understand and also helps in synchronizing data with the website.\r\n\r\nBlade is based on Java 8, and the web server and template engine are built into the framework, too. It has a minimal impression it means the source code is less than 500kb in total. ', 'bld.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(50, 3, 'Dropwizard ', 'Dropwizard is a high-performance Java framework for rapid development of RESTful web services. It is especially suitable for creating Java microservices. The Dropwizard framework pulls together various well-established Java libraries in order to provide with a fast and distraction-free development platform.\r\n\r\nDropwizard is a separate ecosystem that contains all the dependencies bundled into a single package.', 'dw.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(51, 1, 'Express.js', 'Express.js, or simply Express, is a back end web application framework for Node.js, released as free and open-source software under the MIT License. It is designed for building web applications and APIs. It has been called the de facto standard server framework for Node.js', 'exp.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(52, 1, 'MeteorJS', 'Meteor, or MeteorJS, is a free and open-source isomorphic JavaScript web framework written using Node.js. Meteor allows for rapid prototyping and produces cross-platform code. ', 'met.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(53, 1, 'Sails.js', 'Sails.js is a model–view–controller web application framework developed atop the Node.js environment, released as free and open-source software under the MIT License. It is designed to make it easy to build custom, enterprise-grade Node.js web applications and APIs.', 'sj.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(54, 1, 'Next.js', 'Next.js is an open-source development framework built on top of Node.js enabling React based web applications functionalities such as server-side rendering and generating static websites.', 'njs.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(55, 4, 'Django', 'Django is a Python-based free and open-source web framework that follows the model–template–views architectural pattern. It is maintained by the Django Software Foundation, an American independent organization established as a 501 non-profit.', 'django.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(56, 4, 'Flask', 'Flask is a micro web framework written in Python. It is classified as a microframework because it does not require particular tools or libraries. It has no database abstraction layer, form validation, or any other components where pre-existing third-party libraries provide common functions.', 'flask.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(57, 4, 'Web2py', 'Web2py is an open-source web application framework written in the Python programming language. Web2py allows web developers to program dynamic web content using Python', 'wb2.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(58, 4, 'CherryPy ', 'CherryPy is an object-oriented web application framework using the Python programming language. It is designed for rapid development of web applications by wrapping the HTTP protocol but stays at a low level and does not offer much more than what is defined in RFC 7231.', 'chpy.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(59, 4, 'TurboGears ', 'TurboGears is a Python web application framework consisting of several WSGI components such as WebOb, SQLAlchemy, Genshi and Repoze.', 'trb.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(60, 4, 'Bottle', 'Bottle is a WSGI micro web-framework for the Python programming language. It is designed to be fast, simple and lightweight, and is distributed as a single file module with no dependencies other than the Python Standard Library. The same module runs with Python 2.7 and 3.x.', 'bot.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(61, 4, 'FastAPI ', 'FastAPI is a Web framework for developing RESTful APIs in Python. FastAPI is based on Pydantic and type hints to validate, serialize, and deserialize data, and automatically auto-generate OpenAPI documents. It fully supports asynchronous programming and can run with Uvicorn and Gunicorn.', 'fsta.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(62, 4, 'Quixote ', 'Quixote is a software framework for developing web applications in Python. Quixote \"is based on a simple, flexible design, making it possible to write applications quickly and to benefit from the wide range of available third-party Python modules\".', 'qxt.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(63, 4, 'Grok ', 'Grok is an open-source web framework based on Zope Toolkit technology. The project was started in 2006 by a number of Zope developers. Its core technologies are also used in other Zope-based projects.', 'grk.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(64, 4, 'Jump.py', 'Jam.py is an object oriented, event driven framework with hierarchical structure, modular design and very tight DB/GUI coupling. The server side of Jam.py is written in Python, the client utilizes JavaScript, jQuery and Bootstrap.', 'jmp.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(65, 4, 'Nevow', 'Nevow is a Python web application framework originally developed by the company Divmod. Template substitution is achieved via a small Tag Attribute Language, which is usually embedded in on-disk XML templates, though there is also a pure-Python domain-specific language called Stan, for expressing this markup programmatically. Nevow integrates well with Twisted, a framework for event-driven programming.', 'nev.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(66, 4, 'Python Paste', 'Python Paste, often simply called paste, is a set of utilities for web development in Python. Paste has been described as \"a framework for web frameworks\". The Python Paste package contains Python modules that help in implementing WSGI middleware. The package includes a WSGI wrapper for CGI applications.', 'pst.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(67, 4, 'Webware ', 'Webware for Python is an object-oriented, Python web application framework. The suite uses well known design patterns and includes a fast application server, servlets, Python Server Pages, object-relational mapping, Task Scheduling, Session Management, and many other features.', 'wbr.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(68, 4, 'Nagare', 'Nagare is a free and open-source web framework for developing web applications in Stackless Python. Nagare uses a component model inspired by Seaside, and, like Seaside, Nagare uses continuations to provide a framework where the HTTP connectionless request/response cycle doesn\'t break the normal control flow of the application. This allows web applications to be developed similarly to desktop applications for rapid application development. However, Nagare is written in Python rather than Smalltalk.\r\n\r\n', 'ngr.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(69, 4, 'Karrigell ', 'Karrigell is an open Source Python web framework written in Python. The Python 2 version is the stable release. A version for Python 3.2 and above was released in February 2011.', 'kar.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(70, 4, 'Tornado ', 'Tornado is a scalable, non-blocking web server and web application framework written in Python. It was developed for use by FriendFeed; the company was acquired by Facebook in 2009 and Tornado was open-sourced soon after', 'trn.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(71, 4, 'Pyramid', 'Pyramid is a general, open source, web application development framework built in python. It allows python developer to create web applications with ease. Pyramid is backed by the enterprise knowledge Management System KARL (a George Soros project).', 'prd.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(72, 4, 'Twisted ', 'Twisted is an event-driven network programming framework written in Python and licensed under the MIT License. Twisted projects variously support TCP, UDP, SSL/TLS, IP multicast, Unix domain sockets, many protocols, and much more.', 'tws.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(73, 4, 'CubicWeb ', 'CubicWeb is a free and open-source semantic web application framework, licensed under the LGPL. It is written in Python', 'cbw.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(74, 4, 'Kivy', 'Kivy is a free and open source Python framework for developing mobile apps and other multitouch application software with a natural user interface. It is distributed under the terms of the MIT License, and can run on Android, iOS, Linux, macOS, and Windows', 'kvy.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(75, 5, '.Net Framework', 'The .NET Framework is a software framework developed by Microsoft that runs primarily on Microsoft Windows. It includes a large class library called Framework Class Library and provides language interoperability across several programming languages', 'ntf.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(76, 5, '.NET Core', '.NET is a free and open-source, managed computer software framework for Windows, Linux, and macOS operating systems. It is a cross-platform successor to .NET Framework. The project is primarily developed by Microsoft employees by way of the .NET Foundation, and released under the MIT License.', 'dnc.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(77, 5, 'Mono ', 'Mono is a free and open-source .NET Framework-compatible software framework. Originally by Ximian, it was later acquired by Novell, and is now being led by Xamarin, a subsidiary of Microsoft and the .NET Foundation. Mono can be run on many software systems. ', 'mono.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(78, 5, 'Accord.NET', 'Accord.NET is a framework for scientific computing in .NET. The source code of the project is available under the terms of the Gnu Lesser Public License, version 2.1. The framework comprises a set of libraries that are available in source code as well as via executable installers and NuGet packages.', 'ant.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(79, 5, 'Orleans', 'Orleans is a cross-platform software framework for building scalable and robust distributed interactive applications based on the .NET Framework.', 'orl.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(80, 6, '.NET Framework', 'The .NET Framework is a software framework developed by Microsoft that runs primarily on Microsoft Windows. It includes a large class library called Framework Class Library and provides language interoperability across several programming languages. ', '', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(81, 6, 'Mono', 'Mono is a free and open-source .NET Framework-compatible software framework. Originally by Ximian, it was later acquired by Novell, and is now being led by Xamarin, a subsidiary of Microsoft and the .NET Foundation. Mono can be run on many software systems.', 'mono.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(82, 6, 'MuPDF ', 'MuPDF is a free and open-source software framework written in C that implements a PDF, XPS, and EPUB parsing and rendering engine. It is used primarily to render pages into bitmaps, but also provides support for other operations such as searching and listing the table of contents and hyperlinks', 'mupdf.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(83, 7, '.NET Framework', 'The .NET Framework is a software framework developed by Microsoft that runs primarily on Microsoft Windows. It includes a large class library called Framework Class Library and provides language interoperability across several programming languages.', 'ntf.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(84, 7, 'ActiveX', 'ActiveX is a deprecated software framework created by Microsoft that adapts its earlier Component Object Model and Object Linking and Embedding technologies for content downloaded from a network, particularly from the World Wide Web. Microsoft introduced ActiveX in 1996.', 'actx.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(85, 7, '.NET Core', '.NET is a free and open-source, managed computer software framework for Windows, Linux, and macOS operating systems. It is a cross-platform successor to .NET Framework. The project is primarily developed by Microsoft employees by way of the .NET Foundation, and released under the MIT License.', 'dnc.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(86, 7, 'Chromium Embedded Framework', 'The Chromium Embedded Framework is an open-source software framework for embedding a Chromium web browser within another application. This enables developers to add web browsing functionality to their application, as well as the ability to use HTML, CSS, and JavaScript to create the application\'s user interface.', 'cef.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(87, 7, 'KFLib', 'KFRlib is an open-source cross-platform C++ DSP framework written in C++. It is covered by a dual GPL/commercial license.', 'kflb.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(88, 7, 'ATL Server', 'ATL Server is a technology originally developed by Microsoft for developing web-based applications. It uses a tag replacement engine written in C++ to render web pages.', 'atsr.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(89, 7, 'Object Windows Library', 'The Object Windows Library is a C++ object-oriented application framework designed to simplify desktop application development for Windows and OS/2. OWL was introduced by Borland in 1991 and eventually deprecated in 1997 in favor of their Visual Component Library.', 'owl.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(90, 7, 'Mono', 'Mono is a free and open-source .NET Framework-compatible software framework. Originally by Ximian, it was later acquired by Novell, and is now being led by Xamarin, a subsidiary of Microsoft and the .NET Foundation. Mono can be run on many software systems.', 'mono.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(91, 8, 'Apache Spark', 'Apache Spark is an open-source unified analytics engine for large-scale data processing. Spark provides an interface for programming entire clusters with implicit data parallelism and fault tolerance.', 'spk.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(92, 9, 'Cocoa Touch', 'Cocoa Touch is the application development environment for building software programs to run on iOS for the iPhone and iPod Touch, iPadOS for the iPad, watchOS for the Apple Watch, and tvOS for the Apple TV, from Apple Inc.', 'cct.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(93, 9, 'AVFoundation ', 'AVFoundation is a multimedia framework with APIs in Objective-C and Swift, which provides high-level services for working with time-based audiovisual media on Apple Darwin-based operating systems: iOS, macOS, tvOS, and watchOS. It was first introduced in iOS 4 and has seen significant changes in iOS 5 and iOS 6.', 'avf.png', 0, '2021-12-26 20:27:07', '2022-01-03 22:25:10', 0),
(94, 9, 'CloudKit ', 'CloudKit is an integrated macOS and iOS API that functions as a backend as a service. CloudKit is the framework that powers iCloud on iOS, macOS and on the web.', 'cdk.png', 0, '2021-12-26 20:27:07', '2022-01-03 22:25:22', 0),
(95, 11, 'AVFoundation', 'AVFoundation is a multimedia framework with APIs in Objective-C and Swift, which provides high-level services for working with time-based audiovisual media on Apple Darwin-based operating systems: iOS, macOS, tvOS, and watchOS. It was first introduced in iOS 4 and has seen significant changes in iOS 5 and iOS 6.', 'avf.png', 0, '2021-12-26 20:27:07', '2022-01-03 22:24:59', 0),
(96, 11, 'CloudKit', 'CloudKit is an integrated macOS and iOS API that functions as a backend as a service. CloudKit is the framework that powers iCloud on iOS, macOS and on the web.', 'cdk.png', 0, '2021-12-26 20:27:07', '2021-12-26 20:27:07', 1),
(97, 2, 'Spring Boot', 'Java Spring Boot (Spring Boot) is a tool that makes developing web application and microservices with Spring Framework faster and easier through three core capabilities: Autoconfiguration. An opinionated approach to configuration. The ability to create standalone applications', 'spbt-1641234481452.png', 1, '2022-01-03 21:28:01', '2022-01-03 22:25:34', 0);

-- --------------------------------------------------------

--
-- Table structure for table `pr_functionalities`
--

CREATE TABLE `pr_functionalities` (
  `uid` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `icon` varchar(50) NOT NULL,
  `added_by` int(5) NOT NULL DEFAULT 1,
  `added_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pr_functionalities`
--

INSERT INTO `pr_functionalities` (`uid`, `name`, `icon`, `added_by`, `added_at`, `updated_at`, `status`) VALUES
(1, 'Email', 'email-1641232612475.png', 1, '2021-12-20 11:06:31', '2022-01-03 22:21:22', 1),
(2, 'File', 'file.png', 1, '2021-12-20 11:06:31', '2022-01-03 22:21:22', 1),
(3, 'HTTP', 'http.png', 1, '2021-12-20 11:06:31', '2022-01-29 14:31:16', 1);

-- --------------------------------------------------------

--
-- Table structure for table `pr_implementations`
--

CREATE TABLE `pr_implementations` (
  `uid` int(11) NOT NULL,
  `func_id` int(11) NOT NULL COMMENT 'From pr_functionalities table',
  `subfunc_id` int(11) NOT NULL COMMENT 'From pr_subfunctions table',
  `title` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `added_by` int(5) NOT NULL DEFAULT 0 COMMENT 'From pr_users table',
  `added_date` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_date` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `upvoters` int(11) NOT NULL DEFAULT 0,
  `downvoters` int(11) NOT NULL DEFAULT 0,
  `status` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pr_implementations`
--

INSERT INTO `pr_implementations` (`uid`, `func_id`, `subfunc_id`, `title`, `description`, `added_by`, `added_date`, `updated_date`, `upvoters`, `downvoters`, `status`) VALUES
(1, 2, 3, 'File Upload', 'testing', 1, '2022-01-31 20:36:28', '2022-01-31 20:37:47', 25, 3, 1);

-- --------------------------------------------------------

--
-- Table structure for table `pr_languages`
--

CREATE TABLE `pr_languages` (
  `uid` int(11) NOT NULL,
  `name` varchar(100) NOT NULL,
  `description` text NOT NULL,
  `icon` varchar(250) NOT NULL,
  `added_by` int(5) NOT NULL DEFAULT 0,
  `added_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pr_languages`
--

INSERT INTO `pr_languages` (`uid`, `name`, `description`, `icon`, `added_by`, `added_at`, `updated_at`, `status`) VALUES
(1, 'NodeJs', 'Node.js is an open-source, cross-platform, back-end JavaScript runtime environment that runs on the V8 engine and executes JavaScript code outside a web browser.', 'nodejs.png', 0, '2021-12-26 14:26:33', '2022-01-31 17:34:51', 1),
(2, 'PHP', 'PHP is a server scripting language, and a powerful tool for making dynamic and interactive Web pages. PHP is a widely-used, free, and efficient alternative to competitors such as Microsoft\'s', 'php.png', 0, '2021-12-26 14:26:33', '2022-01-03 22:22:10', 1),
(3, 'Java', 'Java is a programming language. Java is used to develop mobile apps, web apps, desktop apps, games and much more.', 'java.png', 0, '2021-12-26 14:26:33', '2021-12-26 14:26:33', 1),
(4, 'Python', 'Python is a programming language.\nPython can be used on a server to create web applications.', 'py.png', 0, '2021-12-26 14:26:33', '2021-12-26 14:26:33', 1),
(5, 'C#', 'JavaScript is the world\'s most popular programming language. JavaScript is the programming language of the Web.', 'cs.png', 0, '2021-12-26 14:26:33', '2021-12-26 14:26:33', 1),
(6, 'C', 'C is a general-purpose, procedural computer programming language supporting structured programming, lexical variable scope, and recursion, with a static type system. By design, C provides constructs that map efficiently to typical machine instructions', 'c.png', 0, '2021-12-26 14:26:33', '2021-12-26 14:26:33', 1),
(7, 'C++', 'C++ is a general-purpose programming language created by Bjarne Stroustrup as an extension of the C programming language, or \"C with Classes\".', 'cpp.png', 0, '2021-12-26 14:26:33', '2021-12-26 14:26:33', 1),
(8, 'R', 'R is a programming language and free software environment for statistical computing and graphics supported by the R Core Team and the R Foundation for Statistical Computing. It is widely used among statisticians and data miners for developing statistical software and data analysis.', 'r.png', 0, '2021-12-26 14:26:33', '2022-01-03 22:24:41', 0),
(9, 'Objective-C', 'Objective-C is a general-purpose, object-oriented programming language that adds Smalltalk-style messaging to the C programming language. Originally developed by Brad Cox and Tom Love in the early 1980s, it was selected by NeXT for its NeXTSTEP operating system.', 'h.png', 0, '2021-12-26 14:26:33', '2022-01-03 22:24:35', 0),
(10, 'ASP', 'Active Server Pages is Microsoft\'s first server-side scripting language and engine for dynamic web pages. It was first released in December 1996, before being superseded in January 2002 by ASP.NET.', 'asp.png', 0, '2021-12-26 14:26:33', '2021-12-26 14:26:33', 1),
(11, 'Swift', 'Swift is a general-purpose, multi-paradigm, compiled programming language developed by Apple Inc. and the open-source community.', 'swift.png', 0, '2021-12-26 14:26:33', '2021-12-26 14:26:33', 1),
(12, 'Kotlin', 'Kotlin is a cross-platform, statically typed, general-purpose programming language with type inference. Kotlin is designed to interoperate fully with Java, and the JVM version of Kotlin\'s standard library depends on the Java Class Library, but type inference allows its syntax to be more concise.', 'kt.png', 0, '2021-12-26 14:26:33', '2021-12-26 14:26:33', 1),
(13, 'Matlab', 'MATLAB is a proprietary multi-paradigm programming language and numeric computing environment developed by MathWorks. MATLAB allows matrix manipulations, plotting of functions and data, implementation of algorithms, creation of user interfaces, and interfacing with programs written in other languages.', 'm.png', 0, '2021-12-26 14:26:33', '2021-12-26 14:26:33', 1),
(14, 'Go	', 'Go is a statically typed, compiled programming language designed at Google by Robert Griesemer, Rob Pike, and Ken Thompson. Go is syntactically similar to C, but with memory safety, garbage collection, structural typing, and CSP-style concurrency.', 'go.png', 0, '2021-12-26 14:26:33', '2021-12-26 14:26:33', 1),
(15, 'Rust', 'Rust is a multi-paradigm, high-level, general-purpose programming language designed for performance and safety, especially safe concurrency. Rust is syntactically similar to C++, but can guarantee memory safety by using a borrow checker to validate references.', 'rs.png', 0, '2021-12-26 14:26:33', '2021-12-26 14:26:33', 1),
(16, 'VBA', 'Visual Basic for Applications is an implementation of Microsoft\'s event-driven programming language Visual Basic 6, which was declared legacy in 2008, and is an associated integrated development environment.', 'vba.png', 0, '2021-12-26 14:26:33', '2021-12-26 14:26:33', 1),
(17, 'Ruby', 'Ruby is an interpreted, high-level, general-purpose programming language. It was designed and developed in the mid-1990s by Yukihiro \"Matz\" Matsumoto in Japan. Ruby is dynamically typed and uses garbage collection and just-in-time compilation.', 'rb.png', 0, '2021-12-26 14:26:33', '2021-12-26 14:26:33', 1),
(18, 'Scala', 'Scala is a strong statically typed general-purpose programming language which supports both object-oriented programming and functional programming. Designed to be concise, many of Scala\'s design decisions are aimed to address criticisms of Java.', 'scala.png', 0, '2021-12-26 14:26:33', '2021-12-26 14:26:33', 1),
(19, 'Ada', 'Ada is a structured, statically typed, imperative, and object-oriented high-level programming language, extended from Pascal and other languages.', 'adb.png', 0, '2021-12-26 14:26:33', '2021-12-26 14:26:33', 1),
(20, 'Visual Basic', 'The original Visual Basic is a third-generation event-driven programming language from Microsoft known for its Component Object Model programming model first released in 1991 and declared legacy during 2008. Microsoft intended Visual Basic to be relatively easy to learn and use.', 'vb.png', 0, '2021-12-26 14:26:33', '2021-12-26 14:26:33', 1),
(21, 'Dart ', 'Dart is a programming language designed for client development, such as for the web and mobile apps. It is developed by Google and can also be used to build server and desktop applications. Dart is an object-oriented, class-based, garbage-collected language with C-style syntax', 'dart.png', 0, '2021-12-26 14:26:33', '2021-12-26 14:26:33', 1),
(22, 'Lua ', 'Lua is a lightweight, high-level, multi-paradigm programming language designed primarily for embedded use in applications. Lua is cross-platform, since the interpreter of compiled bytecode is written in ANSI C, and Lua has a relatively simple C API to embed it into applications.', 'lua.png', 0, '2021-12-26 14:26:33', '2021-12-26 14:26:33', 1),
(23, 'COBOL', 'COBOL is a compiled English-like computer programming language designed for business use. It is an imperative, procedural and, since 2002, object-oriented language. COBOL is primarily used in business, finance, and administrative systems for companies and governments.', 'cbl.png', 0, '2021-12-26 14:26:33', '2021-12-26 14:26:33', 1),
(24, 'Groovy', 'Apache Groovy is a Java-syntax-compatible object-oriented programming language for the Java platform. It is both a static and dynamic language with features similar to those of Python, Ruby, and Smalltalk.', 'groovy.png', 0, '2021-12-26 14:26:33', '2021-12-26 14:26:33', 1),
(25, 'ABAP ', 'ABAP is a high-level programming language created by the German software company SAP SE. It is currently positioned, alongside Java, as the language for programming the SAP NetWeaver Application Server, which is part of the SAP NetWeaver platform for building business applications.', 'abap.png', 0, '2021-12-26 14:26:33', '2021-12-26 14:26:33', 1),
(26, 'Perl', 'Perl is a family of two high-level, general-purpose, interpreted, dynamic programming languages. \"Perl\" refers to Perl 5, but from 2000 to 2019 it also referred to its redesigned \"sister language\", Perl 6, before the latter\'s name was officially changed to Raku in October 2019', 'pl.png', 0, '2021-12-26 14:26:33', '2021-12-26 14:26:33', 1),
(27, 'Julia', 'Julia is a high-level, high-performance, dynamic programming language. While it is a general-purpose language and can be used to write any application, many of its features are well suited for numerical analysis and computational science', 'jl.png', 0, '2021-12-26 14:26:33', '2021-12-26 14:26:33', 1),
(28, 'Haskell ', 'Haskell is a general-purpose, statically typed, purely functional programming language with type inference and lazy evaluation', 'hs.png', 0, '2021-12-26 14:26:33', '2021-12-26 14:26:33', 1),
(29, 'Pascal', 'Pascal is an imperative and procedural programming language, designed by Niklaus Wirth as a small, efficient language intended to encourage good programming practices using structured programming and data structuring. It is named in honour of the French mathematician, philosopher and physicist Blaise Pascal.', 'pas.png', 0, '2021-12-26 14:26:33', '2021-12-26 14:26:33', 1),
(30, 'Fortran ', 'Fortran is a general-purpose, compiled imperative programming language that is especially suited to numeric computation and scientific computing. Fortran was originally developed by IBM in the 1950s for scientific and engineering applications, and subsequently came to dominate scientific computing.', 'for.png', 0, '2021-12-26 14:26:33', '2021-12-26 14:26:33', 1),
(31, 'Prolog', 'Prolog is a logic programming language associated with artificial intelligence and computational linguistics', 'PL.png', 0, '2021-12-26 14:26:33', '2021-12-26 14:26:33', 1),
(32, 'test', 'test', 'abap-1641220197369.png', 1, '2022-01-03 17:29:58', '2022-01-03 17:29:58', 1),
(33, 'test', 'test', 'abap-1641220530717.png', 1, '2022-01-03 17:35:30', '2022-01-03 17:35:30', 1),
(34, 'Java2', 'Java is a high-level, class-based, object-oriented programming language that is designed to have as few implementation dependencies as possible.', 'c-1641221642137.png', 2, '2022-01-03 17:47:47', '2022-01-03 22:22:10', 1);

-- --------------------------------------------------------

--
-- Table structure for table `pr_platforms`
--

CREATE TABLE `pr_platforms` (
  `uid` int(5) NOT NULL,
  `name` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `icon` varchar(50) NOT NULL,
  `added_by` int(1) NOT NULL,
  `added_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `pr_platforms`
--

INSERT INTO `pr_platforms` (`uid`, `name`, `description`, `icon`, `added_by`, `added_at`, `updated_at`, `status`) VALUES
(1, 'Web', 'A web application (or web app) is application software that runs on a web server, unlike computer-based software programs that are run locally on the operating system (OS) of the device. Web applications are accessed by the user through a web browser with an active network connection.', 'web-1643373546926.png', 1, '2021-12-27 11:38:50', '2022-01-29 07:40:38', 1),
(2, 'Desktop', 'Desktop apps operate as stand-alone software, which means they can be used offline and do not require access to the internet or web browser to work.', 'computer.png', 0, '2021-12-27 11:38:50', '2022-01-29 07:41:06', 1),
(3, 'Mobile', 'A mobile application, also referred to as a mobile app or simply an app, is a computer program or software application designed to run on a mobile device such as a phone, tablet, or watch', 'smartphone.png', 0, '2021-12-27 11:38:50', '2022-01-29 07:41:36', 1);

-- --------------------------------------------------------

--
-- Table structure for table `pr_subfunctions`
--

CREATE TABLE `pr_subfunctions` (
  `uid` int(11) NOT NULL,
  `func_id` int(11) NOT NULL COMMENT 'From pr_functionalities table',
  `name` varchar(100) NOT NULL,
  `icon` varchar(50) NOT NULL,
  `added_by` int(5) NOT NULL,
  `added_at` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_at` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pr_subfunctions`
--

INSERT INTO `pr_subfunctions` (`uid`, `func_id`, `name`, `icon`, `added_by`, `added_at`, `updated_at`, `status`) VALUES
(3, 2, 'Upload', 'upload.png', 0, '2021-12-26 10:15:07', '2021-12-26 13:15:34', 1);

-- --------------------------------------------------------

--
-- Table structure for table `pr_users`
--

CREATE TABLE `pr_users` (
  `uid` int(11) NOT NULL,
  `username` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `country` int(5) NOT NULL,
  `password` varchar(200) NOT NULL,
  `join_date` datetime NOT NULL DEFAULT current_timestamp(),
  `updated_date` datetime NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `status` int(1) NOT NULL DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `pr_users`
--

INSERT INTO `pr_users` (`uid`, `username`, `email`, `country`, `password`, `join_date`, `updated_date`, `status`) VALUES
(1, 'test1', 'test1@gmail.com', 100, '$2b$12$3hLQTk4Ww4iOzC5FIXUO3u9iQ5I2l6Sn0BV99/kv3MFNifLxf5BmC', '2022-01-23 10:00:11', '2022-01-27 11:11:47', 1),
(2, 'test2 ', 'test2@gmail.com', 150, '$2b$10$d13ELGIoS0S10O0dt4QLXu23VepRRYFYFf9OYR8tj22JsHG1mREiW', '2022-01-25 19:04:57', '2022-01-27 10:26:46', 1),
(3, 'test3 ', 'test3@gmail.com', 150, '$2b$10$7A5a61SY8pN8e4sl701PvOS7VCwqN5i2McE30064sD0ci.TxTe0sG', '2022-01-25 19:05:11', '2022-01-27 10:27:04', 1),
(4, 'test4', 'test4@gmail.com', 116, '$2b$10$lOuCzNOnvBgwse3lCry/yeLh6PP5XaElRhh9CWikdreY1LeUJ7VF2', '2022-01-27 10:34:45', '2022-01-27 10:42:38', 1),
(5, 'test5', 'test5@gmail.com', 140, '$2b$10$h9h8oKVNbftQrKza0Jcm2eFXw6aMZAQOe7uEaGoMMOmPV.HT8GdIa', '2022-01-27 10:40:30', '2022-01-27 10:43:29', 0);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `pr_code_snippets`
--
ALTER TABLE `pr_code_snippets`
  ADD PRIMARY KEY (`uid`);

--
-- Indexes for table `pr_comments`
--
ALTER TABLE `pr_comments`
  ADD PRIMARY KEY (`uid`),
  ADD KEY `comments_fk1` (`code_snippet_id`);

--
-- Indexes for table `pr_counters`
--
ALTER TABLE `pr_counters`
  ADD PRIMARY KEY (`uid`);

--
-- Indexes for table `pr_countries`
--
ALTER TABLE `pr_countries`
  ADD PRIMARY KEY (`uid`);

--
-- Indexes for table `pr_dbms`
--
ALTER TABLE `pr_dbms`
  ADD PRIMARY KEY (`uid`);

--
-- Indexes for table `pr_environment_details`
--
ALTER TABLE `pr_environment_details`
  ADD PRIMARY KEY (`uid`);

--
-- Indexes for table `pr_frameworks`
--
ALTER TABLE `pr_frameworks`
  ADD PRIMARY KEY (`uid`);

--
-- Indexes for table `pr_functionalities`
--
ALTER TABLE `pr_functionalities`
  ADD PRIMARY KEY (`uid`);

--
-- Indexes for table `pr_implementations`
--
ALTER TABLE `pr_implementations`
  ADD PRIMARY KEY (`uid`),
  ADD KEY `implementation_fk1` (`subfunc_id`),
  ADD KEY `fk1` (`func_id`),
  ADD KEY `fk3` (`added_by`);

--
-- Indexes for table `pr_languages`
--
ALTER TABLE `pr_languages`
  ADD PRIMARY KEY (`uid`);

--
-- Indexes for table `pr_platforms`
--
ALTER TABLE `pr_platforms`
  ADD PRIMARY KEY (`uid`);

--
-- Indexes for table `pr_subfunctions`
--
ALTER TABLE `pr_subfunctions`
  ADD PRIMARY KEY (`uid`),
  ADD KEY `subfunctions_fk1` (`func_id`);

--
-- Indexes for table `pr_users`
--
ALTER TABLE `pr_users`
  ADD PRIMARY KEY (`uid`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `pr_code_snippets`
--
ALTER TABLE `pr_code_snippets`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `pr_comments`
--
ALTER TABLE `pr_comments`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `pr_counters`
--
ALTER TABLE `pr_counters`
  MODIFY `uid` int(5) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `pr_countries`
--
ALTER TABLE `pr_countries`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=254;

--
-- AUTO_INCREMENT for table `pr_dbms`
--
ALTER TABLE `pr_dbms`
  MODIFY `uid` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;

--
-- AUTO_INCREMENT for table `pr_environment_details`
--
ALTER TABLE `pr_environment_details`
  MODIFY `uid` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- AUTO_INCREMENT for table `pr_functionalities`
--
ALTER TABLE `pr_functionalities`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `pr_implementations`
--
ALTER TABLE `pr_implementations`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `pr_platforms`
--
ALTER TABLE `pr_platforms`
  MODIFY `uid` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `pr_subfunctions`
--
ALTER TABLE `pr_subfunctions`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `pr_users`
--
ALTER TABLE `pr_users`
  MODIFY `uid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `pr_comments`
--
ALTER TABLE `pr_comments`
  ADD CONSTRAINT `comments_fk1` FOREIGN KEY (`code_snippet_id`) REFERENCES `pr_code_snippets` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pr_implementations`
--
ALTER TABLE `pr_implementations`
  ADD CONSTRAINT `fk1` FOREIGN KEY (`func_id`) REFERENCES `pr_functionalities` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk2` FOREIGN KEY (`subfunc_id`) REFERENCES `pr_subfunctions` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk3` FOREIGN KEY (`added_by`) REFERENCES `pr_users` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `pr_subfunctions`
--
ALTER TABLE `pr_subfunctions`
  ADD CONSTRAINT `subfunctions_fk1` FOREIGN KEY (`func_id`) REFERENCES `pr_functionalities` (`uid`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
