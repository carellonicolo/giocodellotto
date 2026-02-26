import { useLotto } from '@/hooks/use-lotto';
import { GrigliaNumeri } from '@/components/lotto/GrigliaNumeri';
import { SelettoreRuote } from '@/components/lotto/SelettoreRuote';
import { SelettoreTipo } from '@/components/lotto/SelettoreTipo';
import { TabellaEstrazione } from '@/components/lotto/TabellaEstrazione';
import { PannelloProbabilita } from '@/components/lotto/PannelloProbabilita';
import { StoricoGiocate } from '@/components/lotto/StoricoGiocate';
import { NUMERI_MINIMI } from '@/lib/lotto/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

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
    <div className="min-h-screen bg-background">
      {/* Header — stile Lotto italiano */}
      <header className="lotto-header py-4 shadow-lg">
        <div className="max-w-7xl mx-auto px-4 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-3xl">
            🎱
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight text-white font-['Oswald'] uppercase">
              Gioco del Lotto
            </h1>
            <p className="text-[11px] text-white/70 uppercase tracking-widest font-['Oswald']">
              Simulatore Educativo · Studio della Probabilità
            </p>
          </div>
          <div className="ml-auto hidden sm:flex items-center gap-2 text-white/60 text-[10px] uppercase tracking-wider font-['Oswald']">
            <span className="px-2 py-1 rounded bg-white/10 border border-white/20">Scopo Didattico</span>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonna sinistra — Schedina */}
          <div className="lg:col-span-2 space-y-4">
            {/* SCHEDINA */}
            <div className="schedina-border rounded-lg bg-card overflow-hidden">
              {/* Intestazione schedina */}
              <div className="bg-[hsl(var(--lotto-red))] px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-white text-lg">📋</span>
                  <span className="text-white font-['Oswald'] font-bold text-sm uppercase tracking-widest">
                    Schedina del Lotto
                  </span>
                </div>
                <span className="text-white/70 text-[10px] font-['Oswald'] uppercase">
                  {lotto.numeriSelezionati.length}/10 numeri
                </span>
              </div>

              <div className="p-4 space-y-4">
                {/* Numeri selezionati */}
                {lotto.numeriSelezionati.length > 0 && (
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground font-['Oswald'] mr-1">
                      I tuoi numeri:
                    </span>
                    {[...lotto.numeriSelezionati].sort((a, b) => a - b).map(n => (
                      <span key={n} className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-[hsl(var(--lotto-red))] text-white text-[11px] font-bold font-['Oswald'] shadow-sm">
                        {n}
                      </span>
                    ))}
                  </div>
                )}

                {/* Griglia numeri */}
                <div>
                  <h3 className="text-xs font-bold text-[hsl(var(--lotto-red))] uppercase tracking-widest font-['Oswald'] mb-2">
                    Tabellone Numeri 1–90
                  </h3>
                  <GrigliaNumeri
                    numeriSelezionati={lotto.numeriSelezionati}
                    numeriIndovinati={tuttiIndovinati}
                    onToggle={lotto.toggleNumero}
                    disabled={lotto.isEstracting}
                  />
                </div>

                {/* Ruote */}
                <SelettoreRuote
                  ruoteSelezionate={lotto.ruoteSelezionate}
                  onToggle={lotto.toggleRuota}
                  onToggleTutte={lotto.selezionaTutteRuote}
                  disabled={lotto.isEstracting}
                />

                {/* Tipo giocata */}
                <SelettoreTipo
                  tipo={lotto.tipoGiocata}
                  onChange={lotto.setTipoGiocata}
                  numeriSelezionati={lotto.numeriSelezionati.length}
                  disabled={lotto.isEstracting}
                />

                {/* Importo e pulsante */}
                <div className="flex items-end gap-3 pt-2 border-t border-border">
                  <div className="w-28">
                    <label className="text-[10px] font-bold text-[hsl(var(--lotto-red))] uppercase tracking-widest font-['Oswald']">
                      Importo €
                    </label>
                    <Input
                      type="number"
                      min={0.5}
                      max={200}
                      step={0.5}
                      value={lotto.importo}
                      onChange={e => lotto.setImporto(Math.max(0.5, Number(e.target.value)))}
                      disabled={lotto.isEstracting}
                      className="mt-1 font-['Oswald'] font-bold text-center"
                    />
                  </div>
                  <div className="text-[10px] text-muted-foreground pb-2 font-['Oswald']">
                    Costo totale: <strong className="text-foreground">€{(lotto.importo * lotto.ruoteSelezionate.length).toFixed(2)}</strong>
                    <span className="block">({lotto.ruoteSelezionate.length} {lotto.ruoteSelezionate.length === 1 ? 'ruota' : 'ruote'})</span>
                  </div>
                  <div className="flex-1" />
                  <Button
                    onClick={lotto.gioca}
                    disabled={!puoGiocare}
                    className="px-8 font-['Oswald'] font-bold uppercase tracking-wider text-sm shadow-lg"
                    size="lg"
                  >
                    {lotto.isEstracting ? '🎰 Estrazione...' : '🎯 Gioca!'}
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={lotto.reset}
                    disabled={lotto.isEstracting}
                    className="font-['Oswald'] font-bold border-2"
                  >
                    ↺
                  </Button>
                </div>
              </div>
            </div>

            {/* Risultati estrazione */}
            {(lotto.risultatoCorrente || lotto.isEstracting) && (
              <div className="schedina-border rounded-lg bg-card overflow-hidden animate-fade-in">
                <div className="bg-[hsl(var(--lotto-blue))] px-4 py-2 flex items-center justify-between">
                  <span className="text-white font-['Oswald'] font-bold text-sm uppercase tracking-widest flex items-center gap-2">
                    🎰 Estrazione
                  </span>
                  {lotto.risultatoCorrente && (
                    <span className={`text-sm font-bold font-['Oswald'] uppercase ${lotto.risultatoCorrente.totaleVinto > 0 ? 'text-[hsl(var(--lotto-gold))]' : 'text-white/60'}`}>
                      {lotto.risultatoCorrente.totaleVinto > 0
                        ? `🎉 Vincita €${lotto.risultatoCorrente.totaleVinto.toFixed(2)}!`
                        : 'Nessuna vincita'}
                    </span>
                  )}
                </div>
                <div className="p-4">
                  {lotto.isEstracting ? (
                    <div className="text-center py-10">
                      <div className="text-5xl animate-bounce">🎱</div>
                      <p className="text-muted-foreground mt-3 font-['Oswald'] uppercase tracking-wider text-sm">
                        Estrazione in corso...
                      </p>
                    </div>
                  ) : lotto.risultatoCorrente && (
                    <TabellaEstrazione
                      estrazione={lotto.risultatoCorrente.estrazione}
                      numeriGiocati={lotto.risultatoCorrente.giocata.numeri}
                      ruoteGiocate={lotto.risultatoCorrente.giocata.ruote}
                    />
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Colonna destra — Probabilità e Storico */}
          <div className="space-y-4">
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

      {/* Footer */}
      <footer className="mt-8 py-4 border-t border-border text-center">
        <p className="text-[10px] text-muted-foreground font-['Oswald'] uppercase tracking-widest">
          ⚠️ Simulatore a scopo esclusivamente educativo e didattico · Non è un gioco d'azzardo reale
        </p>
      </footer>
    </div>
  );
};

export default Index;
