import React, { useState } from 'react';
import Sentiment from 'sentiment';

interface Message {
  sender: 'user' | 'sorren';
  text: string;
}

interface CorpusEntry {
  keywords: string[];
  responses: string[];
}

const corpus: CorpusEntry[] =[
  {
    "keywords": ["hello", "hi", "greetings", "howdy"],
    "responses": [
      "Hey! What’s on your mind today?",
      "Hello! Got any questions or ideas to chat about?",
      "Hi there! Ready to dive into anything specific?"
    ]
  },
  {
    "keywords": ["coding", "debugging", "project", "technical"],
    "responses": [
      "Debugging can be a bit like detective work. Sometimes it’s all about patience and persistence.",
      "Honestly, coding is a mix of art and science. I always try to focus on clean, readable code—it saves a ton of headaches later.",
      "I’m all about incremental progress on projects. Small steps really do add up, especially when tackling complex problems.",
      "Sometimes, I’ll take a break when I’m stuck and come back with a fresh perspective. It’s surprising how often that helps."
    ]
  },
  {
    "keywords": ["virtual pet", "pet app", "virtual pet game", "tone detection", "sentiment analysis"],
    "responses": [
      "The Virtual Pet Web Application lets users interact with a pet by feeding, cleaning, and training it. It even detects your tone using sentiment analysis, creating a responsive experience.",
      "In this project, I used sentiment analysis to make the pet react to user input. It’s built with React, JavaScript, Express, and SQL, and it's hosted on AWS RDS.",
      "This virtual pet app is all about making a fun, interactive experience where users can care for their pet. The pet’s responses are based on the tone you use, thanks to sentiment analysis."
    ]
  },
  {
    "keywords": ["map app", "collaborative maps", "map listing", "Leaflet", "points"],
    "responses": [
      "The Map Listing Web Application allows users to collaboratively create maps with multiple points of interest. It's great for organizing location-based info.",
      "For this project, I used Node.js, jQuery, Leaflet, and PostgreSQL to create a smooth, interactive mapping experience. Users can add and view points on a map in real-time.",
      "This app makes it easy to collaboratively build and share maps. Each point is stored in a PostgreSQL database, and the Leaflet API brings it to life visually."
    ]
  },
  {
    "keywords": ["sleep chatbot", "sleep wellness", "chatbot", "sleep assistant"],
    "responses": [
      "The Sleep Wellness Chatbot is designed to assist users with sleep-related guidance through a chat interface.",
      "Using Llama-2-13B-Chat, LangChain, and ChromaDB, this chatbot is trained to offer therapeutic advice for better sleep habits.",
      "This project is aimed at promoting better sleep. It uses advanced AI models and a conversational interface to support users with sleep tips."
    ]
  },
  {
    "keywords": ["facemask detection", "mask detection", "YOLO", "COVID-19", "mask app"],
    "responses": [
      "The Facemask Detection App was created during COVID-19 to detect if someone is wearing a mask using their phone’s camera.",
      "Built with Java, Android Studio, and TensorFlow, this app leverages YOLOv2 for real-time mask detection.",
      "This project’s goal was to help promote health safety by quickly identifying if someone is wearing a non-medical mask."
    ]
  },
  {
    "keywords": ["student webpage creator", "profile generator", "dynamic profile", "single-page app", "SFU"],
    "responses": [
      "The SFU Student Webpage Creator helps generate student profile webpages with features like saving, downloading, and text editing.",
      "This app boosted productivity by automating student profile creation. It was built with HTML, CSS, JavaScript, and jQuery.",
      "For this project, I created a single-page application that assists in creating dynamic student profiles efficiently."
    ]
  },
  {
    "keywords": ["travel app", "travel prototype", "Figma prototype", "user testing", "UX research"],
    "responses": [
      "The Travel App Figma Prototype was designed to address user pain points in the travel experience. We conducted user testing, interviews, and usability tests to understand and address these needs.",
      "In this project, we created user stories, ran A/B testing, and developed a Figma prototype, drawing insights from both primary research and competitive analysis of similar apps.",
      "Our goal with the Travel App Prototype was to solve real user issues. Through feedback from users and mentors, we fine-tuned the prototype to ensure it was both accessible and intuitive."
    ]
  },
  {
    "keywords": ["bakery website", "website redesign", "user experience", "UX"],
    "responses": [
      "The Bakery Website Redesign improved user navigation, making it easy for customers to filter and purchase items. This project focused on a smooth, streamlined user experience.",
      "For the redesign, I focused on both accessibility and visual appeal, using HTML, CSS, and JavaScript to enhance the site’s usability.",
      "This project aimed to create a hassle-free browsing experience, allowing users to easily find and order their favorite baked goods with improved UI."
    ]
  },
  {
    "keywords": ["smart drive test", "driving platform", "learning platform", "driving course website"],
    "responses": [
      "The Smart Drive Test project is a learning platform that teaches driving techniques. I improved its functionality and designed it to support new drivers’ learning.",
      "Using Joomla! and web development tools, I enhanced Smart Drive Test’s UX and SEO, creating a more effective e-learning experience for drivers.",
      "This project was more than a website; it’s a resource for drivers. The redesign streamlined the purchasing of courses and improved overall user satisfaction."
    ]
  },
  {
    "keywords": ["City of Vancouver", "voting website", "wireframes", "city project"],
    "responses": [
      "For the City of Vancouver, I created wireframes for a voting website, focusing on information architecture and aligning with the city’s branding.",
      "This project was about clarity and usability. I mapped user stories for voters, ensuring the design was accessible and visually aligned with city branding.",
      "The City of Vancouver voting website mockup aimed to provide a user-centered experience for residents. Strategic design choices made it intuitive and aligned with city values."
    ]
  },
  {
    "keywords": ["profile helper", "student profile", "Adobe Experience Manager", "profile automation"],
    "responses": [
      "The Profile Helper automated student profile creation at SFU, making it faster to complete profiles and streamline the workflow.",
      "This tool improved productivity by enabling the team to complete more profiles each week. It integrated with Adobe Experience Manager for easy profile management.",
      "With Profile Helper, I aimed to simplify profile management, allowing for faster content updates and more flexibility for student changes."
    ]
  },
  {
    "keywords": ["UX research", "user stories", "usability testing", "information architecture"],
    "responses": [
      "UX research is central to my projects. From interviews to usability testing, I focus on gathering insights to improve the user experience.",
      "I prioritize user needs in my designs, whether it’s creating user stories, mapping journeys, or optimizing information architecture for usability.",
      "Each project begins with in-depth UX research to understand user behavior. Usability testing and storyboarding are key steps in my process to ensure clarity and engagement."
    ]
  },
  {
    "keywords": ["portfolio", "projects", "deployment", "showcase", "tech stack"],
    "responses": [
      "I’m constantly updating my portfolio to showcase my projects, including the Virtual Pet App and Map Listing App.",
      "Each project on my portfolio highlights different skills—from frontend and backend development to AI integration.",
      "Deployment is key for me. Seeing projects live, like the virtual pet app, brings the work full circle and allows others to interact with it."
    ]
  },
  {
    "keywords": ["name", "who are you", "what's your name", "your name"],
    "responses": [
      "You can call me Sorren.",
      "I’m Sorren Jao, but Sorren is fine!",
      "Just call me Sorren.",
      "My full name is Sorren Jao, but feel free to just say Sorren."
    ]
  },
  {
    "keywords": ["default"],
    "responses": [
      "I’d be happy to talk about any of my projects! Let me know which one you’re interested in.",
      "Feel free to ask about any project—whether it’s the tech stack, challenges, or what I learned from it.",
      "I’ve worked on a variety of projects, from virtual pets to collaborative maps and UX research. Which one would you like to know more about?"
    ]
  }
];


const sentiment = new Sentiment();

const SorrenChatbot: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userInput, setUserInput] = useState<string>('');

  const detectTone = (input: string): string => {
    const result = sentiment.analyze(input);
    return result.score > 0 ? 'positive' : result.score < 0 ? 'negative' : 'neutral';
  };

  const getResponse = (input: string): string => {
    const lowerInput = input.toLowerCase();
    const foundKeyword = corpus.find((entry) =>
      entry.keywords.some((keyword) => lowerInput.includes(keyword))
    );
    const responseArray = foundKeyword ? foundKeyword.responses : corpus.find((entry) => entry.keywords.includes("default"))!.responses;
    return responseArray[Math.floor(Math.random() * responseArray.length)];
  };

  const handleUserMessage = () => {
    const tone = detectTone(userInput);
    const response = `${getResponse(userInput)} (I sense a ${tone} tone)`;
    setMessages([...messages, { sender: 'user', text: userInput }, { sender: 'sorren', text: response }]);
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
