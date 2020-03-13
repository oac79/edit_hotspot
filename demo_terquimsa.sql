-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-03-2020 a las 13:38:48
-- Versión del servidor: 10.1.35-MariaDB
-- Versión de PHP: 7.2.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `demo_terquimsa`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hotspots`
--

CREATE TABLE `hotspots` (
  `id` int(11) NOT NULL,
  `project` varchar(100) NOT NULL,
  `scene` varchar(100) NOT NULL,
  `name` varchar(100) NOT NULL,
  `title` varchar(100) NOT NULL,
  `message` varchar(8000) DEFAULT NULL,
  `icon` varchar(200) NOT NULL,
  `image` varchar(200) DEFAULT NULL,
  `video` varchar(200) DEFAULT NULL,
  `type` varchar(30) NOT NULL,
  `link` varchar(255) DEFAULT NULL,
  `coordinate_x` double NOT NULL,
  `coordinate_y` double NOT NULL,
  `scale` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Volcado de datos para la tabla `hotspots`
--

INSERT INTO `hotspots` (`id`, `project`, `scene`, `name`, `title`, `message`, `icon`, `image`, `video`, `type`, `link`, `coordinate_x`, `coordinate_y`, `scale`) VALUES
(200, 'TERQUIMSA', 'scene_1', 'spot0', 'gfsgdf', '<p>SPOT0</p>', 'assets/images/fotos360.jpg', 'gdfsgdf', '', 'text', '', -0.03366920931421191, 0.15528294061995257, 0.2),
(201, 'TERQUIMSA', 'scene_1', 'spot1', 'hfjgjghf', '<p>hjgfgjhjghfhj</p>', 'assets/images/fotos360.jpg', 'jhgffgjh', '', 'text', '', 0.0603770191423223, 0.15760549420502173, 0.2),
(202, 'TERQUIMSA', 'scene_2', 'spot2', 'ghghffg', '', 'assets/images/fotos360.jpg', 'hgfdhfgd', '', 'image', '', 68.77165391713675, 6.071164706081884, 1),
(203, 'TERQUIMSA', 'scene_1', 'spot3', 'text', '<p>text</p>', 'assets/images/fotos360.jpg', '', '', 'text', '', 0.022634668335172137, 0.15760602201103516, 0.2),
(204, 'TERQUIMSA', 'scene_1', 'spot4', 'fdsadf', '', 'assets/images/fotos360.jpg', '', '', 'pdf', 'fddfasfa', 0.32798031921902293, -0.03744200932928821, 0.2),
(205, 'TERQUIMSA', 'scene_2', 'spot5', 'oijklkjeghgehf', '<p>hgddghf</p>', 'assets/images/fotos360.jpg', 'gdfhhdgf', '', 'text', '', -161.22655778113779, -12.202020757336063, 1),
(206, 'TERQUIMSA', 'scene_1', 'spot6', '', '', 'assets/images/fotos360.jpg', '', '', 'link', 'oijklkj', 0.09491673198772332, -0.014222230649384875, 0.2),
(207, 'TERQUIMSA', 'scene_1', 'spot7', 'prueba ', '<p>dffdsa</p><p>hjggf</p><p><br></p><p>ikhgjk¡+</p><p><br></p>', 'assets/images/fotos360.jpg', '', '', 'text', '', 0.16312006450272065, 0.018866173463201286, 0.2),
(208, 'TERQUIMSA', 'scene_1', 'spot8', 'hgfgdhdf', '<p>dghfhgfdfdgh</p>', 'assets/images/fotos360.jpg', '', '', 'text', '', 0.044933874857349565, 0.04035356590141799, 0.2),
(209, 'TERQUIMSA', 'scene_1', 'spot9', '', '', 'assets/images/fotos360.jpg', '', '', 'link', 'fdsfsdgf', 0.1702847345266605, -0.2219426271820653, 0.2),
(210, 'TERQUIMSA', 'scene_1', 'spot10', 'fgfgfsd', '<p>gfgdfss</p><p>kjgjhgf</p><p>hgjghf</p>', 'assets/images/fotos360.jpg', '', '', 'text', '', 0.01252873229287843, 0, 0.2),
(211, 'TERQUIMSA', 'scene_2', 'spot11', 'gfsdgfds', '<p>gsfdsgf</p><p>ghfgdfhfd</p><p>hgfhgdf</p>', 'assets/images/fotos360.jpg', '', '', 'text', '', -136.0925747399382, 0.0197773427279208, 1),
(212, 'TERQUIMSA', 'scene_1', 'spot12', 'fdsfda', '', 'assets/images/fotos360.jpg', 'fdsafdsa', '', 'image', '', 0.10914330842393838, -0.12472883937429144, 0.2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `hotspots`
--
ALTER TABLE `hotspots`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `hotspots`
--
ALTER TABLE `hotspots`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=213;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
