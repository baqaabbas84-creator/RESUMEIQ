import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function UploadResume() {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const allowedTypes = [
    "application/pdf",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const maxFileSize = 10 * 1024 * 1024;

  const validateFile = (file) => {
    if (!file) {
      return;
    }

    setError("");

    if (!allowedTypes.includes(file.type)) {
      setSelectedFile(null);
      setError("Only PDF and DOCX files are allowed.");
      return;
    }

    if (file.size > maxFileSize) {
      setSelectedFile(null);
      setError("File size must be less than 10 MB.");
      return;
    }

    setSelectedFile(file);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    validateFile(file);
  };

  const handleDrop = (event) => {
    event.preventDefault();

    setDragActive(false);

    const file = event.dataTransfer.files[0];

    validateFile(file);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const removeFile = () => {
    setSelectedFile(null);
    setError("");

    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleAnalyze = () => {
    if (!selectedFile) {
      setError("Please select a resume first.");
      return;
    }

    // Backend integration will be added later.
    navigate("/analysis");
  };

  return (
    <div className="upload-page">

      {/* Navbar */}
      <nav className="upload-navbar">

        <Link to="/" className="dashboard-logo">
          Resume<span>IQ</span>
        </Link>

        <div className="upload-nav-links">

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


      {/* Main */}
      <main className="upload-container">

        <div className="upload-header">

          <span className="upload-badge">
            AI Resume Analyzer
          </span>

          <h1>
            Upload Your Resume
          </h1>

          <p>
            Upload your resume and get insights about your
            ATS score, skills, and career readiness.
          </p>

        </div>


        {/* Upload Box */}
        {!selectedFile ? (
          <div
            className={`resume-dropzone ${
              dragActive ? "drag-active" : ""
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >

            <div className="upload-cloud">
              ☁️
            </div>

            <h2>
              Drag & Drop your resume
            </h2>

            <p>
              or click here to browse your files
            </p>

            <span className="upload-supported">
              PDF or DOCX • Maximum 10 MB
            </span>

            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileChange}
              hidden
            />

            <button
              type="button"
              className="browse-btn"
              onClick={(event) => {
                event.stopPropagation();
                fileInputRef.current?.click();
              }}
            >
              Choose Resume
            </button>

          </div>
        ) : (

          /* Selected File */
          <div className="selected-file-card">

            <div className="file-icon">
              {selectedFile.type === "application/pdf"
                ? "📕"
                : "📘"}
            </div>

            <div className="file-information">

              <h3>
                {selectedFile.name}
              </h3>

              <p>
                {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
              </p>

              <span>
                ✓ File ready for analysis
              </span>

            </div>

            <button
              type="button"
              className="remove-file-btn"
              onClick={removeFile}
            >
              ×
            </button>

          </div>
        )}


        {/* Error */}
        {error && (
          <div className="upload-error">
            ⚠️ {error}
          </div>
        )}


        {/* Analyze */}
        {selectedFile && (
          <div className="upload-actions">

            <button
              type="button"
              className="analyze-resume-btn"
              onClick={handleAnalyze}
            >
              Analyze Resume
              <span>→</span>
            </button>

            <button
              type="button"
              className="change-file-btn"
              onClick={() => {
                removeFile();
                setTimeout(() => {
                  fileInputRef.current?.click();
                }, 0);
              }}
            >
              Choose Another File
            </button>

          </div>
        )}


        {/* Features */}
        <section className="upload-features">

          <div className="upload-feature">
            <div>📊</div>
            <h3>ATS Score</h3>
            <p>
              Understand how your resume performs against ATS systems.
            </p>
          </div>

          <div className="upload-feature">
            <div>🎯</div>
            <h3>Skill Gap</h3>
            <p>
              Discover important skills missing from your resume.
            </p>
          </div>

          <div className="upload-feature">
            <div>💡</div>
            <h3>AI Recommendations</h3>
            <p>
              Get personalized suggestions to improve your resume.
            </p>
          </div>

        </section>

      </main>

    </div>
  );
}

export default UploadResume;