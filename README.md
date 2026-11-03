# Il Palio di Siena — prototipo dimostrativo (demo)

Prototipo moderno e statico dell'archivio **ilpalio.org** di Orlando Papei,
costruito con la sua autorizzazione a scopo esclusivamente dimostrativo.
Non è l'archivio ufficiale: quello completo (oltre 25.000 pagine) è su
https://www.ilpalio.org/.

## Contenuto del demo (13 pagine di contenuto)

- Home, Albo delle corse, Ricerca
- 6 schede di corsa: 15 ago 1633 (Tartuca), 2 lug 1709 (Onda),
  3 lug 1806 (Valdimontone), 16 ago 1906 (Aquila),
  3 lug 2025 (Oca), 18 ago 2026 (Nicchio)
- Cos'è il Palio · English index · Le Contrade (hub)
- Le rivalità · Stemmi e colori · Titoli onorifici

Ogni pagina riporta l'attribuzione a Orlando Papei e il link al sito ufficiale.

## Come vederlo

Serve un piccolo server locale (il file `cerca.html` carica l'indice di
ricerca via `fetch`, che non funziona da `file://` in tutti i browser):

```sh
cd demo
python3 -m http.server 8000
# poi apri http://localhost:8000/
```

## Cosa dimostra

- Layout responsive, leggibile sul telefono (l'originale non lo è)
- Ricerca istantanea full-text su tutte le pagine del demo
- Pagine leggere e veloci (tutto il demo: ~480 KB)
- Contenuti fedeli all'originale, in italiano

## Nota tecnica

Contenuti estratti da 13 pagine pubbliche di ilpalio.org (nov 2026).
Le 6 icone delle Contrade sono gli originali `mini*.gif` del sito.
Nessun hotlink: tutte le risorse sono locali.
