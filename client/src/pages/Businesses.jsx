import { useState } from "react";

function Businesses() {
  const businesses = [
    {
      name: "GreenCraft Studio",
      category: "Upcycled Home Decor",
      location: "Chennai",
      description: "Creates home decor products using discarded wood and other waste materials.",
      image: "https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "EcoCreate",
      category: "Recycled Products",
      location: "Coimbatore",
      description: "Creates useful everyday products from recycled and reusable materials.",
      image: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=600&q=80"
    },
    {
      name: "Reuse Works",
      category: "Furniture Upcycling",
      location: "Bangalore",
      description: "Transforms old furniture and waste materials into creative new products.",
      image: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=600&q=80"
    }
  ];

  const [selectedBusiness, setSelectedBusiness] = useState(null);

  return (
    <div className="businesses-page">
      <section className="page-header">
        <div className="page-badge">🏪 Sustainable Hub</div>
        <h1>Discover Sustainable Businesses 🏪</h1>
        <p>
          Explore small businesses and creators turning waste into useful products.
        </p>
      </section>

      <div className="business-grid">
        {businesses.map((business, index) => (
          <div className="business-card" key={index}>
            <div className="business-image-wrapper">
              <img 
                src={business.image} 
                alt={business.name} 
                className="business-image" 
              />
              <span className="business-category-badge">{business.category}</span>
            </div>

            <div className="business-content">
              <h2>{business.name}</h2>

              <p className="business-location">
                📍 {business.location}
              </p>

              <p className="business-description">
                {business.description}
              </p>

              <div className="business-card-footer">
                <button 
                  className="btn btn-primary btn-block"
                  onClick={() => setSelectedBusiness(business)}
                >
                  View Business
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Business Modal */}
      {selectedBusiness && (
        <div className="modal-overlay" onClick={() => setSelectedBusiness(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedBusiness(null)}>✕</button>
            <div className="modal-image-wrapper">
              <img src={selectedBusiness.image} alt={selectedBusiness.name} className="modal-img" />
            </div>
            <div className="modal-badge">{selectedBusiness.category}</div>
            <h2>{selectedBusiness.name}</h2>
            <p className="modal-loc">📍 {selectedBusiness.location}</p>
            <p className="modal-description">{selectedBusiness.description}</p>
            <div className="modal-actions">
              <button 
                className="btn btn-primary"
                onClick={() => {
                  alert(`Contacting ${selectedBusiness.name}...`);
                  setSelectedBusiness(null);
                }}
              >
                Contact Business
              </button>
              <button className="btn btn-secondary" onClick={() => setSelectedBusiness(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Businesses;