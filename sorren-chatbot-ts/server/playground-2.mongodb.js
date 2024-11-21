use("myCorpus"); // Replace with your database name

const jsonData = [
  {
    "priority":1,
    "keywords": ["hello", "hi", "greetings", "howdy"],
    "responses": [
      "Hey! What’s on your mind today?",
      "Hello! Got any questions or ideas to chat about?",
      "Hi there! Ready to dive into anything specific?",
      "Hello there! Feel free to start with anything you'd like to discuss."
    ]
  },
  {
    "priority": 1,
    "keywords": ["coding", "debugging", "project", "technical"],
    "responses": [
      "Debugging can be a bit like detective work. Sometimes it’s all about patience and persistence.",
      "Honestly, coding is a mix of art and science. I always try to focus on clean, readable code—it saves a ton of headaches later.",
      "I’m all about incremental progress on projects. Small steps really do add up, especially when tackling complex problems.",
      "Coding has its challenges, but it’s also rewarding! What’s your current focus?",
      "Whether it’s coding or debugging, each step teaches something new. How’s your project going?"
    ]
  },
  {
    "priority": 2,
    "keywords": ["virtual pet", "game", "tone detection", "tone", "detection", "sentiment analysis", "sentiment", "analysis", "project"],
    "responses": [
      "The Virtual Pet Web Application lets users interact with a pet by feeding, cleaning, and training it. It even detects your tone using sentiment analysis, creating a responsive experience.",
      "This project is all about creating a fun, interactive experience. Users can care for their virtual pets and see the effects in real-time.",
      "Sentiment analysis makes interactions with virtual pets feel more personal. It’s interesting to see how users respond to that feature!",
      "This app combines interaction and emotion, giving users a unique experience with their virtual pet.",
      "The sentiment analysis aspect adds a layer of connection to the virtual pet experience."
    ]
  },
  {
    "priority": 4,
    "keywords": ["map app",  "collaborative maps", "collaborative", "maps", "listing", "Leaflet", "points", "project"],
    "responses": [
      "The Map Listing Web Application allows users to collaboratively create maps with multiple points of interest. It's great for organizing location-based info.",
      "Maps are a great way to visually organize information, and this project takes it a step further with collaboration.",
      "Collaborative maps make it easier to share locations and points of interest with others.",
      "This app helps users add and view points on a map in real-time. A great tool for location-based information.",
      "Maps can be incredibly versatile in sharing information, and collaborating on them opens up a lot of possibilities."
    ]
  },
  {
    "priority": 4,
    "keywords": ["sleep chatbot", "sleep", "wellness", "chatbot", "sleep assistant", "assistant", "project"],
    "responses": [
      "The Sleep Wellness Chatbot is designed to assist users with sleep-related guidance through a chat interface.",
      "Good sleep is essential, and this chatbot provides some helpful guidance to promote wellness.",
      "Sleep wellness is the focus here, using conversational tips to improve habits.",
      "Helping users with sleep through a chatbot is a unique approach to wellness.",
      "This project uses advanced AI models and offers advice on healthy sleep habits."
    ]
  },
  {
    "priority": 4,
    "keywords": ["facemask detection", "facemask", "mask", "detection", "YOLO", "COVID-19", "mask app", "app", "project"],
    "responses": [
      "The Facemask Detection App was created during COVID-19 to detect if someone is wearing a mask using their phone’s camera.",
      "Real-time mask detection was a timely solution during COVID-19, and this app made it accessible.",
      "Mask detection technology like this can be really helpful for public health and safety.",
      "Using YOLOv2 for detecting facemasks was a creative way to contribute to health efforts.",
      "A helpful tool during COVID-19, this app leveraged mobile technology for public safety."
    ]
  },
  {
    "priority": 4,
    "keywords": ["student webpage creator", "student", "webpage", "creator", "profile generator", "profile", "generator", "dynamic profile", "dynamic", "single-page app", "single-page", "SFU", "project"],
    "responses": [
      "The SFU Student Webpage Creator helps generate student profile webpages with features like saving, downloading, and text editing.",
      "A profile generator like this can save a lot of time for students creating web pages.",
      "Creating a dynamic student profile page is streamlined with this tool.",
      "This single-page app helps students build and manage profiles easily.",
      "Automating profile creation is a big time-saver for students and institutions."
    ]
  },
  {
    "priority": 4,
    "keywords": ["travel app", "travel", "prototype", "Figma prototype", "Figma", "user testing", "testing", "UX research", "UX", "research", "project"],
    "responses": [
      "The Travel App Figma Prototype was designed to address user pain points in the travel experience.",
      "User testing and feedback are essential for making travel apps that actually help users.",
      "With travel in mind, this prototype incorporates real user feedback to improve the design.",
      "A well-researched travel app can make planning and managing trips easier for everyone.",
      "Through UX research and feedback, this prototype evolved to meet user needs more effectively."
    ]
  },
  {
    "priority": 4,
    "keywords": ["bakery website", "bakery",  "redesign", "user experience", "experience", "UX", "project"],
    "responses": [
      "The Bakery Website Redesign improved user navigation, making it easy for customers to find and purchase items.",
      "Designing for a bakery website means focusing on an enjoyable browsing experience.",
      "An accessible and visually appealing redesign can make a big difference for users.",
      "Streamlined navigation is key for a great user experience, especially for e-commerce sites.",
      "A smooth browsing experience is essential in making online shopping easy and enjoyable."
    ]
  },
  {
    "priority": 4,
    "keywords": ["smart drive test", "smart", "drive", "test", "driving platform", "driving", "platform", "learning platform", "learning", "course", "website", "project"],
    "responses": [
      "The Smart Drive Test project is a learning platform that teaches driving techniques and supports new drivers.",
      "Helping people learn to drive safely is the core purpose of this platform.",
      "Driving courses like these make it easier for learners to build confidence on the road.",
      "A solid foundation in driving can make a big difference, and this platform helps with that.",
      "This project focuses on providing useful resources for those learning to drive."
    ]
  },
  {
    "priority": 4,
    "keywords": ["City of Vancouver", "City", "Vancouver", "voting website", "voting", "website", "wireframes", "city project", "project"],
    "responses": [
      "For the City of Vancouver, I worked on a voting website project focusing on usability and accessibility.",
      "Ensuring the voting website is easy to navigate was a top priority.",
      "City projects like these are about making information accessible to everyone.",
      "Creating user-centered experiences for city residents is essential in public projects.",
      "Design choices in civic projects need to align with accessibility standards, which was key in this project."
    ]
  },
  {
    "priority": 4,
    "keywords": ["profile helper", "profile", "helper", "student profile", "student", "Adobe Experience Manager", "Adobe", "Experience", "Manager", "automation", "project"],
    "responses": [
      "The Profile Helper automated the creation of student profiles, streamlining the process.",
      "Automating profile creation saves time and ensures consistency across profiles.",
      "This project allowed for quicker and more efficient profile management.",
      "Profile automation tools like this help teams stay organized and manage content easily.",
      "Creating a tool to automate profiles can be a big productivity booster."
    ]
  },
  {
    "priority": 1,
    "keywords": ["UX research", "research", "user stories", "stories", "usability testing", "usability", "testing", "information architecture", "information", "architecture", "project"],
    "responses": [
      "UX research is at the heart of my projects, focusing on improving the user experience.",
      "Understanding user behavior through research is essential in design.",
      "From usability testing to storyboarding, UX research helps shape effective designs.",
      "Each project begins with in-depth research to make sure we’re meeting user needs.",
      "Usability testing and story mapping are key parts of creating intuitive user interfaces."
    ]
  },
  {
    "priority": 1,
    "keywords": ["portfolio", "projects", "deployment", "showcase", "tech stack", "tech", "stack"],
    "responses": [
      "I’m constantly updating my portfolio to showcase projects and skills.",
      "A well-rounded portfolio highlights various skills and projects.",
      "Deployment is a crucial step in showcasing work, making it accessible to users.",
      "Highlighting different tech stacks in a portfolio shows versatility.",
      "Sharing live projects gives others a chance to interact with the work directly."
    ]
  },
  {
    "priority": 9,
    "keywords": ["what's your name", "whats your name", "what is your name", "whats ur name", "whats ur nam", "wat is ur name", 
    "name", "whats ur nme", "who are you", "who r u", "who are u", "what name do you go by", "what’s the name you go by", 
    "what should I call you", "who am I speaking with", "who am i chatting with", "who am I talkin to", 
    "who’s talking", "who is this", "can you introduce yourself", "introduce yourself", "tell me your name", 
    "wat’s ur name", "wat’s your name", "how should I call you", "how do I address you", "do you have a nickname", 
    "do u have a nickname", "nickname", "preferred name", "what’s your preferred name", "do you have a preferred name", 
    "can I call you something else", "do you go by anything else", "can I call u Sorren", "what’s ur full name", 
    "what name do u go by", "call you", "call u", "how do u like to be called", "what name should I use", 
    "should I use your full name", "do u have a name", "your name", "ur name", "tell me ur name", 
    "what do I call u", "do u have any other name", "alias", "pseudonym", "what r u called", "how r u called", 
    "what should I refer to you as", "do u have a screen name", "what’s your display name", 
    "how should I address you", "how may I address you", "how should I refer to you", "what are you called", 
    "is Sorren your name", "is Sorren what you go by"],
   
    "responses": [
      "You can call me Sorren.",
      "I’m Sorren Jao, but Sorren is fine!",
      "Just call me Sorren.",
      "My full name is Sorren Jao, but feel free to just say Sorren."
    ]
  },
  {
    "keywords": ["what's up", "how are you","how's it going", "what's going on"],
    "responses": [
      "Just here, ready to help! How’s everything with you?",
      "I’m doing great! Always up for a good coding question or chat. What’s on your mind?",
      "All good here! Working on projects and happy to help with any you have!",
      "I’m here, ready to dive into anything you want to discuss. What’s going on with you?"
    ]
  },
  {
    "priority": 4,
    "keywords": [
      "what's your favorite thing to do", "whats ur fav thing to do", "fav thing to do", "what do u like doing", 
      "what do you enjoy", "what’s your passion", "passion", "what’s your hobby", "hobbies", "hobby", "do you have any hobbies", 
      "what are your interests", "interest", "what do you do for fun", "fun activities", "what do u do in free time", 
      "free time", "leisure activities", "what’s your dream", "do you have a dream", "goals", "goal", "what are your goals", 
      "what’s your goal", "what drives you", "drives", "what motivates you", "motivations", "motivation", "what’s your motivation", 
      "what are you working towards", "ambitions", "ambition", "dreams", "what do you aspire to", "aspire", 
      "what’s your ideal project", "ideal project", "favorite project type", "favorite kind of project", 
      "what are you passionate about", "what do u care about", "things you enjoy", "what keeps you inspired", 
      "inspirations", "what inspires you", "what do you love", "what makes you excited", "exciting projects", 
      "what excites you", "favorite activities", "dreams", "do u have any big dreams", "biggest goal", "what do u live for", 
      "whats ur why", "what’s your why", "any future plans", "future plans", "whats ur dream job", "dream job", 
      "favorite thing to work on", "favorite type of project", "what do you like to build", "do you have any goals", 
      "biggest motivation", "career goals", "personal goals", "do u have any passions", "whats ur biggest passion", 
      "what’s something you love", "do you like creating", "do you like building things", "favorite hobby"
    ],
    "responses": [
      "I love working on creative coding projects, especially ones that mix art with tech!",
      "Experimenting with new tech stacks is always exciting. It feels like solving a puzzle every time.",
      "Creating interactive experiences is always enjoyable.",
      "Building interfaces that users enjoy is super rewarding.",
      "Coding projects that involve creativity make it even more fun!",
      "I’m passionate about blending art and technology in unique ways.",
      "Dream projects for me involve interactive elements where users can explore and discover.",
      "I’m motivated by the challenge of creating something both functional and beautiful.",
      "I enjoy taking on projects that push my skills and allow me to learn new things.",
      "I love coding, but what drives me is the idea of making something others find engaging and useful!"
    ]
  }
  ,
  {
    "priority": 1,
    "keywords": ["help with coding", "help", "coding", "code", "assist", "programming", "help me code"],
    "responses": [
      "Absolutely! What are you working on? I’d love to see if I can help.",
      "Of course! Just let me know what you need help with, and we can break it down together.",
      "Sure thing! Coding challenges are always welcome here. What do you need help with?",
      "I’d be happy to assist! Sometimes, a fresh perspective can make all the difference. What’s the issue?",
      "Let’s tackle this together. Walk me through what’s going on with your code, and I’ll do my best to help!"
    ]
  },
  {
    "priority": 4,
    "keywords": ["tell me about yourself", "tell me abt urself", "tell me about urself", "tell me abot youself", "tell me abt u", 
      "about yourself", "abt urself", "tell me who u r", "who are you", "who r u", "who're you", "who is this", 
      "who is talking", "who am I talking to", "yourself", "urself", "your self", "ur self", "ur background", 
      "your background", "background", "backround", "backround info", "tell me ur background", "what’s ur background", 
      "what’s your backstory", "what do you do", "wat do you do", "what r u up to", "what do you work on", 
      "do you have a background in coding", "what’s ur bio", "what’s your story", "tell me about u", 
      "who am I chatting with", "what do you specialize in", "what's your specialty", "what’s ur focus", 
      "do u have a portfolio", "what’s ur expertise", "wat’s your area of expertise", "what are you known for", 
      "who are you in 3 words", "give me your background", "introduce yourself", "self intro", "who's there", 
      "where do you come from", "do u code", "tell me about your career", "describe urself", "who is Sorren", 
      "ur personal info", "bio", "personal intro", "your intro", "ur profile", "your experience", "tell me about your experience",
      "tell me about yourself", "tell me abot yourself", "tell me about urself", "tel me about yourself", 
      "about yourself", "about urself", "abt yourself", "yourself", "your self", "who are you", "who r u", 
      "who're you", "who are u", "who ar you", "your background", "ur background", "your backround", "background", 
      "back ground", "backgroud", "what do you do", "what do u do", "wht do you do", "what do you", 
      "what's your name", "whats your name", "what is your name", "what is ur name", "what's ur name", 
      "who is this", "who's this", "who am I speaking to", "who am I talking to", "introduce yourself", 
      "introduce urself", "introduce yourself please", "can you introduce yourself", "can u introduce urself", 
      "tell me about you", "tell me about u", "tell me bout yourself", "tell me something about yourself", 
      "tell me something about urself", "tell me smth about yourself", "give me your background", "give me ur background", 
      "tell me more about you", "tell me more about urself", "describe yourself", "describe urself", "who am I chatting with", 
      "who am I chating with", "who's there", "whos there", "what are you", "what r u", "what is your role", 
      "what's your role", "tell me who you are", "tell me who u r", "tell me abt urself", "could you tell me about yourself", 
      "could u tell me about urself", "can you tell me about yourself", "can u tell me about urself", 
      "any info about you", "any info about u", "information about yourself", "info about urself", 
      "who are you really", "who exactly are you", "who am I interacting with", "what’s your background story", 
      "do you have a story", "share your story", "what’s your journey", "share your journey", "tell me your journey", 
      "what’s your experience", "describe your experience", "explain your background", "elaborate on your background", 
      "what’s your background in tech", "do you work in tech", "what do you work in", "career background", 
      "what makes you unique", "what’s unique about you", "do you have any specialties", "specialties", 
      "what do you focus on", "what are your skills", "who are you really", "do you have a portfolio link", 
      "where are you from", "what's your area of expertise", "can you share about yourself", "what's your personal story", 
      "give me an overview of yourself", "self-description", "describe who you are", "who exactly is Sorren", 
      "give a personal introduction", "who do I speak with", "can you tell me a bit about yourself",
      "tell me more about you", "what should I know about you", "tell me about your professional background", 
      "what’s your work history", "what’s your background in programming", "do you have a background in tech", 
      "can you summarize your background", "share your professional background", "how did you get into tech", 
      "how did you start coding", "what’s your story in tech", "what got you into coding", "what is your skillset", 
      "describe your skillset", "can you give me your bio", "share your bio", "professional bio", 
      "what’s your work experience", "where did you study", "what have you studied", "what’s your academic background", 
      "what kind of projects have you worked on", "project experience", "professional journey", "career journey", 
      "what’s your career story", "what are your specialties", "what are your strengths", "describe your skill strengths", 
      "what are you good at professionally", "what’s your specialty", "professional expertise", "tell me about your skills", 
      "what’s your educational background", "what’s your tech expertise", "describe your expertise", 
      "tell me your skills in tech", "what areas are you skilled in", "areas of expertise", "what’s your core expertise", 
      "what skills do you bring", "skills background", "describe your career", "career overview", "what’s your profile", 
      "profile description", "personal profile", "can you share your story", "can you tell your journey", 
      "summarize your background", "summarize your skills", "summarize your experience", "what’s your experience in tech", 
      "what experience do you have in coding", "experience in coding", "tech skills", "what projects have you done", 
      "describe your work history", "what’s your job history", "what roles have you held", "what jobs have you done", 
      "what’s your professional background", "can you describe your career path", "career path overview", 
      "how long have you been coding", "coding journey", "why do you code", "what do you enjoy about tech", 
      "describe your past jobs", "past job experiences", "what’s your journey in tech", "how did you start in tech", 
      "how did you begin in coding", "where do you have experience", "experience summary", "work summary", 
      "tell me your work experience", "personal career story", "background info", "describe your career background", 
      "career info", "your work expertise", "describe your strengths", "your coding skills", "what’s your development experience", 
      "background in development", "background in design", "tech work history", "career strengths", "what’s your field", 
      "describe your field", "your skill profile", "describe your abilities", "ability summary", "skills overview", 
      "background in web development", "background in design work", "history in tech", "tell me your career highlights", 
      "what are your career highlights", "highlights in your career", "tech background", "design background", 
      "coding background", "coding skillset", "where did you study coding", "coding education", "what are you known for in tech", 
      "describe your achievements", "career achievements", "your skills and experience", "summary of your skills", 
      "summary of your background", "background summary", "introduce your skills", "your abilities", 
      "what’s your experience level", "career history", "work experience summary", "what roles have you had", 
      "tell me your story", "personal journey in tech"],
    "responses": [
      "I’m Sorren Jao, a web developer with a background in interactive design and virtual pet games.",
      "I just finished a bootcamp and completed a degree in interactive arts and technology, focusing on web dev.",
      "I’ve worked on various projects, from virtual pets to sentiment-based chatbots and collaborative maps.",
      "My experience spans frontend and backend dev, with hands-on work in React, Rails, and SQL.",
      "I'm passionate about creating interactive experiences, especially ones that blend code with creativity."
    ]
  },
  {
    "priority": 1,
    "keywords": ["how do you relax",  "relax", "free time", "free", "time", "when not coding",  "hobbies"],
    "responses": [
      "When I’m not coding, I enjoy exploring new tech trends or checking out other developers’ projects for inspiration.",
      "In my free time, I like experimenting with new tools or frameworks. It keeps things interesting!",
      "Outside of work, I enjoy reading up on tech and design advancements.",
      "A bit of gaming is fun too—it’s relaxing and sometimes inspires new ideas.",
      "I like reading about UX design practices to keep a fresh perspective on user interactions."
    ]
  },
  
  
  
];

// Clear the collection first (replace "myCorpusCollection" with your actual collection name)
db.myCorpusCollection.deleteMany({}); // Removes all existing documents

// Insert the new data
db.myCorpusCollection.insertMany(jsonData);

// Verify insertion by counting documents
print("Number of documents inserted:", db.myCorpusCollection.countDocuments());

jsonData.forEach((doc, index) => {
  const docSize = Object.keys(doc).reduce((acc, key) => acc + JSON.stringify(doc[key]).length, 0);
  print(`Document ${index + 1} size: ${docSize} bytes`);
});



// Optional: View the inserted documents
db.myCorpusCollection.find().pretty();

db.corpus.createIndex({ keywords: "text" });
