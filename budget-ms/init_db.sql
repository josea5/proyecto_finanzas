-- Crear db
DROP DATABASE IF EXISTS budgetsdb;
CREATE DATABASE budgetsdb;

USE budgetsdb;

-- Tabla presupuesto
CREATE TABLE Budget (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    LimitAmount INT NOT NULL,
    StartDate DATE NOT NULL,
    EndDate DATE NOT NULL
);

-- Constraint para la fecha
ALTER TABLE Budget ADD CONSTRAINT chk_dates CHECK (EndDate >= StartDate);

-- Tabla relación
CREATE TABLE Budget_Account (
    budgetId BINARY(16) NOT NULL,
    accountId INT NOT NULL,
    PRIMARY KEY (budgetId, accountId)
);

-- Pruebas:

INSERT INTO Budget (id, LimitAmount, StartDate, EndDate)
VALUES
  (UUID_TO_BIN(UUID()), 1000, '2025-01-01', '2025-01-31'),
  (UUID_TO_BIN(UUID()), 5000, '2025-02-01', '2025-06-30'),
  (UUID_TO_BIN(UUID()), 300, '2025-01-15', '2025-03-15'),
  (UUID_TO_BIN(UUID()), 15000, '2025-04-01', '2025-12-31'),
  (UUID_TO_BIN(UUID()), 750, '2025-03-01', '2025-03-31'),
  (UUID_TO_BIN(UUID()), 2000, '2025-05-01', '2025-07-31'),
  (UUID_TO_BIN(UUID()), 1200, '2025-06-15', '2025-09-15'),
  (UUID_TO_BIN(UUID()), 10000, '2025-08-01', '2025-08-31'),
  (UUID_TO_BIN(UUID()), 2500, '2025-09-01', '2025-11-30'),
  (UUID_TO_BIN(UUID()), 500, '2025-10-01', '2025-10-31');



INSERT INTO Budget_Account (budgetId, accountId)
VALUES
  ((SELECT id FROM Budget WHERE LimitAmount = 1000), 1),
  ((SELECT id FROM Budget WHERE LimitAmount = 5000), 2),
  ((SELECT id FROM Budget WHERE LimitAmount = 300), 3),
  ((SELECT id FROM Budget WHERE LimitAmount = 15000), 4),
  ((SELECT id FROM Budget WHERE LimitAmount = 750), 5),
  ((SELECT id FROM Budget WHERE LimitAmount = 2000), 6),
  ((SELECT id FROM Budget WHERE LimitAmount = 1200), 7),
  ((SELECT id FROM Budget WHERE LimitAmount = 10000), 8),
  ((SELECT id FROM Budget WHERE LimitAmount = 2500), 9),
  ((SELECT id FROM Budget WHERE LimitAmount = 500), 10);


