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

// Importi conformi al regolamento ufficiale: minimo €1, massimo €200, step €0.50
export const IMPORTI_DISPONIBILI = [200, 100, 50, 20, 10, 5, 3, 2, 1] as const;

export type ImportiPerSorte = Partial<Record<TipoGiocata, number>>;

export interface Giocata {
  numeri: number[];
  ruote: Ruota[];
  importiPerSorte: ImportiPerSorte;
  numeroOro: boolean;
}

export interface RisultatoEstrazione {
  [ruota: string]: number[];
}

export interface VincitaDettaglio {
  sorte: TipoGiocata;
  ruota: Ruota;
  numeriIndovinati: number[];
  importoVinto: number;
}

export interface RisultatoGiocata {
  giocata: Giocata;
  estrazione: RisultatoEstrazione;
  vincite: VincitaDettaglio[];
  totaleVintoLordo: number;
  totaleVinto: number;
  tasse: number;
  timestamp: Date;
}

export interface StatisticheSessione {
  totaleGiocate: number;
  totaleSpeso: number;
  totaleVinto: number;
  vittorie: number;
}
