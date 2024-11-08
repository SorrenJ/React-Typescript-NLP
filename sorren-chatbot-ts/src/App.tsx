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

    // Extracting specific details from user input
    if (userInput.toLowerCase().includes("my name is")) {
      const name = userInput.split("my name is ")[1];
      if (name) {
        setMemory((prev) => ({ ...prev, name: name.trim() }));
        const response = `Nice to meet you, ${name}! I'll remember that.`;
        setMessages([...messages, { sender: 'user', text: userInput }, { sender: 'sorren', text: response }]);
        setUserInput('');
        return;
      }
    } else if (userInput.toLowerCase().includes("my favorite color is")) {
      const color = userInput.split("my favorite color is ")[1];
      if (color) {
        setMemory((prev) => ({ ...prev, favoriteColor: color.trim() }));
        const response = `Got it! Your favorite color is ${color}. I'll remember that.`;
        setMessages([...messages, { sender: 'user', text: userInput }, { sender: 'sorren', text: response }]);
        setUserInput('');
        return;
      }
    } else if (userInput.toLowerCase().includes("i live in")) {
      const location = userInput.split("i live in ")[1];
      if (location) {
        setMemory((prev) => ({ ...prev, location: location.trim() }));
        const response = `Thanks for letting me know! I'll remember that you live in ${location}.`;
        setMessages([...messages, { sender: 'user', text: userInput }, { sender: 'sorren', text: response }]);
        setUserInput('');
        return;
      }
    } else if (userInput.toLowerCase().includes("my hobby is")) {
      const hobby = userInput.split("my hobby is ")[1];
      if (hobby) {
        setMemory((prev) => ({ ...prev, hobby: hobby.trim() }));
        const response = `Awesome! I'll remember that your hobby is ${hobby}.`;
        setMessages([...messages, { sender: 'user', text: userInput }, { sender: 'sorren', text: response }]);
        setUserInput('');
        return;
      }
    }

    // Handle specific questions about stored memory
    if (userInput.toLowerCase().includes("what is my name")) {
      const response = memory.name ? `Your name is ${memory.name}.` : "I'm sorry, I don't know your name yet.";
      setMessages([...messages, { sender: 'user', text: userInput }, { sender: 'sorren', text: response }]);
      setUserInput('');
      return;
    } else if (userInput.toLowerCase().includes("what is my favorite color")) {
      const response = memory.favoriteColor ? `Your favorite color is ${memory.favoriteColor}.` : "I don't know your favorite color yet.";
      setMessages([...messages, { sender: 'user', text: userInput }, { sender: 'sorren', text: response }]);
      setUserInput('');
      return;
    } else if (userInput.toLowerCase().includes("where do i live")) {
      const response = memory.location ? `You live in ${memory.location}.` : "I'm not sure where you live yet.";
      setMessages([...messages, { sender: 'user', text: userInput }, { sender: 'sorren', text: response }]);
      setUserInput('');
      return;
    } else if (userInput.toLowerCase().includes("what is my hobby")) {
      const response = memory.hobby ? `Your hobby is ${memory.hobby}.` : "I don't know your hobby yet.";
      setMessages([...messages, { sender: 'user', text: userInput }, { sender: 'sorren', text: response }]);
      setUserInput('');
      return;
    }

    // Normal response handling
    const response = getResponse(userInput) || "I'm still learning! I'll remember this for next time.";
    const finalResponse = `${response} (I sense a ${tone} tone)`;

    setMessages([...messages, { sender: 'user', text: userInput }, { sender: 'sorren', text: finalResponse }]);
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
