import React from 'react';
import { Search, ShieldCheck, PenTool, Database, Zap, CheckCircle } from 'lucide-react';
import { modules } from '../data/modules';
import './ModuleSection.css';

const ModuleSection = () => {
    const getIcon = (id) => {
        switch (id) {
            case 'policy-finder': return <Search size={32} />;
            case 'verification-engine': return <ShieldCheck size={32} />;
            case 'creation-engine': return <PenTool size={32} />;
            case 'repository': return <Database size={32} />;
            default: return <Search size={32} />;
        }
    };

    return (
        <section className="module-section">
            {modules.map((module, index) => (
                <div key={module.id} className="module-card" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="module-header">
                        <div className="module-title">
                            <h2>{module.title}</h2>
                            {module.tagline && <div className="module-tagline">{module.tagline}</div>}
                            <p className="module-description">{module.description}</p>
                        </div>
                        <div className="module-icon-wrapper">
                            {getIcon(module.id)}
                        </div>
                    </div>

                    {(module.howItWorks.length > 0 || module.impact.length > 0) && (
                        <div className="module-content-grid">

                            {module.howItWorks.length > 0 && (
                                <div className="info-block">
                                    <h3><Zap size={20} className="text-warning" /> How it Works</h3>
                                    <ul>
                                        {module.howItWorks.map((item, idx) => (
                                            <li key={idx}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {module.impact.length > 0 && (
                                <div className="info-block">
                                    <h3><CheckCircle size={20} style={{ color: 'var(--color-success)' }} /> Impact</h3>
                                    <ul>
                                        {module.impact.map((item, idx) => (
                                            <li key={idx}>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                        </div>
                    )}
                </div>
            ))}
        </section>
    );
};

export default ModuleSection;
