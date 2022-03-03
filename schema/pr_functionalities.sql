/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE TABLE `pr_functionalities` (
  `uid` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `icon` varchar(50) NOT NULL,
  `added_by` int NOT NULL DEFAULT '1',
  `added_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `status` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`uid`)
);

INSERT INTO `pr_functionalities` (`uid`, `name`, `icon`, `added_by`, `added_at`, `updated_at`, `status`) VALUES
(1, 'Email', '42-email-1646235077472.png', 1, '2021-12-20 11:06:31', '2022-03-02 18:31:17', 1);
INSERT INTO `pr_functionalities` (`uid`, `name`, `icon`, `added_by`, `added_at`, `updated_at`, `status`) VALUES
(2, ' Variables', '64-arrow-1646234904190.png', 1, '2022-03-02 18:28:24', '2022-03-02 18:28:24', 1);
INSERT INTO `pr_functionalities` (`uid`, `name`, `icon`, `added_by`, `added_at`, `updated_at`, `status`) VALUES
(3, 'Conditions', '500-planning-1646235378758.png', 1, '2022-03-02 18:36:18', '2022-03-02 18:36:18', 1);
INSERT INTO `pr_functionalities` (`uid`, `name`, `icon`, `added_by`, `added_at`, `updated_at`, `status`) VALUES
(4, 'Loops', 'looping-arrows-1646236133242.png', 1, '2022-03-02 18:41:10', '2022-03-02 18:48:53', 1),
(5, 'Flow Control', '17-denied-1646235756261.png', 1, '2022-03-02 18:42:36', '2022-03-02 18:42:36', 1),
(6, 'Scripting', '356-document-code-1646236369113.png', 1, '2022-03-02 18:52:49', '2022-03-02 18:52:49', 1),
(7, 'File', '322-document-1646236743950.png', 1, '2022-03-02 18:59:03', '2022-03-02 18:59:03', 1),
(8, 'Folder', '59-folder-1646236930628.png', 1, '2022-03-02 19:02:10', '2022-03-02 19:02:10', 1),
(9, 'Compression', 'folder-1646237108195.png', 1, '2022-03-02 19:05:08', '2022-03-02 19:05:08', 1);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;