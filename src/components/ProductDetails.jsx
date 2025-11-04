import React, { useContext } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { ProductContext } from "../context/ProductContext";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, updateProduct } = useContext(ProductContext);
  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <div>
        <p>Product not found.</p>
        <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    );
  }

  const subtotal = product.price * product.quantity;

  function increase() {
    updateProduct(product.id, { quantity: product.quantity + 1 });
  }
  function decrease() {
    updateProduct(product.id, { quantity: Math.max(0, product.quantity - 1) });
  }

  return (
    <div style={{ maxWidth: 800 }}>
      <Link to="/">← Back to products</Link>
      <div style={{ display: "flex", gap: 20, marginTop: 12 }}>
        <img src={product.image} alt={product.name} style={{ width: 320, height: 320, objectFit: "cover", borderRadius: 8 }} />
        <div>
          <h2>{product.name}</h2>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Price:</strong> ${product.price.toFixed(2)}</p>
          <p><strong>Quantity:</strong>
            <button onClick={decrease} style={{ marginLeft: 8 }}>−</button>
            <span style={{ margin: "0 8px" }}>{product.quantity}</span>
            <button onClick={increase}>+</button>
          </p>
          <p><strong>Subtotal:</strong> ${subtotal.toFixed(2)}</p>
          <p><strong>Specification:</strong> {product.specification}</p>
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Rating:</strong> {product.rating}</p>
        </div>
      </div>
    </div>
  );
}
