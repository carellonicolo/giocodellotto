import { TrendingUp, Target, Coins, Trophy, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { RisultatoGiocata, StatisticheSessione } from '@/lib/lotto/types';

interface StoricoGiocateProps {
  storico: RisultatoGiocata[];
  statistiche: StatisticheSessione;
  onResetStatistiche?: () => void;
}

export function StoricoGiocate({ storico, statistiche, onResetStatistiche }: StoricoGiocateProps) {
  const bilancio = statistiche.totaleVinto - statistiche.totaleSpeso;
  const pct = statistiche.totaleGiocate > 0
    ? ((statistiche.vittorie / statistiche.totaleGiocate) * 100).toFixed(1)
    : '0';

  return (
    <div className="schedina-card overflow-hidden">
      <div className="bg-gradient-to-r from-[hsl(var(--lotto-green))] to-[hsl(145_50%_28%)] px-3 py-2 flex items-center justify-between">
        <h2 className="text-white font-bold text-xs uppercase tracking-widest">
          📈 Statistiche Sessione
        </h2>
        {statistiche.totaleGiocate > 0 && onResetStatistiche && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onResetStatistiche}
            className="text-white/70 hover:text-white hover:bg-white/20 h-6 px-2 text-[9px] uppercase gap-1"
            aria-label="Azzera statistiche"
          >
            <Trash2 className="h-3 w-3" />
            Azzera
          </Button>
        )}
      </div>
      <div className="p-3 bg-white/60 space-y-2 text-sm">
        <div className="grid grid-cols-2 gap-1.5">
          <Stat label="Giocate" value={statistiche.totaleGiocate.toString()} icon={<Target className="h-3 w-3" />} />
          <Stat label="Vittorie" value={`${statistiche.vittorie} (${pct}%)`} icon={<Trophy className="h-3 w-3" />} />
          <Stat label="Speso" value={`€${statistiche.totaleSpeso.toFixed(2)}`} color="red" icon={<Coins className="h-3 w-3" />} />
          <Stat label="Vinto" value={`€${statistiche.totaleVinto.toFixed(2)}`} color="green" icon={<TrendingUp className="h-3 w-3" />} />
        </div>
        <div className={`p-2 rounded text-center font-bold uppercase tracking-wider text-xs ${bilancio >= 0 ? 'bg-[hsl(var(--lotto-green)/0.1)] text-[hsl(var(--lotto-green))]' : 'bg-[hsl(var(--lotto-red)/0.1)] text-[hsl(var(--lotto-red))]'}`}>
          Bilancio: €{bilancio.toFixed(2)}
        </div>
        {storico.length > 0 && (
          <div className="space-y-[2px] max-h-40 overflow-y-auto">
            {storico.slice(0, 10).map((r, i) => {
              const sorti = Object.keys(r.giocata.importiPerSorte).join('+');
              return (
                <div key={i} className="flex justify-between items-center py-0.5 px-2 rounded bg-[hsl(var(--lotto-cream))] text-[10px]">
                  <span>{sorti} — {r.giocata.numeri.join(', ')}</span>
                  <span className={r.totaleVinto > 0 ? 'text-[hsl(var(--lotto-green))] font-bold' : 'text-muted-foreground'}>
                    {r.totaleVinto > 0 ? `+€${r.totaleVinto.toFixed(2)}` : '—'}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value, color, icon }: { label: string; value: string; color?: 'red' | 'green'; icon?: React.ReactNode }) {
  return (
    <div className="glass-panel !rounded-lg !p-1.5 text-center">
      <div className="flex items-center justify-center gap-1 mb-0.5">
        {icon && <span className="text-muted-foreground">{icon}</span>}
        <p className="text-[8px] text-muted-foreground uppercase">{label}</p>
      </div>
      <p className={`font-bold text-xs ${color === 'red' ? 'text-[hsl(var(--lotto-red))]' : color === 'green' ? 'text-[hsl(var(--lotto-green))]' : 'text-foreground'}`}>
        {value}
      </p>
    </div>
  );
}
