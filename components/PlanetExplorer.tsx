
import React, { useState } from 'react';
import { PLANETS } from '../constants';
import { Planet } from '../types';

const PlanetExplorer: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<Planet>(PLANETS[0]);

  return (
    <div className="flex flex-col gap-6 md:gap-8 animate-fadeIn pb-20 md:pb-0">
      <div className="text-center mb-2 md:mb-4">
        <h2 className="text-3xl md:text-4xl font-black mb-2">מערכת השמש שלנו</h2>
        <p className="text-slate-400 text-sm md:text-base px-4">לחצו על כוכב לכת כדי ללמוד עליו יותר!</p>
      </div>

      <div className="flex overflow-x-auto pb-6 gap-4 no-scrollbar scroll-smooth px-2">
        {PLANETS.map((planet) => (
          <button
            key={planet.id}
            onClick={() => setSelectedPlanet(planet)}
            className={`flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-full flex flex-col items-center justify-center transition-all transform hover:scale-110 ${
              selectedPlanet.id === planet.id 
                ? 'ring-4 ring-cyan-500 scale-110 shadow-xl shadow-cyan-900/40' 
                : 'opacity-70 hover:opacity-100'
            } ${planet.color} overflow-hidden group`}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-center bg-slate-900/50 p-6 md:p-8 rounded-3xl border border-slate-700 backdrop-blur-sm mx-auto w-full">
        <div className="flex justify-center order-1 md:order-none">
          <div className={`w-48 h-48 md:w-80 md:h-80 rounded-full flex items-center justify-center relative shadow-2xl ${selectedPlanet.color} animate-pulse overflow-hidden group`}>
            <img 
              src={selectedPlanet.image} 
              alt={selectedPlanet.name} 
              className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-tr from-black/40 to-transparent"></div>
            <div className="absolute -top-2 md:-top-4 -right-2 md:-right-4 bg-slate-800 p-2 md:p-3 rounded-xl border border-slate-600 shadow-lg rotate-12">
              <span className="text-xl md:text-2xl">✨</span>
            </div>
          </div>
        </div>

        <div className="space-y-4 order-2 md:order-none">
          <div className="flex justify-between items-start flex-wrap gap-2">
            <div>
              <h3 className="text-4xl md:text-5xl font-black text-white">{selectedPlanet.name}</h3>
              <p className="text-lg md:text-xl text-cyan-400 italic">{selectedPlanet.englishName}</p>
            </div>
            <div className="text-right">
              <div className="text-slate-400 text-[10px] md:text-sm uppercase tracking-wider">קוטר</div>
              <div className="text-white font-bold text-sm md:text-base">{selectedPlanet.size}</div>
            </div>
          </div>

          <p className="text-base md:text-lg text-slate-300 leading-relaxed">
            {selectedPlanet.description}
          </p>

          <div className="bg-cyan-900/30 p-4 rounded-2xl border border-cyan-700/50">
            <h4 className="font-bold text-cyan-400 flex items-center gap-2 mb-1">
              <span>💡</span> עובדה מגניבה:
            </h4>
            <p className="text-white text-sm md:text-base leading-relaxed">{selectedPlanet.funFact}</p>
          </div>

          <div className="flex gap-4">
            <div className="bg-slate-800/80 px-4 py-3 rounded-xl flex-1 text-center border border-slate-700">
              <div className="text-[10px] md:text-xs text-slate-400 uppercase tracking-wide mb-1">מרחק מהשמש</div>
              <div className="text-sm md:text-base font-bold text-white">{selectedPlanet.distanceFromSun}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanetExplorer;
