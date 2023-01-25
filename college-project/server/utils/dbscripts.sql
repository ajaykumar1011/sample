CREATE DATABASE salary_management;

CREATE TABLE `salary_management`.`employees` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(45) NOT NULL,
  `designation` VARCHAR(45) NOT NULL,
  `experience` FLOAT NOT NULL,
  `ssn` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `salary_management`.`yearly_salaries` (
  `emp_id` INT NOT NULL,
  `current_salary` INT NOT NULL,
  INDEX `id_idx` (`emp_id` ASC) VISIBLE,
  CONSTRAINT `id`
    FOREIGN KEY (`emp_id`)
    REFERENCES `salary_management`.`employees` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

CREATE TABLE `salary_management`.`admins` (
  `email` VARCHAR(255) NULL,
  `password` VARCHAR(255) NULL);

CREATE TABLE `salary_management`.`monthly_salaries` (
  `emp_id` INT NOT NULL,
  `basic` INT NOT NULL,
  `hra` INT NOT NULL,
  `allowances` INT NOT NULL,
  `employer_pf` INT NOT NULL,
  `employee_pf` INT NOT NULL,
  `leaves` INT NOT NULL,
  `deductions` INT NOT NULL,
  `net` INT NOT NULL,
  `month` DATE NOT NULL,
  INDEX `id_idx` (`emp_id` ASC) VISIBLE,
  CONSTRAINT `employee_id`
    FOREIGN KEY (`emp_id`)
    REFERENCES `college_project`.`employees` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'Hello@123';
flush privileges;
