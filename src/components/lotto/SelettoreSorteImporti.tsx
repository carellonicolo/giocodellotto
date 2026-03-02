import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import { TIPI_GIOCATA, NUMERI_MINIMI, type TipoGiocata, type ImportiPerSorte } from '@/lib/lotto/types';

interface SelettoreSorteImportiProps {
  importiPerSorte: ImportiPerSorte;
  numeriSelezionati: number;
  numeroOro: boolean;
  onSetImporto: (tipo: TipoGiocata, importo: number | undefined) => void;
  onSetNumeroOro: (v: boolean) => void;
  disabled?: boolean;
}

const IMPORTI_COMPATTI = [20, 10, 5, 3, 2, 1, 0.50, 0.25] as const;

export function SelettoreSorteImporti({
  importiPerSorte, numeriSelezionati, numeroOro,
  onSetImporto, onSetNumeroOro, disabled
}: SelettoreSorteImportiProps) {

  const hasOroEligible = (['Ambo', 'Terno', 'Quaterna'] as TipoGiocata[]).some(
    s => (importiPerSorte[s] ?? 0) > 0
  );

  return (
    <div className="space-y-1">
      {/* Header row with importi */}
      <div className="flex items-end gap-0">
        <div className="w-[58px] sm:w-[68px] shrink-0" />
        {IMPORTI_COMPATTI.map(imp => (
          <div key={imp} className="flex-1 text-center text-[7px] sm:text-[8px] font-bold text-foreground/60 leading-tight pb-0.5">
            {imp >= 1 ? imp : imp.toFixed(2).replace('0.', '.')}
          </div>
        ))}
      </div>

      {/* Rows per sorte */}
      {TIPI_GIOCATA.map(tipo => {
        const minNumeri = NUMERI_MINIMI[tipo];
        const abilitata = numeriSelezionati >= minNumeri;
        const importoAttuale = importiPerSorte[tipo];

        return (
          <div key={tipo} className={cn(
            "flex items-center gap-0 rounded-md overflow-hidden",
            !abilitata && "opacity-40",
            importoAttuale && "border-l-2 border-l-[hsl(var(--lotto-orange))]"
          )}>
            <div className={cn(
              "w-[58px] sm:w-[68px] shrink-0 text-[8px] sm:text-[9px] font-bold uppercase tracking-wide py-1.5 px-1.5 truncate",
              importoAttuale ? "text-[hsl(var(--lotto-orange))]" : "text-foreground/50"
            )}>
              {tipo}
            </div>
            {IMPORTI_COMPATTI.map(imp => {
              const selected = importoAttuale === imp;
              return (
                <button
                  key={imp}
                  disabled={disabled || !abilitata}
                  onClick={() => onSetImporto(tipo, selected ? undefined : imp)}
                  className={cn(
                    "flex-1 h-6 sm:h-7 border border-[hsl(var(--lotto-salmon)/0.3)] text-[7px] sm:text-[8px] font-bold transition-all rounded-sm",
                    "hover:bg-[hsl(var(--lotto-peach))]",
                    selected
                      ? "bg-[hsl(var(--lotto-orange))] text-white border-[hsl(var(--lotto-orange))] shadow-sm"
                      : "bg-white/60 text-foreground/40",
                    !abilitata && "cursor-not-allowed",
                    disabled && "cursor-not-allowed opacity-50"
                  )}
                >
                  {selected ? '✓' : ''}
                </button>
              );
            })}
          </div>
        );
      })}

      {/* Numero Oro toggle */}
      <div className={cn(
        "flex items-center gap-1.5 pt-1 px-1",
        !hasOroEligible && "opacity-40"
      )}>
        <button
          disabled={disabled || !hasOroEligible}
          onClick={() => onSetNumeroOro(!numeroOro)}
          className={cn(
            "w-5 h-5 rounded-md flex items-center justify-center transition-all",
            numeroOro
              ? "bg-[hsl(var(--lotto-gold))] text-white shadow-sm"
              : "border-2 border-[hsl(var(--lotto-salmon)/0.5)] bg-white/60 text-transparent"
          )}
        >
          <Star className="h-3 w-3" fill={numeroOro ? 'currentColor' : 'none'} />
        </button>
        <span className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wide text-foreground/60">
          Numero Oro <span className="text-[6px] font-normal">(raddoppia il costo)</span>
        </span>
      </div>
    </div>
  );
}
