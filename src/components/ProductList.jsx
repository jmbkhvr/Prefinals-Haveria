import React, { useContext, useMemo, useState } from "react";
import { ProductContext } from "../context/ProductContext";
import ProductCard from "./ProductCard";

export default function ProductList() {
  const { products } = useContext(ProductContext);
  const [categoryFilter, setCategoryFilter] = useState("All");


  const categories = useMemo(() => ["All", ...Array.from(new Set(products.map(p => p.category)))], [products]);


  const filtered = categoryFilter === "All" ? products : products.filter(p => p.category === categoryFilter);

  
  const overallTotal = products.reduce((sum, p) => sum + p.price * p.quantity, 0);

  return (
    <div>
      <section style={{ marginBottom: 16 }}>
        <label>
          Filter by category:{" "}
          <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
            {categories.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </label>
      </section>

      <section style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))" }}>
        {filtered.map(p => <ProductCard key={p.id} product={p} />)}
      </section>

      <footer style={{ marginTop: 24, padding: 12, borderTop: "1px solid #ddd" }}>
        <strong>Overall Total: </strong> ${overallTotal.toFixed(2)}
      </footer>
    </div>
  );
}
