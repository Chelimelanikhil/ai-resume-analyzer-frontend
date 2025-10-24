import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Mail, Lock, User, Briefcase, Users, Eye, EyeOff, ArrowRight, Check } from 'lucide-react';
import './AuthPages.css';
import { login } from '../Services/api';

export default function AuthPages({ onLoginSuccess }) {
  const navigate = useNavigate();
  const [authMode, setAuthMode] = useState('role');
  const [selectedRole, setSelectedRole] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    company: ''
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    setTimeout(() => {
      setAuthMode('signup');
    }, 300);
  };
const handleSubmit = async () => {
  setErrorMessage('');
  try {
    if (authMode === 'login') {
      const data = await login(formData.email, formData.password);

      console.log('Login data:', data);

      // if (!data || !data.success) {
      //   setErrorMessage(data?.error || 'Login failed');
      //   return;
      // }

      const user = data.user;
      if (!user) {
        setErrorMessage(data.error);
        return;
      }

      // Save token & user info
      localStorage.setItem('token', data.token);
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('user', JSON.stringify(user));

      if (onLoginSuccess) onLoginSuccess(user.role);

      if (user.role === 'candidate') navigate('/dashboard');
      else navigate('/recruiter');
    } else {
      console.log('Signup data:', formData);
    }
  } catch (err) {
    setErrorMessage(err.message || 'Something went wrong. Please try again.');
  }
};






  return (
    <div className="auth-page-container">
      <div className="auth-background">
        <div className="auth-blob-1"></div>
        <div className="auth-blob-2"></div>
      </div>

      <div className="auth-content-wrapper">
        <div className="auth-header">
          <div className="auth-logo-wrapper">
            <div className="auth-logo-box">
              <Sparkles className="w-7 h-7 text-white" />
            </div>
            <span className="auth-logo-title">ResuMatch AI</span>
          </div>
          <p className="auth-subtitle">
            {authMode === 'role' 
              ? 'Choose your account type' 
              : authMode === 'login' 
              ? 'Welcome back! Please login to continue' 
              : 'Create your account to get started'}
          </p>
        </div>

        {authMode === 'role' && (
          <div className="role-selection-container">
            <div
              onClick={() => handleRoleSelect('candidate')}
              className={`role-card candidate ${selectedRole === 'candidate' ? 'selected' : ''}`}
            >
              <div className="role-card-overlay"></div>
              <div className="role-card-content">
                <div className="role-icon-container candidate">
                  <Briefcase className="w-8 h-8 text-blue-400" />
                </div>
                <div className="role-card-text">
                  <h3 className="role-card-title">I'm a Candidate</h3>
                  <p className="role-card-description">
                    Upload your resume, get AI insights, and discover matching job opportunities
                  </p>
                  <div className="role-card-badges">
                    <span className="role-badge candidate">Resume Analysis</span>
                    <span className="role-badge candidate">Job Matching</span>
                    <span className="role-badge candidate">AI Insights</span>
                  </div>
                </div>
                {selectedRole === 'candidate' && (
                  <div className="role-check-badge candidate">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
            </div>

            <div
              onClick={() => handleRoleSelect('recruiter')}
              className={`role-card recruiter ${selectedRole === 'recruiter' ? 'selected' : ''}`}
            >
              <div className="role-card-overlay"></div>
              <div className="role-card-content">
                <div className="role-icon-container recruiter">
                  <Users className="w-8 h-8 text-purple-400" />
                </div>
                <div className="role-card-text">
                  <h3 className="role-card-title">I'm a Recruiter</h3>
                  <p className="role-card-description">
                    Post jobs, find top talent, and let AI rank candidates based on perfect matches
                  </p>
                  <div className="role-card-badges">
                    <span className="role-badge recruiter">Job Posting</span>
                    <span className="role-badge recruiter">AI Ranking</span>
                    <span className="role-badge recruiter">Candidate Search</span>
                  </div>
                </div>
                {selectedRole === 'recruiter' && (
                  <div className="role-check-badge recruiter">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                )}
              </div>
            </div>

            <button
              onClick={() => setAuthMode('login')}
              className="already-account-button"
            >
              Already have an account? <span className="already-account-highlight">Login</span>
            </button>
          </div>
        )}

        {authMode === 'login' && (
          <div className="auth-form-container">
            <div className="form-fields">
              {errorMessage && <p className="form-error">{errorMessage}</p>}
              <div className="form-field">
                <label className="form-label">Email Address</label>
                <div className="input-wrapper">
                  <Mail className="input-icon" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">Password</label>
                <div className="input-wrapper">
                  <Lock className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter your password"
                    className="form-input has-toggle"
                  />
                  {/* <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button> */}
                </div>
              </div>

              <div className="form-options">
                <label className="checkbox-label">
                  <input type="checkbox" className="form-checkbox" />
                  <span className="checkbox-text">Remember me</span>
                </label>
                <button type="button" className="forgot-password-btn">
                  Forgot password?
                </button>
              </div>

              <button
                onClick={handleSubmit}
                className="submit-button primary"
              >
                Sign In
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="auth-link-section">
              <p className="auth-link-text">
                Don't have an account?{' '}
                <button
                  onClick={() => setAuthMode('role')}
                  className="auth-link-button"
                >
                  Sign up
                </button>
              </p>
            </div>

            <div className="auth-divider">
              <div className="divider-line">
                <div className="divider-border"></div>
              </div>
              <div className="divider-text-wrapper">
                <span className="divider-text">Or continue with</span>
              </div>
            </div>

            <div className="social-login-grid">
              <button className="social-login-button">
                <svg className="social-icon" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Google
              </button>
              <button className="social-login-button">
                <svg className="social-icon" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                GitHub
              </button>
            </div>
          </div>
        )}

        {authMode === 'signup' && (
          <div className="auth-form-container">
            <div>
              <div className={`form-role-badge ${selectedRole}`}>
                {selectedRole === 'candidate' ? <Briefcase className="w-4 h-4" /> : <Users className="w-4 h-4" />}
                <span className="form-role-badge-text">
                  {selectedRole === 'candidate' ? 'Candidate Account' : 'Recruiter Account'}
                </span>
              </div>
            </div>

            <div className="form-fields">
              <div className="form-field">
                <label className="form-label">Full Name</label>
                <div className="input-wrapper">
                  <User className="input-icon" />
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="form-input"
                  />
                </div>
              </div>

              <div className="form-field">
                <label className="form-label">Email Address</label>
                <div className="input-wrapper">
                  <Mail className="input-icon" />
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Enter your email"
                    className="form-input"
                  />
                </div>
              </div>

              {selectedRole === 'recruiter' && (
                <div className="form-field">
                  <label className="form-label">Company Name</label>
                  <div className="input-wrapper">
                    <Briefcase className="input-icon" />
                    <input
                      type="text"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                      placeholder="Enter your company name"
                      className="form-input"
                    />
                  </div>
                </div>
              )}

              <div className="form-field">
                <label className="form-label">Password</label>
                <div className="input-wrapper">
                  <Lock className="input-icon" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Create a strong password"
                    className="form-input has-toggle"
                  />
                  {/* <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button> */}
                </div>
                <p className="password-hint">
                  Must be at least 8 characters with uppercase, lowercase, and numbers
                </p>
              </div>

              <label className="terms-label">
                <input type="checkbox" className="terms-checkbox" />
                <span className="terms-text">
                  I agree to the <button type="button" className="terms-link">Terms of Service</button> and <button type="button" className="terms-link">Privacy Policy</button>
                </span>
              </label>

              <button
                onClick={handleSubmit}
                className={`submit-button ${selectedRole}`}
              >
                Create Account
                <ArrowRight className="w-5 h-5" />
              </button>
            </div>

            <div className="auth-link-section">
              <p className="auth-link-text">
                Already have an account?{' '}
                <button
                  onClick={() => setAuthMode('login')}
                  className="auth-link-button"
                >
                  Sign in
                </button>
              </p>
            </div>

            <button
              onClick={() => {
                setSelectedRole(null);
                setAuthMode('role');
              }}
              className="change-account-button"
            >
              Change account type
            </button>
          </div>
        )}
      </div>
    </div>
  );
}