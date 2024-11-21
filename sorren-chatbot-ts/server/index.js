// this index.js is for local db connections. so far the prompts are most accurate with this

const express = require('express');
const fs = require('fs');
const path = require('path');
const OpenAI = require('openai');
require('dotenv').config();
const cors = require('cors');
const app = express();

app.use(cors({
    origin: '*', // Allow all origins
    methods: ['GET', 'POST'], // Allow these HTTP methods
  }));
  
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

// Load corpus data from local JSON file
const corpusPath = path.join(__dirname, 'corpus.json');
let corpus = JSON.parse(fs.readFileSync(corpusPath, 'utf-8'));

// Sort corpus by priority (higher priorities first)
corpus = corpus.sort((a, b) => b.priority - a.priority);

// Function to find the best match based on priority
function findBestMatch(input) {
  for (let entry of corpus) {
    const lowerInput = input.toLowerCase();
    const matchedKeyword = entry.keywords.find(keyword => lowerInput.includes(keyword.toLowerCase()));
    if (matchedKeyword) {
      // If a match is found with high priority, return a random response from that entry
      return entry.responses[Math.floor(Math.random() * entry.responses.length)];
    }
  }
  return null;
}

// Endpoint to handle prioritized matching with OpenAI fallback
app.post('/api/generate-response', async (req, res) => {
  const { input } = req.body;

  // Check if input matches prioritized keywords in corpus
  let responseText = findBestMatch(input);

  // If no match is found, use OpenAI as a fallback
  if (!responseText) {
    const fallbackPrompt = `User asked: "${input}". Respond in a helpful and friendly manner as if you are Sorren.`;
    try {
      const openaiResponse = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: fallbackPrompt }],
        max_tokens: 100,
        temperature: 0.7
      });
      responseText = openaiResponse.choices[0].message.content.trim();
    } catch (error) {
      console.error("Error generating response with OpenAI:", error);
      return res.status(500).json({ error: "Failed to generate a response" });
    }
  }

  res.json({ response: responseText });
});


app.get(`/api/backend-endpoint`, (req, res) => {
    res.json({ message: 'Hello from the backend!' });
    console.log("backend endpoint sucessful")
  });
  

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT} with local json db`));