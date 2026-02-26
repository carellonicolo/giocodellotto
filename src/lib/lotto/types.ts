export const RUOTE = [
  'Bari', 'Cagliari', 'Firenze', 'Genova', 'Milano',
  'Napoli', 'Palermo', 'Roma', 'Torino', 'Venezia', 'Nazionale'
] as const;

export type Ruota = typeof RUOTE[number];

export const TIPI_GIOCATA = ['Estratto', 'Ambo', 'Terno', 'Quaterna', 'Cinquina'] as const;
export type TipoGiocata = typeof TIPI_GIOCATA[number];

export const NUMERI_MINIMI: Record<TipoGiocata, number> = {
  Estratto: 1,
  Ambo: 2,
  Terno: 3,
  Quaterna: 4,
  Cinquina: 5,
};

export interface Giocata {
  numeri: number[];
  ruote: Ruota[];
  tipo: TipoGiocata;
  importo: number;
}

export interface RisultatoEstrazione {
  [ruota: string]: number[];
}

export interface RisultatoGiocata {
  giocata: Giocata;
  estrazione: RisultatoEstrazione;
  vincite: { ruota: Ruota; numeriIndovinati: number[]; importoVinto: number }[];
  totaleVinto: number;
  timestamp: Date;
}

export interface StatisticheSessione {
  totaleGiocate: number;
  totaleSpeso: number;
  totaleVinto: number;
  vittorie: number;
}
