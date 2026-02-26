import { cn } from '@/lib/utils';
import { TIPI_GIOCATA, NUMERI_MINIMI, type TipoGiocata } from '@/lib/lotto/types';

interface SelettoreTipoProps {
  tipo: TipoGiocata;
  onChange: (t: TipoGiocata) => void;
  numeriSelezionati: number;
  disabled?: boolean;
}

const ICONE_TIPO: Record<string, string> = {
  Estratto: '①',
  Ambo: '②',
  Terno: '③',
  Quaterna: '④',
  Cinquina: '⑤',
};

export function SelettoreTipo({ tipo, onChange, numeriSelezionati, disabled }: SelettoreTipoProps) {
  return (
    <div className="space-y-2">
      <h3 className="text-xs font-bold text-[hsl(var(--lotto-red))] uppercase tracking-widest font-['Oswald']">
        Tipo di Sorte
      </h3>
      <div className="grid grid-cols-5 gap-1 p-2 rounded bg-[hsl(var(--lotto-cream))] border border-border">
        {TIPI_GIOCATA.map(t => {
          const minimo = NUMERI_MINIMI[t];
          const abilitato = numeriSelezionati >= minimo;
          return (
            <button
              key={t}
              disabled={disabled || !abilitato}
              onClick={() => onChange(t)}
              className={cn(
                "py-2 text-[11px] font-bold rounded border-2 transition-all font-['Oswald'] uppercase tracking-wide",
                tipo === t
                  ? 'bg-[hsl(var(--lotto-blue))] text-white border-[hsl(var(--lotto-blue))] shadow-md'
                  : abilitato
                    ? 'bg-white text-foreground border-border/60 hover:border-[hsl(var(--lotto-blue)/0.5)]'
                    : 'bg-muted/50 text-muted-foreground border-border/30 opacity-40 cursor-not-allowed',
              )}
            >
              <span className="block text-lg leading-none mb-0.5">{ICONE_TIPO[t]}</span>
              {t}
              <span className="block text-[9px] font-normal opacity-70 normal-case">min {minimo} num.</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
