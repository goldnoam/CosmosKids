import React, { useState, useEffect, useCallback } from 'react';
import { PLANETS, MOON_DATA } from '../constants';
import { Planet } from '../types';

const RoverSimulation: React.FC = () => {
  const [pos, setPos] = useState({ x: 2, y: 2 });
  const [log, setLog] = useState<string[]>(['מערכת הבקרה פעילה. מוכן לתנועה.']);
  const [scanning, setScanning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  const gridSize = 5;
  
  const move = useCallback((dx: number, dy: number) => {
    if (isPaused) return;
    setPos(prev => {
      const newX = Math.max(0, Math.min(gridSize - 1, prev.x + dx));
      const newY = Math.max(0, Math.min(gridSize - 1, prev.y + dy));
      
      if (newX !== prev.x || newY !== prev.y) {
        addLog(`נע לכיוון (${newX}, ${newY})`);
        return { x: newX, y: newY };
      } else {
        addLog('מכשול זוהה! לא ניתן לנוע לכיוון זה.');
        return prev;
      }
    });
  }, [isPaused]);

  const addLog = (msg: string) => {
    setLog(prev => [msg, ...prev].slice(0, 5));
  };

  const scanTerrain = () => {
    if (isPaused) return;
    setScanning(true);
    setTimeout(() => {
      const scans = [
        'נמצאו עקבות של ברזל מחומצן',
        'זוהה סלע סדימנטרי מעניין',
        'רמת הקרינה תקינה',
        'נמצא מכתש קטן בקרבת מקום',
        'סריקה הושלמה: אין סימני חיים כרגע'
      ];
      addLog(scans[Math.floor(Math.random() * scans.length)]);
      setScanning(false);
    }, 1500);
  };

  const handleReset = () => {
    setPos({ x: 2, y: 2 });
    setLog(['מערכת אותחלה. חוזר לנקודת ההתחלה.']);
    setIsPaused(false);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isPaused) return;
      const key = e.key.toLowerCase();
      switch (key) {
        case 'w': move(0, -1); break;
        case 's': move(0, 1); break;
        case 'a': move(-1, 0); break;
        case 'd': move(1, 0); break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [move, isPaused]);

  return (
    <div className="mt-12 p-6 md:p-8 bg-slate-900 border-2 border-red-900/50 rounded-3xl shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10 text-8xl pointer-events-none">🚜</div>
      
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl md:text-3xl font-black text-red-500 flex items-center gap-3">
          <span>🛰️</span> סימולטור רכב החלל "התמדה"
        </h3>
        <div className="flex gap-2">
           <button 
            onClick={() => setIsPaused(!isPaused)} 
            className={`px-4 py-2 rounded-xl font-bold transition-all border-2 ${isPaused ? 'bg-green-600 border-green-500 text-white' : 'bg-slate-800 border-slate-700 text-slate-300'}`}
          >
            {isPaused ? 'המשך ▶️' : 'השהה ⏸️'}
          </button>
          <button 
            onClick={handleReset} 
            className="px-4 py-2 bg-slate-800 border-2 border-slate-700 text-slate-300 rounded-xl font-bold hover:bg-slate-700 transition-all"
          >
            איפוס 🔄
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="bg-orange-950/30 p-4 rounded-2xl border border-orange-900/50 aspect-square max-w-[350px] mx-auto w-full flex flex-col gap-1 relative">
          {isPaused && (
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-10 flex items-center justify-center rounded-2xl border-2 border-red-900/50">
              <span className="text-3xl font-black text-white">המשחק מושהה</span>
            </div>
          )}
          {Array.from({ length: gridSize }).map((_, r) => (
            <div key={r} className="flex gap-1 flex-1">
              {Array.from({ length: gridSize }).map((_, c) => (
                <div 
                  key={c} 
                  className={`flex-1 rounded-lg flex items-center justify-center text-2xl transition-all duration-300 ${
                    pos.x === c && pos.y === r 
                      ? 'bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.6)] scale-105' 
                      : 'bg-orange-900/20 border border-orange-900/10'
                  }`}
                >
                  {pos.x === c && pos.y === r ? '🚜' : ''}
                </div>
              ))}
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-black/40 p-4 rounded-xl border border-slate-700 h-40 overflow-y-auto no-scrollbar font-mono text-sm">
            <div className="text-cyan-500 mb-2 font-bold underline">יומן משימה:</div>
            {log.map((msg, i) => (
              <div key={i} className={`mb-1 ${i === 0 ? 'text-white' : 'text-slate-500'}`}>
                {i === 0 ? '> ' : '- '}{msg}
              </div>
            ))}
            {scanning && <div className="text-orange-400 animate-pulse">סורק פני שטח...</div>}
          </div>

          <div className="flex flex-col items-center gap-4">
            <div className="grid grid-cols-3 gap-2 max-w-[200px] mx-auto">
              <div></div>
              <button onClick={() => move(0, -1)} disabled={isPaused} className="p-4 bg-slate-800 hover:bg-red-600 disabled:opacity-50 rounded-xl transition-colors shadow-lg font-black text-white" title="W key">W</button>
              <div></div>
              <button onClick={() => move(-1, 0)} disabled={isPaused} className="p-4 bg-slate-800 hover:bg-red-600 disabled:opacity-50 rounded-xl transition-colors shadow-lg font-black text-white" title="A key">A</button>
              <button onClick={scanTerrain} disabled={scanning || isPaused} className="p-4 bg-red-700 hover:bg-red-500 disabled:opacity-50 rounded-xl transition-colors shadow-lg flex items-center justify-center">
                {scanning ? '⏳' : '🔍'}
              </button>
              <button onClick={() => move(1, 0)} disabled={isPaused} className="p-4 bg-slate-800 hover:bg-red-600 disabled:opacity-50 rounded-xl transition-colors shadow-lg font-black text-white" title="D key">D</button>
              <div></div>
              <button onClick={() => move(0, 1)} disabled={isPaused} className="p-4 bg-slate-800 hover:bg-red-600 disabled:opacity-50 rounded-xl transition-colors shadow-lg font-black text-white" title="S key">S</button>
              <div></div>
            </div>
            <p className="text-center text-xs text-slate-500 font-bold uppercase tracking-wider">השתמשו ב-WASD או בכפתורים כדי לנוע!</p>
          </div>
        </div>
      </div>
    </div>
  );
};

const PlanetExplorer: React.FC = () => {
  const [selectedBody, setSelectedBody] = useState<Planet>(PLANETS[0]);
  const [viewMode, setViewMode] = useState<'planets' | 'moon'>('planets');

  const handleSelectBody = (body: Planet) => {
    setSelectedBody(body);
  };

  const handleToggleMode = (mode: 'planets' | 'moon') => {
    setViewMode(mode);
    if (mode === 'moon') {
      setSelectedBody(MOON_DATA);
    } else {
      setSelectedBody(PLANETS[0]);
    }
  };

  return (
    <div className="flex flex-col gap-6 md:gap-8 animate-fadeIn pb-20 md:pb-12">
      <div className="text-center mb-2 md:mb-4">
        <h2 className="text-3xl md:text-5xl font-black mb-4 dark:text-white">חוקרים את השמיים</h2>
        
        <div className="inline-flex p-1 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200 dark:border-slate-700 mb-6 transition-colors">
          <button
            onClick={() => handleToggleMode('planets')}
            className={`px-6 py-2 rounded-full font-bold transition-all ${
              viewMode === 'planets' 
                ? 'bg-cyan-600 text-white shadow-lg' 
                : 'text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-white'
            }`}
          >
            כוכבי לכת
          </button>
          <button
            onClick={() => handleToggleMode('moon')}
            className={`px-6 py-2 rounded-full font-bold transition-all ${
              viewMode === 'moon' 
                ? 'bg-purple-600 text-white shadow-lg' 
                : 'text-slate-500 dark:text-slate-400 hover:text-purple-600 dark:hover:text-white'
            }`}
          >
            הירח
          </button>
        </div>
        
        <p className="text-slate-600 dark:text-slate-400 text-sm md:text-lg px-4 max-w-2xl mx-auto">
          {viewMode === 'planets' ? 'לחצו על כוכב לכת כדי לגלות את סודותיו המסתוריים!' : 'גלו את השכן הכי קרוב והכי מרתק שלנו בחלל!'}
        </p>
      </div>

      {viewMode === 'planets' && (
        <div className="flex overflow-x-auto pb-6 gap-4 no-scrollbar scroll-smooth px-2">
          {PLANETS.map((planet) => (
            <button
              key={planet.id}
              onClick={() => handleSelectBody(planet)}
              className={`flex-shrink-0 w-24 h-24 rounded-full flex flex-col items-center justify-center transition-all transform hover:scale-110 ${
                selectedBody.id === planet.id && viewMode === 'planets'
                  ? 'ring-4 ring-cyan-500 scale-110 shadow-xl shadow-cyan-900/40' 
                  : 'opacity-70 hover:opacity-100'
              } ${planet.color} overflow-hidden group relative`}
            >
              <img 
                src={planet.image} 
                alt={planet.name} 
                className="absolute inset-0 w-full h-full object-cover mix-blend-overlay opacity-30 group-hover:opacity-50 transition-opacity"
              />
              <span className="relative z-10 text-xs font-black text-slate-950 text-center leading-none px-1">
                {planet.name}
              </span>
            </button>
          ))}
        </div>
      )}

      <div className="bg-white dark:bg-slate-900/50 p-6 md:p-10 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl dark:backdrop-blur-sm mx-auto w-full transition-colors flex flex-col gap-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="flex justify-center">
            <div className={`w-64 h-64 md:w-80 md:h-80 rounded-full flex items-center justify-center relative shadow-2xl ${selectedBody.color} overflow-hidden group`}>
              <img 
                src={selectedBody.image} 
                alt={selectedBody.name} 
                className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-[3000ms] ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/50 to-transparent"></div>
              {selectedBody.hasRings && (
                <div className="absolute inset-0 border-[10px] md:border-[20px] border-white/10 rounded-full scale-[1.2] rotate-45 pointer-events-none"></div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="text-4xl md:text-6xl font-black text-slate-900 dark:text-white leading-tight">{selectedBody.name}</h3>
              <p className="text-xl md:text-2xl text-cyan-600 dark:text-cyan-400 italic font-bold">{selectedBody.englishName}</p>
            </div>

            <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {selectedBody.description}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-slate-100 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div className="text-xs text-slate-500 font-bold uppercase mb-1">קוטר</div>
                <div className="text-lg font-black">{selectedBody.size}</div>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div className="text-xs text-slate-500 font-bold uppercase mb-1">מרחק מהשמש</div>
                <div className="text-lg font-black">{selectedBody.distanceFromSun}</div>
              </div>
              <div className="bg-slate-100 dark:bg-slate-800/80 p-4 rounded-2xl border border-slate-200 dark:border-slate-700">
                <div className="text-xs text-slate-500 font-bold uppercase mb-1">מרחק מהארץ</div>
                <div className="text-lg font-black">{selectedBody.distanceFromEarth}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-cyan-50 dark:bg-cyan-900/20 p-6 rounded-2xl border border-cyan-200 dark:border-cyan-800/50">
            <h4 className="font-black text-cyan-600 dark:text-cyan-400 flex items-center gap-2 mb-3">
              <span>🌕</span> ירחים וטבעות
            </h4>
            <div className="space-y-2 text-sm md:text-base">
              <p><strong>מספר ירחים:</strong> {selectedBody.moonsCount || 'לא ידוע'}</p>
              <p><strong>טבעות:</strong> {selectedBody.hasRings ? 'יש טבעות מרהיבות! 💍' : 'אין טבעות.'}</p>
            </div>
          </div>

          <div className="bg-purple-50 dark:bg-purple-900/20 p-6 rounded-2xl border border-purple-200 dark:border-purple-800/50">
            <h4 className="font-black text-purple-600 dark:text-purple-400 flex items-center gap-2 mb-3">
              <span>🚀</span> משימות חלל בולטות
            </h4>
            <ul className="space-y-1 text-sm md:text-base list-disc list-inside">
              {selectedBody.missions?.map((m, i) => (
                <li key={i}>{m}</li>
              )) || <li>טרם ביקרו שם חלליות</li>}
            </ul>
          </div>

          <div className="bg-amber-50 dark:bg-amber-900/20 p-6 rounded-2xl border border-amber-200 dark:border-amber-800/50">
            <h4 className="font-black text-amber-600 dark:text-amber-400 flex items-center gap-2 mb-3">
              <span>💡</span> עובדה מגניבה
            </h4>
            <p className="text-sm md:text-base leading-relaxed">{selectedBody.funFact}</p>
          </div>
        </div>
      </div>

      {selectedBody.id === 'mars' && <RoverSimulation />}
    </div>
  );
};

export default PlanetExplorer;