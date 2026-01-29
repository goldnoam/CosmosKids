
import React, { useState } from 'react';
import Layout from './components/Layout';
import Hero from './components/Hero';
import PlanetExplorer from './components/PlanetExplorer';
import SpaceChat from './components/SpaceChat';
import SpaceQuiz from './components/SpaceQuiz';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('home');

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return <Hero onExplore={() => setActiveTab('planets')} />;
      case 'planets':
        return <PlanetExplorer />;
      case 'chat':
        return <SpaceChat />;
      case 'quiz':
        return <SpaceQuiz />;
      default:
        return <Hero onExplore={() => setActiveTab('planets')} />;
    }
  };

  return (
    <div className="space-gradient min-h-screen text-white">
      <Layout activeTab={activeTab} setActiveTab={setActiveTab}>
        {renderContent()}
      </Layout>
    </div>
  );
};

export default App;
