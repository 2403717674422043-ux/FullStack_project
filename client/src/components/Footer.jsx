import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            ♻️ ReLoop
          </Link>
          <p>
            Connecting job seekers, sustainable businesses, creators, and eco-conscious customers to turn waste into opportunity.
          </p>
        </div>

        <div className="footer-links-group">
          <h4>Platform Navigation</h4>
          <div className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/jobs">Jobs</Link>
            <Link to="/businesses">Businesses</Link>
            <Link to="/products">Products</Link>
            <Link to="/collaborate">Collaborate</Link>
            <Link to="/dashboard">Dashboard</Link>
          </div>
        </div>

        <div className="footer-links-group">
          <h4>Sustainability</h4>
          <p className="footer-info">
            Built with green technology principles & full-stack Node.js + React framework.
          </p>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} ReLoop. Sustainable Upcycling & Collaboration Platform.</p>
      </div>
    </footer>
  );
}

export default Footer;
