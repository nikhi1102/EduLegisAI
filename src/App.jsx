import React, { useEffect, useState } from 'react';
import Header from './components/Header';
import HeroSection from './components/HeroSection';
import RepositorySection from './components/RepositorySection';
import EmploymentExchangeSection from './components/EmploymentExchangeSection';
import AccreditationAuditorSection from './components/AccreditationAuditorSection';
import SyllabusArchitectSection from './components/SyllabusArchitectSection';
import AIAssistantSection from './components/AIAssistantSection';
import ClickSpark from './components/ClickSpark';
import './components/EmploymentExchangeSection.css'; // Ensure CSS is imported
// import ModuleSection from './components/ModuleSection'; 
// import FAQSection from './components/FAQSection';

function App() {
  const [activeTab, setActiveTab] = useState('Home');

  // Force dark mode for this landing page design
  useEffect(() => {
    document.body.classList.add('dark-mode');
    // Override global background for the pitch black look
    document.body.style.backgroundColor = '#000000';
    document.body.style.backgroundImage = 'none';
  }, []);

  return (
    <div className="app-container">
      <ClickSpark
        sparkColor="hsl(9, 96%, 56%)"
        sparkSize={12}
        sparkRadius={20}
        sparkCount={8}
        duration={400}
      >
        <Header activeTab={activeTab} setActiveTab={setActiveTab} />

        <main>
          {activeTab === 'Home' && <HeroSection setActiveTab={setActiveTab} />}
          {activeTab === 'Repository' && <RepositorySection />}
          {activeTab === 'Employment Exchange' && <EmploymentExchangeSection />}
          {activeTab === 'Accreditation Auditor' && <AccreditationAuditorSection />}
          {activeTab === 'AI Assistant' && <AIAssistantSection />}
          {activeTab === 'Syllabus Architect' && <SyllabusArchitectSection />}

          {/* Placeholders for other tabs */}
          {/* The Syllabus Architect placeholder is now replaced by the actual component */}
        </main>
      </ClickSpark>
    </div>
  );
}

export default App;
