-- Dati iniziali: borse attualmente mostrate sul sito (associate alle card in index.html)

INSERT INTO borse (
  nome,
  slug,
  prezzo,
  prezzo_scontato,
  in_saldo,
  nuova,
  path_foto,
  in_evidenza,
  ordinamento
) VALUES
-- In evidenza (sezione "Borse in evidenza")
('Borsa rosa premium', 'borsa-rosa-premium', 99.00, NULL, TRUE, TRUE, 'images/borse/borsa-rosa-premium.jpg', TRUE, 1),
('Borsa dorata', 'borsa-dorata', 69.00, 50.00, TRUE, TRUE, 'images/borse/borsa-dorata.jpg', TRUE, 2),

-- Altre borse (sezione "Altre borse")
('Borsa rossa classica', 'borsa-rossa-classica', 37.00, 25.00, TRUE, TRUE, 'images/borse/borsa-rossa-classica.jpg', FALSE, 10),
('Borsa nera elegante', 'borsa-nera-elegante', 29.00, 15.00, TRUE, TRUE, 'images/borse/borsa-nera-elegante.jpg', FALSE, 20),
('Borsa bianca e nera', 'borsa-bianca-e-nera', 19.00, NULL, TRUE, TRUE, 'images/borse/borsa-bianca-e-nera.jpg', FALSE, 30),
('Borsa invernale', 'borsa-invernale', 25.00, NULL, TRUE, TRUE, 'images/borse/borsa-invernale.jpg', FALSE, 40),
('Borsa beige naturale', 'borsa-beige-naturale', 46.00, NULL, TRUE, TRUE, 'images/borse/borsa-beige-naturale.jpg', FALSE, 50),
('Borsa a tracolla', 'borsa-a-tracolla', 34.00, NULL, TRUE, TRUE, 'images/borse/borsa-a-tracolla.jpg', FALSE, 60),
('Borsa marrone caffè', 'borsa-marrone-caffe', 25.00, NULL, TRUE, TRUE, 'images/borse/borsa-marrone-caffe.jpg', FALSE, 70),
('Borsa estate', 'borsa-estate', 29.00, NULL, TRUE, TRUE, 'images/borse/borsa-estate.jpg', FALSE, 80);
