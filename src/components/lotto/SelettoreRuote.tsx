import { cn } from '@/lib/utils';
import { RUOTE, type Ruota } from '@/lib/lotto/types';

interface SelettoreRuoteProps {
  ruoteSelezionate: Ruota[];
  onToggle: (r: Ruota) => void;
  onToggleTutte: () => void;
  disabled?: boolean;
}

export function SelettoreRuote({ ruoteSelezionate, onToggle, onToggleTutte, disabled }: SelettoreRuoteProps) {
  const tutteSelezionate = ruoteSelezionate.length === RUOTE.length;
  return (
    <div className="flex flex-col gap-[1px] sm:gap-[2px]">
      {RUOTE.map(ruota => {
        const sel = ruoteSelezionate.includes(ruota);
        return (
          <div key={ruota} className="ruota-row py-[1px] sm:py-0.5">
            <button
              disabled={disabled}
              onClick={() => onToggle(ruota)}
              className={cn(
                'w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-[hsl(var(--lotto-salmon))] flex-shrink-0 transition-all',
                sel ? 'bg-[hsl(var(--lotto-orange))]' : 'bg-white/80',
                disabled && 'opacity-50 cursor-not-allowed'
              )}
            />
            <span className={cn(
              'text-[7px] sm:text-[9px] font-bold uppercase leading-none whitespace-nowrap',
              sel ? 'text-[hsl(var(--lotto-orange))]' : 'text-foreground/70'
            )}>
              {ruota === 'Nazionale' ? 'NAZ.' : ruota.toUpperCase()}
            </span>
          </div>
        );
      })}
      <div className="ruota-row mt-0.5 sm:mt-1 pt-0.5 sm:pt-1 border-t border-[hsl(var(--lotto-salmon)/0.3)]">
        <button
          disabled={disabled}
          onClick={onToggleTutte}
          className={cn(
            'w-3 h-3 sm:w-4 sm:h-4 rounded-full border-2 border-[hsl(var(--lotto-salmon))] flex-shrink-0 transition-all',
            tutteSelezionate ? 'bg-[hsl(var(--lotto-orange))]' : 'bg-white/80',
            disabled && 'opacity-50 cursor-not-allowed'
          )}
        />
        <span className={cn(
          'text-[7px] sm:text-[9px] font-bold uppercase leading-none',
          tutteSelezionate ? 'text-[hsl(var(--lotto-orange))]' : 'text-foreground/70'
        )}>
          TUTTE
        </span>
      </div>
    </div>
  );
}

// Keep for TabellaEstrazione
export const COLORI_RUOTE: Record<string, string> = {
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
