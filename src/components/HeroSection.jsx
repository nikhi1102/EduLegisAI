import React from 'react';
import { Zap, BookOpen } from 'lucide-react';
import './HeroSection.css';
import DarkVeilBackground from './DarkVeilBackground';
import FAQSection from './FAQSection';

const HeroSection = ({ setActiveTab }) => {
    return (
        <div className="home-wrapper">
            <div className="hero-container">
                <DarkVeilBackground />
                {/* <div className="hero-bg-glow"></div> */}

                <div className="live-badge">
                    <Zap size={14} /> Live Indexing Active
                </div>

                <h1 className="hero-title">
                    Decode Educational<br />
                    <span>Bureaucracy</span> with AI
                </h1>

                <p className="hero-subtitle">
                    Welcome to the future of regulatory intelligence
                </p>

                <div className="hero-actions">
                    <button
                        className="btn-hero-primary"
                        onClick={() => setActiveTab('AI Assistant')}
                    >
                        <Zap size={18} /> Start Querying
                    </button>
                    <button
                        className="btn-hero-secondary"
                        onClick={() => setActiveTab('Repository')}
                    >
                        <BookOpen size={18} /> View Documentation
                    </button>
                </div>

                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-value">10,000+</div>
                        <div className="stat-label">Policies Indexed</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">15</div>
                        <div className="stat-label">Agencies Tracked</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-value">50K+</div>
                        <div className="stat-label">AI Queries/Day</div>
                    </div>
                </div>
            </div>

            <FAQSection />

            <div className="ticker-bar">
                <div className="ticker-track">
                    <span>UGC Regulations 2023</span>
                    <span className="dot">•</span>
                    <span>AICTE Approval Process Handbook</span>
                    <span className="dot">•</span>
                    <span>National Education Policy (NEP) 2020</span>
                    <span className="dot">•</span>
                    <span>NBA Accreditation Manual</span>
                    <span className="dot">•</span>
                    <span>NAAC Assessment Guidelines</span>
                    <span className="dot">•</span>
                    <span>Anti-Ragging Regulations</span>
                    <span className="dot">•</span>
                    <span>Academic Bank of Credits (ABC)</span>
                    <span className="dot">•</span>
                    {/* Duplicate for seamless loop */}
                    <span>UGC Regulations 2023</span>
                    <span className="dot">•</span>
                    <span>AICTE Approval Process Handbook</span>
                    <span className="dot">•</span>
                    <span>National Education Policy (NEP) 2020</span>
                    <span className="dot">•</span>
                    <span>NBA Accreditation Manual</span>
                    <span className="dot">•</span>
                    <span>NAAC Assessment Guidelines</span>
                    <span className="dot">•</span>
                    <span>Anti-Ragging Regulations</span>
                    <span className="dot">•</span>
                    <span>Academic Bank of Credits (ABC)</span>
                    <span className="dot">•</span>
                </div>
            </div>
        </div>
    );
};

export default HeroSection;
