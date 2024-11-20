const express = require('express');
const { connectToDB } = require('./mongoSetup'); // Import the MongoDB setup
const OpenAI = require('openai');
require('dotenv').config();

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

const app = express();
app.use(express.json());

let corpus = [];

// Fetch the corpus from MongoDB
async function fetchCorpus() {
  try {
    const db = await connectToDB(); // Get the connected database
    const collection = db.collection("corpus"); // Replace with your collection name
    corpus = await collection.find().sort({ priority: -1 }).toArray();
    console.log("Corpus loaded from MongoDB!");
  } catch (error) {
    console.error("Error fetching corpus from MongoDB:", error.message);
    throw error;
  }
}

// Middleware to ensure the corpus is loaded
app.use(async (req, res, next) => {
  if (corpus.length === 0) {
    try {
      await fetchCorpus();
    } catch (error) {
      return res.status(500).json({ error: "Failed to load corpus from MongoDB" });
    }
  }
  next();
});

// Sort corpus by priority (higher priorities first)
corpus = corpus.sort((a, b) => b.priority - a.priority);

// Function to find the best match based on priority
function findBestMatch(input) {
  for (let entry of corpus) {
    const lowerInput = input.toLowerCase();
    const matchedKeyword = entry.keywords.find(keyword => lowerInput.includes(keyword.toLowerCase()));
    if (matchedKeyword) {
      return entry.responses[Math.floor(Math.random() * entry.responses.length)];
    }
  }
  return null;
}

// Endpoint to handle prioritized matching with OpenAI fallback
app.post('/api/generate-response', async (req, res) => {
  const { input } = req.body;
  let responseText = findBestMatch(input);

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
      console.error("Error generating response with OpenAI:", error.message);
      responseText = "Sorry, I couldn't process your request. Please try again later.";
    }
  }

  res.json({ response: responseText });
});

// Start the server
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
