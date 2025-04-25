import React, { useState, useEffect } from 'react';

function DeleteProduct() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Fetch all products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/products');
        const data = await response.json();
        setProducts(data);
        setFilteredProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  // Handle search input
  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = products.filter((product) =>
      product.name.toLowerCase().includes(term)
    );
    setFilteredProducts(filtered);
  };

  // Handle delete product
  const handleDelete = async (productId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/products/${productId}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        alert('Product deleted successfully');
        setProducts(products.filter((product) => product._id !== productId));
        setFilteredProducts(filteredProducts.filter((product) => product._id !== productId));
      } else {
        console.error('Failed to delete product');
        alert('Failed to delete product');
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Error deleting product');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 px-6 py-10">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Delete Product</h1>

      {/* Search Bar */}
      <div className="mb-6 w-full max-w-4xl">
        <input
          type="text"
          placeholder="Search product by name"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full p-4 text-lg border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Product List */}
      <ul className="w-full max-w-4xl divide-y divide-gray-300">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <li
              key={product._id}
              className="flex justify-between items-center py-4"
            >
              <div>
                <strong className="text-xl text-gray-700">{product.name}</strong> -{' '}
                <span className="text-lg text-gray-500">${product.price}</span>
              </div>
              <button
                onClick={() => handleDelete(product._id)}
                className="bg-red-500 text-white px-6 py-2 text-lg rounded-lg hover:bg-red-600 transition duration-300"
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p className="text-lg text-gray-500 text-center py-4">No products found</p>
        )}
      </ul>
    </div>
  );
}

export default DeleteProduct;