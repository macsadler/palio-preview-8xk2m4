/* ilpalio.org PoC demo — client-side search */
(function () {
  'use strict';

  function base() {
    // assets/app.js -> site root is one level up, except on corse/ pages (two up)
    var p = location.pathname;
    return p.indexOf('/corse/') !== -1 ? '../' : '';
  }

  function esc(s) {
    return s.replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function norm(s) {
    return s.toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g, ''); // accent-insensitive
  }

  function snippet(text, terms) {
    var low = norm(text);
    var pos = -1;
    for (var i = 0; i < terms.length; i++) {
      var p = low.indexOf(terms[i]);
      if (p !== -1 && (pos === -1 || p < pos)) pos = p;
    }
    if (pos === -1) pos = 0;
    var start = Math.max(0, pos - 90);
    var end = Math.min(text.length, pos + 220);
    var out = (start > 0 ? '…' : '') + text.slice(start, end) + (end < text.length ? '…' : '');
    terms.forEach(function (t) {
      out = out.replace(new RegExp('(' + t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') + ')', 'gi'), '<mark>$1</mark>');
    });
    return out;
  }

  function runSearch(q, resultsEl, inputEl) {
    q = (q || '').trim();
    if (inputEl && !inputEl.value) inputEl.value = q;
    if (q.length < 2) {
      resultsEl.innerHTML = '<p class="muted">Digita almeno due caratteri.</p>';
      return;
    }
    var terms = norm(q).split(/\s+/);
    fetch(base() + 'assets/search-index.json')
      .then(function (r) { return r.json(); })
      .then(function (idx) {
        var hits = [];
        idx.forEach(function (doc) {
          var hay = norm(doc.title + ' ' + doc.text);
          var score = 0, ok = true;
          terms.forEach(function (t) {
            var ti = hay.indexOf(t);
            if (ti === -1) { ok = false; }
            else {
              score += (norm(doc.title).indexOf(t) !== -1 ? 5 : 1);
              score += Math.max(0, 3 - ti / 2000);
            }
          });
          if (ok) hits.push({ doc: doc, score: score });
        });
        hits.sort(function (a, b) { return b.score - a.score; });
        if (!hits.length) {
          resultsEl.innerHTML = '<p class="muted">Nessun risultato per <strong>' + esc(q) + '</strong> in questo demo.</p>';
          return;
        }
        var html = '<p class="muted">' + hits.length + ' risultat' +
          (hits.length === 1 ? 'o' : 'i') + ' per <strong>' + esc(q) + '</strong></p>';
        hits.slice(0, 30).forEach(function (h) {
          html += '<div class="result"><h3><a href="' + base() + h.doc.url + '">' +
            esc(h.doc.title) + '</a></h3><p>' + snippet(h.doc.text, terms) + '</p></div>';
        });
        resultsEl.innerHTML = html;
      })
      .catch(function () {
        resultsEl.innerHTML = '<p class="muted">Indice di ricerca non disponibile (apri il demo da un server locale o da file con fetch abilitato).</p>';
      });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var params = new URLSearchParams(location.search);
    var q = params.get('q');
    var resultsEl = document.getElementById('results');
    var inputEl = document.getElementById('q');
    if (resultsEl && q) runSearch(q, resultsEl, inputEl);
  });
})();
