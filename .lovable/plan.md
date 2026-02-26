

## Piano: Sorti Multiple con Importi Indipendenti + Numero Oro

### Situazione attuale
- Si può selezionare **un solo tipo di sorte** con un singolo importo globale
- Nella schedina reale (come nell'immagine), ogni sorte (Estratto, Ambo, Terno, Quaterna, Cinquina) ha la propria riga con il proprio importo indipendente
- Il Numero Oro (5° numero estratto su ogni ruota) non è implementato

### Regole ufficiali ricavate dai siti ufficiali

**Sorti multiple**: Il giocatore può puntare contemporaneamente su più sorti, ciascuna con un importo diverso. Il costo totale = somma degli importi di ogni sorte × numero di ruote.

**Moltiplicatori** (già corretti nel codice):
| Numeri | Estratto | Ambo | Terno | Quaterna | Cinquina |
|--------|----------|------|-------|----------|----------|
| 1 | 11.23 | — | — | — | — |
| 2 | 5.61 | 250 | — | — | — |
| 3 | 3.74 | 83.33 | 4500 | — | — |
| 5 | 2.24 | 25 | 450 | 24000 | 6000000 |

**Numero Oro**: Corrisponde al 5° numero estratto su ciascuna ruota. Disponibile solo con Ambo, Terno e Quaterna. Costa quanto la giocata stessa (raddoppia il costo). Premi con moltiplicatori diversi.

### Modifiche pianificate

#### 1. Aggiornare i tipi (`src/lib/lotto/types.ts`)
- Cambiare `Giocata` per avere un record `importi: Partial<Record<TipoGiocata, number>>` invece di singolo `tipo` + `importo`
- Aggiungere flag `numeroOro: boolean`
- Aggiungere tipo `RisultatoNumeroOro`

#### 2. Aggiornare l'engine (`src/lib/lotto/engine.ts`)
- Modificare `calcolaRisultato` per iterare su tutte le sorti attive con i rispettivi importi
- Aggiungere logica Numero Oro: il 5° estratto di ogni ruota è il "numero oro", vincite calcolate separatamente
- Aggiungere moltiplicatori Numero Oro (Ambo con Oro, Terno con Oro, Quaterna con Oro, Solo Oro)

#### 3. Nuovo componente Selettore Importi per Sorte (`src/components/lotto/SelettoreSorteImporti.tsx`)
- Griglia simile alla schedina reale: righe = sorti, colonne = importi (200, 100, 50, 20, 10, 5, 3, 2, 1, 0.50, 0.25)
- Header "IMPORTO DI GIOCATA" con colonne importi
- Ogni riga ha il nome della sorte a sinistra e caselle selezionabili per importo
- Sorti non selezionabili (grigio) se numeri selezionati < minimo
- Toggle Numero Oro sotto le sorti (attivo solo se almeno una tra Ambo/Terno/Quaterna è selezionata)

#### 4. Aggiornare il hook `useLotto` (`src/hooks/use-lotto.ts`)
- Sostituire `tipoGiocata` + `importo` con `importiPerSorte: Partial<Record<TipoGiocata, number>>`
- Aggiungere stato `numeroOro: boolean`
- Calcolo costo: somma degli importi per ogni sorte attiva × ruote (×2 se Numero Oro attivo)
- Aggiornare `gioca()` per passare tutte le sorti attive al calcolo risultato

#### 5. Aggiornare la pagina Index (`src/pages/Index.tsx`)
- Rimuovere componenti `SelettoreTipo` e `SelettoreImporto` separati
- Inserire il nuovo `SelettoreSorteImporti` unificato
- Aggiornare il riepilogo costo con breakdown per sorte

#### 6. Aggiornare PannelloProbabilita e StoricoGiocate
- Mostrare probabilità e vincite potenziali per ogni sorte attiva
- Storico mostra le sorti giocate per ogni giocata

#### 7. Aggiornare RegoleLottoModal
- Aggiungere sezione Numero Oro con spiegazione regole e premi

### Dettagli tecnici

**Struttura dati rivista:**
```text
Giocata {
  numeri: number[]
  ruote: Ruota[]
  importiPerSorte: { Estratto?: 1, Ambo?: 5, ... }
  numeroOro: boolean
}

RisultatoGiocata {
  giocata: Giocata
  estrazione: RisultatoEstrazione
  vincitePerSorte: { sorte, ruota, numeriIndovinati, importoVinto }[]
  vinciteNumeroOro: { ruota, numeroOro, vinto, importo }[]
  totaleVinto: number
  timestamp: Date
}
```

**Layout schedina sorti (simile all'immagine reale):**
```text
┌─ IMPORTO DI GIOCATA ─────────────────────┐
│        €  20  10  5  3  2  1  0.50  0.25  │
│ ESTRATTO  [ ] [ ] [x] [ ] [ ] ...         │
│ AMBO      [ ] [ ] [ ] [ ] [x] ...         │
│ TERNO     [ ] [ ] [ ] [ ] [ ] ...         │
│ QUATERNA  [ ] [ ] [ ] [ ] [ ] ...  (grey)  │
│ CINQUINA  [ ] [ ] [ ] [ ] [ ] ...  (grey)  │
├───────────────────────────────────────────┤
│ ☑ NUMERO ORO (raddoppia il costo)        │
└───────────────────────────────────────────┘
```

