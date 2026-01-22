import React, { useState } from 'react';
import { Search, MapPin, Briefcase, IndianRupee } from 'lucide-react';
import { jobs } from '../data/jobs';
import './EmploymentExchangeSection.css';

const EmploymentExchangeSection = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [filterType, setFilterType] = useState('All');

    const filteredJobs = jobs.filter(job => {
        const matchesSearch = job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            job.organization.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesType = filterType === 'All' || job.type === filterType;
        return matchesSearch && matchesType;
    });

    const jobTypes = ['All', ...new Set(jobs.map(job => job.type))];

    return (
        <section className="employment-section">
            <div className="employment-header">
                <h2>Employment Exchange</h2>
                <p>Connect with top opportunities in the legal and educational compliance sector.</p>
            </div>

            <div className="filters-container">
                <div className="search-input-wrapper">
                    <Search className="search-icon" size={18} />
                    <input
                        type="text"
                        placeholder="Search for roles, organizations..."
                        className="job-search-input"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <select
                    className="filter-select"
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                >
                    {jobTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                    ))}
                </select>
            </div>

            <div className="jobs-grid">
                {filteredJobs.length > 0 ? (
                    filteredJobs.map(job => (
                        <div key={job.id} className="job-card">
                            <div>
                                <div className="job-header">
                                    <div>
                                        <h3 className="job-title">{job.title}</h3>
                                        <div className="job-org">{job.organization}</div>
                                    </div>
                                    <span className="job-type-badge">{job.type}</span>
                                </div>

                                <div className="job-details">
                                    <div className="job-detail-row">
                                        <MapPin size={14} />
                                        <span>{job.location}</span>
                                    </div>
                                    <div className="job-detail-row">
                                        <IndianRupee size={14} />
                                        <span>{job.salary}</span>
                                    </div>
                                </div>

                                <p className="job-description">{job.description}</p>

                                <div className="job-tags">
                                    {job.requirements.map((req, index) => (
                                        <span key={index} className="job-tag">{req}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="job-footer">
                                <span className="job-posted">Posted: {job.postedDate}</span>
                                <a
                                    href={job.applyLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="apply-btn"
                                >
                                    Apply Now
                                </a>
                            </div>
                        </div>
                    ))
                ) : (
                    <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '2rem', color: 'var(--text-secondary)' }}>
                        No opportunities found matching your criteria.
                    </div>
                )}
            </div>
        </section>
    );
};

export default EmploymentExchangeSection;
