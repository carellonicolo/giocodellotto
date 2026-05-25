import React from 'react';
import { type ColumnSelection, NUMBERS_TO_PICK, TICKET_COST } from '@/lib/vincicasa/vincicasa';
import SchedinaColumn from './SchedinaColumn';

interface SchedinaProps {
  columns: ColumnSelection[];
  onColumnsChange: (cols: ColumnSelection[]) => void;
  onPlay: () => void;
  matchedByColumn: number[][];
  disabled?: boolean;
}

/** Mini logo "Casa" stilizzato in SVG, originale (nessuna riproduzione del marchio) */
const HouseGlyph: React.FC<{ size?: number }> = ({ size = 36 }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none">
    <defs>
      <linearGradient id="vcRoof" x1="0" x2="0" y1="0" y2="1">
        <stop offset="0%" stopColor="#FFD600" />
        <stop offset="100%" stopColor="#FF9800" />
      </linearGradient>
    </defs>
    <path d="M32 6 L58 30 L52 30 L52 56 L40 56 L40 40 L24 40 L24 56 L12 56 L12 30 L6 30 Z" fill="url(#vcRoof)" stroke="#fff" strokeWidth="2" strokeLinejoin="round" />
    <rect x="28" y="44" width="8" height="12" fill="#004D5A" />
    <rect x="16" y="34" width="6" height="6" fill="#E0F7FA" stroke="#004D5A" />
    <rect x="42" y="34" width="6" height="6" fill="#E0F7FA" stroke="#004D5A" />
  </svg>
);

