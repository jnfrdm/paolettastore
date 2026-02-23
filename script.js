// Paoletta Store - interazioni e caricamento borse da foglio di calcolo (CSV)

(function () {
  // Foto disponibili in assets/photos (usate in ciclo se path_foto nel CSV è vuoto)
  var FOTO_BORSE = [
    'assets/photos/20260218_224500.jpg',
    'assets/photos/20260218_224553.jpg',
    'assets/photos/20260218_224618.jpg',
    'assets/photos/20260218_224707.jpg',
    'assets/photos/20260218_224836.jpg',
    'assets/photos/20260218_224941.jpg',
    'assets/photos/20260218_225013.jpg',
    'assets/photos/20260218_225452.jpg',
    'assets/photos/20260218_225545.jpg',
    'assets/photos/20260218_225612.jpg',
    'assets/photos/20260218_225648.jpg',
    'assets/photos/20260218_225728.jpg'
  ];

  function parseBool(val) {
    if (val === undefined || val === null) return false;
    var v = String(val).trim().toLowerCase();
    return v === '1' || v === 'true' || v === 'sì' || v === 'si' || v === 'vero' || v === 'yes';
  }

  function formatPrezzo(num) {
    if (num === undefined || num === null || isNaN(parseFloat(num))) return '';
    var n = parseFloat(num);
    return n.toFixed(2).replace('.', ',') + ' €';
  }

  function parseCsv(text) {
    var lines = text.trim().split(/\r?\n/);
    if (lines.length < 2) return [];
    var headers = lines[0].split(',').map(function (h) { return h.trim(); });
    var rows = [];
    for (var i = 1; i < lines.length; i++) {
      var cells = lines[i].split(',');
      var row = {};
      headers.forEach(function (key, idx) {
        var val = cells[idx] !== undefined ? cells[idx].trim() : '';
        row[key] = val;
      });
      rows.push(row);
    }
    return rows;
  }

  function rowToBorsa(row, photoIndex) {
    var pathFoto = (row.path_foto || '').trim();
    if (!pathFoto) pathFoto = FOTO_BORSE[photoIndex % FOTO_BORSE.length];
    return {
      id: row.id,
      nome: row.nome || '',
      slug: row.slug || '',
      prezzo: parseFloat(row.prezzo) || 0,
      prezzo_scontato: row.prezzo_scontato && row.prezzo_scontato.trim() ? parseFloat(row.prezzo_scontato) : null,
      in_saldo: parseBool(row.in_saldo),
      nuova: parseBool(row.nuova),
      path_foto: pathFoto,
      in_evidenza: parseBool(row.in_evidenza),
      descrizione: row.descrizione || '',
      ordinamento: parseInt(row.ordinamento, 10) || 0,
      attiva: row.attiva === undefined || row.attiva === '' ? true : parseBool(row.attiva)
    };
  }

  function buildCard(borsa, isFeatured) {
    var link = '#';
    if (borsa.slug) link = '#' + borsa.slug;
    var saleBadge = borsa.in_saldo ? '<span class="badge sale">In saldo</span>' : '';
    var newBadge = borsa.nuova ? '<span class="badge new">Nuova</span>' : '';
    var oldPrice = '';
    if (borsa.prezzo_scontato != null && borsa.prezzo_scontato > 0) {
      oldPrice = '<span class="old">' + formatPrezzo(borsa.prezzo_scontato) + '</span>';
    }
    var currentPrice = '<span class="current">' + formatPrezzo(borsa.prezzo) + '</span>';
    var cardClass = 'product-card';
    if (isFeatured) cardClass += ' featured-card';
    return (
      '<article class="' + cardClass + '">' +
        '<a href="' + link + '" class="product-image-wrap">' +
          '<img class="product-img" src="' + borsa.path_foto + '" alt="' + (borsa.nome || 'Borsa').replace(/"/g, '&quot;') + '">' +
          saleBadge + newBadge +
        '</a>' +
        '<div class="product-info">' +
          '<a href="' + link + '" class="product-title">' + (borsa.nome || 'Borsa').replace(/</g, '&lt;').replace(/>/g, '&gt;') + '</a>' +
          '<div class="product-price">' + oldPrice + currentPrice + '</div>' +
          '<a href="' + link + '" class="link-arrow">Vedi borsa</a>' +
        '</div>' +
      '</article>'
    );
  }

  var lastCsvHash = '';

  function loadBorse() {
    var csvUrl = 'database/borse.csv?v=' + Date.now();
    var featuredEl = document.getElementById('borse-in-evidenza');
    var altreEl = document.getElementById('altre-borse');
    if (!featuredEl || !altreEl) return;

    fetch(csvUrl)
      .then(function (res) {
        if (!res.ok) throw new Error('Impossibile caricare ' + csvUrl + ' (HTTP ' + res.status + ')');
        return res.text();
      })
      .then(function (text) {
        var hash = text.length + '-' + (text.split('\n').length);
        if (lastCsvHash === hash) return;
        lastCsvHash = hash;

        var rows = parseCsv(text);
        var photoIndex = 0;
        var borse = rows
          .map(function (row) { return rowToBorsa(row, photoIndex++); })
          .filter(function (b) { return b.attiva && b.nome; })
          .sort(function (a, b) { return (a.ordinamento || 0) - (b.ordinamento || 0); });

        var inEvidenza = borse.filter(function (b) { return b.in_evidenza; });
        var altre = borse.filter(function (b) { return !b.in_evidenza; });

        featuredEl.innerHTML = inEvidenza.map(function (b) { return buildCard(b, true); }).join('');
        altreEl.innerHTML = altre.map(function (b) { return buildCard(b, false); }).join('');
      })
      .catch(function (err) {
        featuredEl.innerHTML = '<p class="products-error">Impossibile caricare l’elenco borse. Controlla che il file <code>database/borse.csv</code> esista e aggiorna la pagina.</p>';
        altreEl.innerHTML = '';
        console.error('Paoletta Store – caricamento borse:', err);
      });
  }

  document.addEventListener('DOMContentLoaded', function () {
    loadBorse();

    // Form newsletter
    var form = document.querySelector('.newsletter-form');
    if (form) {
      var successNote = form.parentElement.querySelector('.form-note:not(.error)');
      var errorNote = form.parentElement.querySelector('.form-note.error');

      form.addEventListener('submit', function (e) {
        e.preventDefault();
        var email = form.querySelector('input[type="email"]').value;
        if (!email) return;

        if (successNote) successNote.classList.remove('hidden');
        if (errorNote) errorNote.classList.add('hidden');
        form.reset();
      });
    }

    // Pulsante carrello (placeholder)
    document.querySelectorAll('.cart-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        alert('Il tuo carrello è vuoto.\n\nAggiungi una borsa dalla sezione prodotti per iniziare gli acquisti.');
      });
    });
  });
})();
