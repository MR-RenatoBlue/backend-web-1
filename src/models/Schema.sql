DROP DATABASE IF EXISTS services;
CREATE DATABASE services;
USE services;

CREATE TABLE IF NOT EXISTS categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

INSERT INTO categories (name)
VALUES ('Suporte');

CREATE TABLE IF NOT EXISTS agent (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    cpf varchar(14) UNIQUE,
    email VARCHAR(255) UNIQUE
);

CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    description varchar(500),
    agent_id INT,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(id),
    FOREIGN KEY (agent_id) REFERENCES agent(id)
);

SHOW TABLES;
DESCRIBE categories;
DESCRIBE tasks;
