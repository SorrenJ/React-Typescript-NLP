const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
const OpenAI = require('openai');

app.use(express.json()); // For parsing JSON payloads

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Use environment variable for security
});

// Load corpus data from local JSON file
const corpusPath = path.join(__dirname, 'corpus.json');
let corpus = [];

// Read and load the corpus file on server start
try {
  corpus = JSON.parse(fs.readFileSync(corpusPath, 'utf-8'));
  console.log("Corpus loaded successfully");
} catch (error) {
  console.error("Error reading corpus file:", error);
}

// Endpoint to get corpus data
app.get('/api/corpus', (req, res) => {
  res.json(corpus);
});

// Endpoint to add a new entry (for testing and local updates)
app.post('/api/corpus', express.json(), (req, res) => {
  const newEntry = req.body;
  corpus.push(newEntry);

  // Update the local JSON file
  fs.writeFileSync(corpusPath, JSON.stringify(corpus, null, 2));
  res.status(201).json(newEntry);
});


// Endpoint to handle conversation with OpenAI's model and custom corpus
app.post('/api/generate-response', async (req, res) => {
  const { input } = req.body;

  // Search the corpus for matching keywords
  const findInCorpus = (input) => {
    const lowerInput = input.toLowerCase();
    const foundEntry = corpus.find(entry =>
      entry.keywords.some(keyword => lowerInput.includes(keyword))
    );
    return foundEntry ? foundEntry.responses[Math.floor(Math.random() * foundEntry.responses.length)] : null;
  };

  // First, check for a response in the custom corpus
  let corpusResponse = findInCorpus(input);
  if (corpusResponse) {
    return res.json({ response: corpusResponse });
  }

  // If no response is found in the corpus, use OpenAI to generate one
  try {
    const openaiPrompt = `Respond conversationally to the following input: "${input}". Incorporate related details and maintain a friendly tone.`;
    
    const openaiResponse = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: openaiPrompt }],
      max_tokens: 100,
      temperature: 0.7,
    });

    const content = openaiResponse.choices?.[0]?.message?.content?.trim();
    res.json({ response: content || "I'm here to chat! Feel free to ask me anything." });

  } catch (error) {
    console.error("Error generating response with OpenAI:", error);
    res.status(500).json({ error: "Failed to generate a response" });
  }
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
