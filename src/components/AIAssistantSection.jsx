import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Sparkles, AlertCircle, Download, Cpu, Loader2 } from 'lucide-react';
import { CreateMLCEngine } from "@mlc-ai/web-llm";
import './AIAssistantSection.css';

// Using a lightweight 1B model for browser performance
const SELECTED_MODEL = "Llama-3.2-1B-Instruct-q4f32_1-MLC";

const suggestionChips = [
    "What is the punishment for ragging?",
    "Explain NEP 2020 highlights",
    "Student-Faculty ratio for AICTE?",
    "Is the Antiragging affidavit mandatory?"
];

const AIAssistantSection = () => {
    const [messages, setMessages] = useState([
        {
            id: 1,
            type: 'bot',
            text: "Hello! I am running locally in your browser using WebGPU. I can answer questions about regulations without sending data to any external server. To begin, please initialize the AI engine."
        }
    ]);
    const [inputText, setInputText] = useState('');
    const [isLoadingResponse, setIsLoadingResponse] = useState(false);

    // Engine State
    const [engine, setEngine] = useState(null);
    const [isDownloading, setIsDownloading] = useState(false);
    const [downloadProgress, setDownloadProgress] = useState(0); // 0 to 1 ideally, or string text
    const [downloadText, setDownloadText] = useState("");
    const [isEngineReady, setIsEngineReady] = useState(false);

    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, downloadText]);

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const initializeEngine = async () => {
        setIsDownloading(true);
        try {
            const eng = await CreateMLCEngine(
                SELECTED_MODEL,
                {
                    initProgressCallback: (report) => {
                        setDownloadText(report.text);
                        // Attempt to parse percentage if available in text
                        // WebLLM report.progress is sometimes available
                    }
                }
            );
            setEngine(eng);
            setIsEngineReady(true);
            setIsDownloading(false);

            setMessages(prev => [...prev, {
                id: Date.now(),
                type: 'bot',
                text: "Engine initialized successfully! I am now ready to answer your questions locally."
            }]);
        } catch (error) {
            console.error("WebLLM Init Error:", error);
            setIsDownloading(false);
            setMessages(prev => [...prev, {
                id: Date.now(),
                type: 'bot',
                text: `Error initializing AI Engine: ${error.message}. Please check if your browser supports WebGPU.`
            }]);
        }
    };

    const handleSendMessage = async () => {
        if (!inputText.trim() || isLoadingResponse || !isEngineReady) return;

        const userMsg = { id: Date.now(), type: 'user', text: inputText };
        setMessages(prev => [...prev, userMsg]);
        setInputText('');
        setIsLoadingResponse(true);

        try {
            const systemPrompt = "You are EduLegis AI, a specialized Regulatory Intelligence Agent for Indian Higher Education. Answer strictly based on UGC, AICTE, and NEP 2020 guidelines. Keep answers concise and professional.";

            const chunks = await engine.chat.completions.create({
                messages: [
                    { role: "system", content: systemPrompt },
                    ...messages.filter(m => m.id !== 1).map(m => ({
                        role: m.type === 'bot' ? 'assistant' : 'user',
                        content: m.text
                    })),
                    { role: "user", content: inputText }
                ],
                temperature: 0.7,
                stream: false, // We can do streaming later if needed
            });

            const reply = chunks.choices[0].message.content;

            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                type: 'bot',
                text: reply
            }]);

        } catch (error) {
            console.error("Inference Error:", error);
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                type: 'bot',
                text: "An error occurred while generating the response."
            }]);
        } finally {
            setIsLoadingResponse(false);
        }
    };

    return (
        <div className="ai-assistant-section">
            <div className="ai-chat-container">
                {/* Header */}
                <div className="ai-chat-header">
                    <div className="ai-title-row">
                        <Sparkles size={24} className="ai-icon-header" />
                        <span className="ai-title">EduLegis AI</span>
                        <span className="live-status">
                            {isEngineReady ? (
                                <>
                                    <span className="pulsing-dot"></span> ONLINE
                                </>
                            ) : (
                                <>
                                    <span className="status-dot offline"></span> OFFLINE
                                </>
                            )}
                        </span>
                    </div>
                    <p className="ai-subtitle">RAG-powered regulatory intelligence • UGC • AICTE • NEP 2020</p>
                </div>

                {/* Engine Initialization Overlay (if not ready) */}
                {!isEngineReady && !isDownloading && (
                    <div className="engine-init-overlay">
                        <Cpu size={48} className="cpu-icon" />
                        <h3>Run AI Locally</h3>
                        <p>This will download the Llama-3.2-1B model (~1GB) to your browser cache. <br />It runs entirely on your device's GPU.</p>
                        <button className="init-btn" onClick={initializeEngine}>
                            <Download size={18} />
                            Download & Initialize Model
                        </button>
                    </div>
                )}

                {/* Downloading State */}
                {isDownloading && (
                    <div className="engine-init-overlay">
                        <Loader2 size={48} className="cpu-icon spin" />
                        <h3>Initializing AI Engine...</h3>
                        <p>{downloadText || "Loading model weights..."}</p>
                        {/* Fake progress bar purely visual based on text changes or infinite loader */}
                        <div className="progress-bar-container">
                            <div className="progress-bar-fill"></div>
                        </div>
                    </div>
                )}

                {/* Messages (Only visible/interactive when ready, or showing backdrop) */}
                <div className={`ai-messages-area ${!isEngineReady ? 'blurred' : ''}`}>
                    {messages.map((msg) => (
                        <div key={msg.id} className={`message-row ${msg.type === 'bot' ? 'bot-row' : 'user-row'}`}>
                            {msg.type === 'bot' && (
                                <div className="bot-avatar">
                                    <Bot size={18} />
                                </div>
                            )}

                            <div className={`message-bubble ${msg.type}`}>
                                {msg.text.split('\n').map((line, i) => (
                                    <p key={i}>{line}</p>
                                ))}
                            </div>

                            {msg.type === 'user' && (
                                <div className="user-avatar">
                                    <User size={18} />
                                </div>
                            )}
                        </div>
                    ))}

                    {isLoadingResponse && (
                        <div className="message-row bot-row">
                            <div className="bot-avatar">
                                <Bot size={18} />
                            </div>
                            <div className="message-bubble bot loading-bubble">
                                <span className="typing-dot"></span>
                                <span className="typing-dot"></span>
                                <span className="typing-dot"></span>
                                <span className="loading-text">Generating on-device...</span>
                            </div>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Suggestion Chips */}
                {isEngineReady && !messages.some(m => m.type === 'user') && (
                    <div className="suggestion-chips">
                        {suggestionChips.map((chip, idx) => (
                            <button key={idx} onClick={() => setInputText(chip)} className="chip-btn">
                                {chip}
                            </button>
                        ))}
                    </div>
                )}

                {/* Input */}
                <div className="ai-input-area">
                    <input
                        type="text"
                        className="ai-input"
                        placeholder={isEngineReady ? "Ask about regulations..." : "Initialize engine to chat..."}
                        value={inputText}
                        onChange={(e) => setInputText(e.target.value)}
                        onKeyPress={handleKeyPress}
                        disabled={!isEngineReady || isLoadingResponse}
                    />
                    <button
                        className={`ai-send-btn ${(!isEngineReady || isLoadingResponse) ? 'disabled' : ''}`}
                        onClick={handleSendMessage}
                        disabled={!isEngineReady || isLoadingResponse}
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>

            <div className="live-footer">
                <AlertCircle size={14} />
                <span>EduLegis AI may display information that requires professional verification.</span>
            </div>
        </div>
    );
};

export default AIAssistantSection;
