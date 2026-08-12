import { useEffect, useState } from "react";

function Jobs() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedJob, setSelectedJob] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/jobs")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch jobs");
        }
        return response.json();
      })
      .then((data) => {
        setJobs(data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setError("Unable to load jobs. Make sure the Express server is running at http://localhost:5000.");
        setLoading(false);
      });
  }, []);

  const filteredJobs = jobs.filter((job) => {
    const query = searchTerm.toLowerCase();
    return (
      job.title?.toLowerCase().includes(query) ||
      job.company?.toLowerCase().includes(query) ||
      job.location?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="jobs-page">
      <section className="page-header">
        <div className="page-badge">💼 Career Opportunities</div>
        <h1>Available Jobs</h1>
        <p>
          Find opportunities and grow your career in the upcycling community.
        </p>
      </section>

      {/* Search & Filter Bar */}
      <div className="filter-bar">
        <div className="search-input-wrapper">
          <span className="search-icon">🔍</span>
          <input
            type="text"
            placeholder="Search by job title, company, or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          {searchTerm && (
            <button className="clear-search-btn" onClick={() => setSearchTerm("")}>
              ✕
            </button>
          )}
        </div>
      </div>

      {loading && (
        <div className="status-container">
          <div className="spinner"></div>
          <p className="status-text">Loading upcycling jobs...</p>
        </div>
      )}

      {error && (
        <div className="error-banner">
          <span className="error-icon">⚠️</span>
          <p>{error}</p>
        </div>
      )}

      {!loading && !error && filteredJobs.length === 0 && (
        <div className="empty-state">
          <span className="empty-icon">🔍</span>
          <h3>No jobs found</h3>
          <p>Try searching with a different job title or company location.</p>
          <button className="btn btn-secondary" onClick={() => setSearchTerm("")}>
            Reset Search
          </button>
        </div>
      )}

      {!loading && !error && filteredJobs.length > 0 && (
        <div className="jobs-container">
          {filteredJobs.map((job, index) => (
            <div className="job-card" key={index}>
              <div className="job-card-header">
                <div className="job-icon">💼</div>
                <span className="job-type-tag">Full-Time</span>
              </div>

              <h2>{job.title}</h2>

              <p className="job-company">
                <span className="company-icon">🏢</span> {job.company}
              </p>

              <p className="job-location">
                <span className="loc-icon">📍</span> {job.location}
              </p>

              <div className="job-card-footer">
                <button 
                  className="btn btn-primary btn-block"
                  onClick={() => setSelectedJob(job)}
                >
                  View Job
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Job Details Modal */}
      {selectedJob && (
        <div className="modal-overlay" onClick={() => setSelectedJob(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedJob(null)}>✕</button>
            <div className="modal-badge">💼 Job Details</div>
            <h2>{selectedJob.title}</h2>
            <div className="modal-meta">
              <p><strong>Company:</strong> {selectedJob.company}</p>
              <p><strong>Location:</strong> 📍 {selectedJob.location}</p>
            </div>
            <p className="modal-description">
              Join <strong>{selectedJob.company}</strong> in <strong>{selectedJob.location}</strong> to help lead sustainable upcycling projects, waste transformation, and green operations.
            </p>
            <div className="modal-actions">
              <button 
                className="btn btn-primary"
                onClick={() => {
                  alert(`Application submitted for ${selectedJob.title} at ${selectedJob.company}!`);
                  setSelectedJob(null);
                }}
              >
                Apply Now
              </button>
              <button className="btn btn-secondary" onClick={() => setSelectedJob(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Jobs;