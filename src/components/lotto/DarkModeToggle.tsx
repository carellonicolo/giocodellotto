import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

export function DarkModeToggle() {
  const [dark, setDark] = useState(() => {
    if (typeof window === 'undefined') return false;
    return document.documentElement.classList.contains('dark') ||
      (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
  });

  useEffect(() => {
    if (dark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [dark]);

  // Init on mount
  useEffect(() => {
    const saved = localStorage.getItem('theme');
    if (saved === 'dark') {
      setDark(true);
    } else if (saved === 'light') {
      setDark(false);
    }
  }, []);

  return (
    <button
      onClick={() => setDark(d => !d)}
      className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
      aria-label={dark ? 'Attiva modalità chiara' : 'Attiva modalità scura'}
      title={dark ? 'Modalità chiara' : 'Modalità scura'}
    >
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
