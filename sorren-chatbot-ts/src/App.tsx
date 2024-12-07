import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import './SorrenChatbot.css';
import './petals.css';
import './navbar.css';
import logo from './logo.svg';

import ApiComponent from './api/apiClient';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

interface Message {
  sender: 'user' | 'sorren';
  text: string;
  fontSize?: string;
}

function SorrenChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [typingMessage, setTypingMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // State for loading screen

   // Visibility toggles for prompts
   const [showPrompts, setShowPrompts] = useState<boolean>(false);
   const [showProjectPrompts, setShowProjectPrompts] = useState<boolean>(false);

  const initialMessageSent = useRef(false);

  interface Prompt {
    label: string;
    prompt: string;
  }
  const prompts: Prompt[] = [
    { label: "Tell me about yourself", prompt: "tell me about yourself" },
    { label: "Tell me about your past job experience", prompt: "tell me about your past job experience" },
    { label: "What do you do for a living", prompt: "what do you do for a living" },
    { label: "Tell me about your education", prompt: "tell me about your education" }
  ];

  const projectPrompts: Prompt[] = [
    { label: "UX research", prompt: "UX research" },
    { label: "City of Vancouver", prompt: "City of Vancouver" },
    { label: "Smart drive test", prompt: "smart drive test" },
    { label: "Bakery website", prompt: "bakery website" },
    { label: "Travel app", prompt: "travel app" },
    { label: "Student webpage creator", prompt: "student webpage creator" },
    { label: "Facemask detection", prompt: "facemask detection" },
    { label: "Sleep chatbot", prompt: "sleep chatbot" },
    { label: "Map app", prompt: "map app" },
    { label: "Virtual pet", prompt: "virtual pet" }
  ];



  useEffect(() => {
    // Simulate a loading delay for 2 seconds
    const loadingTimeout = setTimeout(() => {
      setLoading(false); // Hide loading screen after timeout
    }, 2000);

    return () => clearTimeout(loadingTimeout);
  }, []);

   // Calculate font size based on character length
   const getDynamicFontSize = (text: string) => {
    const baseSize = 2; // Base font size for adjustments
    let fontSize;
    if (text.length > 150) fontSize = `${baseSize - 0.4}rem`; // Smaller font for long text
    else if (text.length > 100) fontSize = `${baseSize - 0.2}rem`; // Medium for mid-length text
    else fontSize = `${baseSize}rem`; // Regular font for short text
    
    console.log(`Text: "${text}" | Length: ${text.length} | Font Size: ${fontSize}`);
    return fontSize;
  };


  const simulateTyping = (text: string) => {
    setTypingMessage('');
    let index = -1;
  
    const fontSize = getDynamicFontSize(text); // Calculate font size for the final message
  
    const typingInterval = setInterval(() => {
      if (index < text.length) {
        setTypingMessage((prev) => (prev || '') + text[index]);
        index++;
      } else {
        clearInterval(typingInterval);
        const newMessage: Message = { sender: 'sorren', text, fontSize }; // Add fontSize to Sorren's message
        setMessages((prevMessages) => [...prevMessages, newMessage]);
        setTypingMessage(null);
      }
    }, 50);
  };
  

  useEffect(() => {
    if (!initialMessageSent.current) {
      simulateTyping("Hi I'm Sorren or rather his AI model, let's chat!");
      initialMessageSent.current = true;
    }
  }, []);


  const sendPrompt = async (prompt: string) => {
   

    const userMessage: Message = { sender: 'user', text: prompt, fontSize: getDynamicFontSize(prompt) };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
  
    try {
      const response = await axios.post<{ response: string }>(`${API_BASE_URL}/api/generate-response`, { input: prompt });
      simulateTyping(response.data.response);
    } catch (error) {
      console.error("Error fetching response:", error);
      simulateTyping("I'm having trouble responding right now. Please try again later.");
    }
  };

  const handleUserMessage = async () => {
    if (!userInput.trim()) return;

    const userMessage: Message = { sender: 'user', text: userInput, fontSize: getDynamicFontSize(userInput) };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await axios.post<{ response: string }>(`${API_BASE_URL}/api/generate-response`, { input: userInput });
      simulateTyping(response.data.response);
    } catch (error) {
      console.error("Error fetching response:", error);
      simulateTyping("I'm having trouble responding right now. Please try again later.");
    }

    setUserInput('');
  };

  if (loading) {
    // Render loading screen while the page is loading
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <p>Loading SorrenChatbot...</p>
      </div>
    );
  }

  return (
    <div className="chat-container">
      
    
        <div className="home_nav">
          <div className="home_nav-item">
            <div className="home_icon"><a href="https://sorrenj.github.io/index.html#project">
            <img src={logo} alt="Logo" /></a>
    
      
             
            </div>
          </div>
    
          <div className="home_nav-item">
            <div id="myLinks" className="nav">
              
            </div>
          </div>
        </div>
      
      
      
      
      
      
      
      <ApiComponent />
      <div>
    {messages.map((msg, index) => (
      <div
        key={index}
        className={msg.sender === 'sorren' ? 'bot-message-container' : ''}
      >
        {msg.sender === 'sorren' && (
          <div className="bot-profile-pic"></div>
        )}
        <p
          className={`${msg.sender === 'user' ? 'user-message' : 'bot-message bot-message-content'}`}
          style={{ fontSize: msg.fontSize }}
        >
          {msg.sender === 'user' ? 'You: ' : 'Sorren: '}
          {msg.text}
        </p>
      </div>
    ))}
    {typingMessage && (
      <div className="bot-message-container">
        <div className="bot-profile-pic"></div>
        <p className="bot-message bot-message-content" style={{ fontSize: getDynamicFontSize(typingMessage) }}>
          Sorren: {typingMessage}
        </p>
      </div>
    )}
  </div>
  <br></br>
  <br></br>
  <span className="input-container">
    <input
      type="text"
      value={userInput}
      onChange={(e) => setUserInput(e.target.value)}
      onKeyPress={(e) => e.key === 'Enter' && handleUserMessage()}
    />
    <button type="submit" onClick={handleUserMessage}>Send</button>
  </span>
    
    
    
    
      {/* Toggle buttons for visibility */}
      <div className="toggle-buttons">
          <button onClick={() => setShowPrompts(!showPrompts)}>
            {showPrompts ? 'Hide' : 'Show'} Prompts
          </button>
          <button onClick={() => setShowProjectPrompts(!showProjectPrompts)}>
            {showProjectPrompts ? 'Hide' : 'Show'} Project Prompts
          </button>
        </div>

        {/* Conditionally render prompt buttons */}
        {showPrompts && (
          <div className="buttons-container prompts">
            {prompts.map((item, index) => (
              <button key={index} onClick={() => sendPrompt(item.prompt)}>
                {item.label}
              </button>
            ))}
          </div>
        )}

        {showProjectPrompts && (
          <div className="buttons-container project-prompts">
            {projectPrompts.map((item, index) => (
              <button key={index} onClick={() => sendPrompt(item.prompt)}>
                {item.label}
              </button>
            ))}
          </div>
        )}
    
    
    
    
    
    
    
    
    </div>
  );
}

export default SorrenChatbot;
