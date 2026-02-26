import { cn } from '@/lib/utils';

interface GrigliaNumeriProps {
  numeriSelezionati: number[];
  numeriIndovinati?: number[];
  onToggle: (n: number) => void;
  disabled?: boolean;
}

export function GrigliaNumeri({ numeriSelezionati, numeriIndovinati = [], onToggle, disabled }: GrigliaNumeriProps) {
  return (
    <div className="grid grid-cols-10 gap-1">
      {Array.from({ length: 90 }, (_, i) => i + 1).map(n => {
        const selezionato = numeriSelezionati.includes(n);
        const indovinato = numeriIndovinati.includes(n);
        return (
          <button
            key={n}
            disabled={disabled}
            onClick={() => onToggle(n)}
            className={cn(
              'w-8 h-8 text-xs font-bold rounded border transition-all duration-150',
              'hover:scale-110 active:scale-95',
              selezionato && indovinato && 'bg-green-600 text-white border-green-700 ring-2 ring-green-400',
              selezionato && !indovinato && 'bg-primary text-primary-foreground border-primary shadow-md',
              !selezionato && 'bg-card text-card-foreground border-border hover:bg-accent hover:text-accent-foreground',
              disabled && 'opacity-50 cursor-not-allowed hover:scale-100',
            )}
          >
            {n}
          </button>
        );
      })}
    </div>
  );
}
