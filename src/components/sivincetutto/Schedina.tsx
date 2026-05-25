import React from 'react';
import { type ColumnSelection, NUMBERS_TO_PICK, TICKET_COST } from '@/lib/sivincetutto/sivincetutto';
import SchedinaColumn from './SchedinaColumn';

interface SchedinaProps {
  columns: ColumnSelection[];
  onColumnsChange: (cols: ColumnSelection[]) => void;
  onPlay: () => void;
  matchedByColumn: number[][];
  disabled?: boolean;
}

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
      const pool = Array.from({ length: 90 }, (_, i) => i + 1);
      for (let i = 0; i < NUMBERS_TO_PICK; i++) {
        const j = i + Math.floor(Math.random() * (90 - i));
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
      {/* === Ticket container === */}
      <div
        className="w-full overflow-hidden"
        style={{
          background: '#FFFFFF',
          borderRadius: '14px',
          boxShadow: '0 12px 40px rgba(0,0,0,0.28), 0 4px 12px rgba(0,0,0,0.18), inset 0 0 0 1px rgba(0,0,0,0.05)',
          border: '2px solid #E65100',
          fontFamily: "'Arial', sans-serif",
        }}
      >
        {/* === Header arancione === */}
        <div
          style={{
            background: 'linear-gradient(135deg, #FF6F00 0%, #E65100 60%, #BF360C 100%)',
            padding: '16px 18px 14px',
            position: 'relative',
            borderBottom: '4px solid #FFD600',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
            {/* Logo "Si Vince Tutto" */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '0px', lineHeight: 1 }}>
                <span
                  style={{
                    fontFamily: "'Arial Black', sans-serif",
                    fontWeight: 900,
                    fontStyle: 'italic',
                    fontSize: 'clamp(24px, 4vw, 38px)',
                    color: '#FFD600',
                    textShadow: '2px 2px 0 #BF360C, 3px 3px 6px rgba(0,0,0,0.25)',
                    letterSpacing: '-1px',
                  }}
                >
                  Si
                </span>
                <span
                  style={{
                    fontFamily: "'Arial Black', sans-serif",
                    fontWeight: 900,
                    fontStyle: 'italic',
                    fontSize: 'clamp(24px, 4vw, 38px)',
                    color: '#fff',
                    textShadow: '2px 2px 0 #BF360C, 3px 3px 6px rgba(0,0,0,0.25)',
                    letterSpacing: '-1px',
                  }}
                >
                  Vince
                </span>
                <span
                  style={{
                    fontFamily: "'Arial Black', sans-serif",
                    fontWeight: 900,
                    fontStyle: 'italic',
                    fontSize: 'clamp(24px, 4vw, 38px)',
                    color: '#FFD600',
                    textShadow: '2px 2px 0 #BF360C, 3px 3px 6px rgba(0,0,0,0.25)',
                    letterSpacing: '-1px',
                  }}
                >
                  Tutto
                </span>
              </div>
              <span
                style={{
                  marginTop: '2px',
                  color: '#fff',
                  fontFamily: "'Arial', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(10px, 1.4vw, 13px)',
                  letterSpacing: '2px',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.3)',
                }}
              >
                SuperEnalotto
              </span>
            </div>

            {/* Right side: feature highlights */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-end',
                gap: '4px',
                textAlign: 'right',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span
                  style={{
                    fontFamily: "'Arial Black', sans-serif",
                    fontWeight: 900,
                    fontSize: 'clamp(22px, 3.5vw, 32px)',
                    color: '#FFD600',
                    textShadow: '2px 2px 0 #BF360C',
                    lineHeight: 1,
                  }}
                >
                  6
                </span>
                <span
                  style={{
                    color: '#fff',
                    fontFamily: "'Arial', sans-serif",
                    fontWeight: 900,
                    fontSize: 'clamp(10px, 1.4vw, 13px)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Numeri per vincere
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px' }}>
                <span
                  style={{
                    fontFamily: "'Arial Black', sans-serif",
                    fontWeight: 900,
                    fontSize: 'clamp(22px, 3.5vw, 32px)',
                    color: '#FFD600',
                    textShadow: '2px 2px 0 #BF360C',
                    lineHeight: 1,
                  }}
                >
                  12
                </span>
                <span
                  style={{
                    color: '#fff',
                    fontFamily: "'Arial', sans-serif",
                    fontWeight: 900,
                    fontSize: 'clamp(10px, 1.4vw, 13px)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                  }}
                >
                  Per provarci
                </span>
              </div>
              <span
                style={{
                  color: '#FFD600',
                  fontFamily: "'Arial', sans-serif",
                  fontWeight: 700,
                  fontSize: 'clamp(9px, 1.2vw, 11px)',
                  fontStyle: 'italic',
                }}
              >
                Vinci anche se fai 5, 4, 3 e 2
              </span>
            </div>
          </div>

          {/* Speech bubble */}
          <div
            style={{
              marginTop: '12px',
              background: '#fff',
              color: '#BF360C',
              padding: '6px 14px',
              borderRadius: '20px',
              display: 'inline-block',
              fontSize: 'clamp(10px, 1.4vw, 13px)',
              fontWeight: 700,
              border: '2px solid #FFD600',
              boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
            }}
          >
            🗣 Compila la schedina: scegli {NUMBERS_TO_PICK} numeri da 1 a 90 per ogni colonna.
          </div>
        </div>

        {/* Global action bar */}
        <div
          style={{
            background: '#FFF3E0',
            padding: '8px 12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '8px',
            borderBottom: '1px solid #FFCC80',
          }}
        >
          <div style={{ fontSize: '11px', fontWeight: 800, color: '#BF360C', letterSpacing: '0.3px' }}>
            {filled.length}/{columns.length} COLONNE COMPILATE
          </div>
          <div style={{ display: 'flex', gap: '6px' }}>
            <button
              onClick={handleRandomAll}
              disabled={disabled}
              style={{
                background: 'linear-gradient(180deg, #FFD600, #FFA000)',
                color: '#BF360C',
                border: '1px solid #E65100',
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

        {/* Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3" style={{ background: '#FFF3E0' }}>
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
            background: 'linear-gradient(180deg, #BF360C 0%, #8B2C0A 100%)',
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
              ⏰ L'ESTRAZIONE È OGNI MERCOLEDÌ ALLE 20:00
            </div>
            <div>Costo €{TICKET_COST} a colonna · Vinci con almeno 2 numeri indovinati</div>
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
              ? 'linear-gradient(180deg, #FFD600 0%, #FF6F00 50%, #E65100 100%)'
              : '#999',
          color: '#fff',
          border: filled.length > 0 ? '2px solid #BF360C' : '2px solid #777',
          fontFamily: "'Arial Black', Impact, sans-serif",
          fontSize: '18px',
          fontWeight: 900,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          textShadow: '1px 2px 4px rgba(0,0,0,0.4)',
          boxShadow:
            filled.length > 0
              ? '0 6px 20px rgba(230,81,0,0.5), inset 0 1px 0 rgba(255,255,255,0.4)'
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
