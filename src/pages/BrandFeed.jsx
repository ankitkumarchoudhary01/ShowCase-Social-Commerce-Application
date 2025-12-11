import React, { useState, useEffect } from "react";
import { useSearch } from "../context/SearchContext";
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import axios from "axios";

function BrandFeed() {
  const { searchQuery } = useSearch();
  const [likedPosts, setLikedPosts] = useState({});
  const [wishlist, setWishlist] = useState({});
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const limit = 4;
  console.log("brand Fetched")
  
  // Fetch posts with pagination
  const fetchPosts = async (pageNum) => {
    if (loading) return; // prevent multiple requests
    setLoading(true);
    try {
      const res = await axios.get(
        `http://localhost:5000/api/brandPostData?page=${pageNum}&limit=${limit}`
      );

      // If backend returns { posts, hasMore }
      const newPosts = res.data.posts || res.data;

      if (newPosts.length > 0) {
        setPosts((prevPosts) => {
          const uniquePosts = [...prevPosts, ...newPosts].filter(
            (post, index, self) =>
              index === self.findIndex((p) => p._id === post._id)
          );
          return uniquePosts;
        });
      }

      if (newPosts.length < limit) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
    setLoading(false);
  };

  // Initial fetch
  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const toggleLike = (id) => {
    setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleWishlist = (id) => {
    setWishlist((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Search filter
  const filteredPosts = posts.filter((post) => {
    const caption = post?.caption?.toLowerCase?.() || "";
    const brandName = post?.brandName?.toLowerCase?.() || "";
    const hashtags = Array.isArray(post?.hashtags)
      ? post.hashtags.map((tag) => tag?.toLowerCase?.() || "")
      : [];

    const search = searchQuery?.toLowerCase?.() || "";

    return (
      caption.includes(search) ||
      brandName.includes(search) ||
      hashtags.some((tag) => tag.includes(search))
    );
  });

  const handleShowMore = () => {
    if (hasMore && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <PageWrapper>
      <div className="min-h-screen w-auto bg-pink-200 p-6">
        <h2 className="text-5xl font-bold text-center mb-6 text-pink-600">
          Artisians Collection
        </h2>

        {filteredPosts.length === 0 && !loading ? (
          <div className="w-full py-20 text-xl font-semibold text-gray-600 text-center">
            🔍 No posts found matching your search.
          </div>
        ) : (
          <>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredPosts.map((post) => (
                <div
                  key={post._id}
                  className="border-indigo-300 border-2 hover:border-indigo-600 hover:shadow-lg bg-white shadow rounded p-4 flex flex-col justify-between"
                >
                  <img
                    src={post.imageUrl}
                    alt="Brand Post"
                    className="w-full h-54 object-contain rounded mb-3"
                  />
                  <h3 className="text-xl font-semibold">{post.brandName}</h3>
                  <p className="text-gray-700 mt-1 mb-2 truncate">{post.caption}</p>

                  <div className="text-sm text-blue-500 mb-3 truncate">
                    {post.hashtags.map((tag) => (
                      <span key={tag} className="mr-2">
                        #{tag}
                      </span>
                    ))}
                  </div>


                  <div className="flex items-center justify-between mt-auto space-x-2">
                    <button
                      onClick={() => toggleLike(post._id)}
                      className={`flex-initial text-sm font-semibold px-2 py-2 rounded transition-colors ${
                        likedPosts[post._id]
                          ? "bg-red-100 text-red-600"
                          : "bg-gray-100 text-gray-600 hover:bg-red-100 hover:text-red-600"
                      }`}
                    >
                      {likedPosts[post._id] ? "❤️" : "🤍"}
                    </button>

                    <button
                      onClick={() =>
                        navigator.share
                          ? navigator.share({
                              title: post.brandName,
                              url: post.productLink,
                            })
                          : alert("Share not supported in this browser")
                      }
                      className="flex-initial text-sm font-semibold px-2 py-2 rounded bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors"
                    >
                      ➤
                    </button>

                    <button
                      onClick={() => toggleWishlist(post._id)}
                      className={`flex-initial text-sm font-semibold px-2 py-2 rounded transition-colors ${
                        wishlist[post._id]
                          ? "w-32 bg-pink-100 text-pink-600"
                          : "w-32 bg-gray-100 text-gray-600 hover:bg-pink-100 hover:text-pink-600"
                      }`}
                    >
                      {wishlist[post._id] ? "Wishlisted" : "Wishlist"}
                    </button>
                  </div>

                  {post.productId && (
                    <Link
                      to={`/product/${post.productId}`}
                      className="mt-4 inline-block w-full bg-blue-600 py-2 px-4 rounded hover:bg-blue-700 text-center"
                    >
                      <span className="text-white font-semibold">View Product</span>
                    </Link>
                  )}
                </div>
              ))}
            </div>

            {/* Show More */}
            {hasMore && (
              <div className="mt-8 flex justify-center">
                <button
                  onClick={handleShowMore}
                  disabled={loading}
                  className="px-6 py-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold rounded disabled:opacity-50"
                >
                  {loading ? "Loading..." : "Show More"}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </PageWrapper>
  );
}

export default BrandFeed;
