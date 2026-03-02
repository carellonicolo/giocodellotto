import { memo } from 'react';
import { cn } from '@/lib/utils';

interface GrigliaNumeriProps {
  numeriSelezionati: number[];
  numeriIndovinati?: number[];
  onToggle: (n: number) => void;
  disabled?: boolean;
}

const NUMERI = Array.from({ length: 90 }, (_, i) => i + 1);

export const GrigliaNumeri = memo(function GrigliaNumeri({ numeriSelezionati, numeriIndovinati = [], onToggle, disabled }: GrigliaNumeriProps) {
  return (
    <div className="grid grid-cols-10 gap-[2px] sm:gap-[3px]" role="group" aria-label="Selezione numeri da 1 a 90">
      {NUMERI.map(n => {
        const selezionato = numeriSelezionati.includes(n);
        const indovinato = numeriIndovinati.includes(n);
        return (
          <button
            key={n}
            disabled={disabled}
            onClick={() => onToggle(n)}
            aria-label={`Numero ${n}${selezionato ? ', selezionato' : ''}${indovinato ? ', indovinato' : ''}`}
            aria-pressed={selezionato}
            className={cn(
              'lotto-bubble border-lotto-salmon w-6 h-6 text-[8px] sm:w-7 sm:h-7 sm:text-[10px]',
              selezionato && indovinato && 'matched',
              selezionato && !indovinato && 'selected',
              !selezionato && 'bg-surface text-foreground hover:bg-lotto-peach',
              disabled && 'opacity-50 cursor-not-allowed hover:!scale-100',
            )}
          >
            {n}
          </button>
        );
      })}
    </div>
  );
});