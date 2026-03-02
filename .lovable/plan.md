

# Piano di Miglioramento Completo

L'applicazione attuale e' gia' solida come simulatore educativo. Ecco un piano organizzato per le 4 aree richieste, in ordine di priorita'.

---

## 1. Grafici e Visualizzazioni (recharts gia' installato)

**Grafico andamento bilancio**: Un line chart che mostra l'evoluzione di speso vs vinto nel tempo, usando lo storico delle giocate. Dimostra visivamente la legge dei grandi numeri (il bilancio converge verso il negativo).

**Grafico frequenza numeri estratti**: Un bar chart che mostra i 90 numeri e quante volte sono usciti nello storico, evidenziando che tendono all'uniformita' con molte giocate.

**Dove**: Nuovo componente `GraficiStatistiche.tsx` inserito nella colonna destra, sotto lo storico. Lazy loaded.

---

## 2. Contenuti Didattici

**Sezione "La Matematica del Lotto"**: Un nuovo pannello collassabile con:
- **Legge dei Grandi Numeri**: spiegazione con collegamento diretto al grafico del bilancio
- **Paradosso del Giocatore**: perche' i numeri "ritardatari" non hanno piu' probabilita' di uscire
- **Vantaggio del banco**: dimostrazione con i moltiplicatori reali vs quote eque

**Dove**: Nuovo componente `SezioneDidattica.tsx`, nella colonna destra sotto i grafici. Lazy loaded.

---

## 3. UI/UX e Mobile

**Dark mode**: Aggiungere le variabili CSS per il tema scuro in `index.css` e un toggle nel header usando `next-themes` (gia' installato).

**Responsive migliorato**: Ottimizzare la griglia numeri su schermi piccoli (< 375px) con bottoni piu' grandi e touch-friendly. Rendere la tabella estrazione scrollabile orizzontalmente con indicatori visivi.

**Animazioni migliorate**: Aggiungere un'animazione sequenziale ai numeri estratti nella tabella (appaiono uno alla volta), rendendo il momento dell'estrazione piu' coinvolgente.

---

## 4. Nuove Funzionalita' di Gioco

**Simulazione rapida (×100, ×1000)**: Un pulsante accanto a "GIOCA!" che esegue N estrazioni istantaneamente e aggiorna le statistiche. Perfetto per dimostrare la legge dei grandi numeri.

**Giocate sistematiche**: Opzione per giocare tutte le combinazioni possibili dei numeri selezionati (es. 5 numeri = 10 ambi). Mostra il costo reale di una sistematica.

---

## File coinvolti

| File | Azione |
|------|--------|
| `src/components/lotto/GraficiStatistiche.tsx` | Nuovo - grafici recharts |
| `src/components/lotto/SezioneDidattica.tsx` | Nuovo - contenuti educativi |
| `src/components/lotto/DarkModeToggle.tsx` | Nuovo - toggle tema |
| `src/index.css` | Modifica - variabili dark mode |
| `src/pages/Index.tsx` | Modifica - integrazione nuovi componenti, pulsante simulazione rapida |
| `src/hooks/use-lotto.ts` | Modifica - logica simulazione multipla, tracking frequenze |
| `src/lib/lotto/types.ts` | Modifica - tipo per frequenze numeri |

Consiglio di procedere per fasi, partendo dai grafici e dalla simulazione rapida che sono i miglioramenti a maggior impatto educativo.

