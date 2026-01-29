
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import PlanetExplorer from './components/PlanetExplorer';
import SpaceQuiz from './components/SpaceQuiz';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  useEffect(() => {
    // Sync theme with document class for Tailwind
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Hero onExplore={() => setActiveTab('planets')} />;
      case 'planets':
        return <PlanetExplorer />;
      case 'quiz':
        return <SpaceQuiz />;
      default:
        return <Hero onExplore={() => setActiveTab('planets')} />;
    }
  };

  return (
    <div className={`${isDarkMode ? 'space-gradient' : 'bg-slate-50'} min-h-screen transition-colors duration-300 font-heebo overflow-x-hidden`}>
      <Layout 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        isDarkMode={isDarkMode} 
        toggleTheme={toggleTheme}
      >
        <div className="animate-fadeIn">
          {renderContent()}
        </div>
      </Layout>
    </div>
  );
};

export default App;
