import { cn } from '@/lib/utils';
import { RUOTE, type Ruota } from '@/lib/lotto/types';

interface SelettoreRuoteProps {
  ruoteSelezionate: Ruota[];
  onToggle: (r: Ruota) => void;
  onToggleTutte: () => void;
  disabled?: boolean;
}

const COLORI_RUOTE: Record<string, string> = {
  Bari: '0 70% 45%',
  Cagliari: '25 75% 48%',
  Firenze: '270 55% 48%',
  Genova: '210 65% 45%',
  Milano: '130 55% 38%',
  Napoli: '45 80% 48%',
  Palermo: '340 65% 45%',
  Roma: '15 75% 42%',
  Torino: '190 60% 40%',
  Venezia: '165 55% 38%',
  Nazionale: '220 50% 30%',
};

export function SelettoreRuote({ ruoteSelezionate, onToggle, onToggleTutte, disabled }: SelettoreRuoteProps) {
  const tutteSelezionate = ruoteSelezionate.length === RUOTE.length;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-bold text-[hsl(var(--lotto-red))] uppercase tracking-widest font-['Oswald']">
          Scegli le Ruote
        </h3>
        <button
          onClick={onToggleTutte}
          disabled={disabled}
          className={cn(
            'ruota-badge text-[10px] px-3 py-1 rounded border-2 transition-all font-bold uppercase',
            tutteSelezionate
              ? 'bg-[hsl(var(--lotto-red))] text-white border-[hsl(var(--lotto-red))]'
              : 'bg-white text-muted-foreground border-border hover:border-[hsl(var(--lotto-red)/0.5)]'
          )}
        >
          {tutteSelezionate ? '✓ Tutte' : 'Tutte'}
        </button>
      </div>
      <div className="grid grid-cols-4 gap-1.5 p-2 rounded bg-[hsl(var(--lotto-cream))] border border-border">
        {RUOTE.map(ruota => {
          const sel = ruoteSelezionate.includes(ruota);
          const hsl = COLORI_RUOTE[ruota];
          return (
            <button
              key={ruota}
              disabled={disabled}
              onClick={() => onToggle(ruota)}
              className={cn(
                'ruota-badge px-1 py-1.5 text-[11px] font-bold rounded border-2 transition-all uppercase',
                sel
                  ? 'text-white shadow-md'
                  : 'bg-white text-foreground border-border/60 hover:shadow-sm',
                disabled && 'opacity-50 cursor-not-allowed',
                ruota === 'Nazionale' && 'col-span-2'
              )}
              style={sel ? {
                backgroundColor: `hsl(${hsl})`,
                borderColor: `hsl(${hsl})`,
              } : undefined}
            >
              {ruota}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export { COLORI_RUOTE };
