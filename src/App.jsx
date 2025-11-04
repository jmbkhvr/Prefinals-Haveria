import React, { useContext } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { CartContext } from "./context/CartContext";  // ✅ import context
import ProductList from "./components/ProductList";
import ProductDetails from "./components/ProductDetails";
import AddProductForm from "./components/AddProductForm";
import Cart from "./components/Cart";

export default function App() {
  const { cart } = useContext(CartContext); // ✅ access cart

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div style={{ padding: 24 }}>
      <header>
        <h1>Product Management App</h1>
        <nav>
          <Link to="/">Products</Link>
          <Link to="/add">Add Product</Link>
          <Link to="/cart">
            Cart <span className="cart-badge">{cartCount}</span>
          </Link>
        </nav>
      </header>

      <main>
        <Routes>
          <Route path="/" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/add" element={<AddProductForm />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </main>
    </div>
  );
}
