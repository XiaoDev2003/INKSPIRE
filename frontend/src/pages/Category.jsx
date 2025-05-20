import React, { useState, useEffect, useContext, useCallback, useMemo } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Card, Container, Section, Text, Button } from "../components/ui/ui";
import { Banner } from "../components/common/common";
import axiosClient from "../api/axiosClient";
import DOMPurify from "dompurify";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Component con: FontCard
const FontCard = ({ font, onViewMore, onCopyUrl, getGalleryImageForItem }) => (
  <Card className="overflow-hidden p-0 transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg">
    <div className="relative h-48 overflow-hidden">
      <img
        src={font.image_url || getGalleryImageForItem(font.item_id)}
        alt={font.item_name}
        className="h-full w-full object-cover transition-transform duration-500 hover:scale-110"
        onError={(e) => {
          e.target.src = "/assets/images/placeholder.jpg";
        }}
      />
      <div className="bg-opacity-0 hover:bg-opacity-50 absolute inset-0 flex items-center justify-center bg-black opacity-0 transition-opacity duration-300 hover:opacity-100">
        <button
          onClick={() => onViewMore(font)}
          className="rounded-md bg-amber-500 px-4 py-2 text-white transition-colors duration-300 hover:bg-amber-600"
          aria-label={`Xem chi tiết ${font.item_name}`}
        >
          Xem thêm
        </button>
      </div>
    </div>
    <div className="p-4">
      <h3 className="mb-2 text-lg font-semibold text-gray-800">{font.item_name}</h3>
      <div className="mb-1 flex items-center text-sm text-gray-600">
        <span className="mr-1">Tác giả:</span>
        <span className="font-medium">{font.author_name}</span>
      </div>
      <div className="mb-1 flex items-center text-sm text-gray-600">
        <span className="mr-1">Phân loại:</span>
        <span className="font-medium">{font.category_name}</span>
      </div>
      <div className="mb-1 flex items-center text-sm text-gray-600">
        <span className="mr-1">Ngày đăng:</span>
        <span className="font-medium">
          {new Date(font.created_at).toLocaleDateString("vi-VN")}
        </span>
      </div>
      <div className="mb-1 flex items-center text-sm text-gray-600">
        <span className="mr-1">Lượt xem:</span>
        <span className="font-medium">{font.views.toLocaleString()}</span>
      </div>
      <div className="mb-3 flex items-center text-sm text-gray-600">
        <span className="mr-1">Xuất xứ:</span>
        <span className="font-medium">{font.item_origin || "Không xác định"}</span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onCopyUrl(font.item_url)}
          className="flex flex-1 items-center justify-center rounded-md bg-amber-100 py-2 text-amber-800 transition-colors duration-300 hover:bg-amber-200"
          aria-label={`Sao chép liên kết của ${font.item_name}`}
        >
          <i className="fas fa-copy mr-2"></i>
          Lấy font
        </button>
      </div>
    </div>
  </Card>
);

