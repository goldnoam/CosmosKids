import React, { useState, useEffect, useRef } from 'react';
import { ALL_DESTINATIONS } from '../constants';
import { Planet } from '../types';

type FailureType = 'NAV_ERROR' | 'COMM_LOSS' | 'ENGINE_HEAT' | null;

const AutoPilot: React.FC = () => {
  const [destination, setDestination] = useState<Planet | null>(null);
  const [isFlying, setIsFlying] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isFailed, setIsFailed] = useState(false);
  const [failureType, setFailureType] = useState<FailureType>(null);
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

  const handleLaunchAttempt = () => {
    if (!destination) return;
    setShowConfirmation(true);
  };

  const startFlight = (resume = false) => {
    if (!destination) return;
    
    setShowConfirmation(false);
    setIsFlying(true);
    setIsPaused(false);
    setIsFailed(false);
    setFailureType(null);
    
    if (!resume) {
      setProgress(0);
      const coords = generateCoordinates(destination);
      setCoordinates(coords);
      setLogs([`מחשב מסלול ל${destination.name}...`, `קואורדינטות: RA ${coords.ra}, Dec ${coords.dec}`]);
    } else {
      setLogs(prev => ['מפעיל מערכות גיבוי... חוזר למסלול.', ...prev].slice(0, 8));
    }

    const duration = 8000;
    const interval = 50;
    const steps = duration / interval;
    let currentStep = Math.floor((progress / 100) * steps);

    const allMessagesList = [
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
    const messages = allMessagesList.slice(Math.floor(allMessagesList.length * (progress / 100)));

    timerRef.current = window.setInterval(() => {
      currentStep++;
      const newProgress = Math.min((currentStep / steps) * 100, 100);
      setProgress(newProgress);

      if (!resume && newProgress > 30 && newProgress < 70 && Math.random() < 0.005) {
        triggerFailure();
        return;
      }

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

  const pauseFlight = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
      setIsFlying(false);
      setIsPaused(true);
      setLogs(prev => ['טיסה הושהתה על ידי המשתמש.', ...prev].slice(0, 8));
    }
  };

  const triggerFailure = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsFlying(false);
    setIsFailed(true);
    
    const errors: { type: FailureType; log: string }[] = [
      { type: 'NAV_ERROR', log: 'שגיאה קריטית: מערכת הניווט איבדה נעילה על כוכבי ייחוס.' },
      { type: 'COMM_LOSS', log: 'אזהרה: אובדן קשר עם תחנת הקרקע. אות חלש.' },
      { type: 'ENGINE_HEAT', log: 'סכנה: התחממות יתר במנוע ימין. מעבר למצב חירום.' }
    ];
    
    const randomError = errors[Math.floor(Math.random() * errors.length)];
    setFailureType(randomError.type);
    setLogs(prev => [randomError.log, 'מבצע עצירת חירום...', ...prev].slice(0, 8));
  };

  const handleRepair = () => {
    setLogs(prev => ['מתקן מערכות...', 'מריץ בדיקת תקינות...', ...prev].slice(0, 8));
    setTimeout(() => {
      startFlight(true);
    }, 1500);
  };

  const handleReset = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsFlying(false);
    setIsPaused(false);
    setIsFailed(false);
    setFailureType(null);
    setProgress(0);
    setDestination(null);
    setLogs(['מערכת מוכנה לשיגור. בחר יעד.']);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  const getErrorTitle = () => {
    switch(failureType) {
      case 'NAV_ERROR': return 'תקלת ניווט שמימי';
      case 'COMM_LOSS': return 'ניתוק תקשורת לווינית';
      case 'ENGINE_HEAT': return 'התחממות יתר במנועים';
      default: return 'תקלה לא ידועה';
    }
  };

  const getErrorIcon = () => {
    switch(failureType) {
      case 'NAV_ERROR': return '🧭';
      case 'COMM_LOSS': return '📡';
      case 'ENGINE_HEAT': return '🔥';
      default: return '⚠️';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn pb-12">
      <div className="text-center">
        <h2 className="text-3xl md:text-5xl font-black mb-4 text-slate-900 dark:text-white">טייס אוטומטי בין-כוכבי</h2>
        <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
          בחרו יעד, והחללית שלנו תיקח אתכם לשם בבטחה תוך חישוב מסלול מדויק לפי קואורדינטות שמימיות.
        </p>
      </div>

      {!isFlying && !isFailed && !isPaused && progress < 100 ? (
        <div className="bg-white dark:bg-slate-900/60 p-6 md:p-10 rounded-3xl border border-slate-200 dark:border-slate-700 backdrop-blur-md shadow-2xl relative transition-colors">
          <h3 className="text-xl font-bold mb-6 text-cyan-600 dark:text-cyan-400">בחר יעד לטיסה:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {ALL_DESTINATIONS.map((planet) => (
              <button
                key={planet.id}
                onClick={() => setDestination(planet)}
                className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 group ${
                  destination?.id === planet.id 
                    ? 'border-cyan-500 bg-cyan-50 dark:bg-cyan-900/20 shadow-lg shadow-cyan-900/40' 
                    : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:border-slate-400 dark:hover:border-slate-500'
                }`}
              >
                <div className={`w-10 h-10 rounded-full ${planet.color} overflow-hidden flex items-center justify-center`}>
                   <img src={planet.image} alt="" className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-opacity" />
                </div>
                <span className="font-bold text-xs truncate w-full text-center text-slate-800 dark:text-white">{planet.name}</span>
              </button>
            ))}
          </div>

          <button
            disabled={!destination}
            onClick={handleLaunchAttempt}
            className={`mt-10 w-full py-5 rounded-2xl font-black text-2xl transition-all shadow-xl ${
              destination 
                ? 'bg-gradient-to-r from-cyan-600 to-purple-600 text-white hover:scale-[1.02] active:scale-[0.98]' 
                : 'bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed'
            }`}
          >
            {destination ? `שגר חללית ל${destination.name}! 🚀` : 'בחר יעד קודם'}
          </button>

          {showConfirmation && (
            <div className="absolute inset-0 z-50 flex items-center justify-center p-4">
              <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm rounded-3xl"></div>
              <div className="relative z-10 bg-white dark:bg-slate-900 border-2 border-cyan-500 p-8 rounded-3xl shadow-[0_0_50px_rgba(6,182,212,0.3)] max-w-sm w-full text-center animate-fadeIn">
                <div className="text-5xl mb-4">🛸</div>
                <h4 className="text-xl font-black text-slate-900 dark:text-white mb-2">אישור שיגור</h4>
                <p className="text-slate-600 dark:text-slate-300 mb-8">
                  האם אתם בטוחים שברצונכם לטוס ל<span className="text-cyan-600 dark:text-cyan-400 font-bold">{destination?.name}</span>?
                </p>
                <div className="flex flex-col gap-3">
                  <button
                    onClick={() => startFlight()}
                    className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-cyan-900/40"
                  >
                    כן, שגר! 🚀
                  </button>
                  <button
                    onClick={() => setShowConfirmation(false)}
                    className="w-full py-3 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl transition-all border border-slate-300 dark:border-slate-700"
                  >
                    ביטול
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="bg-slate-900 p-6 md:p-10 rounded-3xl border-4 border-slate-800 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden">
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
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono">
                <div className="text-[10px] text-slate-500 mb-1">CELESTIAL COORDINATES</div>
                <div className="text-cyan-400 text-sm">RA: {coordinates.ra}</div>
                <div className="text-cyan-400 text-sm">DEC: {coordinates.dec}</div>
              </div>
            </div>

            <div className="h-64 md:h-80 w-full bg-slate-950 rounded-2xl border border-slate-800 relative overflow-hidden flex items-center justify-center">
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
              
              <div className={`text-9xl transition-all duration-1000 transform ${isFlying ? 'scale-110 rotate-12 translate-y-[-10px]' : isFailed ? 'scale-75 rotate-45 blur-[1px]' : 'scale-100'}`}>
                {isFlying ? '🚀' : isFailed ? '💥' : progress >= 100 ? '🛸' : '🚀'}
              </div>

              {progress >= 100 && !isFailed && (
                <div className="absolute inset-0 bg-cyan-500/10 flex items-center justify-center">
                   <div className="bg-slate-900/90 p-6 rounded-2xl border border-cyan-500 text-center animate-fadeIn shadow-2xl">
                      <div className="text-4xl mb-2">📍</div>
                      <div className="text-2xl font-black text-white">הנחיתה הושלמה!</div>
                      <div className="text-cyan-400 mt-2">ברוכים הבאים ל{destination?.name}</div>
                   </div>
                </div>
              )}

              {isFailed && (
                <div className="absolute inset-0 bg-red-950/60 backdrop-blur-sm flex items-center justify-center p-6">
                   <div className="bg-slate-900 p-6 rounded-2xl border-2 border-red-600 text-center animate-fadeIn shadow-[0_0_30px_rgba(220,38,38,0.5)] max-w-xs">
                      <div className="text-4xl mb-3">{getErrorIcon()}</div>
                      <div className="text-xl font-black text-red-500 mb-2 uppercase">{getErrorTitle()}</div>
                      <p className="text-slate-300 text-sm mb-6">המערכת זיהתה כשל קריטי המונע המשך טיסה בטוחה.</p>
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={handleRepair}
                          className="w-full py-2.5 bg-green-600 hover:bg-green-500 text-white font-bold rounded-lg transition-all"
                        >
                          נסה לתקן ולהמשיך 🛠️
                        </button>
                        <button
                          onClick={handleReset}
                          className="w-full py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-400 font-bold rounded-lg transition-all"
                        >
                          בטל משימה וחזור 🏠
                        </button>
                      </div>
                   </div>
                </div>
              )}

              {isPaused && !isFailed && (
                 <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-sm flex items-center justify-center p-6">
                    <div className="bg-slate-900/95 p-8 rounded-3xl border border-cyan-500 text-center animate-fadeIn shadow-2xl">
                       <div className="text-5xl mb-4">⏸️</div>
                       <div className="text-2xl font-black text-white mb-4">טיסה הושהתה</div>
                       <button
                         onClick={() => startFlight(true)}
                         className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl transition-all shadow-lg"
                       >
                         המשך טיסה 🚀
                       </button>
                    </div>
                 </div>
              )}
            </div>

            <div className="flex gap-4">
              {isFlying && (
                <button
                  onClick={pauseFlight}
                  className="px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-xl transition-all shadow-lg flex-1"
                >
                  השהה טיסה ⏸️
                </button>
              )}
              {!isFailed && (progress < 100 || isPaused) && (
                <button
                  onClick={handleReset}
                  className="px-6 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl transition-all border border-slate-700 flex-1"
                >
                  חזור לבחירת יעד ❌
                </button>
              )}
            </div>

            <div className="space-y-4">
              <div className="flex justify-between text-xs font-mono text-slate-500 uppercase">
                <span>Distance Progress</span>
                <span className={isFailed ? 'text-red-500' : ''}>{Math.round(progress)}% {isFailed && '(FAILED)'}</span>
              </div>
              <div className="w-full h-4 bg-slate-800 rounded-full overflow-hidden border border-slate-700">
                <div 
                  className={`h-full transition-all duration-300 shadow-[0_0_15px_rgba(6,182,212,0.5)] ${isFailed ? 'bg-red-600 shadow-[0_0_15px_rgba(220,38,38,0.5)]' : 'bg-gradient-to-r from-cyan-500 to-purple-600'}`} 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            <div className={`p-6 rounded-xl border font-mono text-sm ${isFailed ? 'bg-red-900/20 border-red-900/50' : 'bg-slate-950/80 border-slate-800'}`}>
              <div className={`flex items-center gap-2 mb-4 border-b pb-2 ${isFailed ? 'text-red-500 border-red-900/50' : 'text-cyan-500 border-slate-800'}`}>
                <span className={isFlying ? 'animate-pulse' : ''}>{isFailed ? '⚠' : '●'}</span>
                <span>FLIGHT LOG SYSTEM v2.4 {isFailed && '(EMERGENCY MODE)'}</span>
              </div>
              <div className="space-y-1 h-32 overflow-y-auto no-scrollbar">
                {logs.map((log, i) => (
                  <div key={i} className={i === 0 ? (isFailed ? 'text-red-400 font-bold' : 'text-white') : 'text-slate-500'}>
                    [{new Date().toLocaleTimeString('he-IL')}] {log}
                  </div>
                ))}
              </div>
            </div>

            {!isFlying && !isFailed && progress >= 100 && (
              <button
                onClick={handleReset}
                className="w-full py-4 bg-slate-800 hover:bg-slate-700 rounded-xl font-bold transition-all border border-slate-600 text-white"
              >
                חזרה לבסיס האם 🌍
              </button>
            )}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-slate-800/40 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
          <h4 className="text-lg font-bold mb-3 flex items-center gap-2 text-purple-600 dark:text-purple-400">
            <span>📚</span> מהן קואורדינטות שמימיות?
          </h4>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            בדיוק כמו שיש לנו קווי אורך ורוחב בכדור הארץ, אסטרונומים משתמשים ב<strong>עלייה ישרה (Right Ascension)</strong> וב<strong>נטייה (Declination)</strong> כדי למצוא כוכבים וכוכבי לכת בשמיים. 
          </p>
        </div>
        <div className="bg-white dark:bg-slate-800/40 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm transition-colors">
          <h4 className="text-lg font-bold mb-3 flex items-center gap-2 text-cyan-600 dark:text-cyan-400">
            <span>🛰️</span> איך הטייס האוטומטי עובד?
          </h4>
          <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            המחשב של החללית מחשב את המרחק העצום בין כדור הארץ ליעד, מזהה מכשולים כמו אסטרואידים, ומשתמש בכבידה של השמש כדי "לגלוש" במהירות שיא.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AutoPilot;