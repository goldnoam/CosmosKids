import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import PlanetExplorer from './components/PlanetExplorer';
import SpaceQuiz from './components/SpaceQuiz';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isClient, setIsClient] = useState(false);

  // Sync isClient on mount
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Sync theme
  useEffect(() => {
    if (!isClient) return;
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode, isClient]);

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

  // MUST return null on the first render to match the empty <div id="root"></div> in index.html
  // This prevents hydration mismatch errors in production builds.
  if (!isClient) {
    return null;
  }

  return (
    <div 
      className={`${isDarkMode ? 'space-gradient' : 'bg-slate-50'} min-h-screen transition-colors duration-300 font-heebo overflow-x-hidden`}
    >
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