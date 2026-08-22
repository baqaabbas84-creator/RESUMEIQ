import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  getLatestResume,
  getResumeById,
  getSavedLatestResumeId,
  updateResume,
  downloadResumePDF,
} from "../services/resumeService";

function ResumeBuilder() {
  const navigate = useNavigate();

  const [resumeId, setResumeId] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [downloading, setDownloading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [resume, setResume] = useState({
    title: "My Resume",

    personalInfo: {
      name: "",
      email: "",
      phone: "",
      location: "",
      linkedin: "",
      github: "",
    },

    summary: "",

    education: [],

    experience: [],

    skills: [],

    projects: [],

    certifications: [],
  });

  // =========================================================
  // LOAD RESUME
  // =========================================================

  useEffect(() => {
    loadResume();
  }, []);

  const loadResume = async () => {
    try {
      setLoading(true);
      setError("");

      const savedId = getSavedLatestResumeId();

      let data;

      if (savedId) {
        data = await getResumeById(savedId);
      } else {
        data = await getLatestResume();
      }

      if (!data) {
        setError(
          "No resume found. Please upload a resume first."
        );
        return;
      }

      const resumeData = data?.resume || data;

      if (!resumeData?._id) {
        setError("Resume data could not be loaded.");
        return;
      }

      setResumeId(resumeData._id);

      setResume({
        title: resumeData.title || "My Resume",

        personalInfo: {
          name: resumeData.personalInfo?.name || "",
          email: resumeData.personalInfo?.email || "",
          phone: resumeData.personalInfo?.phone || "",
          location: resumeData.personalInfo?.location || "",
          linkedin: resumeData.personalInfo?.linkedin || "",
          github: resumeData.personalInfo?.github || "",
        },

        summary: resumeData.summary || "",

        education: Array.isArray(resumeData.education)
          ? resumeData.education
          : [],

        experience: Array.isArray(resumeData.experience)
          ? resumeData.experience
          : [],

        skills: Array.isArray(resumeData.skills)
          ? resumeData.skills
          : [],

        projects: Array.isArray(resumeData.projects)
          ? resumeData.projects
          : [],

        certifications: Array.isArray(
          resumeData.certifications
        )
          ? resumeData.certifications
          : [],
      });
    } catch (err) {
      console.error("Resume loading error:", err);

      setError(
        err?.response?.data?.message ||
          "Failed to load resume."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // COMMON HELPERS
  // =========================================================

  const clearMessages = () => {
    setMessage("");
    setError("");
  };

  const handleFieldChange = (event) => {
    const { name, value } = event.target;

    setResume((previous) => ({
      ...previous,
      [name]: value,
    }));

    clearMessages();
  };

  const handlePersonalInfoChange = (event) => {
    const { name, value } = event.target;

    setResume((previous) => ({
      ...previous,

      personalInfo: {
        ...previous.personalInfo,
        [name]: value,
      },
    }));

    clearMessages();
  };

  const handleSummaryChange = (event) => {
    setResume((previous) => ({
      ...previous,
      summary: event.target.value,
    }));

    clearMessages();
  };

  // =========================================================
  // EDUCATION
  // =========================================================

  const addEducation = () => {
    setResume((previous) => ({
      ...previous,

      education: [
        ...previous.education,
        {
          degree: "",
          institution: "",
          startYear: "",
          endYear: "",
          grade: "",
        },
      ],
    }));
  };

  const updateEducation = (
    index,
    field,
    value
  ) => {
    setResume((previous) => {
      const education = [
        ...previous.education,
      ];

      education[index] = {
        ...education[index],
        [field]: value,
      };

      return {
        ...previous,
        education,
      };
    });

    clearMessages();
  };

  const removeEducation = (index) => {
    setResume((previous) => ({
      ...previous,

      education: previous.education.filter(
        (_, itemIndex) =>
          itemIndex !== index
      ),
    }));

    clearMessages();
  };

  // =========================================================
  // EXPERIENCE
  // =========================================================

  const addExperience = () => {
    setResume((previous) => ({
      ...previous,

      experience: [
        ...previous.experience,
        {
          company: "",
          position: "",
          startDate: "",
          endDate: "",
          description: "",
        },
      ],
    }));
  };

  const updateExperience = (
    index,
    field,
    value
  ) => {
    setResume((previous) => {
      const experience = [
        ...previous.experience,
      ];

      experience[index] = {
        ...experience[index],
        [field]: value,
      };

      return {
        ...previous,
        experience,
      };
    });

    clearMessages();
  };

  const removeExperience = (index) => {
    setResume((previous) => ({
      ...previous,

      experience:
        previous.experience.filter(
          (_, itemIndex) =>
            itemIndex !== index
        ),
    }));

    clearMessages();
  };

  // =========================================================
  // SKILLS
  // =========================================================

  const addSkill = () => {
    setResume((previous) => ({
      ...previous,

      skills: [
        ...previous.skills,
        "",
      ],
    }));
  };

  const updateSkill = (
    index,
    value
  ) => {
    setResume((previous) => {
      const skills = [
        ...previous.skills,
      ];

      skills[index] = value;

      return {
        ...previous,
        skills,
      };
    });

    clearMessages();
  };

  const removeSkill = (index) => {
    setResume((previous) => ({
      ...previous,

      skills: previous.skills.filter(
        (_, itemIndex) =>
          itemIndex !== index
      ),
    }));

    clearMessages();
  };

  // =========================================================
  // PROJECTS
  // =========================================================

  const addProject = () => {
    setResume((previous) => ({
      ...previous,

      projects: [
        ...previous.projects,
        {
          name: "",
          description: "",
          technologies: [],
          link: "",
        },
      ],
    }));
  };

  const updateProject = (
    index,
    field,
    value
  ) => {
    setResume((previous) => {
      const projects = [
        ...previous.projects,
      ];

      projects[index] = {
        ...projects[index],
        [field]: value,
      };

      return {
        ...previous,
        projects,
      };
    });

    clearMessages();
  };

  const updateProjectTechnologies = (
    index,
    value
  ) => {
    setResume((previous) => {
      const projects = [
        ...previous.projects,
      ];

      projects[index] = {
        ...projects[index],

        technologies: value
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
      };

      return {
        ...previous,
        projects,
      };
    });

    clearMessages();
  };

  const removeProject = (index) => {
    setResume((previous) => ({
      ...previous,

      projects:
        previous.projects.filter(
          (_, itemIndex) =>
            itemIndex !== index
        ),
    }));

    clearMessages();
  };

  // =========================================================
  // CERTIFICATIONS
  // =========================================================

  const addCertification = () => {
    setResume((previous) => ({
      ...previous,

      certifications: [
        ...previous.certifications,
        {
          name: "",
          organization: "",
          year: "",
        },
      ],
    }));
  };

  const updateCertification = (
    index,
    field,
    value
  ) => {
    setResume((previous) => {
      const certifications = [
        ...previous.certifications,
      ];

      certifications[index] = {
        ...certifications[index],
        [field]: value,
      };

      return {
        ...previous,
        certifications,
      };
    });

    clearMessages();
  };

  const removeCertification = (
    index
  ) => {
    setResume((previous) => ({
      ...previous,

      certifications:
        previous.certifications.filter(
          (_, itemIndex) =>
            itemIndex !== index
        ),
    }));

    clearMessages();
  };

  // =========================================================
  // SAVE RESUME
  // =========================================================

  const handleSave = async () => {
    if (!resumeId) {
      setError("Resume ID is missing.");
      return;
    }

    try {
      setSaving(true);
      setMessage("");
      setError("");

      const response =
        await updateResume(
          resumeId,
          resume
        );

      const updatedResume =
        response?.resume;

      if (updatedResume) {
        setResume((previous) => ({
          ...previous,

          title:
            updatedResume.title ||
            previous.title,

          personalInfo:
            updatedResume.personalInfo ||
            previous.personalInfo,

          summary:
            updatedResume.summary ??
            previous.summary,

          education:
            Array.isArray(
              updatedResume.education
            )
              ? updatedResume.education
              : previous.education,

          experience:
            Array.isArray(
              updatedResume.experience
            )
              ? updatedResume.experience
              : previous.experience,

          skills:
            Array.isArray(
              updatedResume.skills
            )
              ? updatedResume.skills
              : previous.skills,

          projects:
            Array.isArray(
              updatedResume.projects
            )
              ? updatedResume.projects
              : previous.projects,

          certifications:
            Array.isArray(
              updatedResume.certifications
            )
              ? updatedResume.certifications
              : previous.certifications,
        }));
      }

      setMessage(
        "Resume saved successfully."
      );
    } catch (err) {
      console.error(
        "Resume save error:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Failed to save resume."
      );
    } finally {
      setSaving(false);
    }
  };

  // =========================================================
  // DOWNLOAD PDF
  // =========================================================

  const handleDownloadPDF = async () => {
    if (!resumeId) {
      setError("Resume ID is missing.");
      return;
    }

    try {
      setDownloading(true);
      setMessage("");
      setError("");

      await downloadResumePDF(
        resumeId
      );

      setMessage(
        "Resume PDF downloaded successfully."
      );
    } catch (err) {
      console.error(
        "PDF download error:",
        err
      );

      setError(
        err?.response?.data?.message ||
          "Failed to download resume PDF."
      );
    } finally {
      setDownloading(false);
    }
  };

  // =========================================================
  // LOADING SCREEN
  // =========================================================

  if (loading) {
    return (
      <div className="builder-page">

        <nav className="builder-navbar">

          <Link
            to="/"
            className="dashboard-logo"
          >
            Resume<span>IQ</span>
          </Link>

        </nav>

        <main className="builder-container">

          <div className="builder-loading">

            <div className="builder-loader"></div>

            <h2>
              Loading Resume...
            </h2>

            <p>
              Preparing your resume builder.
            </p>

          </div>

        </main>

      </div>
    );
  }

  // =========================================================
  // MAIN UI
  // =========================================================

  return (
    <div className="builder-page">

      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <nav className="builder-navbar">

        <Link
          to="/"
          className="dashboard-logo"
        >
          Resume<span>IQ</span>
        </Link>

        <div className="builder-nav-links">

          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link to="/history">
            History
          </Link>

          <Link to="/profile">
            Profile
          </Link>

        </div>

      </nav>


      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="builder-container">

        {/* ===================================================
            HEADER
        =================================================== */}

        <section className="builder-header">

          <div>

            <span className="builder-badge">
              Resume Builder
            </span>

            <h1>
              Build Your Resume
            </h1>

            <p>
              Edit your resume and create a
              professional career profile.
            </p>

          </div>

          <div className="builder-header-actions">

            <button
              type="button"
              className="builder-preview-btn"
              onClick={() =>
                navigate("/analysis")
              }
            >
              View Analysis
            </button>

            <button
              type="button"
              className="builder-preview-btn"
              onClick={
                handleDownloadPDF
              }
              disabled={downloading}
            >
              {downloading
                ? "Generating..."
                : "↓ Download PDF"}
            </button>

            <button
              type="button"
              className="builder-save-btn"
              onClick={handleSave}
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : "Save Resume"}
            </button>

          </div>

        </section>


        {/* ===================================================
            MESSAGES
        =================================================== */}

        {message && (
          <div className="builder-success">
            ✓ {message}
          </div>
        )}

        {error && (
          <div className="builder-error">
            ⚠️ {error}
          </div>
        )}


        {/* ===================================================
            PERSONAL INFORMATION
        =================================================== */}

        <section className="builder-section">

          <div className="builder-section-title">

            <div className="builder-section-number">
              01
            </div>

            <div>

              <h2>
                Personal Information
              </h2>

              <p>
                Your contact and professional links.
              </p>

            </div>

          </div>


          <div className="builder-grid">

            <div className="builder-field">

              <label>
                Resume Title
              </label>

              <input
                name="title"
                value={resume.title}
                onChange={
                  handleFieldChange
                }
                placeholder="Software Developer Resume"
              />

            </div>


            <div className="builder-field">

              <label>
                Full Name
              </label>

              <input
                name="name"
                value={
                  resume.personalInfo.name
                }
                onChange={
                  handlePersonalInfoChange
                }
                placeholder="Your full name"
              />

            </div>


            <div className="builder-field">

              <label>
                Email Address
              </label>

              <input
                name="email"
                type="email"
                value={
                  resume.personalInfo.email
                }
                onChange={
                  handlePersonalInfoChange
                }
                placeholder="you@example.com"
              />

            </div>


            <div className="builder-field">

              <label>
                Phone Number
              </label>

              <input
                name="phone"
                value={
                  resume.personalInfo.phone
                }
                onChange={
                  handlePersonalInfoChange
                }
                placeholder="Phone number"
              />

            </div>


            <div className="builder-field">

              <label>
                Location
              </label>

              <input
                name="location"
                value={
                  resume.personalInfo.location
                }
                onChange={
                  handlePersonalInfoChange
                }
                placeholder="City, Country"
              />

            </div>


            <div className="builder-field">

              <label>
                LinkedIn
              </label>

              <input
                name="linkedin"
                value={
                  resume.personalInfo.linkedin
                }
                onChange={
                  handlePersonalInfoChange
                }
                placeholder="LinkedIn profile URL"
              />

            </div>


            <div className="builder-field">

              <label>
                GitHub
              </label>

              <input
                name="github"
                value={
                  resume.personalInfo.github
                }
                onChange={
                  handlePersonalInfoChange
                }
                placeholder="GitHub profile URL"
              />

            </div>

          </div>

        </section>


        {/* ===================================================
            SUMMARY
        =================================================== */}

        <section className="builder-section">

          <div className="builder-section-title">

            <div className="builder-section-number">
              02
            </div>

            <div>

              <h2>
                Professional Summary
              </h2>

              <p>
                Give recruiters a quick overview of you.
              </p>

            </div>

          </div>


          <div className="builder-field">

            <textarea
              rows="6"
              value={resume.summary}
              onChange={
                handleSummaryChange
              }
              placeholder="Write a concise professional summary..."
            />

          </div>

        </section>


        {/* ===================================================
            EDUCATION
        =================================================== */}

        <section className="builder-section">

          <div className="builder-section-title">

            <div className="builder-section-number">
              03
            </div>

            <div>

              <h2>
                Education
              </h2>

              <p>
                Add your academic background.
              </p>

            </div>

          </div>


          {resume.education.length === 0 && (
            <div className="builder-empty">
              No education added yet.
            </div>
          )}


          {resume.education.map(
            (education, index) => (

              <div
                className="builder-item-card"
                key={
                  education._id ||
                  `education-${index}`
                }
              >

                <div className="builder-item-heading">

                  <h3>
                    Education #{index + 1}
                  </h3>

                  <button
                    type="button"
                    onClick={() =>
                      removeEducation(
                        index
                      )
                    }
                  >
                    Remove
                  </button>

                </div>


                <div className="builder-grid">

                  <div className="builder-field">

                    <label>
                      Degree
                    </label>

                    <input
                      value={
                        education.degree ||
                        ""
                      }
                      onChange={(event) =>
                        updateEducation(
                          index,
                          "degree",
                          event.target.value
                        )
                      }
                      placeholder="B.Tech Computer Science"
                    />

                  </div>


                  <div className="builder-field">

                    <label>
                      Institution
                    </label>

                    <input
                      value={
                        education.institution ||
                        ""
                      }
                      onChange={(event) =>
                        updateEducation(
                          index,
                          "institution",
                          event.target.value
                        )
                      }
                      placeholder="University / College"
                    />

                  </div>


                  <div className="builder-field">

                    <label>
                      Start Year
                    </label>

                    <input
                      value={
                        education.startYear ||
                        ""
                      }
                      onChange={(event) =>
                        updateEducation(
                          index,
                          "startYear",
                          event.target.value
                        )
                      }
                      placeholder="2024"
                    />

                  </div>


                  <div className="builder-field">

                    <label>
                      End Year
                    </label>

                    <input
                      value={
                        education.endYear ||
                        ""
                      }
                      onChange={(event) =>
                        updateEducation(
                          index,
                          "endYear",
                          event.target.value
                        )
                      }
                      placeholder="2028"
                    />

                  </div>


                  <div className="builder-field">

                    <label>
                      Grade / Current Year
                    </label>

                    <input
                      value={
                        education.grade ||
                        ""
                      }
                      onChange={(event) =>
                        updateEducation(
                          index,
                          "grade",
                          event.target.value
                        )
                      }
                      placeholder="2nd Year / CGPA"
                    />

                  </div>

                </div>

              </div>

            )
          )}


          <button
            type="button"
            className="builder-add-btn"
            onClick={addEducation}
          >
            + Add Education
          </button>

        </section>


        {/* ===================================================
            EXPERIENCE
        =================================================== */}

        <section className="builder-section">

          <div className="builder-section-title">

            <div className="builder-section-number">
              04
            </div>

            <div>

              <h2>
                Experience
              </h2>

              <p>
                Add internships, jobs or practical experience.
              </p>

            </div>

          </div>


          {resume.experience.length === 0 && (
            <div className="builder-empty">
              No experience added yet.
            </div>
          )}


          {resume.experience.map(
            (experience, index) => (

              <div
                className="builder-item-card"
                key={
                  experience._id ||
                  `experience-${index}`
                }
              >

                <div className="builder-item-heading">

                  <h3>
                    Experience #{index + 1}
                  </h3>

                  <button
                    type="button"
                    onClick={() =>
                      removeExperience(
                        index
                      )
                    }
                  >
                    Remove
                  </button>

                </div>


                <div className="builder-grid">

                  <div className="builder-field">

                    <label>
                      Company
                    </label>

                    <input
                      value={
                        experience.company ||
                        ""
                      }
                      onChange={(event) =>
                        updateExperience(
                          index,
                          "company",
                          event.target.value
                        )
                      }
                      placeholder="Company name"
                    />

                  </div>


                  <div className="builder-field">

                    <label>
                      Position
                    </label>

                    <input
                      value={
                        experience.position ||
                        ""
                      }
                      onChange={(event) =>
                        updateExperience(
                          index,
                          "position",
                          event.target.value
                        )
                      }
                      placeholder="Software Intern"
                    />

                  </div>


                  <div className="builder-field">

                    <label>
                      Start Date
                    </label>

                    <input
                      value={
                        experience.startDate ||
                        ""
                      }
                      onChange={(event) =>
                        updateExperience(
                          index,
                          "startDate",
                          event.target.value
                        )
                      }
                      placeholder="June 2026"
                    />

                  </div>


                  <div className="builder-field">

                    <label>
                      End Date
                    </label>

                    <input
                      value={
                        experience.endDate ||
                        ""
                      }
                      onChange={(event) =>
                        updateExperience(
                          index,
                          "endDate",
                          event.target.value
                        )
                      }
                      placeholder="August 2026"
                    />

                  </div>

                </div>


                <div className="builder-field">

                  <label>
                    Description
                  </label>

                  <textarea
                    rows="5"
                    value={
                      experience.description ||
                      ""
                    }
                    onChange={(event) =>
                      updateExperience(
                        index,
                        "description",
                        event.target.value
                      )
                    }
                    placeholder="Describe your responsibilities, achievements and impact..."
                  />

                </div>

              </div>

            )
          )}


          <button
            type="button"
            className="builder-add-btn"
            onClick={addExperience}
          >
            + Add Experience
          </button>

        </section>


        {/* ===================================================
            SKILLS
        =================================================== */}

        <section className="builder-section">

          <div className="builder-section-title">

            <div className="builder-section-number">
              05
            </div>

            <div>

              <h2>
                Skills
              </h2>

              <p>
                Add your technical and professional skills.
              </p>

            </div>

          </div>


          {resume.skills.length === 0 && (
            <div className="builder-empty">
              No skills added yet.
            </div>
          )}


          <div className="builder-skills-grid">

            {resume.skills.map(
              (skill, index) => (

                <div
                  className="builder-skill-input"
                  key={`skill-${index}`}
                >

                  <input
                    value={skill || ""}
                    onChange={(event) =>
                      updateSkill(
                        index,
                        event.target.value
                      )
                    }
                    placeholder="e.g. React"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      removeSkill(
                        index
                      )
                    }
                  >
                    ×
                  </button>

                </div>

              )
            )}

          </div>


          <button
            type="button"
            className="builder-add-btn"
            onClick={addSkill}
          >
            + Add Skill
          </button>

        </section>


        {/* ===================================================
            PROJECTS
        =================================================== */}

        <section className="builder-section">

          <div className="builder-section-title">

            <div className="builder-section-number">
              06
            </div>

            <div>

              <h2>
                Projects
              </h2>

              <p>
                Showcase your practical work.
              </p>

            </div>

          </div>


          {resume.projects.length === 0 && (
            <div className="builder-empty">
              No projects added yet.
            </div>
          )}


          {resume.projects.map(
            (project, index) => (

              <div
                className="builder-item-card"
                key={
                  project._id ||
                  `project-${index}`
                }
              >

                <div className="builder-item-heading">

                  <h3>
                    Project #{index + 1}
                  </h3>

                  <button
                    type="button"
                    onClick={() =>
                      removeProject(
                        index
                      )
                    }
                  >
                    Remove
                  </button>

                </div>


                <div className="builder-grid">

                  <div className="builder-field">

                    <label>
                      Project Name
                    </label>

                    <input
                      value={
                        project.name ||
                        ""
                      }
                      onChange={(event) =>
                        updateProject(
                          index,
                          "name",
                          event.target.value
                        )
                      }
                      placeholder="Project name"
                    />

                  </div>


                  <div className="builder-field">

                    <label>
                      Project Link
                    </label>

                    <input
                      value={
                        project.link ||
                        ""
                      }
                      onChange={(event) =>
                        updateProject(
                          index,
                          "link",
                          event.target.value
                        )
                      }
                      placeholder="https://github.com/..."
                    />

                  </div>

                </div>


                <div className="builder-field">

                  <label>
                    Technologies
                  </label>

                  <input
                    value={(
                      project.technologies ||
                      []
                    ).join(", ")}
                    onChange={(event) =>
                      updateProjectTechnologies(
                        index,
                        event.target.value
                      )
                    }
                    placeholder="React, Node.js, MongoDB"
                  />

                </div>


                <div className="builder-field">

                  <label>
                    Description
                  </label>

                  <textarea
                    rows="5"
                    value={
                      project.description ||
                      ""
                    }
                    onChange={(event) =>
                      updateProject(
                        index,
                        "description",
                        event.target.value
                      )
                    }
                    placeholder="Describe the project, your contribution and technologies used..."
                  />

                </div>

              </div>

            )
          )}


          <button
            type="button"
            className="builder-add-btn"
            onClick={addProject}
          >
            + Add Project
          </button>

        </section>


        {/* ===================================================
            CERTIFICATIONS
        =================================================== */}

        <section className="builder-section">

          <div className="builder-section-title">

            <div className="builder-section-number">
              07
            </div>

            <div>

              <h2>
                Certifications
              </h2>

              <p>
                Add certifications and courses.
              </p>

            </div>

          </div>


          {resume.certifications.length === 0 && (
            <div className="builder-empty">
              No certifications added yet.
            </div>
          )}


          {resume.certifications.map(
            (
              certification,
              index
            ) => (

              <div
                className="builder-item-card"
                key={
                  certification._id ||
                  `certification-${index}`
                }
              >

                <div className="builder-item-heading">

                  <h3>
                    Certification #{index + 1}
                  </h3>

                  <button
                    type="button"
                    onClick={() =>
                      removeCertification(
                        index
                      )
                    }
                  >
                    Remove
                  </button>

                </div>


                <div className="builder-grid">

                  <div className="builder-field">

                    <label>
                      Certification Name
                    </label>

                    <input
                      value={
                        certification.name ||
                        ""
                      }
                      onChange={(event) =>
                        updateCertification(
                          index,
                          "name",
                          event.target.value
                        )
                      }
                      placeholder="Certification name"
                    />

                  </div>


                  <div className="builder-field">

                    <label>
                      Organization
                    </label>

                    <input
                      value={
                        certification.organization ||
                        ""
                      }
                      onChange={(event) =>
                        updateCertification(
                          index,
                          "organization",
                          event.target.value
                        )
                      }
                      placeholder="Issuing organization"
                    />

                  </div>


                  <div className="builder-field">

                    <label>
                      Year
                    </label>

                    <input
                      value={
                        certification.year ||
                        ""
                      }
                      onChange={(event) =>
                        updateCertification(
                          index,
                          "year",
                          event.target.value
                        )
                      }
                      placeholder="2026"
                    />

                  </div>

                </div>

              </div>

            )
          )}


          <button
            type="button"
            className="builder-add-btn"
            onClick={
              addCertification
            }
          >
            + Add Certification
          </button>

        </section>


        {/* ===================================================
            FINAL ACTION
        =================================================== */}

        <section className="builder-bottom">

          <div>

            <h2>
              Your resume is ready
            </h2>

            <p>
              Save your changes or download
              your professional PDF resume.
            </p>

          </div>


          <div
            className="builder-header-actions"
          >

            <button
              type="button"
              className="builder-preview-btn"
              onClick={
                handleDownloadPDF
              }
              disabled={downloading}
            >
              {downloading
                ? "Generating..."
                : "↓ Download PDF"}
            </button>

            <button
              type="button"
              className="builder-save-btn"
              onClick={handleSave}
              disabled={saving}
            >
              {saving
                ? "Saving..."
                : "Save Resume"}
            </button>

          </div>

        </section>

      </main>

    </div>
  );
}

export default ResumeBuilder;