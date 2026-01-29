
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab }) => {
  const navItems = [
    { id: 'home', label: 'בית', icon: '🏠' },
    { id: 'planets', label: 'מערכת השמש', icon: '🪐' },
    { id: 'chat', label: 'דבר עם אסטרו-בוט', icon: '🤖' },
    { id: 'quiz', label: 'חידון חלל', icon: '📝' },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 bg-slate-900/80 backdrop-blur-md border-b border-slate-700 p-4">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
            <span className="text-3xl">🚀</span>
            <h1 className="text-2xl font-black bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              קוסמוס קידס
            </h1>
          </div>
          <nav className="hidden md:flex gap-6">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2 rounded-full transition-all ${
                  activeTab === item.id 
                    ? 'bg-cyan-600 text-white shadow-lg shadow-cyan-900/50' 
                    : 'text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
          <div className="md:hidden">
            {/* Mobile simplified menu could go here */}
            <span className="text-slate-300 text-sm">תפריט חלל 🌌</span>
          </div>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8 max-w-6xl">
        {children}
      </main>

      <footer className="bg-slate-950 p-8 border-t border-slate-800 text-center text-slate-500">
        <p>© 2024 קוסמוס קידס - מסע בין כוכבים לצעירים</p>
        <div className="flex justify-center gap-4 mt-4 text-xl">
          <span>🌌</span><span>🌠</span><span>🔭</span><span>👨‍🚀</span>
        </div>
      </footer>

      {/* Mobile Navigation Bottom Bar */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-slate-900 border-t border-slate-800 flex justify-around p-3 z-50">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center gap-1 ${
              activeTab === item.id ? 'text-cyan-400' : 'text-slate-400'
            }`}
          >
            <span className="text-xl">{item.icon}</span>
            <span className="text-xs">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
