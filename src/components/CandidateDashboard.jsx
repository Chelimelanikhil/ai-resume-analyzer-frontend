import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Upload,
  FileText,
  TrendingUp,
  Briefcase,
  Target,
  CheckCircle,
  AlertCircle,
  Sparkles,
  User,
  LogOut,
  Search,
  Loader,
  RefreshCw,
  ExternalLink,
  MapPin,
  Calendar,
} from "lucide-react";
import "./CandidateDashboard.css";
import { uploadResume } from "../Services/api";

export default function CandidateDashboard() {
  const [resumeUploaded, setResumeUploaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const navigate = useNavigate();
  const [uploadMessage, setUploadMessage] = useState("");
  const [resumeData, setResumeData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Dynamic jobs states
  const [matchedJobs, setMatchedJobs] = useState([]);
  const [jobsLoading, setJobsLoading] = useState(false);
  const [jobsError, setJobsError] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const savedResume = localStorage.getItem("resumeData");
    if (savedResume) {
      const parsed = JSON.parse(savedResume);
      console.log("Loaded saved resume data:", parsed);
      setResumeData(parsed);
      setResumeUploaded(true);

      // Fetch jobs automatically when resume data is loaded
      fetchMatchedJobs(parsed);
    }
  }, []);

  // Fetch matched jobs from backend
  const fetchMatchedJobs = async (resumeDataToUse) => {
    console.log("Fetching jobs with resume data:", resumeDataToUse);

    const dataToUse = resumeDataToUse || resumeData;

    console.log("Using resume data:", dataToUse);

    if (
      !dataToUse ||
      !dataToUse.parsedData.skills ||
      dataToUse.parsedData.skills.length === 0
    ) {
      setJobsError("No skills found in resume to match jobs");
      return;
    }

    setJobsLoading(true);
    setJobsError("");

    try {
      const token = localStorage.getItem("token");
      const API_URL = "http://localhost:5000/api";

      const response = await fetch(`${API_URL}/jobs/match`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          skills: dataToUse.parsedData.skills || [],
          experience: dataToUse.parsedData.experience || "0-3",
          jobTitle: dataToUse.jobTitle || "",
          location: dataToUse.location || "India",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch jobs");
      }

      const result = await response.json();
      console.log("Jobs fetch result:", result);
      if (result.success) {
        setMatchedJobs(result.jobs || []);
        if (result.jobs.length === 0) {
          setJobsError(
            "No matching jobs found. Try updating your resume with more skills."
          );
        }
      } else {
        setJobsError(result.message || "Failed to fetch jobs");
      }
    } catch (error) {
      console.error("Error loading jobs:", error);
      setJobsError("Failed to load jobs. Please try again later.");
    } finally {
      setJobsLoading(false);
    }
  };

  // Search jobs with custom query
  const handleSearchJobs = async () => {
    if (!searchQuery.trim()) {
      fetchMatchedJobs();
      return;
    }

    setJobsLoading(true);
    setJobsError("");

    try {
      const token = localStorage.getItem("token");
      const API_URL = "http://localhost:5000/api";

      const queryParams = new URLSearchParams({
        query: searchQuery,
        location: resumeData?.location || "India",
        experience: resumeData?.experience || "0-3",
      });

      const response = await fetch(`${API_URL}/jobs/search?${queryParams}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to search jobs");
      }

      const result = await response.json();

      if (result.success) {
        setMatchedJobs(result.jobs || []);
        if (result.jobs.length === 0) {
          setJobsError("No jobs found for your search query");
        }
      } else {
        setJobsError(result.message || "Failed to search jobs");
      }
    } catch (error) {
      console.error("Error searching jobs:", error);
      setJobsError("Failed to search jobs. Please try again.");
    } finally {
      setJobsLoading(false);
    }
  };

  const handlelogout = () => {
    navigate("/auth");
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("resumeData");
    window.location.reload();
  };

  const handleProfileClick = () => {
 navigate("/settings");
  }

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setIsDragging(false);

    const file = e.dataTransfer.files[0];
    if (!file) return;

    await uploadFile(file);
  };

  const handleFileSelect = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    await uploadFile(file);
  };

  const uploadFile = async (file) => {
    setUploadMessage("");
    setLoading(true);

    try {
      const result = await uploadResume(file);

      if (!result.success) {
        setUploadMessage(result.error || "Failed to upload resume");
        setLoading(false);
        return;
      }

      setResumeUploaded(true);
      setResumeData(result.data);
      localStorage.setItem("resumeData", JSON.stringify(result.data));
      setUploadMessage("Resume uploaded successfully!");

      // Fetch jobs after resume upload
      fetchMatchedJobs(result.data);
    } catch (err) {
      setUploadMessage(err.message || "Something went wrong during upload");
    } finally {
      setLoading(false);
    }
  };

  const getMatchColor = (match) => {
    if (match >= 80) return "match-high";
    if (match >= 70) return "match-medium";
    return "match-low";
  };

  const handleApplyToJob = async (job) => {
    // Open job URL in new tab
    if (job.url) {
      window.open(job.url, "_blank");

      // Optionally track application
      try {
        const token = localStorage.getItem("token");
        const API_URL = "http://localhost:5000/api";

        await fetch(`${API_URL}/jobs/${job.id}/apply`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        console.error("Error tracking application:", error);
      }
    }
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

  return (
    <div className="dashboard-container">
      {/* Top Navigation */}
      <nav className="top-nav">
        <div className="nav-content">
          <div className="logo-section">
            <div className="logo-icon">
              <Sparkles className="icon-sparkles" />
            </div>
            <span className="logo-text">ResuMatch AI</span>
          </div>
          <div className="nav-actions">
            <div className="user-info" onClick={handleProfileClick} style={{cursor:'pointer'}}>
              <User className="icon-user" />
              <span className="user-name">
                {resumeData?.parsedData.name || "John Doe"}
              </span>
            </div>
            <button className="logout-btn" onClick={handlelogout}>
              <LogOut className="icon-logout" />
            </button>
          </div>
        </div>
      </nav>

      <div className="main-content">
        {!resumeUploaded ? (
          /* Upload Section */
          <div className="upload-section">
            <div className="upload-container">
              <h1 className="upload-title">Upload Your Resume</h1>
              <p className="upload-subtitle">
                Get instant AI-powered analysis and job recommendations from
                Naukri & LinkedIn
              </p>

              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`upload-dropzone ${isDragging ? "dragging" : ""}`}
              >
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  onChange={handleFileSelect}
                  className="file-input"
                  disabled={loading}
                />
                <div className="upload-content">
                  <div className="upload-icon">
                    <Upload className="icon-upload" />
                  </div>
                  <h3 className="upload-heading">
                    {loading
                      ? "Analyzing your resume..."
                      : "Drop your resume here or click to browse"}
                  </h3>
                  <p className="upload-info">
                    Supports PDF, DOC, DOCX (Max 5MB)
                  </p>
                  <button className="select-file-btn" disabled={loading}>
                    {loading ? "Uploading..." : "Select File"}
                  </button>
                </div>
              </div>

              {uploadMessage && (
                <p
                  className={`upload-message ${
                    uploadMessage.includes("success") ? "success" : "error"
                  }`}
                >
                  {uploadMessage}
                </p>
              )}
            </div>
          </div>
        ) : (
          /* Dashboard View */
          <div className="dashboard-grid">
            {/* Left Column - Resume & Score */}
            <div className="left-column">
              {/* Resume Preview Card */}
              <div className="card">
                <div className="card-header">
                  <h2 className="card-title">Your Resume</h2>
                  <FileText className="icon-header" />
                </div>
                <div className="resume-preview">
                  <div className="resume-item">
                    <div className="resume-icon">
                      <FileText className="icon-file" />
                    </div>
                    <div className="resume-details">
                      <p className="resume-name">
                        {resumeData?.fileName || "Resume.pdf"}
                      </p>
                      <p className="resume-time">Uploaded just now</p>
                    </div>
                  </div>
                </div>
                <label className="upload-new-btn">
                  {loading ? "Uploading..." : "Upload New Resume"}
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileSelect}
                    style={{ display: "none" }}
                    disabled={loading}
                  />
                </label>
              </div>

              {/* AI Score Card */}
              <div className="card">
                <div className="card-header">
                  <h2 className="card-title">AI Score</h2>
                  <TrendingUp className="icon-header" />
                </div>
                <div className="score-container">
                  <div
                    className="score-circle"
                    style={{
                      position: "relative",
                      width: "200px",
                      height: "200px",
                    }}
                  >
                    <svg
                      className="score-svg"
                      viewBox="0 0 200 200"
                      style={{
                        transform: "rotate(-90deg)",
                        width: "100%",
                        height: "100%",
                      }}
                    >
                      {/* Background circle */}
                      <circle
                        cx="100"
                        cy="100"
                        r="85"
                        fill="none"
                        stroke="#1e293b"
                        strokeWidth="12"
                      />
                      {/* Progress circle */}
                      <circle
                        cx="100"
                        cy="100"
                        r="85"
                        fill="none"
                        stroke="url(#gradient)"
                        strokeWidth="12"
                        strokeLinecap="round"
                        strokeDasharray={`${2 * Math.PI * 85}`}
                        strokeDashoffset={`${
                          2 *
                          Math.PI *
                          85 *
                          (1 - (resumeData?.aiScore || 0) / 100)
                        }`}
                        style={{
                          transition: "stroke-dashoffset 1s ease-in-out",
                        }}
                      />
                      <defs>
                        <linearGradient
                          id="gradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop offset="0%" stopColor="#667eea" />
                          <stop offset="100%" stopColor="#764ba2" />
                        </linearGradient>
                      </defs>
                    </svg>
                    <div
                      style={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        textAlign: "center",
                      }}
                    >
                      <div
                        style={{
                          fontSize: "48px",
                          fontWeight: "700",
                          color: "#f1f5f9",
                          lineHeight: "1",
                        }}
                      >
                        {resumeData?.aiScore || 0}
                      </div>
                      <div
                        style={{
                          fontSize: "16px",
                          color: "#94a3b8",
                          marginTop: "4px",
                        }}
                      >
                        / 100
                      </div>
                    </div>
                  </div>
                </div>
                <p className="score-message">
                  Good score! A few improvements can boost your matches.
                </p>
              </div>

              {/* AI Insights Card */}
              <div className="card">
                <div className="card-header">
                  <h2 className="card-title">AI Insights</h2>
                  <Target className="icon-header" />
                </div>
                <div className="insights-list">
                  {resumeData?.insights?.strengths?.map((s, idx) => (
                    <div key={`strength-${idx}`} className="insight-item">
                      <CheckCircle
                        className="icon-check"
                        style={{ marginTop: 15 }}
                      />
                      <p className="insight-text">{s}</p>
                    </div>
                  ))}
                  {resumeData?.insights?.improvements?.map((i, idx) => (
                    <div key={`improve-${idx}`} className="insight-item">
                      <AlertCircle
                        className="icon-alert"
                        style={{ marginTop: 15 }}
                      />
                      <p className="insight-text">{i}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column - Job Matches */}
            <div className="right-column">
              <div className="card">
                <div
                  className="jobs-header"
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                    marginBottom: "24px",
                    gap: "20px",
                  }}
                >
                  <div>
                    <h2 className="jobs-title" style={{ marginBottom: "4px" }}>
                      Matched Jobs
                    </h2>
                    <p className="jobs-subtitle" style={{ margin: 0 }}>
                      From Naukri & LinkedIn - Based on your skills
                    </p>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <div
                      className="search-container"
                      style={{
                        position: "relative",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Search
                        className="search-icon"
                        style={{
                          position: "absolute",
                          left: "12px",
                          color: "#9ca3af",
                          pointerEvents: "none",
                        }}
                        size={18}
                      />
                      <input
                        type="text"
                        placeholder="Search jobs..."
                        className="search-input"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleSearchJobs();
                          }
                        }}
                        style={{
                          paddingLeft: "40px",
                          paddingRight: "12px",
                          height: "40px",
                          width: "280px",
                        }}
                      />
                    </div>
                    <button
                      className="refresh-btn"
                      onClick={() => fetchMatchedJobs()}
                      disabled={jobsLoading}
                      title="Refresh jobs"
                      style={{
                        background: "#374151",
                        border: "1px solid #4b5563",
                        borderRadius: "8px",
                        cursor: jobsLoading ? "not-allowed" : "pointer",
                        padding: "10px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        height: "40px",
                        width: "40px",
                        transition: "all 0.2s",
                      }}
                      onMouseEnter={(e) => {
                        if (!jobsLoading) {
                          e.currentTarget.style.background = "#4b5563";
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = "#374151";
                      }}
                    >
                      <RefreshCw
                        size={18}
                        color="#e5e7eb"
                        style={{
                          animation: jobsLoading
                            ? "spin 1s linear infinite"
                            : "none",
                        }}
                      />
                    </button>
                  </div>
                </div>

                {jobsLoading ? (
                  <div
                    className="jobs-loading"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "60px 20px",
                      gap: "16px",
                    }}
                  >
                    <Loader
                      size={48}
                      style={{ animation: "spin 1s linear infinite" }}
                    />
                    <p style={{ fontSize: "16px", color: "#666" }}>
                      Finding the best jobs for you from Naukri & LinkedIn...
                    </p>
                  </div>
                ) : jobsError ? (
                  <div
                    className="jobs-error"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "60px 20px",
                      gap: "16px",
                    }}
                  >
                    <AlertCircle size={48} color="#ef4444" />
                    <p style={{ fontSize: "16px", color: "#666" }}>
                      {jobsError}
                    </p>
                    <button
                      className="retry-btn"
                      onClick={() => fetchMatchedJobs()}
                      style={{
                        padding: "10px 24px",
                        background: "#6366f1",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "14px",
                        fontWeight: "500",
                      }}
                    >
                      Try Again
                    </button>
                  </div>
                ) : matchedJobs.length === 0 ? (
                  <div
                    className="no-jobs"
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                      padding: "60px 20px",
                      gap: "16px",
                    }}
                  >
                    <Briefcase size={48} color="#9ca3af" />
                    <p style={{ fontSize: "16px", color: "#666" }}>
                      No jobs found. Try updating your search criteria.
                    </p>
                  </div>
                ) : (
                  <div className="jobs-list">
                    {matchedJobs.map((job) => (
                      <div
                        key={job.id}
                        className="job-card"
                        onClick={() => setSelectedJob(job)}
                      >
                        <div className="job-header">
                          <div className="job-info">
                            <h3 className="job-title">{job.title}</h3>
                            <p className="job-company">{job.company}</p>
                          </div>
                          <div
                            className={`match-badge ${getMatchColor(
                              job.match
                            )}`}
                          >
                            <div className="match-percentage">{job.match}%</div>
                            <div className="match-label">Match</div>
                          </div>
                        </div>

                        <div className="job-meta">
                          <div className="job-meta-item">
                            <Briefcase className="icon-meta" />
                            {job.type}
                          </div>
                          <div className="job-meta-item">
                            <MapPin className="icon-meta" size={16} />
                            {job.location}
                          </div>
                          <div className="job-meta-item">
                            <Calendar className="icon-meta" size={16} />
                            {formatPostedDate(job.postedDate)}
                          </div>
                          <div className="job-salary">{job.salary}</div>
                        </div>

                        {/* {job.source && (
                          <div
                            className="job-source"
                            style={{
                              fontSize: "12px",
                              color: "#6366f1",
                              fontWeight: "500",
                              marginTop: "8px",
                              padding: "4px 8px",
                              background: "#ede9fe",
                              borderRadius: "4px",
                              display: "inline-block",
                            }}
                          >
                            📍 {job.source}
                          </div>
                        )} */}

                        <div className="job-actions">
                          <button
                            className="apply-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleApplyToJob(job);
                            }}
                            style={{
                              display: "flex",
                              alignItems: "center",
                              gap: "6px",
                            }}
                          >
                            Apply Now
                            <ExternalLink size={16} />
                          </button>
                          <button
                            className="details-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              navigate("/job-details", { state: { job } });
                            }}
                          >
                            View Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes spin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}
