import React, { createContext, useState } from "react";
import initialProducts from "../data/products";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState(initialProducts);


  function addProduct(newProduct) {
    const id = Date.now().toString();
    setProducts(prev => [...prev, { ...newProduct, id }]);
  }


  function updateProduct(id, updates) {
    setProducts(prev => prev.map(p => (p.id === id ? { ...p, ...updates } : p)));
  }

  return (
    <ProductContext.Provider value={{ products, addProduct, updateProduct }}>
      {children}
    </ProductContext.Provider>
  );
}
