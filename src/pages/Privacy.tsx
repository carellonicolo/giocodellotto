import { Link } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Database, Cookie, Mail } from 'lucide-react';

const Privacy = () => {
  return (
    <main
      className="min-h-screen px-4 py-10 sm:py-16"
      style={{
        background: 'radial-gradient(ellipse at 50% 0%, hsl(220 25% 14%) 0%, hsl(220 20% 7%) 70%)',
        fontFamily: "'Space Grotesk', 'DM Sans', system-ui, sans-serif",
        color: 'hsl(220 15% 88%)',
      }}
    >
      <div className="max-w-3xl mx-auto">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm mb-6 text-white/60 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Torna alla home
        </Link>

        <div className="rounded-2xl border p-6 sm:p-10 space-y-8"
          style={{
            background: 'hsl(220 18% 14% / 0.7)',
            backdropFilter: 'blur(20px)',
            borderColor: 'hsl(220 12% 30% / 0.4)',
          }}
        >
          <header className="border-b border-white/10 pb-6">
            <div className="flex items-center gap-3 mb-2">
              <ShieldCheck className="w-7 h-7 text-emerald-400" />
              <h1 className="text-2xl sm:text-3xl font-bold text-white">Privacy Policy</h1>
            </div>
            <p className="text-sm text-white/50">
              Ultimo aggiornamento: 24 maggio 2026
            </p>
          </header>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-cyan-400" />
              Quali dati raccogliamo
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-white/80">
              <strong className="text-white">Nessun dato personale.</strong> Questo sito è un
              simulatore didattico che gira interamente nel tuo browser. Non esistono account utente,
              non c'è un backend, non c'è un database lato server.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-white/80">
              Le uniche informazioni salvate sono <strong className="text-white">tecniche</strong> e restano
              esclusivamente sul tuo dispositivo, nel <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs">localStorage</code> del browser:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-sm sm:text-base text-white/80">
              <li>
                <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs">global-disclaimer-accepted</code> —
                memorizza che hai accettato il disclaimer obbligatorio, per non rimostrartelo ad ogni visita.
              </li>
              <li>
                <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs">global-disclaimer-age-confirmed</code> —
                data e ora in cui hai confermato di avere almeno 18 anni.
              </li>
              <li>
                <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs">lotto-storico</code>,
                <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs ml-1">lotto-statistiche</code> —
                lo storico simulato delle tue giocate Lotto, salvato solo per ricostruire la sessione tra ricaricamenti.
              </li>
            </ul>
            <p className="text-sm sm:text-base leading-relaxed text-white/80">
              Puoi cancellare questi dati in qualsiasi momento svuotando i dati del sito dalle impostazioni del browser
              o usando il pulsante "Azzera statistiche" presente nei simulatori.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Cookie className="w-5 h-5 text-amber-400" />
              Cookie e tracciatori
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-white/80">
              <strong className="text-white">Non utilizziamo cookie di profilazione</strong>, nessun
              Google Analytics, nessun pixel di Facebook, nessuna piattaforma di advertising,
              nessun tracker di terze parti.
            </p>
            <p className="text-sm sm:text-base leading-relaxed text-white/80">
              Le voci tecniche elencate sopra non sono cookie HTTP: sono entry di
              <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs mx-1">localStorage</code>,
              accessibili solo a questo sito e mai trasmesse a terze parti.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Trasferimento dati a terzi
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-white/80">
              Nessun dato viene trasferito a terzi perché nessun dato viene raccolto.
              Il sito è una pagina statica servita tramite hosting (es. Cloudflare Pages) che potrebbe
              registrare log tecnici di accesso (indirizzo IP, user-agent, timestamp) ai fini di sicurezza
              e diagnostica, secondo le proprie policy. Tali log sono gestiti dal provider di hosting e
              non sono accessibili all'autore del sito.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Base giuridica (GDPR)
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-white/80">
              Poiché non viene effettuato alcun trattamento di dati personali da parte del titolare del sito,
              non ricorre l'applicazione del Regolamento UE 2016/679 (GDPR) per il funzionamento di base.
              L'utilizzo del <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs">localStorage</code>
              tecnico avviene su iniziativa dell'utente (accettazione del disclaimer, uso del simulatore) ed
              è strettamente necessario al funzionamento del servizio (art. 122 D.Lgs. 196/2003 e linee guida
              Garante Privacy del 10 giugno 2021).
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white">
              Diritti dell'utente
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-white/80">
              Non avendo dati personali memorizzati lato server, non è applicabile la procedura standard di
              esercizio dei diritti (accesso, rettifica, cancellazione, portabilità). Per cancellare le
              informazioni tecniche del browser è sufficiente:
            </p>
            <ul className="list-disc pl-6 space-y-1 text-sm sm:text-base text-white/80">
              <li>Cancellare i dati del sito dalle impostazioni del browser, oppure</li>
              <li>Usare la modalità navigazione in incognito, oppure</li>
              <li>Eseguire <code className="bg-white/10 px-1.5 py-0.5 rounded text-xs">localStorage.clear()</code> dalla console</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
              <Mail className="w-5 h-5 text-cyan-400" />
              Contatti
            </h2>
            <p className="text-sm sm:text-base leading-relaxed text-white/80">
              Per qualsiasi domanda relativa alla privacy o al funzionamento del sito puoi scrivere all'autore
              o aprire una issue sulla repository pubblica del progetto.
            </p>
          </section>

          <footer className="pt-6 border-t border-white/10 text-xs text-white/40 leading-relaxed">
            Questo simulatore didattico non è affiliato a Lottomatica S.p.A., Sisal S.p.A. o all'Agenzia delle
            Dogane e dei Monopoli. I marchi citati sono dei rispettivi proprietari e vengono utilizzati per
            finalità descrittive a scopo educativo (art. 21 c.p.i. e art. 70 L. 633/1941).
          </footer>
        </div>
      </div>
    </main>
  );
};

export default Privacy;
