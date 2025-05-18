// 📁 src/pages/FAQ.jsx
import React, { useState, useEffect } from "react";
import { Banner } from "../components/common/common";
import FAQCategories from "../components/layout/client/faq/FAQCategories";
import FAQSearch from "../components/layout/client/faq/FAQSearch";
import FAQAccordion from "../components/layout/client/faq/FAQAccordion";
import FAQFeedback from "./Feedback";
import FAQRelatedArticles from "../components/layout/client/faq/FAQRelatedArticles";
import FAQPopularQuestions from "../components/layout/client/faq/FAQPopularQuestions";
import FAQHelpCenter from "../components/layout/client/faq/FAQHelpCenter";
import axiosClient from "../api/axiosClient";
import { Container, Section, Text, Button , Grid , Flex } from "../components/ui/ui";

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [faqData, setFaqData] = useState([]);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([
    { id: "all", name: "Tất cả", count: 0 },
    { id: "general", name: "Chung", count: 0 },
    { id: "courses", name: "Khóa học", count: 0 },
    { id: "payment", name: "Thanh toán", count: 0 },
    { id: "account", name: "Tài khoản", count: 0 },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await axiosClient.get("/api/queries");

        // Kiểm tra dữ liệu API
        if (!Array.isArray(response.data)) {
          throw new Error("Dữ liệu API không đúng định dạng");
        }

        const formattedFaqData = response.data.map((query) => {
          // Kiểm tra query.question_content tồn tại
          const question =
            query.question_content && typeof query.question_content === "string"
              ? query.question_content.toLowerCase()
              : "";

          let category = "general";
          if (question.includes("khóa học")) {
            category = "courses";
          } else if (question.includes("thanh toán")) {
            category = "payment";
          } else if (question.includes("tài khoản")) {
            category = "account";
          }

          return {
            question: query.question_content || "Câu hỏi không xác định",
            answer: query.full_answer || "Không có câu trả lời",
            category,
            relatedLinks: [],
            updated_at: query.updated_at || null,
          };
        });
        setFaqData(formattedFaqData);

        // Cập nhật số lượng câu hỏi cho danh mục
        const updatedCategories = categories.map((category) => ({
          ...category,
          count:
            category.id === "all"
              ? formattedFaqData.length
              : formattedFaqData.filter((faq) => faq.category === category.id)
                  .length,
        }));
        setCategories(updatedCategories);
      } catch (err) {
        console.error("Lỗi khi tải FAQ:", {
          message: err.message,
          response: err.response?.data,
          status: err.response?.status,
        });
        setError("Không thể tải dữ liệu FAQ. Vui lòng thử lại sau.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const popularQuestions = faqData.slice(0, 4).map((faq) => ({
    question: faq.question,
    url: `/faq?q=${encodeURIComponent(faq.question)}`,
  }));

  return (
    <>
      <Section py="0" className="md:py-12">
        <Container className="px-4 sm:px-6 md:px-8">
          <Banner
            title="FAQ - Câu hỏi thường gặp"
            subtitle="Hỗ trợ nhanh chóng và hiệu quả cho mọi thắc mắc của bạn"
            ctaText="Đặt câu hỏi ngay"
            ctaLink="/feedback"
            imageSrc="./banner/faq.png"
          />
        </Container>
      </Section>

      <div className="container mx-auto mt-12 px-4 md:px-8 lg:px-16">
        {error && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-center">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6 py-12">
              <FAQSearch
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />
              <FAQCategories
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />
              <FAQPopularQuestions popularQuestions={popularQuestions} />
              <FAQRelatedArticles />
              <div className="rounded-lg bg-gradient-to-br from-amber-50 to-amber-100 p-6 shadow-md">
                <h3 className="mb-4 text-xl font-bold text-amber-800">
                  Thống kê
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Tổng số câu hỏi:</span>
                    <span className="font-semibold text-amber-700">
                      {faqData.length}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Cập nhật gần nhất:</span>
                    <span className="font-semibold text-amber-700">
                      {faqData[0]?.updated_at
                        ? new Date(faqData[0].updated_at).toLocaleDateString(
                            "vi-VN",
                          )
                        : "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Đánh giá hữu ích:</span>
                    <span className="font-semibold text-amber-700">92%</span>
                  </div>
                </div>
              </div>
              <FAQHelpCenter />
            </div>
          </div>

          <div className="space-y-8 lg:col-span-2">
            <div className="flex items-center justify-between">
              <h2 className="font-serif text-2xl font-bold text-gray-800">
                Câu hỏi thường gặp
              </h2>
              <div className="text-sm text-gray-500">
                {isLoading ? (
                  <span className="flex items-center">
                    <i className="fa-solid fa-spinner fa-spin mr-2"></i> Đang
                    tải...
                  </span>
                ) : (
                  <span>
                    Hiển thị{" "}
                    {
                      faqData.filter(
                        (faq) =>
                          (activeCategory === "all" ||
                            faq.category === activeCategory) &&
                          (!searchQuery ||
                            faq.question
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase()) ||
                            faq.answer
                              .toLowerCase()
                              .includes(searchQuery.toLowerCase())),
                      ).length
                    }{" "}
                    / {faqData.length} câu hỏi
                  </span>
                )}
              </div>
            </div>

            {isLoading ? (
              <div className="rounded-lg bg-white p-12 text-center shadow-md">
                <div className="mb-4 animate-spin text-4xl text-amber-500">
                  <i className="fa-solid fa-circle-notch"></i>
                </div>
                <p className="text-gray-600">Đang tải câu hỏi thường gặp...</p>
              </div>
            ) : (
              <FAQAccordion
                faqs={faqData}
                filteredCategory={activeCategory}
                searchQuery={searchQuery}
              />
            )}

            <FAQFeedback />
          </div>
        </div>
      </div>
    </>
  );
};

export default FAQ;
