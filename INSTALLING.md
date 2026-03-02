# 📦 Guida all'Installazione

Questa guida fornisce istruzioni dettagliate per installare, configurare e avviare il Simulatore del Gioco del Lotto in ambiente locale.

---

## Indice

- [Prerequisiti](#prerequisiti)
- [Installazione](#installazione)
- [Avvio in Sviluppo](#avvio-in-sviluppo)
- [Build di Produzione](#build-di-produzione)
- [Variabili d'Ambiente](#variabili-dambiente)
- [IDE e Configurazione Editor](#ide-e-configurazione-editor)
- [Risoluzione Problemi](#risoluzione-problemi)

---

## Prerequisiti

### Software richiesto

| Software | Versione minima | Consigliata | Note |
|----------|----------------|-------------|------|
| **Node.js** | 18.0.0 | 20.x LTS | [Scarica](https://nodejs.org) |
| **npm** | 9.0.0 | 10.x | Incluso con Node.js |
| **Git** | 2.30+ | Latest | [Scarica](https://git-scm.com) |

### Gestori di pacchetti alternativi

Il progetto è compatibile con i seguenti package manager:

| Package Manager | Supporto | Note |
|-----------------|----------|------|
| **npm** | ✅ Completo | Incluso con Node.js |
| **bun** | ✅ Completo | Più veloce per install e dev |
| **yarn** | ✅ Compatibile | Richiede `yarn install` |
| **pnpm** | ✅ Compatibile | Richiede `pnpm install` |

### Verifica prerequisiti

```bash
# Verifica Node.js
node --version
# Output atteso: v18.x.x o superiore

# Verifica npm
npm --version
# Output atteso: 9.x.x o superiore

# Verifica Git
git --version
# Output atteso: git version 2.x.x
```

### Installazione Node.js via nvm (consigliato)

Se non hai Node.js installato, il metodo più flessibile è tramite [nvm](https://github.com/nvm-sh/nvm):

```bash
# Installa nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash

# Riavvia il terminale, poi:
nvm install 20
nvm use 20
```

Su Windows, usa [nvm-windows](https://github.com/coreybutler/nvm-windows).

---

## Installazione

### 1. Clona il repository

```bash
git clone https://github.com/niccolfrancioni/giocodellotto.git
cd giocodellotto
```

### 2. Installa le dipendenze

```bash
npm install
```

Questo installerà tutte le dipendenze elencate in `package.json`, tra cui:
- **React 18** e **React DOM** – Framework UI
- **Vite 5** – Build tool e dev server
- **TypeScript 5.8** – Type checking
- **Tailwind CSS 3.4** – Utility CSS
- **30+ componenti Radix UI** – Primitive UI accessibili
- **Vitest** – Framework di testing

Il processo richiede circa 30-60 secondi a seconda della connessione.

### 3. Verifica l'installazione

```bash
# Verifica che il build funzioni
npm run build

# Se non ci sono errori, l'installazione è completata!
```

---

## Avvio in Sviluppo

```bash
npm run dev
```

Il server di sviluppo si avvia su `http://localhost:5173` (o la prima porta disponibile).

### Funzionalità del dev server

- 🔥 **Hot Module Replacement (HMR)** – Le modifiche al codice si riflettono istantaneamente
- ⚡ **Avvio rapidissimo** – Vite parte in millisecondi
- 📦 **Lazy loading** – I moduli vengono caricati solo quando necessari
- 🔍 **Source maps** – Debug completo nel browser DevTools

### Script disponibili

| Comando | Descrizione |
|---------|-------------|
| `npm run dev` | Avvia il dev server con HMR |
| `npm run build` | Build di produzione ottimizzata |
| `npm run build:dev` | Build in modalità sviluppo (con source maps) |
| `npm run preview` | Anteprima locale della build di produzione |
| `npm run lint` | Linting del codice con ESLint |
| `npm test` | Esegui tutti i test (singola esecuzione) |
| `npm run test:watch` | Esegui test in modalità watch |

---

## Build di Produzione

```bash
# Genera la build ottimizzata
npm run build

# Anteprima locale della build
npm run preview
```

La build viene generata nella cartella `dist/` con:

- ✅ **Minificazione** di JavaScript e CSS
- ✅ **Tree shaking** per eliminare codice non utilizzato
- ✅ **Code splitting** automatico
- ✅ **Asset hashing** per cache invalidation
- ✅ **Compressione** ottimizzata

### Output della build

```
dist/
├── index.html              # Entry point
├── assets/
│   ├── index-[hash].js     # Bundle JS principale
│   ├── index-[hash].css    # Stili compilati
│   ├── lotto-logo-[hash].png
│   └── wallpaper-bg-[hash].jpg
└── favicon.ico
```

### Deploy

La cartella `dist/` può essere servita da qualsiasi hosting statico:

| Piattaforma | Comando/Metodo |
|-------------|----------------|
| **Netlify** | Drag & drop della cartella `dist/` |
| **Vercel** | `vercel --prod` |
| **GitHub Pages** | Push su branch `gh-pages` |
| **Cloudflare Pages** | Connetti il repo |
| **AWS S3 + CloudFront** | Upload su bucket S3 |

---

## Variabili d'Ambiente

Attualmente il progetto **non richiede variabili d'ambiente**. Tutto il calcolo avviene client-side senza chiamate a API esterne.

In caso di estensioni future che richiedano configurazione:

```bash
# Copia il file di esempio
cp .env.example .env.local

# Modifica con il tuo editor
nano .env.local
```

Le variabili devono essere prefissate con `VITE_` per essere accessibili nel codice frontend:

```env
VITE_APP_TITLE=Il Gioco del Lotto
VITE_API_BASE_URL=https://api.example.com
```

---

## IDE e Configurazione Editor

### Visual Studio Code (consigliato)

Estensioni consigliate:

| Estensione | ID | Scopo |
|------------|-----|-------|
| **TypeScript Vue Plugin** | `vue.volar` | Supporto TypeScript avanzato |
| **Tailwind CSS IntelliSense** | `bradlc.vscode-tailwindcss` | Autocomplete classi Tailwind |
| **ESLint** | `dbaeumer.vscode-eslint` | Linting in tempo reale |
| **Prettier** | `esbenp.prettier-vscode` | Formattazione automatica |
| **Auto Rename Tag** | `formulahendry.auto-rename-tag` | Rinomina tag HTML/JSX |

Impostazioni consigliate (`.vscode/settings.json`):

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "tailwindCSS.experimental.classRegex": [
    ["cva\\(([^)]*)\\)", "[\"'`]([^\"'`]*).*?[\"'`]"]
  ]
}
```

### JetBrains WebStorm

Il progetto funziona out-of-the-box con WebStorm. Assicurati di:
1. Abilitare il supporto Tailwind CSS nelle impostazioni
2. Configurare ESLint come linter predefinito
3. Importare lo schema TypeScript dal `tsconfig.json`

---

## Risoluzione Problemi

### Errori comuni

#### `npm install` fallisce

```bash
# Pulisci la cache npm
npm cache clean --force

# Rimuovi node_modules e reinstalla
rm -rf node_modules
npm install
```

#### Porta 5173 già occupata

```bash
# Vite selezionerà automaticamente la prossima porta disponibile
# Oppure specifica una porta:
npx vite --port 3000
```

#### Errori TypeScript

```bash
# Verifica la configurazione TypeScript
npx tsc --noEmit

# Se ci sono errori, assicurati di avere la versione corretta di Node.js
node --version  # Deve essere >= 18
```

#### Build fallisce su sistemi con poca RAM

```bash
# Aumenta la memoria disponibile per Node.js
NODE_OPTIONS=--max-old-space-size=4096 npm run build
```

### Supporto

Se riscontri problemi non coperti da questa guida:

1. Cerca tra le [Issues esistenti](https://github.com/niccolfrancioni/giocodellotto/issues)
2. Apri una nuova issue con:
   - Sistema operativo e versione
   - Versione di Node.js (`node --version`)
   - Output completo dell'errore
   - Passi per riprodurre il problema

---

<p align="center">
  <a href="README.md">← Torna al README</a> ·
  <a href="CONTRIBUTING.md">Contribuire →</a>
</p>
