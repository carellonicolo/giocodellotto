import { useState, useCallback } from 'react';
import type { RisultatoGiocata, Ruota, TipoGiocata, StatisticheSessione, ImportiPerSorte } from '@/lib/lotto/types';
import { RUOTE, NUMERI_MINIMI } from '@/lib/lotto/types';
import { eseguiEstrazione, calcolaRisultato, calcolaCostoTotale } from '@/lib/lotto/engine';

export function useLotto() {
  const [numeriSelezionati, setNumeriSelezionati] = useState<number[]>([]);
  const [ruoteSelezionate, setRuoteSelezionate] = useState<Ruota[]>([]);
  const [importiPerSorte, setImportiPerSorte] = useState<ImportiPerSorte>({});
  const [risultatoCorrente, setRisultatoCorrente] = useState<RisultatoGiocata | null>(null);
  const [storico, setStorico] = useState<RisultatoGiocata[]>([]);
  const [isEstracting, setIsEstracting] = useState(false);
  const [statistiche, setStatistiche] = useState<StatisticheSessione>({
    totaleGiocate: 0, totaleSpeso: 0, totaleVinto: 0, vittorie: 0,
  });

  const toggleNumero = useCallback((n: number) => {
    setNumeriSelezionati(prev =>
      prev.includes(n) ? prev.filter(x => x !== n) : prev.length >= 10 ? prev : [...prev, n]
    );
  }, []);

  const toggleRuota = useCallback((r: Ruota) => {
    setRuoteSelezionate(prev =>
      prev.includes(r) ? prev.filter(x => x !== r) : [...prev, r]
    );
  }, []);

  const selezionaTutteRuote = useCallback(() => {
    setRuoteSelezionate(prev =>
      prev.length === RUOTE.length ? [] : [...RUOTE]
    );
  }, []);

  const setImportoSorte = useCallback((tipo: TipoGiocata, importo: number | undefined) => {
    setImportiPerSorte(prev => {
      const next = { ...prev };
      if (importo === undefined || importo <= 0) {
        delete next[tipo];
      } else {
        next[tipo] = importo;
      }
      return next;
    });
  }, []);

  const sortiAttive = Object.keys(importiPerSorte).filter(
    k => (importiPerSorte[k as TipoGiocata] ?? 0) > 0
  ) as TipoGiocata[];

  const costoTotale = calcolaCostoTotale(importiPerSorte, ruoteSelezionate.length);

  const puoGiocare = numeriSelezionati.length > 0
    && ruoteSelezionate.length > 0
    && sortiAttive.length > 0
    && sortiAttive.every(s => numeriSelezionati.length >= NUMERI_MINIMI[s])
    && !isEstracting;

  const gioca = useCallback(() => {
    if (!puoGiocare) return;

    setIsEstracting(true);
    const giocata = {
      numeri: [...numeriSelezionati],
      ruote: [...ruoteSelezionate],
      importiPerSorte: { ...importiPerSorte },
      numeroOro: false,
    };

    const estrazione = eseguiEstrazione(RUOTE);
    const risultato = calcolaRisultato(giocata, estrazione);
    const costo = calcolaCostoTotale(importiPerSorte, ruoteSelezionate.length);

    setTimeout(() => {
      setRisultatoCorrente(risultato);
      setStorico(prev => [risultato, ...prev].slice(0, 50));
      setStatistiche(prev => ({
        totaleGiocate: prev.totaleGiocate + 1,
        totaleSpeso: prev.totaleSpeso + costo,
        totaleVinto: prev.totaleVinto + risultato.totaleVinto,
        vittorie: prev.vittorie + (risultato.totaleVinto > 0 ? 1 : 0),
      }));
      setIsEstracting(false);
    }, 2000);
  }, [puoGiocare, numeriSelezionati, ruoteSelezionate, importiPerSorte]);

  const reset = useCallback(() => {
    setNumeriSelezionati([]);
    setRuoteSelezionate([]);
    setImportiPerSorte({});
    setRisultatoCorrente(null);
  }, []);

  return {
    numeriSelezionati, ruoteSelezionate, importiPerSorte,
    risultatoCorrente, storico, isEstracting, statistiche,
    sortiAttive, costoTotale, puoGiocare,
    toggleNumero, toggleRuota, selezionaTutteRuote,
    setImportoSorte, gioca, reset,
  };
}
