import { cn } from '@/lib/utils';
import { TIPI_GIOCATA, NUMERI_MINIMI, type TipoGiocata } from '@/lib/lotto/types';

interface SelettoreTipoProps {
  tipo: TipoGiocata;
  onChange: (t: TipoGiocata) => void;
  numeriSelezionati: number;
  disabled?: boolean;
}

export function SelettoreTipo({ tipo, onChange, numeriSelezionati, disabled }: SelettoreTipoProps) {
  return (
    <div className="space-y-[2px]">
      {TIPI_GIOCATA.map(t => {
        const minimo = NUMERI_MINIMI[t];
        const abilitato = numeriSelezionati >= minimo;
        const isSelected = tipo === t;
        return (
          <button
            key={t}
            disabled={disabled || !abilitato}
            onClick={() => onChange(t)}
            className={cn(
              "w-full flex items-center gap-2 py-1 px-2 rounded transition-all text-left",
              "text-[11px] uppercase tracking-wider",
              isSelected
                ? 'bg-[hsl(var(--lotto-orange))] text-white font-bold'
                : abilitato
                  ? 'bg-white/60 text-foreground hover:bg-[hsl(var(--lotto-peach))]'
                  : 'bg-white/30 text-muted-foreground/40 cursor-not-allowed',
            )}
          >
            <span className={cn(
              'w-4 h-4 rounded-full border-2 border-[hsl(var(--lotto-salmon))] flex-shrink-0',
              isSelected && 'bg-white border-white'
            )} />
            <span className="flex-1">{t}</span>
            <span className="text-[8px] opacity-60 normal-case">min {minimo}</span>
          </button>
        );
      })}
    </div>
  );
}
