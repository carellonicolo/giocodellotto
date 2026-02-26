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
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="bg-[hsl(var(--lotto-salmon))] text-white" role="row">
            <th className="text-left py-1.5 px-2 text-[10px] font-bold uppercase tracking-wider font-['Oswald']">Ruota</th>
            {[1, 2, 3, 4, 5].map(i => (
              <th key={i} className="text-center py-1.5 px-1 text-[10px] font-bold font-['Oswald']">{i}°</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {RUOTE.map((ruota, rIdx) => {
            const numeri = estrazione[ruota] || [];
            const isEmpty = numeri.length === 0;
            const isGiocata = ruoteGiocate.includes(ruota);
            const hsl = COLORI_RUOTE[ruota];
            return (
              <tr key={ruota} className={cn(
                'border-b border-[hsl(var(--lotto-salmon)/0.2)]',
                isGiocata && 'bg-[hsl(var(--lotto-peach)/0.5)]',
                rIdx % 2 === 0 && !isGiocata && 'bg-white/30'
              )}>
                <td className="py-1 px-2 font-bold text-[10px] uppercase font-['Oswald'] tracking-wide"
                    style={{ color: `hsl(${hsl})` }}>
                  {isGiocata && '▸ '}{ruota}
                </td>
                {isEmpty
                  ? Array.from({ length: 5 }).map((_, idx) => (
                      <td key={idx} className="text-center py-1 px-1">
                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full text-[10px] font-bold font-['Oswald'] text-muted-foreground/30">
                          —
                        </span>
                      </td>
                    ))
                  : numeri.map((n, idx) => {
                      const indovinato = numeriGiocati.includes(n) && isGiocata;
                      return (
                        <td key={idx} className="text-center py-1 px-1">
                          <span className={cn(
                            "inline-flex items-center justify-center w-7 h-7 rounded-full text-[10px] font-bold font-['Oswald']",
                            indovinato
                              ? 'bg-[hsl(var(--lotto-green))] text-white ring-2 ring-[hsl(var(--lotto-gold))] scale-110 shadow-md'
                              : isGiocata
                                ? 'bg-white border border-[hsl(var(--lotto-salmon)/0.4)] text-foreground'
                                : 'text-muted-foreground',
                            isAnimating && 'animate-scale-in'
                          )}
                          style={isAnimating ? { animationDelay: `${(rIdx * 5 + idx) * 50}ms`, animationFillMode: 'both' } : undefined}
                          >
                            {n}
                          </span>
                        </td>
                      );
                    })
                }
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
