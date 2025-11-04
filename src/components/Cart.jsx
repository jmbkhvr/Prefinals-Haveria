import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (cart.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "2rem" }}>
        <h2>Your Cart is Empty 🛒</h2>
        <Link to="/"><button>Go Shopping</button></Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <h2>Your Cart</h2>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr style={{ background: "#f8edeb" }}>
            <th style={{ padding: "8px" }}>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Subtotal</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {cart.map(item => (
            <tr key={item.id} style={{ borderBottom: "1px solid #eee" }}>
              <td style={{ padding: "8px" }}>{item.name}</td>
              <td>${item.price.toFixed(2)}</td>
              <td>
                <input
                  type="number"
                  min="1"
                  value={item.quantity}
                  style={{ width: "60px", textAlign: "center" }}
                  onChange={e => updateQuantity(item.id, Number(e.target.value))}
                />
              </td>
              <td>${(item.price * item.quantity).toFixed(2)}</td>
              <td>
                <button onClick={() => removeFromCart(item.id)}>Remove</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h3 style={{ textAlign: "right", marginTop: "1rem" }}>
        Total: ${total.toFixed(2)}
      </h3>

      <div style={{ textAlign: "right", marginTop: "1rem" }}>
        <button onClick={() => alert("Checkout feature coming soon!")}>Checkout</button>
        <button onClick={clearCart} style={{ marginLeft: "8px" }}>Clear Cart</button>
      </div>
    </div>
  );
}
