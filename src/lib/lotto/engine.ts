import type { Giocata, RisultatoEstrazione, RisultatoGiocata, Ruota, TipoGiocata } from './types';

// Estrae 5 numeri casuali da 1 a 90 senza ripetizioni per ogni ruota
export function eseguiEstrazione(ruote: readonly Ruota[]): RisultatoEstrazione {
  const risultato: RisultatoEstrazione = {};
  for (const ruota of ruote) {
    const numeri: number[] = [];
    while (numeri.length < 5) {
      const n = Math.floor(Math.random() * 90) + 1;
      if (!numeri.includes(n)) numeri.push(n);
    }
    numeri.sort((a, b) => a - b);
    risultato[ruota] = numeri;
  }
  return risultato;
}

// Calcola il fattoriale
function fattoriale(n: number): number {
  if (n <= 1) return 1;
  let r = 1;
  for (let i = 2; i <= n; i++) r *= i;
  return r;
}

// Combinazioni C(n, k)
export function combinazioni(n: number, k: number): number {
  if (k > n || k < 0) return 0;
  return fattoriale(n) / (fattoriale(k) * fattoriale(n - k));
}

// Probabilità di vincita per tipo di giocata con k numeri giocati su 1 ruota
// Formula: C(k, t) * C(90-k, 5-t) / C(90, 5) dove t = numeri da indovinare
export function calcolaProbabilita(tipo: TipoGiocata, numeriGiocati: number): number {
  const t = tipoToNumero(tipo);
  if (numeriGiocati < t) return 0;

  const totale = combinazioni(90, 5);
  // Somma su tutte le combinazioni favorevoli: almeno t numeri indovinati
  // Per il Lotto, la probabilità è la somma per j da t a min(k,5) di C(k,j)*C(90-k,5-j)/C(90,5)
  // Ma per le vincite standard si considera esattamente t numeri
  // Correzione: nel Lotto si vince se almeno t dei numeri giocati sono tra i 5 estratti
  // La probabilità per una singola combinazione di t numeri è: C(k,t) * [formula]
  // Ma in realtà il giocatore vince per OGNI combinazione di t numeri tra quelli giocati che si trova nell'estrazione
  
  // Probabilità semplice: almeno t numeri giocati presenti tra i 5 estratti
  let prob = 0;
  const maxMatch = Math.min(numeriGiocati, 5);
  for (let j = t; j <= maxMatch; j++) {
    prob += combinazioni(numeriGiocati, j) * combinazioni(90 - numeriGiocati, 5 - j);
  }
  return prob / totale;
}

// Probabilità per una singola combinazione di t numeri
export function calcolaProbabilitaSingola(tipo: TipoGiocata): number {
  const t = tipoToNumero(tipo);
  return combinazioni(5, t) * combinazioni(85, 5 - t) / combinazioni(90, 5);
}

function tipoToNumero(tipo: TipoGiocata): number {
  switch (tipo) {
    case 'Estratto': return 1;
    case 'Ambo': return 2;
    case 'Terno': return 3;
    case 'Quaterna': return 4;
    case 'Cinquina': return 5;
  }
}

// Moltiplicatori di vincita reali del Lotto italiano (per 1€ di puntata)
const MOLTIPLICATORI: Record<TipoGiocata, Record<number, number>> = {
  Estratto: { 1: 11.23, 2: 5.615, 3: 3.743, 4: 2.808, 5: 2.246, 6: 1.872, 7: 1.604, 8: 1.403, 9: 1.247, 10: 1.123 },
  Ambo: { 2: 250, 3: 83.33, 4: 41.67, 5: 25, 6: 16.67, 7: 11.9, 8: 8.93, 9: 6.94, 10: 5.56 },
  Terno: { 3: 4500, 4: 1125, 5: 450, 6: 225, 7: 128.57, 8: 80.36, 9: 53.57, 10: 37.5 },
  Quaterna: { 4: 120000, 5: 24000, 6: 8000, 7: 3428.57, 8: 1714.29, 9: 952.38, 10: 571.43 },
  Cinquina: { 5: 6000000, 6: 1000000, 7: 285714.29, 8: 107142.86, 9: 47619.05, 10: 23809.52 },
};

export function getMoltiplicatore(tipo: TipoGiocata, numeriGiocati: number): number {
  return MOLTIPLICATORI[tipo]?.[numeriGiocati] ?? 0;
}

// Calcola il numero di combinazioni vincenti per la giocata su una ruota
function calcolaVincitaRuota(
  numeriGiocati: number[],
  numeriEstratti: number[],
  tipo: TipoGiocata,
  importo: number
): { numeriIndovinati: number[]; importoVinto: number } {
  const indovinati = numeriGiocati.filter(n => numeriEstratti.includes(n));
  const t = tipoToNumero(tipo);
  
  if (indovinati.length < t) {
    return { numeriIndovinati: indovinati, importoVinto: 0 };
  }

  // Numero di combinazioni vincenti tra i numeri indovinati
  const combVincenti = combinazioni(indovinati.length, t);
  const moltiplicatore = getMoltiplicatore(tipo, numeriGiocati.length);
  const vincita = importo * moltiplicatore * combVincenti / combinazioni(numeriGiocati.length, t);
  // In realtà nel Lotto, la vincita è: importo * moltiplicatore per ogni combinazione vincente
  // diviso il numero di combinazioni giocate (che è già nel moltiplicatore)
  
  return { numeriIndovinati: indovinati, importoVinto: vincita };
}

export function calcolaRisultato(giocata: Giocata, estrazione: RisultatoEstrazione): RisultatoGiocata {
  const vincite: RisultatoGiocata['vincite'] = [];
  let totaleVinto = 0;

  for (const ruota of giocata.ruote) {
    const numeriEstratti = estrazione[ruota];
    if (!numeriEstratti) continue;

    const { numeriIndovinati, importoVinto } = calcolaVincitaRuota(
      giocata.numeri, numeriEstratti, giocata.tipo, giocata.importo
    );

    vincite.push({ ruota, numeriIndovinati, importoVinto });
    totaleVinto += importoVinto;
  }

  return {
    giocata,
    estrazione,
    vincite,
    totaleVinto,
    timestamp: new Date(),
  };
}

// Formule in formato leggibile
export function getFormulaDescrizione(tipo: TipoGiocata, k: number): string {
  const t = tipoToNumero(tipo);
  const prob = calcolaProbabilita(tipo, k);
  const probInversa = prob > 0 ? Math.round(1 / prob) : Infinity;
  
  return `P = C(${k},${t}) × C(${90-k},${5-t}) / C(90,5) = 1/${probInversa.toLocaleString('it-IT')}`;
}

export function getDescrizioneProbabilita(tipo: TipoGiocata): string {
  switch (tipo) {
    case 'Estratto': return 'Indovinare almeno 1 numero tra i 5 estratti';
    case 'Ambo': return 'Indovinare almeno 2 numeri tra i 5 estratti';
    case 'Terno': return 'Indovinare almeno 3 numeri tra i 5 estratti';
    case 'Quaterna': return 'Indovinare almeno 4 numeri tra i 5 estratti';
    case 'Cinquina': return 'Indovinare tutti e 5 i numeri estratti';
  }
}
