import { cn } from '@/lib/utils';
import { RUOTE, type Ruota } from '@/lib/lotto/types';

interface SelettoreRuoteProps {
  ruoteSelezionate: Ruota[];
  onToggle: (r: Ruota) => void;
  onToggleTutte: () => void;
  disabled?: boolean;
}

const COLORI_RUOTE: Record<string, string> = {
  Bari: 'hsl(0 70% 50%)',
  Cagliari: 'hsl(30 70% 50%)',
  Firenze: 'hsl(270 70% 50%)',
  Genova: 'hsl(210 70% 50%)',
  Milano: 'hsl(120 70% 40%)',
  Napoli: 'hsl(45 80% 50%)',
  Palermo: 'hsl(340 70% 50%)',
  Roma: 'hsl(15 80% 45%)',
  Torino: 'hsl(190 70% 45%)',
  Venezia: 'hsl(160 60% 40%)',
  Nazionale: 'hsl(220 60% 30%)',
};

export function SelettoreRuote({ ruoteSelezionate, onToggle, onToggleTutte, disabled }: SelettoreRuoteProps) {
  const tutteSelezionate = ruoteSelezionate.length === RUOTE.length;

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Ruote</h3>
        <button
          onClick={onToggleTutte}
          disabled={disabled}
          className={cn(
            'text-xs px-3 py-1 rounded-full border transition-colors font-medium',
            tutteSelezionate
              ? 'bg-primary text-primary-foreground border-primary'
              : 'bg-card text-muted-foreground border-border hover:bg-accent'
          )}
        >
          {tutteSelezionate ? '✓ Tutte' : 'Tutte'}
        </button>
      </div>
      <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
        {RUOTE.map(ruota => {
          const sel = ruoteSelezionate.includes(ruota);
          return (
            <button
              key={ruota}
              disabled={disabled}
              onClick={() => onToggle(ruota)}
              className={cn(
                'px-2 py-1.5 text-xs font-semibold rounded border-2 transition-all duration-150',
                sel
                  ? 'text-white shadow-md scale-105'
                  : 'bg-card text-card-foreground border-border hover:bg-accent',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
              style={sel ? { backgroundColor: COLORI_RUOTE[ruota], borderColor: COLORI_RUOTE[ruota] } : undefined}
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
