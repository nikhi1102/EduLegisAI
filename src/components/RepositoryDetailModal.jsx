import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import './RepositoryDetailModal.css';

const RepositoryDetailModal = ({ item, onClose }) => {
    if (!item) return null;

    // Close on Escape key
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape') onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);

    // Prevent background scrolling when modal is open
    useEffect(() => {
        document.body.style.overflow = 'hidden';
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, []);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <div className="modal-header">
                    <button className="modal-close-btn" onClick={onClose}>
                        <X size={18} />
                    </button>

                    <div className="modal-title-row">
                        <h2 className="modal-title">{item.title}</h2>
                        <span className="modal-badge">{item.badge}</span>
                    </div>

                    <div className="modal-tags">
                        {item.tags.map((tag, index) => (
                            <span key={index} className="modal-tag">{tag}</span>
                        ))}
                    </div>
                </div>

                <div className="modal-body">
                    <h3 className="section-title">Summary</h3>
                    <p className="modal-text" style={{ marginBottom: '1.5rem' }}>
                        {item.summary || item.description || "No summary available."}
                    </p>

                    <h3 className="section-title">Full Document</h3>
                    <div className="modal-text">
                        {item.fullDocument ? item.fullDocument : (
                            <p style={{ fontStyle: 'italic', color: '#666' }}>
                                Full document content preview not available for this item.
                                (This is a demo placeholder. In a real app, this would fetch the full PDF text.)
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RepositoryDetailModal;
