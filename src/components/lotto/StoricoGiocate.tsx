import type { RisultatoGiocata, StatisticheSessione } from '@/lib/lotto/types';

interface StoricoGiocateProps {
  storico: RisultatoGiocata[];
  statistiche: StatisticheSessione;
}

export function StoricoGiocate({ storico, statistiche }: StoricoGiocateProps) {
  const bilancio = statistiche.totaleVinto - statistiche.totaleSpeso;
  const percentualeVittorie = statistiche.totaleGiocate > 0
    ? ((statistiche.vittorie / statistiche.totaleGiocate) * 100).toFixed(1)
    : '0';

  return (
    <div className="schedina-border rounded-lg bg-card overflow-hidden">
      <div className="bg-[hsl(var(--lotto-green))] px-4 py-2">
        <h2 className="text-white font-['Oswald'] font-bold text-sm uppercase tracking-widest">
          📈 Statistiche Sessione
        </h2>
      </div>
      <div className="p-4 space-y-3 text-sm">
        <div className="grid grid-cols-2 gap-2">
          <Stat label="Giocate" value={statistiche.totaleGiocate.toString()} />
          <Stat label="Vittorie" value={`${statistiche.vittorie} (${percentualeVittorie}%)`} />
          <Stat label="Speso" value={`€${statistiche.totaleSpeso.toFixed(2)}`} color="red" />
          <Stat label="Vinto" value={`€${statistiche.totaleVinto.toFixed(2)}`} color="green" />
        </div>
        <div className={`p-3 rounded text-center font-bold font-['Oswald'] uppercase tracking-wider ${bilancio >= 0 ? 'bg-[hsl(var(--lotto-green)/0.1)] text-[hsl(var(--lotto-green))]' : 'bg-[hsl(var(--lotto-red)/0.1)] text-[hsl(var(--lotto-red))]'}`}>
          Bilancio: €{bilancio.toFixed(2)}
        </div>

        {storico.length > 0 && (
          <div className="space-y-1 max-h-48 overflow-y-auto">
            <h4 className="text-[10px] font-bold text-muted-foreground uppercase font-['Oswald'] tracking-wider">
              Ultime giocate
            </h4>
            {storico.slice(0, 10).map((r, i) => (
              <div key={i} className="flex justify-between items-center py-1 px-2 rounded bg-[hsl(var(--lotto-cream))] border border-border/50 text-[11px]">
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
    <div className="bg-[hsl(var(--lotto-cream))] p-2 rounded border border-border text-center">
      <p className="text-[9px] text-muted-foreground uppercase font-['Oswald'] tracking-wider">{label}</p>
      <p className={`font-bold font-['Oswald'] ${color === 'red' ? 'text-[hsl(var(--lotto-red))]' : color === 'green' ? 'text-[hsl(var(--lotto-green))]' : 'text-foreground'}`}>
        {value}
      </p>
    </div>
  );
}
