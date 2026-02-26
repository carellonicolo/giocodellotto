import { useLotto } from '@/hooks/use-lotto';
import { GrigliaNumeri } from '@/components/lotto/GrigliaNumeri';
import { SelettoreRuote } from '@/components/lotto/SelettoreRuote';
import { SelettoreTipo } from '@/components/lotto/SelettoreTipo';
import { TabellaEstrazione } from '@/components/lotto/TabellaEstrazione';
import { PannelloProbabilita } from '@/components/lotto/PannelloProbabilita';
import { StoricoGiocate } from '@/components/lotto/StoricoGiocate';
import { NUMERI_MINIMI, RUOTE } from '@/lib/lotto/types';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Index = () => {
  const lotto = useLotto();
  const minimoNumeri = NUMERI_MINIMI[lotto.tipoGiocata];
  const puoGiocare = lotto.numeriSelezionati.length >= minimoNumeri
    && lotto.ruoteSelezionate.length > 0
    && lotto.importo > 0
    && !lotto.isEstracting;

  // Numeri indovinati su tutte le ruote giocate
  const tuttiIndovinati = lotto.risultatoCorrente
    ? [...new Set(lotto.risultatoCorrente.vincite.flatMap(v => v.numeriIndovinati))]
    : [];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-4 shadow-lg">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-2xl font-black tracking-tight">🎱 Simulatore del Lotto</h1>
          <p className="text-sm opacity-80">Simulatore educativo per lo studio della probabilità</p>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Colonna sinistra — Schedina */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="border-2 border-primary/20 shadow-lg">
              <CardHeader className="pb-3 bg-gradient-to-r from-primary/5 to-transparent">
                <CardTitle className="text-lg flex items-center justify-between">
                  <span>📋 Schedina del Lotto</span>
                  <span className="text-xs font-normal text-muted-foreground">
                    {lotto.numeriSelezionati.length}/10 numeri selezionati
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Griglia numeri */}
                <div>
                  <h3 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-2">
                    Scegli i numeri (1-90)
                  </h3>
                  <GrigliaNumeri
                    numeriSelezionati={lotto.numeriSelezionati}
                    numeriIndovinati={tuttiIndovinati}
                    onToggle={lotto.toggleNumero}
                    disabled={lotto.isEstracting}
                  />
                  {lotto.numeriSelezionati.length > 0 && (
                    <p className="mt-2 text-xs text-muted-foreground">
                      Numeri scelti: <strong>{lotto.numeriSelezionati.sort((a, b) => a - b).join(', ')}</strong>
                    </p>
                  )}
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
                <div className="flex items-end gap-3">
                  <div className="flex-1">
                    <label className="text-xs font-semibold text-foreground uppercase tracking-wider">Importo (€)</label>
                    <Input
                      type="number"
                      min={0.5}
                      max={200}
                      step={0.5}
                      value={lotto.importo}
                      onChange={e => lotto.setImporto(Math.max(0.5, Number(e.target.value)))}
                      disabled={lotto.isEstracting}
                      className="mt-1"
                    />
                  </div>
                  <div className="text-xs text-muted-foreground pb-2">
                    Costo: €{(lotto.importo * lotto.ruoteSelezionate.length).toFixed(2)}
                    <span className="block text-[10px]">({lotto.ruoteSelezionate.length} ruote)</span>
                  </div>
                  <Button
                    onClick={lotto.gioca}
                    disabled={!puoGiocare}
                    className="px-8 font-bold"
                    size="lg"
                  >
                    {lotto.isEstracting ? '🎰 Estrazione...' : '🎯 Gioca!'}
                  </Button>
                  <Button variant="outline" size="lg" onClick={lotto.reset} disabled={lotto.isEstracting}>
                    ↺
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Risultati estrazione */}
            {(lotto.risultatoCorrente || lotto.isEstracting) && (
              <Card className="border-2 border-border shadow-lg animate-fade-in">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span>🎰 Risultati Estrazione</span>
                    {lotto.risultatoCorrente && (
                      <span className={`text-sm font-bold ${lotto.risultatoCorrente.totaleVinto > 0 ? 'text-green-600' : 'text-muted-foreground'}`}>
                        {lotto.risultatoCorrente.totaleVinto > 0
                          ? `🎉 Vinto €${lotto.risultatoCorrente.totaleVinto.toFixed(2)}!`
                          : 'Nessuna vincita'}
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {lotto.isEstracting ? (
                    <div className="text-center py-8">
                      <div className="text-4xl animate-bounce">🎱</div>
                      <p className="text-muted-foreground mt-2">Estrazione in corso...</p>
                    </div>
                  ) : lotto.risultatoCorrente && (
                    <TabellaEstrazione
                      estrazione={lotto.risultatoCorrente.estrazione}
                      numeriGiocati={lotto.risultatoCorrente.giocata.numeri}
                      ruoteGiocate={lotto.risultatoCorrente.giocata.ruote}
                    />
                  )}
                </CardContent>
              </Card>
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
    </div>
  );
};

export default Index;
