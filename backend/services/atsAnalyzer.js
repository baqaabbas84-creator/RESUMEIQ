const analyzeResume = (resume) => {
  let score = 0;

  const strengths = [];
  const weaknesses = [];
  const suggestions = [];

  const personalInfo = resume.personalInfo || {};
  const summary = resume.summary || "";
  const skills = resume.skills || [];
  const education = resume.education || [];
  const experience = resume.experience || [];
  const projects = resume.projects || [];
  const certifications = resume.certifications || [];

  // -------------------------
  // Contact Information - 15
  // -------------------------

  let contactScore = 0;

  if (personalInfo.name) {
    contactScore += 3;
  }

  if (personalInfo.email) {
    contactScore += 3;
  }

  if (personalInfo.phone) {
    contactScore += 3;
  }

  if (personalInfo.location) {
    contactScore += 2;
  }

  if (personalInfo.linkedin) {
    contactScore += 2;
  }

  if (personalInfo.github) {
    contactScore += 2;
  }

  score += contactScore;

  if (contactScore >= 12) {
    strengths.push(
      "Strong contact information with multiple professional links."
    );
  } else {
    weaknesses.push(
      "Some important contact information is missing."
    );

    suggestions.push(
      "Add professional links such as LinkedIn and GitHub."
    );
  }

  // -------------------------
  // Summary - 10
  // -------------------------

  if (summary.trim().length >= 100) {
    score += 10;

    strengths.push(
      "Resume contains a detailed career summary."
    );
  } else if (summary.trim().length >= 50) {
    score += 7;

    strengths.push(
      "Resume contains a career summary."
    );

    suggestions.push(
      "Expand your career summary with relevant skills and career goals."
    );
  } else if (summary.trim().length > 0) {
    score += 4;

    weaknesses.push(
      "Career summary is too short."
    );

    suggestions.push(
      "Write a stronger 2-4 line professional summary."
    );
  } else {
    weaknesses.push(
      "Career summary is missing."
    );

    suggestions.push(
      "Add a professional career summary."
    );
  }

  // -------------------------
  // Education - 15
  // -------------------------

  if (education.length > 0) {
    score += 15;

    strengths.push(
      "Education information is present."
    );
  } else {
    weaknesses.push(
      "Education section is missing."
    );

    suggestions.push(
      "Add your latest degree, institution and graduation details."
    );
  }

  // -------------------------
  // Skills - 20
  // -------------------------

  if (skills.length >= 8) {
    score += 20;

    strengths.push(
      "Good number of technical skills detected."
    );
  } else if (skills.length >= 5) {
    score += 15;

    strengths.push(
      "Resume contains several technical skills."
    );

    suggestions.push(
      "Add more job-relevant technical skills."
    );
  } else if (skills.length >= 3) {
    score += 10;

    weaknesses.push(
      "Technical skill coverage is limited."
    );

    suggestions.push(
      "Add more relevant technical and domain-specific skills."
    );
  } else if (skills.length > 0) {
    score += 5;

    weaknesses.push(
      "Very few skills detected."
    );

    suggestions.push(
      "Expand the skills section with relevant technical skills."
    );
  } else {
    weaknesses.push(
      "Skills section is missing."
    );

    suggestions.push(
      "Add a dedicated technical skills section."
    );
  }

  // -------------------------
  // Experience - 15
  // -------------------------

  if (experience.length > 0) {
    score += 15;

    strengths.push(
      "Professional experience is included."
    );
  } else {
    suggestions.push(
      "Add internships, work experience or relevant practical experience when available."
    );
  }

  // -------------------------
  // Projects - 15
  // -------------------------

  if (projects.length >= 2) {
    score += 15;

    strengths.push(
      "Multiple projects demonstrate practical experience."
    );
  } else if (projects.length === 1) {
    score += 10;

    strengths.push(
      "Resume contains a project."
    );

    suggestions.push(
      "Add more relevant projects with technologies and measurable outcomes."
    );
  } else {
    weaknesses.push(
      "No projects were detected."
    );

    suggestions.push(
      "Add 2-3 relevant projects and describe your contribution and technologies used."
    );
  }

  // -------------------------
  // Certifications - 5
  // -------------------------

  if (certifications.length > 0) {
    score += 5;

    strengths.push(
      "Certifications are included."
    );
  } else {
    suggestions.push(
      "Consider adding relevant certifications or courses."
    );
  }

  // -------------------------
  // Final score
  // -------------------------

  score = Math.min(score, 100);

  let rating = "";

  if (score >= 85) {
    rating = "Excellent";
  } else if (score >= 70) {
    rating = "Good";
  } else if (score >= 50) {
    rating = "Needs Improvement";
  } else {
    rating = "Weak";
  }

  return {
    score,
    rating,
    strengths: [...new Set(strengths)],
    weaknesses: [...new Set(weaknesses)],
    suggestions: [...new Set(suggestions)]
  };
};

module.exports = {
  analyzeResume
};