const Schedina: React.FC<SchedinaProps> = ({
  columns,
  onColumnsChange,
  onPlay,
  matchedByColumn,
  disabled,
}) => {
  const updateColumn = (index: number, newCol: ColumnSelection) => {
    const next = [...columns];
    next[index] = newCol;
    onColumnsChange(next);
  };

  const handleClearAll = () => {
    onColumnsChange(columns.map(() => ({ numbers: [] })));
  };

  const handleRandomAll = () => {
    const next = columns.map(() => {
      const pool = Array.from({ length: 40 }, (_, i) => i + 1);
      for (let i = 0; i < NUMBERS_TO_PICK; i++) {
        const j = i + Math.floor(Math.random() * (40 - i));
        [pool[i], pool[j]] = [pool[j], pool[i]];
      }
      return { numbers: pool.slice(0, NUMBERS_TO_PICK).sort((a, b) => a - b) };
    });
    onColumnsChange(next);
  };

  const filled = columns.filter((c) => c.numbers.length === NUMBERS_TO_PICK);
  const totalCost = filled.length * TICKET_COST;

  return (
    <div className="flex flex-col items-center">
      <div
        className="w-full overflow-hidden"
        style={{
          background: '#FFFFFF',
          borderRadius: '14px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.28), 0 4px 12px rgba(0,0,0,0.18), inset 0 0 0 1px rgba(0,0,0,0.05)',
          border: '2px solid #00838F',
          fontFamily: "'Arial', sans-serif",
        }}
      >
        {/* === Header turchese === */}
        <div
          style={{
            background: 'linear-gradient(135deg, #00ACC1 0%, #00838F 60%, #004D5A 100%)',
            padding: '16px 18px 14px',
            position: 'relative',
            borderBottom: '4px solid #FFD600',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '14px', flexWrap: 'wrap' }}>
            {/* Logo */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <HouseGlyph size={44} />
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px', lineHeight: 1 }}>
                  <span
                    style={{
                      fontFamily: "'Arial Black', sans-serif",
                      fontWeight: 900,
                      fontStyle: 'italic',
                      fontSize: 'clamp(20px, 3.5vw, 32px)',
                      color: '#fff',
                      textShadow: '2px 2px 0 #004D5A, 3px 3px 6px rgba(0,0,0,0.25)',
                      letterSpacing: '-0.5px',
                    }}
                  >
                    Vinci
                  </span>
                  <span
                    style={{
                      fontFamily: "'Arial Black', sans-serif",
                      fontWeight: 900,
                      fontStyle: 'italic',
                      fontSize: 'clamp(20px, 3.5vw, 32px)',
                      color: '#FFD600',
                      textShadow: '2px 2px 0 #004D5A, 3px 3px 6px rgba(0,0,0,0.25)',
                      letterSpacing: '-0.5px',
                    }}
                  >
                    Casa
                  </span>
                </div>
                <span
                  style={{
                    marginTop: '2px',
                    color: '#FFD600',
                    fontFamily: "'Arial', sans-serif",
                    fontWeight: 700,
                    fontSize: 'clamp(10px, 1.3vw, 12px)',
                    letterSpacing: '2px',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                    textTransform: 'uppercase',
                  }}
                >
                  Lotteria Nazionale
                </span>
              </div>
            </div>

            {/* Prize block */}
            <div
              style={{
                background: 'rgba(255,255,255,0.95)',
                padding: '8px 14px',
                borderRadius: '10px',
                border: '2px solid #FFD600',
                textAlign: 'center',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
              }}
            >
              <div
                style={{
                  fontSize: '10px',
                  fontWeight: 800,
                  color: '#004D5A',
                  letterSpacing: '0.5px',
                  textTransform: 'uppercase',
                }}
              >
                Vinci una
              </div>
              <div
                style={{
                  fontSize: 'clamp(15px, 2vw, 19px)',
                  fontWeight: 900,
                  color: '#BF360C',
                  fontFamily: "'Arial Black', sans-serif",
                  lineHeight: 1.1,
                }}
              >
                CASA + 200.000€
              </div>
              <div
                style={{
                  fontSize: '9px',
                  fontWeight: 700,
                  color: '#004D5A',
                  marginTop: '2px',
                  letterSpacing: '0.3px',
                }}
              >
                in palio ogni sera
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div
            style={{
              marginTop: '12px',
              background: '#fff',
              color: '#004D5A',
              padding: '6px 14px',
              borderRadius: '20px',
              display: 'inline-block',
              fontSize: 'clamp(10px, 1.4vw, 13px)',
              fontWeight: 700,
              border: '2px solid #FFD600',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            }}
          >
            🏠 Scegli {NUMBERS_TO_PICK} numeri da 1 a 40 per ogni pannello.
          </div>
        </div>

        {/* Global action bar */}
        <div
          style={{
            background: '#E0F7FA',
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            borderBottom: '1px solid #B2EBF2',
          }}
        >
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#004D5A', letterSpacing: '0.3px' }}>
            {filled.length}/{columns.length} PANNELLI COMPILATI
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={handleRandomAll}
              disabled={disabled}
              style={{
                background: 'linear-gradient(180deg, #FFD600, #FFA000)',
                color: '#004D5A',
                border: '1px solid #00838F',
                borderRadius: '4px',
                padding: '4px 10px',
                fontSize: '10px',
                fontWeight: 900,
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.5 : 1,
                textTransform: 'uppercase',
                fontFamily: "'Arial Black', sans-serif",
                letterSpacing: '0.3px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.15)',
              }}
            >
              ✦ Compila casualmente
            </button>
            <button
              onClick={handleClearAll}
              disabled={disabled}
              style={{
                background: '#fff',
                color: '#C62828',
                border: '1px solid #C62828',
                borderRadius: '4px',
                padding: '4px 10px',
                fontSize: '10px',
                fontWeight: 800,
                cursor: disabled ? 'not-allowed' : 'pointer',
                opacity: disabled ? 0.5 : 1,
                textTransform: 'uppercase',
                fontFamily: "'Arial Black', sans-serif",
                letterSpacing: '0.3px',
              }}
            >
              ✕ Cancella
            </button>
          </div>
        </div>

        {/* Panels */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3" style={{ background: '#E0F7FA' }}>
          {columns.map((col, idx) => (
            <SchedinaColumn
              key={idx}
              index={idx}
              column={col}
              onChange={(newCol) => updateColumn(idx, newCol)}
              matchedNumbers={matchedByColumn[idx] || []}
              disabled={disabled}
            />
          ))}
        </div>

        {/* Bottom footer */}
        <div
          style={{
            background: 'linear-gradient(180deg, #004D5A 0%, #003540 100%)',
            padding: '10px 14px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '10px',
            borderTop: '3px solid #FFD600',
            flexWrap: 'wrap',
          }}
        >
          <div
            style={{
              color: '#fff',
              fontSize: '10px',
              fontWeight: 700,
              lineHeight: 1.3,
              textTransform: 'uppercase',
              letterSpacing: '0.4px',
            }}
          >
            <div style={{ fontSize: '11px', fontWeight: 900, color: '#FFD600' }}>
              ⏰ ESTRAZIONE TUTTI I GIORNI ALLE 20:00
            </div>
            <div>Costo €{TICKET_COST} a pannello · Vinci con almeno 2 numeri</div>
          </div>

          <div
            style={{
              background: 'rgba(255,255,255,0.15)',
              padding: '4px 10px',
              borderRadius: '6px',
              border: '1px solid rgba(255,255,255,0.3)',
              color: '#fff',
              fontWeight: 900,
              fontSize: '13px',
              fontFamily: "'Arial Black', sans-serif",
              letterSpacing: '0.5px',
            }}
          >
            TOTALE: <span style={{ color: '#FFD600' }}>€{totalCost.toFixed(2)}</span>
          </div>
        </div>
      </div>

      {/* GIOCA */}
      <button
        onClick={onPlay}
        disabled={disabled || filled.length === 0}
        className="mt-5 transition-all hover:scale-105 active:scale-95 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
        style={{
          padding: '14px 48px',
          borderRadius: '12px',
          background:
            filled.length > 0
              ? 'linear-gradient(180deg, #00BCD4 0%, #00838F 50%, #004D5A 100%)'
              : '#999',
          color: '#fff',
          border: filled.length > 0 ? '2px solid #004D5A' : '2px solid #777',
          fontFamily: "'Arial Black', Impact, sans-serif",
          fontSize: '18px',
          fontWeight: 900,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          textShadow: '1px 2px 4px rgba(0,0,0,0.4)',
          boxShadow:
            filled.length > 0
              ? '0 6px 20px rgba(0,131,143,0.5), inset 0 1px 0 rgba(255,255,255,0.4)'
              : 'none',
          cursor: disabled || filled.length === 0 ? 'not-allowed' : 'pointer',
        }}
      >
        {disabled ? '⏳ Estrazione...' : '▶ GIOCA'}
      </button>
    </div>
  );
};

export default Schedina;
