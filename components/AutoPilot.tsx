
import React, { useState, useEffect, useRef } from 'react';
import { PLANETS } from '../constants';
import { Planet } from '../types';

const AutoPilot: React.FC = () => {
  const [destination, setDestination] = useState<Planet | null>(null);
  const [isFlying, setIsFlying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [logs, setLogs] = useState<string[]>(['מערכת מוכנה לשיגור. בחר יעד.']);
  const [coordinates, setCoordinates] = useState({ ra: '00h 00m 00s', dec: '+00° 00\' 00"' });
  
  const timerRef = useRef<number | null>(null);

  const generateCoordinates = (planet: Planet) => {
    const raH = Math.floor(Math.random() * 24).toString().padStart(2, '0');
    const raM = Math.floor(Math.random() * 60).toString().padStart(2, '0');
    const raS = Math.floor(Math.random() * 60).toString().padStart(2, '0');
    const decD = (Math.random() > 0.5 ? '+' : '-') + Math.floor(Math.random() * 90).toString().padStart(2, '0');
    const decM = Math.floor(Math.random() * 60).toString().padStart(2, '0');
    const decS = Math.floor(Math.random() * 60).toString().padStart(2, '0');
    
    return {
      ra: `${raH}h ${raM}m ${raS}s`,
      dec: `${decD}° ${decM}' ${decS}"`
    };
  };

  const handleLaunch = () => {
    if (!destination) return;
    
    setIsFlying(true);
    setProgress(0);
    const coords = generateCoordinates(destination);
    setCoordinates(coords);
    setLogs([`מחשב מסלול ל${destination.name}...`, `קואורדינטות: RA ${coords.ra}, Dec ${coords.dec}`]);

    const duration = 8000; // 8 seconds flight
    const interval = 50;
    const steps = duration / interval;
    let currentStep = 0;

    const messages = [
      "מפעיל מנועי דחף...",
      "עובר את מהירות הקול...",
      "יוצא מהאטמוספירה...",
      "מתחבר לרשת הניווט הבין-גלקטית...",
      "מזהה גופי שמיים קרובים...",
      "מבצע תיקון מסלול...",
      "נכנס למסלול כבידה של היעד...",
      "מפעיל מנועי בלימה...",
      "מתכונן לנחיתה..."
    ];

    timerRef.current = window.setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(newProgress);

      if (currentStep % 20 === 0 && messages.length > 0) {
        const msg = messages.shift();
        if (msg) setLogs(prev => [msg, ...prev].slice(0, 8));
      }

      if (newProgress >= 100) {
        if (timerRef.current) clearInterval(timerRef.current);
        setIsFlying(false);
        setLogs(prev => [`הגענו ליעד! ברוכים הבאים ל${destination.name}.`, ...prev].slice(0, 8));
      }
    }, interval);
  };

  const handleReset = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsFlying(false);
    setProgress(0);
    setDestination(null);
    setLogs(['מערכת מוכנה לשיגור. בחר יעד.']);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-12">
      <div className="text-center">
        <h2 className="text-3xl md:text-5xl font-black mb-4">טייס אוטומטי בין-כוכבי</h2>
        <p className="text-slate-400 max-w-xl mx-auto">
          בחרו יעד, והחללית שלנו תיקח אתכם לשם בבטחה תוך חישוב מסלול מדויק לפי קואורדינטות שמימיות.
        </p>
      </div>

      {!isFlying && progress < 100 ? (
        <div className="bg-slate-900/60 p-6 md:p-10 rounded-3xl border border-slate-700 backdrop-blur-md shadow-2xl">
          <h3 className="text-xl font-bold mb-6 text-cyan-400">בחר יעד לטיסה:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {PLANETS.map((planet) => (
              <button
                key={planet.id}
                onClick={() => setDestination(planet)}
                className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 group ${
                  destination?.id === planet.id 
                    ? 'border-cyan-500 bg-cyan-900/20 shadow-lg shadow-cyan-900/40' 
                    : 'border-slate-700 bg-slate-800/50 hover:border-slate-500'
                }`}
              >
                <div className={`w-12 h-12 rounded-full ${planet.color} overflow-hidden`}>
                   <img src={planet.image} alt="" className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="font-bold">{planet.name}</span>
              </button>
            ))}
          </div>

          <button
            disabled={!destination}
            onClick={handleLaunch}
            className={`mt-10 w-full py-5 rounded-2xl font-black text-2xl transition-all shadow-xl ${
              destination 
                ? 'bg-gradient-to-r from-cyan-600 to-purple-600 hover:scale-[1.02] active:scale-[0.98]' 
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            {destination ? `שגר חללית ל${destination.name}! 🚀` : 'בחר יעד קודם'}
          </button>
        </div>
      ) : (
        <div className="bg-black p-6 md:p-10 rounded-3xl border-4 border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
          {/* Dashboard UI */}
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <div className="grid grid-cols-10 h-full border-l border-slate-500/20">
              {Array.from({length: 10}).map((_, i) => <div key={i} className="border-r border-slate-500/20 h-full"></div>)}
            </div>
          </div>

          <div className="relative z-10 flex flex-col gap-8">
            <div className="flex justify-between items-start flex-wrap gap-4">
              <div>
                <div className="text-xs text-cyan-500 font-mono mb-1 uppercase tracking-widest">Target Status</div>
                <h3 className="text-3xl font-black text-white">{destination?.name} <span className="text-slate-500 text-lg">({destination?.englishName})</span></h3>
              </div>
              <div className="bg-slate-900 p-4 rounded-xl border border-slate-700 font-mono">
                <div className="text-[10px] text-slate-500 mb-1">CELESTIAL COORDINATES</div>
                <div className="text-cyan-400 text-sm">RA: {coordinates.ra}</div>
                <div className="text-cyan-400 text-sm">DEC: {coordinates.dec}</div>
              </div>
            </div>

            <div className="h-64 md:h-80 w-full bg-slate-950 rounded-2xl border border-slate-800 relative overflow-hidden flex items-center justify-center">
              {/* Starfield simulation during flight */}
              <div className={`absolute inset-0 overflow-hidden pointer-events-none ${isFlying ? 'animate-pulse' : ''}`}>
                 {Array.from({length: 40}).map((_, i) => (
                   <div 
                    key={i} 
                    className="absolute bg-white rounded-full opacity-60"
                    style={{
                      width: Math.random() * 3 + 'px',
                      height: Math.random() * 3 + 'px',
                      left: Math.random() * 100 + '%',
                      top: Math.random() * 100 + '%',
                      animation: isFlying ? `drift ${Math.random() * 2 + 1}s infinite linear` : 'none'
                    }}
                   ></div>
                 ))}
              </div>
              
              <div className={`text-9xl transition-all duration-1000 transform ${isFlying ? 'scale-110 rotate-12 translate-y-[-10px]' : 'scale-100'}`}>
                {isFlying ? '🚀' : progress >= 100 ? '🛸' : '🚀'}
              </div>

              {progress >= 100 && (
                <div className="absolute inset-0 bg-cyan-500/10 flex items-center justify-center">
                   <div className="bg-slate-900/90 p-6 rounded-2xl border border-cyan-500 text-center animate-fadeIn shadow-2xl">
                      <div className="text-4xl mb-2">📍</div>
                      <div className="text-2xl font-black text-white">הנחיתה הושלמה!</div>
                      <div className="text-cyan-400 mt-2">ברוכים הבאים ל{destination?.name}</div>
                   </div>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-xs font-mono text-slate-500 uppercase">
                <span>Distance Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                <div 
                  className="h-full bg-gradient-to-r from-cyan-500 to-purple-600 transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.5)]" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-800 font-mono text-sm">
              <div className="flex items-center gap-2 mb-4 text-cyan-500 border-b border-slate-800 pb-2">
                <span className="animate-pulse">●</span>
                <span>FLIGHT LOG SYSTEM v2.4</span>
              </div>
              <div className="space-y-1 h-32 overflow-y-auto no-scrollbar">
                {logs.map((log, i) => (
                  <div key={i} className={i === 0 ? 'text-white' : 'text-slate-500'}>
                    [{new Date().toLocaleTimeString('he-IL')}] {log}
                  </div>
                ))}
              </div>
            </div>

            {!isFlying && progress >= 100 && (
              <button
                onClick={handleReset}
                className="w-full py-4 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold transition-all border border-slate-600"
              >
                חזרה לבסיס האם 🌍
              </button>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700">
          <h4 className="text-lg font-bold mb-3 flex items-center gap-2 text-purple-400">
            <span>📚</span> מהן קואורדינטות שמימיות?
          </h4>
          <p className="text-sm text-slate-300 leading-relaxed">
            בדיוק כמו שיש לנו קווי אורך ורוחב בכדור הארץ, אסטרונומים משתמשים ב<strong>עלייה ישרה (Right Ascension)</strong> וב<strong>נטייה (Declination)</strong> כדי למצוא כוכבים וכוכבי לכת בשמיים. 
            זה עוזר לחלליות שלנו לדעת בדיוק לאיזה כיוון לטוס!
          </p>
        </div>
        <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700">
          <h4 className="text-lg font-bold mb-3 flex items-center gap-2 text-cyan-400">
            <span>🛰️</span> איך הטייס האוטומטי עובד?
          </h4>
          <p className="text-sm text-slate-300 leading-relaxed">
            המחשב של החללית מחשב את המרחק העצום בין כדור הארץ ליעד, מזהה מכשולים כמו אסטרואידים, ומשתמש בכבידה של השמש כדי "לגלוש" במהירות שיא. המערכת שלנו מעדכנת את יומן הטיסה בכל כמה שניות כדי שתדעו בדיוק מה קורה בחוץ.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AutoPilot;
