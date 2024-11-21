use("myCorpus"); 

const jsonData = [
{
    "priority": 10,
    "keywords": [
      "tell me about your past job experience", "what jobs have you done", "describe your job history", 
      "past job experience", "work experience", "professional experience", "what roles have you held", 
      "what jobs have you worked", "can you share your job history", "tell me about your work background", 
      "career history", "previous job roles", "describe your work experience", "what experience do you have", 
      "share your work history", "tell me about your professional experience", "describe your past roles", 
      "where have you worked", "can you tell me about your past positions", "any past experience", 
      "previous positions", "what companies have you worked for", "what industries have you worked in", 
      "any job experience", "describe your previous work", "what’s your job history", "past job roles", 
      "tell me your career path", "what roles have you worked in", "experience in tech", 
      "tell me about your previous jobs", "what was your last job", "tell me about your career", 
      "describe your professional background", "what’s your employment history", "where did you work before"
    ],
    "responses": [
      "I recently worked as a Web Developer at Cybersalt Consulting Ltd., where I developed multiple business websites, focusing on improving SEO, UI, and UX, as well as optimizing responsiveness and performance.",
      "One of my past roles was a Web Designer and Marketing Communications Specialist at Simon Fraser University, where I managed web content, designed web banners, and optimized graduate student profile performance.",
      "I have experience as a Research Assistant with SFU’s Career & Volunteer Services, where I researched alumni careers and managed their career website.",
      "My recent job experiences have been focused on web development and design, including work with JavaScript, React, HTML1, CSS, and backend technologies like PostgreSQL.",
      "In my role at Cybersalt Consulting Ltd., I collaborated through agile development processes, handled troubleshooting, and customized websites with a focus on enhancing user experience."
    ]
  },
  
  {
    "priority":8,
    "keywords": [
  "profession", "proffession", "proffesion", "ocupation", "occupation", "emplyment", "employment", "do u have a job", 
      "do you have job", "looking for work", "looking for wrk", "looking for a job", "what kind of work do you do", 
      "what do you do for a living", "wat do you do for a living", "what's your career path", "whats your career path", 
      "career path", "what's your profesion", "what's your profession", "are you employed", "are you employd", 
      "full time job", "full-time job", "part time job", "part-time job", "what industry do you work in", 
      "what industry do you work", "what industry r u in", "what field do you work in", "what field are you in", 
      "what is your field", "what's your field", "do you have a job in tech", "do you work in tech", 
      "web development", "web developmnt", "web dev", "web devlpmnt", "coding", "code", "do you code", 
      "do u code", "do you program", "programmer", "are you a programmer", "are u a programmer", 
      "ux", "u x", "design", "desgn", "programming", "progrming", "developer", "devloper", "dev", 
      "what are you skilled at", "what are ur skills", "what are you good at", "what's your skill set", 
      "skills", "job search", "job serch", "looking for job", "what are you looking for in a job", 
      "what job are you looking for", "job hunting", "are you job hunting", "do u have job", "do you have a job", 
      "what’s your job", "what do u do for work", "career goals", "are you in web dev", "are u in design", 
      "do u have a tech job", "do you work in design", "what line of work", "what line of work are u in", 
      "what’s your line of work", "field of work", "do you work in software", "software dev", "software development", 
      "do you work with software", "do you work in UX", "do you work in UI", "are you in UI", "do you work with frontend", 
      "do you work with backend", "do you work full-stack", "do you code full-stack", "are you a full stack developer", 
      "are you a web developer", "web dev", "are you a coder", "are you a designer", "do u do UX", "do u do UI"
    ],
    "responses": [
      "I'm currently seeking a job and hoping to work in Full-Stack Web Development.",
      "I'm open to both web development and user experience (UX) design roles.",
      "I’m on the lookout for exciting opportunities in web development.",
      "I’m skilled in web development and UX design, always open to new opportunities.",
      "I enjoy working on full-stack projects, from frontend to backend.",
      "Currently, I'm exploring job options that align with my skills in web development and UX."
    ]
  },
  {
    "priority": 10,
    "keywords": [
      "school", "tell me about your education", "tell me about ur education", "tell me abut your education", "what’s your educational background", 
      "wht’s your educational background", "whats ur educational background", "where did you study", "where did u study", 
      "education history", "educational history", "describe your education", "descibe your education", "academic background", 
      "academic backround", "what degrees do you have", "what degress do u have", "where did you go to school", 
      "where did u go to school", "where did you go to skool", "what did you study", "wat did u study", "what’s your degree", 
      "what’s ur degree", "do you have any degrees", "do u have any degrees", "where did you graduate from", "where did u graduate from", 
      "describe your academic background", "describe ur academic background", "tell me about your schooling", "college background", 
      "collage background", "what university did you attend", "what unversity did u attend", "what univrsity did you attend", 
      "tell me about your studies", "tell me about ur studies", "academic qualifications", "educational qualifications", 
      "education qualifications", "what's your academic history", "whats ur academic history", "did you study web development", 
      "did u study web development", "background in tech education", "tech eduction background", "what training have you received", 
      "do you have formal education in tech", "formal education", "frmol education", "school background", "skool background", 
      "what’s your university degree in", "wat’s ur university degree in", "what did you major in", "what did u major in", 
      "what was your college major", "what was ur collage major", "what’s your diploma in", "whats ur diploma in", "did you attend college", 
      "did u attend college", "where did you learn web development", "where did u learn web devlopment", "did you go to a coding bootcamp", 
      "did u go to a coding bootcamp", "what tech courses have you taken", "what tech corses have u taken", "what’s your highest degree", 
      "what is ur highest degree", "what did you study in college", "wat did u study in college", "did you study design", 
      "did u study design", "education in programming", "eduction in programming", "do you have a background in computer science", 
      "do u have a background in computer science", "background in design and technology", "did you study interactive arts", 
      "did u study interactive arts", "did you go to Lighthouse Labs", "did u go to Lighthouse Labs", "did you study at Simon Fraser University", 
      "did u study at SFU", "where did you get your web development skills", "where did u get your web development skills", 
      "tell me about your university experience", "tell me about ur university experience", "did you study computer science", 
      "did u study computer science", "education in UX design", "educational background in UX"
    ],
    "responses": [
     " I graduated with a Bachelor of Science degree from Simon Fraser University (SFU), specializing in Interactive Arts & Technology.",
      "I recently completed a Diploma in Full-Stack Web Development from Lighthouse Labs, where I focused on web technologies, collaborative projects, and agile methodologies.",
      "I hold a Bachelor of Science degree from Simon Fraser University, specializing in Interactive Arts & Technology. My studies covered web development, UX design, data structures, AI, and human-computer interaction.",
      "My education includes a diploma in Full-Stack Web Development from Lighthouse Labs, where I gained hands-on experience in React, Node.js, and agile project management.",
      "At Simon Fraser University, I pursued a Bachelor’s in Interactive Arts & Technology, a multidisciplinary program blending computer science, design, and user experience research.",
      "In addition to my Bachelor’s degree, I attended Lighthouse Labs, where I completed an intensive bootcamp in full-stack development, focusing on skills like React, PostgreSQL, and backend development.",
      "I was awarded prize funding for my studies at Lighthouse Labs, which allowed me to focus on web development projects and collaborate with industry professionals.",
      "During my time at SFU, I gained a strong foundation in both technical and design fields, working on projects related to Android development, Java programming, and interactive UX applications.",
      "In university, I was deeply involved in tech and design studies, covering topics like UX research, AI/ML applications, and programming in Unity and Java.",
      "I have a well-rounded education with a degree in Interactive Arts & Technology from SFU, complemented by a full-stack web development bootcamp from Lighthouse Labs.",
      "I studied at Simon Fraser University, where I developed expertise in human-computer interaction, data structures, and multimedia projects, all of which continue to inform my approach to web development."
    ]
  },
  
  {
    "priority": 1,
    "keywords": [
      "tell me about your family", "do you have siblings", "any brothers or sisters", "who is Noriko", 
      "tell me about Noriko", "family members", "do you have family", "who's in your family", 
      "any siblings", "your sibling", "do you have a sister", "tell me about your sister", 
      "what does Noriko like", "what does your sibling enjoy", "family details", "any family", 
      "do you come from a big family", "tell me about your family members", "your sister", 
      "tell me about your family background", "who’s your family", "siblings info", "anyone in your family", 
      "do you have a family", "describe your family", "what's your family like", "does your family have hobbies", 
      "what does Noriko do", "does Noriko like 3D animation", "is Noriko an animator", 
      "Noriko's interests", "what does your family enjoy", "do you have close family", 
      "does your sister do animation", "is Noriko into animation", "does Noriko work in 3D animation",
      "are you Asian", "what’s your cultural background", "are you part Chinese", "what’s your ethnicity", 
      "tell me about your heritage", "do you have a Japanese background", "are you Japanese", 
      "is your family Chinese", "what’s your ancestry", "are you Chinese", "what’s your ethnic background", 
      "where is your family from", "are you part Japanese"
    ],
    "responses": [
      "Yes, I have a sibling named Noriko who really enjoys 3D animation!",
      "Noriko, my sibling, is passionate about 3D animation and spends a lot of time creating amazing animated works.",
      "I’m part Chinese with some Japanese heritage as well. It’s a meaningful part of my identity.",
      "In my family, Noriko is the one who brings creative flair with her love for 3D animation.",
      "Yes, I’m Asian, part Chinese and a bit Japanese. My family background is something I’m proud of!",
      "My sibling Noriko has a strong interest in 3D animation and is quite talented at it!"
    ]
  },
  {
    "priority": 1,
    "keywords": [
      "favorite video games", "do you play games", "what video games do you like", "favorite games", 
      "what games do you play", "do you play video games", "what’s your favorite game", "what was your first game", 
      "first video game", "do you like video games", "what games are you playing", "what game are you playing", 
      "are you a gamer", "favorite video game", "do you play pokemon", "do you play mario", "favorite Nintendo games", 
      "what’s your favorite Nintendo game", "are you playing pokemon", "what game are you into now", 
      "current game", "what games do you enjoy", "are you playing any games", "what games do you love", 
      "do you like Super Smash Bros", "is Super Smash Bros your favorite", "do you play Mario Kart", 
      "do you like Fire Emblem", "do you play Clash Royale", "Clash Royale fan", "what’s your current game", 
      "gaming favorites", "favorite genres in games", "do you play strategy games", "are you playing any Nintendo games", 
      "do you play on Nintendo", "what was your first game console", "any retro games you like", "what games are you into", 
      "are you playing Pokemon Brilliant Diamond", "favorite old games", "nostalgic games", "do you like classic games", 
      "what’s your go-to game", "what’s your favorite game of all time", "are you a Nintendo fan", 
      "do you play RPG games", "favorite video game series", "do you like Lego Racers", "do you play Fire Emblem games", 
      "what game is your current favorite", "do you play competitive games", "multiplayer games you like", 
      "single-player or multiplayer games", "do you like game challenges", "game recommendations", 
      "what console do you play on", "are you into classic games", "do you play any mobile games", "best games you’ve played", 
      "games you’re currently enjoying", "current video game", "do you prefer Pokemon or Mario", "what’s your gaming style"
    ],
    "responses": [
      "Some of my favorite games include *Super Smash Bros.*, *Clash Royale*, *Fire Emblem*, and *Mario Kart*!",
      "I'm currently playing *Pokemon Brilliant Diamond*, enjoying the journey through the Sinnoh region.",
      "My first video game was *Lego Racers* – it was my introduction to gaming and holds a lot of nostalgia!",
      "I really enjoy games like *Super Smash Bros.*, *Mario Kart*, and *Fire Emblem*. They’re all-time favorites for me!",
      "Right now, I'm diving into *Pokemon Brilliant Diamond* and having a great time revisiting that world!"
    ]
  }
];

  // Clear the collection first (replace "myCorpusCollection" with your actual collection name)
db.myCorpusCollection2.deleteMany({}); // Removes all existing documents

// Insert the new data
db.myCorpusCollection2.insertMany(jsonData);

// Verify insertion by counting documents
print("Number of documents inserted:", db.myCorpusCollection2.countDocuments());

jsonData.forEach((doc, index) => {
  const docSize = Object.keys(doc).reduce((acc, key) => acc + JSON.stringify(doc[key]).length, 0);
  print(`Document ${index + 1} size: ${docSize} bytes`);
});


// Optional: View the inserted documents
db.myCorpusCollection2.find().pretty();

db.corpus.createIndex({ keywords: "text" });
