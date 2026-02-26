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
          <tr className="border-b-2 border-border">
            <th className="text-left py-2 px-3 text-muted-foreground font-semibold text-xs uppercase">Ruota</th>
            {[1, 2, 3, 4, 5].map(i => (
              <th key={i} className="text-center py-2 px-2 text-muted-foreground font-semibold text-xs">{i}°</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {RUOTE.map(ruota => {
            const numeri = estrazione[ruota] || [];
            const isGiocata = ruoteGiocate.includes(ruota);
            return (
              <tr key={ruota} className={cn(
                'border-b border-border/50 transition-colors',
                isGiocata && 'bg-accent/30'
              )}>
                <td className="py-1.5 px-3 font-bold text-xs" style={{ color: COLORI_RUOTE[ruota] }}>
                  {ruota}
                </td>
                {numeri.map((n, idx) => {
                  const indovinato = numeriGiocati.includes(n) && isGiocata;
                  return (
                    <td key={idx} className="text-center py-1.5 px-2">
                      <span className={cn(
                        'inline-flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-all',
                        indovinato
                          ? 'bg-green-600 text-white ring-2 ring-green-400 scale-110'
                          : 'bg-muted text-muted-foreground',
                        isAnimating && 'animate-scale-in'
                      )}
                      style={isAnimating ? { animationDelay: `${idx * 200}ms`, animationFillMode: 'both' } : undefined}
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
