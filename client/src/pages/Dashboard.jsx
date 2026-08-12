import { useState } from "react";
import { Link } from "react-router-dom";

function Dashboard() {
  const [userProfile, setUserProfile] = useState({
    name: "ReLoop User",
    email: "user@example.com",
    role: "Sustainability Enthusiast",
    joined: "Member since 2026"
  });

  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(userProfile.name);
  const [tempEmail, setTempEmail] = useState(userProfile.email);

  const handleSaveProfile = (e) => {
    e.preventDefault();
    setUserProfile({
      ...userProfile,
      name: tempName,
      email: tempEmail
    });
    setIsEditing(false);
  };

  return (
    <div className="dashboard-page">
      {/* Page Header */}
      <section className="page-header">
        <div className="page-badge">👤 Account Management</div>
        <h1>My ReLoop Dashboard 👤</h1>
        <p>
          Manage your profile, jobs and sustainable activities.
        </p>
      </section>

      {/* Dashboard Layout */}
      <div className="dashboard-container">
        {/* Profile Card */}
        <div className="profile-card">
          <div className="profile-avatar-wrapper">
            <div className="profile-icon">👤</div>
            <span className="online-indicator"></span>
          </div>

          <h2>{userProfile.name}</h2>
          <p className="profile-email">{userProfile.email}</p>
          <span className="profile-role-badge">{userProfile.role}</span>
          <p className="profile-joined">{userProfile.joined}</p>

          <button 
            className="btn btn-secondary btn-block edit-profile-btn"
            onClick={() => setIsEditing(true)}
          >
            Edit Profile
          </button>
        </div>

        {/* Dashboard Content Cards */}
        <div className="dashboard-content">
          {/* Jobs Card */}
          <div className="dashboard-card">
            <div className="dashboard-card-icon">💼</div>
            <div className="dashboard-card-details">
              <h2>My Job Applications</h2>
              <p>You haven't applied for any jobs yet.</p>
              <Link to="/jobs" className="dash-link">
                Browse Jobs &rarr;
              </Link>
            </div>
          </div>

          {/* Collaborations Card */}
          <div className="dashboard-card">
            <div className="dashboard-card-icon">🤝</div>
            <div className="dashboard-card-details">
              <h2>My Collaborations</h2>
              <p>Find creators and businesses to collaborate with.</p>
              <Link to="/collaborate" className="dash-link">
                Find Collaborations &rarr;
              </Link>
            </div>
          </div>

          {/* Business Card */}
          <div className="dashboard-card">
            <div className="dashboard-card-icon">🏪</div>
            <div className="dashboard-card-details">
              <h2>My Business</h2>
              <p>Promote your sustainable business on ReLoop.</p>
              <Link to="/businesses" className="dash-link">
                Explore Businesses &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="modal-overlay" onClick={() => setIsEditing(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setIsEditing(false)}>✕</button>
            <div className="modal-badge">👤 Edit Profile</div>
            <h2>Update Profile Details</h2>
            <form onSubmit={handleSaveProfile} className="edit-profile-form">
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" 
                  value={tempName} 
                  onChange={(e) => setTempName(e.target.value)} 
                  required 
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" 
                  value={tempEmail} 
                  onChange={(e) => setTempEmail(e.target.value)} 
                  required 
                  className="form-input"
                />
              </div>

              <div className="modal-actions">
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;