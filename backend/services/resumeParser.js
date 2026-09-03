const parseResumeText = (text) => {
  const resume = {
    personalInfo: {
      name: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: ""
    },

    summary: "",

    education: [],

    experience: [],

    skills: [],

    projects: [],

    certifications: []
  };

  if (!text || typeof text !== "string") {
    return resume;
  }

  const cleanText = text
    .replace(/\r/g, "")
    .replace(/[ \t]+/g, " ")
    .trim();

  // -------------------------
  // Name
  // -------------------------

  const nameMatch = cleanText.match(
    /Name:\s*(.+)/i
  );

  if (nameMatch) {
    resume.personalInfo.name =
      nameMatch[1].trim();
  }

  // -------------------------
  // Phone
  // -------------------------

  const phoneMatch = cleanText.match(
    /Phone:\s*([+\d\s()-]{8,})/i
  );

  if (phoneMatch) {
    resume.personalInfo.phone =
      phoneMatch[1].trim();
  }

  // -------------------------
  // Email
  // -------------------------

  const emailMatch = cleanText.match(
    /Email:\s*([^\s]+)/i
  );

  if (emailMatch) {
    resume.personalInfo.email =
      emailMatch[1].trim();
  }

  // -------------------------
  // City
  // -------------------------

  const cityMatch = cleanText.match(
    /City:\s*(.+)/i
  );

  if (cityMatch) {
    resume.personalInfo.location =
      cityMatch[1].trim();
  }

  // -------------------------
  // LinkedIn
  // -------------------------

  const linkedinMatch = cleanText.match(
    /Linkedin:\s*(.+)/i
  );

  if (linkedinMatch) {
    resume.personalInfo.linkedin =
      linkedinMatch[1].trim();
  }

  // -------------------------
  // GitHub
  // -------------------------

  const githubMatch = cleanText.match(
    /Github:\s*(.+)/i
  );

  if (githubMatch) {
    resume.personalInfo.github =
      githubMatch[1].trim();
  }

  // -------------------------
  // Career Objective
  // -------------------------

  const objectiveMatch = cleanText.match(
    /Career Objective\s*([\s\S]*?)(?=\nEducation|\nCurrent Technical Knowledge|$)/i
  );

  if (objectiveMatch) {
    resume.summary =
      objectiveMatch[1].trim();
  }

  // -------------------------
  // Education
  // -------------------------

  const degreeMatch = cleanText.match(
    /(Bachelor of Technology\s*\(B\.Tech\))/i
  );

  const branchMatch = cleanText.match(
    /Branch:\s*(.+)/i
  );

  const collegeMatch = cleanText.match(
    /College:\s*(.+)/i
  );

  const durationMatch = cleanText.match(
    /Duration[-:]\s*(.+)/i
  );

  const yearMatch = cleanText.match(
    /Current Year[-:]\s*(.+)/i
  );

  if (
    degreeMatch ||
    branchMatch ||
    collegeMatch
  ) {
    resume.education.push({
      degree: degreeMatch
        ? degreeMatch[1].trim()
        : "",

      institution: collegeMatch
        ? collegeMatch[1].trim()
        : "",

      startYear: durationMatch
        ? durationMatch[1]
            .split("-")[0]
            .trim()
        : "",

      endYear: durationMatch
        ? durationMatch[1]
            .split("-")[1]
            ?.trim() || ""
        : "",

      grade: yearMatch
        ? yearMatch[1].trim()
        : ""
    });
  }

  // -------------------------
  // Programming Skills
  // -------------------------

  const programmingSkills = [
    "C",
    "Python",
    "Java",
    "JavaScript",
    "C++",
    "C#"
  ];

  const embeddedSkills = [
    "Arduino",
    "ESP32",
    "GPIO",
    "Sensors",
    "Embedded Systems",
    "IoT"
  ];

  const softwareSkills = [
    "Arduino IDE",
    "VS Code",
    "Git",
    "GitHub"
  ];

  const detectedSkills = [];

  const skillGroups = [
    ...programmingSkills,
    ...embeddedSkills,
    ...softwareSkills
  ];

  skillGroups.forEach((skill) => {
    const regex = new RegExp(
      `\\b${skill.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\b`,
      "i"
    );

    if (regex.test(cleanText)) {
      detectedSkills.push(skill);
    }
  });

  resume.skills = [
    ...new Set(detectedSkills)
  ];

  return resume;
};

module.exports = {
  parseResumeText
};