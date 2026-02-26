import { useLotto } from '@/hooks/use-lotto';
import { GrigliaNumeri } from '@/components/lotto/GrigliaNumeri';
import { SelettoreRuote } from '@/components/lotto/SelettoreRuote';
import { SelettoreTipo } from '@/components/lotto/SelettoreTipo';
import { SelettoreImporto } from '@/components/lotto/SelettoreImporto';
import { TabellaEstrazione } from '@/components/lotto/TabellaEstrazione';
import { PannelloProbabilita } from '@/components/lotto/PannelloProbabilita';
import { StoricoGiocate } from '@/components/lotto/StoricoGiocate';
import { NUMERI_MINIMI } from '@/lib/lotto/types';
import { Button } from '@/components/ui/button';

const Index = () => {
  const lotto = useLotto();
  const minimoNumeri = NUMERI_MINIMI[lotto.tipoGiocata];
  const puoGiocare = lotto.numeriSelezionati.length >= minimoNumeri
    && lotto.ruoteSelezionate.length > 0
    && lotto.importo > 0
    && !lotto.isEstracting;

  const tuttiIndovinati = lotto.risultatoCorrente
    ? [...new Set(lotto.risultatoCorrente.vincite.flatMap(v => v.numeriIndovinati))]
    : [];

  return (
    <div className="min-h-screen bg-background py-3 sm:py-6">
      <div className="max-w-5xl mx-auto px-2 sm:px-4">
        <div className="grid grid-cols-1 lg:grid-cols-[340px_1fr] gap-4 sm:gap-6">

          {/* ===== SCHEDINA ===== */}
          <div className="schedina-card overflow-hidden w-full max-w-[340px] mx-auto lg:mx-0">
            {/* Header */}
            <div className="schedina-header px-3 py-2 sm:py-3 text-center">
              <p className="text-[8px] sm:text-[10px] text-white/70 uppercase tracking-[0.2em]">Il Gioco del</p>
              <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight leading-none">
                LOTTO
              </h1>
            </div>

            {/* I TUOI NUMERI + RUOTE side by side */}
            <div className="px-1.5 sm:px-2 pt-1.5 sm:pt-2">
              <div className="schedina-section-title rounded-t text-[8px] sm:text-[10px]">
                I TUOI NUMERI (massime 10)
              </div>
              <div className="bg-white/40 rounded-b p-1 sm:p-1.5 flex gap-1 sm:gap-2">
                {/* Griglia numeri */}
                <div className="flex-1 min-w-0">
                  <GrigliaNumeri
                    numeriSelezionati={lotto.numeriSelezionati}
                    numeriIndovinati={tuttiIndovinati}
                    onToggle={lotto.toggleNumero}
                    disabled={lotto.isEstracting}
                  />
                </div>
                {/* Ruote a destra */}
                <div className="flex-shrink-0 pl-1 border-l border-[hsl(var(--lotto-salmon)/0.3)]">
                  <p className="text-[7px] sm:text-[8px] font-bold text-center text-foreground/60 font-['Oswald'] uppercase tracking-wider mb-0.5 sm:mb-1">
                    Ruote
                  </p>
                  <SelettoreRuote
                    ruoteSelezionate={lotto.ruoteSelezionate}
                    onToggle={lotto.toggleRuota}
                    onToggleTutte={lotto.selezionaTutteRuote}
                    disabled={lotto.isEstracting}
                  />
                </div>
              </div>
            </div>

            {/* IMPORTO DI GIOCATA */}
            <div className="px-1.5 sm:px-2 pt-1.5 sm:pt-2">
              <div className="schedina-section-title rounded-t text-[8px] sm:text-[10px]">
                IMPORTO DI GIOCATA
              </div>
              <div className="bg-white/40 rounded-b p-1 sm:p-1.5">
                <SelettoreImporto
                  importo={lotto.importo}
                  onChange={lotto.setImporto}
                  disabled={lotto.isEstracting}
                />
              </div>
            </div>

            {/* TIPO DI SORTE */}
            <div className="px-1.5 sm:px-2 pt-1.5 sm:pt-2">
              <div className="schedina-section-title rounded-t text-[8px] sm:text-[10px]">
                TIPO DI SORTE
              </div>
              <div className="bg-white/40 rounded-b p-1 sm:p-1.5">
                <SelettoreTipo
                  tipo={lotto.tipoGiocata}
                  onChange={lotto.setTipoGiocata}
                  numeriSelezionati={lotto.numeriSelezionati.length}
                  disabled={lotto.isEstracting}
                />
              </div>
            </div>

            {/* Riepilogo e pulsante */}
            <div className="px-1.5 sm:px-2 py-2 sm:py-3 space-y-1.5 sm:space-y-2">
              {lotto.numeriSelezionati.length > 0 && (
                <div className="flex items-center gap-0.5 sm:gap-1 flex-wrap px-1">
                  <span className="text-[7px] sm:text-[8px] text-foreground/50 font-['Oswald'] uppercase">Numeri:</span>
                  {[...lotto.numeriSelezionati].sort((a, b) => a - b).map(n => (
                    <span key={n} className="inline-flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-[hsl(var(--lotto-orange))] text-white text-[7px] sm:text-[8px] font-bold font-['Oswald']">
                      {n}
                    </span>
                  ))}
                </div>
              )}
              <div className="flex items-center gap-2 px-1">
                <div className="flex-1 text-[8px] sm:text-[9px] text-foreground/60 font-['Oswald']">
                  <span>Costo: <strong className="text-foreground">€{(lotto.importo * lotto.ruoteSelezionate.length).toFixed(2)}</strong></span>
                  <span className="ml-1">({lotto.ruoteSelezionate.length} ruote)</span>
                </div>
              </div>
              <div className="flex gap-2 px-1">
                <Button
                  onClick={lotto.gioca}
                  disabled={!puoGiocare}
                  className="flex-1 font-['Oswald'] font-bold uppercase tracking-wider text-[10px] sm:text-xs shadow-lg bg-[hsl(var(--lotto-orange))] hover:bg-[hsl(15_80%_48%)] text-white"
                  size="sm"
                >
                  {lotto.isEstracting ? '🎰 Estrazione...' : '🎯 GIOCA!'}
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={lotto.reset}
                  disabled={lotto.isEstracting}
                  className="font-['Oswald'] font-bold border-2 border-[hsl(var(--lotto-salmon))] text-foreground/60"
                >
                  ↺
                </Button>
              </div>
            </div>

            {/* Footer */}
            <div className="bg-[hsl(var(--lotto-salmon))] px-2 py-1 sm:py-1.5 text-center">
              <p className="text-[6px] sm:text-[7px] text-white font-['Oswald'] uppercase tracking-widest">
                ⚠️ Simulatore a scopo esclusivamente educativo e didattico
              </p>
            </div>
          </div>

          {/* ===== COLONNA DESTRA ===== */}
          <div className="space-y-3 sm:space-y-4">
            {/* Risultati estrazione — sempre visibile */}
            <div className="schedina-card overflow-hidden">
              <div className="schedina-header px-3 sm:px-4 py-2 flex items-center justify-between gap-2">
                <span className="text-white font-['Oswald'] font-bold text-xs sm:text-sm uppercase tracking-widest">
                  🎰 Estrazione
                </span>
                {lotto.risultatoCorrente && (
                  <span className={`text-xs sm:text-sm font-bold font-['Oswald'] uppercase ${lotto.risultatoCorrente.totaleVinto > 0 ? 'text-[hsl(var(--lotto-gold))]' : 'text-white/60'}`}>
                    {lotto.risultatoCorrente.totaleVinto > 0
                      ? `🎉 €${lotto.risultatoCorrente.totaleVinto.toFixed(2)}!`
                      : 'Nessuna vincita'}
                  </span>
                )}
              </div>
              <div className="p-2 sm:p-3 bg-white/60">
                {lotto.isEstracting ? (
                  <div className="text-center py-6 sm:py-8">
                    <div className="text-3xl sm:text-4xl animate-bounce">🎱</div>
                    <p className="text-muted-foreground mt-2 font-['Oswald'] uppercase tracking-wider text-[10px] sm:text-xs">
                      Estrazione in corso...
                    </p>
                  </div>
                ) : lotto.risultatoCorrente ? (
                  <TabellaEstrazione
                    estrazione={lotto.risultatoCorrente.estrazione}
                    numeriGiocati={lotto.risultatoCorrente.giocata.numeri}
                    ruoteGiocate={lotto.risultatoCorrente.giocata.ruote}
                  />
                ) : (
                  <TabellaEstrazione
                    estrazione={{} as any}
                    numeriGiocati={[]}
                    ruoteGiocate={[]}
                  />
                )}
              </div>
            </div>

            <PannelloProbabilita
              tipo={lotto.tipoGiocata}
              numeriGiocati={lotto.numeriSelezionati.length}
              importo={lotto.importo}
              numRuote={lotto.ruoteSelezionate.length}
            />
            <StoricoGiocate
              storico={lotto.storico}
              statistiche={lotto.statistiche}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
