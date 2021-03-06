-- MySQL Script generated by MySQL Workbench
-- Mon Sep 27 03:39:32 2021
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema node_board
-- -----------------------------------------------------
DROP SCHEMA IF EXISTS `node_board` ;

-- -----------------------------------------------------
-- Schema node_board
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `node_board` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `node_board` ;

-- -----------------------------------------------------
-- Table `node_board`.`USER`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `node_board`.`USER` ;

CREATE TABLE IF NOT EXISTS `node_board`.`USER` (
  `user_id` INT NOT NULL AUTO_INCREMENT,
  `nickname` VARCHAR(10) NOT NULL,
  `email` VARCHAR(30) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 29
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `node_board`.`BOARD`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `node_board`.`BOARD` ;


CREATE TABLE IF NOT EXISTS `node_board`.`BOARD` (
  `board_id` INT NOT NULL AUTO_INCREMENT,
  `fk_user_id` INT NOT NULL,
  `title` VARCHAR(45) NOT NULL COMMENT '게시글 제목',
  `body` TEXT NOT NULL,
  `like` INT NULL DEFAULT '0',
  `hate` INT NULL DEFAULT '0',
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`board_id`),
  INDEX `user_id_idx` (`fk_user_id` ASC) VISIBLE,
  CONSTRAINT `user_id`
    FOREIGN KEY (`fk_user_id`)
    REFERENCES `node_board`.`USER` (`user_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 20
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `node_board`.`COMMENT`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `node_board`.`COMMENT` ;

CREATE TABLE IF NOT EXISTS `node_board`.`COMMENT` (
  `comment_id` INT NOT NULL AUTO_INCREMENT,
  `fk_comment_userId` INT NOT NULL,
  `fk_comment_boardId` INT NOT NULL,
  `created_at` DATETIME NULL DEFAULT CURRENT_TIMESTAMP,
  `comment_body` TEXT NOT NULL,
  PRIMARY KEY (`comment_id`),
  INDEX `fk_comment_uesrId_idx` (`fk_comment_userId` ASC) VISIBLE,
  INDEX `fk_comment_boardId_idx` (`fk_comment_boardId` ASC) VISIBLE,
  CONSTRAINT `fk_comment_boardId`
    FOREIGN KEY (`fk_comment_boardId`)
    REFERENCES `node_board`.`BOARD` (`board_id`),
  CONSTRAINT `fk_comment_uesrId`
    FOREIGN KEY (`fk_comment_userId`)
    REFERENCES `node_board`.`USER` (`user_id`))
ENGINE = InnoDB
AUTO_INCREMENT = 7
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
