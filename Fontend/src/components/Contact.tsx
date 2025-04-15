import { useState } from "react";
import { Utensils, Send, CheckCircle, AlertCircle } from "lucide-react";

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"success" | "error" | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" }); // Xóa lỗi khi thay đổi
  };

  const validateForm = () => {
    const newErrors = { name: "", email: "", message: "" };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = "Họ và tên là bắt buộc";
      isValid = false;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim()) {
      newErrors.email = "Email là bắt buộc";
      isValid = false;
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "Vui lòng nhập địa chỉ email hợp lệ";
      isValid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = "Tin nhắn là bắt buộc";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      // Placeholder cho API call
      console.log("Biểu mẫu đã gửi:", formData);
      // Mô phỏng độ trễ API
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitStatus("success");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 3000); // Xóa trạng thái sau 3 giây
    }
  };

  return (
    <section id="contact" className="py-16 bg-[#efe2db]">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center mb-6">
          <Utensils className="h-8 w-8 text-[#7c160f] mr-2" />
          <h2 className="text-4xl font-bold text-[#7c160f] text-center">
            Kết Nối với Cộng Đồng Ẩm Thực
          </h2>
        </div>
        <p className="text-[#1e0907] text-center mb-12 max-w-2xl mx-auto">
          Bạn có câu hỏi hay ý kiến? Hãy chia sẻ với World Cuisine để cùng thưởng thức những cuộc trò chuyện ẩm thực!
        </p>
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[#1e0907] font-medium mb-1">
                Họ và Tên
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-3 border border-[#bb6f57] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#bb6f57] ${
                  errors.name ? "border-red-600" : ""
                }`}
                placeholder="Nhập họ và tên của bạn"
                disabled={isSubmitting}
              />
              {errors.name && (
                <p className="text-red-600 text-sm mt-1 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" /> {errors.name}
                </p>
              )}
            </div>
            <div>
              <label className="block text-[#1e0907] font-medium mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-3 border border-[#bb6f57] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#bb6f57] ${
                  errors.email ? "border-red-600" : ""
                }`}
                placeholder="Nhập email của bạn"
                disabled={isSubmitting}
              />
              {errors.email && (
                <p className="text-red-600 text-sm mt-1 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" /> {errors.email}
                </p>
              )}
            </div>
            <div>
              <label className="block text-[#1e0907] font-medium mb-1">
                Tin Nhắn
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={`w-full p-3 border border-[#bb6f57] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#bb6f57] ${
                  errors.message ? "border-red-600" : ""
                }`}
                placeholder="Chia sẻ suy nghĩ ẩm thực của bạn"
                rows={4}
                disabled={isSubmitting}
              ></textarea>
              {errors.message && (
                <p className="text-red-600 text-sm mt-1 flex items-center">
                  <AlertCircle className="h-4 w-4 mr-1" /> {errors.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className="w-full bg-[#7c160f] text-white py-3 rounded-lg text-lg font-semibold hover:bg-[#bb6f57] transition flex items-center justify-center disabled:bg-[#7c160f]/50"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                "Đang gửi..."
              ) : (
                <>
                  <Send className="h-5 w-5 mr-2" /> Gửi Tin Nhắn
                </>
              )}
            </button>
          </form>
          {submitStatus === "success" && (
            <p className="text-green-600 text-center mt-4 flex items-center justify-center">
              <CheckCircle className="h-5 w-5 mr-2" /> Tin nhắn đã được gửi thành công!
            </p>
          )}
          {submitStatus === "error" && (
            <p className="text-red-600 text-center mt-4 flex items-center justify-center">
              <AlertCircle className="h-5 w-5 mr-2" /> Gửi tin nhắn thất bại. Vui lòng thử lại.
            </p>
          )}
        </div>
      </div>
    </section>
  );
};

export default Contact;