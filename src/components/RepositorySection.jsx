import React, { useState } from 'react';
import { Shield, FileText } from 'lucide-react';
import { repositoryItems } from '../data/repositoryItems';
import RepositoryDetailModal from './RepositoryDetailModal';
import './RepositorySection.css';

const RepositorySection = () => {
    const [selectedItem, setSelectedItem] = useState(null);

    return (
        <div className="repository-container">
            <div className="repository-header">
                <h2 className="repository-title">Policy Repository</h2>
                <p className="repository-subtitle">
                    Comprehensive database of Indian education regulations and guidelines
                </p>
            </div>

            <div className="repository-grid">
                {repositoryItems.map((item) => (
                    <div
                        key={item.id}
                        className="repo-card"
                        onClick={() => setSelectedItem(item)}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className="repo-card-header">
                            <div className="repo-icon">
                                {item.iconType === 'shield' ? <Shield size={24} /> : <FileText size={24} />}
                            </div>
                            <span className="repo-badge">{item.badge}</span>
                        </div>

                        <div>
                            <h3 className="repo-card-title">{item.title}</h3>
                            <p className="repo-card-desc">{item.description}</p>
                        </div>

                        <div className="repo-tags">
                            {item.tags.map((tag, index) => (
                                <span key={index} className="repo-tag">{tag}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {selectedItem && (
                <RepositoryDetailModal
                    item={selectedItem}
                    onClose={() => setSelectedItem(null)}
                />
            )}
        </div>
    );
};

export default RepositorySection;
