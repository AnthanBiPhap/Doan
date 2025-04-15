"use client";

import { useEffect, useState } from "react";
import RestaurantCard from "./RestaurantCard";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Filter, Utensils, Loader2 } from "lucide-react";
import noImage from "../assets/no-image.svg";
import RestaurantPostForm from "./RestaurantPostForm";

type Category = {
  _id: string;
  category_name: string;
  description: string;
};

type Owner = {
  _id: string;
  username: string;
  fullname: string;
  email: string;
  role: string;
  avatar: string;
};

type Restaurant = {
  _id: string;
  owner_id: Owner;
  menu_id: string[];
  name: string;
  address: string;
  phone: number;
  description: string;
  category_id: Category;
  average_rating: number;
  avatar_url: string;
  images: string[];
  comments: any[];
  is_active: boolean;
  createdAt: string;
  updatedAt: string;
};

const Restaurants: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [currentUser, setCurrentUser] = useState<Owner | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedRating, setSelectedRating] = useState<number | null>(null);
  const [selectedSort, setSelectedSort] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Lấy thông tin người dùng
    const userProfile = localStorage.getItem("userProfile");
    if (userProfile) {
      setCurrentUser(JSON.parse(userProfile));
    }

    // Lấy danh sách nhà hàng
    const fetchRestaurants = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await axios.get("http://localhost:8080/api/v1/restaurants");
        if (response.data && Array.isArray(response.data.restaurants)) {
          setRestaurants(response.data.restaurants);
        } else {
          setError("Dữ liệu nhà hàng không đúng định dạng.");
        }
      } catch (error) {
        setError("Không thể tải danh sách nhà hàng. Vui lòng thử lại sau.");
        console.error("Lỗi:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  // Lọc và sắp xếp nhà hàng
  const filteredRestaurants = restaurants
    .filter((restaurant) => {
      const matchesSearch =
        restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        restaurant.address.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "all" ||
        restaurant.category_id?.category_name === selectedCategory;
      const matchesRating =
        !selectedRating ||
        restaurant.average_rating >= selectedRating;
      return restaurant.is_active && matchesSearch && matchesCategory && matchesRating;
    })
    .sort((a, b) => {
      if (selectedSort === "rating") {
        return b.average_rating - a.average_rating;
      } else if (selectedSort === "name") {
        return a.name.localeCompare(b.name);
      } else {
        return b.average_rating - a.average_rating;
      }
    });

  // Danh sách danh mục và xếp hạng
  const categories = [
    { value: "all", label: "Tất Cả" },
  ];

  const ratings = [
    { value: 5, label: "5 sao" },
    { value: 4, label: "4 sao trở lên" },
    { value: 3, label: "3 sao trở lên" },
    { value: 2, label: "2 sao trở lên" },
    { value: 1, label: "1 sao trở lên" },
  ];

  const sorts = [
    { value: "rating", label: "Đánh giá" },
    { value: "name", label: "Tên nhà hàng" },
  ];

  // Callback khi thêm nhà hàng thành công
  const handleRestaurantAdded = (newRestaurant: Restaurant) => {
    setRestaurants((prev) => [...prev, newRestaurant]);
    setShowForm(false);
  };

  return (
    <section id="restaurants" className="py-16 bg-[#efe2db] relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-[#c8907e]/50 blur-3xl" />
      <div className="absolute top-1/2 -right-24 w-64 h-64 rounded-full bg-[#bb6f57]/40 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-4 px-4 py-1 text-[#7c160f] border border-[#c8907e] bg-[#c8907e]/20 rounded-full inline-block">
            Khám Phá
          </div>
          <h2 className="text-5xl font-bold text-[#1e0907] mb-4">Nhà Hàng Nổi Bật</h2>
          <p className="text-[#1e0907] max-w-2xl mx-auto text-xl mb-6">
            Thưởng thức những hương vị đặc sắc từ các nhà hàng hàng đầu khắp thế giới!
          </p>
          <div className="w-24 h-1 bg-[#bb6f57] rounded-full mx-auto" />
        </div>

        {/* Search and filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Tìm kiếm nhà hàng hoặc địa điểm..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-3 pl-10 rounded-lg border border-[#bb6f57] focus:outline-none focus:ring-2 focus:ring-[#bb6f57] bg-white text-[#1e0907]"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#7c160f]" />
          </div>
          <div className="w-full sm:w-48">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#7c160f]" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full p-3 pl-10 rounded-lg border border-[#bb6f57] focus:outline-none focus:ring-2 focus:ring-[#bb6f57] bg-white text-[#1e0907]"
              >
                {categories.map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full sm:w-48">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#7c160f]" />
              <select
                value={selectedRating || ''}
                onChange={(e) => setSelectedRating(e.target.value ? Number(e.target.value) : null)}
                className="w-full p-3 pl-10 rounded-lg border border-[#bb6f57] focus:outline-none focus:ring-2 focus:ring-[#bb6f57] bg-white text-[#1e0907]"
              >
                <option value="">Tất cả đánh giá</option>
                {ratings.map((rating) => (
                  <option key={rating.value} value={rating.value}>
                    {rating.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="w-full sm:w-48">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-[#7c160f]" />
              <select
                value={selectedSort || ''}
                onChange={(e) => setSelectedSort(e.target.value)}
                className="w-full p-3 pl-10 rounded-lg border border-[#bb6f57] focus:outline-none focus:ring-2 focus:ring-[#bb6f57] bg-white text-[#1e0907]"
              >
                <option value="">Sắp xếp theo</option>
                {sorts.map((sort) => (
                  <option key={sort.value} value={sort.value}>
                    {sort.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Add restaurant button */}
        {currentUser && (
          <div className="flex justify-end mb-6">
            <motion.button
              onClick={() => setShowForm(!showForm)}
              className="bg-[#7c160f] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#bb6f57] transition flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Utensils className="h-5 w-5 mr-2" />
              {showForm ? "Ẩn Form Thêm" : "Thêm Nhà Hàng"}
            </motion.button>
          </div>
        )}

        {/* Add restaurant form */}
        {showForm && (
          <motion.div
            className="mb-8 bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {currentUser?.role === "restaurant_owner" ? (
              <RestaurantPostForm />
            ) : (
              <p className="text-red-600 text-center">
                Bạn cần tài khoản chủ nhà hàng để đăng bài.{" "}
                <Link to="/signup" className="text-[#7c160f] underline">
                  Đăng ký ngay
                </Link>
              </p>
            )}
          </motion.div>
        )}

        {/* Restaurants grid */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-12 w-12 text-[#7c160f] animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center text-red-600 py-8">
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 text-[#7c160f] underline"
            >
              Thử lại
            </button>
          </div>
        ) : filteredRestaurants.length === 0 ? (
          <div className="text-center py-12">
            <img
              src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=600&q=80"
              alt="No restaurants"
              className="mx-auto mb-4 rounded-lg shadow-md max-w-xs"
            />
            <p className="text-[#1e0907] text-lg mb-4">
              Chưa có nhà hàng nào phù hợp. Hãy khám phá hoặc thêm nhà hàng mới!
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/menu"
                className="px-6 py-3 bg-[#7c160f] text-white rounded-lg hover:bg-[#bb6f57] transition"
              >
                Khám Phá Món Ăn
              </Link>
              {currentUser?.role === "restaurant_owner" && (
                <button
                  onClick={() => setShowForm(true)}
                  className="px-6 py-3 bg-transparent border border-[#7c160f] text-[#7c160f] rounded-lg hover:bg-[#7c160f] hover:text-white transition"
                >
                  Thêm Nhà Hàng
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredRestaurants.map((restaurant, index) => (
              <motion.div
                key={restaurant._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={`/restaurants/${restaurant._id}`}
                  className="block hover:transform hover:scale-105 transition-transform duration-300"
                >
                  <RestaurantCard
                    image={restaurant.avatar_url || restaurant.images[0] || noImage}
                    alt={restaurant.name}
                    country={restaurant.category_id?.category_name || "Chưa phân loại"}
                    name={restaurant.name}
                    description={restaurant.description || "Chưa có mô tả"}
                    location={restaurant.address}
                    rating={restaurant.average_rating || 0}
                    phone={restaurant.phone ? restaurant.phone.toString() : undefined}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Load more (giả lập) */}
        {filteredRestaurants.length > 0 && (
          <div className="text-center mt-12">
            <button
              className="px-6 py-3 bg-transparent border border-[#7c160f] text-[#7c160f] rounded-lg hover:bg-[#7c160f] hover:text-white transition"
              onClick={() => alert("Chức năng tải thêm sẽ được triển khai sau!")}
            >
              Xem Thêm Nhà Hàng
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Restaurants;