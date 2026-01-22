import React, { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { faqs } from '../data/faqs';
import './FAQSection.css';

const FAQSection = () => {
    const [openIndex, setOpenIndex] = useState(null);

    const toggleIndex = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };

    return (
        <div className="faq-container" id="faq-section">
            <h2 className="faq-title">
                <HelpCircle size={32} style={{ display: 'inline-block', verticalAlign: 'middle', marginRight: '0.5rem' }} />
                FAQs & Help
            </h2>

            {faqs.map((category, index) => (
                <div
                    key={index}
                    className={`faq-category ${openIndex === index ? 'open' : ''}`}
                >
                    <div
                        className="faq-category-header"
                        onClick={() => toggleIndex(index)}
                    >
                        <span>{category.category}</span>
                        <ChevronDown size={24} className="faq-icon" />
                    </div>

                    <div className="faq-content">
                        {category.items.map((item, i) => (
                            <div key={i} className="faq-item">
                                <div className="faq-q">{item.q}</div>
                                <div className="faq-a">{item.a}</div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FAQSection;
