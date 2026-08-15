import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState("ResumeIQ User");
  const [email, setEmail] = useState("user@example.com");
  const [role, setRole] = useState("Software Developer");

  const handleSave = () => {
    setIsEditing(false);
  };

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="profile-page">

      {/* Navbar */}
      <nav className="dashboard-navbar">

        <Link to="/" className="dashboard-logo">
          Resume<span>IQ</span>
        </Link>

        <div className="dashboard-nav-links">

          <Link to="/dashboard">
            Dashboard
          </Link>

          <Link to="/analysis">
            Analysis
          </Link>

          <Link to="/interview">
            Interview
          </Link>

          <Link to="/history">
            History
          </Link>

          <Link
            to="/profile"
            className="active-nav-link"
          >
            Profile
          </Link>

        </div>

      </nav>


      {/* Main */}
      <main className="profile-container">

        {/* Header */}
        <div className="profile-header">

          <div>

            <span className="upload-badge">
              Account
            </span>

            <h1>
              My Profile
            </h1>

            <p>
              Manage your ResumeIQ profile and track your
              career progress.
            </p>

          </div>

          {!isEditing && (
            <button
              className="profile-edit-btn"
              onClick={() => setIsEditing(true)}
            >
              ✏️ Edit Profile
            </button>
          )}

        </div>


        {/* Profile card */}
        <section className="profile-main-card">

          <div className="profile-avatar">
            {name.charAt(0).toUpperCase()}
          </div>

          <div className="profile-main-info">

            <h2>
              {name}
            </h2>

            <p>
              {email}
            </p>

            <span>
              {role}
            </span>

          </div>

        </section>


        {/* Information */}
        <section className="profile-section">

          <div className="profile-section-header">

            <div>
              <span className="analysis-label">
                PERSONAL INFORMATION
              </span>

              <h2>
                Profile Details
              </h2>
            </div>

          </div>


          <div className="profile-form">

            {/* Name */}
            <div className="profile-field">

              <label>
                Full Name
              </label>

              <input
                type="text"
                value={name}
                disabled={!isEditing}
                onChange={(event) =>
                  setName(event.target.value)
                }
              />

            </div>


            {/* Email */}
            <div className="profile-field">

              <label>
                Email Address
              </label>

              <input
                type="email"
                value={email}
                disabled={!isEditing}
                onChange={(event) =>
                  setEmail(event.target.value)
                }
              />

            </div>


            {/* Role */}
            <div className="profile-field">

              <label>
                Target Job Role
              </label>

              <select
                value={role}
                disabled={!isEditing}
                onChange={(event) =>
                  setRole(event.target.value)
                }
              >

                <option>
                  Software Developer
                </option>

                <option>
                  Java Developer
                </option>

                <option>
                  Full Stack Developer
                </option>

                <option>
                  Frontend Developer
                </option>

                <option>
                  Backend Developer
                </option>

                <option>
                  Data Analyst
                </option>

              </select>

            </div>

          </div>


          {isEditing && (

            <div className="profile-form-actions">

              <button
                className="profile-cancel-btn"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </button>

              <button
                className="profile-save-btn"
                onClick={handleSave}
              >
                Save Changes
              </button>

            </div>

          )}

        </section>


        {/* Statistics */}
        <section className="profile-section">

          <div className="profile-section-header">

            <div>

              <span className="analysis-label">
                YOUR PROGRESS
              </span>

              <h2>
                Career Statistics
              </h2>

            </div>

          </div>


          <div className="profile-stats">

            <div className="profile-stat-card">

              <div className="profile-stat-icon">
                📄
              </div>

              <strong>
                2
              </strong>

              <span>
                Resumes Analyzed
              </span>

            </div>


            <div className="profile-stat-card">

              <div className="profile-stat-icon">
                💬
              </div>

              <strong>
                1
              </strong>

              <span>
                Interviews Completed
              </span>

            </div>


            <div className="profile-stat-card">

              <div className="profile-stat-icon">
                🎯
              </div>

              <strong>
                87
              </strong>

              <span>
                Best ATS Score
              </span>

            </div>


            <div className="profile-stat-card">

              <div className="profile-stat-icon">
                ⭐
              </div>

              <strong>
                82%
              </strong>

              <span>
                Interview Accuracy
              </span>

            </div>

          </div>

        </section>


        {/* Quick Actions */}
        <section className="profile-section">

          <div className="profile-section-header">

            <div>

              <span className="analysis-label">
                QUICK ACTIONS
              </span>

              <h2>
                Continue Your Journey
              </h2>

            </div>

          </div>


          <div className="profile-actions-grid">

            <Link
              to="/upload-resume"
              className="profile-action-card"
            >

              <span>
                📄
              </span>

              <div>

                <strong>
                  Analyze Resume
                </strong>

                <p>
                  Improve your ATS score
                </p>

              </div>

              <b>
                →
              </b>

            </Link>


            <Link
              to="/interview"
              className="profile-action-card"
            >

              <span>
                💬
              </span>

              <div>

                <strong>
                  Practice Interview
                </strong>

                <p>
                  Improve your interview skills
                </p>

              </div>

              <b>
                →
              </b>

            </Link>


            <Link
              to="/history"
              className="profile-action-card"
            >

              <span>
                📊
              </span>

              <div>

                <strong>
                  View History
                </strong>

                <p>
                  Check your previous activity
                </p>

              </div>

              <b>
                →
              </b>

            </Link>

          </div>

        </section>


        {/* Account */}
        <section className="profile-account-section">

          <div>

            <h3>
              Account
            </h3>

            <p>
              Sign out of your ResumeIQ account.
            </p>

          </div>

          <button
            className="logout-btn"
            onClick={handleLogout}
          >
            ↪ Logout
          </button>

        </section>

      </main>

    </div>
  );
}

export default Profile;