import React, { useState } from "react";
import { Utensils, Facebook, Instagram, Twitter, Youtube, Send } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const navigate = useNavigate();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Vui lòng nhập địa chỉ email hợp lệ");
      return;
    }
    setEmailError("");
    setIsSubscribed(true);
    // Placeholder for API call to subscribe
    setTimeout(() => {
      setIsSubscribed(false);
      setEmail("");
    }, 3000); // Reset after 3 seconds
  };

  const socialLinks = [
    { Icon: Facebook, href: "https://facebook.com", label: "Facebook" },
    { Icon: Instagram, href: "https://instagram.com", label: "Instagram" },
    { Icon: Twitter, href: "https://twitter.com", label: "Twitter" },
    { Icon: Youtube, href: "https://youtube.com", label: "YouTube" },
  ];

  const footerLinks = [
    { label: "Giới Thiệu", path: "/about" },
    { label: "Nhà Hàng", path: "/restaurants" },
    { label: "Món Ăn", path: "/menu" },
    { label: "Blog", path: "/posts" },
    { label: "Liên Hệ", path: "/contact" },
    { label: "Công Thức", path: "/recipes" },
    { label: "Hỗ Trợ", path: "/support" },
    { label: "Tuyển Dụng", path: "/careers" },
  ];

  const legalLinks = [
    { label: "Điều Khoản Website", path: "/terms" },
    { label: "Chính Sách Bảo Mật", path: "/privacy" },
    { label: "Tuyên Bố Truy Cập", path: "/accessibility" },
    { label: "Đạo Luật Minh Bạch Chuỗi Cung Ứng", path: "/transparency" },
    { label: "Quy Tắc Ứng Xử Nhà Cung Cấp", path: "/conduct" },
    { label: "Không Bán Thông Tin Của Tôi", path: "/do-not-sell" },
  ];

  return (
    <footer className="bg-[#efe2db] text-[#1e0907] shadow-sm py-12 border-t border-white/100">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Left Side */}
          <div>
            <div className="flex items-center mb-4">
              <Utensils className="h-6 w-6 text-[#7c160f] mr-2" />
              <h3 className="text-xl font-bold text-[#7c160f]">
                <Link to="/">World Cuisine</Link>
              </h3>
            </div>
            <p className="text-[#1e0907] mb-6 text-left">
              Khám phá hương vị toàn cầu với World Cuisine. Tìm kiếm nhà hàng, thưởng thức công thức nấu ăn và tham gia cộng đồng yêu ẩm thực!
            </p>
            <div className="grid grid-cols-2 gap-4 text-left">
              {footerLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.path}
                  className="text-[#1e0907] hover:text-[#bb6f57] font-medium transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="flex space-x-4 mt-6">
              {socialLinks.map(({ Icon, href, label }, index) => (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#1e0907] hover:text-[#bb6f57] transition-colors relative group"
                  aria-label={label}
                >
                  <Icon className="h-6 w-6" />
                  <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-[#1e0907] text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    {label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Right Side */}
          <div>
            <h3 className="text-lg font-bold text-[#7c160f] mb-4">
              Thưởng Thức Tin Tức Mới Nhất
            </h3>
            <p className="text-[#1e0907] mb-4">
              Đăng ký để nhận công thức độc quyền, gợi ý nhà hàng và mẹo ẩm thực.
            </p>
            <form onSubmit={handleSubscribe} className="flex mb-4">
              <input
                type="email"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setEmailError("");
                }}
                className="w-3/4 p-3 rounded-l-lg bg-white text-[#1e0907] border border-[#bb6f57] focus:outline-none focus:ring-2 focus:ring-[#bb6f57]"
              />
              <button
                type="submit"
                className="w-1/4 bg-[#bb6f57] text-white p-3 rounded-r-lg hover:bg-[#7c160f] transition-colors flex items-center justify-center"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
            {emailError && <p className="text-red-600 text-sm mb-4">{emailError}</p>}
            {isSubscribed && (
              <p className="text-green-600 text-sm mb-4">
                Cảm ơn bạn đã đăng ký! Kiểm tra email để nhận cập nhật.
              </p>
            )}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="ageConsent"
                className="mr-2 accent-[#bb6f57]"
              />
              <label htmlFor="ageConsent" className="text-sm text-[#1e0907]">
                Tôi ít nhất 16 tuổi
              </label>
            </div>
          </div>
        </div>

        <hr className="border-t border-[#bb6f57] opacity-50 mb-6" />

        <div className="text-center text-[#1e0907]">
          <p className="text-sm mb-4">© 2025 World Cuisine. Bản quyền thuộc về chúng tôi.</p>
          <div className="flex flex-wrap justify-center gap-4">
            {legalLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="text-[#1e0907] hover:text-[#bb6f57] text-sm transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;