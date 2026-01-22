import React, { useState, useEffect } from 'react';
import {
    Save,
    Download,
    Sparkles,
    Settings,
    BookOpen,
    CheckCircle,
    Layers
} from 'lucide-react';
import './SyllabusArchitectSection.css';

const SyllabusArchitectSection = () => {
    const [inputs, setInputs] = useState({
        programName: 'B.Tech in AI & Data Science',
        studentName: '',
        duration: '4 Years',
        nepAlignment: true
    });

    const [isGenerating, setIsGenerating] = useState(false);
    const [structure, setStructure] = useState(null);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setInputs(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const generateStructure = () => {
        setIsGenerating(true);

        // Parse duration string (e.g., "4 Years" -> 4)
        const years = parseInt(inputs.duration) || 4;
        const totalSemesters = years * 2;

        setTimeout(() => {
            // Dynamically generate semesters based on duration
            const newSemesters = Array.from({ length: totalSemesters }, (_, i) => {
                const semNum = i + 1;
                // Cycle through mock subjects to simulate variety
                const subjectPool = [
                    ['Mathematics I', 'Physics', 'Basic Electrical', 'Eng. Graphics'],
                    ['Mathematics II', 'Chemistry', 'Programming Fund.', 'Workshop'],
                    ['Data Structures', 'Discrete Maths', 'Digital Logic', 'COA'],
                    ['Algorithms', 'Operating Systems', 'DBMS', 'Theory of Comp.'],
                    ['Computer Networks', 'Software Eng.', 'Web Tech.', 'AI Basics'],
                    ['Machine Learning', 'Compiler Design', 'Cloud Computing', 'Cyber Security'],
                    ['Big Data', 'IoT', 'Blockchain', 'Elective I'],
                    ['Major Project', 'Internship', 'Social Service', 'Elective II']
                ];

                return {
                    name: `Semester ${semNum}`,
                    credits: 20 + Math.floor(Math.random() * 5), // Random credits 20-25
                    subjects: subjectPool[(semNum - 1) % subjectPool.length]
                };
            });

            setStructure({ semesters: newSemesters });
            setIsGenerating(false);
        }, 1500);
    };

    return (
        <div className="syllabus-architect-container">
            {/* Background Tech Overlay */}
            <div className="tech-bg-overlay"></div>

            <div className="sa-header">
                <div className="header-left">
                    <h1>Syllabus Architect</h1>
                    <span className="scrolling-text-container">
                        <span className="scrolling-text">AI-Powered Curriculum Design • NEP 2020 Compliant • Auto-Credit Calculation •</span>
                    </span>
                </div>
                <div className="header-actions">
                    <div className={`user-badge ${inputs.nepAlignment ? 'active' : ''}`}>
                        <span className="indicator"></span>
                        {inputs.nepAlignment ? 'NEP Mode Active' : 'Standard Mode'}
                    </div>
                    <button className="icon-btn" title="Settings"><Settings size={18} /></button>
                </div>
            </div>

            <div className="sa-content-grid">
                {/* Left Panel: Inputs */}
                <div className="sa-panel input-panel">
                    <div className="panel-header">
                        <h2>Curriculum Inputs</h2>
                    </div>

                    <div className="form-container">
                        <div className="form-group">
                            <label>Program Name</label>
                            <input
                                type="text"
                                name="programName"
                                value={inputs.programName}
                                onChange={handleInputChange}
                                className="glass-input"
                            />
                        </div>

                        <div className="form-group">
                            <label>Student Name / Cohort</label>
                            <input
                                type="text"
                                name="studentName"
                                value={inputs.studentName}
                                onChange={handleInputChange}
                                className="glass-input"
                                placeholder="E.g. Batch 2026"
                            />
                        </div>

                        <div className="form-group">
                            <label>Duration</label>
                            <select
                                name="duration"
                                value={inputs.duration}
                                onChange={handleInputChange}
                                className="glass-input"
                            >
                                <option>1 Year (Diploma)</option>
                                <option>2 Years (Master's)</option>
                                <option>3 Years (Bachelor's)</option>
                                <option>4 Years</option>
                            </select>
                        </div>

                        <div className="form-group toggle-group">
                            <label>NEP Alignment</label>
                            <div
                                className={`toggle-switch ${inputs.nepAlignment ? 'on' : 'off'}`}
                                onClick={() => setInputs(prev => ({ ...prev, nepAlignment: !prev.nepAlignment }))}
                            >
                                <div className="toggle-handle"></div>
                            </div>
                        </div>

                        <button
                            className={`generate-btn ${isGenerating ? 'loading' : ''}`}
                            onClick={generateStructure}
                            disabled={isGenerating}
                        >
                            <span className="btn-content">
                                {isGenerating ? <Sparkles className="spin" size={18} /> : <Layers size={18} />}
                                {isGenerating ? 'Architecting...' : 'Generate Structure'}
                            </span>
                            <div className="btn-glow"></div>
                        </button>
                    </div>
                </div>

                {/* Right Panel: Visualization */}
                <div className="sa-panel visualization-panel">
                    <div className="panel-header">
                        <h2>Generated Syllabus Structure {inputs.nepAlignment && '(NEP Compliant)'}</h2>
                        {structure && (
                            <button className="download-btn">Download JSON/PDF</button>
                        )}
                    </div>

                    <div className="canvas-area">
                        {!structure && !isGenerating && (
                            <div className="empty-state">
                                <BookOpen size={48} />
                                <p>Configure inputs and click Generate to visualize the curriculum structure.</p>
                            </div>
                        )}

                        {structure && (
                            <div className="flowchart-container fade-in">
                                {structure.semesters.map((sem, idx) => (
                                    <div key={idx} className="semester-node-group">
                                        <div className="semester-card">
                                            <div className="sem-header">
                                                <Layers size={14} className="sem-icon" />
                                                <span>{sem.name}</span>
                                            </div>
                                            <div className="sem-credits">{sem.credits} Credits</div>
                                            {/* Connector dot */}
                                            <div className="connector-dot right"></div>
                                        </div>

                                        <div className="subjects-tree">
                                            {/* SVG Lines Layer would go here, simplified with borders for now */}
                                            <div className="tree-lines"></div>

                                            <div className="subject-list">
                                                {sem.subjects.map((sub, sIdx) => (
                                                    <div key={sIdx} className="subject-pill">
                                                        {sub}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SyllabusArchitectSection;
