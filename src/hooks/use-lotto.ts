import { useState, useCallback } from 'react';
import type { Giocata, RisultatoGiocata, Ruota, TipoGiocata, StatisticheSessione } from '@/lib/lotto/types';
import { RUOTE } from '@/lib/lotto/types';
import { eseguiEstrazione, calcolaRisultato } from '@/lib/lotto/engine';

export function useLotto() {
  const [numeriSelezionati, setNumeriSelezionati] = useState<number[]>([]);
  const [ruoteSelezionate, setRuoteSelezionate] = useState<Ruota[]>([]);
  const [tipoGiocata, setTipoGiocata] = useState<TipoGiocata>('Estratto');
  const [importo, setImporto] = useState(1);
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

  const gioca = useCallback(() => {
    if (numeriSelezionati.length === 0 || ruoteSelezionate.length === 0) return;

    setIsEstracting(true);
    const giocata: Giocata = {
      numeri: [...numeriSelezionati],
      ruote: [...ruoteSelezionate],
      tipo: tipoGiocata,
      importo,
    };

    // Estrazione su TUTTE le ruote (come nel Lotto reale)
    const estrazione = eseguiEstrazione(RUOTE);
    const risultato = calcolaRisultato(giocata, estrazione);

    // Simula l'animazione
    setTimeout(() => {
      setRisultatoCorrente(risultato);
      setStorico(prev => [risultato, ...prev].slice(0, 50));
      setStatistiche(prev => ({
        totaleGiocate: prev.totaleGiocate + 1,
        totaleSpeso: prev.totaleSpeso + importo * ruoteSelezionate.length,
        totaleVinto: prev.totaleVinto + risultato.totaleVinto,
        vittorie: prev.vittorie + (risultato.totaleVinto > 0 ? 1 : 0),
      }));
      setIsEstracting(false);
    }, 2000);
  }, [numeriSelezionati, ruoteSelezionate, tipoGiocata, importo]);

  const reset = useCallback(() => {
    setNumeriSelezionati([]);
    setRuoteSelezionate([]);
    setRisultatoCorrente(null);
  }, []);

  return {
    numeriSelezionati, ruoteSelezionate, tipoGiocata, importo,
    risultatoCorrente, storico, isEstracting, statistiche,
    toggleNumero, toggleRuota, selezionaTutteRuote,
    setTipoGiocata, setImporto, gioca, reset,
  };
}
