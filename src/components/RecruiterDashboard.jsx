import React, { useState } from 'react';
import { Sparkles, User, LogOut, Plus, Briefcase, Users, TrendingUp, Search, Filter, Download, Eye, Mail, Calendar, MapPin, DollarSign, Clock, Star, X } from 'lucide-react';
import './RecruiterDashboard.css';
import { useNavigate } from 'react-router-dom';

export default function RecruiterDashboard() {
  const [activeTab, setActiveTab] = useState('jobs');
  const [selectedJob, setSelectedJob] = useState(null);
  const [showJobForm, setShowJobForm] = useState(false);
  const [showCandidateModal, setShowCandidateModal] = useState(false);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const navigate = useNavigate();

  // Mock data
  const jobs = [
    { id: 1, title: 'Senior Frontend Developer', department: 'Engineering', applicants: 47, status: 'Active', posted: '2 days ago', location: 'Remote', salary: '$120k - $180k' },
    { id: 2, title: 'Full Stack Engineer', department: 'Engineering', applicants: 32, status: 'Active', posted: '5 days ago', location: 'Seattle, WA', salary: '$110k - $160k' },
    { id: 3, title: 'Product Designer', department: 'Design', applicants: 28, status: 'Active', posted: '1 week ago', location: 'San Francisco, CA', salary: '$100k - $140k' },
    { id: 4, title: 'DevOps Engineer', department: 'Engineering', applicants: 19, status: 'Closed', posted: '2 weeks ago', location: 'Remote', salary: '$130k - $170k' },
  ];

    const handlelogout = () => {
    navigate('/auth');
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    window.location.reload();
  };
  const candidates = [
    {
      id: 1,
      name: 'Sarah Johnson',
      match: 95,
      experience: '5 years',
      location: 'San Francisco, CA',
      skills: ['React', 'TypeScript', 'Node.js', 'AWS'],
      education: 'BS Computer Science',
      currentRole: 'Senior Frontend Developer at Tech Corp',
      email: 'sarah.j@email.com',
      summary: 'Highly skilled frontend developer with extensive React experience and strong TypeScript knowledge. Led multiple successful product launches.'
    },
    {
      id: 2,
      name: 'Michael Chen',
      match: 92,
      experience: '6 years',
      location: 'Seattle, WA',
      skills: ['React', 'Vue.js', 'JavaScript', 'Python'],
      education: 'MS Software Engineering',
      currentRole: 'Lead Developer at StartupXYZ',
      email: 'mchen@email.com',
      summary: 'Full-stack engineer with leadership experience. Strong problem-solving skills and proven track record of delivering scalable solutions.'
    },
    {
      id: 3,
      name: 'Emily Rodriguez',
      match: 88,
      experience: '4 years',
      location: 'Remote',
      skills: ['React', 'Next.js', 'GraphQL', 'MongoDB'],
      education: 'BS Computer Engineering',
      currentRole: 'Frontend Engineer at Digital Agency',
      email: 'emily.r@email.com',
      summary: 'Passionate about creating exceptional user experiences. Experienced in modern frontend frameworks and cloud technologies.'
    },
    {
      id: 4,
      name: 'David Kim',
      match: 85,
      experience: '3 years',
      location: 'Austin, TX',
      skills: ['React', 'JavaScript', 'Redux', 'Firebase'],
      education: 'BS Information Technology',
      currentRole: 'Software Developer at Tech Solutions',
      email: 'david.kim@email.com',
      summary: 'Results-driven developer with strong focus on code quality and testing. Quick learner and excellent team player.'
    },
    {
      id: 5,
      name: 'Jennifer Lee',
      match: 82,
      experience: '4 years',
      location: 'New York, NY',
      skills: ['React', 'Angular', 'TypeScript', 'Docker'],
      education: 'BS Computer Science',
      currentRole: 'UI Engineer at Enterprise Co',
      email: 'jlee@email.com',
      summary: 'Creative problem solver with expertise in building responsive and accessible web applications. Strong communication skills.'
    },
  ];

  const stats = [
    { label: 'Active Jobs', value: '12', icon: Briefcase, color: 'blue' },
    { label: 'Total Applicants', value: '247', icon: Users, color: 'purple' },
    { label: 'Avg. Match Rate', value: '86%', icon: TrendingUp, color: 'green' },
    { label: 'Interviews Scheduled', value: '34', icon: Calendar, color: 'orange' },
  ];

  const getMatchColor = (match) => {
    if (match >= 90) return 'match-high';
    if (match >= 80) return 'match-medium';
    return 'match-low';
  };

  const handleViewCandidates = (job) => {
    setSelectedJob(job);
    setActiveTab('candidates');
  };

  const handleViewCandidate = (candidate) => {
    setSelectedCandidate(candidate);
    setShowCandidateModal(true);
  };

  return (
    <div className="recruiter-dashboard">
      {/* Top Navigation */}
      <nav className="recruiter-nav">
        <div className="nav-content">
          <div className="logo-section">
            <div className="logo-icon recruiter-logo">
              <Sparkles className="icon-sparkles" />
            </div>
            <span className="logo-text">ResuMatch AI</span>
          </div>
          <div className="nav-actions">
            <div className="user-info">
              <User className="icon-user" />
              <span className="user-name">HR Manager</span>
            </div>
            <button className="logout-btn" onClick={handlelogout}>
              <LogOut className="icon-logout" />
            </button>
          </div>
        </div>
      </nav>

      <div className="main-content">
        {/* Stats Cards */}
        <div className="stats-grid">
          {stats.map((stat, idx) => (
            <div key={idx} className="stat-card">
              <div className="stat-header">
                <div className={`stat-icon stat-icon-${stat.color}`}>
                  <stat.icon className={`icon-stat icon-${stat.color}`} />
                </div>
              </div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tab Navigation */}
        <div className="tab-container">
          <div className="tab-buttons">
            <button
              onClick={() => setActiveTab('jobs')}
              className={`tab-button ${activeTab === 'jobs' ? 'active' : ''}`}
            >
              Job Postings
            </button>
            <button
              onClick={() => setActiveTab('candidates')}
              className={`tab-button ${activeTab === 'candidates' ? 'active' : ''}`}
            >
              Candidates
            </button>
          </div>
          
          {activeTab === 'jobs' && (
            <button
              onClick={() => setShowJobForm(!showJobForm)}
              className="post-job-btn"
            >
              <Plus className="icon-plus" />
              Post New Job
            </button>
          )}
        </div>

        {/* Job Form */}
        {showJobForm && activeTab === 'jobs' && (
          <div className="job-form-card">
            <h2 className="form-title">Post New Job</h2>
            <div className="form-grid">
              <div>
                <label className="form-label">Job Title</label>
                <input type="text" placeholder="e.g. Senior Frontend Developer" className="form-input" />
              </div>
              <div>
                <label className="form-label">Department</label>
                <input type="text" placeholder="e.g. Engineering" className="form-input" />
              </div>
              <div>
                <label className="form-label">Location</label>
                <input type="text" placeholder="e.g. Remote" className="form-input" />
              </div>
              <div>
                <label className="form-label">Salary Range</label>
                <input type="text" placeholder="e.g. $120k - $180k" className="form-input" />
              </div>
              <div className="form-full">
                <label className="form-label">Job Description</label>
                <textarea rows="4" placeholder="Describe the role, requirements, and responsibilities..." className="form-textarea"></textarea>
              </div>
              <div className="form-full">
                <label className="form-label">Required Skills (comma separated)</label>
                <input type="text" placeholder="e.g. React, TypeScript, Node.js, AWS" className="form-input" />
              </div>
            </div>
            <div className="form-actions">
              <button className="publish-btn">
                Publish Job
              </button>
              <button onClick={() => setShowJobForm(false)} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        )}

        {/* Job Postings Tab */}
        {activeTab === 'jobs' && (
          <div className="content-card">
            <div className="content-header">
              <h2 className="content-title">Active Job Postings</h2>
              <div className="search-wrapper">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Search jobs..."
                  className="search-input"
                />
              </div>
            </div>

            <div className="jobs-list">
              {jobs.map((job) => (
                <div key={job.id} className="job-item">
                  <div className="job-item-header">
                    <div className="job-item-info">
                      <div className="job-title-row">
                        <h3 className="job-item-title">{job.title}</h3>
                        <span className={`status-badge ${job.status === 'Active' ? 'status-active' : 'status-closed'}`}>
                          {job.status}
                        </span>
                      </div>
                      <div className="job-details">
                        <div className="job-detail-item">
                          <Briefcase className="icon-detail" />
                          {job.department}
                        </div>
                        <div className="job-detail-item">
                          <MapPin className="icon-detail" />
                          {job.location}
                        </div>
                        <div className="job-detail-item">
                          <DollarSign className="icon-detail" />
                          {job.salary}
                        </div>
                        <div className="job-detail-item">
                          <Clock className="icon-detail" />
                          Posted {job.posted}
                        </div>
                      </div>
                    </div>
                    <div className="applicants-count">
                      <div className="applicants-number">{job.applicants}</div>
                      <div className="applicants-label">Applicants</div>
                    </div>
                  </div>
                  
                  <div className="job-item-actions">
                    <button
                      onClick={() => handleViewCandidates(job)}
                      className="view-candidates-btn"
                    >
                      View Candidates
                    </button>
                    <button className="edit-job-btn">
                      Edit Job
                    </button>
                    <button className="close-job-btn">
                      Close
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Candidates Tab */}
        {activeTab === 'candidates' && (
          <div className="content-card">
            <div className="content-header">
              <div>
                <h2 className="content-title">
                  {selectedJob ? `Candidates for ${selectedJob.title}` : 'All Candidates'}
                </h2>
                <p className="content-subtitle">Ranked by AI match score</p>
              </div>
              <div className="header-actions">
                <button className="filter-btn">
                  <Filter className="icon-action" />
                  Filter
                </button>
                <button className="export-btn">
                  <Download className="icon-action" />
                  Export
                </button>
              </div>
            </div>

            <div className="candidates-list">
              {candidates.map((candidate, idx) => (
                <div key={candidate.id} className="candidate-item">
                  <div className="candidate-content">
                    <div className="candidate-avatar">
                      {candidate.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    
                    <div className="candidate-details">
                      <div className="candidate-header">
                        <div>
                          <div className="candidate-name-row">
                            <h3 className="candidate-name">{candidate.name}</h3>
                            {idx === 0 && <Star className="icon-star" />}
                          </div>
                          <p className="candidate-role">{candidate.currentRole}</p>
                          <div className="candidate-meta">
                            <span>{candidate.experience} experience</span>
                            <span>•</span>
                            <span>{candidate.education}</span>
                            <span>•</span>
                            <span>{candidate.location}</span>
                          </div>
                        </div>
                        <div className={`match-badge ${getMatchColor(candidate.match)}`}>
                          <div className="match-percentage">{candidate.match}%</div>
                          <div className="match-label">Match</div>
                        </div>
                      </div>

                      <p className="candidate-summary">{candidate.summary}</p>

                      <div className="candidate-skills">
                        {candidate.skills.map((skill, idx) => (
                          <span key={idx} className="skill-tag">
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="candidate-actions">
                        <button
                          onClick={() => handleViewCandidate(candidate)}
                          className="view-profile-btn"
                        >
                          <Eye className="icon-btn" />
                          View Profile
                        </button>
                        <button className="contact-btn">
                          <Mail className="icon-btn" />
                          Contact
                        </button>
                        <button className="download-resume-btn">
                          <Download className="icon-btn" />
                          Resume
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Candidate Detail Modal */}
      {showCandidateModal && selectedCandidate && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="modal-title">Candidate Profile</h2>
              <button onClick={() => setShowCandidateModal(false)} className="modal-close">
                <X className="icon-close" />
              </button>
            </div>
            
            <div className="modal-body">
              <div className="modal-profile-header">
                <div className="modal-avatar">
                  {selectedCandidate.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div className="modal-profile-info">
                  <h3 className="modal-profile-name">{selectedCandidate.name}</h3>
                  <p className="modal-profile-role">{selectedCandidate.currentRole}</p>
                  <div className="modal-profile-contact">
                    <span>{selectedCandidate.email}</span>
                    <span>•</span>
                    <span>{selectedCandidate.location}</span>
                  </div>
                  <div className={`modal-match-badge ${getMatchColor(selectedCandidate.match)}`}>
                    <span className="modal-match-score">{selectedCandidate.match}%</span>
                    <span className="modal-match-text">AI Match Score</span>
                  </div>
                </div>
              </div>

              <div className="modal-sections">
                <div className="modal-section">
                  <h4 className="modal-section-title">Summary</h4>
                  <p className="modal-section-text">{selectedCandidate.summary}</p>
                </div>

                <div className="modal-section">
                  <h4 className="modal-section-title">Skills</h4>
                  <div className="modal-skills">
                    {selectedCandidate.skills.map((skill, idx) => (
                      <span key={idx} className="modal-skill-tag">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="modal-section">
                  <h4 className="modal-section-title">Experience</h4>
                  <p className="modal-section-text">{selectedCandidate.experience}</p>
                </div>

                <div className="modal-section">
                  <h4 className="modal-section-title">Education</h4>
                  <p className="modal-section-text">{selectedCandidate.education}</p>
                </div>

                <div className="modal-actions">
                  <button className="schedule-btn">
                    Schedule Interview
                  </button>
                  <button className="download-btn">
                    Download Resume
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}