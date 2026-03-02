# 🤝 Contribuire al Progetto

Grazie per il tuo interesse nel contribuire al Simulatore del Gioco del Lotto! Questa guida ti aiuterà a comprendere il processo di contribuzione e le convenzioni del progetto.

---

## Indice

- [Codice di Condotta](#codice-di-condotta)
- [Come Contribuire](#come-contribuire)
- [Setup dell'Ambiente di Sviluppo](#setup-dellambiente-di-sviluppo)
- [Convenzioni di Codice](#convenzioni-di-codice)
- [Processo di Pull Request](#processo-di-pull-request)
- [Segnalare Bug](#segnalare-bug)
- [Richiedere Funzionalità](#richiedere-funzionalità)
- [Aree di Contribuzione](#aree-di-contribuzione)

---

## Codice di Condotta

Questo progetto adotta il [Contributor Covenant Code of Conduct](CODE_OF_CONDUCT.md). Partecipando, ti impegni a rispettarne i termini.

---

## Come Contribuire

### 1. Fork del repository

Clicca il pulsante **Fork** in alto a destra nella pagina GitHub del repository.

### 2. Clona il tuo fork

```bash
git clone https://github.com/TUO-USERNAME/giocodellotto.git
cd giocodellotto
```

### 3. Configura l'upstream

```bash
git remote add upstream https://github.com/niccolfrancioni/giocodellotto.git
```

### 4. Crea un branch

```bash
# Aggiorna il main
git checkout main
git pull upstream main

# Crea un branch descrittivo
git checkout -b feature/nome-della-feature
# oppure
git checkout -b fix/descrizione-del-bug
```

### 5. Sviluppa e testa

```bash
# Installa dipendenze
npm install

# Avvia dev server
npm run dev

# Esegui test
npm test

# Verifica linting
npm run lint
```

### 6. Committa e pusha

```bash
git add .
git commit -m "feat: aggiunge nuova funzionalità X"
git push origin feature/nome-della-feature
```

### 7. Apri una Pull Request

Vai su GitHub e apri una PR dal tuo branch verso `main` del repository originale.

---

## Setup dell'Ambiente di Sviluppo

Consulta **[INSTALLING.md](INSTALLING.md)** per le istruzioni dettagliate di installazione.

Requisiti minimi:
- Node.js ≥ 18
- npm ≥ 9
- Git ≥ 2.30

---

## Convenzioni di Codice

### Naming

| Tipo | Convenzione | Esempio |
|------|-------------|---------|
| Componenti React | PascalCase | `GrigliaNumeri.tsx` |
| Hook | camelCase con prefisso `use` | `useLotto.ts` |
| Utility functions | camelCase | `calcolaProbabilita()` |
| Tipi/Interfacce | PascalCase | `RisultatoGiocata` |
| Costanti | UPPER_SNAKE_CASE | `TIPI_GIOCATA` |
| File CSS/config | kebab-case | `tailwind.config.ts` |
| Variabili CSS | kebab-case con prefisso `--` | `--lotto-orange` |

### Lingua

- **Codice sorgente**: I nomi di variabili, funzioni e componenti sono in **italiano** per coerenza con il dominio applicativo (Gioco del Lotto)
- **Commenti**: Italiano o inglese, purché chiari e concisi
- **Documentazione**: Italiano (README, guide) con termini tecnici in inglese dove appropriato
- **Commit messages**: Inglese, seguendo [Conventional Commits](https://www.conventionalcommits.org)

### Commit Messages

Segui la convenzione [Conventional Commits](https://www.conventionalcommits.org):

```
<type>(<scope>): <description>

[optional body]
[optional footer]
```

**Tipi**:

| Tipo | Quando usarlo |
|------|---------------|
| `feat` | Nuova funzionalità |
| `fix` | Correzione bug |
| `docs` | Modifiche alla documentazione |
| `style` | Formattazione, spazi, punto e virgola (no logic change) |
| `refactor` | Refactoring senza cambi funzionali |
| `test` | Aggiunta o modifica test |
| `chore` | Manutenzione, dipendenze, configurazione |
| `perf` | Miglioramenti di performance |

**Esempi**:

```
feat(engine): aggiunge calcolo probabilità condizionata
fix(griglia): corregge selezione numero al bordo della griglia
docs: aggiorna README con sezione architettura
style(schedina): allinea spacing dei bottoni ruota
refactor(useLotto): estrae logica statistiche in hook separato
test(engine): aggiunge test per moltiplicatori con 10 numeri
chore: aggiorna dipendenze React a 18.3.1
```

### Stile del Codice

- **Indentazione**: 2 spazi
- **Punto e virgola**: Sì
- **Virgolette**: Singole per TypeScript, doppie per JSX attributes
- **Trailing comma**: Sì
- **Lunghezza riga**: Max 120 caratteri (soft limit)
- **Import**: Ordinati per tipo (React, librerie esterne, componenti locali, tipi)

### Design System

- **NON** usare colori hardcoded nei componenti (es. `text-white`, `bg-red-500`)
- **USARE** sempre i token semantici definiti in `index.css` (es. `text-foreground`, `bg-primary`)
- Per colori specifici del Lotto, usare i token `--lotto-*`
- Ogni nuovo componente deve supportare la dark mode

---

## Processo di Pull Request

### Checklist

Prima di aprire una PR, verifica:

- [ ] Il codice compila senza errori (`npm run build`)
- [ ] I test esistenti passano (`npm test`)
- [ ] Il linting non segnala errori (`npm run lint`)
- [ ] Hai aggiunto test per la nuova funzionalità (se applicabile)
- [ ] Il design è responsive (testato su mobile e desktop)
- [ ] I colori usano token semantici dal design system
- [ ] I commit seguono le convenzioni Conventional Commits
- [ ] La PR ha una descrizione chiara di cosa cambia e perché

### Review

- Ogni PR richiede almeno una review prima del merge
- I reviewer possono richiedere modifiche: è normale e costruttivo
- Rispondi ai commenti e aggiorna il codice di conseguenza

---

## Segnalare Bug

Apri una [nuova issue](https://github.com/niccolfrancioni/giocodellotto/issues/new) con:

1. **Titolo descrittivo**: `[Bug] Il calcolo dell'ambo non considera i numeri doppi`
2. **Ambiente**: Browser, OS, versione Node.js
3. **Passi per riprodurre**: Sequenza numerata di azioni
4. **Comportamento atteso**: Cosa dovrebbe succedere
5. **Comportamento attuale**: Cosa succede realmente
6. **Screenshot**: Se il bug è visivo

---

## Richiedere Funzionalità

Apri una [nuova issue](https://github.com/niccolfrancioni/giocodellotto/issues/new) con:

1. **Titolo**: `[Feature] Descrizione breve della feature`
2. **Problema**: Quale necessità risolve?
3. **Soluzione proposta**: Come vorresti che funzionasse?
4. **Alternative considerate**: Altre soluzioni possibili
5. **Contesto aggiuntivo**: Screenshot, mockup, riferimenti

---

## Aree di Contribuzione

Ecco alcune aree dove i contributi sono particolarmente benvenuti:

### 🧮 Motore Matematico
- Aggiunta di nuove formule probabilistiche
- Ottimizzazione degli algoritmi esistenti
- Validazione dei moltiplicatori con fonti ufficiali
- Test matematici più approfonditi

### 🎨 UI/UX
- Miglioramenti all'interfaccia responsive
- Animazioni e transizioni
- Supporto per temi aggiuntivi
- Miglioramenti di accessibilità (WCAG)

### 📊 Statistiche
- Grafici avanzati con Recharts
- Analisi frequenza numeri
- Trend storici delle sessioni
- Export dei dati (CSV, PDF)

### 📖 Documentazione
- Traduzioni in altre lingue
- Tutorial e guide
- Documentazione delle API interne
- Esempi di utilizzo

### 🧪 Testing
- Test unitari per il motore matematico
- Test di integrazione per i componenti
- Test end-to-end
- Test di accessibilità automatizzati

---

<p align="center">
  <a href="README.md">← Torna al README</a> ·
  <a href="CODE_OF_CONDUCT.md">Codice di Condotta →</a>
</p>
