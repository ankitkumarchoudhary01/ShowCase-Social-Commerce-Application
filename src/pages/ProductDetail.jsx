import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ReviewForm from "../components/ReviewForm";
import ReviewCard from "../components/ReviewCard";
import { useCart } from "../context/CartContext";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();
  console.log('Product details shown')
  // Fetch product data from backend
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/products/${id}`);
        if (!res.ok) throw new Error("Failed to fetch product");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleNewReview = (review) => {
    setReviews([review, ...reviews]);
  };

  if (loading) {
    return (
      <div className="min-h-screen w-screen text-center py-20 text-lg text-gray-500">
        Loading product...
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen w-screen text-center py-20 text-lg text-red-500">
        {error || "Product not found."}
      </div>
    );
  }

  return (
    <div className="bg-pink-500 w-screen h-auto p-4">
      <div className="p-6 h-full max-w-4xl mx-auto bg-white shadow-md mt-10 rounded">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-96 object-contain rounded"
        />
        <div className="mt-6">
          <h2 className="text-3xl text-black font-bold">{product.name}</h2>
          <p className="text-gray-600 mt-2">{product.description}</p>
          <p className="text-xl font-bold text-blue-600 mt-4">₹{product.price}</p>
          <button
            onClick={() => addToCart(product)}
            className="mt-6 px-6 py-3 bg-black text-white rounded hover:opacity-90"
          >
            Add to Cart
          </button>
        </div>

        <hr className="border-black my-8" />

        <div>
          <h3 className="text-xl font-semibold mb-4">Reviews</h3>
          <ReviewForm onSubmit={handleNewReview} />
          <div className="mt-6">
            {reviews.length === 0 ? (
              <p className="text-gray-500 italic">No reviews yet. Be the first!</p>
            ) : (
              reviews.map((r, i) => <ReviewCard key={i} review={r} />)
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
