/**
 * Logo "Il Gioco del Lotto" rifatto da zero in HTML/CSS per evitare
 * riproduzione di asset grafici registrati. Carattere e palette sono
 * indipendenti dal logo ufficiale Lottomatica.
 */
export const LottoBrandLogo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={className}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '8px 0',
        background:
          'linear-gradient(135deg, hsl(15 75% 38%), hsl(15 80% 55%), hsl(15 85% 62%))',
        gap: '2px',
      }}
    >
      <span
        style={{
          color: 'rgba(255, 255, 255, 0.92)',
          fontFamily: "'DM Sans', 'Arial', sans-serif",
          fontWeight: 700,
          fontSize: 'clamp(8px, 1.4vw, 11px)',
          letterSpacing: '3px',
          textTransform: 'uppercase',
          textShadow: '0 1px 2px rgba(0,0,0,0.25)',
        }}
      >
        Il Simulatore del
      </span>
      <span
        style={{
          color: '#fff',
          fontFamily: "'DM Sans', 'Arial Black', sans-serif",
          fontWeight: 900,
          fontSize: 'clamp(22px, 4.5vw, 38px)',
          letterSpacing: '4px',
          textShadow: '1px 2px 0 hsl(15 75% 28%), 2px 4px 8px rgba(0,0,0,0.3)',
          lineHeight: 1,
          textTransform: 'uppercase',
        }}
      >
        LOTTO
      </span>
      <span
        style={{
          marginTop: '3px',
          height: '3px',
          width: '60%',
          background:
            'linear-gradient(90deg, transparent, rgba(255,255,255,0.55), transparent)',
          borderRadius: '2px',
        }}
      />
    </div>
  );
};

export default LottoBrandLogo;
