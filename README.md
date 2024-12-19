# Tree-app-Backend

CREATE DATABASE tree_app_db;

USE tree_app_db;

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE checklists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    score INT NOT NULL,
    level INT NOT NULL,
    category_id INT,
    FOREIGN KEY (category_id) REFERENCES categories(id)
);

CREATE TABLE user_levels (
    user_id INT,
    level INT,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE user_points (
    user_id INT,
    points INT NOT NULL,
    FOREIGN KEY (user_id) REFERENCES users(user_id)
);

CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(255)
);

INSERT INTO categories (id, name) VALUES
(1, 'eluse'),
(2, 'transport'),
(3, 'foodwaste'),
(4, 'usedthing');





level1: 

INSERT INTO checklists (name, score, level, category_id)
VALUES 
('Jeg slukkede lyset, når det ikke var nødvendigt', 50, 1, 1),
('Jeg brugte lavenergipærer i hele huset', 75, 1, 1),
('Jeg brugte LED-lamper til belysning', 100, 1, 1);



INSERT INTO checklists (name, score, level, category_id)
VALUES 
('Jeg har gået eller cyklet på ture under 2 km', 50, 1, 2),
('Jeg har brugt offentlig transport til mindst én tur', 75, 1, 2),
('Jeg har reduceret biltransport', 100, 1, 2);


INSERT INTO checklists (name, score, level, category_id)
VALUES 
('Jeg genbrugte en ting i stedet for at smide den ud', 50, 1, 4),
('Jeg undgik engangsplastik som flasker og kopper', 75, 1, 4),
('Jeg brugte genanvendelige poser til indkøb', 100, 1, 4);

INSERT INTO checklists (name, score, level, category_id)
VALUES 
('Jeg spiste ét plantebaseret måltid', 50, 1, 3),
('Jeg brugte rester og undgik madspild', 75, 1, 3),
('Jeg valgte en lokal frugt eller grøntsag', 100, 1, 3);

level2: 

INSERT INTO checklists (name, score, level, category_id)
VALUES 
('Jeg slukkede lyset, når det ikke var nødvendigt', 50, 2, 1),
('Jeg brugte lavenergipærer i hele huset', 75, 2, 1),
('Jeg brugte LED-lamper til belysning', 100, 2, 1),
('Jeg slukkede unødvendige elektroniske apparater', 125, 2, 1),
('Jeg valgte energivenlige apparater som køleskabe og vaskemaskiner', 150, 2, 1),
('Jeg brugte en smart termostat for at optimere opvarmningen', 175, 2, 1);


INSERT INTO checklists (name, score, level, category_id)
VALUES 
('Jeg har gået eller cyklet på ture under 2 km', 50, 2, 2),
('Jeg har brugt offentlig transport til mindst én tur', 75, 2, 2),
('Jeg har reduceret biltransport', 100, 2, 2),
('Jeg har gået eller cyklet på ture under 5 km', 125, 2, 2),
('Jeg har brugt en miljøvenlig ruteplanlægningsapp til at optimere transport', 150, 2, 2),
('Jeg har begrænset bilkørsel til maksimalt én tur om dagen', 175, 2, 2);

INSERT INTO checklists (name, score, level, category_id)
VALUES 
('Jeg genbrugte en ting i stedet for at smide den ud', 50, 2, 4),
('Jeg undgik engangsplastik som flasker og kopper', 75, 2, 4),
('Jeg brugte genanvendelige poser til indkøb', 100, 2, 4),
('Jeg reparerede noget i stedet for at købe nyt', 125, 2, 4),
('Jeg købte slet ikke noget den dag', 150, 2, 4),
('Jeg sorterede ting til genbrug eller donation', 175, 2, 4);

INSERT INTO checklists (name, score, level, category_id)
VALUES 
('Jeg spiste ét plantebaseret måltid', 50, 2, 3),
('Jeg brugte rester og undgik madspild', 75, 2, 3),
('Jeg valgte en lokal frugt eller grøntsag', 100, 2, 3),
('Jeg drak kun postevand hele dagen', 125, 2, 3),
('Jeg planlagde måltider for at undgå madspild', 150, 2, 3),
('Jeg undgik færdigpakkede snacks og måltider', 175, 2, 3);

level3:

INSERT INTO checklists (name, score, level, category_id)
VALUES 
('Jeg slukkede lyset, når det ikke var nødvendigt', 50, 3, 1),
('Jeg brugte lavenergipærer i hele huset', 75, 3, 1),
('Jeg brugte LED-lamper til belysning', 100, 3, 1),
('Jeg slukkede unødvendige elektroniske apparater', 125, 3, 1),
('Jeg valgte energivenlige apparater som køleskabe og vaskemaskiner', 150, 3, 1),
('Jeg brugte en smart termostat for at optimere opvarmningen', 175, 3, 1),
('Jeg installerede solcellepaneler til strømproduktion', 200, 3, 1),
('Jeg har købt energieffektive elapparater', 225, 3, 1),
('Jeg har nedsat mit strømforbrug med 25%', 250, 3, 1);


INSERT INTO checklists (name, score, level, category_id)
VALUES 
('Jeg har gået eller cyklet på ture under 2 km', 50, 3, 2),
('Jeg har brugt offentlig transport til mindst én tur', 75, 3, 2),
('Jeg har reduceret biltransport', 100, 3, 2),
('Jeg har gået eller cyklet på ture under 5 km', 125, 3, 2),
('Jeg har brugt en miljøvenlig ruteplanlægningsapp til at optimere transport', 150, 3, 2),
('Jeg har begrænset bilkørsel til maksimalt én tur om dagen', 175, 3, 2),
('Jeg har undgået motoriseret transport hele dagen', 200, 3, 2),
('Jeg har opfordret et familiemedlem eller en ven til at vælge bæredygtig transport', 225, 3, 2),
('Jeg har fulgt min transport-CO2-besparelse og sat mål', 250, 3, 2);

INSERT INTO checklists (name, score, level, category_id)
VALUES 
('Jeg genbrugte en ting i stedet for at smide den ud', 50, 3, 4),
('Jeg undgik engangsplastik som flasker og kopper', 75, 3, 4),
('Jeg brugte genanvendelige poser til indkøb', 100, 3, 4),
('Jeg reparerede noget i stedet for at købe nyt', 125, 3, 4),
('Jeg købte slet ikke noget den dag', 150, 3, 4),
('Jeg sorterede ting til genbrug eller donation', 175, 3, 4),
('Jeg brugte en DIY-ting i stedet for at købe nyt', 200, 3, 4),
('Jeg købte kun bæredygtige eller genbrugte varer', 225, 3, 4),
('Jeg reducerede mit affald', 250, 3, 4);

INSERT INTO checklists (name, score, level, category_id)
VALUES 
('Jeg spiste ét plantebaseret måltid', 50, 3, 3),
('Jeg brugte rester og undgik madspild', 75, 3, 3),
('Jeg valgte en lokal frugt eller grøntsag', 100, 3, 3),
('Jeg drak kun postevand hele dagen', 125, 3, 3),
('Jeg planlagde måltider for at undgå madspild', 150, 3, 3),
('Jeg undgik færdigpakkede snacks og måltider', 175, 3, 3),
('Jeg spiste kun plantebaseret hele dagen', 200, 3, 3),
('Jeg valgte sæsonbestemte og lokale fødevarer', 225, 3, 3),
('Jeg komposterede alle madrester', 250, 3, 3);


