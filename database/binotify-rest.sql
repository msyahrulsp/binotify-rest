DROP DATABASE IF EXISTS `binotify-rest`;
CREATE DATABASE `binotify-rest`;

DROP TABLE IF EXISTS `binotify-rest`.`user`;
CREATE TABLE `binotify-rest`.`user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  PRIMARY KEY (`user_id`)
);

INSERT INTO `binotify-rest`.`user` (`user_id`, `name`, `email`, `username`, `password`, `isAdmin`) VALUES
  (1, 'Ardhito Pramono', 'user@gmail.com', 'dito', '$2b$10$vcPLNP.zBJLucGVzpACSLO6Xm70BEbXsqFU0Flpt21QKu.1.cfhvG', 0),
  (2, 'halohalo', 'admin@gmail.com', 'halo', '$2b$10$vcPLNP.zBJLucGVzpACSLO6Xm70BEbXsqFU0Flpt21QKu.1.cfhvG', 1);

DROP TABLE IF EXISTS `binotify-rest`.`song`;
CREATE TABLE `binotify-rest`.`song` (
  `song_id` int NOT NULL AUTO_INCREMENT,
  `judul` varchar(64) NOT NULL,
  `penyanyi_id` int DEFAULT NULL,
  `audio_path` TEXT NOT NULL,
  PRIMARY KEY (`song_id`),
  FOREIGN KEY (`penyanyi_id`) REFERENCES `user` (`user_id`)
);

INSERT INTO `binotify-rest`.`song` VALUES
(1,'History',1,'./assets/musics/premium-song1.mp3'),
(2,'Love in My Pocket',1,'./assets/musics/premium-song1.mp3'),
(3,'Dat Stick', 1,'./assets/musics/premium-song3.mp3'),
(4,'Glow Like Dat',1,'./assets/musics/premium-song4.mp3'),
(5,'100 Degrees',1,'./assets/musics/premium-song5.mp3'),
(6,'Lagu Premium 6',1,'./assets/musics/premium-song6.mp3'),
(7,'Lagu Premium 7',1,'./assets/musics/premium-song7.mp3'),
(8,'Lagu Premium 8', 1,'./assets/musics/premium-song8.mp3'),
(9,'Lagu Premium 9',1,'./assets/musics/premium-song9.mp3'),
(10,'Lagu Premium 10',1, './assets/musics/premium-song10.mp3'),
(11,'Lagu Premium 11',1,'./assets/musics/premium-song11.mp3'),
(12,'Lagu Premium 12',1,'./assets/musics/premium-song12.mp3'),
(13,'Lagu Premium 13', 1,'./assets/musics/premium-song13.mp3'),
(14,'Lagu Premium 14',1,'./assets/musics/premium-song14.mp3'),
(15,'Lagu Premium 15',1,'./assets/musics/premium-song15.mp3');