

## Audit Completo Pre-Release: Simulatore del Gioco del Lotto

---

### BUG CRITICO 1: Calcolo vincite ERRATO (engine.ts, riga 91)

La formula di calcolo vincita divide per `C(numeriGiocati, t)` ma i moltiplicatori nella tabella sono GIA divisi per `C(k,t)`. Questo causa vincite drasticamente inferiori al dovuto.

**Esempio concreto**: 3 numeri giocati, 2 indovinati, Ambo €1:
- Codice attuale: `1 * 83.33 * C(2,2) / C(3,2) = 1 * 83.33 * 1 / 3 = €27.78`
- Corretto: `1 * 83.33 * C(2,2) = €83.33`

**Altro esempio**: 4 numeri giocati, 3 indovinati, Ambo €1:
- Codice attuale: `1 * 41.67 * 3 / 6 = €20.83`
- Corretto: `1 * 41.67 * 3 = €125.01` (3 ambi vincenti)

**Fix**: Rimuovere `/ combinazioni(numeriGiocati.length, t)` dalla riga 91 di engine.ts.

---

### BUG 2: Moltiplicatori con arrotondamenti non conformi alla tabella ufficiale

Confronto con la tabella ufficiale (fonte: tuttosuperenalotto.it, lotto-italia.it):

| Sorte | Numeri | Codice | Ufficiale |
|-------|--------|--------|-----------|
| Estratto | 2 | 5.615 | 5.61 |
| Estratto | 3 | 3.743 | 3.74 |
| Estratto | 4 | 2.808 | 2.80 |
| Estratto | 8 | 1.403 | 1.40 |
| Estratto | 10 | 1.123 | 1.12 |
| Ambo | 4 | 41.67 | 41.66 |
| Ambo | 10 | 5.56 | 5.55 |
| Quaterna | 8 | 1714.29 | 1714.28 |
| Quaterna | 10 | 571.43 | 571.42 |
| Cinquina | 7 | 285714.29 | 285714.28 |
| Cinquina | 8 | 107142.86 | 107142.85 |

**Fix**: Aggiornare tutti i valori per corrispondere esattamente alla tabella ufficiale.

---

### BUG 3: Importi giocata non conformi al regolamento vigente

Dal sito ufficiale lotto-italia.it: "La giocata minima e pari a 1€ mentre la massima e pari a 200€, con un incremento progressivo di 0,50€."

Il codice include €0.50 e €0.25 come importi, che non sono conformi. Minimo ufficiale: €1.

**Fix**: Rimuovere 0.50 e 0.25 da `IMPORTI_COMPATTI`, aggiungere importi mancanti (€50, €100, €200), oppure rendere disponibile un input numerico con validazione min 1, max 200, step 0.50.

---

### BUG 4: Numero Oro non implementato

L'interfaccia mostra il toggle "Numero Oro (raddoppia il costo)" ma:
- `calcolaCostoTotale` riceve `_numeroOro` con underscore (ignorato)
- Nessuna logica di calcolo vincita con Numero Oro
- Il Numero Oro reale prevede moltiplicatori specifici per il 5° numero estratto su sorti Ambo/Terno/Quaterna

**Fix**: O implementare correttamente la meccanica (il costo raddoppia e si applicano moltiplicatori aggiuntivi per match con il 5° estratto), oppure rimuovere il toggle e segnalare nel disclaimer che il Numero Oro non e simulato.

---

### BUG 5: Valore Atteso calcolato in modo impreciso (PannelloProbabilita)

```
const valoreAtteso = prob * vincitaPotenziale * numRuote - costoTotale;
```

`prob` somma le probabilita per tutti i match >= t, ma `vincitaPotenziale` e solo il premio per un singolo match minimo. Questo sottostima il valore atteso. Per un calcolo corretto servono i premi pesati per ogni livello di match.

---

### ACCESSIBILITA

1. **`index.html` riga 2**: `lang="en"` deve essere `lang="it"` (contenuto interamente in italiano)
2. **Bottoni ruote senza `aria-label`**: I bottoni circolari in SelettoreRuote non hanno testo accessibile
3. **Missing `<main>` landmark**: Index.tsx usa `<div>` come root, dovrebbe avere `<main>`
4. **NotFound.tsx in inglese**: Pagina 404 con testo inglese ("Page not found")

---

### SEO E META TAG

1. `<meta name="description">` dice "Lovable Generated Project" -- va aggiornato
2. `og:description` e `twitter:description` idem
3. `<meta name="author">` dice "Lovable" -- va aggiornato con il vero autore
4. Manca `<meta name="robots" content="index, follow">`

---

### PRESTAZIONI E OTTIMIZZAZIONE CLOUDFLARE

1. **Google Fonts via CSS `@import`**: render-blocking. Spostare in `<link>` con `preconnect` in index.html
2. **App.css inutilizzato**: Contiene stili del template Vite (`.logo`, `.card`, `.read-the-docs`) mai usati. 1.1KB di CSS morto
3. **`@tanstack/react-query`**: importato in App.tsx con QueryClientProvider ma mai usato in nessun componente. Aggiunge ~13KB gzipped al bundle
4. **Background image**: `wallpaper-bg.jpg` caricato inline via `style`. Considerare lazy loading o ottimizzazione WebP
5. **Cloudflare SPA**: Servira un file `_redirects` o `_headers` per il routing SPA (tutto su /index.html)

---

### SICUREZZA

1. **`localStorage`** per disclaimer: nessun rischio reale (nessun dato sensibile), ma verificare che non ci siano injection via `localStorage.getItem`
2. **Link esterno GitHub**: ha gia `rel="noopener noreferrer"` -- ok
3. **No XSS vectors**: l'app non accetta input utente libero (solo click su numeri predefiniti) -- ok

---

### PULIZIA CODICE

1. **`src/App.css`**: file template Vite completamente inutilizzato, da eliminare
2. **`as any` in PannelloProbabilita.tsx** righe 167-168: TypeScript cast non sicuri per le variabili `k` e `j` come stringhe passate a component che aspetta `number`
3. **Precisione floating-point**: calcoli monetari con float. Per un simulatore educativo e accettabile, ma per massima fedelta considerare arrotondamento a 2 decimali nei risultati

---

### RIEPILOGO AZIONI PER PRIORITA

| Priorita | Azione | File |
|----------|--------|------|
| CRITICA | Fixare formula vincita (rimuovere divisione extra) | engine.ts |
| ALTA | Allineare moltiplicatori alla tabella ufficiale | engine.ts |
| ALTA | Fix importi giocata (minimo €1) | types.ts, SelettoreSorteImporti.tsx |
| ALTA | Decidere se implementare o rimuovere Numero Oro | engine.ts, use-lotto.ts, SelettoreSorteImporti.tsx |
| MEDIA | `lang="it"` + meta tag aggiornati | index.html |
| MEDIA | Aggiungere `<main>` + aria-labels ruote | Index.tsx, SelettoreRuote.tsx |
| MEDIA | Font loading ottimizzato per Cloudflare | index.html, index.css |
| MEDIA | Rimuovere react-query e App.css inutilizzati | App.tsx, App.css, package.json |
| MEDIA | File `_redirects` per Cloudflare SPA routing | public/_redirects |
| BASSA | NotFound in italiano | NotFound.tsx |
| BASSA | Fix TypeScript `as any` | PannelloProbabilita.tsx |
| BASSA | Fixare calcolo valore atteso nel pannello probabilita | PannelloProbabilita.tsx |

