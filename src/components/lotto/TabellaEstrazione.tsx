import { RUOTE, type Ruota } from '@/lib/lotto/types';
import type { RisultatoEstrazione } from '@/lib/lotto/types';
import { cn } from '@/lib/utils';
import { COLORI_RUOTE } from './SelettoreRuote';

interface TabellaEstrazioneProps {
  estrazione: RisultatoEstrazione;
  numeriGiocati: number[];
  ruoteGiocate: Ruota[];
  isAnimating?: boolean;
}

export function TabellaEstrazione({ estrazione, numeriGiocati, ruoteGiocate, isAnimating }: TabellaEstrazioneProps) {
  return (
    <div className="overflow-x-auto rounded border border-border bg-[hsl(var(--lotto-cream))]">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="lotto-header text-white">
            <th className="text-left py-2 px-3 text-[11px] font-bold uppercase tracking-wider font-['Oswald']">Ruota</th>
            {[1, 2, 3, 4, 5].map(i => (
              <th key={i} className="text-center py-2 px-2 text-[11px] font-bold font-['Oswald']">{i}° Estr.</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {RUOTE.map((ruota, rIdx) => {
            const numeri = estrazione[ruota] || [];
            const isGiocata = ruoteGiocate.includes(ruota);
            const hsl = COLORI_RUOTE[ruota];
            return (
              <tr key={ruota} className={cn(
                'border-b border-border/30 transition-colors',
                isGiocata && 'bg-[hsl(var(--lotto-red)/0.05)]',
                rIdx % 2 === 0 && !isGiocata && 'bg-white/50'
              )}>
                <td className="py-1.5 px-3 font-bold text-[11px] uppercase font-['Oswald'] tracking-wide"
                    style={{ color: `hsl(${hsl})` }}>
                  {isGiocata && <span className="mr-1">▸</span>}
                  {ruota}
                </td>
                {numeri.map((n, idx) => {
                  const indovinato = numeriGiocati.includes(n) && isGiocata;
                  return (
                    <td key={idx} className="text-center py-1.5 px-1">
                      <span className={cn(
                        "inline-flex items-center justify-center w-8 h-8 rounded-full text-[11px] font-bold font-['Oswald'] transition-all",
                        indovinato
                          ? 'bg-[hsl(var(--lotto-green))] text-white ring-2 ring-[hsl(var(--lotto-gold))] scale-110 shadow-md'
                          : isGiocata
                            ? 'bg-white border border-border text-foreground'
                            : 'text-muted-foreground',
                        isAnimating && 'animate-scale-in'
                      )}
                      style={isAnimating ? { animationDelay: `${(rIdx * 5 + idx) * 60}ms`, animationFillMode: 'both' } : undefined}
                      >
                        {n}
                      </span>
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
