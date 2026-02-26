import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
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

function CollapsibleSection({ title, defaultOpen = true, children }: { title: string; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="rounded border border-border/50 overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-2.5 py-2 bg-[hsl(var(--lotto-cream))] hover:bg-[hsl(var(--lotto-cream)/0.8)] transition-colors text-left"
      >
        <h4 className="font-medium text-[10px] uppercase text-muted-foreground tracking-wider">{title}</h4>
        <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`grid transition-all duration-200 ease-in-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <div className="p-2.5 space-y-2.5">
            {children}
          </div>
        </div>
      </div>
    </div>
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
    <div className="schedina-card overflow-hidden font-['Source_Sans_3']">
      <div className="bg-[hsl(var(--lotto-blue))] px-3 py-2">
        <h2 className="text-white font-['Oswald'] font-bold text-xs uppercase tracking-widest">
          📊 Analisi Probabilistica
        </h2>
      </div>
      <div className="p-3 bg-white/60 space-y-3 text-[13px] font-light">
        {numeriGiocati > 0 && (
          <CollapsibleSection title={`${tipo} con ${numeriGiocati} numeri`} defaultOpen={true}>
            <p className="text-[11px] text-muted-foreground font-light leading-relaxed">{getDescrizioneProbabilita(tipo)}</p>

            {/* Formula visiva stile matematico */}
            <div className="bg-white p-3 sm:p-4 rounded border border-border/50 text-center">
              {formula ? (
                <div className="space-y-2">
                  <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-sm text-foreground font-light">
                    <span className="font-semibold italic">P</span>
                    <span className="text-muted-foreground">=</span>
                    <Frac
                      num={
                        <span className="flex items-center gap-0.5">
                          <Comb n={formula.k} k={formula.t} />
                          <span className="text-muted-foreground">×</span>
                          <Comb n={formula.nk} k={formula.nt} />
                        </span>
                      }
                      den={<Comb n={90} k={5} />}
                    />
                    <span className="text-muted-foreground">=</span>
                    <Frac
                      num={<span className="tabular-nums">{formula.numVal.toLocaleString('it-IT')}</span>}
                      den={<span className="tabular-nums">{formula.denVal.toLocaleString('it-IT')}</span>}
                    />
                    <span className="text-muted-foreground">=</span>
                    <Frac
                      num={<span className="font-semibold">1</span>}
                      den={<span className="font-semibold tabular-nums">{formula.probInversa.toLocaleString('it-IT')}</span>}
                    />
                  </div>
                  <p className="text-[10px] text-muted-foreground font-light">
                    dove C(n,k) = n! / (k! × (n−k)!)
                  </p>
                </div>
              ) : (
                <p className="text-[11px] text-muted-foreground font-light">Seleziona abbastanza numeri</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="bg-white p-2 rounded border border-border/50 text-center">
                <p className="text-[9px] text-muted-foreground uppercase tracking-wide font-medium">Probabilità</p>
                <p className="font-semibold text-foreground text-sm tabular-nums">{prob > 0 ? `1/${probInversa.toLocaleString('it-IT')}` : '—'}</p>
                <p className="text-[10px] text-muted-foreground font-light tabular-nums">{probPercentuale}%</p>
              </div>
              <div className="bg-white p-2 rounded border border-border/50 text-center">
                <p className="text-[9px] text-muted-foreground uppercase tracking-wide font-medium">Vincita max</p>
                <p className="font-semibold text-foreground text-sm tabular-nums">€{vincitaPotenziale.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</p>
              </div>
            </div>
            {numRuote > 0 && (
              <div className={`p-2 rounded border text-center ${valoreAtteso < 0 ? 'bg-[hsl(var(--lotto-red)/0.06)] border-[hsl(var(--lotto-red)/0.2)]' : 'bg-[hsl(var(--lotto-green)/0.06)] border-[hsl(var(--lotto-green)/0.2)]'}`}>
                <p className="text-[9px] uppercase tracking-wide font-medium">Valore Atteso</p>
                <p className={`font-semibold text-sm tabular-nums ${valoreAtteso < 0 ? 'text-[hsl(var(--lotto-red))]' : 'text-[hsl(var(--lotto-green))]'}`}>
                  €{valoreAtteso.toFixed(4)}
                </p>
              </div>
            )}
          </CollapsibleSection>
        )}

        <CollapsibleSection title="Probabilità di riferimento" defaultOpen={false}>
          <div className="space-y-[3px]">
            {TIPI_GIOCATA.map(t => {
              const p = calcolaProbabilitaSingola(t);
              const inv = p > 0 ? Math.round(1 / p) : 0;
              return (
                <div key={t} className="flex justify-between items-center py-1 px-2.5 rounded bg-[hsl(var(--lotto-cream))]">
                  <span className="font-semibold text-[11px] uppercase tracking-wide">{t}</span>
                  <span className="text-[11px] text-muted-foreground tabular-nums">
                    <span className="inline-flex flex-col items-center align-middle mx-0.5">
                      <span className="leading-tight font-light">1</span>
                      <span className="w-full border-t border-muted-foreground/40" />
                      <span className="leading-tight font-light">{inv.toLocaleString('it-IT')}</span>
                    </span>
                  </span>
                </div>
              );
            })}
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Formula Generale" defaultOpen={false}>
          <div className="bg-white p-3 rounded border border-border/50 text-center">
            <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-sm text-foreground font-light">
              <span className="font-semibold italic">P</span>
              <span className="text-muted-foreground">=</span>
              <span className="text-sm">Σ</span>
              <Frac
                num={
                  <span className="flex items-center gap-0.5">
                    <Comb n={'k' as any} k={'j' as any} />
                    <span className="text-muted-foreground">×</span>
                    <Comb n={'90-k' as any} k={'5-j' as any} />
                  </span>
                }
                den={<Comb n={90} k={5} />}
              />
            </div>
            <p className="text-[10px] text-muted-foreground font-light mt-1.5">
              k = numeri giocati, j da t a min(k,5)
            </p>
          </div>
          <p className="text-[11px] text-muted-foreground font-light">
            C(90,5) = {combinazioni(90, 5).toLocaleString('it-IT')} combinazioni
          </p>
          <p className="text-[11px] font-semibold text-[hsl(var(--lotto-red))] uppercase">
            ⚠️ Vantaggio del banco ≈ 50%
          </p>
        </CollapsibleSection>
      </div>
    </div>
  );
}