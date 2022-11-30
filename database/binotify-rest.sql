DROP DATABASE IF EXISTS `binotify-rest`;
CREATE DATABASE `binotify-rest`;

DROP TABLE IF EXISTS `binotify-rest`.`user`;
CREATE TABLE `binotify-rest`.`user` (
  `user_id` int NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `isAdmin` tinyint(1) NOT NULL,
  PRIMARY KEY (`user_id`)
);

INSERT INTO `binotify-rest`.`user` (`user_id`, `email`, `password`, `name`, `username`, `isAdmin`) VALUES
  (1, 'user@gmail.com', '$2y$10$KHFOPrd1l6EjwkNJEkyGx.Kn8tTukczRHFHwZK6eco6OsbAvknp9O', 'dito', 'Ardhito Pramono', 0),
  (2, 'admin@gmail.com', '$2y$10$KHFOPrd1l6EjwkNJEkyGx.Kn8tTukczRHFHwZK6eco6OsbAvknp9O', 'halo', 'halohalo', 1);

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
(1,'Teriyaki Boyz',1,'https://firebasestorage.googleapis.com/v0/b/binotify-premium-song.appspot.com/o/files%2FTravis%20Scott%20HVME%20%20Goosebumps%20Remix%20%20Official%20Audio.mp3%20-%202022-10-21T13%3A32%3A21.186Z?alt=media&token=8807a697-4ce5-4322-9434-d3334ee197de'),
(2,'Goosebumps',1,'https://firebasestorage.googleapis.com/v0/b/binotify-premium-song.appspot.com/o/files%2FTokyo%20Drift%20%20Teriyaki%20Boyz%20%20MUSIC%20VIDEO%20%20HD.mp3%20-%202022-10-21T13%3A32%3A21.167Z?alt=media&token=67d73271-b590-4f71-a094-b0abebce8af5'),
(3,'Dat Stick', 1,'https://firebasestorage.googleapis.com/v0/b/binotify-premium-song.appspot.com/o/files%2FTokyo%20Drift%20%20Teriyaki%20Boyz%20%20MUSIC%20VIDEO%20%20HD.mp3%20-%202022-10-21T13%3A32%3A21.167Z?alt=media&token=67d73271-b590-4f71-a094-b0abebce8af5'),
(4,'Glow Like Dat',1,'https://firebasestorage.googleapis.com/v0/b/binotify-premium-song.appspot.com/o/files%2FTokyo%20Drift%20%20Teriyaki%20Boyz%20%20MUSIC%20VIDEO%20%20HD.mp3%20-%202022-10-21T13%3A32%3A21.167Z?alt=media&token=67d73271-b590-4f71-a094-b0abebce8af5'),
(5,'100 Degrees',1,'https://firebasestorage.googleapis.com/v0/b/binotify-premium-song.appspot.com/o/files%2FTokyo%20Drift%20%20Teriyaki%20Boyz%20%20MUSIC%20VIDEO%20%20HD.mp3%20-%202022-10-21T13%3A32%3A21.167Z?alt=media&token=67d73271-b590-4f71-a094-b0abebce8af5'),
(6,'Lagu Premium 6',1,'https://firebasestorage.googleapis.com/v0/b/binotify-premium-song.appspot.com/o/files%2FTokyo%20Drift%20%20Teriyaki%20Boyz%20%20MUSIC%20VIDEO%20%20HD.mp3%20-%202022-10-21T13%3A32%3A21.167Z?alt=media&token=67d73271-b590-4f71-a094-b0abebce8af5'),
(7,'Lagu Premium 7',1,'https://firebasestorage.googleapis.com/v0/b/binotify-premium-song.appspot.com/o/files%2FTokyo%20Drift%20%20Teriyaki%20Boyz%20%20MUSIC%20VIDEO%20%20HD.mp3%20-%202022-10-21T13%3A32%3A21.167Z?alt=media&token=67d73271-b590-4f71-a094-b0abebce8af5'),
(8,'Lagu Premium 8', 1,'https://firebasestorage.googleapis.com/v0/b/binotify-premium-song.appspot.com/o/files%2FTokyo%20Drift%20%20Teriyaki%20Boyz%20%20MUSIC%20VIDEO%20%20HD.mp3%20-%202022-10-21T13%3A32%3A21.167Z?alt=media&token=67d73271-b590-4f71-a094-b0abebce8af5'),
(9,'Lagu Premium 9',1,'https://firebasestorage.googleapis.com/v0/b/binotify-premium-song.appspot.com/o/files%2FTokyo%20Drift%20%20Teriyaki%20Boyz%20%20MUSIC%20VIDEO%20%20HD.mp3%20-%202022-10-21T13%3A32%3A21.167Z?alt=media&token=67d73271-b590-4f71-a094-b0abebce8af5'),
(10,'Lagu Premium 10',1, 'https://firebasestorage.googleapis.com/v0/b/binotify-premium-song.appspot.com/o/files%2FTokyo%20Drift%20%20Teriyaki%20Boyz%20%20MUSIC%20VIDEO%20%20HD.mp3%20-%202022-10-21T13%3A32%3A21.167Z?alt=media&token=67d73271-b590-4f71-a094-b0abebce8af53');