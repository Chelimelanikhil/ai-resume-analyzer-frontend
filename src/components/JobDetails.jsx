import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  MapPin,
  Calendar,
  ExternalLink,
  TrendingUp,
  CheckCircle,
  Sparkles,
} from "lucide-react";
import "./JobDetails.css";

export default function JobDetails() {
  const location = useLocation();
  const navigate = useNavigate();
  const job = location.state?.job;
  const resumeData = location.state?.resumeData;

  if (!job) {
    return (
      <div className="job-details-container">
        <div className="job-details-error">
          <p>No job details available. Please go back and select a job again.</p>
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} /> Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const getMatchColor = (match) => {
    if (match >= 80) return "match-high";
    if (match >= 70) return "match-medium";
    return "match-low";
  };

  const getMatchMessage = (match) => {
    if (match >= 80)
      return "Excellent match! Your skills align very well with this role.";
    if (match >= 70)
      return "Good match! You have most of the required skills.";
    return "Moderate match. Consider strengthening relevant skills.";
  };

  const formatPostedDate = (dateString) => {
    if (!dateString || dateString === "Recently") return "Recently";

    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 0) return "Today";
      if (diffDays === 1) return "Yesterday";
      if (diffDays < 7) return `${diffDays} days ago`;
      if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
      return `${Math.floor(diffDays / 30)} months ago`;
    } catch (error) {
      return "Recently";
    }
  };

  const getMatchingSkills = () => {
    if (!resumeData?.parsedData?.skills) return [];
    
    const jobSkills = job.skills || job.requiredSkills || [];
    if (jobSkills.length === 0) return [];

    return resumeData.parsedData.skills.filter((skill) =>
      jobSkills.some(
        (req) =>
          req.toLowerCase().includes(skill.toLowerCase()) ||
          skill.toLowerCase().includes(req.toLowerCase())
      )
    );
  };

  const matchingSkills = getMatchingSkills();

  const handleApply = () => {
    if (job.url) {
      window.open(job.url, "_blank");
    }
  };

  return (
    <div className="job-details-container">
      {/* Navigation */}
      <nav className="job-nav">
        <div className="job-nav-content">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={18} /> Back to Dashboard
          </button>
          <div className="logo-section">
            <div className="logo-icon">
              <Sparkles className="icon-sparkles" />
            </div>
            <span className="logo-text">ResuMatch AI</span>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="job-details-content">
        {/* Header Card */}
        <div className="job-header-card">
          <div className="job-header-main">
            <div>
              <h1 className="job-details-title">{job.title}</h1>
              <p className="job-details-company">{job.company}</p>
            </div>
            {job.match && (
              <div className={`job-match-badge ${getMatchColor(job.match)}`}>
                <div className="job-match-percentage">{job.match}%</div>
                <div className="job-match-label">Match</div>
              </div>
            )}
          </div>

          {/* Meta Information */}
          <div className="job-meta-grid">
            <div className="job-meta-item">
              <Briefcase className="job-meta-icon" />
              <div>
                <p className="job-meta-label">Job Type</p>
                <p className="job-meta-value">{job.type || "Not Specified"}</p>
              </div>
            </div>
            <div className="job-meta-item">
              <MapPin className="job-meta-icon" />
              <div>
                <p className="job-meta-label">Location</p>
                <p className="job-meta-value">{job.location || "Not Specified"}</p>
              </div>
            </div>
            <div className="job-meta-item">
              <Calendar className="job-meta-icon" />
              <div>
                <p className="job-meta-label">Posted</p>
                <p className="job-meta-value">
                  {formatPostedDate(job.postedDate)}
                </p>
              </div>
            </div>
            <div className="job-meta-item">
              <TrendingUp className="job-meta-icon" />
              <div>
                <p className="job-meta-label">Salary</p>
                <p className="job-meta-value">{job.salary || "Not Disclosed"}</p>
              </div>
            </div>
          </div>

          {/* Match Message */}
          {job.match && (
            <div className="job-match-message">
              <CheckCircle size={20} />
              <p>{getMatchMessage(job.match)}</p>
            </div>
          )}
        </div>

        {/* Two Column Layout */}
        <div className="job-details-grid">
          {/* Left Column */}
          <div className="job-details-left">
            {/* Job Description */}
            <div className="job-section-card">
              <h3 className="job-section-title">Job Description</h3>
              <p className="job-section-text">
                {job.description || "No detailed description available for this position. Please visit the job portal for more information."}
              </p>
            </div>

            {/* Experience Level */}
            {job.experience && (
              <div className="job-section-card">
                <h3 className="job-section-title">Experience Required</h3>
                <p className="job-section-text">{job.experience}</p>
              </div>
            )}

            {/* Requirements */}
            {job.requirements && job.requirements.length > 0 && (
              <div className="job-section-card">
                <h3 className="job-section-title">Requirements</h3>
                <ul className="job-requirements-list">
                  {job.requirements.map((req, idx) => (
                    <li key={idx}>{req}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Required Skills (from job.skills or job.requiredSkills) */}
            {((job.skills && job.skills.length > 0) || (job.requiredSkills && job.requiredSkills.length > 0)) && (
              <div className="job-section-card">
                <h3 className="job-section-title">Required Skills</h3>
                <div className="job-skills-list">
                  {(job.skills || job.requiredSkills).map((skill, idx) => (
                    <span key={idx} className="job-skill-tag">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Company Info */}
            {job.companyInfo && (
              <div className="job-section-card">
                <h3 className="job-section-title">About the Company</h3>
                <p className="job-section-text">{job.companyInfo}</p>
              </div>
            )}

            {/* Job Details Summary */}
            <div className="job-section-card">
              <h3 className="job-section-title">Additional Information</h3>
              <div className="job-info-list">
                <div className="job-info-row">
                  <span className="job-info-label">Job ID:</span>
                  <span className="job-info-value">{job.id}</span>
                </div>
                <div className="job-info-row">
                  <span className="job-info-label">Company:</span>
                  <span className="job-info-value">{job.company}</span>
                </div>
                <div className="job-info-row">
                  <span className="job-info-label">Experience Level:</span>
                  <span className="job-info-value">{job.experience || "Not Specified"}</span>
                </div>
                <div className="job-info-row">
                  <span className="job-info-label">Source:</span>
                  <span className="job-info-value">{job.source}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Sidebar */}
          <div className="job-details-right">
            {/* Apply Card */}
            <div className="job-apply-card">
              <h3 className="job-apply-title">Ready to Apply?</h3>
              <p className="job-apply-text">
                Click below to apply directly on the job portal
              </p>
              <button className="job-apply-btn" onClick={handleApply}>
                <ExternalLink size={18} />
                Apply on {job.source || "Job Portal"}
              </button>
              {job.source && (
                <div className="job-source-badge">
                  Source: <span>{job.source}</span>
                </div>
              )}
            </div>

            {/* Your Matching Skills */}
            {matchingSkills.length > 0 && (
              <div className="job-section-card">
                <h3 className="job-section-title">Your Matching Skills</h3>
                <div className="job-skills-list">
                  {matchingSkills.map((skill, idx) => (
                    <span key={idx} className="job-skill-tag-match">
                      ✓ {skill}
                    </span>
                  ))}
                </div>
                <p className="job-skills-note">
                  {matchingSkills.length} of your skills match this role
                </p>
              </div>
            )}

            {/* All Your Skills */}
            {resumeData?.parsedData?.skills && (
              <div className="job-section-card">
                <h3 className="job-section-title">Your Skills</h3>
                <div className="job-skills-list">
                  {resumeData.parsedData.skills.map((skill, idx) => (
                    <span key={idx} className="job-skill-tag-small">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}