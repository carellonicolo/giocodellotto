import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Info } from 'lucide-react';

const RegoleModal: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <button
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Leggi le regole di SiVinceTutto"
        >
          <Info className="w-4 h-4" /> Regole
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl w-[95vw] max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-3 border-b border-border">
          <DialogTitle className="text-xl font-bold">Come si gioca a SiVinceTutto</DialogTitle>
        </DialogHeader>
        <ScrollArea className="px-6 py-5 max-h-[calc(90vh-90px)]">
          <div className="space-y-5 text-sm leading-relaxed">
            <section className="space-y-2">
              <h3 className="text-base font-bold text-primary">Il gioco</h3>
              <p>
                SiVinceTutto è un gioco a estrazione settimanale gestito da Sisal su concessione
                dell'Agenzia delle Dogane e dei Monopoli, legato al concorso SuperEnalotto.
                L'estrazione avviene <strong>ogni mercoledì alle 20:00</strong>.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-base font-bold text-primary">Come compilare la schedina</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Scegli <strong>esattamente 12 numeri</strong> dall'1 al 90 per ogni colonna.</li>
                <li>Costo per colonna: <strong>€5,00</strong>.</li>
                <li>Puoi compilare fino a 4 colonne per giocata in questo simulatore.</li>
                <li>L'opzione "Compila casualmente" riempie la colonna con 12 numeri estratti a caso.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h3 className="text-base font-bold text-primary">Categorie di vincita</h3>
              <p>
                All'estrazione vengono sorteggiati <strong>6 numeri</strong> sui 90 disponibili.
                Si vince se almeno 2 dei numeri estratti coincidono con quelli giocati.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li><strong>Punti 6</strong> — jackpot (probabilità: 1 su 673.825)</li>
                <li><strong>Punti 5</strong> — circa 1 su 10.078</li>
                <li><strong>Punti 4</strong> — circa 1 su 419</li>
                <li><strong>Punti 3</strong> — circa 1 su 37</li>
                <li><strong>Punti 2</strong> — circa 1 su 6,6</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h3 className="text-base font-bold text-primary">Distribuzione del montepremi</h3>
              <p>
                Il <strong>100% del montepremi</strong> destinato ai premi viene sempre distribuito
                ad ogni estrazione. Se nessun giocatore centra il <em>Punti 6</em>, l'importo destinato
                alla prima categoria viene <strong>ripartito automaticamente</strong> tra le categorie
                inferiori (5, 4, 3, 2). Questo significa che ogni mercoledì c'è sempre almeno un vincitore.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-base font-bold text-primary">Gioco responsabile</h3>
              <p>
                Il gioco è riservato ai maggiorenni. Il gioco d'azzardo può creare dipendenza patologica.
                Per problemi legati al gioco contatta il <strong>Telefono Verde 800 558 822</strong>{' '}
                (Istituto Superiore di Sanità).
              </p>
            </section>

            <p className="text-xs text-muted-foreground border-t border-border pt-3">
              Questo simulatore è uno strumento didattico, non affiliato a Sisal S.p.A.
              I numeri estratti sono generati localmente da un generatore pseudocasuale del browser.
            </p>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
};

export default RegoleModal;
