import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import "./AddProduct.css";

function AddProduct() {
  const [serverError, setServerError] = useState(null);

  const categories = [
    "All",
    "Allergy",
    "Pain Relief",
    "Mental Health",
    "Diabetes",
    "Digestive ",
    "Vitamins",
    "Heart Health",
    "Skin Care",
    "Cold & Flu",
  ];

  const formik = useFormik({
    initialValues: {
      name: "",
      strength: "",
      category: "All",
      price: "",
      description: "",
      image: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Product name is required").min(2, "Product name must be at least 2 characters"),
      strength: Yup.string().required("Strength is required"),
      category: Yup.string().required("Category is required"),
      price: Yup.number()
        .required("Price is required")
        .positive("Must be a positive number"),
      description: Yup.string()
        .required("Description is required")
        .min(10, "Description must be at least 10 characters"),
      image: Yup.mixed().required("Product image is required"),
    }),
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setServerError(null);

      const allEmpty =
        values.name.trim() === '' &&
        values.strength.trim() === '' &&
        values.price === '' &&
        values.description.trim() === '' &&
        values.image === null;

      if (allEmpty) {
        setServerError("Please fill all the fields.");
        return;
      }

      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("strength", values.strength);
      formData.append("category", values.category);
      formData.append("price", values.price);
      formData.append("description", values.description);
      formData.append("image", values.image);

      try {
        const response = await fetch("http://localhost:5000/api/products/addproduct", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (response.ok) {
          alert("✅ Product added successfully!");
          resetForm();
        } else {
          setServerError(data.message || "Failed to add product");
        }
      } catch (error) {
        console.error("Error adding product:", error);
        setServerError("Something went wrong. Please try again.");
      }

      setSubmitting(false);
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="AddForm">
        <h1 className="AddProduct">Add Product</h1>

        {serverError && <div className="error-message">❌ {serverError}</div>}

        <div>
          <input
            type="text"
            name="name"
            placeholder="Product Name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="inputs"
          />
          {formik.touched.name && formik.errors.name && <p>{formik.errors.name}</p>}
        </div>

        <div>
          <input
            type="text"
            name="strength"
            placeholder="Strength"
            value={formik.values.strength}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="inputs"
          />
          {formik.touched.strength && formik.errors.strength && <p>{formik.errors.strength}</p>}
        </div>

        <div>
          <select
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="inputs"
          >
            {categories.map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div>
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="inputs"
          />
          {formik.touched.price && formik.errors.price && <p>{formik.errors.price}</p>}
        </div>

        <div>
          <textarea
            name="description"
            placeholder="Description"
            rows="3"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="inputs"
          />
          {formik.touched.description && formik.errors.description && <p>{formik.errors.description}</p>}
        </div>

        <div>
          <input
            type="file"
            name="image"
            accept="image/*"
            className="inputs"
            onChange={(e) => formik.setFieldValue("image", e.target.files[0])}
            onBlur={formik.handleBlur}
          />
          {formik.touched.image && formik.errors.image && <p>{formik.errors.image}</p>}
        </div>

        <div>
          <button type="submit" className="btn">
            Add
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddProduct;
