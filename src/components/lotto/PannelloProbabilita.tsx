import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { TipoGiocata } from '@/lib/lotto/types';
import { TIPI_GIOCATA } from '@/lib/lotto/types';
import {
  calcolaProbabilita,
  calcolaProbabilitaSingola,
  combinazioni,
  getMoltiplicatore,
  getFormulaDescrizione,
  getDescrizioneProbabilita,
} from '@/lib/lotto/engine';

interface PannelloProbabilitaProps {
  tipo: TipoGiocata;
  numeriGiocati: number;
  importo: number;
  numRuote: number;
}

export function PannelloProbabilita({ tipo, numeriGiocati, importo, numRuote }: PannelloProbabilitaProps) {
  const prob = numeriGiocati > 0 ? calcolaProbabilita(tipo, numeriGiocati) : 0;
  const probPercentuale = (prob * 100).toFixed(6);
  const probInversa = prob > 0 ? Math.round(1 / prob) : 0;
  const moltiplicatore = getMoltiplicatore(tipo, numeriGiocati);
  const vincitaPotenziale = importo * moltiplicatore;
  const costoTotale = importo * numRuote;
  const valoreAtteso = prob * vincitaPotenziale * numRuote - costoTotale;

  return (
    <div className="schedina-border rounded-lg bg-card overflow-hidden">
      <div className="bg-[hsl(var(--lotto-blue))] px-4 py-2">
        <h2 className="text-white font-['Oswald'] font-bold text-sm uppercase tracking-widest">
          📊 Analisi Probabilistica
        </h2>
      </div>
      <div className="p-4 space-y-4 text-sm">
        {/* Giocata corrente */}
        {numeriGiocati > 0 && (
          <div className="p-3 rounded bg-[hsl(var(--lotto-cream))] border border-border space-y-2">
            <p className="font-bold text-foreground font-['Oswald'] uppercase text-xs tracking-wider">
              {tipo} con {numeriGiocati} numeri
            </p>
            <p className="text-[11px] text-muted-foreground">{getDescrizioneProbabilita(tipo)}</p>
            <p className="font-mono text-[10px] bg-white p-2 rounded border border-border">
              {numeriGiocati >= ({ Estratto: 1, Ambo: 2, Terno: 3, Quaterna: 4, Cinquina: 5 }[tipo])
                ? getFormulaDescrizione(tipo, numeriGiocati)
                : 'Seleziona abbastanza numeri'}
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="bg-white p-2 rounded border border-border text-center">
                <p className="text-[9px] text-muted-foreground uppercase font-['Oswald'] tracking-wider">Probabilità</p>
                <p className="font-bold text-foreground font-['Oswald'] text-sm">{prob > 0 ? `1 su ${probInversa.toLocaleString('it-IT')}` : '—'}</p>
                <p className="text-[9px] text-muted-foreground">{probPercentuale}%</p>
              </div>
              <div className="bg-white p-2 rounded border border-border text-center">
                <p className="text-[9px] text-muted-foreground uppercase font-['Oswald'] tracking-wider">Vincita max</p>
                <p className="font-bold text-foreground font-['Oswald'] text-sm">€{vincitaPotenziale.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</p>
                <p className="text-[9px] text-muted-foreground">×{moltiplicatore}</p>
              </div>
            </div>
            {numRuote > 0 && (
              <div className={`p-2 rounded border text-center ${valoreAtteso < 0 ? 'bg-[hsl(var(--lotto-red)/0.08)] border-[hsl(var(--lotto-red)/0.3)]' : 'bg-[hsl(var(--lotto-green)/0.1)] border-[hsl(var(--lotto-green)/0.3)]'}`}>
                <p className="text-[9px] uppercase font-['Oswald'] font-bold tracking-wider">Valore Atteso</p>
                <p className={`font-bold font-['Oswald'] ${valoreAtteso < 0 ? 'text-[hsl(var(--lotto-red))]' : 'text-[hsl(var(--lotto-green))]'}`}>
                  €{valoreAtteso.toFixed(4)}
                </p>
                <p className="text-[9px] text-muted-foreground">
                  {valoreAtteso < 0
                    ? `Perdi in media €${Math.abs(valoreAtteso).toFixed(4)} per giocata`
                    : 'Valore atteso positivo (raro)'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tabella di riferimento */}
        <div>
          <h4 className="font-['Oswald'] font-bold text-[10px] uppercase text-muted-foreground tracking-wider mb-2">
            Probabilità per tipo (singolo su 1 ruota)
          </h4>
          <div className="space-y-1">
            {TIPI_GIOCATA.map(t => {
              const p = calcolaProbabilitaSingola(t);
              const inv = p > 0 ? Math.round(1 / p) : 0;
              return (
                <div key={t} className="flex justify-between items-center py-1 px-2 rounded bg-[hsl(var(--lotto-cream))] border border-border/50">
                  <span className="font-['Oswald'] font-bold text-[11px] uppercase">{t}</span>
                  <span className="font-mono text-[11px] text-muted-foreground">1/{inv.toLocaleString('it-IT')}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Formula */}
        <div className="p-3 rounded bg-[hsl(var(--lotto-cream))] border border-border space-y-2">
          <h4 className="font-['Oswald'] font-bold text-[10px] uppercase text-muted-foreground tracking-wider">
            Formula Generale
          </h4>
          <div className="font-mono text-[10px] bg-white p-2 rounded border border-border leading-relaxed">
            P(vincita) = Σ C(k,j) × C(90-k, 5-j) / C(90,5)
            <br /><span className="text-muted-foreground">k = numeri giocati, j = da t a min(k,5)</span>
          </div>
          <p className="text-[10px] text-muted-foreground leading-relaxed">
            C(90,5) = {combinazioni(90, 5).toLocaleString('it-IT')} combinazioni possibili.
          </p>
          <div className="p-2 rounded border border-[hsl(var(--lotto-red)/0.3)] bg-[hsl(var(--lotto-red)/0.05)]">
            <p className="text-[10px] font-bold text-[hsl(var(--lotto-red))] font-['Oswald'] uppercase">
              ⚠️ Vantaggio del banco ≈ 50%
            </p>
            <p className="text-[9px] text-muted-foreground">
              Nel lungo periodo il giocatore perde circa metà di quanto puntato.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
