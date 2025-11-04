import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";
import { CartContext } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { updateProduct } = useContext(ProductContext);
  const { addToCart } = useContext(CartContext);

  const subtotal = product.price * product.quantity;
  const lowStock = product.quantity < 5;

  // 🛒 when user clicks Add to Cart
  function handleAddToCart() {
    if (product.quantity > 0) {
      addToCart(product);
      // decrease stock count by 1 in main product list
      updateProduct(product.id, { quantity: product.quantity - 1 });
    }
  }

  return (
    <div
      style={{
        border: "1px solid #eee",
        padding: 12,
        borderRadius: 8,
        boxShadow: "0 1px 3px rgba(0,0,0,0.03)",
        background: "#fff",
      }}
    >
      <img
        src={product.image}
        alt={product.name}
        style={{
          width: "100%",
          height: 160,
          objectFit: "cover",
          borderRadius: 6,
        }}
      />
      <h3 style={{ margin: "8px 0" }}>{product.name}</h3>
      <div style={{ fontSize: 14, color: "#555" }}>
        {product.category} • Rating: {product.rating}
      </div>

      <div style={{ marginTop: 8 }}>
        <div>Price: ${product.price.toFixed(2)}</div>
        <div>
          Quantity:{" "}
          <strong
            style={{
              color: product.quantity === 0 ? "#e74c3c" : "#2b2d42",
            }}
          >
            {product.quantity} left
          </strong>
        </div>
        <div>Subtotal: ${subtotal.toFixed(2)}</div>
      </div>

      {lowStock && product.quantity > 0 && (
        <div
          style={{
            marginTop: 8,
            color: "white",
            background: "#e67e22",
            padding: "6px 8px",
            borderRadius: 4,
            display: "inline-block",
          }}
        >
          Low Stock
        </div>
      )}

      {product.quantity === 0 && (
        <div
          style={{
            marginTop: 8,
            color: "white",
            background: "#e74c3c",
            padding: "6px 8px",
            borderRadius: 4,
            display: "inline-block",
          }}
        >
          Out of Stock
        </div>
      )}

      <div style={{ marginTop: 12, display: "flex", gap: 8 }}>
        <Link to={`/product/${product.id}`} style={{ textDecoration: "none" }}>
          <button>View Details</button>
        </Link>
        <button
          onClick={handleAddToCart}
          disabled={product.quantity === 0}
          style={{
            opacity: product.quantity === 0 ? 0.5 : 1,
            cursor: product.quantity === 0 ? "not-allowed" : "pointer",
          }}
        >
          {product.quantity === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
}
