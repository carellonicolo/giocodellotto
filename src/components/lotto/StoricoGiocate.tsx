import type { RisultatoGiocata, StatisticheSessione } from '@/lib/lotto/types';

interface StoricoGiocateProps {
  storico: RisultatoGiocata[];
  statistiche: StatisticheSessione;
}

export function StoricoGiocate({ storico, statistiche }: StoricoGiocateProps) {
  const bilancio = statistiche.totaleVinto - statistiche.totaleSpeso;
  const pct = statistiche.totaleGiocate > 0
    ? ((statistiche.vittorie / statistiche.totaleGiocate) * 100).toFixed(1)
    : '0';

  return (
    <div className="schedina-card overflow-hidden">
      <div className="bg-[hsl(var(--lotto-green))] px-3 py-2">
        <h2 className="text-white font-['Oswald'] font-bold text-xs uppercase tracking-widest">
          📈 Statistiche Sessione
        </h2>
      </div>
      <div className="p-3 bg-white/60 space-y-2 text-sm">
        <div className="grid grid-cols-2 gap-1.5">
          <Stat label="Giocate" value={statistiche.totaleGiocate.toString()} />
          <Stat label="Vittorie" value={`${statistiche.vittorie} (${pct}%)`} />
          <Stat label="Speso" value={`€${statistiche.totaleSpeso.toFixed(2)}`} color="red" />
          <Stat label="Vinto" value={`€${statistiche.totaleVinto.toFixed(2)}`} color="green" />
        </div>
        <div className={`p-2 rounded text-center font-bold font-['Oswald'] uppercase tracking-wider text-xs ${bilancio >= 0 ? 'bg-[hsl(var(--lotto-green)/0.1)] text-[hsl(var(--lotto-green))]' : 'bg-[hsl(var(--lotto-red)/0.1)] text-[hsl(var(--lotto-red))]'}`}>
          Bilancio: €{bilancio.toFixed(2)}
        </div>
        {storico.length > 0 && (
          <div className="space-y-[2px] max-h-40 overflow-y-auto">
            {storico.slice(0, 10).map((r, i) => (
              <div key={i} className="flex justify-between items-center py-0.5 px-2 rounded bg-[hsl(var(--lotto-cream))] text-[10px]">
                <span className="font-['Oswald']">{r.giocata.tipo} — {r.giocata.numeri.join(', ')}</span>
                <span className={r.totaleVinto > 0 ? 'text-[hsl(var(--lotto-green))] font-bold' : 'text-muted-foreground'}>
                  {r.totaleVinto > 0 ? `+€${r.totaleVinto.toFixed(2)}` : '—'}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function Stat({ label, value, color }: { label: string; value: string; color?: 'red' | 'green' }) {
  return (
    <div className="bg-[hsl(var(--lotto-cream))] p-1.5 rounded text-center">
      <p className="text-[8px] text-muted-foreground uppercase font-['Oswald']">{label}</p>
      <p className={`font-bold font-['Oswald'] text-xs ${color === 'red' ? 'text-[hsl(var(--lotto-red))]' : color === 'green' ? 'text-[hsl(var(--lotto-green))]' : 'text-foreground'}`}>
        {value}
      </p>
    </div>
  );
}
