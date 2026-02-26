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
    <div className="space-y-2">
      <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider">Tipo di Giocata</h3>
      <div className="grid grid-cols-5 gap-1">
        {TIPI_GIOCATA.map(t => {
          const minimo = NUMERI_MINIMI[t];
          const abilitato = numeriSelezionati >= minimo;
          return (
            <button
              key={t}
              disabled={disabled || !abilitato}
              onClick={() => onChange(t)}
              className={cn(
                'py-2 text-xs font-bold rounded border-2 transition-all',
                tipo === t
                  ? 'bg-primary text-primary-foreground border-primary shadow-md'
                  : abilitato
                    ? 'bg-card text-card-foreground border-border hover:bg-accent'
                    : 'bg-muted text-muted-foreground border-border opacity-40 cursor-not-allowed',
              )}
            >
              {t}
              <span className="block text-[10px] font-normal opacity-70">min {minimo}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
