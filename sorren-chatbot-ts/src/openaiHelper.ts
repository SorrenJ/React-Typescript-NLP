import axios from 'axios';

export const extractKeywords = async (input: string): Promise<string[]> => {
  try {
    const response = await axios.post('http://localhost:5000/api/extract-keywords', { input });
    return response.data.keywords;
  } catch (error) {
    console.error("Error calling backend for keyword extraction:", error);
    return [input]; // Fallback
  }
};
