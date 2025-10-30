import React, { useState } from 'react';
import { Sparkles, User, LogOut, Bell, Shield, CreditCard, Briefcase, Mail, Phone, MapPin, Building, Globe, Lock, Eye, EyeOff, Camera, Check, X, Settings, Save, Download } from 'lucide-react';
import './SettingsProfilePage.css';
import { useNavigate } from "react-router-dom";

export default function SettingsProfilePage() {
  const [activeTab, setActiveTab] = useState('profile');
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [userRole] = useState('recruiter');
  const [profileImage, setProfileImage] = useState(null);
  const [saveSuccess, setSaveSuccess] = useState(false);
    const navigate = useNavigate();
  

  const [profileData, setProfileData] = useState({
    name: 'Sarah Johnson',
    email: 'sarah.johnson@company.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    company: 'Tech Innovations Inc.',
    website: 'www.techinnovations.com',
    bio: 'Experienced HR professional with 8+ years in talent acquisition and recruitment strategy.',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    emailNewApplicants: true,
    emailMatchAlerts: true,
    emailWeeklyReport: false,
    pushNewApplicants: true,
    pushMatchAlerts: false,
    pushMessages: true,
    smsImportant: false
  });

  const [preferences, setPreferences] = useState({
    language: 'English',
    timezone: 'PST (UTC-8)',
    dateFormat: 'MM/DD/YYYY',
    autoLogout: '30min',
    theme: 'dark'
  });

  const handleProfileChange = (field, value) => {
    setProfileData({ ...profileData, [field]: value });
  };

  const handleNotificationToggle = (field) => {
    setNotifications({ ...notifications, [field]: !notifications[field] });
  };

  const handlelogout = () => {
    navigate("/");
    localStorage.removeItem("token");
    localStorage.removeItem("userRole");
    localStorage.removeItem("resumeData");
    window.location.reload();
  };
  const handleSave = () => {
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleImageUpload = (e) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target.result);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'account', label: 'Account', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Shield },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ];

  return (
    <div className="page-container">
      {/* Top Navigation */}
      <nav className="top-nav">
        <div className="nav-content">
          <div className="nav-logo">
            <div className="logo-icon">
              <Sparkles className="icon-white" />
            </div>
            <span className="logo-text">ResuMatch AI</span>
          </div>
          <div className="nav-actions">
            <div className="user-badge">
              <User className="icon-gray" />
              <span className="user-name">{profileData.name}</span>
            </div>
            <button className="logout-btn" onClick={handlelogout}>
              <LogOut className="icon-medium" />
            </button>
          </div>
        </div>
      </nav>

      <div className="main-content">
        <div className="header-section">
          <div>
            <h1 className="page-title">Settings</h1>
            <p className="page-subtitle">Manage your account settings and preferences</p>
          </div>
          {saveSuccess && (
            <div className="success-badge">
              <Check className="icon-success" />
              <span className="success-text">Changes saved successfully!</span>
            </div>
          )}
        </div>

        <div className="content-grid">
          {/* Sidebar Navigation */}
          <div className="sidebar">
            <div className="sidebar-card">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`tab-button ${activeTab === tab.id ? 'tab-active' : 'tab-inactive'}`}
                >
                  <tab.icon className="icon-medium" />
                  <span className="tab-label">{tab.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="content-area">
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div className="tab-content">
                <div className="card">
                  <h2 className="section-title">Profile Information</h2>
                  
                  {/* Profile Picture */}
                  <div className="profile-header">
                    <div className="profile-picture-container">
                      <div className="profile-picture">
                        {profileImage ? (
                          <img src={profileImage} alt="Profile" className="profile-image" />
                        ) : (
                          <span className="profile-initials">
                            {profileData.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        )}
                      </div>
                      <label className="camera-button">
                        <Camera className="camera-icon" />
                        <input type="file" accept="image/*" onChange={handleImageUpload} className="file-input" />
                      </label>
                    </div>
                    <div>
                      <h3 className="profile-name">{profileData.name}</h3>
                      <p className="profile-role">{userRole === 'recruiter' ? 'Recruiter Account' : 'Candidate Account'}</p>
                      <button className="upload-link">
                        Upload new photo
                      </button>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="form-grid">
                    <div>
                      <label className="form-label">Full Name</label>
                      <div className="input-wrapper">
                        <User className="input-icon" />
                        <input
                          type="text"
                          value={profileData.name}
                          onChange={(e) => handleProfileChange('name', e.target.value)}
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="form-label">Email Address</label>
                      <div className="input-wrapper">
                        <Mail className="input-icon" />
                        <input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => handleProfileChange('email', e.target.value)}
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="form-label">Phone Number</label>
                      <div className="input-wrapper">
                        <Phone className="input-icon" />
                        <input
                          type="tel"
                          value={profileData.phone}
                          onChange={(e) => handleProfileChange('phone', e.target.value)}
                          className="form-input"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="form-label">Location</label>
                      <div className="input-wrapper">
                        <MapPin className="input-icon" />
                        <input
                          type="text"
                          value={profileData.location}
                          onChange={(e) => handleProfileChange('location', e.target.value)}
                          className="form-input"
                        />
                      </div>
                    </div>

                    {userRole === 'recruiter' && (
                      <>
                        <div>
                          <label className="form-label">Company Name</label>
                          <div className="input-wrapper">
                            <Building className="input-icon" />
                            <input
                              type="text"
                              value={profileData.company}
                              onChange={(e) => handleProfileChange('company', e.target.value)}
                              className="form-input"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="form-label">Website</label>
                          <div className="input-wrapper">
                            <Globe className="input-icon" />
                            <input
                              type="text"
                              value={profileData.website}
                              onChange={(e) => handleProfileChange('website', e.target.value)}
                              className="form-input"
                            />
                          </div>
                        </div>
                      </>
                    )}

                    <div className="full-width">
                      <label className="form-label">Bio</label>
                      <textarea
                        value={profileData.bio}
                        onChange={(e) => handleProfileChange('bio', e.target.value)}
                        rows="4"
                        className="form-textarea"
                      />
                    </div>
                  </div>

                  <div className="button-group">
                    <button onClick={handleSave} className="btn-primary">
                      <Save className="icon-medium" />
                      Save Changes
                    </button>
                    <button className="btn-secondary">
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Account Tab */}
            {activeTab === 'account' && (
              <div className="tab-content">
                <div className="card">
                  <h2 className="section-title">Account Preferences</h2>
                  
                  <div className="preferences-section">
                    <div>
                      <label className="form-label">Language</label>
                      <select className="form-select">
                        <option>English</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                      </select>
                    </div>

                    <div>
                      <label className="form-label">Timezone</label>
                      <select className="form-select">
                        <option>PST (UTC-8)</option>
                        <option>EST (UTC-5)</option>
                        <option>GMT (UTC+0)</option>
                        <option>CET (UTC+1)</option>
                      </select>
                    </div>

                    <div>
                      <label className="form-label">Date Format</label>
                      <select className="form-select">
                        <option>MM/DD/YYYY</option>
                        <option>DD/MM/YYYY</option>
                        <option>YYYY-MM-DD</option>
                      </select>
                    </div>

                    <div>
                      <label className="form-label">Auto Logout</label>
                      <select className="form-select">
                        <option>15 minutes</option>
                        <option>30 minutes</option>
                        <option>1 hour</option>
                        <option>Never</option>
                      </select>
                    </div>

                    <div>
                      <label className="form-label theme-label">Theme</label>
                      <div className="theme-grid">
                        <button className="theme-button theme-active">
                          <div className="theme-preview theme-dark"></div>
                          <span className="theme-name theme-name-active">Dark</span>
                        </button>
                        <button className="theme-button">
                          <div className="theme-preview theme-light"></div>
                          <span className="theme-name">Light</span>
                        </button>
                        <button className="theme-button">
                          <div className="theme-preview theme-auto"></div>
                          <span className="theme-name">Auto</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <button onClick={handleSave} className="btn-primary">
                    <Save className="icon-medium" />
                    Save Preferences
                  </button>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === 'notifications' && (
              <div className="tab-content">
                <div className="card">
                  <h2 className="section-title">Notification Settings</h2>
                  
                  <div className="notifications-section">
                    <div>
                      <h3 className="subsection-title">Email Notifications</h3>
                      <div className="notification-list">
                        {[
                          { key: 'emailNewApplicants', label: 'New applicants', desc: 'Get notified when someone applies to your job postings' },
                          { key: 'emailMatchAlerts', label: 'High match alerts', desc: 'Receive alerts for candidates with 90%+ match score' },
                          { key: 'emailWeeklyReport', label: 'Weekly summary', desc: 'Weekly report of your recruitment activity' }
                        ].map((item) => (
                          <div key={item.key} className="notification-item">
                            <div>
                              <p className="notification-label">{item.label}</p>
                              <p className="notification-desc">{item.desc}</p>
                            </div>
                            <button
                              onClick={() => handleNotificationToggle(item.key)}
                              className={`toggle-switch ${notifications[item.key] ? 'toggle-active' : 'toggle-inactive'}`}
                            >
                              <div className={`toggle-circle ${notifications[item.key] ? 'toggle-circle-active' : ''}`} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="subsection-title">Push Notifications</h3>
                      <div className="notification-list">
                        {[
                          { key: 'pushNewApplicants', label: 'New applicants', desc: 'Real-time push notifications for new applications' },
                          { key: 'pushMatchAlerts', label: 'Match alerts', desc: 'Get notified about high-quality matches' },
                          { key: 'pushMessages', label: 'Messages', desc: 'Notifications for new messages from candidates' }
                        ].map((item) => (
                          <div key={item.key} className="notification-item">
                            <div>
                              <p className="notification-label">{item.label}</p>
                              <p className="notification-desc">{item.desc}</p>
                            </div>
                            <button
                              onClick={() => handleNotificationToggle(item.key)}
                              className={`toggle-switch ${notifications[item.key] ? 'toggle-active' : 'toggle-inactive'}`}
                            >
                              <div className={`toggle-circle ${notifications[item.key] ? 'toggle-circle-active' : ''}`} />
                            </button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="subsection-title">SMS Notifications</h3>
                      <div className="notification-list">
                        <div className="notification-item">
                          <div>
                            <p className="notification-label">Important updates</p>
                            <p className="notification-desc">Receive SMS for critical account updates</p>
                          </div>
                          <button
                            onClick={() => handleNotificationToggle('smsImportant')}
                            className={`toggle-switch ${notifications.smsImportant ? 'toggle-active' : 'toggle-inactive'}`}
                          >
                            <div className={`toggle-circle ${notifications.smsImportant ? 'toggle-circle-active' : ''}`} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <button onClick={handleSave} className="btn-primary">
                    <Save className="icon-medium" />
                    Save Settings
                  </button>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === 'security' && (
              <div className="tab-content">
                <div className="card">
                  <h2 className="section-title">Change Password</h2>
                  
                  <div className="security-section">
                    <div>
                      <label className="form-label">Current Password</label>
                      <div className="input-wrapper">
                        <Lock className="input-icon" />
                        <input
                          type={showCurrentPassword ? 'text' : 'password'}
                          value={profileData.currentPassword}
                          onChange={(e) => handleProfileChange('currentPassword', e.target.value)}
                          className="form-input password-input"
                        />
                        <button
                          type="button"
                          onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          className="password-toggle"
                        >
                          {showCurrentPassword ? <EyeOff className="icon-medium" /> : <Eye className="icon-medium" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="form-label">New Password</label>
                      <div className="input-wrapper">
                        <Lock className="input-icon" />
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          value={profileData.newPassword}
                          onChange={(e) => handleProfileChange('newPassword', e.target.value)}
                          className="form-input password-input"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="password-toggle"
                        >
                          {showNewPassword ? <EyeOff className="icon-medium" /> : <Eye className="icon-medium" />}
                        </button>
                      </div>
                      <p className="password-hint">
                        Must be at least 8 characters with uppercase, lowercase, and numbers
                      </p>
                    </div>

                    <div>
                      <label className="form-label">Confirm New Password</label>
                      <div className="input-wrapper">
                        <Lock className="input-icon" />
                        <input
                          type="password"
                          value={profileData.confirmPassword}
                          onChange={(e) => handleProfileChange('confirmPassword', e.target.value)}
                          className="form-input"
                        />
                      </div>
                    </div>
                  </div>

                  <button onClick={handleSave} className="btn-primary">
                    Update Password
                  </button>
                </div>

                <div className="card">
                  <h2 className="section-title">Two-Factor Authentication</h2>
                  <p className="section-desc">Add an extra layer of security to your account</p>
                  
                  <div className="two-factor-item">
                    <div>
                      <p className="notification-label">Authenticator App</p>
                      <p className="notification-desc">Use an app to generate verification codes</p>
                    </div>
                    <button className="btn-enable">
                      Enable
                    </button>
                  </div>

                  <div className="two-factor-item">
                    <div>
                      <p className="notification-label">SMS Verification</p>
                      <p className="notification-desc">Receive codes via text message</p>
                    </div>
                    <button className="btn-enable-secondary">
                      Enable
                    </button>
                  </div>
                </div>

                <div className="danger-zone">
                  <h2 className="danger-title">Danger Zone</h2>
                  <p className="danger-desc">These actions are irreversible. Please proceed with caution.</p>
                  
                  <div className="danger-actions">
                    <div className="danger-item">
                      <div>
                        <p className="notification-label">Deactivate Account</p>
                        <p className="notification-desc">Temporarily disable your account</p>
                      </div>
                      <button className="btn-danger-secondary">
                        Deactivate
                      </button>
                    </div>

                    <div className="danger-item">
                      <div>
                        <p className="notification-label">Delete Account</p>
                        <p className="notification-desc">Permanently delete your account and all data</p>
                      </div>
                      <button className="btn-danger">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Billing Tab */}
            {activeTab === 'billing' && (
              <div className="tab-content">
                <div className="card">
                  <h2 className="section-title">Current Plan</h2>
                  
                  <div className="plan-card">
                    <div className="plan-header">
                      <div>
                        <h3 className="plan-name">Professional Plan</h3>
                        <p className="plan-desc">Perfect for growing teams</p>
                      </div>
                      <div className="plan-price-container">
                        <div className="plan-price">$99</div>
                        <div className="plan-period">per month</div>
                      </div>
                    </div>
                    
                    <div className="plan-features">
                      <div className="plan-feature">
                        <Check className="icon-check" />
                        <span>Unlimited job postings</span>
                      </div>
                      <div className="plan-feature">
                        <Check className="icon-check" />
                        <span>AI-powered matching</span>
                      </div>
                      <div className="plan-feature">
                        <Check className="icon-check" />
                        <span>Advanced analytics</span>
                      </div>
                      <div className="plan-feature">
                        <Check className="icon-check" />
                        <span>Priority support</span>
                      </div>
                    </div>

                    <div className="button-group">
                      <button className="btn-upgrade">
                        Upgrade Plan
                      </button>
                      <button className="btn-view-plans">
                        View All Plans
                      </button>
                    </div>
                  </div>

                  <div className="billing-info">
                    <div className="billing-info-row">
                      <h3 className="billing-label">Next billing date</h3>
                      <span className="billing-value">November 8, 2025</span>
                    </div>
                    <div className="billing-info-row">
                      <h3 className="billing-label">Payment method</h3>
                      <span className="billing-value">•••• •••• •••• 4242</span>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <h2 className="section-title">Payment Method</h2>
                  
                  <div className="payment-method">
                    <div className="payment-card">
                      <div className="payment-card-info">
                        <div className="card-icon">
                          <CreditCard className="icon-white" />
                        </div>
                        <div>
                          <p className="notification-label">Visa ending in 4242</p>
                          <p className="notification-desc">Expires 12/2026</p>
                        </div>
                      </div>
                      <div className="payment-actions">
                        <button className="btn-edit">
                          Edit
                        </button>
                        <button className="btn-edit">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>

                  <button className="btn-primary">
                    Add Payment Method
                  </button>
                </div>

                <div className="card">
                  <h2 className="section-title">Billing History</h2>
                  
                  <div className="billing-history">
                    {[
                      { date: 'Oct 8, 2025', amount: '$99.00', status: 'Paid', invoice: 'INV-001234' },
                      { date: 'Sep 8, 2025', amount: '$99.00', status: 'Paid', invoice: 'INV-001233' },
                      { date: 'Aug 8, 2025', amount: '$99.00', status: 'Paid', invoice: 'INV-001232' },
                      { date: 'Jul 8, 2025', amount: '$99.00', status: 'Paid', invoice: 'INV-001231' },
                    ].map((invoice, idx) => (
                      <div key={idx} className="invoice-item">
                        <div className="invoice-info">
                          <div className="invoice-icon">
                            <Check className="icon-success" />
                          </div>
                          <div>
                            <p className="notification-label">{invoice.invoice}</p>
                            <p className="notification-desc">{invoice.date}</p>
                          </div>
                        </div>
                        <div className="invoice-details">
                          <span className="invoice-amount">{invoice.amount}</span>
                          <span className="invoice-status">
                            {invoice.status}
                          </span>
                          <button className="download-btn">
                            <Download className="icon-medium" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}