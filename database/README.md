# Database Paoletta Store

## Tabella `borse`

Ogni borsa mostrata sul sito è una riga in questa tabella.

| Colonna           | Tipo           | Descrizione |
|-------------------|----------------|-------------|
| **id**            | INT (PK)       | Chiave primaria auto-incrementale |
| **nome**          | VARCHAR(255)   | Nome della borsa |
| **slug**          | VARCHAR(255)   | Identificativo per URL e path (es. `borsa-rosa-premium`) |
| **prezzo**        | DECIMAL(10,2)  | Prezzo di listino (€) |
| **prezzo_scontato** | DECIMAL(10,2) | Prezzo scontato (€). **NULL** se non è in saldo |
| **in_saldo**      | BOOLEAN        | Se la borsa è in promozione / saldo |
| **nuova**         | BOOLEAN        | Se mostrare il badge "Nuova" |
| **path_foto**     | VARCHAR(500)   | Path dell’immagine (es. `images/borse/borsa-rosa-premium.jpg`) |
| **in_evidenza**   | BOOLEAN        | Se mostrarla nella sezione "Borse in evidenza" |
| **descrizione**   | TEXT           | Descrizione (opzionale) |
| **ordinamento**   | INT            | Ordine di visualizzazione (minore = prima) |
| **attiva**        | BOOLEAN        | Se `FALSE` non viene mostrata sul sito |
| **created_at**    | DATETIME       | Data/ora di creazione |
| **updated_at**    | DATETIME       | Data/ora ultimo aggiornamento |

## Utilizzo

1. Creare la tabella:
   ```bash
   mysql -u utente -p nome_database < database/schema.sql
   ```

2. Inserire le borse (dati iniziali dal sito):
   ```bash
   mysql -u utente -p nome_database < database/seed_borse.sql
   ```

I path delle foto in `path_foto` sono relativi alla root del sito; creare la cartella `images/borse/` e inserire le immagini con i nomi indicati nello seed.

---

## Foglio di calcolo (CSV) per il sito statico

Il sito legge l’elenco delle borse dal file **`database/borse.csv`**, così puoi modificare nomi, prezzi, saldi e foto senza toccare l’HTML.

- **Colonne**: come nello schema (`nome`, `slug`, `prezzo`, `prezzo_scontato`, `in_saldo`, `nuova`, `path_foto`, `in_evidenza`, `descrizione`, `ordinamento`, `attiva`).
- **Booleani**: usa `1` / `0` oppure `true` / `false` (o `sì`/`no`, `vero`/`falso`).
- **path_foto**: path relativo alla root del sito (es. `assets/photos/nomefile.jpg`). Se lasci vuoto, viene usata una foto da `assets/photos/` in ciclo.
- Dopo aver modificato il CSV (anche da Excel o Google Sheets, esportando in CSV), **salva il file e aggiorna la pagina** nel browser: la sezione borse si aggiorna da sola.

Per aprire il sito in locale usare un server (es. `python3 -m http.server 8000` o l’estensione “Live Server” in VS Code), altrimenti il caricamento del CSV può essere bloccato da CORS.
