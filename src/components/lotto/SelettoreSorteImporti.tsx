import { cn } from '@/lib/utils';
import { TIPI_GIOCATA, NUMERI_MINIMI, type TipoGiocata, type ImportiPerSorte } from '@/lib/lotto/types';

interface SelettoreSorteImportiProps {
  importiPerSorte: ImportiPerSorte;
  numeriSelezionati: number;
  onSetImporto: (tipo: TipoGiocata, importo: number | undefined) => void;
  disabled?: boolean;
}

// Importi conformi al regolamento: minimo €1, massimo €200
const IMPORTI_COMPATTI = [200, 100, 50, 20, 10, 5, 3, 2, 1] as const;

export function SelettoreSorteImporti({
  importiPerSorte, numeriSelezionati,
  onSetImporto, disabled
}: SelettoreSorteImportiProps) {

  return (
    <div className="space-y-1">
      {/* Header row with importi */}
      <div className="flex items-end gap-0">
        <div className="w-[58px] sm:w-[68px] shrink-0" />
        {IMPORTI_COMPATTI.map(imp => (
          <div key={imp} className="flex-1 text-center text-[6px] sm:text-[7px] font-bold text-foreground/60 leading-tight pb-0.5">
            {imp}
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
            importoAttuale && "border-l-2 border-l-lotto-orange"
          )}>
            <div className={cn(
              "w-[58px] sm:w-[68px] shrink-0 text-[8px] sm:text-[9px] font-bold uppercase tracking-wide py-1.5 px-1.5 truncate",
              importoAttuale ? "text-lotto-orange" : "text-foreground/50"
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
                  aria-label={`${tipo} ${imp} euro`}
                  title={`${tipo} €${imp}`}
                  role="checkbox"
                  aria-checked={selected}
                  className={cn(
                    "flex-1 h-6 sm:h-7 border border-lotto-salmon/30 text-[7px] sm:text-[8px] font-bold transition-all rounded-sm",
                    "hover:bg-lotto-peach",
                    selected
                      ? "bg-lotto-orange text-white border-lotto-orange shadow-sm"
                      : "bg-surface/60 text-foreground/40",
                    !abilitata && "cursor-not-allowed",
                    disabled && "cursor-not-allowed opacity-50"
                  )}
                >
                  {selected ? '✓' : <span className="sr-only">{`€${imp}`}</span>}
                </button>
              );
            })}
          </div>
        );
      })}
    </div>
  );
}