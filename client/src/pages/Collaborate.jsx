import { useState } from "react";

function Collaborate() {
  const opportunities = [
    {
      title: "Looking for a Product Designer",
      person: "GreenCraft Studio",
      skill: "Product Design",
      location: "Chennai",
      description:
        "Looking for someone interested in designing creative products from recycled materials.",
    },
    {
      title: "Need a Social Media Partner",
      person: "EcoCreate",
      skill: "Digital Marketing",
      location: "Coimbatore",
      description:
        "Looking for a creative person to help promote sustainable products online.",
    },
    {
      title: "Upcycling Project Partner",
      person: "Reuse Works",
      skill: "Upcycling",
      location: "Bangalore",
      description:
        "Looking for creators interested in developing new products using discarded materials.",
    },
  ];

  const [connectedCollab, setConnectedCollab] = useState(null);

  return (
    <div className="collab-page">
      <section className="page-header">
        <div className="page-badge">🤝 Community Network</div>
        <h1>Collaborate & Connect 🤝</h1>
        <p>
          Meet creators, businesses and people who want to build sustainable ideas together.
        </p>
      </section>

      <div className="collab-grid">
        {opportunities.map((opportunity, index) => (
          <div className="collab-card" key={index}>
            <div className="collab-header-row">
              <div className="collab-icon-badge">
                🤝
              </div>
              <span className="collab-person-tag">{opportunity.person}</span>
            </div>

            <div className="collab-details">
              <h2>{opportunity.title}</h2>

              <div className="collab-meta">
                <span className="meta-badge skill-badge">
                  🛠️ {opportunity.skill}
                </span>

                <span className="meta-badge loc-badge">
                  📍 {opportunity.location}
                </span>
              </div>

              <p className="collab-desc">
                {opportunity.description}
              </p>
            </div>

            <div className="collab-card-footer">
              <button 
                className="btn btn-primary btn-block collab-button"
                onClick={() => setConnectedCollab(opportunity)}
              >
                Connect
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Connect Confirmation Modal */}
      {connectedCollab && (
        <div className="modal-overlay" onClick={() => setConnectedCollab(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setConnectedCollab(null)}>✕</button>
            <div className="modal-badge">🤝 Connection Request</div>
            <h2>{connectedCollab.title}</h2>
            <p className="modal-creator">Initiated by: <strong>{connectedCollab.person}</strong></p>
            <div className="modal-tags">
              <span className="meta-badge skill-badge">🛠️ {connectedCollab.skill}</span>
              <span className="meta-badge loc-badge">📍 {connectedCollab.location}</span>
            </div>
            <p className="modal-description">{connectedCollab.description}</p>
            <div className="modal-actions">
              <button 
                className="btn btn-primary"
                onClick={() => {
                  alert(`Connection request sent to ${connectedCollab.person}!`);
                  setConnectedCollab(null);
                }}
              >
                Send Request
              </button>
              <button className="btn btn-secondary" onClick={() => setConnectedCollab(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Collaborate;