import React from 'react';
import {
  calculateProbability,
  calculateWinProbability,
  AVERAGE_PRIZES,
  formatCurrency,
  formatNumber,
  type WinCategory,
} from '@/lib/vincicasa/vincicasa';

const CATEGORIES: WinCategory[] = ['5', '4', '3', '2'];

const ProbabilitaPanel: React.FC = () => {
  const totalWin = calculateWinProbability();
  return (
    <div className="space-y-5">
      <div className="text-center">
        <h2 className="text-lg sm:text-xl font-bold tracking-wider uppercase mb-1">
          📊 Probabilità di Vincita
        </h2>
        <p className="text-xs text-muted-foreground">
          Distribuzione ipergeometrica: 5 numeri scelti su 40, 5 estratti su 40.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="w-full text-sm">
          <thead className="bg-secondary/60">
            <tr>
              <th className="text-left p-3 font-bold uppercase tracking-wider text-xs">Categoria</th>
              <th className="text-right p-3 font-bold uppercase tracking-wider text-xs">Probabilità</th>
              <th className="text-right p-3 font-bold uppercase tracking-wider text-xs">1 su</th>
              <th className="text-right p-3 font-bold uppercase tracking-wider text-xs">Premio</th>
            </tr>
          </thead>
          <tbody>
            {CATEGORIES.map((cat) => {
              const matches = parseInt(cat, 10);
              const p = calculateProbability(matches);
              const label = cat === '5' ? 'Punti 5 (Casa)' : `Punti ${cat}`;
              return (
                <tr key={cat} className="border-t border-border">
                  <td className="p-3 font-bold">{label}</td>
                  <td className="p-3 text-right font-mono">
                    {(p.probability * 100).toFixed(p.probability < 1e-4 ? 6 : 4)}%
                  </td>
                  <td className="p-3 text-right font-mono text-primary">{formatNumber(p.oneIn)}</td>
                  <td className="p-3 text-right font-mono text-foreground/85">
                    {cat === '5' ? 'Casa + €200.000' : formatCurrency(AVERAGE_PRIZES[cat])}
                  </td>
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
          <strong>Formula:</strong> P(X=k) = C(5,k) · C(35, 5-k) / C(40, 5).
          Il giocatore sceglie 5 numeri tra 40; vengono estratti 5 numeri.
        </p>
        <p className="text-muted-foreground">
          Premi: 5 = casa del valore di €200.000 + €200.000 in contanti.
          4 = €200. 3 = €20. 2 = €2,60 (più del costo della giocata).
          Probabilità complessiva di vincere almeno un premio: 1 su circa 9.
        </p>
      </div>
    </div>
  );
};

export default ProbabilitaPanel;
