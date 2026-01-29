import React, { useEffect, useState } from 'react';

interface HeroProps {
  onExplore: () => void;
}

const STATIC_FACTS = [
  "הידעת? יש יותר כוכבים ביקום מאשר גרגרי חול בכל החופים בכדור הארץ!",
  "הידעת? בגלל שאין אטמוספירה על הירח, טביעות הרגליים של האסטרונאוטים יישארו שם מיליוני שנים.",
  "הידעת? כוכב הלכת נוגה הוא החם ביותר במערכת השמש, למרות שהוא לא הכי קרוב לשמש.",
  "הידעת? בשבתאי יורד גשם של יהלומים!",
  "הידעת? יום אחד בכוכב חמה אורך כמו 59 ימים בכדור הארץ.",
  "הידעת? מאדים הוא ביתו של ההר הגבוה ביותר במערכת השמש - אולימפוס מונס."
];

const STATIC_IMAGES = [
  "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=800",
  "https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800",
  "https://images.unsplash.com/photo-1444703686981-a3abbc4d4fe3?q=80&w=800",
  "https://images.unsplash.com/photo-1464802686167-b939a67a06a1?q=80&w=800"
];

const Hero: React.FC<HeroProps> = ({ onExplore }) => {
  const [fact, setFact] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>(STATIC_IMAGES[0]);

  useEffect(() => {
    const randomIdx = Math.floor(Math.random() * STATIC_FACTS.length);
    setFact(STATIC_FACTS[randomIdx]);
    setImageUrl(STATIC_IMAGES[randomIdx % STATIC_IMAGES.length]);
  }, []);

  return (
    <div className="flex flex-col items-center gap-8 md:gap-12 py-6 md:py-12 overflow-hidden">
      <div className="text-center relative w-full">
        <div className="absolute -top-10 md:-top-20 -left-10 md:-left-20 w-48 md:w-64 h-48 md:h-64 bg-cyan-500/10 md:bg-cyan-500/20 rounded-full blur-[60px] md:blur-[100px] pointer-events-none"></div>
        <div className="absolute -bottom-10 md:-bottom-20 -right-10 md:-right-20 w-48 md:w-64 h-48 md:h-64 bg-purple-500/10 md:bg-purple-500/20 rounded-full blur-[60px] md:blur-[100px] pointer-events-none"></div>
        
        <div className="float-animation mb-6 md:mb-8 inline-block">
          <span className="text-7xl md:text-9xl">👨‍🚀</span>
        </div>
        
        <h1 className="text-4xl md:text-8xl font-black mb-4 md:mb-6 leading-tight px-4">
          המסע שלך לתוך <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
            היקום מתחיל כאן
          </span>
        </h1>
        
        <p className="text-lg md:text-2xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-8 md:mb-10 px-6">
          בואו לחקור את הכוכבים, ללמוד על כוכבי הלכת במערכת השמש שלנו, ולגלות את הסודות המדהימים של הגלקסיה!
        </p>

        <div className="flex flex-wrap justify-center gap-4 px-4">
          <button 
            onClick={onExplore}
            className="group relative bg-cyan-600 hover:bg-cyan-500 text-white text-lg md:text-xl font-bold px-8 md:px-10 py-4 md:py-5 rounded-full transition-all transform hover:scale-105 active:scale-95 shadow-xl shadow-cyan-900/40 hover:shadow-cyan-400/60 hover:brightness-125 overflow-hidden ring-0 hover:ring-2 ring-white/20"
          >
            <span className="relative z-10 flex items-center gap-2">
              בואו נצא לדרך! 🪐
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"></div>
          </button>
        </div>
      </div>

      <div className="w-full max-w-4xl bg-slate-900/60 backdrop-blur-md p-6 md:p-8 rounded-3xl border border-slate-700/50 shadow-2xl mt-6 md:mt-10 mx-auto overflow-hidden">
        <div className="flex flex-col md:flex-row gap-8 items-center">
          <div className="flex-1 space-y-4">
            <h3 className="text-cyan-400 font-bold flex items-center gap-2 text-lg md:text-xl">
              <span>🚀</span> עובדת היום בחלל:
            </h3>
            <p className="text-xl md:text-2xl text-white font-medium leading-relaxed">
              {fact}
            </p>
          </div>
          <div className="w-full md:w-2/5 aspect-video md:aspect-square bg-slate-800 rounded-2xl overflow-hidden relative border border-slate-700">
            <img 
              src={imageUrl} 
              alt="נוף מהחלל" 
              className="w-full h-full object-cover animate-fadeIn"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 to-transparent"></div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 w-full mt-6 md:mt-8 px-2">
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 hover:border-cyan-500 transition-colors group">
          <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🔭</div>
          <h4 className="text-xl font-bold mb-2">חקירה חופשית</h4>
          <p className="text-slate-400 text-sm md:text-base">גלו את כל כוכבי הלכת וקבלו נתונים מרתקים על כל אחד מהם.</p>
        </div>
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 hover:border-purple-500 transition-colors group">
          <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">💡</div>
          <h4 className="text-xl font-bold mb-2">עובדות מדעיות</h4>
          <p className="text-slate-400 text-sm md:text-base">למדו על חורים שחורים, כוכבים וגלקסיות רחוקות.</p>
        </div>
        <div className="bg-slate-800/50 p-6 rounded-2xl border border-slate-700 hover:border-amber-500 transition-colors group">
          <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">🎮</div>
          <h4 className="text-xl font-bold mb-2">משחקי חלל</h4>
          <p className="text-slate-400 text-sm md:text-base">בחנו את הידע שלכם בחידון חלל מאתגר וכיפי!</p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
