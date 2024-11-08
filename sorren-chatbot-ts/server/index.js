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


// Endpoint to handle personalized responses
app.post('/api/generate-response', async (req, res) => {
  const { input } = req.body;

  // Step 1: Check if input matches keywords in corpus
  const matchedEntry = corpus.find(entry =>
    entry.keywords.some(keyword => input.toLowerCase().includes(keyword))
  );

  // Step 2: Generate a response based on matched entry or use OpenAI fallback
  let responseText;
  if (matchedEntry) {
    const prompt = `${matchedEntry.responses[Math.floor(Math.random() * matchedEntry.responses.length)]}.\nUser asked: ${input}. Please respond conversationally.`;

    // Generate a conversational response using OpenAI
    try {
      const openaiResponse = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
        max_tokens: 100,
        temperature: 0.7
      });
      responseText = openaiResponse.choices[0].message.content.trim();
    } catch (error) {
      console.error("Error generating response with OpenAI:", error);
      return res.status(500).json({ error: "Failed to generate a response" });
    }
  } else {
    // Use OpenAI for more general questions without matching corpus entry
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
      console.error("Error generating fallback response with OpenAI:", error);
      return res.status(500).json({ error: "Failed to generate a response" });
    }
  }

  res.json({ response: responseText });
});

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
