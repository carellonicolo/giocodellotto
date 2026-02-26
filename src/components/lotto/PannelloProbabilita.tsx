import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import type { TipoGiocata } from '@/lib/lotto/types';
import { TIPI_GIOCATA } from '@/lib/lotto/types';
import {
  calcolaProbabilita,
  calcolaProbabilitaSingola,
  combinazioni,
  getMoltiplicatore,
  getFormulaDescrizione,
  getDescrizioneProbabilita,
} from '@/lib/lotto/engine';

interface PannelloProbabilitaProps {
  tipo: TipoGiocata;
  numeriGiocati: number;
  importo: number;
  numRuote: number;
}

export function PannelloProbabilita({ tipo, numeriGiocati, importo, numRuote }: PannelloProbabilitaProps) {
  const prob = numeriGiocati > 0 ? calcolaProbabilita(tipo, numeriGiocati) : 0;
  const probPercentuale = (prob * 100).toFixed(6);
  const probInversa = prob > 0 ? Math.round(1 / prob) : 0;
  const moltiplicatore = getMoltiplicatore(tipo, numeriGiocati);
  const vincitaPotenziale = importo * moltiplicatore;
  const costoTotale = importo * numRuote;
  const valoreAtteso = prob * vincitaPotenziale * numRuote - costoTotale;

  return (
    <Card className="border-2 border-border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base flex items-center gap-2">
          📊 Analisi Probabilistica
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 text-sm">
        {/* Giocata corrente */}
        {numeriGiocati > 0 && (
          <div className="p-3 rounded-lg bg-accent/50 space-y-2">
            <p className="font-semibold text-foreground">La tua giocata: {tipo} con {numeriGiocati} numeri</p>
            <p className="text-muted-foreground">{getDescrizioneProbabilita(tipo)}</p>
            <p className="font-mono text-xs bg-card p-2 rounded border border-border">
              {numeriGiocati >= ({ Estratto: 1, Ambo: 2, Terno: 3, Quaterna: 4, Cinquina: 5 }[tipo])
                ? getFormulaDescrizione(tipo, numeriGiocati)
                : 'Seleziona abbastanza numeri per calcolare'}
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <div className="bg-card p-2 rounded border border-border">
                <p className="text-[10px] text-muted-foreground uppercase">Probabilità</p>
                <p className="font-bold text-foreground">{prob > 0 ? `1 su ${probInversa.toLocaleString('it-IT')}` : '—'}</p>
                <p className="text-[10px] text-muted-foreground">{probPercentuale}%</p>
              </div>
              <div className="bg-card p-2 rounded border border-border">
                <p className="text-[10px] text-muted-foreground uppercase">Vincita potenziale</p>
                <p className="font-bold text-foreground">€{vincitaPotenziale.toLocaleString('it-IT', { minimumFractionDigits: 2 })}</p>
                <p className="text-[10px] text-muted-foreground">×{moltiplicatore}</p>
              </div>
            </div>
            {numRuote > 0 && (
              <div className={`p-2 rounded border ${valoreAtteso < 0 ? 'bg-destructive/10 border-destructive/30' : 'bg-green-50 border-green-300'}`}>
                <p className="text-[10px] uppercase font-semibold">Valore Atteso</p>
                <p className={`font-bold ${valoreAtteso < 0 ? 'text-destructive' : 'text-green-700'}`}>
                  €{valoreAtteso.toFixed(4)} per giocata
                </p>
                <p className="text-[10px] text-muted-foreground">
                  {valoreAtteso < 0
                    ? `Perdi in media €${Math.abs(valoreAtteso).toFixed(4)} ogni volta che giochi`
                    : 'Valore atteso positivo (raro)'
                  }
                </p>
              </div>
            )}
          </div>
        )}

        {/* Tabella probabilità di riferimento */}
        <div>
          <h4 className="font-semibold text-xs uppercase text-muted-foreground mb-2">Probabilità per tipo (1 numero giocato su 1 ruota)</h4>
          <div className="space-y-1">
            {TIPI_GIOCATA.map(t => {
              const p = calcolaProbabilitaSingola(t);
              const inv = p > 0 ? Math.round(1 / p) : 0;
              return (
                <div key={t} className="flex justify-between items-center py-1 px-2 rounded bg-card border border-border/50">
                  <span className="font-medium text-xs">{t}</span>
                  <span className="font-mono text-xs text-muted-foreground">1/{inv.toLocaleString('it-IT')}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Formula generale */}
        <div className="p-3 rounded-lg bg-muted/50 space-y-2">
          <h4 className="font-semibold text-xs uppercase text-muted-foreground">Formula Generale</h4>
          <div className="font-mono text-xs bg-card p-2 rounded border border-border leading-relaxed">
            P(vincita) = Σ C(k,j) × C(90-k, 5-j) / C(90,5)
            <br />
            <span className="text-muted-foreground">dove k = numeri giocati, j = da t a min(k,5)</span>
            <br />
            <span className="text-muted-foreground">t = numeri da indovinare per il tipo di giocata</span>
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed">
            C(90,5) = {combinazioni(90, 5).toLocaleString('it-IT')} combinazioni possibili.
            La probabilità diminuisce drasticamente al crescere dei numeri da indovinare,
            rendendo le vincite più alte ma statisticamente improbabili.
          </p>
          <div className="p-2 rounded border border-border bg-card">
            <p className="text-xs font-semibold text-destructive">⚠️ Il Lotto ha un vantaggio del banco del ~50%</p>
            <p className="text-[10px] text-muted-foreground">
              Il valore atteso di ogni giocata è sempre negativo. Nel lungo periodo, 
              il giocatore perde circa la metà di quanto puntato.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