// Component con: CommentForm
const CommentForm = ({
  currentUserId,
  newComment,
  setNewComment,
  replyingTo,
  setReplyingTo,
  handleSubmitComment,
  commentsLoading,
  commentSortBy,
  handleSortComments,
}) => (
  <div className="mb-6">
    {currentUserId ? (
      <form onSubmit={handleSubmitComment}>
        {replyingTo && (
          <div className="mb-2 flex items-center justify-between rounded-md bg-amber-50 p-2">
            <div>
              <span className="text-gray-600">Đang trả lời bình luận của </span>
              <span className="font-medium text-amber-700">{replyingTo.name}</span>
            </div>
            <button
              type="button"
              onClick={() => setReplyingTo(null)}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Hủy trả lời"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>
        )}
        <textarea
          placeholder="Viết bình luận của bạn..."
          className="h-24 w-full resize-none rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          required
          aria-label="Viết bình luận"
        ></textarea>
        <div className="mt-2 flex items-center justify-between">
          <button
            type="submit"
            className="rounded-md bg-amber-500 px-4 py-2 text-white transition-colors duration-300 hover:bg-amber-600 disabled:opacity-50"
            disabled={commentsLoading}
            aria-label={replyingTo ? "Gửi trả lời" : "Gửi bình luận"}
          >
            {commentsLoading ? "Đang gửi..." : replyingTo ? "Gửi trả lời" : "Gửi bình luận"}
          </button>
          <div className="flex space-x-2">
            <button
              type="button"
              onClick={() => handleSortComments("likes")}
              className={`rounded-md px-3 py-1 text-sm ${commentSortBy === "likes" ? "bg-amber-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
              aria-label="Sắp xếp theo lượt thích"
            >
              <i className="fas fa-thumbs-up mr-1"></i> Nhiều lượt thích
            </button>
            <button
              type="button"
              onClick={() => handleSortComments("newest")}
              className={`rounded-md px-3 py-1 text-sm ${commentSortBy === "newest" ? "bg-amber-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
              aria-label="Sắp xếp theo mới nhất"
            >
              <i className="fas fa-clock mr-1"></i> Mới nhất
            </button>
          </div>
        </div>
      </form>
    ) : (
      <div className="mb-4 rounded-lg border border-amber-200 bg-amber-50 p-4 text-center">
        <p className="text-amber-700 mb-2">Vui lòng đăng nhập để bình luận</p>
        <a
          href="/login"
          className="inline-block rounded-md bg-amber-500 px-4 py-2 text-white transition-colors duration-300 hover:bg-amber-600"
          aria-label="Đăng nhập để bình luận"
        >
          Đăng nhập
        </a>
      </div>
    )}
    {!currentUserId && (
      <div className="flex justify-end space-x-2 mb-4">
        <button
          type="button"
          onClick={() => handleSortComments("likes")}
          className={`rounded-md px-3 py-1 text-sm ${commentSortBy === "likes" ? "bg-amber-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
          aria-label="Sắp xếp theo lượt thích"
        >
          <i className="fas fa-thumbs-up mr-1"></i> Nhiều lượt thích
        </button>
        <button
          type="button"
          onClick={() => handleSortComments("newest")}
          className={`rounded-md px-3 py-1 text-sm ${commentSortBy === "newest" ? "bg-amber-500 text-white" : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
          aria-label="Sắp xếp theo mới nhất"
        >
          <i className="fas fa-clock mr-1"></i> Mới nhất
        </button>
      </div>
    )}
  </div>
);

// Component con: CommentList
const CommentList = ({
  comments,
  commentsLoading,
  currentCommentPage,
  commentsPerPage,
  setCurrentCommentPage,
  renderComment,
  currentUserId,
}) => (
  <div className="relative">
    <div className="mb-12 max-h-[500px] overflow-y-auto pr-2">
      <div className="space-y-6">
        {commentsLoading ? (
          <div className="flex justify-center items-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-amber-500"></div>
            <p className="ml-3 text-gray-600">Đang tải bình luận...</p>
          </div>
        ) : !comments || comments.length === 0 ? (
          <div className="text-center py-6 text-gray-600 border border-gray-200 rounded-lg p-6 my-4 bg-gray-50">
            <svg
              className="mx-auto h-12 w-12 text-gray-400 mb-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
              />
            </svg>
            <p className="text-lg font-medium mb-2">Chưa có bình luận nào</p>
            <p className="text-gray-500">
              Hãy là người đầu tiên chia sẻ ý kiến của bạn về font chữ này!
            </p>
            {currentUserId && (
              <button
                onClick={() => document.querySelector("textarea")?.focus()}
                className="mt-4 px-4 py-2 bg-amber-500 text-white rounded-md hover:bg-amber-600 transition-colors"
                aria-label="Viết bình luận"
              >
                Viết bình luận
              </button>
            )}
          </div>
        ) : (
          comments
            .filter((comment) => comment && comment.id)
            .slice(
              (currentCommentPage - 1) * commentsPerPage,
              currentCommentPage * commentsPerPage,
            )
            .map((comment) => (
              <div key={comment.id} className="mb-6">
                {renderComment(comment, false)}
                {comment.replies && comment.replies.length > 0 && (
                  <div
                    className="mt-3 space-y-3 pl-2 relative ml-5 border-l-2 border-gray-200"
                  >
                    {comment.replies.map((reply) => renderComment(reply, true))}
                  </div>
                )}
              </div>
            ))
        )}
      </div>
    </div>
    {comments &&
      Array.isArray(comments) &&
      comments.filter((c) => c && c.id).length > commentsPerPage && (
        <div className="sticky right-0 bottom-0 left-0 flex items-center justify-center border-t border-gray-100 bg-white py-2">
          <div className="flex space-x-2">
            {currentCommentPage > 1 && (
              <button
                onClick={() => setCurrentCommentPage((prev) => prev - 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
                aria-label="Trang bình luận trước"
              >
                <i className="fas fa-chevron-left"></i>
              </button>
            )}
            {Array.from(
              {
                length: Math.ceil(
                  comments.filter((c) => c && c.id).length / commentsPerPage,
                ),
              },
              (_, i) => {
                const totalPages = Math.ceil(
                  comments.filter((c) => c && c.id).length / commentsPerPage,
                );
                if (
                  i === 0 ||
                  i === totalPages - 1 ||
                  (i >= currentCommentPage - 2 && i <= currentCommentPage) ||
                  (i <= currentCommentPage + 1 && i >= currentCommentPage)
                ) {
                  return (
                    <button
                      key={i + 1}
                      onClick={() => setCurrentCommentPage(i + 1)}
                      className={`flex h-8 w-8 items-center justify-center rounded-full ${
                        currentCommentPage === i + 1
                          ? "bg-amber-500 text-white"
                          : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                      }`}
                      aria-label={`Trang bình luận ${i + 1}`}
                    >
                      {i + 1}
                    </button>
                  );
                }
                return null;
              },
            )}
            {currentCommentPage <
              Math.ceil(
                comments.filter((c) => c && c.id).length / commentsPerPage,
              ) && (
              <button
                onClick={() => setCurrentCommentPage((prev) => prev + 1)}
                className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
                aria-label="Trang bình luận tiếp theo"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            )}
          </div>
        </div>
      )}
  </div>
);

const Category = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLanguages, setSelectedLanguages] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedFont, setSelectedFont] = useState(null);
  const [categoryType, setCategoryType] = useState("all");
  const [showCopyNotification, setShowCopyNotification] = useState(false);
  const [currentCommentPage, setCurrentCommentPage] = useState(1);
  const [comments, setComments] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [commentError, setCommentError] = useState(null);
  const [commentSuccess, setCommentSuccess] = useState(null);
  const [replyingTo, setReplyingTo] = useState(null);
  const [commentSortBy, setCommentSortBy] = useState("likes");
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isReacting, setIsReacting] = useState(false);
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentFontPage, setCurrentFontPage] = useState(1);
  const fontsPerPage = 10;
  const commentsPerPage = 10;

  const location = useLocation();
  const { itemId } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const currentUserId = user?.user_id || null;

  const placeholderImage = "/assets/images/placeholder.jpg";

  const languageMap = {
    Vietnamese: "Tiếng Việt",
    Chinese: "Tiếng Trung",
    Japanese: "Tiếng Nhật",
    Korean: "Tiếng Hàn",
    English: "Tiếng Anh",
    Unknown: "Không xác định",
  };

  const languages = Object.entries(languageMap)
    .filter(([key]) => key !== "Unknown")
    .map(([key, name], index) => ({
      id: index + 1,
      key,
      name,
    }));

  const normalizeApiData = useCallback((data, dataType) => {
    if (!data) return [];
    try {
      if (Array.isArray(data)) return data;
      if (data[dataType] && Array.isArray(data[dataType])) return data[dataType];
      if (typeof data === "object" && !Array.isArray(data))
        return Object.values(data).filter((item) => item && typeof item === "object");
      return [];
    } catch {
      return [];
    }
  }, []);

  const normalizeCommentData = useCallback((comment) => {
    if (!comment || typeof comment !== "object") {
      console.warn("Invalid comment: not an object", comment);
      return null;
    }
    try {
      const commentId = comment.comment_id || comment.id || comment._id || comment.commentId;
      if (!commentId) {
        console.warn("Invalid comment: missing ID", comment);
        return null;
      }
      let parentCommentId = null;
      if (
        comment.parent_comment_id !== null &&
        comment.parent_comment_id !== undefined
      ) {
        const parsedParentId = parseInt(comment.parent_comment_id);
        if (!isNaN(parsedParentId)) parentCommentId = parsedParentId;
        else console.warn("Invalid parent_comment_id:", comment.parent_comment_id);
      }
      return {
        comment_id: commentId,
        user_id: parseInt(comment.user_id || comment.userId || 0),
        parent_comment_id: parentCommentId,
        comment_content: comment.comment_content || comment.content || comment.text || "Không có nội dung",
        created_at: comment.created_at || comment.createdAt || new Date().toISOString(),
        likes_count: parseInt(comment.likes_count || comment.likes || 0),
        dislikes_count: parseInt(comment.dislikes_count || comment.dislikes || 0),
        username: comment.username || comment.user?.username || "",
        user_reaction: comment.user_reaction || comment.reaction || null,
      };
    } catch (error) {
      console.error("Error normalizing comment:", comment, error);
      return null;
    }
  }, []);

  const validateComment = useCallback((comment) => {
    if (!comment || typeof comment !== "object") {
      console.warn("Invalid comment: not an object", comment);
      return false;
    }
    if (!comment.comment_id && !comment.id && !comment._id && !comment.commentId) {
      console.warn("Invalid comment: missing ID", comment);
      return false;
    }
    if (
      comment.parent_comment_id !== null &&
      comment.parent_comment_id !== undefined &&
      isNaN(parseInt(comment.parent_comment_id))
    ) {
      console.warn("Invalid comment: invalid parent_comment_id", comment);
      return false;
    }
    return true;
  }, []);

  const compareCommentIds = useCallback((id1, id2) => {
    if (!id1 || !id2) return false;
    return String(id1) === String(id2);
  }, []);

  const getUserInfo = useCallback(
    (userId, username = "") => {
      let fullName = `Người dùng #${userId}`;
      let userAvatar = "";
      if (Array.isArray(users) && users.length > 0) {
        const user = users.find((u) => u.user_id === userId) || {};
        if (user.first_name || user.last_name) {
          fullName = `${user.first_name || ""} ${user.last_name || ""}`.trim();
        } else if (username) {
          fullName = username;
        }
        userAvatar = user.avatar_url || "";
      } else if (username) {
        fullName = username;
      }
      return {
        name: fullName,
        avatar: userAvatar || (fullName[0] || "A").toUpperCase(),
        color: ["amber", "green", "blue", "purple", "red"][
          Math.floor(Math.random() * 5)
        ],
      };
    },
    [users],
  );

  const processCommentsFromApi = useCallback(async (itemId) => {
    try {
      console.log("Fetching comments for itemId:", itemId);
      const response = await axiosClient.get(`/api/comments?item_id=${itemId}`);
      console.log("Raw API response for comments:", response.data);

      if (!response.data) {
        console.warn("No data returned from API");
        return [];
      }

      if (response.data?.error) {
        console.warn("API returned an error:", response.data.error);
        return [];
      }

      let commentsData = [];
      if (typeof response.data === "object" && !Array.isArray(response.data)) {
        if (response.data?.data) {
          if (typeof response.data.data === "object" && !Array.isArray(response.data.data)) {
            commentsData = Object.values(response.data.data);
          } else if (Array.isArray(response.data.data)) {
            commentsData = response.data.data;
          }
        } else if (response.data?.comments) {
          if (typeof response.data.comments === "object" && !Array.isArray(response.data.comments)) {
            commentsData = Object.values(response.data.comments);
          } else if (Array.isArray(response.data.comments)) {
            commentsData = response.data.comments;
          }
        } else if (response.data?.result) {
          if (typeof response.data.result === "object" && !Array.isArray(response.data.result)) {
            commentsData = Object.values(response.data.result);
          } else if (Array.isArray(response.data.result)) {
            commentsData = response.data.result;
          }
        } else if (response.data?.commentsList) {
          if (typeof response.data.commentsList === "object" && !Array.isArray(response.data.commentsList)) {
            commentsData = Object.values(response.data.commentsList);
          } else if (Array.isArray(response.data.commentsList)) {
            commentsData = response.data.commentsList;
          }
        } else if (response.data?.payload) {
          if (typeof response.data.payload === "object" && !Array.isArray(response.data.payload)) {
            commentsData = Object.values(response.data.payload);
          } else if (Array.isArray(response.data.payload)) {
            commentsData = response.data.payload;
          }
        } else {
          commentsData = Object.values(response.data).filter(
            (item) => item && typeof item === "object"
          );
        }
      } else if (Array.isArray(response.data)) {
        commentsData = response.data;
      } else {
        console.warn("Unexpected API response format:", response.data);
        return [];
      }

      if (commentsData.length === 0) {
        console.warn("No comments found for itemId:", itemId);
        return [];
      }

      console.log("Comments before validation:", commentsData);
      const normalized = commentsData
        .filter(validateComment)
        .map(normalizeCommentData)
        .filter((comment) => comment !== null);
      console.log("Normalized comments:", normalized);
      return normalized;
    } catch (error) {
      console.error("Failed to fetch comments:", error.response?.data || error.message);
      throw new Error("Failed to fetch comments");
    }
  }, [normalizeCommentData, validateComment]);

  const formatComments = useCallback(
    (commentsData) => {
      let dataArray = [];
      if (Array.isArray(commentsData)) {
        dataArray = commentsData;
      } else if (commentsData && typeof commentsData === 'object') {
        dataArray = Object.values(commentsData).filter(item => item && typeof item === 'object');
      } else {
        return [];
      }

      let sortedComments = [...dataArray];
      if (commentSortBy === "likes") {
        sortedComments.sort((a, b) => (b.likes_count || 0) - (a.likes_count || 0));
      } else if (commentSortBy === "newest") {
        sortedComments.sort(
          (a, b) => new Date(b.created_at || 0) - new Date(a.created_at || 0),
        );
      }

      const parentComments = sortedComments.filter(
        (comment) => comment.parent_comment_id === null || comment.parent_comment_id === undefined || comment.parent_comment_id === 0,
      );
      const childComments = sortedComments.filter(
        (comment) => comment.parent_comment_id !== null && comment.parent_comment_id !== undefined && comment.parent_comment_id !== 0,
      );
      const formatted = parentComments
        .map((comment) => {
          try {
            const { name, avatar, color } = getUserInfo(comment.user_id, comment.username);
            const replies = childComments
              .filter((reply) =>
                compareCommentIds(reply.parent_comment_id, comment.comment_id),
              )
              .map((reply) => {
                try {
                  const replyUserInfo = getUserInfo(reply.user_id, reply.username);
                  return {
                    id: reply.comment_id,
                    parent_id: reply.parent_comment_id,
                    user_id: reply.user_id,
                    name: replyUserInfo.name,
                    avatar: replyUserInfo.avatar,
                    color: replyUserInfo.color,
                    date: new Date(reply.created_at || Date.now()).toLocaleString(
                      "vi-VN",
                    ),
                    content: reply.comment_content,
                    likes_count: reply.likes_count || 0,
                    dislikes_count: reply.dislikes_count || 0,
                    user_reaction: reply.user_reaction || null,
                  };
                } catch {
                  return null;
                }
              })
              .filter((reply) => reply !== null);
            return {
              id: comment.comment_id,
              user_id: comment.user_id,
              name,
              avatar,
              color,
              date: new Date(comment.created_at || Date.now()).toLocaleString("vi-VN"),
              content: comment.comment_content,
              likes_count: comment.likes_count || 0,
              dislikes_count: comment.dislikes_count || 0,
              user_reaction: comment.user_reaction || null,
              replies,
            };
          } catch {
            return null;
          }
        })
        .filter((comment) => comment !== null);
      console.log("Formatted comments:", formatted);
      return formatted;
    },
    [commentSortBy, getUserInfo, compareCommentIds],
  );

  useEffect(() => {
    const abortController = new AbortController();
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(null);
        const endpoints = [
          { url: "/api/items", setter: setItems, normalizeKey: "items" },
          { url: "/api/categories", setter: setCategories, normalizeKey: "categories" },
          { url: "/api/gallery", setter: setGalleryImages, normalizeKey: "galleries" },
          { url: "/api/users", setter: setUsers, normalizeKey: "users" },
        ];
        const results = await Promise.allSettled(
          endpoints.map((endpoint) =>
            axiosClient.get(endpoint.url, { signal: abortController.signal }),
          ),
        );
        results.forEach((result, index) => {
          const { setter, normalizeKey } = endpoints[index];
          if (result.status === "fulfilled") {
            setter(normalizeApiData(result.value.data, normalizeKey));
          }
        });
      } catch (err) {
        if (err.name === "AbortError") return;
        setError("Đã có lỗi khi lấy dữ liệu. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
    return () => abortController.abort();
  }, [normalizeApiData]);

  useEffect(() => {
    if (showModal && selectedFont && selectedFont.item_id) {
      const fetchComments = async () => {
        try {
          setCommentsLoading(true);
          setCommentError(null);
          const normalizedComments = await processCommentsFromApi(selectedFont.item_id);
          const formattedComments = formatComments(normalizedComments);
          setComments(formattedComments);
          setCurrentCommentPage(1);
        } catch (error) {
          console.error("Error fetching comments:", error);
          setCommentError("Không thể tải bình luận. Vui lòng thử lại sau.");
          setComments([]);
        } finally {
          setCommentsLoading(false);
        }
      };
      fetchComments();
    }
  }, [showModal, selectedFont, formatComments, processCommentsFromApi]);

  useEffect(() => {
    const path = location.pathname;
    let newCategoryType = "all";
    if (path.includes("/traditional")) newCategoryType = "traditional";
    else if (path.includes("/modern")) newCategoryType = "modern";
    else if (path.includes("/handwriting")) newCategoryType = "handwriting_design";
    setCategoryType(newCategoryType);

    if (itemId && items.length > 0) {
      const fontItem = items.find((item) => item.item_id === parseInt(itemId));
      if (fontItem) {
        console.log("Selected font from itemId:", fontItem);
        setSelectedFont(fontItem);
        setShowModal(true);
      }
    }
  }, [location, itemId, items]);

  const filteredFonts = useMemo(() => {
    if (!categories || !items) return [];

    return items.filter(item => {
      const category = categories.find(cat => cat.category_id === item.category_id);
      if (!category) return false;

      const itemCategoryType = category.category_type;
      const matchesSearchTerm =
        item.item_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.author_name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesLanguage =
        selectedLanguages.length === 0 || selectedLanguages.includes(item.lang_type);
      const matchesCategory = categoryType === 'all' || itemCategoryType === categoryType;

      return matchesSearchTerm && matchesLanguage && matchesCategory;
    });
  }, [items, categories, searchTerm, selectedLanguages, categoryType]);

  const paginatedFonts = useMemo(() => {
    const start = (currentFontPage - 1) * fontsPerPage;
    const end = start + fontsPerPage;
    return filteredFonts.slice(start, end);
  }, [filteredFonts, currentFontPage]);

  const getGalleryImageForItem = (itemId) => {
    if (!galleryImages || !Array.isArray(galleryImages)) return null;
    const imagesForItem = galleryImages.filter(image => image.item_id === itemId);
    return imagesForItem.length > 0 ? imagesForItem[0].image_url : null;
  };

  const handleLanguageChange = useCallback((languageKey) => {
    setSelectedLanguages((prev) =>
      prev.includes(languageKey)
        ? prev.filter((lang) => lang !== languageKey)
        : [...prev, languageKey],
    );
    setCurrentFontPage(1);
  }, []);

  const handleViewMore = useCallback(
    (font) => {
      console.log("Selected font:", font);
      setSelectedFont(font);
      setShowModal(true);
      navigate(`/category/${categoryType}/${font.item_id}`, { replace: true });
    },
    [categoryType, navigate],
  );

  const handleCloseModal = useCallback(() => {
    setShowModal(false);
    setCommentError(null);
    setCommentSuccess(null);
    navigate(`/category/${categoryType}`, { replace: true });
  }, [categoryType, navigate]);

  const handleCopyUrl = useCallback((url) => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setShowCopyNotification(true);
        setTimeout(() => setShowCopyNotification(false), 2000);
      })
      .catch(() => {
        setError("Không thể sao chép URL. Vui lòng thử lại sau.");
        setTimeout(() => setError(null), 3000);
      });
  }, []);

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (isSubmitting) return;
    if (!currentUserId) {
      setCommentError("Vui lòng đăng nhập để gửi bình luận.");
      setTimeout(() => setCommentError(null), 3000);
      return;
    }
    if (!newComment.trim()) {
      setCommentError("Nội dung bình luận không được để trống.");
      setTimeout(() => setCommentError(null), 3000);
      return;
    }
    setIsSubmitting(true);
    try {
      setCommentsLoading(true);
      const commentData = {
        comment_content: newComment,
        user_id: currentUserId,
        item_id: selectedFont.item_id,
        category_id: selectedFont.category_id,
      };
      if (replyingTo) {
        const parentCommentId = parseInt(replyingTo.id);
        if (isNaN(parentCommentId)) {
          setCommentError("ID bình luận cha không hợp lệ.");
          setTimeout(() => setCommentError(null), 3000);
          return;
        }
        commentData.parent_comment_id = parentCommentId;
      }
      await axiosClient.post("/api/comments", commentData);
      const normalizedComments = await processCommentsFromApi(selectedFont.item_id);
      const formattedComments = formatComments(normalizedComments);
      setComments(formattedComments);
      setReplyingTo(null);
      setNewComment("");
      setCommentSuccess("Gửi bình luận thành công!");
      setCommentError(null);
      setTimeout(() => setCommentSuccess(null), 3000);
    } catch (err) {
      setCommentError(
        err.response?.data?.error || "Đã có lỗi khi gửi bình luận. Vui lòng thử lại sau.",
      );
      setTimeout(() => setCommentError(null), 3000);
    } finally {
      setCommentsLoading(false);
      setIsSubmitting(false);
    }
  };

  const handleReplyComment = useCallback((comment) => {
    if (comment && comment.id) {
      setReplyingTo({ ...comment, id: parseInt(comment.id) });
      const textarea = document.querySelector(
        'textarea[placeholder="Viết bình luận của bạn..."]',
      );
      if (textarea) {
        textarea.focus();
        textarea.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  }, []);

  const updateReactionCounts = useCallback(
    (oldReaction, newReaction, likesCount, dislikesCount) => {
      let newLikes = likesCount;
      let newDislikes = dislikesCount;
      let finalReaction = newReaction;
      if (oldReaction === "like" && newReaction === "dislike") {
        newLikes--;
        newDislikes++;
      } else if (oldReaction === "dislike" && newReaction === "like") {
        newLikes++;
        newDislikes--;
      } else if (!oldReaction && newReaction === "like") {
        newLikes++;
      } else if (!oldReaction && newReaction === "dislike") {
        newDislikes++;
      } else if (oldReaction === newReaction) {
        if (newReaction === "like") newLikes--;
        else newDislikes--;
        finalReaction = null;
      }
      return { newLikes, newDislikes, finalReaction };
    },
    [],
  );

  const handleReaction = useCallback(
    async (commentId, reactionType, isReply = false, parentId = null) => {
      if (!currentUserId || isReacting) {
        setCommentError(
          currentUserId
            ? "Đang xử lý phản ứng. Vui lòng thử lại sau."
            : "Vui lòng đăng nhập để thích hoặc không thích bình luận.",
        );
        setTimeout(() => setCommentError(null), 3000);
        return;
      }
      setIsReacting(true);
      try {
        await axiosClient.post("/api/comment-reactions", {
          user_id: currentUserId,
          comment_id: commentId,
          reaction_type: reactionType,
        });
        setComments((prevComments) =>
          prevComments.map((comment) => {
            if (isReply && parentId && compareCommentIds(comment.id, parentId)) {
              return {
                ...comment,
                replies: comment.replies.map((reply) => {
                  if (compareCommentIds(reply.id, commentId)) {
                    const { newLikes, newDislikes, finalReaction } = updateReactionCounts(
                      reply.user_reaction,
                      reactionType,
                      reply.likes_count,
                      reply.dislikes_count,
                    );
                    return {
                      ...reply,
                      likes_count: newLikes,
                      dislikes_count: newDislikes,
                      user_reaction: finalReaction,
                    };
                  }
                  return reply;
                }),
              };
            } else if (!isReply && compareCommentIds(comment.id, commentId)) {
              const { newLikes, newDislikes, finalReaction } = updateReactionCounts(
                comment.user_reaction,
                reactionType,
                comment.likes_count,
                comment.dislikes_count,
              );
              return {
                ...comment,
                likes_count: newLikes,
                dislikes_count: newDislikes,
                user_reaction: finalReaction,
              };
            }
            return comment;
          }),
        );
        if (selectedFont) {
          const normalizedComments = await processCommentsFromApi(selectedFont.item_id);
          const formattedComments = formatComments(normalizedComments);
          setComments(formattedComments);
        }
      } catch {
        setCommentError("Đã có lỗi khi thực hiện phản ứng với bình luận.");
        setTimeout(() => setCommentError(null), 3000);
      } finally {
        setIsReacting(false);
      }
    },
    [
      currentUserId,
      isReacting,
      compareCommentIds,
      updateReactionCounts,
      selectedFont,
      processCommentsFromApi,
      formatComments,
    ],
  );

  const handleSortComments = useCallback((sortType) => {
    setCommentSortBy(sortType);
  }, []);

  const renderComment = useCallback(
    (comment, isReply = false) => {
      if (!comment || !comment.id) return null;
      return (
        <div
          key={comment.id}
          className={`comment-item ${isReply ? "reply-comment" : "parent-comment"} bg-white rounded-lg p-4 shadow-sm border border-gray-200 ${isReply ? "ml-10 border-l-4 border-gray-500" : ""}`}
          role="article"
          aria-label={isReply ? "Bình luận trả lời" : "Bình luận chính"}
        >
          {isReply && (
            <>
              <div className="absolute left-[-20px] top-[20px] w-[20px] h-[1px] bg-gray-200" />
              <div className="absolute left-[-20px] top-0 bottom-0 w-[1px] bg-gray-200 opacity-50" />
            </>
          )}
          <div className="flex items-center mb-3">
            <div
              className={`w-10 h-10 rounded-full bg-${comment.color}-500 flex items-center justify-center text-white font-bold shadow-md mr-3`}
              aria-hidden="true"
            >
              {typeof comment.avatar === "string" && comment.avatar.length === 1
                ? comment.avatar
                : comment.name.charAt(0)}
            </div>
            <div className="flex-1">
              <div className="font-bold text-base">{comment.name}</div>
              <div className="text-sm text-gray-600">{comment.date}</div>
            </div>
          </div>
          <div
            className="comment-content mb-3 leading-relaxed break-words border-l-2 border-gray-100 pl-1"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(comment.content) }}
          />
          <div className="flex items-center gap-4">
            <button
              onClick={() => handleReaction(comment.id, "like", isReply, isReply ? comment.parent_id : null)}
              className={`flex items-center gap-1.5 bg-none border-none cursor-pointer p-1 rounded ${comment.user_reaction === "like" ? "text-blue-600 bg-blue-100" : "text-gray-600 hover:bg-gray-100"}`}
              aria-label={`Thích bình luận của ${comment.name}`}
              disabled={isReacting}
            >
              <span>👍</span>
              <span>{comment.likes_count}</span>
            </button>
            <button
              onClick={() => handleReaction(comment.id, "dislike", isReply, isReply ? comment.parent_id : null)}
              className={`flex items-center gap-1.5 bg-none border-none cursor-pointer p-1 rounded ${comment.user_reaction === "dislike" ? "text-red-600 bg-red-100" : "text-gray-600 hover:bg-gray-100"}`}
              aria-label={`Không thích bình luận của ${comment.name}`}
              disabled={isReacting}
            >
              <span>👎</span>
              <span>{comment.dislikes_count}</span>
            </button>
            {!isReply && currentUserId && (
              <button
                onClick={() => handleReplyComment(comment)}
                className="flex items-center gap-1.5 bg-none border-none cursor-pointer text-blue-600 p-1 rounded hover:bg-gray-100"
                aria-label={`Trả lời bình luận của ${comment.name}`}
              >
                <i className="fas fa-reply text-sm"></i>
                Trả lời
              </button>
            )}
          </div>
        </div>
      );
    },
    [handleReaction, handleReplyComment, currentUserId, isReacting],
  );

  const getCategoryInfo = useCallback(() => {
    const category = categories.find((cat) => cat.category_type === categoryType) || {};
    return {
      title: category.category_name || "Thư viện font thư pháp",
      subtitle:
        category.category_des ||
        "Khám phá và tải xuống các font thư pháp đa dạng từ nhiều nền văn hóa khác nhau",
      imageSrc: category.image_url || "/banner/home.png",
    };
  }, [categories, categoryType]);

  const categoryInfo = getCategoryInfo();

  return (
    <div className="min-h-screen bg-gray-50">
      <Section py="0" className="md:py-12">
        <Container className="px-4 sm:px-6 md:px-8">
          <Banner
            title={categoryInfo.title}
            subtitle={categoryInfo.subtitle}
            ctaText="Tìm hiểu thêm"
            ctaLink="/about"
            imageSrc="/banner/gallery.png"
            className="aspect-[10/5]"
          />
        </Container>
      </Section>
      <div className="container mx-auto px-4 py-8">
        <Card className="mb-8">
          <div className="mb-4 flex flex-col items-center justify-between md:flex-row">
            <div className="mb-4 w-full md:mb-0 md:w-1/2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm kiếm font thư pháp..."
                  className="w-full rounded-md border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-amber-500 focus:outline-none"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  aria-label="Tìm kiếm font thư pháp"
                />
                <button
                  className="absolute top-1/2 right-2 -translate-y-1/2 transform text-gray-500 hover:text-amber-500"
                  aria-label="Tìm kiếm"
                >
                  <i className="fas fa-search"></i>
                </button>
              </div>
            </div>
            <button
              className="flex items-center rounded-md bg-amber-500 px-4 py-2 text-white transition-colors duration-300 hover:bg-amber-600"
              onClick={() => setShowFilters(!showFilters)}
              aria-label={showFilters ? "Ẩn bộ lọc" : "Hiện bộ lọc"}
            >
              <i
                className={`fas fa-filter mr-2 ${showFilters ? "text-white" : ""}`}
              ></i>
              {showFilters ? "Ẩn bộ lọc" : "Hiện bộ lọc"}
            </button>
          </div>
          {showFilters && (
            <div className="mt-4 border-t border-gray-200 p-4">
              <h3 className="mb-2 text-lg font-semibold">Lọc theo ngôn ngữ:</h3>
              <div className="flex flex-wrap gap-2">
                {languages.map((language) => (
                  <button
                    key={language.id}
                    className={`rounded-full px-3 py-1 text-sm ${
                      selectedLanguages.includes(language.key)
                        ? "bg-amber-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    onClick={() => handleLanguageChange(language.key)}
                    aria-label={`Lọc theo ${language.name}`}
                  >
                    {language.name}
                  </button>
                ))}
              </div>
            </div>
          )}
        </Card>
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-center">
            <p className="text-red-600">{error}</p>
          </div>
        )}
        <div className="mb-4">
          <p className="text-gray-600">
            Hiển thị {filteredFonts.length} font thư pháp
            {selectedLanguages.length > 0 &&
              ` cho ${selectedLanguages
                  .map((lang) => languageMap[lang] || lang)
                  .join(", ")}`}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {loading ? (
            Array(6)
              .fill()
              .map((_, i) => (
                <Skeleton key={i} height={300} className="rounded-lg" />
              ))
          ) : paginatedFonts.length === 0 ? (
            <div className="py-4 text-center text-gray-500">
              Không tìm thấy font chữ nào
            </div>
          ) : (
            paginatedFonts.map((font) => (
              <FontCard
                key={font.item_id}
                font={font}
                onViewMore={handleViewMore}
                onCopyUrl={handleCopyUrl}
                getGalleryImageForItem={getGalleryImageForItem}
              />
            ))
          )}
        </div>
        {filteredFonts.length > fontsPerPage && (
          <div className="flex justify-center mt-6">
            <div className="flex space-x-2">
              {currentFontPage > 1 && (
                <button
                  onClick={() => setCurrentFontPage((prev) => prev - 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
                  aria-label="Trang font trước"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
              )}
              {Array.from(
                {
                  length: Math.ceil(filteredFonts.length / fontsPerPage),
                },
                (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentFontPage(i + 1)}
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      currentFontPage === i + 1
                        ? "bg-amber-500 text-white"
                        : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                    }`}
                    aria-label={`Trang font ${i + 1}`}
                  >
                    {i + 1}
                  </button>
                ),
              )}
              {currentFontPage < Math.ceil(filteredFonts.length / fontsPerPage) && (
                <button
                  onClick={() => setCurrentFontPage((prev) => prev + 1)}
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300"
                  aria-label="Trang font tiếp theo"
                >
                  <i className="fas fa-chevron-right"></i>
                </button>
              )}
            </div>
          </div>
        )}
        {showCopyNotification && (
          <div className="animate-fade-in-out fixed top-4 right-4 z-[1000] rounded-md bg-green-500 px-4 py-2 text-white shadow-lg">
            <div className="flex items-center">
              <i className="fas fa-check-circle mr-2"></i>
              Đã sao chép URL font vào clipboard!
            </div>
          </div>
        )}
        {showModal && selectedFont && (
          <div
            className="bg-opacity-50 fixed inset-0 z-50 flex items-center justify-center bg-black p-4"
            role="dialog"
            aria-labelledby="modal-title"
          >
            <Card className="max-h-[90vh] w-full max-w-5xl overflow-y-auto">
              <div className="flex items-center justify-between border-b border-gray-200 p-6">
                <h2 id="modal-title" className="text-2xl font-bold text-gray-800">
                  {selectedFont.item_name}
                </h2>
                <button
                  onClick={handleCloseModal}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                  aria-label="Đóng chi tiết font"
                >
                  <i className="fas fa-times text-xl"></i>
                </button>
              </div>
              <div className="p-6">
                <div className="flex flex-col gap-6 md:flex-row">
                  <div className="md:w-1/2">
                    <img
                      src={selectedFont.image_url || getGalleryImageForItem(selectedFont.item_id)}
                      alt={selectedFont.item_name}
                      className="h-auto w-full rounded-lg shadow-md"
                      onError={(e) => {
                        e.target.src = "/assets/images/placeholder.jpg";
                      }}
                    />
                  </div>
                  <div className="md:w-1/2">
                    <div className="mb-4">
                      <h3 className="mb-2 text-lg font-semibold text-gray-800">
                        Thông tin chi tiết
                      </h3>
                      <div className="space-y-2">
                        <p className="flex items-center">
                          <span className="w-32 text-gray-600">Tác giả:</span>
                          <span className="font-medium">{selectedFont.author_name}</span>
                        </p>
                        <p className="flex items-center">
                          <span className="w-32 text-gray-600">Phân loại:</span>
                          <span className="font-medium">{selectedFont.category_name}</span>
                        </p>
                        <p className="flex items-center">
                          <span className="w-32 text-gray-600">Ngày đăng:</span>
                          <span className="font-medium">
                            {new Date(selectedFont.created_at).toLocaleDateString("vi-VN")}
                          </span>
                        </p>
                        <p className="flex items-center">
                          <span className="w-32 text-gray-600">Lượt xem:</span>
                          <span className="font-medium">
                            {selectedFont.views.toLocaleString()}
                          </span>
                        </p>
                        <p className="flex items-center">
                          <span className="w-32 text-gray-600">Xuất xứ:</span>
                          <span className="font-medium">
                            {selectedFont.item_origin || "Không xác định"}
                          </span>
                        </p>
                        <p className="flex items-center">
                          <span className="w-32 text-gray-600">Ngôn ngữ:</span>
                          <span className="font-medium">
                            {languageMap[selectedFont.lang_type] || selectedFont.lang_type}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div className="mb-4">
                      <h3 className="mb-2 text-lg font-semibold text-gray-800">Mô tả</h3>
                      <p className="text-gray-700">{selectedFont.item_des}</p>
                    </div>
                    <div className="grid grid-cols-1 gap-3">
                      <button
                        onClick={() => handleCopyUrl(selectedFont.item_url)}
                        className="flex w-full items-center justify-center rounded-md bg-amber-500 py-3 text-white transition-colors duration-300 hover:bg-amber-600"
                        aria-label="Sao chép liên kết font"
                      >
                        <i className="fas fa-copy mr-2"></i>
                        Lấy font
                      </button>
                      <a
                        href="/feedback"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-center rounded-md bg-gray-200 py-3 text-gray-700 transition-colors duration-300 hover:bg-gray-300"
                        aria-label="Báo cáo font"
                      >
                        <i className="fas fa-flag mr-2"></i>
                        Báo cáo
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <h3 className="mb-4 text-lg font-semibold text-gray-800">Bình luận</h3>
                  {commentError && (
                    <div className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-center">
                      <p className="text-red-600">{commentError}</p>
                    </div>
                  )}
                  {commentSuccess && (
                    <div className="mb-4 rounded-lg border border-green-200 bg-green-50 p-4 text-center">
                      <p className="text-green-600">{commentSuccess}</p>
                    </div>
                  )}
                  <CommentForm
                    currentUserId={currentUserId}
                    newComment={newComment}
                    setNewComment={setNewComment}
                    replyingTo={replyingTo}
                    setReplyingTo={setReplyingTo}
                    handleSubmitComment={handleSubmitComment}
                    commentsLoading={commentsLoading}
                    commentSortBy={commentSortBy}
                    handleSortComments={handleSortComments}
                  />
                  <CommentList
                    comments={comments}
                    commentsLoading={commentsLoading}
                    currentCommentPage={currentCommentPage}
                    commentsPerPage={commentsPerPage}
                    setCurrentCommentPage={setCurrentCommentPage}
                    renderComment={renderComment}
                    currentUserId={currentUserId}
                  />
                </div>
              </div>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
};

export default Category;