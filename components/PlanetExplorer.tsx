import React, { useState, useEffect } from 'react';
import { PLANETS, MOON_DATA } from '../constants';
import { Planet } from '../types';

const RoverSimulation: React.FC = () => {
  const [pos, setPos] = useState({ x: 2, y: 2 });
  const [log, setLog] = useState<string[]>(['מערכת הבקרה פעילה. מוכן לתנועה.']);
  const [scanning, setScanning] = useState(false);

  const gridSize = 5;
  
  const move = (dx: number, dy: number) => {
    const newX = Math.max(0, Math.min(gridSize - 1, pos.x + dx));
    const newY = Math.max(0, Math.min(gridSize - 1, pos.y + dy));
    
    if (newX !== pos.x || newY !== pos.y) {
      setPos({ x: newX, y: newY });
      addLog(`נע לכיוון (${newX}, ${newY})`);
    } else {
      addLog('מכשול זוהה! לא ניתן לנוע לכיוון זה.');
    }
  };

  const addLog = (msg: string) => {
    setLog(prev => [msg, ...prev].slice(0, 5));
  };

  const scanTerrain = () => {
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

  return (
    <div className="mt-12 p-6 md:p-8 bg-slate-900 border-2 border-red-900/50 rounded-3xl shadow-2xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10 text-8xl pointer-events-none">🚜</div>
      <h3 className="text-2xl md:text-3xl font-black text-red-500 mb-6 flex items-center gap-3">
        <span>🛰️</span> סימולטור רכב החלל "התמדה"
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Visual Grid Area */}
        <div className="bg-orange-950/30 p-4 rounded-2xl border border-orange-900/50 aspect-square max-w-[350px] mx-auto w-full flex flex-col gap-1">
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

        {/* Controls & Logs */}
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

          <div className="grid grid-cols-3 gap-2 max-w-[200px] mx-auto">
            <div></div>
            <button onClick={() => move(0, -1)} className="p-4 bg-slate-800 hover:bg-red-600 rounded-xl transition-colors shadow-lg">⬆️</button>
            <div></div>
            <button onClick={() => move(-1, 0)} className="p-4 bg-slate-800 hover:bg-red-600 rounded-xl transition-colors shadow-lg">⬅️</button>
            <button onClick={scanTerrain} disabled={scanning} className="p-4 bg-red-700 hover:bg-red-500 rounded-xl transition-colors shadow-lg flex items-center justify-center">
              {scanning ? '⏳' : '🔍'}
            </button>
            <button onClick={() => move(1, 0)} className="p-4 bg-slate-800 hover:bg-red-600 rounded-xl transition-colors shadow-lg">➡️</button>
            <div></div>
            <button onClick={() => move(0, 1)} className="p-4 bg-slate-800 hover:bg-red-600 rounded-xl transition-colors shadow-lg">⬇️</button>
            <div></div>
          </div>
          
          <p className="text-center text-xs text-slate-500">השתמשו בחצים כדי לנוע על פני מאדים!</p>
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
    <div className="flex flex-col gap-6 md:gap-8 animate-fadeIn pb-20 md:pb-0">
      <div className="text-center mb-2 md:mb-4">
        <h2 className="text-3xl md:text-4xl font-black mb-4">חוקרים את השמיים</h2>
        
        <div className="inline-flex p-1 bg-slate-800 rounded-full border border-slate-700 mb-6">
          <button
            onClick={() => handleToggleMode('planets')}
            className={`px-6 py-2 rounded-full font-bold transition-all ${
              viewMode === 'planets' 
                ? 'bg-cyan-600 text-white shadow-lg' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            כוכבי לכת
          </button>
          <button
            onClick={() => handleToggleMode('moon')}
            className={`px-6 py-2 rounded-full font-bold transition-all ${
              viewMode === 'moon' 
                ? 'bg-purple-600 text-white shadow-lg' 
                : 'text-slate-400 hover:text-white'
            }`}
          >
            הירח
          </button>
        </div>
        
        <p className="text-slate-400 text-sm md:text-base px-4">
          {viewMode === 'planets' ? 'לחצו על כוכב לכת כדי לגלות את סודותיו!' : 'גלו את השכן הכי קרוב שלנו בחלל!'}
        </p>
      </div>

      {viewMode === 'planets' && (
        <div className="flex overflow-x-auto pb-6 gap-4 no-scrollbar scroll-smooth px-2">
          {PLANETS.map((planet) => (
            <button
              key={planet.id}
              onClick={() => handleSelectBody(planet)}
              className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-full flex flex-col items-center justify-center transition-all transform hover:scale-110 ${
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
              <span className="relative z-10 text-[10px] md:text-xs font-bold text-slate-950 text-center leading-none px-1">
                {planet.name}
              </span>
            </button>
          ))}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center bg-slate-900/50 p-6 md:p-8 rounded-3xl border border-slate-700 backdrop-blur-sm mx-auto w-full">
        <div className="flex justify-center order-1 md:order-none">
          <div className={`w-48 h-48 md:w-80 md:h-80 rounded-full flex items-center justify-center relative shadow-2xl ${selectedBody.color} overflow-hidden group`}>
            <img 
              src={selectedBody.image} 
              alt={selectedBody.name} 
              className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform duration-[3000ms] ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/50 to-transparent"></div>
            <div className={`absolute -top-2 md:-top-4 -right-2 md:-right-4 p-2 md:p-3 rounded-xl border border-slate-600 shadow-lg rotate-12 ${viewMode === 'moon' ? 'bg-indigo-600' : 'bg-slate-800'}`}>
              <span className="text-xl md:text-2xl">{viewMode === 'moon' ? '🌙' : '✨'}</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 order-2 md:order-none">
          <div className="flex justify-between items-start flex-wrap gap-2">
            <div>
              <h3 className="text-4xl md:text-5xl font-black text-white">{selectedBody.name}</h3>
              <p className="text-lg md:text-xl text-cyan-400 italic">{selectedBody.englishName}</p>
            </div>
            <div className="text-right">
              <div className="text-slate-400 text-[10px] md:text-sm uppercase tracking-wider">קוטר</div>
              <div className="text-white font-bold text-sm md:text-base">{selectedBody.size}</div>
            </div>
          </div>

          <p className="text-base md:text-lg text-slate-300 leading-relaxed">
            {selectedBody.description}
          </p>

          <div className={`p-4 rounded-2xl border ${viewMode === 'moon' ? 'bg-indigo-900/30 border-indigo-700/50' : 'bg-cyan-900/30 border-cyan-700/50'}`}>
            <h4 className={`font-bold flex items-center gap-2 mb-1 ${viewMode === 'moon' ? 'text-indigo-400' : 'text-cyan-400'}`}>
              <span>💡</span> עובדה מגניבה:
            </h4>
            <p className="text-white text-sm md:text-base leading-relaxed">{selectedBody.funFact}</p>
          </div>

          <div className="flex gap-4">
            <div className="bg-slate-800/80 px-4 py-3 rounded-xl flex-1 text-center border border-slate-700">
              <div className="text-[10px] md:text-xs text-slate-400 uppercase tracking-wide mb-1">
                {viewMode === 'moon' ? 'מרחק מהארץ' : 'מרחק מהשמש'}
              </div>
              <div className="text-sm md:text-base font-bold text-white">{selectedBody.distanceFromSun}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Conditional Rover Section for Mars */}
      {selectedBody.id === 'mars' && <RoverSimulation />}
    </div>
  );
};

export default PlanetExplorer;