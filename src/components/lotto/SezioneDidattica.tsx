import { useState } from 'react';
import { ChevronDown, BookOpen, AlertTriangle, TrendingDown, Scale } from 'lucide-react';

function CollapsibleDidattica({ title, icon, defaultOpen = false, children }: { title: string; icon: React.ReactNode; defaultOpen?: boolean; children: React.ReactNode }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="glass-panel !rounded-lg overflow-hidden">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex items-center justify-between px-3 py-2 bg-lotto-cream/60 hover:bg-lotto-cream/90 transition-colors text-left"
      >
        <h3 className="font-medium text-[10px] uppercase text-muted-foreground tracking-wider flex items-center gap-1.5">
          {icon} {title}
        </h3>
        <ChevronDown className={`h-3.5 w-3.5 text-muted-foreground transition-transform duration-300 ${open ? 'rotate-180' : ''}`} />
      </button>
      <div className={`grid transition-all duration-300 ease-in-out ${open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
        <div className="overflow-hidden">
          <div className="p-3 space-y-2 text-[11px] leading-relaxed text-muted-foreground">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function SezioneDidattica() {
  return (
    <div className="schedina-card overflow-hidden">
      <div className="bg-gradient-to-r from-lotto-gold to-[hsl(45_65%_42%)] px-3 py-2">
        <h2 className="text-white font-bold text-xs uppercase tracking-widest">
          🎓 La Matematica del Lotto
        </h2>
      </div>
      <div className="p-3 bg-card/60 space-y-2.5">

        <CollapsibleDidattica title="Legge dei Grandi Numeri" icon={<TrendingDown className="h-3 w-3" />}>
          <p>
            La <strong className="text-foreground">legge dei grandi numeri</strong> stabilisce che, al crescere
            del numero di prove, la frequenza relativa di un evento converge alla sua probabilità teorica.
          </p>
          <p>
            Nel contesto del Lotto, questo significa che <strong className="text-foreground">più giochi, più il tuo bilancio
            si avvicina al valore atteso</strong> — che è sempre negativo per il giocatore (circa -50% della puntata).
          </p>
          <div className="bg-lotto-red/10 border border-lotto-red/20 rounded-lg p-2.5 text-center">
            <p className="text-[10px] font-semibold text-lotto-red uppercase">
              💡 Prova con la simulazione ×1000 per vederlo in azione nel grafico del bilancio!
            </p>
          </div>
        </CollapsibleDidattica>

        <CollapsibleDidattica title="Il Paradosso del Giocatore" icon={<AlertTriangle className="h-3 w-3" />}>
          <p>
            Il <strong className="text-foreground">paradosso del giocatore</strong> (o "fallacia dello scommettitore") è la
            credenza errata che eventi passati influenzino la probabilità di eventi futuri indipendenti.
          </p>
          <p>
            <strong className="text-foreground">Esempio:</strong> "Il numero 7 non esce da 100 estrazioni, quindi è 'dovuto'
            e uscirà presto." Questo è <strong className="text-foreground">falso</strong>. Ogni estrazione è indipendente:
            il numero 7 ha sempre <strong className="text-foreground">1 probabilità su 18</strong> di uscire (5/90), indipendentemente
            dal passato.
          </p>
          <div className="bg-lotto-blue/10 border border-lotto-blue/20 rounded-lg p-2.5">
            <p className="text-[10px] text-foreground/70">
              <strong>I numeri "ritardatari"</strong> non hanno maggiore probabilità di uscire. Le ruote e le urne
              non hanno memoria. Ogni estrazione è un evento nuovo e completamente casuale.
            </p>
          </div>
        </CollapsibleDidattica>

        <CollapsibleDidattica title="Il Vantaggio del Banco" icon={<Scale className="h-3 w-3" />}>
          <p>
            Il <strong className="text-foreground">vantaggio del banco</strong> è la differenza tra le quote eque
            (basate sulla probabilità reale) e le quote effettivamente pagate dal Lotto.
          </p>
          <div className="space-y-1.5">
            <div className="grid grid-cols-[1fr_auto_auto_auto] gap-x-2 text-[10px] items-center">
              <span className="font-semibold text-foreground text-[9px] uppercase">Sorte</span>
              <span className="font-semibold text-foreground text-[9px] uppercase text-right">Quota equa</span>
              <span className="font-semibold text-foreground text-[9px] uppercase text-right">Quota reale</span>
              <span className="font-semibold text-foreground text-[9px] uppercase text-right">Vantaggio</span>
            </div>
            {[
              { sorte: 'Estratto (1 num.)', equa: '18:1', reale: '11,23:1', vantaggio: '37,6%' },
              { sorte: 'Ambo (2 num.)', equa: '400,5:1', reale: '250:1', vantaggio: '37,6%' },
              { sorte: 'Terno (3 num.)', equa: '11.748:1', reale: '4.500:1', vantaggio: '61,7%' },
              { sorte: 'Quaterna (4 num.)', equa: '511.038:1', reale: '120.000:1', vantaggio: '76,5%' },
              { sorte: 'Cinquina (5 num.)', equa: '43.949.268:1', reale: '6.000.000:1', vantaggio: '86,3%' },
            ].map(r => (
              <div key={r.sorte} className="grid grid-cols-[1fr_auto_auto_auto] gap-x-2 text-[10px] py-1 border-t border-border/30 items-center">
                <span className="text-foreground">{r.sorte}</span>
                <span className="text-right tabular-nums text-muted-foreground">{r.equa}</span>
                <span className="text-right tabular-nums text-muted-foreground">{r.reale}</span>
                <span className="text-right font-semibold text-lotto-red tabular-nums">{r.vantaggio}</span>
              </div>
            ))}
          </div>
          <p className="text-[10px] mt-1">
            <strong className="text-foreground">Conclusione:</strong> Il Lotto trattiene dal 37% all'86% delle puntate.
            È matematicamente impossibile essere vincitori nel lungo periodo.
          </p>
        </CollapsibleDidattica>

      </div>
    </div>
  );
}