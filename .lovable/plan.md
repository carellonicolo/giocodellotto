

## Piano di Modernizzazione Stile -- Gioco del Lotto

### Vincoli da rispettare (lezioni apprese)
- Mantenere `aria-label` su tutti i bottoni ruote (fix accessibilita precedente)
- Mantenere `<main>` come tag radice (fix landmark)
- Mantenere link GitHub "Sorgente" nell'header estrazione
- Mantenere footer disclaimer con 3 paragrafi separati
- Font DM Sans confermato, palette lotto-orange/salmon/green/red/gold confermata
- Layout schedina 400px + colonna destra invariato

### Modifiche proposte

#### 1. Effetto "carta da gioco" sulla schedina
- Aggiungere `backdrop-filter: blur` e `box-shadow` piu pronunciata per dare profondita
- Bordo sottile interno con `ring-1 ring-white/20` per effetto rilievo cartaceo
- Angoli leggermente piu arrotondati (`rounded-xl` invece di `rounded-lg`)

#### 2. Header schedina migliorato
- Gradient piu ricco con 3 stop (arancione scuro -> arancione -> arancione chiaro)
- Sottile ombra interna (`shadow-inner`) per dare profondita al banner logo

#### 3. Griglia numeri: bolle piu definite
- Aggiungere `shadow-sm` alle bolle non selezionate per effetto rilievo
- Transizione `scale` piu morbida con `duration-150`
- Stato selezionato: aggiungere `ring-2 ring-white/50` per effetto glow
- Stato matched (indovinato): aggiungere animazione `pulse` sottile

#### 4. Tabella estrazione modernizzata
- Header con gradient anziche colore piatto
- Righe con hover sottile (`hover:bg-lotto-peach/30`)
- Numeri estratti con font `tabular-nums` e `tracking-wide`
- Numeri indovinati: animazione `ring` pulsante dorata

#### 5. Pannelli laterali (Probabilita, Statistiche)
- Headers con gradient sottile anziche colore piatto
- Card interne con `backdrop-blur-sm` e bordi `border-white/20`
- Sezioni collapsible: freccia con transizione piu fluida
- Stat boxes: aggiungere icone piccole (TrendingUp, Target, etc.)

#### 6. Pulsante GIOCA migliorato
- Gradient animato (hover shift)
- `shadow-lg` + `hover:shadow-xl` per effetto "premibile"
- `active:scale-[0.98]` per feedback tattile

#### 7. Sezione "Importo per Sorte" piu leggibile
- Celle griglia con `rounded-sm` e separazione visiva piu chiara
- Riga attiva evidenziata con bordo sinistro colorato
- Checkbox "Numero Oro" con icona stella anziche semplice check

#### 8. Footer disclaimer card-based
- Sostituire i 3 paragrafi con 3 card affiancate (gia implementato parzialmente, verificare stato attuale e migliorare con `backdrop-blur`, icone `ShieldAlert`, `Landmark`, `Bot`)

#### 9. CSS globale
- Aggiungere variabili per `--glass-bg` e `--glass-border` (effetto vetro)
- Keyframe `@keyframes glow-pulse` per numeri indovinati
- Keyframe `@keyframes gradient-shift` per pulsante GIOCA
- Classe `.glass-panel` riutilizzabile per pannelli laterali

### File coinvolti
| File | Tipo modifica |
|------|--------------|
| `src/index.css` | Nuove classi CSS, keyframes, variabili glass |
| `src/pages/Index.tsx` | Footer card, pulsante GIOCA, layout tweaks |
| `src/components/lotto/GrigliaNumeri.tsx` | Stile bolle, shadow, animazioni |
| `src/components/lotto/TabellaEstrazione.tsx` | Header gradient, hover righe, glow numeri |
| `src/components/lotto/PannelloProbabilita.tsx` | Header gradient, glass panels |
| `src/components/lotto/StoricoGiocate.tsx` | Header gradient, stat boxes con icone |
| `src/components/lotto/SelettoreSorteImporti.tsx` | Celle arrotondate, riga attiva, icona oro |
| `src/components/lotto/SelettoreRuote.tsx` | Stile pallini (mantenendo aria-label) |

### Dettagli tecnici
- Nessuna dipendenza aggiuntiva (tutto Tailwind + CSS custom)
- Le animazioni usano `@media (prefers-reduced-motion)` per accessibilita
- Contrasti WCAG AA mantenuti (palette scurita gia validata)
- Nessun cambiamento alla logica/hook/engine

