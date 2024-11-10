import React, { useState } from 'react';
import axios from 'axios';
import './SorrenChatbot.css';
import './petals.css';

interface Message {
  sender: 'user' | 'sorren';
  text: string;
}

function SorrenChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [typingMessage, setTypingMessage] = useState<string | null>(null);

  interface Prompt {
    label: string;
    prompt: string;
  }

  const prompts: Prompt[] = [
    { label: "Tell me about yourself", prompt: "tell me about yourself" },
    { label: "Help with coding", prompt: "help with coding" },
    { label: "What's your name", prompt: "what's your name" },
    { label: "Tell me about your past job experience", prompt: "tell me about your past job experience" },
    { label: "What do you do for a living", prompt: "what do you do for a living" },
    { label: "Tell me about your education", prompt: "tell me about your education" }
  ];

  const projectPrompts: Prompt[] = [
    { label: "UX research", prompt: "UX research" },
    { label: "City of Vancouver", prompt: "City of Vancouver " },
    { label: "Smart drive test", prompt: "smart drive test" },
    { label: "Bakery website", prompt: " bakery website" },
    { label: "Travel app", prompt: "travel app" },
    { label: "Student webpage creator", prompt: "student webpage creator" },
    { label: "Facemask detection", prompt: "facemask detection" },
    { label: "Sleep chatbot", prompt: "sleep chatbot" },
    { label: "Map app", prompt: " map app" },
    { label: "Virtual pet", prompt: "virtual pet" }
  ];

  // Function to simulate typing effect
  const simulateTyping = (text: string) => {
    setTypingMessage('');
    let index = -1;

    const typingInterval = setInterval(() => {
      if (index < text.length) {
        setTypingMessage((prev) => (prev || '') + text[index]);
        index++;
      } else {
        clearInterval(typingInterval);
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: 'sorren', text }
        ]);
        setTypingMessage(null);
      }
    }, 50); // Adjust typing speed (in ms) as desired
  };

  const sendPrompt = async (prompt: string) => {
    setMessages((prevMessages) => [...prevMessages, { sender: 'user', text: prompt }]);

    try {
      const response = await axios.post<{ response: string }>('/api/generate-response', { input: prompt });
      simulateTyping(response.data.response);
    } catch (error) {
      console.error("Error fetching response:", error);
      simulateTyping("I'm having trouble responding right now. Please try again later.");
    }
  };

  const handleUserMessage = async () => {
    if (!userInput.trim()) return;

    setMessages((prevMessages) => [...prevMessages, { sender: 'user', text: userInput }]);

    try {
      const response = await axios.post<{ response: string }>('/api/generate-response', { input: userInput });
      simulateTyping(response.data.response);
    } catch (error) {
      console.error("Error fetching response:", error);
      simulateTyping("I'm having trouble responding right now. Please try again later.");
    }

    setUserInput('');
  };

  return (
    <>
    <div id="petals"><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div>
    <div className="chat-container">
      <h1>Chat with Sorren</h1>


      <div>
        {messages.map((msg, index) => (
          <p key={index} className={msg.sender === 'user' ? 'user-message' : 'bot-message'}>
            {msg.sender === 'user' ? 'You: ' : 'Sorren: '}
            {msg.text}
          </p>
        ))}
        {typingMessage && (
          <p className="bot-message">
            Sorren: {typingMessage}
          </p>
        )}
      </div>

      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleUserMessage()}
      />
      <button type="submit" onClick={handleUserMessage}>Send</button>



      <div className="buttons-container prompts">
        {prompts.map((item, index) => (
          <button key={index} onClick={() => sendPrompt(item.prompt)}>
            {item.label}
          </button>
        ))}
      </div>

      <div className="buttons-container project-prompts">
        {projectPrompts.map((item, index) => (
          <button key={index} onClick={() => sendPrompt(item.prompt)}>
            {item.label}
          </button>
        ))}
      </div>
    </div>
    </>
  );
}

export default SorrenChatbot;
