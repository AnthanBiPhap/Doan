"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import PostCard from "./PostCard";
import PostForm from "./PostForm";
import { Loader2, PenSquare, Search } from "lucide-react";
import { Link } from "react-router-dom";

interface Comment {
  _id: string;
  content: string;
  createdAt: string;
  likes: string[];
  views: number;
}

interface Post {
  _id: string;
  title: string;
  content: string;
  images: string[];
  user_id: {
    _id: string;
    username: string;
    fullname: string;
    avatar: string;
  };
  createdAt: string;
  updatedAt: string;
  likes: string[];
  comments: Comment[];
  viewCount: number;
  likeCount: number;
  is_active: boolean;
  restaurant_id?: string;
  restaurant_data?: { name: string; address: string };
}

interface ApiResponse {
  statusCode: number;
  message: string;
  data: { posts: Post[]; pagination: { totalRecord: number; limit: number; page: number } };
}

interface CurrentUser {
  _id: string;
  username: string;
  fullname: string;
  avatar: string;
  role?: string;
}

const Posts: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOption, setSortOption] = useState("createdAt");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userProfile = localStorage.getItem("userProfile");
    if (token && userProfile) {
      try {
        const user = JSON.parse(userProfile);
        setCurrentUser({
          _id: user._id || "",
          username: user.username || "Khách",
          fullname: user.fullname || "Khách",
          avatar: user.avatar || "",
          role: user.role || "",
        });
      } catch (error) {
        setError("Không thể xác thực người dùng!");
      }
    }
  }, []);

  const fetchPosts = async (pageNum: number, isLoadMore: boolean = false) => {
    if (!currentUser) return;
    try {
      if (!isLoadMore) setLoading(true);
      else setIsLoadingMore(true);
      setError(null);

      const token = localStorage.getItem("token");
      const response = await axios.get<ApiResponse>("http://localhost:8080/api/v1/posts", {
        headers: { Authorization: `Bearer ${token}` },
        params: { page: pageNum, limit: 10, sort_type: "desc", sort_by: sortOption },
      });

      const newPosts = response.data.data.posts.filter((post) => post.is_active);
      const postsWithRestaurantData = await Promise.all(
        newPosts.map(async (post) => {
          if (post.restaurant_id) {
            try {
              const restaurantResponse = await axios.get(
                `http://localhost:8080/api/v1/restaurants/${post.restaurant_id}`,
                { headers: { Authorization: `Bearer ${token}` } }
              );
              return { ...post, restaurant_data: restaurantResponse.data.data };
            } catch (err) {
              return post;
            }
          }
          return post;
        })
      );

      if (isLoadMore) {
        setPosts((prev) => [...prev, ...postsWithRestaurantData]);
      } else {
        setPosts(postsWithRestaurantData);
      }
      setHasMore(newPosts.length === 10);
    } catch (error) {
      setError("Không thể tải bài viết. Vui lòng thử lại!");
    } finally {
      setLoading(false);
      setIsLoadingMore(false);
    }
  };

  useEffect(() => {
    if (currentUser) fetchPosts(1);
  }, [currentUser, sortOption]);

  const handleAddPost = (newPost: Post) => {
    setPosts((prev) => [newPost, ...prev]);
    setShowForm(false);
  };

  const handleLoadMore = () => {
    if (!isLoadingMore && hasMore) {
      const nextPage = page + 1;
      setPage(nextPage);
      fetchPosts(nextPage, true);
    }
  };

  // Filter posts by search query
  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section id="posts" className="py-16 bg-[#efe2db] relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-[#c8907e]/50 blur-3xl" />
      <div className="absolute top-1/2 -right-24 w-64 h-64 rounded-full bg-[#bb6f57]/40 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-4 px-4 py-1 text-[#7c160f] border border-[#c8907e] bg-[#c8907e]/20 rounded-full inline-block">
            Chia Sẻ
          </div>
          <h2 className="text-5xl font-bold text-[#1e0907] mb-4">Bài Viết Cộng Đồng</h2>
          <p className="text-[#1e0907] max-w-2xl mx-auto text-xl mb-6">
            Kết nối và chia sẻ trải nghiệm ẩm thực từ khắp nơi trên thế giới!
          </p>
          <div className="w-24 h-1 bg-[#bb6f57] rounded-full mx-auto" />
        </div>

        {/* Search and sort */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Tìm kiếm bài viết..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 pl-10 rounded-lg border border-[#bb6f57] focus:outline-none focus:ring-2 focus:ring-[#bb6f57] bg-white text-[#1e0907]"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#7c160f]" />
          </div>
          <div className="w-full sm:w-48">
            <div className="relative">
              <select
                value={sortOption}
                onChange={(e) => {
                  setSortOption(e.target.value);
                  setPage(1);
                  setPosts([]);
                }}
                className="w-full p-3 pl-3 rounded-lg border border-[#bb6f57] focus:outline-none focus:ring-2 focus:ring-[#bb6f57] bg-white text-[#1e0907]"
              >
                <option value="createdAt">Mới nhất</option>
                <option value="likeCount">Phổ biến nhất</option>
                <option value="viewCount">Xem nhiều nhất</option>
              </select>
            </div>
          </div>
        </div>

        {/* Add post button */}
        {currentUser && (
          <div className="flex justify-end mb-6">
            <motion.button
              onClick={() => setShowForm(true)}
              className="bg-[#7c160f] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#bb6f57] transition flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <PenSquare className="h-5 w-5 mr-2" />
              Viết Bài Mới
            </motion.button>
          </div>
        )}

        {/* Post form */}
        {showForm && (
          <motion.div
            className="mb-8 bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {currentUser ? (
              <PostForm
                onSuccess={handleAddPost}
                onClose={() => setShowForm(false)}
              />
            ) : (
              <p className="text-red-600 text-center">
                Bạn cần đăng nhập để viết bài.{" "}
                <Link to="/login" className="text-[#7c160f] underline">
                  Đăng nhập ngay
                </Link>
              </p>
            )}
          </motion.div>
        )}

        {/* Posts grid */}
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-12 w-12 text-[#7c160f] animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center text-red-600 py-8">
            <p>{error}</p>
            <button
              onClick={() => fetchPosts(1)}
              className="mt-4 text-[#7c160f] underline"
            >
              Thử lại
            </button>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-12">
            <img
              src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=600&q=80"
              alt="No posts"
              className="mx-auto mb-4 rounded-lg shadow-md max-w-xs"
            />
            <p className="text-[#1e0907] text-lg mb-4">
              Chưa có bài viết nào. Hãy chia sẻ trải nghiệm ẩm thực của bạn!
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/restaurants"
                className="px-6 py-3 bg-[#7c160f] text-white rounded-lg hover:bg-[#bb6f57] transition"
              >
                Khám Phá Nhà Hàng
              </Link>
              {currentUser && (
                <button
                  onClick={() => setShowForm(true)}
                  className="px-6 py-3 bg-transparent border border-[#7c160f] text-[#7c160f] rounded-lg hover:bg-[#7c160f] hover:text-white transition"
                >
                  Viết Bài Mới
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <motion.div
                key={post._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <PostCard
                  post={{
                    id: post._id,
                    title: post.title,
                    content: post.content,
                    user_id: post.user_id,
                    date: post.createdAt,
                    images: post.images,
                    likes: post.likes,
                    views: post.viewCount,
                    comments: post.comments.map((c) => ({
                      _id: c._id,
                      content: c.content,
                      user_id: {
                        _id: post.user_id._id,
                        username: post.user_id.username,
                        avatar: post.user_id.avatar,
                      },
                      post_id: { _id: post._id },
                      createdAt: c.createdAt,
                      likes: c.likes,
                      views: c.views,
                    })),
                    restaurant_id: post.restaurant_id,
                    restaurant_data: post.restaurant_data,
                  }}
                />
              </motion.div>
            ))}
          </div>
        )}

        {/* Load more */}
        {hasMore && filteredPosts.length > 0 && (
          <div className="text-center mt-12">
            <motion.button
              onClick={handleLoadMore}
              disabled={isLoadingMore}
              className="px-6 py-3 bg-transparent border border-[#7c160f] text-[#7c160f] rounded-lg hover:bg-[#7c160f] hover:text-white transition flex items-center mx-auto disabled:opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isLoadingMore && <Loader2 className="h-5 w-5 animate-spin mr-2" />}
              {isLoadingMore ? "Đang tải..." : "Tải Thêm Bài Viết"}
            </motion.button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Posts;