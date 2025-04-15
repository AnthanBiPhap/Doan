"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Star, MapPin, Tag } from "lucide-react"; // Thêm icon từ thư viện lucide-react

interface Restaurant {
  _id: string;
  name: string;
  avatar_url: string;
  description?: string;
  category_id?: {
    category_name: string;
  };
  rating?: number; // Thêm rating
}

interface Post {
  _id: string;
  title: string;
  content: string;
  image_url?: string;
  images?: string[];
  user_id?: {
    fullname?: string;
    username?: string;
  };
}

interface MenuItem {
  _id: string;
  name: string;
  description: string;
  main_image_url: string;
  price: number;
  category_id?: {
    category_name: string;
  };
}

const HomePage = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);

  const [showAllRestaurants, setShowAllRestaurants] = useState(false);
  const [showAllMenuItems, setShowAllMenuItems] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [restaurantRes, postRes, menuRes] = await Promise.all([
          axios.get("http://localhost:8080/api/v1/restaurants"),
          axios.get("http://localhost:8080/api/v1/posts"),
          axios.get("http://localhost:8080/api/v1/menu_item"),
        ]);

        setRestaurants(restaurantRes.data?.restaurants || []);
        setPosts(postRes.data?.data?.posts || []);
        setMenuItems(menuRes.data?.data?.menu_Item || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const SectionTitle = ({ title }: { title: string }) => (
    <h2 className="text-4xl font-extrabold text-center mb-8 text-primary">
      {title}
    </h2>
  );

  const Placeholder = ({ count }: { count: number }) => (
    <div className="flex justify-center gap-4">
      {Array(count)
        .fill(0)
        .map((_, index) => (
          <div
            key={index}
            className="animate-pulse bg-gray-200 h-48 w-80 rounded-lg shadow-lg"
          ></div>
        ))}
    </div>
  );

  return (
    <div className="w-full bg-gray-50">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 py-32 text-center text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div> {/* Overlay cho nền */}
        <div className="relative container mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-6xl font-extrabold mb-6"
          >
            Khám Phá Thế Giới Ẩm Thực
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl mb-10 max-w-2xl mx-auto"
          >
            Tìm kiếm nhà hàng yêu thích, thưởng thức món ăn ngon và chia sẻ trải nghiệm ẩm thực của bạn với cộng đồng đam mê ẩm thực!
          </motion.p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate("/restaurants")}
              className="bg-white text-indigo-600 px-8 py-4 font-semibold rounded-lg shadow-lg hover:shadow-xl transition duration-300"
            >
              Tìm Nhà Hàng
            </button>
            <button
              onClick={() => navigate("/menu_item")}
              className="bg-transparent border-2 border-white text-white px-8 py-4 font-semibold rounded-lg hover:bg-white hover:text-indigo-600 transition duration-300"
            >
              Xem Món Ăn
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 lg:px-8 flex flex-col md:flex-row items-center gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2"
          >
            <h2 className="text-4xl font-bold text-gray-800 mb-6">
              Giới Thiệu Về Chúng Tôi
            </h2>
            <p className="text-lg text-gray-600 mb-4">
              Chào mừng bạn đến với <span className="font-semibold text-indigo-600">World Cuisine</span> - nơi hội tụ những trải nghiệm ẩm thực tuyệt vời nhất! Chúng tôi mang đến cho bạn cơ hội khám phá hàng ngàn nhà hàng, món ăn đặc sắc và những câu chuyện ẩm thực đầy cảm hứng.
            </p>
            <p className="text-lg text-gray-600">
              Từ những quán ăn đường phố ấm cúng đến nhà hàng sang trọng, từ món Việt truyền thống đến ẩm thực quốc tế đa dạng - tất cả đều có tại đây. Hãy cùng chúng tôi thưởng thức, chia sẻ và lan tỏa niềm đam mê ẩm thực!
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="md:w-1/2"
          >
            <img
              src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?q=80&w=2070&auto=format&fit=crop"
              alt="About Us"
              className="w-full h-96 object-cover rounded-xl shadow-lg"
            />
          </motion.div>
        </div>
      </section>

      {/* Featured Restaurants */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionTitle title="Nhà Hàng Nổi Bật" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {loading ? (
              <Placeholder count={4} />
            ) : (showAllRestaurants ? restaurants : restaurants.slice(0, 4)).map((restaurant) => (
              <motion.div
                key={restaurant._id}
                className="relative bg-white rounded-xl shadow-lg p-4 hover:shadow-2xl transition-shadow cursor-pointer group"
                onClick={() => navigate(`/restaurants/${restaurant._id}`)}
                whileHover={{ scale: 1.03 }}
              >
                <img
                  src={restaurant.avatar_url || "https://via.placeholder.com/150"}
                  alt={restaurant.name}
                  className="w-full h-56 object-cover rounded-xl"
                />
                <h3 className="mt-4 text-xl font-semibold text-gray-800">
                  {restaurant.name}
                </h3>
                {restaurant.category_id && (
                  <p className="mt-2 text-sm text-gray-500 flex items-center">
                    <Tag className="w-4 h-4 mr-1" /> {restaurant.category_id.category_name}
                  </p>
                )}
                {restaurant.rating && (
                  <p className="mt-2 text-sm text-yellow-500 flex items-center">
                    <Star className="w-4 h-4 mr-1" /> {restaurant.rating}/5
                  </p>
                )}
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  {restaurant.description || "Khám phá những món ăn tuyệt vời tại đây!"}
                </p>
                <div className="absolute top-2 right-2 bg-indigo-600 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                  Xem chi tiết
                </div>
              </motion.div>
            ))}
          </motion.div>
          {!loading && restaurants.length > 4 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAllRestaurants(!showAllRestaurants)}
                className="text-indigo-600 font-semibold hover:underline"
              >
                {showAllRestaurants ? "Thu gọn" : "Xem thêm nhà hàng"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Sidebar Content (Bên trái/phải xen kẽ) */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Bên trái: Tính năng nổi bật */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1 bg-white p-6 rounded-xl shadow-lg"
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">Tại Sao Chọn Chúng Tôi?</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin className="w-6 h-6 text-indigo-600 mr-2 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Khám Phá Địa Điểm</h4>
                  <p className="text-gray-600 text-sm">
                    Tìm nhà hàng gần bạn với bản đồ tích hợp và đánh giá chân thực.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <Star className="w-6 h-6 text-indigo-600 mr-2 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Đánh Giá Chất Lượng</h4>
                  <p className="text-gray-600 text-sm">
                    Đọc và chia sẻ đánh giá từ cộng đồng yêu ẩm thực.
                  </p>
                </div>
              </li>
              <li className="flex items-start">
                <Tag className="w-6 h-6 text-indigo-600 mr-2 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold">Ưu Đãi Hấp Dẫn</h4>
                  <p className="text-gray-600 text-sm">
                    Nhận ưu đãi độc quyền từ các nhà hàng đối tác.
                  </p>
                </div>
              </li>
            </ul>
          </motion.div>

          {/* Bên phải: Trending Menu Items */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2"
          >
            <SectionTitle title="Món Ăn Đang Hot" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
              {loading ? (
                <Placeholder count={3} />
              ) : (showAllMenuItems ? menuItems : menuItems.slice(0, 3)).map((item) => (
                <motion.div
                  key={item._id}
                  className="bg-white rounded-xl shadow-lg p-4 hover:shadow-2xl transition-shadow cursor-pointer group"
                  onClick={() => navigate(`/menu_item/${item._id}`)}
                  whileHover={{ scale: 1.03 }}
                >
                  <img
                    src={item.main_image_url || "https://via.placeholder.com/300x200"}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                  <h3 className="mt-4 text-lg font-semibold text-gray-800">
                    {item.name}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 line-clamp-2">
                    {item.description}
                  </p>
                  <p className="mt-2 text-lg font-bold text-indigo-600">
                    {new Intl.NumberFormat("vi-VN", {
                      style: "currency",
                      currency: "VND",
                    }).format(item.price)}
                  </p>
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                    Hot
                  </div>
                </motion.div>
              ))}
            </div>
            {!loading && menuItems.length > 3 && (
              <div className="text-center mt-8">
                <button
                  onClick={() => setShowAllMenuItems(!showAllMenuItems)}
                  className="text-indigo-600 font-semibold hover:underline"
                >
                  {showAllMenuItems ? "Thu gọn" : "Xem thêm món ăn"}
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-16 bg-indigo-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold mb-6">
            Tham Gia Cộng Đồng Ẩm Thực Ngay Hôm Nay!
          </h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Đăng ký để nhận những gợi ý nhà hàng, công thức nấu ăn độc đáo và ưu đãi hấp dẫn từ chúng tôi.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="bg-white text-indigo-600 px-8 py-4 font-semibold rounded-lg shadow-lg hover:shadow-xl transition duration-300"
          >
            Đăng Ký Ngay
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;