
import React, { useEffect, useState } from 'react';
import { fetchDailySpaceFact } from '../services/geminiService';

interface HeroProps {
  onExplore: () => void;
}

const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  const [fact, setFact] = useState<string>('טוען עובדת חלל מדהימה...');

  useEffect(() => {
    fetchDailySpaceFact().then(setFact);
  }, []);

  return (
    <div className="flex flex-col items-center gap-12 py-12">
      <div className="text-center relative">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-cyan-500/20 rounded-full blur-[100px] pointer-events-none"></div>
        <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-purple-500/20 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="float-animation mb-8 inline-block">
          <span className="text-9xl">👨‍🚀</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
          המסע שלך לתוך <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
            היקום מתחיל כאן
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
          בואו לחקור את הכוכבים, ללמוד על כוכבי הלכת במערכת השמש שלנו, ולגלות את הסודות המדהימים של הגלקסיה!
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button 
            onClick={onExplore}
            className="bg-cyan-600 hover:bg-cyan-500 text-white text-xl font-bold px-10 py-5 rounded-full transition-all transform hover:scale-105 shadow-xl shadow-cyan-900/40"
          >
            בואו נצא לדרך! 🪐
          </button>
        </div>
      </div>

      <div className="w-full max-w-4xl bg-slate-900/60 backdrop-blur-md p-8 rounded-3xl border border-slate-700/50 shadow-2xl mt-10">
        <h3 className="text-cyan-400 font-bold mb-4 flex items-center gap-2 text-xl">
          <span>🚀</span> עובדת היום בחלל:
        </h3>
        <p className="text-2xl text-white font-medium leading-relaxed">
          {fact}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-8">
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 hover:border-cyan-500 transition-colors">
          <div className="text-4xl mb-3">🔭</div>
          <h4 className="text-xl font-bold mb-2">חקירה חופשית</h4>
          <p className="text-slate-400">גלו את כל כוכבי הלכת וקבלו נתונים מרתקים על כל אחד מהם.</p>
        </div>
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 hover:border-purple-500 transition-colors">
          <div className="text-4xl mb-3">🧠</div>
          <h4 className="text-xl font-bold mb-2">שאלו את המומחה</h4>
          <p className="text-slate-400">ה-AI שלנו מוכן לענות על כל שאלה שיש לכם על אסטרונומיה.</p>
        </div>
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 hover:border-amber-500 transition-colors">
          <div className="text-4xl mb-3">🎮</div>
          <h4 className="text-xl font-bold mb-2">משחקי חלל</h4>
          <p className="text-slate-400">בחנו את הידע שלכם בחידון חלל מאתגר וכיפי!</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
