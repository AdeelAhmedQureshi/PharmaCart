import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function UpdateProduct({ productId }) {
  const [product, setProduct] = useState(null);
  const categories = [
    'General', 'Allergy', 'Pain Relief', 'Mental Health',
    'Diabetes', 'Digestive Health', 'Vitamins',
    'Heart Health', 'Skin Care', 'Cold & Flu',
  ];

  // Fetch product details to pre-fill the form
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${productId}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  const formik = useFormik({
    enableReinitialize: true, // Allow form to reinitialize with fetched product data
    initialValues: {
      name: product?.name || '',
      strength: product?.strength || '',
      category: product?.category || 'All',
      price: product?.price || '',
      description: product?.description || '',
      image: null,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Product name is required'),
      strength: Yup.string().required('Strength is required'),
      category: Yup.string().required('Category is required'),
      price: Yup.number().required('Price is required').positive('Must be a positive number'),
      description: Yup.string().required('Description is required'),
    }),
    onSubmit: async (values) => {
      const formData = new FormData();
      formData.append('name', values.name);
      formData.append('strength', values.strength);
      formData.append('category', values.category);
      formData.append('price', values.price);
      formData.append('description', values.description);
      if (values.image) {
        formData.append('image', values.image); // Only append image if it is updated
      }

      try {
        const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
          method: 'PUT',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          alert('Product updated successfully!');
          console.log('Updated product:', data);
        } else {
          alert('Failed to update product');
        }
      } catch (error) {
        console.error('Error updating product:', error);
        alert('Error updating product');
      }
    },
  });

  if (!product) {
    return <p>Loading product details...</p>;
  }

  return (
    <div>
      <h1>Update Product</h1>
      <form onSubmit={formik.handleSubmit}>
        {/* Product Name */}
        <div>
          <label>Product Name</label>
          <input
            type="text"
            name="name"
            placeholder="e.g. Panadol"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.name && formik.errors.name && (
            <p>{formik.errors.name}</p>
          )}
        </div>

        {/* Strength */}
        <div>
          <label>Strength</label>
          <input
            type="text"
            name="strength"
            placeholder="e.g. 500mg"
            value={formik.values.strength}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.strength && formik.errors.strength && (
            <p>{formik.errors.strength}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label>Category</label>
          <select
            name="category"
            value={formik.values.category}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          >
            {categories.map((c, i) => (
              <option key={i} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div>
          <label>Price (Rs)</label>
          <input
            type="number"
            name="price"
            placeholder="e.g. 100"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.price && formik.errors.price && (
            <p>{formik.errors.price}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label>Description</label>
          <textarea
            name="description"
            placeholder="Write a few lines about the product"
            rows="3"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.touched.description && formik.errors.description && (
            <p>{formik.errors.description}</p>
          )}
        </div>

        {/* Product Image */}
        <div>
          <label>Product Image</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => formik.setFieldValue('image', e.target.files[0])}
            onBlur={formik.handleBlur}
          />
          {formik.touched.image && formik.errors.image && (
            <p>{formik.errors.image}</p>
          )}
        </div>

        {/* Submit */}
        <div>
          <button type="submit">Update Product</button>
        </div>
      </form>
    </div>
  );
}

export default UpdateProduct;