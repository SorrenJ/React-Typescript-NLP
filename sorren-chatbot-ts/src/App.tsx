import React, { useState, useEffect } from 'react';
import Sentiment from 'sentiment';
import axios from 'axios';

const sentiment = new Sentiment();

interface Message {
  sender: 'user' | 'sorren';
  text: string;
}

interface CorpusEntry {
  keywords: string[];
  responses: string[];
}

// Memory structure to store various pieces of information
interface Memory {
  name?: string;
  favoriteColor?: string;
  location?: string;
  hobby?: string;
}

function SorrenChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [corpus, setCorpus] = useState<CorpusEntry[]>([]);
  const [memory, setMemory] = useState<Memory>({}); // Generalized memory object
  const [isLearning, setIsLearning] = useState(false); // Flag to track learning state
  const [newKeywords, setNewKeywords] = useState<string[]>([]); // Store unrecognized keywords

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

  const getResponse = (input: string): string | null => {
    const lowerInput = input.toLowerCase();
    const foundKeyword = corpus.find((entry) =>
      entry.keywords.some((keyword) => lowerInput.includes(keyword))
    );
    const responseArray = foundKeyword ? foundKeyword.responses : null;
    return responseArray ? responseArray[Math.floor(Math.random() * responseArray.length)] : null;
  };

  const handleUserMessage = async () => {
    const tone = detectTone(userInput);
    const response = getResponse(userInput);

    if (response) {
      // Existing response found
      setMessages([...messages, { sender: 'user', text: userInput }, { sender: 'sorren', text: `${response} (I sense a ${tone} tone)` }]);
    } else if (!isLearning) {
      // No existing response, enter learning mode and prompt user for feedback
      setIsLearning(true);
      setNewKeywords([userInput.toLowerCase()]); // Store the unrecognized input as new keywords
      setMessages([...messages, { sender: 'user', text: userInput }, { sender: 'sorren', text: "I'm still learning! How should I respond to this?" }]);
    } else {
      // Capture user-defined response for new keywords and save it
      const userDefinedResponse = userInput;
      setIsLearning(false); // Exit learning mode

      // Save the new keywords and user-defined response to the backend
      try {
        await axios.post('http://localhost:5000/api/learn', {
          keywords: newKeywords,
          response: userDefinedResponse
        });
        console.log("New learning data saved.");
        setMessages([...messages, { sender: 'user', text: userInput }, { sender: 'sorren', text: "Got it! I'll remember that for next time." }]);
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
