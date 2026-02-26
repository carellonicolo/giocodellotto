import type { TipoGiocata } from '@/lib/lotto/types';
import { TIPI_GIOCATA } from '@/lib/lotto/types';
import {
  calcolaProbabilita,
  calcolaProbabilitaSingola,
  combinazioni,
  getMoltiplicatore,
  getFormulaData,
  getDescrizioneProbabilita,
} from '@/lib/lotto/engine';

interface PannelloProbabilitaProps {
  tipo: TipoGiocata;
  numeriGiocati: number;
  importo: number;
  numRuote: number;
}

/** Fraction rendered as numerator / denominator with a horizontal bar */
function Frac({ num, den }: { num: React.ReactNode; den: React.ReactNode }) {
  return (
    <span className="inline-flex flex-col items-center mx-0.5 align-middle">
      <span className="px-1 leading-tight">{num}</span>
      <span className="w-full border-t border-foreground/60" />
      <span className="px-1 leading-tight">{den}</span>
    </span>
  );
}

/** Subscript-style C(n,k) rendered as a combination symbol */
function Comb({ n, k }: { n: number; k: number }) {
  return (
    <span className="inline-flex items-baseline">
      <span className="italic mr-px">C</span>
      <span className="inline-flex flex-col items-center text-[7px] leading-[1.1] -ml-px">
        <span>{n}</span>
        <span>{k}</span>
      </span>
    </span>
  );
}

