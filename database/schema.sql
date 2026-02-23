-- Paoletta Store - Tabella borse
-- Ogni riga corrisponde a una borsa mostrata sul sito.

CREATE TABLE borse (
  id              INT AUTO_INCREMENT PRIMARY KEY,
  nome            VARCHAR(255) NOT NULL,
  slug            VARCHAR(255) NOT NULL UNIQUE COMMENT 'Per URL e path risorse',
  prezzo          DECIMAL(10, 2) NOT NULL,
  prezzo_scontato DECIMAL(10, 2) NULL COMMENT 'NULL se non è scontata',
  in_saldo        BOOLEAN NOT NULL DEFAULT FALSE,
  nuova           BOOLEAN NOT NULL DEFAULT FALSE,
  path_foto       VARCHAR(500) NOT NULL,
  in_evidenza     BOOLEAN NOT NULL DEFAULT FALSE,
  descrizione     TEXT NULL,
  ordinamento     INT NOT NULL DEFAULT 0 COMMENT 'Ordine di visualizzazione (min = prima)',
  attiva          BOOLEAN NOT NULL DEFAULT TRUE COMMENT 'Se FALSE non viene mostrata sul sito',
  created_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at      DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,

  INDEX idx_evidenza (in_evidenza),
  INDEX idx_attiva_ordinamento (attiva, ordinamento),
  INDEX idx_saldo (in_saldo),
  INDEX idx_nuova (nuova)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
