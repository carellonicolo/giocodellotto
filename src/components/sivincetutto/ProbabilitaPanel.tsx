import React from 'react';
import {
  calculateProbability,
  calculateWinProbability,
  AVERAGE_PRIZES,
  formatCurrency,
  formatNumber,
  type WinCategory,
} from '@/lib/sivincetutto/sivincetutto';

const CATEGORIES: WinCategory[] = ['6', '5', '4', '3', '2'];

const ProbabilitaPanel: React.FC = () => {
  const totalWin = calculateWinProbability();
  return (
    <div className="space-y-5">
      <div className="text-center">
        <h2 className="text-lg sm:text-xl font-bold tracking-wider uppercase mb-1">
          📊 Probabilità di Vincita
        </h2>
        <p className="text-xs text-muted-foreground">
          Calcolate con la distribuzione ipergeometrica: 12 numeri scelti su 90, 6 estratti.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-secondary/60">
            <tr>
              <th className="text-left p-3 font-bold uppercase tracking-wider text-xs">Categoria</th>
              <th className="text-right p-3 font-bold uppercase tracking-wider text-xs">Probabilità</th>
              <th className="text-right p-3 font-bold uppercase tracking-wider text-xs">1 su</th>
              <th className="text-right p-3 font-bold uppercase tracking-wider text-xs">Premio medio</th>
            </tr>
          </thead>
          <tbody>
            {CATEGORIES.map((cat) => {
              const matches = parseInt(cat, 10);
              const p = calculateProbability(matches);
              return (
                <tr key={cat} className="border-t border-border">
                  <td className="p-3 font-bold">Punti {cat}</td>
                  <td className="p-3 text-right font-mono">{(p.probability * 100).toFixed(p.probability < 1e-4 ? 7 : 4)}%</td>
                  <td className="p-3 text-right font-mono text-primary">{formatNumber(p.oneIn)}</td>
                  <td className="p-3 text-right font-mono text-foreground/85">{formatCurrency(AVERAGE_PRIZES[cat])}</td>
                </tr>
              );
            })}
            <tr className="border-t-2 border-primary/30 bg-primary/5 font-bold">
              <td className="p-3 uppercase tracking-wider">Almeno un premio</td>
              <td className="p-3 text-right font-mono">{(totalWin.probability * 100).toFixed(2)}%</td>
              <td className="p-3 text-right font-mono text-primary">{formatNumber(totalWin.oneIn)}</td>
              <td className="p-3 text-right text-muted-foreground text-xs">—</td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="bg-secondary/40 rounded-xl p-4 text-xs sm:text-sm space-y-2">
        <p>
          <strong>Probabilità ipergeometrica:</strong> P(X=k) = C(12,k) · C(78, 6-k) / C(90, 6).
          Il giocatore sceglie 12 numeri tra 90; ne vengono estratti 6.
        </p>
        <p className="text-muted-foreground">
          Gli importi sono <em>medie storiche indicative</em>: nel gioco reale i premi
          dipendono dal montepremi dell'estrazione e dal numero di vincitori. Se nessuno fa "Punti 6"
          l'importo della prima categoria viene ridistribuito tra le categorie inferiori.
        </p>
      </div>
    </div>
  );
};

export default ProbabilitaPanel;
