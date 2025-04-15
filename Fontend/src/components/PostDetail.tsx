"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"

interface Post {
  _id: string
  user_id: {
    _id: string
    username: string
    fullname: string
    avatar?: string
  }
  title: string
  content: string
  images: string[]
  restaurant_id: string
  is_active: boolean
  likes: string[]
  comments: Array<{
    _id: string
    content: string
    createdAt: string
  }>
  viewCount: number
  likeCount: number
  createdAt: string
  updatedAt: string
}

interface User {
  _id: string
  username: string
  fullname: string
  avatar: string
}

const PostDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const [post, setPost] = useState<Post | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  useEffect(() => {
    const fetchPost = async () => {
      try {
        // Lấy thông tin người dùng từ localStorage
        const userProfile = localStorage.getItem("userProfile")
        if (userProfile) {
          setUser(JSON.parse(userProfile))
        }

        // Lấy bài đăng từ API
        const response = await fetch(`http://localhost:8080/api/v1/posts/${id}`)
        if (!response.ok) {
          throw new Error(`Lỗi ${response.status}: Không tìm thấy bài đăng`)
        }
        const data = await response.json()

        // Kiểm tra cấu trúc dữ liệu API
        if (data.statusCode !== 200 || !data.data) {
          throw new Error(data.message || "Không tìm thấy bài đăng")
        }

        // API trả về bài đăng trực tiếp trong data.data
        const fetchedPost: Post = data.data
        setPost(fetchedPost)
      } catch (err: any) {
        console.error("Lỗi khi lấy bài đăng:", err)
        setError(err.message || "Không thể tải bài đăng. Vui lòng thử lại sau.")
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchPost()
    } else {
      setError("ID bài đăng không hợp lệ")
      setLoading(false)
    }
  }, [id])

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) => (prev === 0 ? post!.images.length - 1 : prev - 1))
  }

  const handleNextImage = () => {
    setCurrentImageIndex((prev) => (prev === post!.images.length - 1 ? 0 : prev + 1))
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="h-12 w-12 border-4 border-rose-700 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600 font-medium">Đang tải bài đăng...</p>
        </div>
      </div>
    )
  }

  if (error || !post || !user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="text-rose-600 font-medium text-lg">
            <p>{error || "Không tìm thấy bài đăng hoặc thông tin người dùng"}</p>
            <Link
              to="/profile"
              className="mt-4 inline-block px-6 py-2 bg-rose-600 text-white rounded-md hover:bg-rose-700 transition-colors"
            >
              Quay lại hồ sơ
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Post Detail Card */}
        <div className="bg-white rounded-3xl shadow-md overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-rose-300 to-rose-300 h-32 sm:h-48 relative">
            <div className="absolute inset-0 backdrop-blur-sm"></div>
            <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/10 to-transparent"></div>
          </div>

          <div className="px-5 sm:px-8 pb-8 relative">
            {/* User Info */}
            <div className="flex items-center -mt-16 sm:-mt-24 mb-6">
              <div className="relative z-10">
                <div className="h-20 w-20 sm:h-28 sm:w-28 rounded-full overflow-hidden border-4 border-white shadow-xl bg-white relative group">
                  <img
                    src={user.avatar} // Sử dụng avatar từ localStorage
                    alt={post.user_id.fullname}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
              </div>
              <div className="ml-4">
                <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{post.user_id.fullname}</h1>
                <p className="text-gray-500">@{post.user_id.username}</p>
              </div>
            </div>

            {/* Post Content */}
            <div className="space-y-6">
              {/* Title and Status */}
              <div className="flex justify-between items-start">
                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{post.title}</h2>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    post.is_active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {post.is_active ? "Đang hoạt động" : "Đã ẩn"}
                </span>
              </div>

              {/* Images */}
              {post.images.length > 0 ? (
                <div className="relative rounded-2xl overflow-hidden">
                  <img
                    src={post.images[currentImageIndex]}
                    alt={`Hình ảnh bài đăng ${currentImageIndex + 1}`}
                    className="w-full h-64 sm:h-96 object-cover"
                  />
                  {post.images.length > 1 && (
                    <>
                      <button
                        onClick={handlePrevImage}
                        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>
                      <button
                        onClick={handleNextImage}
                        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                          />
                        </svg>
                      </button>
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                        {post.images.map((_, index) => (
                          <span
                            key={index}
                            className={`h-2 w-2 rounded-full ${
                              index === currentImageIndex ? "bg-white" : "bg-white/50"
                            }`}
                          ></span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <div className="bg-gray-200 rounded-2xl h-64 sm:h-96 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">Không có hình ảnh</span>
                </div>
              )}

              {/* Content */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Nội dung</h3>
                <p className="text-gray-700 whitespace-pre-wrap">{post.content}</p>
              </div>

              {/* Comments */}
              {post.comments.length > 0 && (
                <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Bình luận</h3>
                  <div className="space-y-4">
                    {post.comments.map((comment) => (
                      <div key={comment._id} className="bg-white p-4 rounded-lg border border-gray-200">
                        <p className="text-gray-700">{comment.content}</p>
                        <p className="text-xs text-gray-500 mt-2">
                          {new Date(comment.createdAt).toLocaleDateString("vi-VN", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stats */}
              <div className="flex justify-between items-center bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                    {post.viewCount} lượt xem
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                      />
                    </svg>
                    {post.likeCount} lượt thích
                  </div>
                  <div className="flex items-center text-gray-600">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 10h.01M12 10h.01M16 10h.01M9 16H5v-4a2 2 0 012-2h10a2 2 0 012 2v4h-4m-6 0h6"
                      />
                    </svg>
                    {post.comments.length} bình luận
                  </div>
                </div>
              </div>

              {/* Metadata */}
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Thông tin bài đăng</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-gray-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      ></path>
                    </svg>
                    <div>
                      <p className="text-xs text-gray-500">Ngày đăng</p>
                      <p className="font-medium text-gray-900">
                        {new Date(post.createdAt).toLocaleDateString("vi-VN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-gray-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
                      ></path>
                    </svg>
                    <div>
                      <p className="text-xs text-gray-500">Cập nhật gần nhất</p>
                      <p className="font-medium text-gray-900">
                        {new Date(post.updatedAt).toLocaleDateString("vi-VN", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-gray-400 mr-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      ></path>
                    </svg>
                    <div>
                      <p className="text-xs text-gray-500">Liên kết nhà hàng</p>
                      <Link
                        to={`/restaurants/${post.restaurant_id}`}
                        className="font-medium text-rose-600 hover:text-rose-700"
                      >
                        Xem nhà hàng
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Back Button */}
            <div className="mt-8">
              <Link
                to="/profile"
                className="inline-flex items-center px-6 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-500 transition-all duration-300 font-medium shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Quay lại hồ sơ
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostDetail