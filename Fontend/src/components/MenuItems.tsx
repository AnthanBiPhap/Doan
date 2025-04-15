"use client";

import { useEffect, useState } from "react";
import MenuItemCard from "./MenuItemCard";
import axios from "axios";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, Filter, Utensils, Loader2 } from "lucide-react";
import noImage from "../assets/no-image.svg";
import MenuItemPostForm from "./MenuItemPostForm";
import { MenuItem } from "../types/index";

type Owner = {
  _id: string;
  username: string;
  fullname: string;
  email: string;
  role: string;
  avatar: string;
};

const MenuItems: React.FC = () => {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [currentUser, setCurrentUser] = useState<Owner | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchMenuItems = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get("http://localhost:8080/api/v1/menu_item");
      if (response.data?.data?.menu_Item && Array.isArray(response.data.data.menu_Item)) {
        setMenuItems(response.data.data.menu_Item);
      } else {
        setError("Dữ liệu món ăn không đúng định dạng.");
      }
    } catch (error) {
      setError("Không thể tải danh sách món ăn. Vui lòng thử lại sau.");
      console.error("Lỗi:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // Lấy thông tin người dùng
    const userProfile = localStorage.getItem("userProfile");
    if (userProfile) {
      setCurrentUser(JSON.parse(userProfile));
    }

    fetchMenuItems();
  }, []);

  // Lọc món ăn theo tìm kiếm và danh mục
  const filteredMenuItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.description || "").toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" ||
      item.category_id?.category_name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Danh mục giả lập (cần API để lấy danh mục động)
  const categories = [
    { value: "all", label: "Tất Cả" },

  ];

  // Callback khi thêm món ăn thành công
  const handleMenuItemAdded = (newItem: MenuItem) => {
    setMenuItems((prev) => [...prev, newItem]);
    setShowForm(false);
  };

  return (
    <section id="menu-items" className="py-16 bg-[#efe2db] relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-[#c8907e]/50 blur-3xl" />
      <div className="absolute top-1/2 -right-24 w-64 h-64 rounded-full bg-[#bb6f57]/40 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="mb-4 px-4 py-1 text-[#7c160f] border border-[#c8907e] bg-[#c8907e]/20 rounded-full inline-block">
            Khám Phá
          </div>
          <h2 className="text-5xl font-bold text-[#1e0907] mb-4">Danh Sách Món Ăn</h2>
          <p className="text-[#1e0907] max-w-2xl mx-auto text-xl mb-6">
            Thưởng thức những món ăn tuyệt hảo từ các nhà hàng hàng đầu khắp thế giới!
          </p>
          <div className="w-24 h-1 bg-[#bb6f57] rounded-full mx-auto" />
        </div>

        {/* Search and filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <input
              type="text"
              placeholder="Tìm kiếm món ăn..."
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
        </div>

        {/* Add menu item button */}
        {currentUser && (
          <div className="flex justify-end mb-6">
            <motion.button
              onClick={() => setShowForm(!showForm)}
              className="bg-[#7c160f] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#bb6f57] transition flex items-center"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Utensils className="h-5 w-5 mr-2" />
              {showForm ? "Ẩn Form Thêm" : "Thêm Món Ăn"}
            </motion.button>
          </div>
        )}

        {/* Add menu item form */}
        {showForm && (
          <motion.div
            className="mb-8 bg-white p-6 rounded-lg shadow-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {currentUser?.role === "restaurant_owner" ? (
              <MenuItemPostForm
                
                onClose={() => {
                  setShowForm(false);
                  fetchMenuItems();
                }}
              />
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

        {/* Menu items grid */}
        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-12 w-12 text-[#7c160f] animate-spin" />
          </div>
        ) : error ? (
          <div className="text-center text-red-600 py-8">
            <p>{error}</p>
            <button
              onClick={fetchMenuItems}
              className="mt-4 text-[#7c160f] underline"
            >
              Thử lại
            </button>
          </div>
        ) : filteredMenuItems.length === 0 ? (
          <div className="text-center py-12">
            <img
              src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092?auto=format&fit=crop&w=600&q=80"
              alt="No menu items"
              className="mx-auto mb-4 rounded-lg shadow-md max-w-xs"
            />
            <p className="text-[#1e0907] text-lg mb-4">
              Chưa có món ăn nào phù hợp. Hãy khám phá hoặc thêm món mới!
            </p>
            <div className="flex justify-center gap-4">
              <Link
                to="/restaurants"
                className="px-6 py-3 bg-[#7c160f] text-white rounded-lg hover:bg-[#bb6f57] transition"
              >
                Khám Phá Nhà Hàng
              </Link>
              {currentUser?.role === "restaurant_owner" && (
                <button
                  onClick={() => setShowForm(true)}
                  className="px-6 py-3 bg-transparent border border-[#7c160f] text-[#7c160f] rounded-lg hover:bg-[#7c160f] hover:text-white transition"
                >
                  Thêm Món Ăn
                </button>
              )}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredMenuItems.map((item, index) => (
              <motion.div
                key={item._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Link
                  to={`/menu_item/${item._id}`}
                  className="block hover:transform hover:scale-105 transition-transform duration-300"
                >
                  <MenuItemCard
                    image={item.main_image_url || noImage}
                    alt={item.name}
                    category={item.category_id?.category_name || "Chưa phân loại"}
                    name={item.name}
                    description={item.description || "Chưa có mô tả"}
                    price={item.price}
                  />
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Load more (placeholder) */}
        {filteredMenuItems.length > 0 && (
          <div className="text-center mt-12">
            <button
              className="px-6 py-3 bg-transparent border border-[#7c160f] text-[#7c160f] rounded-lg hover:bg-[#7c160f] hover:text-white transition"
              onClick={() => alert("Chức năng tải thêm sẽ được triển khai sau!")}
            >
              Xem Thêm Món Ăn
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default MenuItems;