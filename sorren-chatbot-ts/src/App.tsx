import React, { useState, useEffect } from 'react';
import Sentiment from 'sentiment';
import axios from 'axios';

const sentiment = new Sentiment();

// Define types for message and corpus entry
interface Message {
  sender: 'user' | 'sorren';
  text: string;
}

interface CorpusEntry {
  keywords: string[];
  responses: string[];
}

function SorrenChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [corpus, setCorpus] = useState<CorpusEntry[]>([]);

  useEffect(() => {
    const fetchCorpus = async () => {
      try {
        const response = await axios.get<CorpusEntry[]>('http://localhost:5000/api/corpus');
        setCorpus(response.data);
      } catch (error) {
        console.error("Error fetching corpus data", error);
      }
    };

    fetchCorpus();
  }, []);

  const detectTone = (input: string): 'positive' | 'negative' | 'neutral' => {
    const result = sentiment.analyze(input);
    return result.score > 0 ? 'positive' : result.score < 0 ? 'negative' : 'neutral';
  };

  const getResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    const foundKeyword = corpus.find((entry) =>
      entry.keywords.some((keyword) => lowerInput.includes(keyword))
    );
    const responseArray = foundKeyword ? foundKeyword.responses : corpus.find((entry) => entry.keywords.includes("default"))?.responses;
    return responseArray ? responseArray[Math.floor(Math.random() * responseArray.length)] : "I'm here to chat!";
  };
  const handleUserMessage = async () => {
    const tone = detectTone(userInput);
    const response = getResponse(userInput);
    if (response) {
      // If a response is found, respond as usual
      setMessages([...messages, { sender: 'user', text: userInput }, { sender: 'sorren', text: `${response} (I sense a ${tone} tone)` }]);
    } else {
      // If no response found, generate a fallback response and learn from the user input
      const fallbackResponse = "I'm still learning! I'll remember this for next time.";
      setMessages([...messages, { sender: 'user', text: userInput }, { sender: 'sorren', text: fallbackResponse }]);

      // Send the new learning data to the backend
      try {
        await axios.post('http://localhost:5000/api/learn', {
          keywords: [userInput.toLowerCase()], // use the entire input as keywords for simplicity
          response: fallbackResponse
        });
        console.log("New learning data saved.");
      } catch (error) {
        console.error("Error saving learning data:", error);
      }
    }

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
      />
      <button onClick={handleUserMessage}>Send</button>
    </div>
  );
}

export default SorrenChatbot;
