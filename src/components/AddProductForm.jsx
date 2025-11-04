import React, { useState, useContext } from "react";
import { ProductContext } from "../context/ProductContext";
import { useNavigate } from "react-router-dom";

export default function AddProductForm() {
  const { addProduct } = useContext(ProductContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    image: "",
    name: "",
    category: "",
    description: "",
    specification: "",
    rating: "",
    price: "",
    quantity: ""
  });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  }

  function validate() {
    const errs = {};
    Object.entries(form).forEach(([k, v]) => {
      if (v === "" || v == null) errs[k] = "Required";
    });
    // numeric checks
    if (form.price && isNaN(Number(form.price))) errs.price = "Must be a number";
    if (form.quantity && !Number.isInteger(Number(form.quantity))) errs.quantity = "Must be an integer";
    if (form.rating && isNaN(Number(form.rating))) errs.rating = "Must be a number";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  }

  function submit(e) {
    e.preventDefault();
    if (!validate()) return;
    const newProduct = {
      image: form.image || "https://via.placeholder.com/150",
      name: form.name,
      category: form.category,
      description: form.description,
      specification: form.specification,
      rating: Number(form.rating),
      price: Number(form.price),
      quantity: Number(form.quantity)
    };
    addProduct(newProduct);
    navigate("/");
  }

  return (
    <form onSubmit={submit} style={{ maxWidth: 600 }}>
      <h2>Add New Product</h2>
      {[
        { label: "Image URL", name: "image" },
        { label: "Name", name: "name" },
        { label: "Category", name: "category" },
        { label: "Description", name: "description" },
        { label: "Specification", name: "specification" },
        { label: "Rating", name: "rating" },
        { label: "Price", name: "price" },
        { label: "Quantity", name: "quantity" }
      ].map(field => (
        <div key={field.name} style={{ marginBottom: 12 }}>
          <label style={{ display: "block", marginBottom: 4 }}>{field.label}</label>
          <input
            name={field.name}
            value={form[field.name]}
            onChange={handleChange}
            style={{ width: "100%", padding: 8 }}
            type={["price", "quantity", "rating"].includes(field.name) ? "number" : "text"}
          />
          {errors[field.name] && <div style={{ color: "red", marginTop: 4 }}>{errors[field.name]}</div>}
        </div>
      ))}
      <button type="submit">Add Product</button>
    </form>
  );
}
