CREATE SCHEMA sanrio;
USE sanrio;

CREATE TABLE personagens(
id INT AUTO_INCREMENT,
nome VARCHAR(30) NOT NULL,
aniv DATE NOT NULL,
descricao VARCHAR(255) NOT NULL,
url_img VARCHAR(255) NOT NULL,
primary key(id)
);