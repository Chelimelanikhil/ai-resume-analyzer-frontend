import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Upload,
  Target,
  Brain,
  TrendingUp,
  Users,
  Zap,
} from "lucide-react";
import "./LandingPage.css";

export default function Landing() {
  const [hoveredCard, setHoveredCard] = useState(null);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="nav-container">
        <div className="nav-content">
          {/* Logo */}
          <div className="logo-container">
            <div className="logo-icon">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <span className="logo-text">ResuMatch AI</span>
          </div>
          <div className="nav-buttons">
            <button
              onClick={() => navigate("/auth")}
              className="nav-button nav-button-secondary"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/auth")}
              className="nav-button nav-button-primary"
            >
              Sign Up
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-container">
          <div className="hero-badge">
            <Zap className="w-4 h-4 text-blue-400" />
            <span className="hero-badge-text">
              AI-Powered Career Matching
            </span>
          </div>

          <h1 className="hero-title">
            Upload Your Resume,
            <br />
            <span className="hero-gradient-text">
              Get AI-Powered Matches
            </span>
          </h1>

          <p className="hero-subtitle">
            Our intelligent system analyzes resumes and job descriptions to
            create perfect matches. Save time, find talent, land your dream job.
          </p>

          {/* CTA Cards */}
          <div className="cta-grid">
            <div
              className="cta-card cta-card-candidate"
              onMouseEnter={() => setHoveredCard("candidate")}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="cta-card-overlay"></div>
              <Upload className="cta-card-icon" />
              <h3 className="cta-card-title">
                I'm a Candidate
              </h3>
              <p className="cta-card-description cta-card-description-blue">
                Upload your resume and get instant AI analysis with job
                recommendations
              </p>
              <button
                onClick={() => navigate("/auth")}
                className="cta-button cta-button-blue"
              >
                Get Started
              </button>
            </div>

            <div
              className="cta-card cta-card-recruiter"
              onMouseEnter={() => setHoveredCard("recruiter")}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div className="cta-card-overlay"></div>
              <Users className="cta-card-icon" />
              <h3 className="cta-card-title">
                I'm a Recruiter
              </h3>
              <p className="cta-card-description cta-card-description-purple">
                Post jobs and let AI rank the best candidates based on skill
                match
              </p>
              <button
                onClick={() => navigate("/auth")}
                className="cta-button cta-button-purple"
              >
                Start Hiring
              </button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="features-section">
          <h2 className="section-title">
            Powered by Advanced AI
          </h2>
          <p className="section-subtitle">
            State-of-the-art NLP and machine learning for perfect matches
          </p>

          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon-container feature-icon-blue">
                <Brain className="w-6 h-6 text-blue-400" />
              </div>
              <h3 className="feature-title">
                Smart Resume Parsing
              </h3>
              <p className="feature-description">
                Automatically extract skills, experience, and education using
                advanced NLP models
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-container feature-icon-purple">
                <Target className="w-6 h-6 text-purple-400" />
              </div>
              <h3 className="feature-title">
                Precision Matching
              </h3>
              <p className="feature-description">
                Vector embeddings and similarity scoring ensure the best
                candidate-job fits
              </p>
            </div>

            <div className="feature-card">
              <div className="feature-icon-container feature-icon-pink">
                <TrendingUp className="w-6 h-6 text-pink-400" />
              </div>
              <h3 className="feature-title">
                Actionable Insights
              </h3>
              <p className="feature-description">
                Get AI-generated recommendations to improve resumes and find
                better matches
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="stats-container">
          <div className="stats-grid">
            <div>
              <div className="stat-value">98%</div>
              <div className="stat-label">Match Accuracy</div>
            </div>
            <div>
              <div className="stat-value">10x</div>
              <div className="stat-label">Faster Screening</div>
            </div>
            <div>
              <div className="stat-value">50K+</div>
              <div className="stat-label">Successful Matches</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-text">
          <p>
            &copy; 2025 ResuMatch AI. Transforming recruitment with artificial
            intelligence.
          </p>
        </div>
      </footer>
    </div>
  );
}