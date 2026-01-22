import React, { useState } from 'react';
import { Globe, ChevronDown, User, MoreVertical, LogOut, Settings, HelpCircle, ChevronLeft, Bell, Moon, Sun, Edit2, LogIn } from 'lucide-react';
import './Header.css';

const Header = ({ activeTab, setActiveTab }) => {
    const [showLangMenu, setShowLangMenu] = useState(false);
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [menuView, setMenuView] = useState('main'); // 'main' | 'settings'
    const [selectedLang, setSelectedLang] = useState('EN');
    const [notifications, setNotifications] = useState(true);
    const [darkMode, setDarkMode] = useState(true);
    const [showProfile, setShowProfile] = useState(false);
    const [isEditingProfile, setIsEditingProfile] = useState(false);
    const [tempName, setTempName] = useState('Demo User');

    // Mock User Data
    const [user, setUser] = useState({
        name: 'Demo User',
        email: 'user@edulegis.ai'
    });

    const handleSaveProfile = () => {
        setUser({ ...user, name: tempName });
        setIsEditingProfile(false);
    };

    const toggleTheme = () => {
        setDarkMode(!darkMode);
        document.body.classList.toggle('dark-mode');
        // Simple background toggle for demo
        document.body.style.backgroundColor = !darkMode ? '#000000' : '#ffffff';
    };

    const handleUserMenuClose = () => {
        setShowUserMenu(false);
        setMenuView('main'); // Reset to main view on close
    };

    const scrollToFAQs = () => {
        const faqSection = document.getElementById('faq-section');
        if (faqSection) {
            faqSection.scrollIntoView({ behavior: 'smooth' });
            handleUserMenuClose();
        }
    };

    const navItems = [
        { name: 'Home', icon: null },
        { name: 'Repository', icon: 'beaker' },
        { name: 'Employment Exchange', icon: 'briefcase' },
        { name: 'AI Assistant', icon: 'bot' },
        { name: 'Accreditation Auditor', icon: 'scale' },
        { name: 'Syllabus Architect', icon: 'book' }
    ];

    return (
        <header className="header-pill">
            <nav className="nav-menu">
                {navItems.map((item) => (
                    <button
                        key={item.name}
                        className={`nav-link ${activeTab === item.name ? 'active' : ''}`}
                        onClick={() => setActiveTab(item.name)}
                    >
                        {item.name}
                    </button>
                ))}
            </nav>

            <div className="header-divider"></div>

            <div className="header-actions">
                <div className="lang-menu-container">
                    <button
                        className="lang-selector"
                        onClick={() => setShowLangMenu(!showLangMenu)}
                    >
                        <Globe size={16} />
                        <span>{selectedLang}</span>
                        <ChevronDown size={14} />
                    </button>

                    {showLangMenu && (
                        <div className="dropdown-menu lang-dropdown">
                            <button onClick={() => { setSelectedLang('EN'); setShowLangMenu(false); }}>English</button>
                            <button onClick={() => { setSelectedLang('TA'); setShowLangMenu(false); }}>Tamil</button>
                            <button onClick={() => { setSelectedLang('HI'); setShowLangMenu(false); }}>Hindi</button>
                        </div>
                    )}
                </div>

                <div className="user-actions">
                    <div className="profile-container">
                        <button
                            className="icon-btn profile-btn"
                            onClick={() => setShowProfile(!showProfile)}
                        >
                            <User size={18} />
                        </button>
                        {showProfile && (
                            <div className="profile-popup">
                                <div className="profile-header-info">
                                    <div className="profile-name">{user.name}</div>
                                    <div className="profile-email">{user.email}</div>
                                </div>

                                <div className="profile-options">
                                    {isEditingProfile ? (
                                        <div className="edit-profile-form">
                                            <input
                                                type="text"
                                                value={tempName}
                                                onChange={(e) => setTempName(e.target.value)}
                                                className="profile-input"
                                            />
                                            <button onClick={handleSaveProfile} className="save-btn">Save</button>
                                        </div>
                                    ) : (
                                        <button onClick={() => setIsEditingProfile(true)} className="profile-action-btn">
                                            <Edit2 size={14} /> Edit Profile
                                        </button>
                                    )}

                                    <button className="profile-action-btn auth-btn">
                                        <LogIn size={14} /> Sign up with Work
                                    </button>
                                    <button className="profile-action-btn auth-btn">
                                        <LogIn size={14} /> Sign up with Student
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    <div className="user-menu-container">
                        <button
                            className="icon-btn"
                            onClick={() => setShowUserMenu(!showUserMenu)}
                        >
                            <MoreVertical size={18} />
                        </button>

                        {showUserMenu && (
                            <div className="dropdown-menu user-dropdown">
                                {menuView === 'main' ? (
                                    <>
                                        <button onClick={() => setMenuView('settings')}>
                                            <Settings size={14} /> Settings
                                        </button>
                                        <button onClick={scrollToFAQs}>
                                            <HelpCircle size={14} /> FAQs and Help
                                        </button>
                                        <button onClick={() => setShowUserMenu(false)} className="text-danger">
                                            <LogOut size={14} /> Logout
                                        </button>
                                        <button onClick={() => setShowUserMenu(false)} className="back-btn-main">
                                            <ChevronLeft size={14} /> Back
                                        </button>
                                    </>
                                ) : (
                                    <div className="settings-submenu">
                                        <button onClick={() => setMenuView('main')} className="back-btn">
                                            <ChevronLeft size={14} /> Back
                                        </button>

                                        <div className="settings-item">
                                            <div className="settings-label">
                                                <Bell size={14} /> Push Notifications
                                            </div>
                                            <label className="toggle-switch">
                                                <input
                                                    type="checkbox"
                                                    checked={notifications}
                                                    onChange={() => setNotifications(!notifications)}
                                                />
                                                <span className="slider round"></span>
                                            </label>
                                        </div>

                                        <div className="settings-item">
                                            <div className="settings-label">
                                                {darkMode ? <Moon size={14} /> : <Sun size={14} />} Theme
                                            </div>
                                            <label className="toggle-switch">
                                                <input
                                                    type="checkbox"
                                                    checked={darkMode}
                                                    onChange={toggleTheme}
                                                />
                                                <span className="slider round"></span>
                                            </label>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
