import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">♻️ Sustainable Upcycling Platform</div>
          <h1>
            Turn Waste Into
            <span className="gradient-text"> Opportunity ♻️</span>
          </h1>

          <p>
            ReLoop connects job seekers, small businesses, creators and customers through waste upcycling and sustainable ideas.
          </p>

          <div className="hero-buttons">
            <Link to="/jobs" className="btn btn-primary">Find Jobs</Link>
            <Link to="/businesses" className="btn btn-secondary">Explore Businesses</Link>
          </div>
        </div>

        <div className="hero-image-wrapper">
          <img
            src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?auto=format&fit=crop&w=800&q=80"
            alt="Sustainable Recycling & Upcycling"
            className="hero-image"
          />
          <div className="hero-floating-card">
            <span className="floating-icon">🌱</span>
            <div>
              <strong>Eco Impact</strong>
              <p>Promoting Circular Economy</p>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features">
        <div className="section-header">
          <h2>What Can You Do?</h2>
          <p>Explore opportunities to connect, build, and support circular initiatives.</p>
        </div>

        <div className="feature-grid">
          <Link to="/jobs" className="feature-card">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">💼</span>
            </div>
            <h3>Find Jobs</h3>
            <p>
              Discover job opportunities with businesses working in recycling and upcycling.
            </p>
            <span className="feature-link">Browse Openings &rarr;</span>
          </Link>

          <Link to="/businesses" className="feature-card">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">🏪</span>
            </div>
            <h3>Promote Your Business</h3>
            <p>
              Small businesses can showcase their products and sustainable ideas.
            </p>
            <span className="feature-link">Explore Hub &rarr;</span>
          </Link>

          <Link to="/products" className="feature-card">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">🛍️</span>
            </div>
            <h3>Discover Products</h3>
            <p>
              Explore useful products created from recycled and discarded materials.
            </p>
            <span className="feature-link">Shop Upcycled &rarr;</span>
          </Link>

          <Link to="/collaborate" className="feature-card">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">🤝</span>
            </div>
            <h3>Collaborate</h3>
            <p>
              Connect with creators and businesses to develop new sustainable ideas.
            </p>
            <span className="feature-link">Join Projects &rarr;</span>
          </Link>
        </div>
      </section>

      {/* Why ReLoop Section */}
      <section className="about">
        <div className="about-container">
          <div className="about-content">
            <h2>Why ReLoop?</h2>
            <p>
              ReLoop creates a simple platform where people can find opportunities, promote sustainable businesses, discover upcycled products and connect with others who share similar ideas.
            </p>
            <div className="about-highlights">
              <div className="highlight-item">
                <span className="highlight-num">100%</span>
                <span className="highlight-label">Eco-Focused</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-num">Local</span>
                <span className="highlight-label">Community Action</span>
              </div>
              <div className="highlight-item">
                <span className="highlight-num">Direct</span>
                <span className="highlight-label">Collaboration</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;