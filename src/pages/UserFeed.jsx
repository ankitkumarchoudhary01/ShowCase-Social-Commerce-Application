import React, { useState, useEffect } from "react";
import { useSearch } from "../context/SearchContext";
import { Link } from "react-router-dom";
import PageWrapper from "../components/PageWrapper";
import axios from "axios";

function UserFeed() {
  const { searchQuery } = useSearch();
  const [likedPosts, setLikedPosts] = useState({});
  const [savedPosts, setSavedPosts] = useState({});
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const limit = 4;

  console.log("post fetched")

  // Fetch posts from backend
  const fetchPosts = async (pageNum) => {
    if (loading) return;
    setLoading(true);

    try {
      const res = await axios.get(
        `http://localhost:5000/api/userPostData?page=${pageNum}&limit=${limit}`
      );

      const newPosts = res.data.posts || res.data;
      if (Array.isArray(newPosts) && newPosts.length > 0) {
        setPosts((prev) => {
          const uniquePosts = [...prev, ...newPosts].filter(
            (post, index, self) =>
              index === self.findIndex((p) => p._id === post._id)
          );
          return uniquePosts;
        });
      }

      if (!Array.isArray(newPosts) || newPosts.length < limit) {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchPosts(page);
  }, [page]);

  const toggleLike = (id) => {
    setLikedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const toggleSave = (id) => {
    setSavedPosts((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  // Search filter
  const filteredPosts = posts.filter((post) => {
    const caption = post?.caption?.toLowerCase?.() || "";
    const username = post?.username?.toLowerCase?.() || "";
    const hashtags = Array.isArray(post?.hashtags)
      ? post.hashtags.map((tag) => tag?.toLowerCase?.() || "")
      : [];

    const search = searchQuery?.toLowerCase?.() || "";

    return (
      caption.includes(search) ||
      username.includes(search) ||
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
          Unfiltered Styles
        </h2>

        {filteredPosts.length === 0 && !loading ? (
          <div className="w-full py-20 text-xl font-semibold text-gray-600 text-center">
            🔍 No matching posts found.
          </div>
        ) : (
          <>
            <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {filteredPosts.map((post) => (
                <div
                  key={post._id}
                  className="border-pink-300 border-2 hover:border-pink-600 hover:shadow-lg bg-white shadow rounded p-2 flex flex-col justify-between"
                >
                  {/* Header */}
                  <div className="flex items-center px-4 py-3">
                    <img
                      src={post.profilePic}
                      alt="Profile"
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div className="ml-3">
                      <p className="text-gray-800 font-semibold">{post.username}</p>
                    </div>
                  </div>

                  {/* Post Image */}
                  <img
                    src={post.imageUrl}
                    alt="Post"
                    className="p-4 w-full h-60 object-contain rounded mb-3"
                  />

                  {/* Buttons */}
                  <div className="flex items-center justify-between px-4 py-2">
                    <div className="flex space-x-4">
                      <button
                        onClick={() => toggleLike(post._id)}
                        className={`flex-initial text-sm font-semibold px-2 py-2 rounded transition-colors ${
                          likedPosts[post._id]
                            ? "text-red-600 hover:bg-red-100"
                            : "text-gray-600 hover:bg-red-100 hover:text-red-600"
                        }`}
                      >
                        {likedPosts[post._id] ? "💞" : "❤️"}
                      </button>

                      <button className="text-xl text-yellow-500 hover:bg-red-100">
                        💭
                      </button>

                      <button
                        onClick={() =>
                          navigator.share
                            ? navigator.share({
                                title: post.username,
                                url: post.postLink,
                              })
                            : alert("Share not supported")
                        }
                        className="text-xl text-blue-500 hover:bg-red-100"
                      >
                        ➤
                      </button>
                    </div>

                    <div className="flex justify-center">
                      <Link to={`/product/${post._id}`}>
                        <div className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full shadow-md transition-all duration-300">
                          View Product
                        </div>
                      </Link>
                    </div>
                  </div>

                  {/* Caption */}
                  <div className="px-4 pb-4">
                    <p className="text-gray-700 truncate">
                      <span className="font-semibold">{post.username}</span>{" "}
                      <span>{post.caption}</span>
                    </p>

                    <div className="text-sm text-blue-500 mt-1 space-x-2">
                      {post.hashtags?.map((tag, index) => (
                        <span key={index}>#{tag}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Show More Button */}
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

export default UserFeed;
