"use client";

import { motion } from "framer-motion";
import { Utensils, Globe, Users, ChefHat, Star } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function About() {
  const navigate = useNavigate();

  return (
    <section id="about" className="py-24 bg-[#efe2db] relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -top-24 -left-24 w-48 h-48 rounded-full bg-[#c8907e]/50 blur-3xl" />
      <div className="absolute top-1/2 -right-24 w-64 h-64 rounded-full bg-[#bb6f57]/40 blur-3xl" />
      <div className="absolute bottom-0 left-1/2 w-72 h-72 rounded-full bg-[#7c160f]/30 blur-3xl" />

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <div className="mb-4 px-4 py-1 text-[#7c160f] border border-[#c8907e] bg-[#c8907e]/20 rounded-full">
            Giới Thiệu
          </div>
          <h2 className="text-5xl font-bold mb-6 text-[#1e0907] tracking-tight">
            Về <span className="text-[#7c160f]">World Cuisine</span>
          </h2>
          <p className="text-xl text-[#1e0907] max-w-2xl mx-auto mb-6">
            Nơi kết nối những tâm hồn yêu ẩm thực, khám phá nhà hàng nổi tiếng và thưởng thức món ăn ngon từ khắp thế giới!
          </p>
          <div className="w-24 h-1 bg-[#bb6f57] rounded-full" />
        </div>

        {/* Main content */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-20">
          {/* Left content block */}
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h3 className="text-3xl font-bold text-[#7c160f] mb-6">
              Hành Trình Ẩm Thực Toàn Cầu
            </h3>
            <p className="text-[#1e0907] mb-6 text-lg leading-relaxed">
              World Cuisine ra đời từ niềm đam mê mang đến những trải nghiệm ẩm thực tuyệt vời nhất. Chúng tôi không chỉ là một website giới thiệu nhà hàng, mà còn là cầu nối để mọi người khám phá các món ăn đặc sắc và chia sẻ tình yêu với ẩm thực từ mọi góc thế giới.
            </p>
            <p className="text-[#1e0907] mb-6 text-lg leading-relaxed">
              Từ những quán ăn đường phố Việt Nam đầy màu sắc đến các nhà hàng Michelin sang trọng ở Paris, từ món phở thơm lừng đến pizza Ý truyền thống – World Cuisine giúp bạn tìm thấy mọi hương vị mà bạn khao khát. Chúng tôi tự hào giới thiệu hàng ngàn nhà hàng nổi tiếng và món ăn độc đáo, tất cả đều được cộng đồng người dùng đánh giá và chia sẻ.
            </p>
            <p className="text-[#1e0907] mb-8 text-lg leading-relaxed">
              Hơn thế nữa, World Cuisine là nơi để bạn kết nối với những người yêu ẩm thực khác. Hãy đăng ký, chia sẻ bài viết, đánh giá nhà hàng, hoặc thậm chí giới thiệu quán ăn yêu thích của bạn để lan tỏa niềm vui ẩm thực!
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => navigate("/restaurants")}
                className="px-6 py-3 bg-[#7c160f] hover:bg-[#bb6f57] text-white text-lg font-semibold rounded-lg transition"
              >
                Khám Phá Nhà Hàng
              </button>
              <button
                onClick={() => navigate("/signup")}
                className="px-6 py-3 bg-transparent border border-[#7c160f] text-[#7c160f] hover:bg-[#7c160f] hover:text-white text-lg font-semibold rounded-lg transition"
              >
                Tham Gia Ngay
              </button>
            </div>
          </motion.div>

          {/* Right content block */}
          <motion.div
            className="lg:w-1/2 mt-12 lg:mt-0"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-full h-full bg-[#7c160f] rounded-2xl" />
              <div className="relative z-10 rounded-2xl overflow-hidden shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
                  alt="Nhà hàng sang trọng"
                  className="w-full h-[500px] object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg z-20 max-w-xs">
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-sm font-medium text-green-600">Mở Cửa Hàng Ngày</span>
                </div>
                <p className="text-[#1e0907] font-medium">10:00 Sáng - 10:00 Tối</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Features section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-[#7c160f] text-center mb-12">
            Tại Sao Chọn World Cuisine?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <motion.div
              className="bg-white p-6 rounded-xl shadow-sm border border-[#c8907e] hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <Utensils className="h-8 w-8 text-[#7c160f] mb-3" />
              <h4 className="font-semibold text-lg mb-2">Ẩm Thực Đa Dạng</h4>
              <p className="text-[#1e0907] text-sm">Khám phá hàng ngàn món ăn từ châu Á, Âu, Mỹ và hơn thế nữa.</p>
            </motion.div>
            <motion.div
              className="bg-white p-6 rounded-xl shadow-sm border border-[#c8907e] hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <Globe className="h-8 w-8 text-[#7c160f] mb-3" />
              <h4 className="font-semibold text-lg mb-2">Văn Hóa Toàn Cầu</h4>
              <p className="text-[#1e0907] text-sm">Tìm hiểu truyền thống ẩm thực từ mọi quốc gia trên thế giới.</p>
            </motion.div>
            <motion.div
              className="bg-white p-6 rounded-xl shadow-sm border border-[#c8907e] hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <Users className="h-8 w-8 text-[#7c160f] mb-3" />
              <h4 className="font-semibold text-lg mb-2">Cộng Đồng Sôi Động</h4>
              <p className="text-[#1e0907] text-sm">Chia sẻ trải nghiệm và kết nối với những người yêu ẩm thực.</p>
            </motion.div>
            <motion.div
              className="bg-white p-6 rounded-xl shadow-sm border border-[#c8907e] hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <ChefHat className="h-8 w-8 text-[#7c160f] mb-3" />
              <h4 className="font-semibold text-lg mb-2">Công Thức Độc Đáo</h4>
              <p className="text-[#1e0907] text-sm">Học cách nấu các món ăn yêu thích từ các đầu bếp hàng đầu.</p>
            </motion.div>
            <motion.div
              className="bg-white p-6 rounded-xl shadow-sm border border-[#c8907e] hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <Star className="h-8 w-8 text-[#7c160f] mb-3" />
              <h4 className="font-semibold text-lg mb-2">Đánh Giá Chân Thực</h4>
              <p className="text-[#1e0907] text-sm">Đọc và chia sẻ đánh giá để tìm nhà hàng tốt nhất.</p>
            </motion.div>
          </div>
        </div>

        {/* Stats section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-[#7c160f] text-center mb-12">
            Thành Tựu Của Chúng Tôi
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h4 className="text-4xl font-bold text-[#7c160f] mb-2">5,000+</h4>
              <p className="text-[#1e0907] text-lg">Nhà Hàng Nổi Tiếng</p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-4xl font-bold text-[#7c160f] mb-2">10,000+</h4>
              <p className="text-[#1e0907] text-lg">Món Ăn Đặc Sắc</p>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-4xl font-bold text-[#7c160f] mb-2">100,000+</h4>
              <p className="text-[#1e0907] text-lg">Thành Viên Cộng Đồng</p>
            </motion.div>
          </div>
        </div>

        {/* Gallery section */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-[#7c160f] text-center mb-12">
            Một Thoáng Ẩm Thực Thế Giới
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <motion.div
              className="relative rounded-xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <img
                src="https://static.vinwonders.com/production/pho-nha-trang-banner.jpg"
                alt="Món ăn Việt"
                className="w-full h-64 object-cover"
              />
              <div className="absolute bottom-0 left-0 bg-[#7c160f]/70 text-white p-4 w-full">
                <p className="font-semibold">Phở Việt Nam</p>
              </div>
            </motion.div>
            <motion.div
              className="relative rounded-xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <img
                src="https://th.bing.com/th/id/OIP.xqOIZsFHzscX9aOyh9COVQHaEP?rs=1&pid=ImgDetMain"
                alt="Pizza Ý"
                className="w-full h-64 object-cover"
              />
              <div className="absolute bottom-0 left-0 bg-[#7c160f]/70 text-white p-4 w-full">
                <p className="font-semibold">Pizza Ý</p>
              </div>
            </motion.div>
            <motion.div
              className="relative rounded-xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <img
                src="https://th.bing.com/th/id/R.beb55565b9d436d779201ffce8b74a9d?rik=czmmmGmqXIvL3A&pid=ImgRaw&r=0"
                alt="Sushi Nhật"
                className="w-full h-64 object-cover"
              />
              <div className="absolute bottom-0 left-0 bg-[#7c160f]/70 text-white p-4 w-full">
                <p className="font-semibold">Sushi Nhật Bản</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Call to action */}
        <motion.div
          className="text-center bg-white p-12 rounded-2xl shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h3 className="text-3xl font-bold text-[#7c160f] mb-6">
            Hãy Tham Gia Cộng Đồng Ẩm Thực!
          </h3>
          <p className="text-[#1e0907] text-lg mb-8 max-w-2xl mx-auto">
            Đăng ký ngay hôm nay để khám phá nhà hàng, chia sẻ đánh giá, và trở thành một phần của hành trình ẩm thực toàn cầu cùng World Cuisine.
          </p>
          <button
            onClick={() => navigate("/signup")}
            className="px-8 py-4 bg-[#7c160f] hover:bg-[#bb6f57] text-white text-lg font-semibold rounded-lg transition"
          >
            Tham Gia Ngay
          </button>
        </motion.div>
      </div>
    </section>
  );
}