import { useMemo, useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { ChevronDown, TrendingDown, BarChart3 } from 'lucide-react';
import type { RisultatoGiocata } from '@/lib/lotto/types';
import { calcolaCostoTotale } from '@/lib/lotto/engine';

interface GraficiStatisticheProps {
  storico: RisultatoGiocata[];
}

function CollapsibleChart({ title, icon, defaultOpen = true, children }: { title: string; icon: React.ReactNode; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="glass-panel !rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-3 py-2 bg-lotto-cream/60 hover:bg-lotto-cream/90 transition-colors text-left"
      >
        <h3 className="font-medium text-[10px] uppercase text-muted-foreground tracking-wider flex items-center gap-1.5">
          {icon} {title}
        </h3>
        <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`grid transition-all duration-300 ease-in-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <div className="p-3">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function GraficiStatistiche({ storico }: GraficiStatisticheProps) {
  const datiBilancio = useMemo(() => {
    if (storico.length === 0) return [];
    const reversed = [...storico].reverse();
    let bilancio = 0;
    let speso = 0;
    let vinto = 0;
    return reversed.map((r, i) => {
      const costo = calcolaCostoTotale(r.giocata.importiPerSorte, r.giocata.ruote.length);
      speso += costo;
      vinto += r.totaleVinto;
      bilancio = vinto - speso;
      return {
        n: i + 1,
        bilancio: Math.round(bilancio * 100) / 100,
        speso: Math.round(speso * 100) / 100,
        vinto: Math.round(vinto * 100) / 100,
      };
    });
  }, [storico]);

  const datiFrequenza = useMemo(() => {
    if (storico.length === 0) return [];
    const freq = new Array(90).fill(0);
    for (const r of storico) {
      for (const ruota of Object.keys(r.estrazione)) {
        for (const n of r.estrazione[ruota]) {
          freq[n - 1]++;
        }
      }
    }
    const media = freq.reduce((a, b) => a + b, 0) / 90;
    return freq.map((count, i) => ({ numero: i + 1, frequenza: count, media: Math.round(media * 100) / 100 }));
  }, [storico]);

  if (storico.length < 2) {
    return null;
  }

  return (
    <div className="schedina-card overflow-hidden">
      <div className="bg-gradient-to-r from-lotto-blue to-[hsl(210_50%_35%)] px-3 py-2">
        <h2 className="text-white font-bold text-xs uppercase tracking-widest">
          📉 Grafici & Andamento
        </h2>
      </div>
      <div className="p-3 bg-card/60 space-y-3">
        {/* Balance chart */}
        <CollapsibleChart title="Andamento Bilancio" icon={<TrendingDown className="h-3 w-3" />}>
          <p className="text-[10px] text-muted-foreground mb-2">
            Il bilancio converge verso il negativo: è la <strong className="text-foreground">legge dei grandi numeri</strong> che dimostra il vantaggio del banco.
          </p>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={datiBilancio} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="n" tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{ fontSize: 11, borderRadius: 8, background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', color: 'hsl(var(--foreground))' }}
                  formatter={(value: number, name: string) => [
                    `€${value.toFixed(2)}`,
                    name === 'bilancio' ? 'Bilancio' : name === 'speso' ? 'Speso' : 'Vinto'
                  ]}
                  labelFormatter={(l) => `Giocata #${l}`}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <ReferenceLine y={0} stroke="hsl(var(--muted-foreground))" strokeDasharray="3 3" />
                <Line type="monotone" dataKey="bilancio" stroke="hsl(var(--lotto-red))" strokeWidth={2} dot={false} />
                <Line type="monotone" dataKey="vinto" stroke="hsl(var(--lotto-green))" strokeWidth={1} dot={false} strokeDasharray="4 2" />
                <Line type="monotone" dataKey="speso" stroke="hsl(var(--lotto-orange))" strokeWidth={1} dot={false} strokeDasharray="4 2" />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-4 mt-1.5 text-[9px] text-muted-foreground">
            <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-lotto-red inline-block rounded" /> Bilancio</span>
            <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-lotto-green inline-block rounded" /> Vinto</span>
            <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-lotto-orange inline-block rounded" /> Speso</span>
          </div>
        </CollapsibleChart>

        {/* Frequency chart */}
        <CollapsibleChart title="Frequenza Numeri Estratti" icon={<BarChart3 className="h-3 w-3" />} defaultOpen={false}>
          <p className="text-[10px] text-muted-foreground mb-2">
            Con molte estrazioni, ogni numero tende a uscire con la stessa frequenza: <strong className="text-foreground">non esistono numeri "caldi" o "freddi"</strong>.
          </p>
          <div className="h-44">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={datiFrequenza} margin={{ top: 5, right: 5, left: -15, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="numero" tick={{ fontSize: 7, fill: 'hsl(var(--muted-foreground))' }} interval={8} stroke="hsl(var(--muted-foreground))" />
                <YAxis tick={{ fontSize: 9, fill: 'hsl(var(--muted-foreground))' }} stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{ fontSize: 11, borderRadius: 8, background: 'hsl(var(--card))', border: '1px solid hsl(var(--border))', color: 'hsl(var(--foreground))' }}
                  formatter={(value: number, name: string) => [value, name === 'frequenza' ? 'Uscite' : 'Media']}
                  labelFormatter={(l) => `Numero ${l}`}
                  labelStyle={{ color: 'hsl(var(--foreground))' }}
                />
                <Bar dataKey="frequenza" fill="hsl(var(--lotto-blue))" radius={[1, 1, 0, 0]} />
                <ReferenceLine y={datiFrequenza[0]?.media ?? 0} stroke="hsl(var(--lotto-red))" strokeDasharray="4 2" label={{ value: 'Media', fontSize: 9, fill: 'hsl(var(--lotto-red))' }} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CollapsibleChart>
      </div>
    </div>
  );
}