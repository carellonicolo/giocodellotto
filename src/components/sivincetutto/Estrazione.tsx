import React from 'react';
import { type ExtractionResult, NUMBERS_DRAWN } from '@/lib/sivincetutto/sivincetutto';

interface EstrazioneProps {
  extraction: ExtractionResult;
  isAnimating: boolean;
  revealedCount: number;
}

const Estrazione: React.FC<EstrazioneProps> = ({ extraction, isAnimating, revealedCount }) => {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="text-base sm:text-lg font-bold uppercase tracking-widest text-foreground/85">
          🎲 Numeri Estratti
        </h3>
        <p className="text-xs text-muted-foreground mt-1">
          {NUMBERS_DRAWN} numeri dal 1 al 90 · Estrazione settimanale (mercoledì 20:00)
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
        {extraction.numbers.map((num, idx) => {
          const revealed = idx < revealedCount;
          return (
            <div
              key={idx}
              style={{
                width: 'clamp(44px, 7vw, 60px)',
                height: 'clamp(44px, 7vw, 60px)',
                borderRadius: '50%',
                background: revealed
                  ? 'linear-gradient(135deg, #FF6F00, #BF360C)'
                  : 'rgba(255,255,255,0.05)',
                border: revealed ? '3px solid #FFD600' : '2px dashed rgba(255,255,255,0.2)',
                color: revealed ? '#fff' : 'rgba(255,255,255,0.3)',
                fontFamily: "'Arial Black', sans-serif",
                fontSize: 'clamp(16px, 2.5vw, 22px)',
                fontWeight: 900,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: revealed
                  ? '0 4px 12px rgba(230,81,0,0.5), inset 0 2px 0 rgba(255,255,255,0.2)'
                  : 'none',
                transform: revealed && isAnimating && idx === revealedCount - 1 ? 'scale(1.18)' : 'scale(1)',
                transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
              }}
            >
              {revealed ? num : '?'}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Estrazione;
