const interviewQuestions = {
  "Software Developer": {
    Easy: [
      {
        question: "What is a variable and why is it used?",
        category: "Programming Basics",
        keywords: ["programming", "javascript", "python", "java"],
      },
      {
        question: "What is a function?",
        category: "Programming Basics",
        keywords: ["programming", "javascript", "python", "java"],
      },
      {
        question: "What is a loop and where would you use one?",
        category: "Programming Basics",
        keywords: ["programming", "javascript", "python", "java"],
      },
      {
        question: "What is an API and why is it used?",
        category: "Web Development",
        keywords: ["api", "backend", "node", "express"],
      },
      {
        question: "What is Git used for?",
        category: "Tools",
        keywords: ["git", "github", "version control"],
      },
      {
        question: "What is a database?",
        category: "Database",
        keywords: ["database", "sql", "mongodb"],
      },
      {
        question: "What is SQL?",
        category: "Database",
        keywords: ["sql", "database"],
      },
      {
        question: "What is object-oriented programming?",
        category: "OOP",
        keywords: ["oop", "java", "cpp", "c++", "python"],
      },
      {
        question: "What is a class?",
        category: "OOP",
        keywords: ["oop", "java", "cpp", "c++", "python"],
      },
      {
        question: "What is inheritance?",
        category: "OOP",
        keywords: ["oop", "java", "cpp", "c++", "python"],
      },
      {
        question: "What is JSON?",
        category: "Web Development",
        keywords: ["json", "api", "javascript", "backend"],
      },
      {
        question: "What is debugging?",
        category: "Programming",
        keywords: ["debugging", "programming"],
      },
      {
        question: "What is the difference between an array and an object?",
        category: "Programming Basics",
        keywords: ["javascript", "programming"],
      },
      {
        question: "What is the difference between frontend and backend?",
        category: "Web Development",
        keywords: ["frontend", "backend", "react", "node"],
      },
      {
        question: "What is an HTTP request?",
        category: "Web Development",
        keywords: ["http", "api", "backend", "web"],
      },
    ],

    Medium: [
      {
        question: "Explain the difference between stack and heap memory.",
        category: "Programming",
        keywords: ["memory", "programming", "java", "cpp"],
      },
      {
        question: "What is the time complexity of binary search?",
        category: "DSA",
        keywords: ["dsa", "algorithms", "data structures"],
      },
      {
        question: "Explain the difference between an array and a linked list.",
        category: "DSA",
        keywords: ["dsa", "data structures"],
      },
      {
        question: "What is a hash table and how does it work?",
        category: "Data Structures",
        keywords: ["hashmap", "hashtable", "dsa"],
      },
      {
        question: "Explain recursion with a practical example.",
        category: "Algorithms",
        keywords: ["recursion", "algorithms", "dsa"],
      },
      {
        question: "What is the difference between process and thread?",
        category: "Operating Systems",
        keywords: ["operating systems", "os", "threads"],
      },
      {
        question: "What is normalization in databases?",
        category: "Database",
        keywords: ["database", "sql"],
      },
      {
        question: "Explain primary key and foreign key.",
        category: "Database",
        keywords: ["database", "sql", "mongodb"],
      },
      {
        question: "What is REST API and what are its common HTTP methods?",
        category: "Backend",
        keywords: ["rest", "api", "http", "backend", "node"],
      },
      {
        question: "Explain authentication and authorization.",
        category: "Security",
        keywords: ["authentication", "authorization", "jwt", "security"],
      },
      {
        question: "What is asynchronous programming?",
        category: "Programming",
        keywords: ["async", "javascript", "node", "programming"],
      },
      {
        question: "Explain promises and async/await in JavaScript.",
        category: "JavaScript",
        keywords: ["javascript", "async", "promise", "node"],
      },
      {
        question: "What is the difference between SQL and NoSQL databases?",
        category: "Database",
        keywords: ["sql", "nosql", "mongodb", "database"],
      },
      {
        question: "What are the main principles of object-oriented programming?",
        category: "OOP",
        keywords: ["oop", "java", "python", "cpp"],
      },
      {
        question: "How would you debug a program that suddenly becomes very slow?",
        category: "Problem Solving",
        keywords: ["debugging", "performance", "programming"],
      },
    ],

    Hard: [
      {
        question: "Design a scalable backend architecture for a high-traffic application.",
        category: "System Design",
        keywords: ["backend", "node", "system design", "scalability"],
      },
      {
        question: "How would you optimize a database query that is taking several seconds?",
        category: "Database",
        keywords: ["database", "sql", "mongodb", "optimization"],
      },
      {
        question: "Explain caching strategies for a distributed application.",
        category: "System Design",
        keywords: ["caching", "redis", "system design"],
      },
      {
        question: "What is horizontal scaling and when would you use it?",
        category: "System Design",
        keywords: ["scalability", "cloud", "system design"],
      },
      {
        question: "Explain database indexing and its trade-offs.",
        category: "Database",
        keywords: ["database", "sql", "mongodb", "indexing"],
      },
      {
        question: "How would you design a rate limiter for an API?",
        category: "System Design",
        keywords: ["api", "backend", "node", "system design"],
      },
      {
        question: "Explain race conditions and how you would prevent them.",
        category: "Concurrency",
        keywords: ["concurrency", "threads", "programming"],
      },
      {
        question: "How would you handle failures in a distributed system?",
        category: "Distributed Systems",
        keywords: ["distributed systems", "system design"],
      },
      {
        question: "Explain eventual consistency and where it is useful.",
        category: "Distributed Systems",
        keywords: ["database", "distributed systems"],
      },
      {
        question: "How would you improve the performance of a large web application?",
        category: "Performance",
        keywords: ["performance", "react", "frontend", "backend"],
      },
      {
        question: "Explain microservices and their major trade-offs.",
        category: "Architecture",
        keywords: ["microservices", "backend", "architecture"],
      },
      {
        question: "How would you design an authentication system for a large application?",
        category: "Security",
        keywords: ["authentication", "jwt", "security", "backend"],
      },
      {
        question: "Explain load balancing and different load-balancing strategies.",
        category: "System Design",
        keywords: ["load balancing", "cloud", "system design"],
      },
      {
        question: "How would you investigate a production memory leak?",
        category: "Debugging",
        keywords: ["debugging", "memory", "node", "performance"],
      },
      {
        question: "How would you design a fault-tolerant application?",
        category: "Architecture",
        keywords: ["architecture", "system design", "distributed systems"],
      },
    ],
  },


  "Frontend Developer": {
    Easy: [
      {
        question: "What is HTML?",
        category: "HTML",
        keywords: ["html", "frontend"],
      },
      {
        question: "What is CSS?",
        category: "CSS",
        keywords: ["css", "frontend"],
      },
      {
        question: "What is JavaScript?",
        category: "JavaScript",
        keywords: ["javascript", "js"],
      },
      {
        question: "What is the DOM?",
        category: "JavaScript",
        keywords: ["javascript", "dom", "frontend"],
      },
      {
        question: "What is responsive web design?",
        category: "CSS",
        keywords: ["css", "responsive", "frontend"],
      },
      {
        question: "What is a semantic HTML element?",
        category: "HTML",
        keywords: ["html", "frontend"],
      },
      {
        question: "What is a CSS selector?",
        category: "CSS",
        keywords: ["css"],
      },
      {
        question: "What is Flexbox?",
        category: "CSS",
        keywords: ["css", "flexbox"],
      },
      {
        question: "What is CSS Grid?",
        category: "CSS",
        keywords: ["css", "grid"],
      },
      {
        question: "What is React?",
        category: "React",
        keywords: ["react", "javascript"],
      },
      {
        question: "What is JSX?",
        category: "React",
        keywords: ["react", "jsx", "javascript"],
      },
      {
        question: "What is a React component?",
        category: "React",
        keywords: ["react", "javascript"],
      },
      {
        question: "What is localStorage?",
        category: "Web APIs",
        keywords: ["javascript", "localstorage", "frontend"],
      },
      {
        question: "What is an event in JavaScript?",
        category: "JavaScript",
        keywords: ["javascript", "events"],
      },
      {
        question: "What is the difference between id and class in HTML?",
        category: "HTML",
        keywords: ["html", "css"],
      },
    ],

    Medium: [
      {
        question: "Explain the difference between state and props in React.",
        category: "React",
        keywords: ["react", "state", "props"],
      },
      {
        question: "What is the virtual DOM?",
        category: "React",
        keywords: ["react", "virtual dom"],
      },
      {
        question: "Explain React useState and useEffect.",
        category: "React",
        keywords: ["react", "hooks", "javascript"],
      },
      {
        question: "What is event delegation in JavaScript?",
        category: "JavaScript",
        keywords: ["javascript", "events"],
      },
      {
        question: "Explain closures in JavaScript.",
        category: "JavaScript",
        keywords: ["javascript", "closures"],
      },
      {
        question: "What is debouncing and where would you use it?",
        category: "JavaScript",
        keywords: ["javascript", "debouncing"],
      },
      {
        question: "What is throttling?",
        category: "JavaScript",
        keywords: ["javascript", "throttling"],
      },
      {
        question: "How would you improve the performance of a React application?",
        category: "Performance",
        keywords: ["react", "performance", "javascript"],
      },
      {
        question: "What is lazy loading in React?",
        category: "React",
        keywords: ["react", "lazy loading"],
      },
      {
        question: "What is code splitting?",
        category: "Performance",
        keywords: ["javascript", "react", "performance"],
      },
      {
        question: "Explain controlled and uncontrolled components.",
        category: "React",
        keywords: ["react", "forms"],
      },
      {
        question: "How would you handle API errors in a frontend application?",
        category: "Frontend Architecture",
        keywords: ["react", "api", "frontend"],
      },
      {
        question: "What is CORS?",
        category: "Web",
        keywords: ["cors", "api", "frontend"],
      },
      {
        question: "How would you make a web application accessible?",
        category: "Accessibility",
        keywords: ["html", "accessibility", "frontend"],
      },
      {
        question: "How does browser caching work?",
        category: "Web Performance",
        keywords: ["browser", "caching", "frontend"],
      },
    ],

    Hard: [
      {
        question: "How would you architect a large-scale React application?",
        category: "Architecture",
        keywords: ["react", "architecture", "frontend"],
      },
      {
        question: "How would you optimize a React application with thousands of components?",
        category: "Performance",
        keywords: ["react", "performance"],
      },
      {
        question: "Explain React rendering and reconciliation.",
        category: "React",
        keywords: ["react", "reconciliation"],
      },
      {
        question: "How would you design a reusable component system?",
        category: "Architecture",
        keywords: ["react", "components", "frontend"],
      },
      {
        question: "How would you implement frontend authentication securely?",
        category: "Security",
        keywords: ["react", "authentication", "security"],
      },
      {
        question: "How would you optimize a large JavaScript bundle?",
        category: "Performance",
        keywords: ["javascript", "performance", "frontend"],
      },
      {
        question: "How would you debug unnecessary React re-renders?",
        category: "Debugging",
        keywords: ["react", "debugging", "performance"],
      },
      {
        question: "How would you design offline support for a web application?",
        category: "PWA",
        keywords: ["frontend", "pwa", "javascript"],
      },
      {
        question: "How would you implement real-time updates in React?",
        category: "Real-time Systems",
        keywords: ["react", "websocket", "frontend"],
      },
      {
        question: "How would you handle state management in a large React application?",
        category: "State Management",
        keywords: ["react", "redux", "state"],
      },
      {
        question: "Explain browser rendering from HTML to pixels.",
        category: "Browser",
        keywords: ["html", "css", "javascript", "browser"],
      },
      {
        question: "How would you prevent XSS attacks in a frontend application?",
        category: "Security",
        keywords: ["javascript", "security", "xss"],
      },
      {
        question: "How would you optimize Core Web Vitals?",
        category: "Performance",
        keywords: ["frontend", "performance", "web"],
      },
      {
        question: "How would you design a highly responsive dashboard with large datasets?",
        category: "Frontend Architecture",
        keywords: ["react", "frontend", "performance"],
      },
      {
        question: "How would you design a frontend application for millions of users?",
        category: "System Design",
        keywords: ["frontend", "react", "architecture"],
      },
    ],
  },


  "Backend Developer": {
    Easy: [
      {
        question: "What is a backend?",
        category: "Backend Basics",
        keywords: ["backend", "server"],
      },
      {
        question: "What is an API?",
        category: "API",
        keywords: ["api", "backend"],
      },
      {
        question: "What is HTTP?",
        category: "Web",
        keywords: ["http", "api", "backend"],
      },
      {
        question: "What is a server?",
        category: "Backend Basics",
        keywords: ["server", "backend"],
      },
      {
        question: "What is Node.js?",
        category: "Node.js",
        keywords: ["node", "nodejs", "javascript"],
      },
      {
        question: "What is Express.js?",
        category: "Node.js",
        keywords: ["express", "node", "nodejs"],
      },
      {
        question: "What is MongoDB?",
        category: "Database",
        keywords: ["mongodb", "database", "nosql"],
      },
      {
        question: "What is SQL?",
        category: "Database",
        keywords: ["sql", "database"],
      },
      {
        question: "What is middleware?",
        category: "Backend",
        keywords: ["middleware", "express", "node"],
      },
      {
        question: "What is CRUD?",
        category: "Backend",
        keywords: ["crud", "api", "backend"],
      },
      {
        question: "What is JSON?",
        category: "API",
        keywords: ["json", "api"],
      },
      {
        question: "What is an HTTP status code?",
        category: "HTTP",
        keywords: ["http", "api"],
      },
      {
        question: "What is authentication?",
        category: "Security",
        keywords: ["authentication", "jwt", "security"],
      },
      {
        question: "What is a database query?",
        category: "Database",
        keywords: ["database", "sql", "mongodb"],
      },
      {
        question: "What is an environment variable?",
        category: "Deployment",
        keywords: ["deployment", "node", "backend"],
      },
    ],

    Medium: [
      {
        question: "Explain REST API design principles.",
        category: "API",
        keywords: ["rest", "api", "backend"],
      },
      {
        question: "What is middleware in Express.js?",
        category: "Node.js",
        keywords: ["express", "node", "middleware"],
      },
      {
        question: "Explain JWT authentication.",
        category: "Security",
        keywords: ["jwt", "authentication", "node"],
      },
      {
        question: "What is database indexing?",
        category: "Database",
        keywords: ["database", "sql", "mongodb"],
      },
      {
        question: "Explain SQL joins.",
        category: "SQL",
        keywords: ["sql", "database"],
      },
      {
        question: "What is database normalization?",
        category: "Database",
        keywords: ["sql", "database"],
      },
      {
        question: "How does Node.js handle asynchronous operations?",
        category: "Node.js",
        keywords: ["node", "nodejs", "javascript", "async"],
      },
      {
        question: "What is connection pooling?",
        category: "Database",
        keywords: ["database", "backend"],
      },
      {
        question: "How would you handle API errors consistently?",
        category: "API",
        keywords: ["api", "backend", "express"],
      },
      {
        question: "What is rate limiting?",
        category: "Security",
        keywords: ["api", "security", "backend"],
      },
      {
        question: "Explain transactions in databases.",
        category: "Database",
        keywords: ["database", "sql"],
      },
      {
        question: "What is caching and why is it useful?",
        category: "Performance",
        keywords: ["caching", "redis", "backend"],
      },
      {
        question: "How would you secure an Express.js API?",
        category: "Security",
        keywords: ["express", "node", "security"],
      },
      {
        question: "What is the difference between SQL and NoSQL?",
        category: "Database",
        keywords: ["sql", "nosql", "mongodb"],
      },
      {
        question: "How would you debug a slow backend API?",
        category: "Performance",
        keywords: ["backend", "debugging", "api"],
      },
    ],

    Hard: [
      {
        question: "Design a scalable backend for a high-traffic application.",
        category: "System Design",
        keywords: ["backend", "system design", "scalability"],
      },
      {
        question: "How would you design a distributed caching system?",
        category: "System Design",
        keywords: ["backend", "redis", "caching"],
      },
      {
        question: "How would you handle millions of API requests?",
        category: "Scalability",
        keywords: ["backend", "api", "scalability"],
      },
      {
        question: "Explain horizontal and vertical scaling.",
        category: "Scalability",
        keywords: ["backend", "cloud", "scalability"],
      },
      {
        question: "How would you design a distributed rate limiter?",
        category: "System Design",
        keywords: ["api", "backend", "rate limiting"],
      },
      {
        question: "How would you prevent duplicate payment processing?",
        category: "Distributed Systems",
        keywords: ["backend", "database", "distributed systems"],
      },
      {
        question: "Explain database sharding.",
        category: "Database",
        keywords: ["database", "mongodb", "sql"],
      },
      {
        question: "How would you design a fault-tolerant API?",
        category: "System Design",
        keywords: ["api", "backend", "architecture"],
      },
      {
        question: "How would you investigate a memory leak in Node.js?",
        category: "Debugging",
        keywords: ["node", "nodejs", "debugging"],
      },
      {
        question: "Explain message queues and their use cases.",
        category: "Distributed Systems",
        keywords: ["backend", "message queue", "redis"],
      },
      {
        question: "How would you design authentication for millions of users?",
        category: "Security",
        keywords: ["authentication", "jwt", "security"],
      },
      {
        question: "Explain eventual consistency.",
        category: "Distributed Systems",
        keywords: ["database", "distributed systems"],
      },
      {
        question: "How would you optimize a slow database query?",
        category: "Database",
        keywords: ["database", "sql", "mongodb", "performance"],
      },
      {
        question: "How would you design a reliable background job system?",
        category: "Backend Architecture",
        keywords: ["backend", "queue", "architecture"],
      },
      {
        question: "How would you design logging and monitoring for production APIs?",
        category: "DevOps",
        keywords: ["backend", "devops", "monitoring"],
      },
    ],
  },


  "AI/ML Engineer": {
    Easy: [
      {
        question: "What is artificial intelligence?",
        category: "AI Basics",
        keywords: ["ai", "artificial intelligence"],
      },
      {
        question: "What is machine learning?",
        category: "ML Basics",
        keywords: ["machine learning", "ml", "python"],
      },
      {
        question: "What is supervised learning?",
        category: "Machine Learning",
        keywords: ["machine learning", "supervised learning"],
      },
      {
        question: "What is unsupervised learning?",
        category: "Machine Learning",
        keywords: ["machine learning", "unsupervised learning"],
      },
      {
        question: "What is a dataset?",
        category: "ML Basics",
        keywords: ["machine learning", "data"],
      },
      {
        question: "What is a feature?",
        category: "Machine Learning",
        keywords: ["machine learning", "feature engineering"],
      },
      {
        question: "What is a label?",
        category: "Machine Learning",
        keywords: ["machine learning", "classification"],
      },
      {
        question: "What is model training?",
        category: "Machine Learning",
        keywords: ["machine learning", "training"],
      },
      {
        question: "What is overfitting?",
        category: "Machine Learning",
        keywords: ["machine learning", "overfitting"],
      },
      {
        question: "What is underfitting?",
        category: "Machine Learning",
        keywords: ["machine learning", "underfitting"],
      },
      {
        question: "What is Python commonly used for in AI?",
        category: "Python",
        keywords: ["python", "ai", "machine learning"],
      },
      {
        question: "What is a neural network?",
        category: "Deep Learning",
        keywords: ["neural network", "deep learning"],
      },
      {
        question: "What is classification?",
        category: "Machine Learning",
        keywords: ["classification", "machine learning"],
      },
      {
        question: "What is regression?",
        category: "Machine Learning",
        keywords: ["regression", "machine learning"],
      },
      {
        question: "What is model accuracy?",
        category: "Evaluation",
        keywords: ["machine learning", "accuracy", "evaluation"],
      },
    ],

    Medium: [
      {
        question: "Explain the difference between supervised and unsupervised learning.",
        category: "Machine Learning",
        keywords: ["machine learning", "supervised", "unsupervised"],
      },
      {
        question: "What is the bias-variance trade-off?",
        category: "Machine Learning",
        keywords: ["machine learning", "bias variance"],
      },
      {
        question: "Explain precision, recall, and F1-score.",
        category: "Evaluation",
        keywords: ["machine learning", "evaluation", "classification"],
      },
      {
        question: "What is cross-validation?",
        category: "Model Evaluation",
        keywords: ["machine learning", "cross validation"],
      },
      {
        question: "How does gradient descent work?",
        category: "Optimization",
        keywords: ["machine learning", "gradient descent"],
      },
      {
        question: "What is feature engineering?",
        category: "Machine Learning",
        keywords: ["machine learning", "features", "data"],
      },
      {
        question: "Explain regularization and why it is used.",
        category: "Machine Learning",
        keywords: ["machine learning", "regularization"],
      },
      {
        question: "What is the difference between classification and regression?",
        category: "Machine Learning",
        keywords: ["classification", "regression", "machine learning"],
      },
      {
        question: "How would you handle missing data?",
        category: "Data Processing",
        keywords: ["data", "machine learning", "python"],
      },
      {
        question: "How would you detect overfitting?",
        category: "Model Evaluation",
        keywords: ["machine learning", "overfitting"],
      },
      {
        question: "What is ensemble learning?",
        category: "Machine Learning",
        keywords: ["machine learning", "ensemble"],
      },
      {
        question: "Explain decision trees.",
        category: "Machine Learning",
        keywords: ["machine learning", "decision tree"],
      },
      {
        question: "What is dimensionality reduction?",
        category: "Machine Learning",
        keywords: ["machine learning", "data"],
      },
      {
        question: "What is the difference between CNN and RNN?",
        category: "Deep Learning",
        keywords: ["deep learning", "cnn", "rnn"],
      },
      {
        question: "How would you evaluate an ML model for an imbalanced dataset?",
        category: "Evaluation",
        keywords: ["machine learning", "evaluation", "classification"],
      },
    ],

    Hard: [
      {
        question: "Design an end-to-end machine learning system for production.",
        category: "ML System Design",
        keywords: ["machine learning", "mlops", "python"],
      },
      {
        question: "How would you monitor a machine learning model in production?",
        category: "MLOps",
        keywords: ["machine learning", "mlops", "deployment"],
      },
      {
        question: "Explain data drift and concept drift.",
        category: "MLOps",
        keywords: ["machine learning", "mlops", "data"],
      },
      {
        question: "How would you reduce inference latency for an ML model?",
        category: "ML Optimization",
        keywords: ["machine learning", "optimization"],
      },
      {
        question: "How would you handle model versioning in production?",
        category: "MLOps",
        keywords: ["machine learning", "mlops"],
      },
      {
        question: "Explain transfer learning and when you would use it.",
        category: "Deep Learning",
        keywords: ["deep learning", "transfer learning"],
      },
      {
        question: "How would you design a recommendation system?",
        category: "ML System Design",
        keywords: ["machine learning", "recommendation"],
      },
      {
        question: "How would you handle highly imbalanced training data?",
        category: "Machine Learning",
        keywords: ["machine learning", "data", "classification"],
      },
      {
        question: "Explain attention mechanisms and transformers.",
        category: "Deep Learning",
        keywords: ["transformers", "attention", "deep learning", "nlp"],
      },
      {
        question: "How would you evaluate an NLP model?",
        category: "NLP",
        keywords: ["nlp", "machine learning", "transformers"],
      },
      {
        question: "How would you detect and reduce bias in an ML system?",
        category: "Responsible AI",
        keywords: ["ai", "machine learning", "responsible ai"],
      },
      {
        question: "How would you deploy a large ML model efficiently?",
        category: "MLOps",
        keywords: ["machine learning", "deployment", "mlops"],
      },
      {
        question: "Explain hyperparameter optimization strategies.",
        category: "Optimization",
        keywords: ["machine learning", "optimization"],
      },
      {
        question: "How would you design a real-time fraud detection ML system?",
        category: "ML System Design",
        keywords: ["machine learning", "fraud detection"],
      },
      {
        question: "How would you debug a machine learning model whose production performance has degraded?",
        category: "MLOps",
        keywords: ["machine learning", "mlops", "debugging"],
      },
    ],
  },
};

module.exports = interviewQuestions;