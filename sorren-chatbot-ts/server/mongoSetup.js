const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;

const client = new MongoClient(uri);

async function connectToDB() {
  try {
    console.log("Attempting to connect to MongoDB...");
    await client.connect();
    console.log("Connected to MongoDB!");
    return client.db("myCorpus"); // Replace "myCorpus" with your database name
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    throw error;
  }
}

// Export the function and client
module.exports = {
  connectToDB,
  client, // Optional: export client if needed elsewhere
};
