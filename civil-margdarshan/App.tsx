
import React, { useState } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ExamGrid from './components/ExamGrid';
import VideoResources from './components/VideoResources';
import Downloads from './components/Downloads';
import Footer from './components/Footer';
import AITutor from './components/AITutor';
import NotificationTicker from './components/NotificationTicker';
import CommunitySection from './components/CommunitySection';
import NoticeBoard from './components/NoticeBoard';

const App: React.FC = () => {
  // State to manage the selected exam filter for the downloads section
  const [selectedCategory, setSelectedCategory] = useState<{id: string, title: string} | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Header />
      <NotificationTicker />
      <main className="flex-grow">
        <Hero />
        <NoticeBoard />
        <ExamGrid 
          onCategorySelect={(id, title) => setSelectedCategory({id, title})} 
        />
        <VideoResources />
        <CommunitySection />
        <Downloads 
          filter={selectedCategory} 
          onClearFilter={() => setSelectedCategory(null)} 
        />
      </main>
      <Footer />
      <AITutor />
    </div>
  );
};

export default App;
