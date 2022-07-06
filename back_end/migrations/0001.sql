-- --------------------------------------------------------
-- Host:                         127.0.0.1
-- Versión del servidor:         10.4.24-MariaDB - mariadb.org binary distribution
-- SO del servidor:              Win64
-- HeidiSQL Versión:             12.0.0.6468
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Volcando estructura de base de datos para estudioapuestas
CREATE DATABASE IF NOT EXISTS `estudioapuestas` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `estudioapuestas`;

-- Volcando estructura para tabla estudioapuestas.equipos
CREATE TABLE `equipos` (
	`id` INT(11) NOT NULL AUTO_INCREMENT,
	`nombre` VARCHAR(50) NOT NULL,
	`id_pais` INT(11) NOT NULL,
	`fecha_modificado` TIMESTAMP NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
	`eliminado` INT(1) NOT NULL DEFAULT 0,
	PRIMARY KEY (`id`),
	UNIQUE INDEX `nombre` (`nombre`),
	INDEX `FK_equipos_paises` (`id_pais`),
	CONSTRAINT `FK_equipos_paises` FOREIGN KEY (`id_pais`) REFERENCES `paises` (`id`) ON UPDATE NO ACTION ON DELETE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla estudioapuestas.ligas
CREATE TABLE IF NOT EXISTS `ligas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_liga` varchar(50) NOT NULL,
  `id_pais` int(11) NOT NULL,
  `fecha_modificado` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `eliminado` int(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `FK_ligas_paises` (`id_pais`),
  CONSTRAINT `FK_ligas_paises` FOREIGN KEY (`id_pais`) REFERENCES `paises` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla estudioapuestas.paises
CREATE TABLE IF NOT EXISTS `paises` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `pais` varchar(50) NOT NULL,
  `fecha_modificado` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `eliminado` int(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla estudioapuestas.resultados
CREATE TABLE IF NOT EXISTS `resultados` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `fecha_partido` varchar(50) NOT NULL,
  `id_ligas` int(11) NOT NULL,
  `equipo_local` int(11) NOT NULL,
  `equipo_visitante` int(11) NOT NULL,
  `resultado_descanso` varchar(50) DEFAULT NULL,
  `resultado_final` varchar(50) DEFAULT NULL,
  `resultado_final_signo` varchar(1) DEFAULT NULL,
  `resultado_descanso_signo` varchar(1) DEFAULT NULL,
  `cuota_1` float DEFAULT NULL,
  `cuota_x` float DEFAULT NULL,
  `cuota_2` float DEFAULT NULL,
  `mas_05_descanso` int(1) DEFAULT NULL,
  `mas_15_descanso` int(1) DEFAULT NULL,
  `mas_25_descanso` int(1) DEFAULT NULL,
  `ambos_marcan` int(1) DEFAULT NULL,
  `temporadas_id` int(11) DEFAULT NULL,
  `goles_ambas_partes` int(1) DEFAULT NULL,
  `diferencia_goles_descanso_final_local` float DEFAULT NULL,
  `diferencia_goles_descanso_final_visitante` float DEFAULT NULL,
  `mas_15_final` int(1) DEFAULT NULL,
  `local_gf_descanso` int(11) DEFAULT NULL,
  `local_gc_descanso` int(11) DEFAULT NULL,
  `visitante_gf_descanso` int(11) DEFAULT NULL,
  `visitante_gc_descanso` int(11) DEFAULT NULL,
  `local_gf_final` int(11) DEFAULT NULL,
  `local_gc_final` int(11) DEFAULT NULL,
  `visitante_gf_final` int(11) DEFAULT NULL,
  `visitante_gc_final` int(11) DEFAULT NULL,
  `fecha_modificado` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `eliminado` int(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`),
  KEY `FK_resultados_temporadas` (`temporadas_id`),
  KEY `FK_resultados_ligas` (`id_ligas`),
  KEY `FK_resultados_equipos` (`equipo_local`),
  KEY `FK_resultados_equipos_2` (`equipo_visitante`),
  CONSTRAINT `FK_resultados_equipos` FOREIGN KEY (`equipo_local`) REFERENCES `equipos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_resultados_equipos_2` FOREIGN KEY (`equipo_visitante`) REFERENCES `equipos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_resultados_ligas` FOREIGN KEY (`id_ligas`) REFERENCES `ligas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `FK_resultados_temporadas` FOREIGN KEY (`temporadas_id`) REFERENCES `temporadas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

-- La exportación de datos fue deseleccionada.

-- Volcando estructura para tabla estudioapuestas.temporadas
CREATE TABLE IF NOT EXISTS `temporadas` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `temporada_fecha` varchar(50) NOT NULL,
  `fecha_modificado` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `eliminado` int(1) NOT NULL DEFAULT 0,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

-- La exportación de datos fue deseleccionada.

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
