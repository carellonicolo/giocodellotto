import { cn } from '@/lib/utils';

interface GrigliaNumeriProps {
  numeriSelezionati: number[];
  numeriIndovinati?: number[];
  onToggle: (n: number) => void;
  disabled?: boolean;
}

export function GrigliaNumeri({ numeriSelezionati, numeriIndovinati = [], onToggle, disabled }: GrigliaNumeriProps) {
  return (
    <div className="grid grid-cols-10 gap-[2px] sm:gap-[3px]">
      {Array.from({ length: 90 }, (_, i) => i + 1).map(n => {
        const selezionato = numeriSelezionati.includes(n);
        const indovinato = numeriIndovinati.includes(n);
        return (
          <button
            key={n}
            disabled={disabled}
            onClick={() => onToggle(n)}
            className={cn(
              'lotto-bubble border-[hsl(var(--lotto-salmon))] w-5 h-5 text-[7px] sm:w-6 sm:h-6 sm:text-[9px]',
              selezionato && indovinato && 'matched',
              selezionato && !indovinato && 'selected',
              !selezionato && 'bg-white/80 text-foreground hover:bg-[hsl(var(--lotto-peach))]',
              disabled && 'opacity-50 cursor-not-allowed hover:!scale-100',
            )}
          >
            {n}
          </button>
        );
      })}
    </div>
  );
}
