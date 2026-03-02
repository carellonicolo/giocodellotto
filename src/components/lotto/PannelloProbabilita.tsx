import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { TipoGiocata, ImportiPerSorte } from '@/lib/lotto/types';
import { TIPI_GIOCATA, NUMERI_MINIMI } from '@/lib/lotto/types';
import {
  calcolaProbabilita,
  calcolaProbabilitaSingola,
  combinazioni,
  getMoltiplicatore,
  getFormulaData,
  getDescrizioneProbabilita,
} from '@/lib/lotto/engine';

interface PannelloProbabilitaProps {
  importiPerSorte: ImportiPerSorte;
  numeriGiocati: number;
  numRuote: number;
}

function Frac({ num, den }: { num: React.ReactNode; den: React.ReactNode }) {
  return (
    <span className="inline-flex flex-col items-center mx-0.5 align-middle">
      <span className="px-1 leading-tight">{num}</span>
      <span className="w-full border-t border-foreground/60" />
      <span className="px-1 leading-tight">{den}</span>
    </span>
  );
}

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
    <div className="glass-panel !rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-2.5 py-2 bg-lotto-cream/60 hover:bg-lotto-cream/90 transition-colors text-left"
      >
        <h3 className="font-medium text-[10px] uppercase text-muted-foreground tracking-wider">{title}</h3>
        <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`grid transition-all duration-300 ease-in-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <div className="p-2.5 space-y-2.5">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function SorteAnalisi({ tipo, numeriGiocati, importo, numRuote }: { tipo: TipoGiocata; numeriGiocati: number; importo: number; numRuote: number }) {
  const prob = numeriGiocati > 0 ? calcolaProbabilita(tipo, numeriGiocati) : 0;
  const probPercentuale = (prob * 100).toFixed(6);
  const probInversa = prob > 0 ? Math.round(1 / prob) : 0;
  const moltiplicatore = getMoltiplicatore(tipo, numeriGiocati);
  const vincitaPotenziale = importo * moltiplicatore;
  const costoTotale = importo * numRuote;
  const valoreAtteso = prob * vincitaPotenziale * numRuote - costoTotale;
  const minNumeri = NUMERI_MINIMI[tipo];
  const hasFormula = numeriGiocati >= minNumeri;
  const formula = hasFormula ? getFormulaData(tipo, numeriGiocati) : null;

  return (
    <CollapsibleSection title={`${tipo} — €${importo.toFixed(2)} × ${numRuote} ruote`} defaultOpen={true}>
      <p className="text-[11px] text-muted-foreground font-light leading-relaxed">{getDescrizioneProbabilita(tipo)}</p>
      <div className="bg-surface/80 p-3 sm:p-4 rounded-lg border border-border text-center">
        {formula ? (
          <div className="space-y-2">
            <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-sm text-foreground font-light">
              <span className="font-semibold italic">P</span>
              <span className="text-muted-foreground">=</span>
              <Frac
                num={<span className="flex items-center gap-0.5"><Comb n={formula.k} k={formula.t} /><span className="text-muted-foreground">×</span><Comb n={formula.nk} k={formula.nt} /></span>}
                den={<Comb n={90} k={5} />}
              />
              <span className="text-muted-foreground">=</span>
              <Frac num={<span className="font-semibold">1</span>} den={<span className="font-semibold tabular-nums">{formula.probInversa.toLocaleString('it-IT')}</span>} />
            </div>
          </div>
        ) : (
          <p className="text-[11px] text-muted-foreground font-light">Seleziona abbastanza numeri</p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-2">
        <div className="glass-panel !rounded-lg !p-2 text-center">
          <p className="text-[9px] text-muted-foreground uppercase tracking-wide font-medium">Probabilità</p>
          <p className="font-semibold text-foreground text-sm tabular-nums">{prob > 0 ? `1/${probInversa.toLocaleString('it-IT')}` : '—'}</p>
          <p className="text-[10px] text-muted-foreground font-light tabular-nums">{probPercentuale}%</p>
        </div>
        <div className="glass-panel !rounded-lg !p-2 text-center">
          <p className="text-[9px] text-muted-foreground uppercase tracking-wide font-medium">Vincita max</p>
          <p className="font-semibold text-foreground text-sm tabular-nums">€{vincitaPotenziale.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</p>
        </div>
      </div>
      {numRuote > 0 && (
        <div className={`p-2 rounded-lg border text-center ${valoreAtteso < 0 ? 'bg-lotto-red/10 border-lotto-red/20' : 'bg-lotto-green/10 border-lotto-green/20'}`}>
          <p className="text-[9px] uppercase tracking-wide font-medium text-foreground">Valore Atteso</p>
          <p className={`font-semibold text-sm tabular-nums ${valoreAtteso < 0 ? 'text-lotto-red' : 'text-lotto-green'}`}>
            €{valoreAtteso.toFixed(4)}
          </p>
        </div>
      )}
    </CollapsibleSection>
  );
}

export function PannelloProbabilita({ importiPerSorte, numeriGiocati, numRuote }: PannelloProbabilitaProps) {
  const sortiAttive = (Object.entries(importiPerSorte) as [TipoGiocata, number][]).filter(([, v]) => v > 0);

  return (
    <div className="schedina-card overflow-hidden">
      <div className="bg-gradient-to-r from-lotto-blue to-[hsl(210_55%_40%)] px-3 py-2">
        <h2 className="text-white font-bold text-xs uppercase tracking-widest">
          📊 Analisi Probabilistica
        </h2>
      </div>
      <div className="p-3 bg-card/60 space-y-3 text-[13px] font-light">
        {sortiAttive.length > 0 && numeriGiocati > 0 ? (
          sortiAttive.map(([tipo, importo]) => (
            <SorteAnalisi key={tipo} tipo={tipo} numeriGiocati={numeriGiocati} importo={importo} numRuote={numRuote} />
          ))
        ) : (
          <p className="text-[11px] text-muted-foreground text-center py-2">Seleziona numeri e importi per vedere l'analisi</p>
        )}

        <CollapsibleSection title="Probabilità di riferimento" defaultOpen={false}>
          <div className="space-y-[3px]">
            {TIPI_GIOCATA.map(t => {
              const p = calcolaProbabilitaSingola(t);
              const inv = p > 0 ? Math.round(1 / p) : 0;
              return (
                <div key={t} className="flex justify-between items-center py-1 px-2.5 rounded-lg bg-lotto-cream">
                  <span className="font-semibold text-[11px] uppercase tracking-wide text-foreground">{t}</span>
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
          <div className="bg-surface/80 p-3 rounded-lg border border-border text-center">
            <div className="flex items-center justify-center gap-1.5 text-[11px] sm:text-sm text-foreground font-light">
              <span className="font-semibold italic">P</span>
              <span className="text-muted-foreground">=</span>
              <span className="text-sm">Σ</span>
              <Frac
                num={<span className="flex items-center gap-0.5"><span className="italic">C(k,j)</span><span className="text-muted-foreground">×</span><span className="italic">C(90-k,5-j)</span></span>}
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
          <p className="text-[11px] font-semibold text-lotto-red uppercase">
            ⚠️ Vantaggio del banco ≈ 50%
          </p>
        </CollapsibleSection>
      </div>
    </div>
  );
}