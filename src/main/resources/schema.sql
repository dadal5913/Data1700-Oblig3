CREATE TABLE Bilett (
    ID BIGINT PRIMARY KEY AUTO_INCREMENT,
    Film VARCHAR(255) NOT NULL,
    Antall INT NOT NULL,
    Fornavn VARCHAR(255) NOT NULL,
    Etternavn VARCHAR(255) NOT NULL,
    Telefonnr VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL
);