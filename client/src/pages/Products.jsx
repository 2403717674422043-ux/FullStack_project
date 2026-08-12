import { useState } from "react";

function Products() {
  const products = [
    {
      name: "Recycled Bottle Planter",
      category: "Home Decor",
      price: "₹250",
      seller: "GreenCraft Studio",
      image:
        "https://images.unsplash.com/photo-1485955900006-10f4d324d411?auto=format&fit=crop&w=600&q=80",
      description: "Handcrafted eco-friendly plant containers made from reclaimed plastic bottles and glass jars."
    },
    {
      name: "Upcycled Wooden Table",
      category: "Furniture",
      price: "₹1,800",
      seller: "Reuse Works",
      image:
        "https://images.unsplash.com/photo-1532372320572-cda25653a26d?auto=format&fit=crop&w=600&q=80",
      description: "Restored rustic wooden table created entirely from discarded shipping pallets and reclaimed timber."
    },
    {
      name: "Recycled Fabric Bag",
      category: "Accessories",
      price: "₹400",
      seller: "EcoCreate",
      image:
        "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?auto=format&fit=crop&w=600&q=80",
      description: "Durable and stylish tote bag stitched from leftover textile scraps and recycled cotton canvas."
    },
  ];

  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <div className="products-page">
      {/* Page heading */}
      <section className="page-header">
        <div className="page-badge">🛍️ Marketplace</div>
        <h1>Discover Upcycled Products 🛍️</h1>
        <p>
          Find useful products created from recycled and discarded materials.
        </p>
      </section>

      {/* Products Grid */}
      <div className="product-grid">
        {products.map((product, index) => (
          <div className="product-card" key={index}>
            {/* Product image container */}
            <div className="product-image-container">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <span className="product-category-tag">{product.category}</span>
            </div>

            {/* Product information */}
            <div className="product-content">
              <h2>{product.name}</h2>

              <p className="product-seller">
                <span className="seller-icon">🏬</span> Seller: <strong>{product.seller}</strong>
              </p>

              <div className="product-bottom">
                <div className="product-price">
                  <span>Price</span>
                  <strong>{product.price}</strong>
                </div>

                <button 
                  className="btn btn-primary"
                  onClick={() => setSelectedProduct(product)}
                >
                  View Product
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="modal-overlay" onClick={() => setSelectedProduct(null)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedProduct(null)}>✕</button>
            <div className="modal-image-wrapper">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="modal-img" />
            </div>
            <div className="modal-badge">{selectedProduct.category}</div>
            <h2>{selectedProduct.name}</h2>
            <p className="modal-seller-info">Crafted by: <strong>{selectedProduct.seller}</strong></p>
            <p className="modal-description">{selectedProduct.description}</p>
            <div className="modal-price-row">
              <span className="modal-price-label">Price:</span>
              <span className="modal-price-value">{selectedProduct.price}</span>
            </div>
            <div className="modal-actions">
              <button 
                className="btn btn-primary"
                onClick={() => {
                  alert(`Thank you for your interest in ${selectedProduct.name}! Contacting seller ${selectedProduct.seller}.`);
                  setSelectedProduct(null);
                }}
              >
                Inquire / Buy Now
              </button>
              <button className="btn btn-secondary" onClick={() => setSelectedProduct(null)}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Products;