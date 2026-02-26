import { cn } from '@/lib/utils';

interface SelettoreImportoProps {
  importo: number;
  onChange: (v: number) => void;
  disabled?: boolean;
}

const IMPORTI = [200, 100, 50, 20, 10, 5, 3, 2, 1, 0.50, 0.25];

export function SelettoreImporto({ importo, onChange, disabled }: SelettoreImportoProps) {
  return (
    <div className="flex items-center gap-[3px] sm:gap-1 flex-wrap">
      <span className="text-[9px] sm:text-[10px] font-bold text-foreground/70 mr-0.5">€</span>
      {IMPORTI.map(v => (
        <button
          key={v}
          disabled={disabled}
          onClick={() => onChange(v)}
          className={cn(
            "lotto-bubble w-auto px-1 sm:px-1.5 h-5 sm:h-6 text-[7px] sm:text-[9px] border-[hsl(var(--lotto-salmon))]",
            importo === v
              ? 'selected'
              : 'bg-white/80 text-foreground hover:bg-[hsl(var(--lotto-peach))]',
            disabled && 'opacity-50 cursor-not-allowed hover:!scale-100'
          )}
        >
          {v >= 1 ? v : v.toFixed(2)}
        </button>
      ))}
    </div>
  );
}
