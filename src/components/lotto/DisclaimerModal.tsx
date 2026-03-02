import { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ShieldAlert, Scale, Bot, BookOpen } from 'lucide-react';

const STORAGE_KEY = 'lotto-disclaimer-accepted';

export const DisclaimerModal = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setOpen(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(STORAGE_KEY, new Date().toISOString());
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={() => {}}>
      <DialogContent
        className="max-w-lg sm:max-w-xl"
        onInteractOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        // Hide the default close button
        onPointerDownOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-base sm:text-lg">
            <Scale className="h-5 w-5 text-[hsl(var(--lotto-blue))]" />
            Avviso Legale e Disclaimer
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="max-h-[60vh] pr-3">
          <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">

            {/* 1. Finalità educativa */}
            <div className="space-y-1.5">
              <h3 className="flex items-center gap-1.5 text-foreground font-semibold text-sm">
                <BookOpen className="h-4 w-4 text-[hsl(var(--lotto-green))]" />
                Finalità esclusivamente educativa
              </h3>
              <p>
                Questa applicazione è uno <strong className="text-foreground">strumento didattico</strong> realizzato 
                al solo scopo di studiare i concetti di <strong className="text-foreground">probabilità e statistica</strong> applicati 
                a un caso d'uso reale. Nessuna somma di denaro reale è coinvolta, raccolta o movimentata. 
                L'applicazione non consente in alcun modo di effettuare giocate con denaro reale.
              </p>
            </div>

            {/* 2. Assenza intento ludopatico */}
            <div className="space-y-1.5">
              <h3 className="flex items-center gap-1.5 text-foreground font-semibold text-sm">
                <ShieldAlert className="h-4 w-4 text-[hsl(var(--lotto-red))]" />
                Assenza di intento ludopatico o pubblicitario
              </h3>
              <p>
                L'applicazione <strong className="text-foreground">non intende in alcun modo promuovere, incentivare o pubblicizzare</strong> il 
                gioco d'azzardo né indurre comportamenti ludopatici. La scelta del "Gioco del Lotto" come modello 
                è motivata esclusivamente dalla sua idoneità a illustrare concetti probabilistici e combinatori.
              </p>
              <p>
                Si ricorda che il gioco d'azzardo può causare dipendenza patologica. Per informazioni e supporto: 
                <strong className="text-foreground"> Telefono Verde 800 558 822</strong> (Istituto Superiore di Sanità).
              </p>
            </div>

            {/* 3. Limitazioni del software */}
            <div className="space-y-1.5">
              <h3 className="flex items-center gap-1.5 text-foreground font-semibold text-sm">
                <Bot className="h-4 w-4 text-[hsl(var(--lotto-orange))]" />
                Limitazioni del software
              </h3>
              <p>
                Questo software è stato <strong className="text-foreground">generato con l'ausilio dell'intelligenza artificiale</strong>. 
                I procedimenti di calcolo, le probabilità visualizzate e i risultati delle simulazioni 
                <strong className="text-foreground"> potrebbero contenere errori o non essere perfettamente fedeli alla realtà</strong>. 
                L'autore non garantisce l'accuratezza matematica dei calcoli e declina ogni responsabilità 
                per eventuali imprecisioni.
              </p>
            </div>

            {/* 4. Riferimenti normativi */}
            <div className="space-y-1.5">
              <h3 className="flex items-center gap-1.5 text-foreground font-semibold text-sm">
                <Scale className="h-4 w-4 text-[hsl(var(--lotto-blue))]" />
                Riferimenti normativi
              </h3>
              <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                <li>
                  <strong className="text-foreground">Art. 718 c.p.</strong> — Il simulatore non configura gioco d'azzardo 
                  in quanto non prevede puntate né vincite in denaro reale.
                </li>
                <li>
                  <strong className="text-foreground">D.L. 158/2012 (Decreto Balduzzi)</strong> — Le disposizioni sulla pubblicità 
                  del gioco d'azzardo non si applicano a strumenti didattici privi di finalità commerciali o promozionali.
                </li>
                <li>
                  <strong className="text-foreground">Licenza ADM</strong> — Non è richiesta alcuna concessione dell'Agenzia delle 
                  Dogane e dei Monopoli per software di simulazione senza raccolta di giocate reali.
                </li>
                <li>
                  <strong className="text-foreground">Art. 21 Costituzione</strong> — La libertà di espressione e di ricerca 
                  scientifica e didattica tutela la pubblicazione di strumenti educativi.
                </li>
              </ul>
            </div>

            {/* Disclaimer marchi */}
            <div className="border-t pt-3 text-xs text-muted-foreground/80">
              Il marchio "Gioco del Lotto" è di proprietà esclusiva dello Stato italiano, gestito da 
              Lottomatica S.p.A. su concessione dell'Agenzia delle Dogane e dei Monopoli. Questa applicazione 
              non è in alcun modo affiliata, autorizzata o approvata da tali enti. L'applicazione non raccoglie 
              né tratta dati personali degli utenti.
            </div>
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button onClick={handleAccept} className="btn-gioca w-full font-bold uppercase tracking-wider text-white border-0">
            ✅ Ho letto e compreso — Accetto
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