export function PannelloProbabilita({ tipo, numeriGiocati, importo, numRuote }: PannelloProbabilitaProps) {
  const prob = numeriGiocati > 0 ? calcolaProbabilita(tipo, numeriGiocati) : 0;
  const probPercentuale = (prob * 100).toFixed(6);
  const probInversa = prob > 0 ? Math.round(1 / prob) : 0;
  const moltiplicatore = getMoltiplicatore(tipo, numeriGiocati);
  const vincitaPotenziale = importo * moltiplicatore;
  const costoTotale = importo * numRuote;
  const valoreAtteso = prob * vincitaPotenziale * numRuote - costoTotale;

  const minNumeri = { Estratto: 1, Ambo: 2, Terno: 3, Quaterna: 4, Cinquina: 5 }[tipo];
  const hasFormula = numeriGiocati >= minNumeri;
  const formula = hasFormula ? getFormulaData(tipo, numeriGiocati) : null;

  return (
    <div className="schedina-card overflow-hidden">
      <div className="bg-[hsl(var(--lotto-blue))] px-3 py-2">
        <h2 className="text-white font-['Oswald'] font-bold text-xs uppercase tracking-widest">
          📊 Analisi Probabilistica
        </h2>
      </div>
      <div className="p-3 bg-white/60 space-y-3 text-sm">
        {numeriGiocati > 0 && (
          <div className="p-2 rounded bg-[hsl(var(--lotto-cream))] border border-border/50 space-y-2">
            <p className="font-bold text-foreground font-['Oswald'] uppercase text-[10px] tracking-wider">
              {tipo} con {numeriGiocati} numeri
            </p>
            <p className="text-[10px] text-muted-foreground">{getDescrizioneProbabilita(tipo)}</p>

            {/* Formula visiva stile matematico */}
            <div className="bg-white p-2 sm:p-3 rounded border border-border/50 text-center">
              {formula ? (
                <div className="space-y-2">
                  {/* P = fraction */}
                  <div className="flex items-center justify-center gap-1 text-[10px] sm:text-xs font-mono text-foreground">
                    <span className="font-semibold italic">P</span>
                    <span>=</span>
                    <Frac
                      num={
                        <span className="flex items-center gap-0.5">
                          <Comb n={formula.k} k={formula.t} />
                          <span>×</span>
                          <Comb n={formula.nk} k={formula.nt} />
                        </span>
                      }
                      den={<Comb n={90} k={5} />}
                    />
                    <span>=</span>
                    <Frac
                      num={<span>{formula.numVal.toLocaleString('it-IT')}</span>}
                      den={<span>{formula.denVal.toLocaleString('it-IT')}</span>}
                    />
                    <span>=</span>
                    <Frac
                      num={<span className="font-bold">1</span>}
                      den={<span className="font-bold">{formula.probInversa.toLocaleString('it-IT')}</span>}
                    />
                  </div>
                  <p className="text-[8px] text-muted-foreground">
                    dove C(n,k) = n! / (k! × (n-k)!)
                  </p>
                </div>
              ) : (
                <p className="text-[9px] text-muted-foreground">Seleziona abbastanza numeri</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-1.5">
              <div className="bg-white p-1.5 rounded border border-border/50 text-center">
                <p className="text-[8px] text-muted-foreground uppercase font-['Oswald']">Probabilità</p>
                <p className="font-bold text-foreground font-['Oswald'] text-xs">{prob > 0 ? `1/${probInversa.toLocaleString('it-IT')}` : '—'}</p>
                <p className="text-[8px] text-muted-foreground">{probPercentuale}%</p>
              </div>
              <div className="bg-white p-1.5 rounded border border-border/50 text-center">
                <p className="text-[8px] text-muted-foreground uppercase font-['Oswald']">Vincita max</p>
                <p className="font-bold text-foreground font-['Oswald'] text-xs">€{vincitaPotenziale.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</p>
              </div>
            </div>
            {numRuote > 0 && (
              <div className={`p-1.5 rounded border text-center ${valoreAtteso < 0 ? 'bg-[hsl(var(--lotto-red)/0.06)] border-[hsl(var(--lotto-red)/0.2)]' : 'bg-[hsl(var(--lotto-green)/0.06)] border-[hsl(var(--lotto-green)/0.2)]'}`}>
                <p className="text-[8px] uppercase font-['Oswald'] font-bold">Valore Atteso</p>
                <p className={`font-bold font-['Oswald'] text-xs ${valoreAtteso < 0 ? 'text-[hsl(var(--lotto-red))]' : 'text-[hsl(var(--lotto-green))]'}`}>
                  €{valoreAtteso.toFixed(4)}
                </p>
              </div>
            )}
          </div>
        )}

        <div>
          <h4 className="font-['Oswald'] font-bold text-[9px] uppercase text-muted-foreground tracking-wider mb-1">
            Probabilità di riferimento
          </h4>
          <div className="space-y-[2px]">
            {TIPI_GIOCATA.map(t => {
              const p = calcolaProbabilitaSingola(t);
              const inv = p > 0 ? Math.round(1 / p) : 0;
              return (
                <div key={t} className="flex justify-between items-center py-0.5 px-2 rounded bg-[hsl(var(--lotto-cream))]">
                  <span className="font-['Oswald'] font-bold text-[10px] uppercase">{t}</span>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    <span className="inline-flex flex-col items-center align-middle mx-0.5">
                      <span className="leading-tight">1</span>
                      <span className="w-full border-t border-muted-foreground/50" />
                      <span className="leading-tight">{inv.toLocaleString('it-IT')}</span>
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Formula generale */}
        <div className="p-2 rounded bg-[hsl(var(--lotto-cream))] border border-border/50 space-y-2">
          <h4 className="font-['Oswald'] font-bold text-[9px] uppercase text-muted-foreground">Formula Generale</h4>
          <div className="bg-white p-2 rounded border border-border/50 text-center">
            <div className="flex items-center justify-center gap-1 text-[10px] sm:text-xs font-mono text-foreground">
              <span className="font-semibold italic">P</span>
              <span>=</span>
              <span className="text-[9px]">Σ</span>
              <Frac
                num={
                  <span className="flex items-center gap-0.5">
                    <Comb n={'k' as any} k={'j' as any} />
                    <span>×</span>
                    <Comb n={'90-k' as any} k={'5-j' as any} />
                  </span>
                }
                den={<Comb n={90} k={5} />}
              />
            </div>
            <p className="text-[8px] text-muted-foreground mt-1">
              k = numeri giocati, j da t a min(k,5)
            </p>
          </div>
          <p className="text-[9px] text-muted-foreground">
            C(90,5) = {combinazioni(90, 5).toLocaleString('it-IT')} combinazioni
          </p>
          <p className="text-[9px] font-bold text-[hsl(var(--lotto-red))] font-['Oswald'] uppercase">
            ⚠️ Vantaggio del banco ≈ 50%
          </p>
        </div>
      </div>
    </div>
  );
}
