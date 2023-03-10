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
  (1, 'Ranjabi', '13520002@std.stei.itb.ac.id', '13520002', '$2b$10$vcPLNP.zBJLucGVzpACSLO6Xm70BEbXsqFU0Flpt21QKu.1.cfhvG', 1),
  (2, 'Jason', '13520080@std.stei.itb.ac.id', '13520080', '$2b$10$vcPLNP.zBJLucGVzpACSLO6Xm70BEbXsqFU0Flpt21QKu.1.cfhvG', 1),
  (3, 'SP', '13520161@std.stei.itb.ac.id', '13520161', '$2b$10$vcPLNP.zBJLucGVzpACSLO6Xm70BEbXsqFU0Flpt21QKu.1.cfhvG', 1),
  (4, 'Ardhito Pramono', 'user@gmail.com', 'dito', '$2b$10$vcPLNP.zBJLucGVzpACSLO6Xm70BEbXsqFU0Flpt21QKu.1.cfhvG', 0),
  (5, 'YOASOBI', 'yoasobi@gmail.com', 'yoasobi', '$2b$10$vcPLNP.zBJLucGVzpACSLO6Xm70BEbXsqFU0Flpt21QKu.1.cfhvG', 0),
  (6, 'Maudy Ayunda', 'ngimpi@gmail.com', 'ngimpi', '$2b$10$vcPLNP.zBJLucGVzpACSLO6Xm70BEbXsqFU0Flpt21QKu.1.cfhvG', 0),
  (7, 'halohalo', 'admin@gmail.com', 'halo', '$2b$10$vcPLNP.zBJLucGVzpACSLO6Xm70BEbXsqFU0Flpt21QKu.1.cfhvG', 1),
  (8, 'Yorushika', 'yorushika@gmail.com', 'yorushika', '$2b$10$vcPLNP.zBJLucGVzpACSLO6Xm70BEbXsqFU0Flpt21QKu.1.cfhvG', 0),
  (9, 'Bruno Mars', 'mars@gmail.com', 'mars', '$2b$10$vcPLNP.zBJLucGVzpACSLO6Xm70BEbXsqFU0Flpt21QKu.1.cfhvG', 0),
  (10, 'Bruno Jupiter', 'jupiter@gmail.com', 'jupiter', '$2b$10$vcPLNP.zBJLucGVzpACSLO6Xm70BEbXsqFU0Flpt21QKu.1.cfhvG', 0),
  (11, 'Bruno Earth', 'earth@gmail.com', 'earth', '$2b$10$vcPLNP.zBJLucGVzpACSLO6Xm70BEbXsqFU0Flpt21QKu.1.cfhvG', 0);

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
(1,'Teriyaki Boyz',4,'https://firebasestorage.googleapis.com/v0/b/binotify-premium-song.appspot.com/o/files%2FTravis%20Scott%20HVME%20%20Goosebumps%20Remix%20%20Official%20Audio.mp3%20-%202022-10-21T13%3A32%3A21.186Z?alt=media&token=8807a697-4ce5-4322-9434-d3334ee197de'),
(2,'Goosebumps',4,'https://firebasestorage.googleapis.com/v0/b/binotify-premium-song.appspot.com/o/files%2FTokyo%20Drift%20%20Teriyaki%20Boyz%20%20MUSIC%20VIDEO%20%20HD.mp3%20-%202022-10-21T13%3A32%3A21.167Z?alt=media&token=67d73271-b590-4f71-a094-b0abebce8af5'),
(3,'Dat Stick', 4,'https://firebasestorage.googleapis.com/v0/b/binotify-premium-song.appspot.com/o/files%2FTokyo%20Drift%20%20Teriyaki%20Boyz%20%20MUSIC%20VIDEO%20%20HD.mp3%20-%202022-10-21T13%3A32%3A21.167Z?alt=media&token=67d73271-b590-4f71-a094-b0abebce8af5'),
(4,'Glow Like Dat',4,'https://firebasestorage.googleapis.com/v0/b/binotify-premium-song.appspot.com/o/files%2FTokyo%20Drift%20%20Teriyaki%20Boyz%20%20MUSIC%20VIDEO%20%20HD.mp3%20-%202022-10-21T13%3A32%3A21.167Z?alt=media&token=67d73271-b590-4f71-a094-b0abebce8af5'),
(5,'100 Degrees',5,'https://firebasestorage.googleapis.com/v0/b/binotify-premium-song.appspot.com/o/files%2FTokyo%20Drift%20%20Teriyaki%20Boyz%20%20MUSIC%20VIDEO%20%20HD.mp3%20-%202022-10-21T13%3A32%3A21.167Z?alt=media&token=67d73271-b590-4f71-a094-b0abebce8af5'),
(6,'Lagu Premium 6',5,'https://firebasestorage.googleapis.com/v0/b/binotify-premium-song.appspot.com/o/files%2FTokyo%20Drift%20%20Teriyaki%20Boyz%20%20MUSIC%20VIDEO%20%20HD.mp3%20-%202022-10-21T13%3A32%3A21.167Z?alt=media&token=67d73271-b590-4f71-a094-b0abebce8af5'),
(7,'Lagu Premium 7',5,'https://firebasestorage.googleapis.com/v0/b/binotify-premium-song.appspot.com/o/files%2FTokyo%20Drift%20%20Teriyaki%20Boyz%20%20MUSIC%20VIDEO%20%20HD.mp3%20-%202022-10-21T13%3A32%3A21.167Z?alt=media&token=67d73271-b590-4f71-a094-b0abebce8af5'),
(8,'Lagu Premium 8',5,'https://firebasestorage.googleapis.com/v0/b/binotify-premium-song.appspot.com/o/files%2FTokyo%20Drift%20%20Teriyaki%20Boyz%20%20MUSIC%20VIDEO%20%20HD.mp3%20-%202022-10-21T13%3A32%3A21.167Z?alt=media&token=67d73271-b590-4f71-a094-b0abebce8af5'),
(9,'Lagu Premium 9',6,'https://firebasestorage.googleapis.com/v0/b/binotify-premium-song.appspot.com/o/files%2FTokyo%20Drift%20%20Teriyaki%20Boyz%20%20MUSIC%20VIDEO%20%20HD.mp3%20-%202022-10-21T13%3A32%3A21.167Z?alt=media&token=67d73271-b590-4f71-a094-b0abebce8af5'),
(10,'Lagu Premium 10',6,'https://firebasestorage.googleapis.com/v0/b/binotify-premium-song.appspot.com/o/files%2FTokyo%20Drift%20%20Teriyaki%20Boyz%20%20MUSIC%20VIDEO%20%20HD.mp3%20-%202022-10-21T13%3A32%3A21.167Z?alt=media&token=67d73271-b590-4f71-a094-b0abebce8af53'),
(11,'Lagu Premium 11',6,'https://firebasestorage.googleapis.com/v0/b/binotify-premium-song.appspot.com/o/files%2FTokyo%20Drift%20%20Teriyaki%20Boyz%20%20MUSIC%20VIDEO%20%20HD.mp3%20-%202022-10-21T13%3A32%3A21.167Z?alt=media&token=67d73271-b590-4f71-a094-b0abebce8af53'),
(12,'Lagu Premium 12',6,'https://firebasestorage.googleapis.com/v0/b/binotify-premium-song.appspot.com/o/files%2FTokyo%20Drift%20%20Teriyaki%20Boyz%20%20MUSIC%20VIDEO%20%20HD.mp3%20-%202022-10-21T13%3A32%3A21.167Z?alt=media&token=67d73271-b590-4f71-a094-b0abebce8af53'),
(13,'Lagu Premium 13',7,'https://firebasestorage.googleapis.com/v0/b/binotify-premium-song.appspot.com/o/files%2FTokyo%20Drift%20%20Teriyaki%20Boyz%20%20MUSIC%20VIDEO%20%20HD.mp3%20-%202022-10-21T13%3A32%3A21.167Z?alt=media&token=67d73271-b590-4f71-a094-b0abebce8af53'),
(14,'Lagu Premium 14',7,'https://firebasestorage.googleapis.com/v0/b/binotify-premium-song.appspot.com/o/files%2FTokyo%20Drift%20%20Teriyaki%20Boyz%20%20MUSIC%20VIDEO%20%20HD.mp3%20-%202022-10-21T13%3A32%3A21.167Z?alt=media&token=67d73271-b590-4f71-a094-b0abebce8af53'),
(15,'Lagu Premium 15',7,'https://firebasestorage.googleapis.com/v0/b/binotify-premium-song.appspot.com/o/files%2FTokyo%20Drift%20%20Teriyaki%20Boyz%20%20MUSIC%20VIDEO%20%20HD.mp3%20-%202022-10-21T13%3A32%3A21.167Z?alt=media&token=67d73271-b590-4f71-a094-b0abebce8af53'),
(16,'Lagu Premium 16',7,'https://firebasestorage.googleapis.com/v0/b/binotify-premium-song.appspot.com/o/files%2FTokyo%20Drift%20%20Teriyaki%20Boyz%20%20MUSIC%20VIDEO%20%20HD.mp3%20-%202022-10-21T13%3A32%3A21.167Z?alt=media&token=67d73271-b590-4f71-a094-b0abebce8af53'),
(17,'Lagu Premium 17',8,'https://firebasestorage.googleapis.com/v0/b/binotify-premium-song.appspot.com/o/files%2FTokyo%20Drift%20%20Teriyaki%20Boyz%20%20MUSIC%20VIDEO%20%20HD.mp3%20-%202022-10-21T13%3A32%3A21.167Z?alt=media&token=67d73271-b590-4f71-a094-b0abebce8af53'),
(18,'Lagu Premium 18',8,'https://firebasestorage.googleapis.com/v0/b/binotify-premium-song.appspot.com/o/files%2FTokyo%20Drift%20%20Teriyaki%20Boyz%20%20MUSIC%20VIDEO%20%20HD.mp3%20-%202022-10-21T13%3A32%3A21.167Z?alt=media&token=67d73271-b590-4f71-a094-b0abebce8af53'),
(19,'Lagu Premium 19',8,'https://firebasestorage.googleapis.com/v0/b/binotify-premium-song.appspot.com/o/files%2FTokyo%20Drift%20%20Teriyaki%20Boyz%20%20MUSIC%20VIDEO%20%20HD.mp3%20-%202022-10-21T13%3A32%3A21.167Z?alt=media&token=67d73271-b590-4f71-a094-b0abebce8af53'),
(20,'Lagu Premium 20',8,'https://firebasestorage.googleapis.com/v0/b/binotify-premium-song.appspot.com/o/files%2FTokyo%20Drift%20%20Teriyaki%20Boyz%20%20MUSIC%20VIDEO%20%20HD.mp3%20-%202022-10-21T13%3A32%3A21.167Z?alt=media&token=67d73271-b590-4f71-a094-b0abebce8af53'),
(21,'Lagu Premium 21',9,'https://firebasestorage.googleapis.com/v0/b/binotify-premium-song.appspot.com/o/files%2FTokyo%20Drift%20%20Teriyaki%20Boyz%20%20MUSIC%20VIDEO%20%20HD.mp3%20-%202022-10-21T13%3A32%3A21.167Z?alt=media&token=67d73271-b590-4f71-a094-b0abebce8af53'),
(22,'Lagu Premium 22',9,'https://firebasestorage.googleapis.com/v0/b/binotify-premium-song.appspot.com/o/files%2FTokyo%20Drift%20%20Teriyaki%20Boyz%20%20MUSIC%20VIDEO%20%20HD.mp3%20-%202022-10-21T13%3A32%3A21.167Z?alt=media&token=67d73271-b590-4f71-a094-b0abebce8af53'),
(23,'Lagu Premium 23',9,'https://firebasestorage.googleapis.com/v0/b/binotify-premium-song.appspot.com/o/files%2FTokyo%20Drift%20%20Teriyaki%20Boyz%20%20MUSIC%20VIDEO%20%20HD.mp3%20-%202022-10-21T13%3A32%3A21.167Z?alt=media&token=67d73271-b590-4f71-a094-b0abebce8af53'),
(24,'Lagu Premium 24',9,'https://firebasestorage.googleapis.com/v0/b/binotify-premium-song.appspot.com/o/files%2FTokyo%20Drift%20%20Teriyaki%20Boyz%20%20MUSIC%20VIDEO%20%20HD.mp3%20-%202022-10-21T13%3A32%3A21.167Z?alt=media&token=67d73271-b590-4f71-a094-b0abebce8af53'),
(25,'Lagu Premium 25',10,'https://firebasestorage.googleapis.com/v0/b/binotify-premium-song.appspot.com/o/files%2FTokyo%20Drift%20%20Teriyaki%20Boyz%20%20MUSIC%20VIDEO%20%20HD.mp3%20-%202022-10-21T13%3A32%3A21.167Z?alt=media&token=67d73271-b590-4f71-a094-b0abebce8af53'),
(26,'Lagu Premium 26',10,'https://firebasestorage.googleapis.com/v0/b/binotify-premium-song.appspot.com/o/files%2FTokyo%20Drift%20%20Teriyaki%20Boyz%20%20MUSIC%20VIDEO%20%20HD.mp3%20-%202022-10-21T13%3A32%3A21.167Z?alt=media&token=67d73271-b590-4f71-a094-b0abebce8af53'),
(27,'Lagu Premium 27',10,'https://firebasestorage.googleapis.com/v0/b/binotify-premium-song.appspot.com/o/files%2FTokyo%20Drift%20%20Teriyaki%20Boyz%20%20MUSIC%20VIDEO%20%20HD.mp3%20-%202022-10-21T13%3A32%3A21.167Z?alt=media&token=67d73271-b590-4f71-a094-b0abebce8af53'),
(28,'Lagu Premium 28',11,'https://firebasestorage.googleapis.com/v0/b/binotify-premium-song.appspot.com/o/files%2FTokyo%20Drift%20%20Teriyaki%20Boyz%20%20MUSIC%20VIDEO%20%20HD.mp3%20-%202022-10-21T13%3A32%3A21.167Z?alt=media&token=67d73271-b590-4f71-a094-b0abebce8af53'),
(29,'Lagu Premium 29',11,'https://firebasestorage.googleapis.com/v0/b/binotify-premium-song.appspot.com/o/files%2FTokyo%20Drift%20%20Teriyaki%20Boyz%20%20MUSIC%20VIDEO%20%20HD.mp3%20-%202022-10-21T13%3A32%3A21.167Z?alt=media&token=67d73271-b590-4f71-a094-b0abebce8af53'),
(30,'Lagu Premium 30;',11,'https://firebasestorage.googleapis.com/v0/b/binotify-premium-song.appspot.com/o/files%2FTokyo%20Drift%20%20Teriyaki%20Boyz%20%20MUSIC%20VIDEO%20%20HD.mp3%20-%202022-10-21T13%3A32%3A21.167Z?alt=media&token=67d73271-b590-4f71-a094-b0abebce8af53');