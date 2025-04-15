"use client"

import { useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

interface Restaurant {
  _id: string;
  name: string;
  avatar_url: string;
  description?: string;
  category_id?: {
    category_name: string;
  };
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
      <section className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 py-20 text-center text-white">
        <h1 className="text-5xl font-bold mb-4">Khám Phá Hương Vị Tuyệt Vời</h1>
        <p className="text-xl mb-6">Cùng thưởng thức những món ăn và địa điểm đáng nhớ nhất.</p>
        <button
          onClick={() => navigate("/restaurants")}
          className="bg-white text-indigo-600 px-6 py-3 font-semibold rounded-lg shadow-lg hover:shadow-xl transition duration-300"
        >
          Khám phá ngay
        </button>
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
              <div
                key={restaurant._id}
                className="bg-white rounded-xl shadow-lg p-4 hover:shadow-2xl transition-shadow cursor-pointer"
                onClick={() => navigate(`/restaurants/${restaurant._id}`)}
              >
                <img
                  src={
                    restaurant.avatar_url ||
                    "https://via.placeholder.com/150"
                  }
                  alt={restaurant.name}
                  className="w-full h-56 object-cover rounded-xl"
                />
                <h3 className="mt-4 text-xl font-semibold text-gray-800">
                  {restaurant.name}
                </h3>
                {restaurant.category_id && (
                  <p className="mt-2 text-sm text-gray-500">
                    {restaurant.category_id.category_name}
                  </p>
                )}
              </div>
            ))}
          </motion.div>
          {!loading && restaurants.length > 4 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAllRestaurants(!showAllRestaurants)}
                className="text-primary font-semibold hover:underline"
              >
                {showAllRestaurants ? "Thu gọn" : "Xem thêm"}
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Featured Menu Items */}
      <section className="py-16">
        <div className="container mx-auto px-4 lg:px-8">
          <SectionTitle title="Món Ăn Nổi Bật" />
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8"
          >
            {loading ? (
              <Placeholder count={4} />
            ) : (showAllMenuItems ? menuItems : menuItems.slice(0, 4)).map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-xl shadow-lg p-4 hover:shadow-2xl transition-shadow cursor-pointer"
                onClick={() => navigate(`/menu_item/${item._id}`)}
              >
                <img
                  src={item.main_image_url || "https://via.placeholder.com/300x200"}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-xl"
                />
                <h3 className="mt-4 text-lg font-semibold text-gray-800">
                  {item.name}
                </h3>
                <p className="mt-2 text-sm text-gray-500">
                  {item.description.slice(0, 50)}...
                </p>
                <p className="mt-2 text-lg font-bold text-indigo-600">
                  {new Intl.NumberFormat("vi-VN", {
                    style: "currency",
                    currency: "VND",
                  }).format(item.price)}
                </p>
              </div>
            ))}
          </motion.div>
          {!loading && menuItems.length > 4 && (
            <div className="text-center mt-8">
              <button
                onClick={() => setShowAllMenuItems(!showAllMenuItems)}
                className="text-primary font-semibold hover:underline"
              >
                {showAllMenuItems ? "Thu gọn" : "Xem thêm"}
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
