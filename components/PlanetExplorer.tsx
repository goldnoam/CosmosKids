
import React, { useState } from 'react';
import { PLANETS } from '../constants';
import { Planet } from '../types';

const PlanetExplorer: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<Planet>(PLANETS[0]);

  return (
    <div className="flex flex-col gap-8 animate-fadeIn">
      <div className="text-center mb-4">
        <h2 className="text-4xl font-black mb-2">מערכת השמש שלנו</h2>
        <p className="text-slate-400">לחצו על כוכב לכת כדי ללמוד עליו יותר!</p>
      </div>

      <div className="flex overflow-x-auto pb-6 gap-4 no-scrollbar">
        {PLANETS.map((planet) => (
          <button
            key={planet.id}
            onClick={() => setSelectedPlanet(planet)}
            className={`flex-shrink-0 w-24 h-24 rounded-full flex flex-col items-center justify-center transition-all transform hover:scale-110 ${
              selectedPlanet.id === planet.id 
                ? 'ring-4 ring-cyan-500 scale-110 shadow-xl shadow-cyan-900/40' 
                : 'opacity-70 hover:opacity-100'
            } ${planet.color}`}
          >
            <span className="text-xs font-bold text-slate-900 text-center px-1">
              {planet.name}
            </span>
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-8 items-center bg-slate-900/50 p-8 rounded-3xl border border-slate-700 backdrop-blur-sm">
        <div className="flex justify-center">
          <div className={`w-64 h-64 md:w-80 md:h-80 rounded-full flex items-center justify-center relative shadow-2xl ${selectedPlanet.color} animate-pulse`}>
            <img 
              src={selectedPlanet.image} 
              alt={selectedPlanet.name} 
              className="w-full h-full object-cover rounded-full mix-blend-multiply opacity-80"
            />
            <div className="absolute -top-4 -right-4 bg-slate-800 p-3 rounded-xl border border-slate-600 shadow-lg rotate-12">
              <span className="text-2xl">✨</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-5xl font-black text-white">{selectedPlanet.name}</h3>
              <p className="text-xl text-cyan-400 italic">{selectedPlanet.englishName}</p>
            </div>
            <div className="text-right">
              <div className="text-slate-400 text-sm">גודל</div>
              <div className="text-white font-bold">{selectedPlanet.size}</div>
            </div>
          </div>

          <p className="text-lg text-slate-300 leading-relaxed">
            {selectedPlanet.description}
          </p>

          <div className="bg-cyan-900/30 p-4 rounded-2xl border border-cyan-700/50">
            <h4 className="font-bold text-cyan-400 flex items-center gap-2 mb-1">
              <span>💡</span> עובדה מגניבה:
            </h4>
            <p className="text-white">{selectedPlanet.funFact}</p>
          </div>

          <div className="flex gap-4">
            <div className="bg-slate-800/80 px-4 py-2 rounded-xl flex-1 text-center">
              <div className="text-xs text-slate-400">מרחק מהשמש</div>
              <div className="text-sm font-bold">{selectedPlanet.distanceFromSun}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanetExplorer;
