

## Piano: Modal Disclaimer Legale in Apertura

### Ricerca normativa completata

Dalla ricerca emerge che il progetto e lecito perche:

1. **Art. 718 c.p.** -- punisce chi "tiene un giuoco d'azzardo" in luogo pubblico. Un simulatore senza denaro reale non configura gioco d'azzardo.
2. **D.Lgs. 231/2007 (Antiriciclaggio)** e **D.L. 158/2012 (Decreto Balduzzi)** -- regolano pubblicita e promozione del gioco d'azzardo, non software educativi senza transazioni.
3. **Licenza ADM** -- richiesta solo per operatori che raccolgono giocate con denaro reale. Un simulatore didattico ne e esente.
4. **Art. 21 Costituzione** -- liberta di espressione e ricerca scientifica/didattica.
5. **GDPR / nessun dato raccolto** -- nessun trattamento dati personali.

### Cosa verra implementato

Un nuovo componente `DisclaimerModal` che:
- Si apre automaticamente al primo accesso (salva accettazione in `localStorage`)
- Non si puo chiudere cliccando fuori (richiede azione esplicita)
- Contiene il testo disclaimer completo con riferimenti normativi
- Ha un pulsante "Ho letto e compreso" per accettare

### Contenuto del disclaimer

Il testo coprira 4 aree:
1. **Finalita educativa** -- studio della probabilita e statistica, nessun denaro reale
2. **Assenza di intento ludopatico/pubblicitario** -- nessuna promozione del gioco d'azzardo
3. **Limitazioni del software** -- generato con AI, i calcoli potrebbero non essere fedeli alla realta
4. **Riferimenti normativi** -- Art. 718 c.p., D.L. 158/2012, assenza obbligo licenza ADM, disclaimer marchi

### File coinvolti

| File | Modifica |
|------|----------|
| `src/components/lotto/DisclaimerModal.tsx` | Nuovo componente modal |
| `src/pages/Index.tsx` | Importa e renderizza il modal |

### Dettagli tecnici
- Usa `Dialog` di Radix (gia presente) con `onOpenChange` controllato
- `localStorage.getItem('lotto-disclaimer-accepted')` per persistenza
- `onInteractOutside={(e) => e.preventDefault()}` per impedire chiusura accidentale
- Nessuna dipendenza aggiuntiva

