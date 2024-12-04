# Tree-app-Backend

- Opret Database:
Først skal du oprette en database i MySQL:
 CREATE DATABASE tree_app_db;
 USE tree_app_db;
- Opret checklists Tabel:
  CREATE TABLE checklists (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    score INT NOT NULL,
    category VARCHAR(50) NOT NULL,
    level INT NOT NULL
);
  - Indsæt Data i checklists Tabel
   INSERT INTO checklists (name, score, category, level) VALUES
('Sluk for lys', 100, 'eluse', 1),
('Skift til LED-pærer', 200, 'eluse', 1),
('Vask i kold vand', 75, 'eluse', 1),
('Tør tøj naturligt', 50, 'eluse', 1),
('Brug energivenlige stik til apparater', 25, 'eluse', 1),
('Brug energibesparende apparater', 50, 'eluse', 1),
('Brug mindre varme', -100, 'eluse', 1),
('Brug offentlig transport', 100, 'transport', 1),
('Cykel i stedet for at køre', 200, 'transport', 1),
('Gå i stedet for at køre', 150, 'transport', 1),
('Del bil med andre', 75, 'transport', 1),
('Brug elbil', 50, 'transport', 1),
('Reducér flyrejser', 100, 'transport', 1),
('Brug samkørsel', 50, 'transport', 1),
('Køb lokale råvarer', 100, 'foodwaste', 1),
('Spis vegetarisk', 200, 'foodwaste', 1),
('Undgå madspild', 150, 'foodwaste', 1),
('Køb økologiske produkter', 75, 'foodwaste', 1),
('Lav hjemmelavet mad frem for færdigretter', 50, 'foodwaste', 1),
('Brug genanvendelige emballager', 100, 'foodwaste', 1),
('Drik vand fra hanen i stedet for flaskevand', 50, 'foodwaste', 1),
('Reducer kødindtag', 150, 'foodwaste', 1),
('Sortér affald', 100, 'usedthing', 1),
('Brug genanvendelige poser', 200, 'usedthing', 1),
('Køb genbrugte varer', 150, 'usedthing', 1),
('Kompostér organisk affald', 75, 'usedthing', 1),
('Brug genanvendelige flasker', 50, 'usedthing', 1),
('Reparer i stedet for at smide ud', 100, 'usedthing', 1),
('Deltag i lokale genbrugsinitiativer', 50, 'usedthing', 1),
('Installer solceller', 250, 'eluse', 2),
('Isolér dit hjem bedre', 200, 'eluse', 2),
('Skift til energiklasse A-apparater', 150, 'eluse', 2),
('Planlæg din transport for at reducere ture', 125, 'transport', 2),
('Deltag i byens cykelkampagner', 175, 'transport', 2),
('Rejs med nattog i stedet for fly', 200, 'transport', 2),
('Spis lokale sæsonvarer', 125, 'foodwaste', 2),
('Dyrk dine egne grøntsager', 200, 'foodwaste', 2),
('Arranger en fælles madspildsdag', 150, 'foodwaste', 2),
('Del eller lej ting i stedet for at købe nyt', 150, 'usedthing', 2),
('Start en byttecentral i dit område', 200, 'usedthing', 2),
('Arranger en reparationscafé', 175, 'usedthing', 2),
('Overvej passivhus-teknologi', 300, 'eluse', 3),
('Investér i en varmepumpe', 275, 'eluse', 3),
('Bliv energiproducent med vindmølleandel', 250, 'eluse', 3),
('Skift helt til cykel som hovedtransportmiddel', 300, 'transport', 3),
('Brug kollektiv samkørsel til daglige ture', 200, 'transport', 3),
('Gør en årlig flyrejse CO2-neutral', 150, 'transport', 3),
('Start en lokal økologisk madklub', 225, 'foodwaste', 3),
('Undervis andre i madspildsreduktion', 275, 'foodwaste', 3),
('Arranger fælleshaver', 250, 'foodwaste', 3),
('Løbende genopfind gamle ting til nye formål', 275, 'usedthing', 3),
('Samarbejd med lokale butikker om genbrug', 250, 'usedthing', 3),
('Start en cirkulær økonomi-klub', 300, 'usedthing', 3),
('Optimer energiforbrug med smart-teknologi', 175, 'eluse', 2),
('Del din bil på pendlerplatforme', 150, 'transport', 2),
('Lav ugemenu for at undgå madspild', 100, 'foodwaste', 2),
('Køb renoverede elektronikprodukter', 125, 'usedthing', 2);
- Opret users Tabel
  CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    level INT NOT NULL,
    points INT NOT NULL
);
 
  

