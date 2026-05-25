import { Link } from 'react-router-dom';
import { ShieldAlert } from 'lucide-react';

interface LegalFooterProps {
  /** Nome del gioco da citare (es. "Lotto", "SuperEnalotto", "MillionDAY", "Win for Life") */
  gameName: string;
  /** Concessionario titolare del marchio (es. "Lottomatica S.p.A.", "Sisal S.p.A.") */
  rightsHolder: string;
  /** Stile chiaro o scuro a seconda del tema della pagina */
  variant?: 'light' | 'dark';
}

export const LegalFooter: React.FC<LegalFooterProps> = ({
  gameName,
  rightsHolder,
  variant = 'dark',
}) => {
  const isDark = variant === 'dark';
  return (
    <footer
      className={`mt-12 pt-6 pb-8 px-4 border-t text-center space-y-3 ${
        isDark
          ? 'border-white/10 text-white/55'
          : 'border-black/10 text-foreground/70'
      }`}
    >
      <div className="flex items-center justify-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider">
        <ShieldAlert className="w-4 h-4" aria-hidden="true" />
        <span>Simulatore didattico — Non è un sito di gioco d'azzardo</span>
      </div>

      <p className="text-[11px] sm:text-xs leading-relaxed max-w-3xl mx-auto">
        Questa applicazione <strong>non è affiliata</strong>, sponsorizzata, autorizzata o associata in
        alcun modo a <strong>{rightsHolder}</strong>, all'Agenzia delle Dogane e dei Monopoli (ADM)
        né ad altri concessionari ufficiali. Il marchio "{gameName}" e gli altri marchi citati
        sono dei rispettivi proprietari e vengono utilizzati esclusivamente a scopo descrittivo
        nell'ambito di uno studio matematico (art. 21 c.p.i. e art. 70 L. 633/1941).
        Nessun denaro reale viene mosso e nessuna vincita è esigibile.
      </p>

      <p className="text-[11px] sm:text-xs leading-relaxed">
        ⚠️ Il gioco d'azzardo reale può causare dipendenza patologica. Riservato ai maggiorenni.
        Per assistenza chiama il Telefono Verde dell'Istituto Superiore di Sanità:{' '}
        <a
          href="tel:800558822"
          className={`underline font-semibold ${isDark ? 'hover:text-white' : 'hover:text-foreground'}`}
        >
          800 558 822
        </a>
      </p>

      <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] sm:text-xs pt-2">
        <Link
          to="/privacy"
          className={`underline ${isDark ? 'hover:text-white' : 'hover:text-foreground'}`}
        >
          Privacy Policy
        </Link>
        <span className="opacity-40">·</span>
        <button
          type="button"
          onClick={() => {
            localStorage.removeItem('global-disclaimer-accepted');
            localStorage.removeItem('global-disclaimer-age-confirmed');
            window.location.reload();
          }}
          className={`underline ${isDark ? 'hover:text-white' : 'hover:text-foreground'}`}
        >
          Rileggi il disclaimer
        </button>
        <span className="opacity-40">·</span>
        <Link
          to="/"
          className={`underline ${isDark ? 'hover:text-white' : 'hover:text-foreground'}`}
        >
          Tutti i simulatori
        </Link>
      </div>
    </footer>
  );
};

export default LegalFooter;
