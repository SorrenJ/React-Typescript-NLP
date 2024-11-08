import React, { useState } from 'react';
import axios from 'axios';

interface Message {
  sender: 'user' | 'sorren';
  text: string;
}

function SorrenChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>('');

  // Function to send user input to the backend API and receive a response
  const handleUserMessage = async () => {
    if (!userInput.trim()) return; // Prevent empty messages

    // Add the user message to the chat history, typed as Message
    const newMessages = [...messages, { sender: 'user', text: userInput } as Message];
    setMessages(newMessages);

    try {
      // Send user input to the backend and get the response
      const response = await axios.post<{ response: string }>('/api/generate-response', { input: userInput });

      // Append Sorren's response to the chat history
      setMessages([...newMessages, { sender: 'sorren', text: response.data.response } as Message]);
    } catch (error) {
      console.error("Error fetching response:", error);
      setMessages([
        ...newMessages,
        { sender: 'sorren', text: "I'm having trouble responding right now. Please try again later." } as Message
      ]);
    }

    // Clear the user input field
    setUserInput('');
  };

  return (
    <div>
      <h1>Chat with Sorren</h1>
      <div>
        {messages.map((msg, index) => (
          <p key={index} className={msg.sender === 'user' ? 'user-message' : 'bot-message'}>
            {msg.sender === 'user' ? 'You: ' : 'Sorren: '}
            {msg.text}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && handleUserMessage()}
        placeholder="Type a message..."
      />
      <button onClick={handleUserMessage}>Send</button>
    </div>
  );
}

export default SorrenChatbot;
