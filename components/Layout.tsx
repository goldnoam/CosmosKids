
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, isDarkMode, toggleTheme }) => {
  const navItems = [
    { id: 'home', label: 'בית', icon: '🏠' },
    { id: 'planets', label: 'מערכת השמש', icon: '🪐' },
    { id: 'spaceship', label: 'חללית', icon: '🚀' },
    { id: 'quiz', label: 'חידון חלל', icon: '📝' },
  ];

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-300">
      <header className="sticky top-0 z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-700 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
            <span className="text-3xl">🚀</span>
            <h1 className="text-2xl font-black bg-gradient-to-r from-cyan-500 to-purple-600 bg-clip-text text-transparent">
              קוסמוס קידס
            </h1>
          </div>
          
          <div className="flex items-center gap-4">
            <nav className="hidden md:flex gap-2">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`px-4 py-2 rounded-full transition-all text-sm font-bold ${
                    activeTab === item.id 
                      ? 'bg-cyan-600 text-white shadow-lg' 
                      : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </nav>
            
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-yellow-400 border border-slate-200 dark:border-slate-700 shadow-sm hover:scale-110 active:scale-90 transition-all"
              aria-label="Toggle Theme"
            >
              {isDarkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        {children}
      </main>

      <footer className="bg-white dark:bg-slate-950 p-10 border-t border-slate-200 dark:border-slate-800 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center gap-6 mb-6 text-2xl">
            <span>🌌</span><span>🌠</span><span>🔭</span><span>👨‍🚀</span>
          </div>
          <p className="text-slate-600 dark:text-slate-400 font-bold mb-2">
            (C) Noam Gold AI 2026
          </p>
          <p className="text-slate-500 dark:text-slate-500 text-sm">
            Send Feedback: <a href="mailto:goldnoamai@gmail.com" className="text-cyan-600 dark:text-cyan-400 hover:underline">goldnoamai@gmail.com</a>
          </p>
        </div>
      </footer>

      {/* Mobile Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-slate-900/95 border-t border-slate-200 dark:border-slate-800 flex justify-around p-3 z-50 backdrop-blur-md">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 transition-colors ${
              activeTab === item.id ? 'text-cyan-600 dark:text-cyan-400' : 'text-slate-500 dark:text-slate-400'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-[10px] font-bold">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
