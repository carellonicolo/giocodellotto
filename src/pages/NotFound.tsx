import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center" style={{
      background: 'radial-gradient(ellipse at 50% 0%, hsl(220 25% 14%) 0%, hsl(220 20% 7%) 70%)',
    }}>
      <div className="text-center">
        <h1 className="mb-4 text-6xl font-bold" style={{ color: 'hsl(0 0% 90%)' }}>404</h1>
        <p className="mb-6 text-lg" style={{ color: 'hsl(220 15% 55%)' }}>Pagina non trovata</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link to="/" className="px-4 py-2 rounded-lg text-sm font-semibold transition-colors" style={{
            background: 'hsl(220 15% 18%)',
            color: 'hsl(0 0% 90%)',
            border: '1px solid hsl(220 15% 25%)',
          }}>
            Home
          </Link>
          <Link to="/giocodellotto" className="px-4 py-2 rounded-lg text-sm font-semibold transition-colors" style={{
            background: 'hsl(15 85% 55% / 0.15)',
            color: 'hsl(15 85% 65%)',
            border: '1px solid hsl(15 85% 55% / 0.3)',
          }}>
            Gioco del Lotto
          </Link>
          <Link to="/superenalotto" className="px-4 py-2 rounded-lg text-sm font-semibold transition-colors" style={{
            background: 'hsl(45 100% 51% / 0.12)',
            color: 'hsl(45 100% 60%)',
            border: '1px solid hsl(45 100% 51% / 0.25)',
          }}>
            SuperEnalotto
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
