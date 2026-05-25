import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { ShieldAlert } from 'lucide-react';

export const GlobalDisclaimerModal: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isAdult, setIsAdult] = useState(false);
  const [acceptsTerms, setAcceptsTerms] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem('global-disclaimer-accepted');
    if (!hasAccepted) {
      setIsOpen(true);
    }
  }, []);

  const canProceed = isAdult && acceptsTerms;

  const handleAccept = () => {
    if (!canProceed) return;
    localStorage.setItem('global-disclaimer-accepted', 'true');
    localStorage.setItem('global-disclaimer-age-confirmed', new Date().toISOString());
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={() => { /* Impedisce la chiusura cliccando fuori o premendo Esc */ }}>
      <DialogContent className="max-w-lg w-[95vw] [&>button]:hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-xl sm:text-2xl font-bold text-destructive">
            <ShieldAlert className="w-8 h-8" />
            Avvertenza Importante
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4 text-sm sm:text-base text-foreground/80 leading-relaxed">
          <p>
            Questo sito è un <strong>simulatore didattico</strong> creato esclusivamente per lo studio
            matematico della probabilità e della statistica applicate ai giochi a premi italiani.
          </p>
          <ul className="list-disc pl-5 space-y-2 font-medium">
            <li>Nessun denaro reale è coinvolto in alcun modo.</li>
            <li>Le "giocate" e le "vincite" sono mere simulazioni matematiche locali.</li>
            <li>Il gioco d'azzardo reale può causare dipendenza patologica.</li>
            <li>
              Questo sito <strong>non è affiliato</strong> a Lottomatica S.p.A., Sisal S.p.A.,
              all'Agenzia delle Dogane e dei Monopoli (ADM) o ad altri concessionari ufficiali.
            </li>
          </ul>

          <div className="bg-destructive/10 border border-destructive/20 p-4 rounded-xl mt-6">
            <p className="font-bold text-destructive mb-2 text-center sm:text-left">
              Hai problemi con il gioco d'azzardo?
            </p>
            <p className="text-sm">
              Non sei solo. Chiama il Telefono Verde Nazionale per le problematiche legate all'Azzardo (TVNGA)
              dell'Istituto Superiore di Sanità al numero gratuito:
            </p>
            <div className="mt-3 text-center">
              <a href="tel:800558822" className="inline-block text-xl font-black text-destructive hover:underline tracking-widest">
                800 558 822
              </a>
            </div>
          </div>

          {/* Checks di consenso */}
          <div className="space-y-2.5 pt-2 border-t border-border">
            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={isAdult}
                onChange={(e) => setIsAdult(e.target.checked)}
                className="mt-1 w-4 h-4 accent-primary cursor-pointer flex-shrink-0"
                aria-label="Confermo di avere almeno 18 anni"
              />
              <span className="text-sm text-foreground/90 group-hover:text-foreground transition-colors">
                Confermo di avere <strong>almeno 18 anni compiuti</strong>.
              </span>
            </label>

            <label className="flex items-start gap-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={acceptsTerms}
                onChange={(e) => setAcceptsTerms(e.target.checked)}
                className="mt-1 w-4 h-4 accent-primary cursor-pointer flex-shrink-0"
                aria-label="Accetto i termini"
              />
              <span className="text-sm text-foreground/90 group-hover:text-foreground transition-colors">
                Ho letto e compreso che questo è un <strong>simulatore puramente didattico</strong>,
                non affiliato a concessionari ufficiali, e che non comporta vincite o pagamenti reali.
              </span>
            </label>
          </div>
        </div>

        <DialogFooter className="sm:justify-center">
          <button
            onClick={handleAccept}
            disabled={!canProceed}
            className="w-full sm:w-auto px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:opacity-90 transition-all text-lg shadow-lg disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:opacity-40"
            aria-disabled={!canProceed}
          >
            {canProceed ? 'Ho capito, procedi al simulatore' : 'Conferma le caselle sopra per continuare'}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default GlobalDisclaimerModal;
