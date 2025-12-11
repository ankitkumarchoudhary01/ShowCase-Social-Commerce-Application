// src/pages/Shop.jsx
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useSearch } from "../context/SearchContext";
import PageWrapper from "../components/PageWrapper";
import axios from "axios";

function Shop() {
  const { addToCart, cartItems = [] } = useCart();
  const { searchQuery } = useSearch();

  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const observer = useRef();

  console.log("Products fetched")

  const fetchProducts = async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const res = await axios.get(`http://localhost:5000/api/products`, {
        params: { page, limit: 4 },
      });

      const data = res.data;
      const newProducts = Array.isArray(data.posts) ? data.posts : [];

      setProducts((prev) => {
      const ids = new Set(prev.map((p) => p._id)); // or product.id
      const filtered = newProducts.filter((p) => !ids.has(p._id));
      return [...prev, ...filtered];
});

      setHasMore(data.hasMore || false);
    } catch (error) {
      console.error("Error fetching products:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  // Infinite scroll observer
  const lastProductRef = useRef();
  useEffect(() => {
    if (loading) return;
    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && hasMore) {
        setPage((prev) => prev + 1);
      }
    });

    if (lastProductRef.current) {
      observer.current.observe(lastProductRef.current);
    }
  }, [loading, hasMore]);
const filteredProducts =
  searchQuery.trim() === ""
    ? products
    : products.filter((product) =>
        product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand?.toLowerCase().includes(searchQuery.toLowerCase())
      );



  return (
    <PageWrapper>
      <div className="min-h-screen w-full bg-pink-200 p-6">
        <h2 className="text-5xl font-bold text-center mb-6 text-pink-600">
          Trending Now
        </h2>

        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-7">
            {filteredProducts.map((product, index) => {
              const alreadyInCart = cartItems.some(
                (item) => item.id === product.id
              );

              const isLastProduct = index === filteredProducts.length - 1;

              return (
                <div
                  key={product.id}
                  ref={isLastProduct ? lastProductRef : null}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 relative overflow-hidden border-2 border-red-300 hover:border-red-600"
                >
                  {/* Badge */}
                  <div className="absolute top-2 left-2 bg-yellow-400 text-white text-xs font-bold px-2 py-1 rounded">
                    {product.isTrending ? "Trending" : "New"}
                  </div>

                  <Link to={`/products/${product._id}`} className="block p-4">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-53 object-contain rounded-md mb-3"
                    />
                    <h2 className="text-lg font-semibold text-gray-800">
                      {product.name}
                    </h2>
                    <p className="text-sm text-gray-500 mb-1">
                      Brand: {product.brand}
                    </p>
                    <p className="text-pink-600 font-bold text-lg mb-2">
                      ₹{product.price}
                    </p>

                    {/* Rating */}
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, index) => (
                        <span key={index} className="text-yellow-400 text-sm">
                          ★
                        </span>
                      ))}
                      <span className="text-gray-500 text-xs ml-1">
                        ({product.rating})
                      </span>
                    </div>
                  </Link>

                  <div className="px-4 pb-4">
                    {alreadyInCart ? (
                      <button
                        disabled
                        className="w-full bg-gray-400 text-white py-2 rounded cursor-not-allowed"
                      >
                        Added
                      </button>
                    ) : (
                      <button
                        onClick={() => addToCart(product)}
                        className="w-full bg-pink-600 text-white py-2 rounded hover:bg-pink-700 transition-all"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-600 text-lg mt-10">
            No products to display.
          </p>
        )}

        {loading && (
          <p className="text-center text-gray-600 text-lg mt-4">
            Loading more products...
          </p>
        )}
      </div>
    </PageWrapper>
  );
}

export default Shop;
