const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
app.use(cors());
const OpenAI = require('openai');


app.use(cors()); // Enable CORS for frontend communication
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




app.post('/api/learn', express.json(), (req, res) => {
  const { keywords, response } = req.body;

  if (!keywords || !response) {
    return res.status(400).json({ error: 'Keywords and response are required' });
  }

  const newEntry = {
    keywords,
    responses: [response]
  };

  corpus.push(newEntry);

  // Update the local JSON file to save learning data
  try {
    fs.writeFileSync(corpusPath, JSON.stringify(corpus, null, 2));
    console.log("Corpus successfully updated in corpus.json");
    res.status(201).json(newEntry);
  } catch (error) {
    console.error("Error writing to corpus.json:", error);
    res.status(500).json({ error: 'Failed to update corpus file' });
  }
});

// Endpoint to handle keyword extraction
app.post('/api/extract-keywords', async (req, res) => {
  const { input } = req.body;

  try {
    const prompt = `Extract keywords from the following text: "${input}". Return only keywords as a comma-separated list.`;
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 60,
      temperature: 0.3,
    });

    const content = response.choices?.[0]?.message?.content?.trim();
    const keywords = content ? content.split(',').map(keyword => keyword.trim()) : [];

    res.json({ keywords });
  } catch (error) {
    console.error("Error extracting keywords:", error);
    res.status(500).json({ error: "Failed to extract keywords" });
  }
});



const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
