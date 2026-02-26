import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
    <Card className="border-2 border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          📈 Statistiche Sessione
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3 text-sm">
        <div className="grid grid-cols-2 gap-2">
          <Stat label="Giocate" value={statistiche.totaleGiocate.toString()} />
          <Stat label="Vittorie" value={`${statistiche.vittorie} (${percentualeVittorie}%)`} />
          <Stat label="Speso" value={`€${statistiche.totaleSpeso.toFixed(2)}`} />
          <Stat label="Vinto" value={`€${statistiche.totaleVinto.toFixed(2)}`} />
        </div>
        <div className={`p-3 rounded-lg text-center font-bold ${bilancio >= 0 ? 'bg-green-100 text-green-800' : 'bg-destructive/10 text-destructive'}`}>
          Bilancio: €{bilancio.toFixed(2)}
        </div>

        {storico.length > 0 && (
          <div className="space-y-1 max-h-48 overflow-y-auto">
            <h4 className="text-xs font-semibold text-muted-foreground uppercase">Ultime giocate</h4>
            {storico.slice(0, 10).map((r, i) => (
              <div key={i} className="flex justify-between items-center py-1 px-2 rounded bg-card border border-border/50 text-xs">
                <span>{r.giocata.tipo} — {r.giocata.numeri.join(', ')}</span>
                <span className={r.totaleVinto > 0 ? 'text-green-700 font-bold' : 'text-muted-foreground'}>
                  {r.totaleVinto > 0 ? `+€${r.totaleVinto.toFixed(2)}` : '—'}
                </span>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-card p-2 rounded border border-border">
      <p className="text-[10px] text-muted-foreground uppercase">{label}</p>
      <p className="font-bold text-foreground">{value}</p>
    </div>
  );
}
