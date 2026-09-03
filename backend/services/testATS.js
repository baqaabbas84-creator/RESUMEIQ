const {
  analyzeResume
} = require("./atsAnalyzer");

const sampleResume = {
  personalInfo: {
    name: "Baqa Abbas",
    email: "baqaabbas84@gmail.com",
    phone: "6387787467",
    location: "Kanpur",
    linkedin: "www.linkedin.com/in/baqa-abbas-77a8ba385",
    github: "https://github.com/baqaabbas84-creator"
  },

  summary:
    "Second-year engineering student, currently learning core technical skills and exploring interests in IoT, Embedded Systems, and software development. Motivated to build projects and gain experience.",

  education: [
    {
      degree: "Bachelor of Technology (B.Tech)",
      institution:
        "Pranveer Singh Institute of Technology, Kanpur",
      startYear: "2024",
      endYear: "2028"
    }
  ],

  experience: [],

  skills: [
    "C",
    "Python",
    "Java",
    "Arduino",
    "ESP32",
    "GPIO",
    "Sensors",
    "IoT",
    "Arduino IDE",
    "VS Code",
    "Git",
    "GitHub"
  ],

  projects: [],

  certifications: []
};

const result = analyzeResume(sampleResume);

console.log(
  JSON.stringify(result, null, 2)
);