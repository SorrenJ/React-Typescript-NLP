import React, { useState, useEffect } from 'react';
import Sentiment from 'sentiment';
import axios from 'axios';
import { extractKeywords } from './openaiHelper';

const sentiment = new Sentiment();

interface Message {
  sender: 'user' | 'sorren';
  text: string;
}

interface CorpusEntry {
  keywords: string[];
  responses: string[];
}

interface Memory {
  [key: string]: string; // Dynamic memory to store various user details
}

// Utility function to remove punctuation
const removePunctuation = (text: string): string => {
  return text.replace(/[.,/#!$%^&*;:{}=\-_`~()?\s]/g, "").toLowerCase();
};

// Levenshtein distance function for typo handling
const levenshteinDistance = (a: string, b: string): number => {
  const matrix = Array.from({ length: a.length + 1 }, () =>
    Array(b.length + 1).fill(0)
  );

  for (let i = 0; i <= a.length; i++) matrix[i][0] = i;
  for (let j = 0; j <= b.length; j++) matrix[0][j] = j;

  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1, // deletion
        matrix[i][j - 1] + 1, // insertion
        matrix[i - 1][j - 1] + cost // substitution
      );
    }
  }

  return matrix[a.length][b.length];
};

// Check if two strings match within a given typo threshold
const fuzzyMatch = (input: string, keyword: string, threshold: number = 2): boolean => {
  return levenshteinDistance(input, keyword) <= threshold;
};

function SorrenChatbot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>('');
  const [corpus, setCorpus] = useState<CorpusEntry[]>([]);
  const [memory, setMemory] = useState<Memory>({});
  const [isLearning, setIsLearning] = useState(false);
  const [newKeywords, setNewKeywords] = useState<string[]>([]);

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

  const extractEntities = async (input: string) => {
    const keywords = await extractKeywords(input);
    const nouns = keywords.filter((word) => {
      return word.match(/^[a-z]+$/i); // Adjust to match your criteria
    });

    nouns.forEach((noun) => {
      if (!memory[noun]) {
        setMemory((prevMemory) => ({ ...prevMemory, [noun]: "" }));
      }
    });

    return nouns;
  };

  const getResponse = async (input: string): Promise<string | null> => {
    const lowerInput = removePunctuation(input); // Remove punctuation from input
  
    // Step 1: Attempt exact or fuzzy match with entire corpus entries
    const foundEntry = corpus.find((entry) =>
      entry.keywords.some((keyword) => fuzzyMatch(lowerInput, keyword))
    );
  
    if (foundEntry) {
      const responseArray = foundEntry.responses;
      console.log("Matched full input in corpus:", foundEntry); // Debugging statement
      return responseArray[Math.floor(Math.random() * responseArray.length)];
    }
  
    // Step 2: If no match, fallback to keyword-based response from corpus
    const keywords = await extractKeywords(lowerInput);
    console.log("Extracted keywords:", keywords); // Debugging statement
  
    const foundEntryByKeyword = corpus.find((entry) =>
      entry.keywords.some((keyword) =>
        keywords.some((extractedKeyword) => fuzzyMatch(extractedKeyword, keyword))
      )
    );
  
    if (foundEntryByKeyword) {
      const responseArray = foundEntryByKeyword.responses;
      console.log("Matched keyword in corpus:", foundEntryByKeyword); // Debugging statement
      return responseArray[Math.floor(Math.random() * responseArray.length)];
    }
  
    console.log("No matching corpus entry found for input or keywords:", input); // Debugging statement
    return null;
  };
  

  const handleUserMessage = async () => {
    const tone = detectTone(userInput);

    // Check if user input contains specific data to remember
    const nouns = await extractEntities(userInput);
    let hasStoredValue = false;

    nouns.forEach((noun) => {
      const lowerInput = userInput.toLowerCase();
      const valueMatch = lowerInput.match(new RegExp(`(?:is|are)\\s+(.+)$`, 'i'));

      if (valueMatch && !memory[noun]) {
        setMemory((prevMemory) => ({ ...prevMemory, [noun]: valueMatch[1] }));
        hasStoredValue = true;
      }
    });

    if (hasStoredValue) {
      setMessages([...messages, { sender: 'user', text: userInput }, { sender: 'sorren', text: "Got it! I'll remember that for next time." }]);
      setUserInput('');
      return;
    }

    // Check for response based on memory and input
    const response = await getResponse(userInput);

    if (response) {
      setMessages([...messages, { sender: 'user', text: userInput }, { sender: 'sorren', text: `${response} (I sense a ${tone} tone)` }]);
    } else if (!isLearning) {
      setIsLearning(true);
      const keywords = await extractKeywords(userInput);
      setNewKeywords(keywords);
      setMessages([...messages, { sender: 'user', text: userInput }, { sender: 'sorren', text: "I'm still learning! How should I respond to this?" }]);
    } else {
      const userDefinedResponse = userInput;
      setIsLearning(false);

      try {
        await axios.post('http://localhost:5000/api/learn', {
          keywords: newKeywords,
          response: userDefinedResponse,
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
