# 📋 Changelog

Tutte le modifiche rilevanti a questo progetto sono documentate in questo file.

Il formato è basato su [Keep a Changelog](https://keepachangelog.com/it-IT/1.1.0/) e il progetto aderisce al [Versionamento Semantico](https://semver.org/lang/it/).

---

## [1.0.0] – 2025-03-02

### 🎉 Release iniziale

Prima versione pubblica del Simulatore del Gioco del Lotto.

### Aggiunto

#### Gioco
- Griglia interattiva per la selezione di 1–10 numeri (1–90)
- Selettore per le 11 ruote del Lotto (Bari, Cagliari, Firenze, Genova, Milano, Napoli, Palermo, Roma, Torino, Venezia, Nazionale)
- Pulsante "Tutte" per selezionare/deselezionare tutte le ruote
- Configurazione indipendente degli importi per ciascun tipo di sorte
- Importi disponibili: €0,25, €0,50, €1, €2, €3, €5, €10, €20, €50, €100, €200
- Estrazione simulata con animazione di 2 secondi
- Pulsante di reset per azzerare la giocata

#### Sorti
- Estratto (ambata) – 1 numero
- Ambo – 2 numeri
- Terno – 3 numeri
- Quaterna – 4 numeri
- Cinquina – 5 numeri

#### Motore matematico
- Calcolo combinatorio esatto C(n, k)
- Probabilità di vincita per sorte e numeri giocati
- Moltiplicatori di vincita ufficiali del Lotto italiano
- Calcolo vincite con formula: `Vincita = Importo × Moltiplicatore × C(indovinati, t) / C(giocati, t)`
- Formule visuali con numeratore/denominatore

#### Risultati e statistiche
- Tabella estrazione con evidenziazione numeri indovinati
- Pannello probabilità in tempo reale
- Storico delle ultime 50 giocate
- Statistiche sessione: totale speso, vinto, giocate, % vittorie, ROI

#### Interfaccia
- Design system custom ispirato alla schedina cartacea
- Layout responsive (mobile-first, 320px → 1920px)
- Supporto dark mode completo
- Font DM Sans
- Token CSS semantici per colori tematici
- Componenti shadcn/ui personalizzati

#### Informativa
- Modale "Regole del Lotto" con regolamento completo
- Footer con disclaimer in 3 card tematiche (avvertenza, proprietà, AI)
- Link al codice sorgente su GitHub

#### Accessibilità
- Landmark `<main>` semantico
- ARIA labels su tutti i pulsanti interattivi
- Componenti Radix UI con accessibilità built-in
- Navigazione da tastiera

#### Documentazione
- README.md completo con architettura e design system
- INSTALLING.md con guida all'installazione dettagliata
- CONTRIBUTING.md con linee guida per i contributori
- CODE_OF_CONDUCT.md (Contributor Covenant)
- LICENSE (MIT)

---

<p align="center">
  <a href="README.md">← Torna al README</a>
</p>
