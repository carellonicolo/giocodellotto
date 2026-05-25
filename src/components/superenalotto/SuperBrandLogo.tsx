/**
 * Logo "SuperEnalotto" rifatto in HTML/CSS per evitare riproduzione
 * dell'asset ufficiale Sisal. La testata mantiene l'identità visiva
 * "Super + EnaLotto" ma con tipografia e palette indipendenti.
 */
export const SuperBrandLogo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={className}
      style={{
        display: 'inline-flex',
        alignItems: 'baseline',
        gap: '4px',
        padding: '4px 10px',
        background: 'rgba(255,255,255,0.96)',
        borderRadius: '8px',
        boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
        fontFamily: "'Arial Black', 'Arial', sans-serif",
        fontStyle: 'italic',
      }}
    >
      <span
        style={{
          color: '#E91E63',
          fontWeight: 900,
          fontSize: 'clamp(16px, 2.5vw, 22px)',
          letterSpacing: '-0.5px',
          lineHeight: 1,
          textShadow: '1px 1px 0 rgba(0,0,0,0.08)',
        }}
      >
        Super
      </span>
      <span
        style={{
          color: '#2E7D32',
          fontWeight: 900,
          fontSize: 'clamp(16px, 2.5vw, 22px)',
          letterSpacing: '-0.5px',
          lineHeight: 1,
          textShadow: '1px 1px 0 rgba(0,0,0,0.08)',
        }}
      >
        Enalotto
      </span>
    </div>
  );
};

export default SuperBrandLogo;
