// 📁 src/pages/FAQ.jsx
import React, { useState, useEffect } from "react";
import { Banner } from "../components/common/common";
import FAQCategories from "../components/layout/client/faq/FAQCategories";
import FAQSearch from "../components/layout/client/faq/FAQSearch";
import FAQAccordion from "../components/layout/client/faq/FAQAccordion";
import FAQFeedback from "./Feedback";
import FAQPopularQuestions from "../components/layout/client/faq/FAQPopularQuestions";
import FAQHelpCenter from "../components/layout/client/faq/FAQHelpCenter";
import axiosClient from "../api/axiosClient";
import { motion } from "framer-motion";
import {
  Container,
  Section,
  Text,
  Button,
  Grid,
  Flex,
  Box,
} from "../components/ui/ui";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const slideUp = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
};


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
            id: query.query_id,
            question: query.question_content || "Câu hỏi không xác định",
            answer: query.full_answer || "Không có câu trả lời",
            category,
            relatedLinks: query.related_links || [],
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
    <motion.div
      className="bg-gradient-to-b from-gray-50 to-gray-100 min-h-screen"
      initial="hidden"
      animate="visible"
      variants={fadeIn}
    >
      <Section py="0" className="md:py-12">
        <Container className="px-4 sm:px-6 md:px-8">
          <motion.div variants={slideUp}>
            <Banner
              title="FAQ - Câu hỏi thường gặp"
              subtitle="Hỗ trợ nhanh chóng và hiệu quả cho mọi thắc mắc của bạn"
              ctaText="Đặt câu hỏi ngay"
              ctaLink="/feedback"
              imageSrc="./banner/faq.png"
            />
          </motion.div>
        </Container>
      </Section>

      <Section className="p-4 md:px-12 pb-16">
        <Container className="container">
          {error && (
            <motion.div variants={slideUp}>
              <Box className="mb-6 rounded-lg border border-red-200 bg-red-50 p-4 text-center">
                <p className="text-red-600">{error}</p>
              </Box>
            </motion.div>
          )}

          <motion.div variants={staggerContainer} initial="hidden" animate="visible">
            <Grid gap="8" cols="1" md="3" className="relative">
              {/* Sidebar */}
              <Box className="lg:col-span-1">
                <motion.div
                  className="sticky top-24 space-y-6"
                  variants={staggerContainer}
                >
                  <motion.div variants={slideUp}>
                    <FAQSearch
                      searchQuery={searchQuery}
                      onSearchChange={setSearchQuery}
                    />
                  </motion.div>

                  <motion.div variants={slideUp}>
                    <FAQCategories
                      categories={categories}
                      activeCategory={activeCategory}
                      onCategoryChange={setActiveCategory}
                    />
                  </motion.div>

                  <motion.div variants={slideUp}>
                    <FAQPopularQuestions popularQuestions={popularQuestions} />
                  </motion.div>


                  <motion.div variants={slideUp}>
                    <div className="rounded-xl bg-gradient-to-br from-amber-50 to-amber-100 p-6 shadow-lg border border-amber-100">
                      <h3 className="mb-4 text-xl font-bold text-amber-800 flex items-center">
                        <i className="fa-solid fa-chart-simple mr-2"></i>
                        Thống kê
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between bg-white bg-opacity-60 p-3 rounded-lg">
                          <span className="text-gray-700 flex items-center">
                            <i className="fa-solid fa-list-ol mr-2 text-amber-600"></i>
                            Tổng số câu hỏi:
                          </span>
                          <span className="font-semibold text-amber-700 bg-white px-3 py-1 rounded-full shadow-sm">
                            {faqData.length}
                          </span>
                        </div>
                        <div className="flex items-center justify-between bg-white bg-opacity-60 p-3 rounded-lg">
                          <span className="text-gray-700 flex items-center">
                            <i className="fa-solid fa-clock-rotate-left mr-2 text-amber-600"></i>
                            Cập nhật gần nhất:
                          </span>
                          <span className="font-semibold text-amber-700 bg-white px-3 py-1 rounded-full shadow-sm">
                            {faqData[0]?.updated_at
                              ? new Date(faqData[0].updated_at).toLocaleDateString(
                                  "vi-VN",
                                )
                              : "N/A"}
                          </span>
                        </div>
                        <div className="flex items-center justify-between bg-white bg-opacity-60 p-3 rounded-lg">
                          <span className="text-gray-700 flex items-center">
                            <i className="fa-solid fa-thumbs-up mr-2 text-amber-600"></i>
                            Đánh giá hữu ích:
                          </span>
                          <span className="font-semibold text-amber-700 bg-white px-3 py-1 rounded-full shadow-sm">
                            92%
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div variants={slideUp}>
                    <FAQHelpCenter />
                  </motion.div>
                </motion.div>
              </Box>

              {/* Main Content */}
              <motion.div
                className="space-y-8 lg:col-span-2"
                variants={staggerContainer}
              >
                <motion.div
                  className="flex items-center justify-between bg-white p-6 rounded-xl shadow-md"
                  variants={slideUp}
                >
                  <h2 className="font-serif text-2xl font-bold text-gray-800 flex items-center">
                    <i className="fa-solid fa-circle-question text-amber-500 mr-3"></i>
                    Câu hỏi thường gặp
                  </h2>
                  <div className="text-sm text-gray-500 bg-amber-50 px-4 py-2 rounded-full">
                    {isLoading ? (
                      <span className="flex items-center">
                        <i className="fa-solid fa-spinner fa-spin mr-2"></i> Đang
                        tải...
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <i className="fa-solid fa-filter mr-2"></i>
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
                </motion.div>

                {isLoading ? (
                  <motion.div
                    className="rounded-xl bg-white p-12 text-center shadow-md border border-gray-100"
                    variants={slideUp}
                  >
                    <div className="mb-4 animate-spin text-4xl text-amber-500">
                      <i className="fa-solid fa-circle-notch"></i>
                    </div>
                    <p className="text-gray-600">
                      Đang tải câu hỏi thường gặp...
                    </p>
                  </motion.div>
                ) : (
                  <motion.div variants={slideUp}>
                    <FAQAccordion
                      faqs={faqData}
                      filteredCategory={activeCategory}
                      searchQuery={searchQuery}
                    />
                  </motion.div>
                )}

                <motion.div variants={slideUp} className="bg-white rounded-xl shadow-md border border-gray-100">
                  <FAQFeedback />
                </motion.div>
              </motion.div>
            </Grid>
          </motion.div>
        </Container>
      </Section>
    </motion.div>
  );
};

export default FAQ;
