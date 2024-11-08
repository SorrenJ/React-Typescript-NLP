const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(cors());

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
    console.log("Invalid data received:", req.body); // Log the received data
    return res.status(400).json({ error: 'Keywords and response are required' });
  }

  const newEntry = {
    keywords,
    responses: [response]
  };

  corpus.push(newEntry);
  console.log("New entry added to corpus:", newEntry); // Log the new entry

  // Update the corpus.json file
  try {
    fs.writeFileSync(corpusPath, JSON.stringify(corpus, null, 2));
    console.log("Corpus successfully updated in corpus.json"); // Log success
    res.status(201).json(newEntry);
  } catch (error) {
    console.error("Error writing to corpus.json:", error); // Log any write errors
    res.status(500).json({ error: 'Failed to update corpus file' });
  }
});




const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
