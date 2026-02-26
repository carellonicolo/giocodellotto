import { cn } from '@/lib/utils';
import { TIPI_GIOCATA, NUMERI_MINIMI, IMPORTI_DISPONIBILI, type TipoGiocata, type ImportiPerSorte } from '@/lib/lotto/types';

interface SelettoreSorteImportiProps {
  importiPerSorte: ImportiPerSorte;
  numeriSelezionati: number;
  numeroOro: boolean;
  onSetImporto: (tipo: TipoGiocata, importo: number | undefined) => void;
  onSetNumeroOro: (v: boolean) => void;
  disabled?: boolean;
}

// Compact importi for the schedina (fits in 340px)
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
            "flex items-center gap-0 rounded-sm overflow-hidden",
            !abilitata && "opacity-40"
          )}>
            <div className={cn(
              "w-[52px] sm:w-[60px] shrink-0 text-[7px] sm:text-[8px] font-bold uppercase tracking-wide py-1 px-1 truncate",
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
                    "flex-1 h-5 sm:h-6 border border-[hsl(var(--lotto-salmon)/0.3)] text-[6px] sm:text-[7px] font-bold transition-all",
                    "hover:bg-[hsl(var(--lotto-peach))]",
                    selected
                      ? "bg-[hsl(var(--lotto-orange))] text-white border-[hsl(var(--lotto-orange))]"
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
            "w-4 h-4 rounded border-2 flex items-center justify-center text-[8px] font-bold transition-all",
            numeroOro
              ? "bg-[hsl(var(--lotto-gold))] border-[hsl(var(--lotto-gold))] text-white"
              : "border-[hsl(var(--lotto-salmon)/0.5)] bg-white/60"
          )}
        >
          {numeroOro ? '✓' : ''}
        </button>
        <span className="text-[7px] sm:text-[8px] font-bold uppercase tracking-wide text-foreground/60">
          Numero Oro <span className="text-[6px] font-normal">(raddoppia il costo)</span>
        </span>
      </div>
    </div>
  );
}
