import React, { useState, useRef, useEffect } from 'react';
import { Upload, FileText, CheckCircle, AlertTriangle, Clock, ArrowUpRight } from 'lucide-react';
import './AccreditationAuditorSection.css';

const AccreditationAuditorSection = () => {
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef(null);
    const [currentFile, setCurrentFile] = useState(null);
    const [uploadedFiles, setUploadedFiles] = useState([
        { name: 'Faculty_Roster_2024.pdf', date: 'Today, 10:23 AM', status: 'Processing' },
        { name: 'Infra_Report_V2.pdf', date: 'Yesterday', status: 'Passed' }
    ]);

    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [showAnalysis, setShowAnalysis] = useState(false);

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault(); // Prevent default behavior
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    };

    const handleFileInput = (e) => {
        const files = e.target.files;
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    };

    const handleFileUpload = (file) => {
        // Add file immediately with Uploading status
        setUploadedFiles(prevFiles => [{
            name: file.name,
            date: 'Uploading...',
            status: 'Uploading',
            progress: 0
        }, ...prevFiles]);

        setCurrentFile(file);
        setIsUploading(true);
        setUploadProgress(0);
        setShowAnalysis(true);
    };

    // Handle upload simulation
    useEffect(() => {
        let interval;
        if (isUploading) {
            interval = setInterval(() => {
                setUploadProgress((prev) => {
                    const newProgress = prev + 10;
                    if (newProgress >= 100) return 100;

                    // Update progress in the list item
                    setUploadedFiles(prevFiles => prevFiles.map((f, i) => {
                        if (i === 0 && f.status === 'Uploading') {
                            return { ...f, progress: newProgress };
                        }
                        return f;
                    }));

                    return newProgress;
                });
            }, 200);
        }
        return () => clearInterval(interval);
    }, [isUploading]);

    // Handle upload completion
    useEffect(() => {
        if (uploadProgress >= 100 && isUploading) {
            setUploadedFiles(prevFiles => prevFiles.map((f, i) => {
                if (i === 0 && f.status === 'Uploading') {
                    return { ...f, status: 'Processing', date: 'Just now', progress: 100 };
                }
                return f;
            }));
            setIsUploading(false);
            setCurrentFile(null);
        }
    }, [uploadProgress, isUploading]);

    return (
        <section className="auditor-section">
            <div className="auditor-header">
                <h2 className="auditor-title">Accreditation Auditor</h2>
                <p className="auditor-subtitle">
                    AI-powered compliance verification for UGC & AICTE regulations.
                    Upload your institution's documents for an instant preliminary audit.
                </p>
            </div>

            <div className="auditor-dashboard">
                {/* Main Action Area */}
                <div className="audit-action-card">
                    {showAnalysis ? (
                        <div className="analysis-dashboard">
                            <div className="analysis-header">
                                <div className="analysis-status">
                                    {isUploading ? 'Analyzing Document...' : 'Analysis Complete'}
                                </div>
                                <div className="analysis-filename">{currentFile?.name}</div>
                            </div>

                            <div className="analysis-progress-container">
                                <div className="analysis-progress-bar">
                                    <div
                                        className="analysis-progress-fill"
                                        style={{ width: `${uploadProgress}%` }}
                                    ></div>
                                </div>
                                <div className="analysis-progress-text">
                                    <span>{uploadProgress < 100 ? 'Identifying Compliance Gaps...' : 'Report Generated'}</span>
                                    <span>{uploadProgress}%</span>
                                </div>
                            </div>

                            <div className="analysis-charts">
                                {['Faculty Ratios', 'Infrastructure', 'Curriculum', 'Research'].map((label, i) => (
                                    <div key={label} className="chart-column">
                                        <div className="chart-bar-container">
                                            <div
                                                className="chart-bar"
                                                style={{ height: uploadProgress > 0 ? `${[65, 80, 45, 90][i]}%` : '0%' }}
                                            ></div>
                                        </div>
                                        <span className="chart-label">{label}</span>
                                    </div>
                                ))}
                            </div>

                            <button
                                className="upload-new-btn"
                                onClick={() => {
                                    setShowAnalysis(false);
                                    setIsUploading(false);
                                    setUploadProgress(0);
                                    setCurrentFile(null);
                                }}
                            >
                                <Upload size={16} /> Upload New File
                            </button>
                        </div>
                    ) : (
                        <div
                            className={`upload-area ${isDragging ? 'dragging' : ''}`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                            onClick={() => fileInputRef.current.click()}
                            style={{ cursor: 'pointer' }}
                        >
                            <input
                                type="file"
                                ref={fileInputRef}
                                style={{ display: 'none' }}
                                onChange={handleFileInput}
                                accept=".pdf,.docx"
                            />
                            <Upload size={48} className="upload-icon" />
                            <h3 className="upload-text">Upload Documents for Audit</h3>
                            <p className="upload-subtext">Drag & drop PDF, DOCX files here or click to browse</p>
                        </div>
                    )}
                </div>

                {/* Metrics & Recent */}
                <div className="audit-metrics">
                    {/* Compliance Score Card */}
                    <div className="metric-card">
                        <div className="metric-header">
                            <CheckCircle size={16} /> Compliance Score
                        </div>
                        <div className="metric-value">87%</div>
                        <div className="metric-footer">
                            <ArrowUpRight size={14} className="trend-up" />
                            <span className="trend-up">+2.4%</span> vs last month
                        </div>
                    </div>

                    {/* Pending Reviews Card */}
                    <div className="metric-card">
                        <div className="metric-header">
                            <Clock size={16} /> Recent Audits
                        </div>
                        <div className="recent-audits-list">
                            {uploadedFiles.map((file, index) => (
                                <div className="audit-item" key={index}>
                                    <div>
                                        <div style={{ color: 'white', fontSize: '0.9rem' }}>{file.name}</div>
                                        <div style={{ color: '#a1a1aa', fontSize: '0.75rem' }}>{file.date}</div>
                                    </div>
                                    <span className={`audit-status ${file.status === 'Passed' ? 'status-completed' :
                                        file.status === 'Uploading' ? 'status-uploading' : 'status-pending'
                                        }`}>
                                        {file.status === 'Uploading' ? `${file.progress}%` : file.status}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Critical Issues Card */}
                    <div className="metric-card" style={{ borderColor: 'rgba(239, 68, 68, 0.2)' }}>
                        <div className="metric-header" style={{ color: '#f87171' }}>
                            <AlertTriangle size={16} /> Critical Gaps
                        </div>
                        <div className="metric-value" style={{ color: '#f87171' }}>3</div>
                        <p style={{ color: '#a1a1aa', fontSize: '0.85rem', marginTop: '0.5rem' }}>
                            Requires immediate attention regarding faculty ratio.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default AccreditationAuditorSection;
