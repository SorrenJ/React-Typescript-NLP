import React, { useState } from 'react';
import axios from 'axios';

interface Message {
  sender: 'user' | 'sorren';
  text: string;
}

function SorrenChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>('');

  // Define the prompt type for better type safety
  interface Prompt {
    label: string;
    prompt: string;
  }

  // Predefined prompts
  const prompts: Prompt[] = [
    { label: "Tell me about yourself", prompt: "tell me about yourself" },
    { label: "Help with coding", prompt: "help with coding" },
    { label: "What's your name", prompt: "what's your name" },
    { label: "UX research", prompt: "UX research" },
    { label: "City of Vancouver", prompt: "tell me about your City of Vancouver " },
    { label: "Smart drive test", prompt: "tell me about your smart drive test" },
    { label: "Bakery website", prompt: "tell me about your bakery website" },
    { label: "Travel app", prompt: "tell me about your UX process with the travel app" },
    { label: "Student webpage creator", prompt: "tell me about your student webpage creator" },
    { label: "Facemask detection", prompt: "tell me about your facemask detection project" },
    { label: "Sleep chatbot", prompt: "tell me about your sleep chatbot project" },
    { label: "Map app", prompt: "tell me about your map app project" },
    { label: "Virtual pet", prompt: "tell me about your virtual pet project" },
    { label: "Tell me about your past job experience", prompt: "tell me about your work history experience" },
    { label: "What do you do for a living", prompt: "what do you do for a living" },
    { label: "Tell me about your education", prompt: "did you study at Simon Fraser University" }
  ];

  // Function to send a custom prompt
  const sendPrompt = async (prompt: string) => {
    // Add the prompt as a user message to the chat
    setMessages((prevMessages) => [...prevMessages, { sender: 'user', text: prompt }]);

    try {
      const response = await axios.post<{ response: string }>('/api/generate-response', { input: prompt });

      // Add Sorren's response to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'sorren', text: response.data.response }
      ]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'sorren', text: "I'm having trouble responding right now. Please try again later." }
      ]);
    }
  };

  // Function to send user input to the backend API and receive a response
  const handleUserMessage = async () => {
    if (!userInput.trim()) return; // Prevent empty messages

    // Add the user message to the chat history, typed as Message
    setMessages((prevMessages) => [...prevMessages, { sender: 'user', text: userInput }]);

    try {
      // Send user input to the backend and get the response
      const response = await axios.post<{ response: string }>('/api/generate-response', { input: userInput });

      // Append Sorren's response to the chat history
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'sorren', text: response.data.response }
      ]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: 'sorren', text: "I'm having trouble responding right now. Please try again later." }
      ]);
    }

    // Clear the user input field
    setUserInput('');
  };

  return (
    <div>
      <h1>Chat with Sorren</h1>

      {/* Render premade prompt buttons */}
      <div>
        {prompts.map((item, index) => (
          <button key={index} onClick={() => sendPrompt(item.prompt)} style={{ margin: '5px' }}>
            {item.label}
          </button>
        ))}
      </div>

      {/* Display chat messages */}
      <div>
        {messages.map((msg, index) => (
          <p key={index} className={msg.sender === 'user' ? 'user-message' : 'bot-message'}>
            {msg.sender === 'user' ? 'You: ' : 'Sorren: '}
            {msg.text}
          </p>
        ))}
      </div>

      {/* Input field for user to type a message */}
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleUserMessage()}
      />
      <button onClick={handleUserMessage}>Send</button>
    </div>
  );
}

export default SorrenChatbot;
