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
          aria-label="Leggi le regole di VinciCasa"
        >
          <Info className="w-4 h-4" /> Regole
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl w-[95vw] max-h-[90vh] p-0">
        <DialogHeader className="px-6 pt-6 pb-3 border-b border-border">
          <DialogTitle className="text-xl font-bold">Come si gioca a VinciCasa</DialogTitle>
        </DialogHeader>
        <ScrollArea className="px-6 py-5 max-h-[calc(90vh-90px)]">
          <div className="space-y-5 text-sm leading-relaxed">
            <section className="space-y-2">
              <h3 className="text-base font-bold text-primary">Il gioco</h3>
              <p>
                VinciCasa è una lotteria ad estrazione giornaliera gestita da Sisal su concessione
                dell'Agenzia delle Dogane e dei Monopoli. L'estrazione avviene{' '}
                <strong>tutti i giorni alle 20:00</strong>.
              </p>
            </section>

            <section className="space-y-2">
              <h3 className="text-base font-bold text-primary">Come compilare la schedina</h3>
              <ul className="list-disc pl-5 space-y-1">
                <li>Scegli <strong>esattamente 5 numeri</strong> dall'1 al 40 per ogni pannello.</li>
                <li>Costo per pannello: <strong>€2,00</strong>.</li>
                <li>Puoi compilare fino a 4 pannelli per giocata in questo simulatore.</li>
                <li>L'opzione "Compila casualmente" riempie il pannello con 5 numeri estratti a caso.</li>
              </ul>
            </section>

            <section className="space-y-2">
              <h3 className="text-base font-bold text-primary">Categorie di vincita</h3>
              <p>
                Vengono estratti <strong>5 numeri</strong> dall'1 al 40. Si vince se ne indovini almeno 2.
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>Punti 5</strong> — una <strong>casa del valore di €200.000</strong> + <strong>€200.000 in contanti</strong>{' '}
                  (probabilità: 1 su 658.008)
                </li>
                <li><strong>Punti 4</strong> — €200,00 (1 su 3.760)</li>
                <li><strong>Punti 3</strong> — €20,00 (1 su 111)</li>
                <li><strong>Punti 2</strong> — €2,60 (1 su 10)</li>
              </ul>
              <p className="text-muted-foreground">
                Probabilità complessiva di vincere almeno un premio: <strong>1 su 9</strong>.
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
