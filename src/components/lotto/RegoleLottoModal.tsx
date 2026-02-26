import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BookOpen } from 'lucide-react';

export function RegoleLottoModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-white/90 hover:text-white hover:bg-white/20 text-[10px] sm:text-xs uppercase tracking-wider gap-1 px-2 h-7"
        >
          <BookOpen className="h-3 w-3" />
          Regole
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg sm:max-w-2xl max-h-[85vh] p-0 overflow-hidden">
        <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-2">
          <DialogTitle className="text-lg sm:text-xl font-bold uppercase tracking-wider">
            📜 Regole del Gioco del Lotto
          </DialogTitle>
        </DialogHeader>
        <ScrollArea className="px-4 sm:px-6 pb-4 sm:pb-6 max-h-[70vh]">
          <div className="space-y-5 text-sm leading-relaxed text-foreground/80">

            {/* Come funziona */}
            <section>
              <h3 className="font-bold text-foreground uppercase tracking-wide text-xs mb-2 flex items-center gap-1.5">
                🎱 Come funziona
              </h3>
              <p>
                Il Lotto è uno dei giochi d'azzardo più antichi d'Italia, gestito dallo Stato e affidato 
                all'<strong>Agenzia delle Dogane e dei Monopoli</strong>. Si basa sull'estrazione di <strong>5 numeri</strong> (da 1 a 90) 
                su ciascuna delle <strong>11 ruote</strong>: Bari, Cagliari, Firenze, Genova, Milano, Napoli, 
                Palermo, Roma, Torino, Venezia e la Ruota Nazionale (introdotta nel 2005).
              </p>
            </section>

            {/* Come si gioca */}
            <section>
              <h3 className="font-bold text-foreground uppercase tracking-wide text-xs mb-2 flex items-center gap-1.5">
                🎯 Come si gioca
              </h3>
              <ol className="list-decimal list-inside space-y-1.5 ml-1">
                <li>Scegli da <strong>1 a 10 numeri</strong> compresi tra 1 e 90</li>
                <li>Seleziona la <strong>ruota</strong> o le ruote su cui puntare (oppure "Tutte")</li>
                <li>Decidi il <strong>tipo di sorte</strong> (Estratto, Ambo, Terno, Quaterna, Cinquina)</li>
                <li>Stabilisci l'<strong>importo</strong> della giocata: minimo €1, massimo €200, con incrementi di €0,50</li>
              </ol>
            </section>

            {/* Tipi di sorte */}
            <section>
              <h3 className="font-bold text-foreground uppercase tracking-wide text-xs mb-2 flex items-center gap-1.5">
                🃏 Tipi di sorte
              </h3>
              <div className="space-y-2">
                <div className="bg-muted/50 rounded p-2.5">
                  <p className="font-semibold text-foreground text-xs">Estratto (ambata)</p>
                  <p className="text-[12px] mt-0.5">Basta indovinare <strong>1 numero</strong> tra i 5 estratti sulla ruota scelta. Non conta l'ordine di estrazione.</p>
                </div>
                <div className="bg-muted/50 rounded p-2.5">
                  <p className="font-semibold text-foreground text-xs">Ambo</p>
                  <p className="text-[12px] mt-0.5">Bisogna indovinare <strong>2 numeri</strong> tra i 5 estratti. Servono almeno 2 numeri giocati.</p>
                </div>
                <div className="bg-muted/50 rounded p-2.5">
                  <p className="font-semibold text-foreground text-xs">Terno</p>
                  <p className="text-[12px] mt-0.5">Bisogna indovinare <strong>3 numeri</strong> tra i 5 estratti. Servono almeno 3 numeri giocati.</p>
                </div>
                <div className="bg-muted/50 rounded p-2.5">
                  <p className="font-semibold text-foreground text-xs">Quaterna</p>
                  <p className="text-[12px] mt-0.5">Bisogna indovinare <strong>4 numeri</strong> tra i 5 estratti. Servono almeno 4 numeri giocati.</p>
                </div>
                <div className="bg-muted/50 rounded p-2.5">
                  <p className="font-semibold text-foreground text-xs">Cinquina</p>
                  <p className="text-[12px] mt-0.5">Bisogna indovinare <strong>tutti e 5 i numeri</strong> estratti. Servono almeno 5 numeri giocati.</p>
                </div>
              </div>
            </section>

            {/* Estrazioni */}
            <section>
              <h3 className="font-bold text-foreground uppercase tracking-wide text-xs mb-2 flex items-center gap-1.5">
                📅 Quando avvengono le estrazioni
              </h3>
              <p>
                Le estrazioni si svolgono <strong>4 volte a settimana</strong>: ogni <strong>martedì, giovedì, venerdì e sabato alle ore 20:00</strong>, 
                salvo giorni festivi. Le giocate possono essere effettuate fino alle 19:30 nei giorni di estrazione, 
                oppure a partire dalle 21:30 fino a mezzanotte per l'estrazione successiva.
              </p>
              <p className="mt-1.5">
                Le estrazioni avvengono simultaneamente in tre sedi: <strong>Roma</strong> (ruote di Roma, Cagliari, Firenze e Nazionale), 
                <strong> Milano</strong> (Milano, Genova, Torino, Venezia) e <strong>Napoli</strong> (Napoli, Bari, Palermo), 
                tramite urne meccaniche con getto di aria compressa.
              </p>
            </section>

            {/* Premi e vincite */}
            <section>
              <h3 className="font-bold text-foreground uppercase tracking-wide text-xs mb-2 flex items-center gap-1.5">
                💰 Premi e vincite
              </h3>
              <p>
                A differenza del SuperEnalotto, le <strong>quote del Lotto sono fisse</strong> e non dipendono dal numero di giocatori. 
                La vincita si calcola moltiplicando l'importo giocato per un coefficiente fisso che dipende dal tipo di sorte 
                e dal numero di numeri giocati.
              </p>
              <div className="mt-2 bg-muted/50 rounded p-2.5 space-y-1 text-[12px]">
                <p><strong>Esempi di vincita con €1 di puntata e 1 numero giocato:</strong></p>
                <p>• Estratto: <strong>€11,23</strong></p>
                <p><strong>Con 2 numeri giocati:</strong></p>
                <p>• Ambo: <strong>€250</strong></p>
                <p><strong>Con 3 numeri giocati:</strong></p>
                <p>• Terno: <strong>€4.500</strong></p>
                <p><strong>Con 4 numeri giocati:</strong></p>
                <p>• Quaterna: <strong>€120.000</strong></p>
                <p><strong>Con 5 numeri giocati:</strong></p>
                <p>• Cinquina: <strong>€6.000.000</strong> (vincita massima)</p>
              </div>
              <p className="mt-2 text-[12px]">
                La <strong>vincita massima al Lotto è di 6 milioni di euro</strong>. Le vincite superiori a €500 sono soggette 
                a una tassazione dell'<strong>8%</strong>.
              </p>
            </section>

            {/* Riscossione */}
            <section>
              <h3 className="font-bold text-foreground uppercase tracking-wide text-xs mb-2 flex items-center gap-1.5">
                🏦 Riscossione delle vincite
              </h3>
              <div className="space-y-1 text-[12px]">
                <p>• Fino a <strong>€543,48</strong>: direttamente in ricevitoria</p>
                <p>• Fino a <strong>€2.300</strong>: in ricevitoria o tramite accredito bancario</p>
                <p>• Fino a <strong>€10.500</strong>: prenotazione in ricevitoria, con riscossione via conto corrente o Banca Intesa Sanpaolo</p>
                <p>• Oltre <strong>€10.500</strong>: presentando la ricevuta presso gli sportelli di Banca Intesa Sanpaolo</p>
              </div>
            </section>

            {/* Disclaimer */}
            <section className="border-t border-border pt-3">
              <p className="text-[11px] text-muted-foreground text-center">
                Fonte: Agenzia delle Dogane e dei Monopoli, Lottomatica S.p.A. · 
                Il gioco è vietato ai minori di 18 anni · 
                Questo simulatore ha solo scopo educativo e didattico.
              </p>
            </section>
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
