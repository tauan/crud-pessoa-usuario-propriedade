-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`pessoa`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`pessoa` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `sobrenome` VARCHAR(90) NOT NULL,
  `cpf` CHAR(14) NOT NULL,
  `perfil` ENUM('produtor', 'tecnico', 'administrador') NOT NULL,
  `criado_em` TIMESTAMP NOT NULL,
  `atualizado_em` TIMESTAMP NOT NULL,
  `desativado_em` TIMESTAMP NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `cpf_UNIQUE` (`cpf` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`usuario`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`usuario` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `login` VARCHAR(90) NOT NULL,
  `senha` TEXT(40) NOT NULL,
  `criado_em` TIMESTAMP NOT NULL,
  `atualizado_em` TIMESTAMP NOT NULL,
  `desativado_em` TIMESTAMP NULL,
  `pessoa_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_USUARIO_PESSOA_idx` (`pessoa_id` ASC) VISIBLE,
  UNIQUE INDEX `login_UNIQUE` (`login` ASC) VISIBLE,
  CONSTRAINT `fk_USUARIO_PESSOA`
    FOREIGN KEY (`pessoa_id`)
    REFERENCES `mydb`.`pessoa` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`propriedade`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`propriedade` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(90) NOT NULL,
  `criado_em` TIMESTAMP NOT NULL,
  `atualizado_em` TIMESTAMP NOT NULL,
  `desativado_em` TIMESTAMP NULL,
  `produtor_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_propriedade_pessoa1_idx` (`produtor_id` ASC) VISIBLE,
  CONSTRAINT `fk_propriedade_pessoa1`
    FOREIGN KEY (`produtor_id`)
    REFERENCES `mydb`.`pessoa` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
