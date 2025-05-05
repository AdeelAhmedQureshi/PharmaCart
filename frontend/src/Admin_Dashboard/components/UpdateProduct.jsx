import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams, useNavigate } from "react-router-dom";
import "./AddProduct.css";  // same css both addproduct and updateproduct page.

function UpdateProduct() {
  const { pid } = useParams();  //The useParams() hook returns an object with keys that match the param names you define in your routes.

  const navigate = useNavigate();
  const [initialValues, setInitialValues] = useState(null);

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

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/getproduct/${pid}`);
        const data = await response.json();
        console.log('fetching first product data ', data); //test 
        setInitialValues({
          name: data.name || "",
          strength: data.strength || "",
          category: data.category || "All",
          price: data.price || "",
          description: data.description || "",
          image: null,
        });
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };
    fetchProduct();
  }, [pid]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: initialValues
     || {
      name: "",
      strength: "",
      category: "All",
      price: "",
      description: "",
      image: null,   // initially null,not required filed for update, but will be updated when user selects a file.
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Product name is required"),
      strength: Yup.string().required("Strength is required"),
      category: Yup.string().required("Category is required"),
      price: Yup.number()
        .required("Price is required")
        .positive("Must be a positive number"),
      description: Yup.string().required("Description is required").min(10, "Description must be at least 10 characters"),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("strength", values.strength);
      formData.append("category", values.category);
      formData.append("price", values.price);
      formData.append("description", values.description);
      if (values.image) formData.append("image", values.image);

      try {
        const response = await fetch(`http://localhost:5000/api/products/updateproduct/${pid}`, {
          method: "PUT",
          body: formData,
        });

        if (response.ok) {
          alert("Product updated successfully!");
          navigate("/dashboard");
        } else {
          alert("Failed to update product");
        }
      } catch (error) {
        console.error("Error updating product:", error);
        alert("Error updating product");
      }
    },
  });

  if (!initialValues) return <p>Loading...</p>;

  return (
    <div>
      <form onSubmit={formik.handleSubmit} className="AddForm">
        <h1 className="AddProduct">Update Product</h1>

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
        </div>

        <div>
          <button type="submit" className="btn">
            Update
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateProduct;
