# Tree-app-Backend

1- Opret Database:
Først skal du oprette en database i MySQL:
 CREATE DATABASE tree_app_db;
 USE tree_app_db;
- Opret Tabels:
 CREATE TABLE checklists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255),
    score INT,
    level INT,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);
CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(50)
);
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    password VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(15)
);
CREATE TABLE user_levels (
    user_id INT,
    level INT,
    PRIMARY KEY (user_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);
CREATE TABLE user_points (
    user_id INT,
    points INT,
    PRIMARY KEY (user_id),
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);




 2 - Indsæt Data i checklists Tabel
 
 INSERT INTO categories (name) VALUES
('eluse'),
('transport'),
('foodwaste'),
('usedthing');
 
INSERT INTO checklists (name, score, level, category_id) VALUES
('Sluk for lys', 100, 1, 1),
('Skift til LED-pærer', 200, 1, 1),
('Vask i kold vand', 75, 1, 1),
('Brug offentlig transport', 100, 1, 2),
('Cykel i stedet for at køre', 200, 1, 2),
('Køb lokale råvarer', 100, 1, 3),
('Undgå madspild', 150, 1, 3),
('Sortér affald', 100, 1, 4),
('Brug genanvendelige poser', 200, 1, 4);
.....
 
 
  

