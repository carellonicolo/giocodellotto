import { cn } from '@/lib/utils';

interface GrigliaNumeriProps {
  numeriSelezionati: number[];
  numeriIndovinati?: number[];
  onToggle: (n: number) => void;
  disabled?: boolean;
}

export function GrigliaNumeri({ numeriSelezionati, numeriIndovinati = [], onToggle, disabled }: GrigliaNumeriProps) {
  return (
    <div className="p-2 rounded bg-[hsl(var(--lotto-cream))] border border-border">
      {/* Row labels */}
      <div className="grid grid-cols-[auto_1fr] gap-x-2">
        {Array.from({ length: 9 }, (_, row) => (
          <div key={row} className="contents">
            <div className="flex items-center justify-end pr-1">
              <span className="text-[10px] font-bold text-muted-foreground font-['Oswald']">
                {row * 10 + 1}-{row * 10 + 10}
              </span>
            </div>
            <div className="grid grid-cols-10 gap-[3px] mb-[3px]">
              {Array.from({ length: 10 }, (_, col) => {
                const n = row * 10 + col + 1;
                const selezionato = numeriSelezionati.includes(n);
                const indovinato = numeriIndovinati.includes(n);
                return (
                  <button
                    key={n}
                    disabled={disabled}
                    onClick={() => onToggle(n)}
                    className={cn(
                      'numero-cell',
                      selezionato && indovinato && 'bg-[hsl(var(--lotto-green))] text-white border-[hsl(var(--lotto-green))] ring-2 ring-[hsl(var(--lotto-gold))]',
                      selezionato && !indovinato && 'bg-[hsl(var(--lotto-red))] text-white border-[hsl(var(--lotto-red))] shadow-md',
                      !selezionato && 'bg-white text-foreground border-border/60 hover:bg-[hsl(var(--lotto-red)/0.08)] hover:border-[hsl(var(--lotto-red)/0.4)]',
                      disabled && 'opacity-50 cursor-not-allowed hover:scale-100',
                    )}
                  >
                    {n}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
