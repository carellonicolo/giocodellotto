# Simulatori Lotto Italia

> Simulatori didattici del Gioco del Lotto e del SuperEnalotto per lo studio della probabilita

[![Licenza MIT](https://img.shields.io/badge/Licenza-MIT-blue.svg)](LICENSE)
[![React](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178c6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-06b6d4?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Cloudflare Pages](https://img.shields.io/badge/Cloudflare_Pages-f38020?logo=cloudflare&logoColor=white)](https://pages.cloudflare.com/)
[![Vitest](https://img.shields.io/badge/Vitest-6e9f18?logo=vitest&logoColor=white)](https://vitest.dev/)
[![GitHub stars](https://img.shields.io/github/stars/carellonicolo/giocodellotto?style=social)](https://github.com/carellonicolo/giocodellotto)
[![GitHub issues](https://img.shields.io/github/issues/carellonicolo/giocodellotto)](https://github.com/carellonicolo/giocodellotto/issues)

## Panoramica

Simulatori Lotto Italia e un'applicazione web che riunisce due simulatori didattici in un'unica piattaforma: il **Gioco del Lotto** e il **SuperEnalotto**. Entrambi i simulatori sono progettati per lo studio della probabilita, della statistica e del calcolo combinatorio, riproducendo fedelmente le meccaniche dei giochi ufficiali italiani senza coinvolgere denaro reale.

L'applicazione e organizzata con routing separato — ogni simulatore mantiene la propria identita visiva e le proprie funzionalita, accessibili da una landing page comune. Il deploy avviene tramite Cloudflare Pages.

**Questo progetto ha finalita esclusivamente didattiche e non promuove il gioco d'azzardo.**

## Funzionalita Principali

### Gioco del Lotto (`/giocodellotto`)
- **Schedina interattiva** — Selezione numeri, ruote e importi per sorte con interfaccia fedele all'originale
- **11 ruote ufficiali** — Bari, Cagliari, Firenze, Genova, Milano, Napoli, Palermo, Roma, Torino, Venezia, Nazionale
- **5 sorti di gioco** — Estratto, Ambo, Terno, Quaterna, Cinquina con moltiplicatori ufficiali
- **Simulazione rapida** — Esecuzione istantanea di 100 o 1000 estrazioni
- **Pannello probabilita** — Calcolo in tempo reale delle probabilita per ogni combinazione
- **Storico e grafici** — Registro completo delle giocate con statistiche e grafici Recharts
- **Tassazione realistica** — Applicazione dell'8% sulle vincite superiori a 500 euro

### SuperEnalotto (`/superenalotto`)
- **Schedina multi-colonna** — Fino a 4 colonne con selezione di 6 numeri e SuperStar
- **Estrazione animata** — Rivelazione progressiva dei numeri con effetti visivi
- **Simulazione Monte Carlo** — Simulazione di migliaia di estrazioni per analisi statistica
- **Formule combinatorie** — Visualizzazione interattiva delle formule con rendering KaTeX
- **Dashboard statistiche** — Analisi delle vincite per categoria con grafici
- **Probabilita dettagliate** — Tabella completa per ogni categoria di vincita (dal 2 al 6+1)

### Funzionalita comuni
- **Landing page** — Hub di accesso rapido ai due simulatori
- **Tema chiaro/scuro** — Dark mode per il Lotto, tema scuro nativo per il SuperEnalotto
- **Responsive design** — Ottimizzato per ogni dimensione di schermo
- **Lazy loading** — Caricamento on-demand delle pagine per performance ottimali
- **Code splitting** — Bundle suddiviso in chunk per caching efficiente

## Tech Stack

| Tecnologia | Utilizzo |
|:--|:--|
| ![React](https://img.shields.io/badge/React_18-61dafb?logo=react&logoColor=white) | Framework UI |
| ![TypeScript](https://img.shields.io/badge/TypeScript_5-3178c6?logo=typescript&logoColor=white) | Linguaggio tipizzato |
| ![Vite](https://img.shields.io/badge/Vite_5-646cff?logo=vite&logoColor=white) | Build tool |
| ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-06b6d4?logo=tailwindcss&logoColor=white) | Styling |
| ![Recharts](https://img.shields.io/badge/Recharts-22b5bf) | Grafici e statistiche |
| ![Framer Motion](https://img.shields.io/badge/Framer_Motion-e91e63) | Animazioni (SuperEnalotto) |
| ![KaTeX](https://img.shields.io/badge/KaTeX-44cc11) | Formule matematiche |
| ![Vitest](https://img.shields.io/badge/Vitest-6e9f18?logo=vitest&logoColor=white) | Testing |
| ![Cloudflare](https://img.shields.io/badge/Cloudflare_Pages-f38020?logo=cloudflare&logoColor=white) | Deploy |

## Requisiti

- **Node.js** >= 18
- **npm** >= 9 (oppure bun)

## Installazione

```bash
git clone https://github.com/carellonicolo/giocodellotto.git
cd giocodellotto
npm install
npm run dev
```

L'applicazione sara disponibile su `http://localhost:8080`.

## Utilizzo

- **`/`** — Landing page con accesso ai due simulatori
- **`/giocodellotto`** — Simulatore del Gioco del Lotto
- **`/superenalotto`** — Simulatore del SuperEnalotto

## Struttura del Progetto

```
giocodellotto/
├── src/
│   ├── components/
│   │   ├── lotto/              # Componenti specifici del Lotto
│   │   ├── superenalotto/      # Componenti specifici del SuperEnalotto
│   │   └── ui/                 # Componenti UI condivisi (shadcn/ui)
│   ├── lib/
│   │   ├── lotto/              # Motore di gioco del Lotto
│   │   ├── superenalotto/      # Motore di gioco del SuperEnalotto
│   │   └── shared/             # Utilita condivise (matematica, formattazione)
│   ├── pages/
│   │   ├── Home.tsx            # Landing page
│   │   ├── LottoIndex.tsx      # Pagina Gioco del Lotto
│   │   └── SuperenalottoIndex.tsx  # Pagina SuperEnalotto
│   ├── hooks/                  # Custom hooks
│   ├── assets/                 # Logo e immagini
│   └── App.tsx                 # Router principale
├── public/
│   ├── _redirects              # SPA routing per Cloudflare Pages
│   └── _headers                # Security headers
├── index.html
└── vite.config.ts
```

## Deploy

```bash
npm run build
```

Il progetto e ottimizzato per Cloudflare Pages. La cartella `dist/` include `_redirects` per il routing SPA e `_headers` per la sicurezza (CSP, X-Frame-Options, etc.).

## Test

```bash
npm run test          # Esegui i test una volta
npm run test:watch    # Modalita watch
```

## Contribuire

I contributi sono benvenuti! Consulta le [linee guida per contribuire](CONTRIBUTING.md) per maggiori dettagli.

## Licenza

Distribuito con licenza MIT. Vedi il file [LICENSE](LICENSE) per i dettagli completi.

## Disclaimer

Questa applicazione e uno strumento esclusivamente didattico per lo studio della probabilita e della statistica. Non promuove ne incentiva il gioco d'azzardo. Nessuna somma di denaro reale e coinvolta. I marchi "Gioco del Lotto" e "SuperEnalotto" sono di proprieta dei rispettivi titolari. Per informazioni sulla ludopatia: **Telefono Verde 800 558 822**.

## Autore

**Nicolo Carello**
- GitHub: [@carellonicolo](https://github.com/carellonicolo)
- Website: [nicolocarello.it](https://nicolocarello.it)

---

<sub>Sviluppato con l'ausilio dell'intelligenza artificiale.</sub>

## Progetti Correlati

Questo progetto fa parte di una collezione di strumenti didattici e applicazioni open-source:

| Progetto | Descrizione |
|:--|:--|
| [DFA Visual Editor](https://github.com/carellonicolo/AFS) | Editor visuale per automi DFA |
| [Turing Machine](https://github.com/carellonicolo/Turing-Machine) | Simulatore di Macchina di Turing |
| [Scheduler](https://github.com/carellonicolo/Scheduler) | Simulatore di scheduling CPU |
| [Subnet Calculator](https://github.com/carellonicolo/Subnet) | Calcolatore subnet IPv4/IPv6 |
| [Base Converter](https://github.com/carellonicolo/base-converter) | Suite di conversione multi-funzionale |
| [MicroASM](https://github.com/carellonicolo/microasm) | Simulatore assembly |
| [Flow Charts](https://github.com/carellonicolo/flow-charts) | Editor di diagrammi di flusso |
| [Cypher](https://github.com/carellonicolo/cypher) | Toolkit di crittografia |
| [Snake](https://github.com/carellonicolo/snake) | Snake game retro |
| [Pong](https://github.com/carellonicolo/pongcarello) | Pong game |
| [Calculator](https://github.com/carellonicolo/calculator-carello) | Calcolatrice scientifica |
| [IPSC Score](https://github.com/carellonicolo/IPSC) | Calcolatore punteggi IPSC |
| [Quiz](https://github.com/carellonicolo/quiz) | Piattaforma quiz scolastici |
| [Carello Hub](https://github.com/carellonicolo/carello-hub) | Dashboard educativa |
| [Prof Carello](https://github.com/carellonicolo/prof-carello) | Gestionale lezioni private |
| [DOCSITE](https://github.com/carellonicolo/DOCSITE) | Piattaforma documentale |
