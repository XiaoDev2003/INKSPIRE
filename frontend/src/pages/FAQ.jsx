// src/pages/FAQ.jsx
import React, { useState, useEffect } from 'react';
import Banner from '../components/ui/Banner';
import FAQCategories from '../components/layout/client/faq/FAQCategories';
import FAQSearch from '../components/layout/client/faq/FAQSearch';
import FAQAccordion from '../components/layout/client/faq/FAQAccordion';
import FAQFeedback from './Feedback';
import FAQRelatedArticles from '../components/layout/client/faq/FAQRelatedArticles';
import FAQPopularQuestions from '../components/layout/client/faq/FAQPopularQuestions';
import FAQHelpCenter from '../components/layout/client/faq/FAQHelpCenter';

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // Danh mục câu hỏi
  const categories = [
    { id: 'all', name: 'Tất cả', count: 12 },
    { id: 'general', name: 'Chung', count: 4 },
    { id: 'courses', name: 'Khóa học', count: 3 },
    { id: 'payment', name: 'Thanh toán', count: 2 },
    { id: 'account', name: 'Tài khoản', count: 3 }
  ];

  // Dữ liệu câu hỏi thường gặp
  const faqData = [
    {
      question: "Thư pháp là gì?",
      answer: "Thư pháp là nghệ thuật viết chữ đẹp, tập trung vào việc tạo ra các ký tự có tính thẩm mỹ cao bằng cách sử dụng các công cụ như bút lông, mực và giấy đặc biệt. Đây không chỉ là một kỹ năng viết chữ mà còn là một hình thức nghệ thuật thể hiện cá tính và văn hóa.",
      category: 'general',
      relatedLinks: [
        { text: "Lịch sử thư pháp", url: "/calligraphy/history" },
        { text: "Các phong cách thư pháp", url: "/calligraphy/styles" }
      ]
    },
    {
      question: "Làm thế nào để bắt đầu học thư pháp?",
      answer: "Để bắt đầu học thư pháp, bạn nên trang bị những dụng cụ cơ bản như bút lông, mực, giấy tập viết. Sau đó, bạn có thể đăng ký các khóa học cơ bản trên nền tảng của chúng tôi hoặc tham khảo các tài liệu hướng dẫn miễn phí. Việc luyện tập đều đặn là chìa khóa để tiến bộ trong nghệ thuật thư pháp.",
      category: 'general',
      relatedLinks: [
        { text: "Khóa học cho người mới bắt đầu", url: "/courses/beginners" },
        { text: "Dụng cụ thư pháp cơ bản", url: "/tools/basic" }
      ]
    },
    {
      question: "Các khóa học trên Inkspire có chứng chỉ không?",
      answer: "Có, tất cả các khóa học chính thức trên Inkspire đều cấp chứng chỉ hoàn thành sau khi học viên hoàn thành khóa học và đạt yêu cầu đánh giá. Chứng chỉ này có thể tải về dưới dạng PDF và được công nhận bởi Hiệp hội Thư pháp Việt Nam.",
      category: 'courses',
      relatedLinks: [
        { text: "Mẫu chứng chỉ", url: "/certificates/sample" }
      ]
    },
    {
      question: "Tôi có thể thanh toán khóa học bằng những phương thức nào?",
      answer: "Inkspire hỗ trợ nhiều phương thức thanh toán khác nhau bao gồm thẻ tín dụng/ghi nợ (Visa, Mastercard), ví điện tử (Momo, ZaloPay, VNPay), chuyển khoản ngân hàng và thanh toán qua PayPal cho học viên quốc tế.",
      category: 'payment',
      relatedLinks: [
        { text: "Hướng dẫn thanh toán", url: "/payment/guide" },
        { text: "Chính sách hoàn tiền", url: "/payment/refund-policy" }
      ]
    },
    {
      question: "Làm thế nào để đặt lại mật khẩu tài khoản?",
      answer: "Để đặt lại mật khẩu, bạn có thể nhấp vào liên kết 'Quên mật khẩu' trên trang đăng nhập. Hệ thống sẽ gửi một email có chứa liên kết đặt lại mật khẩu đến địa chỉ email đã đăng ký của bạn. Liên kết này có hiệu lực trong 24 giờ.",
      category: 'account',
      relatedLinks: [
        { text: "Trang đăng nhập", url: "/login" },
        { text: "Liên hệ hỗ trợ", url: "/contact" }
      ]
    },
    {
      question: "Tôi có thể xem các khóa học trên thiết bị di động không?",
      answer: "Có, tất cả các khóa học trên Inkspire đều được tối ưu hóa để xem trên nhiều thiết bị khác nhau, bao gồm điện thoại thông minh và máy tính bảng. Bạn có thể truy cập thông qua trình duyệt web hoặc tải xuống ứng dụng Inkspire có sẵn trên iOS và Android.",
      category: 'courses',
      relatedLinks: [
        { text: "Tải ứng dụng iOS", url: "https://apps.apple.com/inkspire" },
        { text: "Tải ứng dụng Android", url: "https://play.google.com/store/apps/inkspire" }
      ]
    },
    {
      question: "Làm thế nào để cập nhật thông tin cá nhân?",
      answer: "Để cập nhật thông tin cá nhân, đăng nhập vào tài khoản của bạn, sau đó truy cập vào mục 'Hồ sơ' hoặc 'Tài khoản' từ menu người dùng. Tại đây, bạn có thể chỉnh sửa thông tin cá nhân, thay đổi ảnh đại diện và cập nhật các thông tin liên hệ.",
      category: 'account',
      relatedLinks: [
        { text: "Quản lý tài khoản", url: "/account/settings" }
      ]
    },
    {
      question: "Chính sách hoàn tiền của Inkspire như thế nào?",
      answer: "Inkspire cung cấp chính sách hoàn tiền trong vòng 7 ngày kể từ ngày mua khóa học nếu bạn không hài lòng với nội dung. Tuy nhiên, điều kiện là bạn chưa hoàn thành quá 30% khóa học và chưa tải xuống tài liệu học tập. Để yêu cầu hoàn tiền, vui lòng liên hệ với bộ phận hỗ trợ khách hàng.",
      category: 'payment',
      relatedLinks: [
        { text: "Điều khoản dịch vụ", url: "/terms" },
        { text: "Liên hệ hỗ trợ", url: "/contact" }
      ]
    },
    {
      question: "Tôi có thể tải xuống video bài giảng để xem offline không?",
      answer: "Hiện tại, Inkspire không hỗ trợ tải xuống video bài giảng để xem offline trên phiên bản web. Tuy nhiên, người dùng ứng dụng di động có thể tải xuống một số bài học để xem offline trong thời gian giới hạn. Tính năng này chỉ có sẵn cho các thành viên premium.",
      category: 'courses',
      relatedLinks: [
        { text: "Nâng cấp tài khoản Premium", url: "/premium" }
      ]
    },
    {
      question: "Làm thế nào để nhận hỗ trợ kỹ thuật?",
      answer: "Để nhận hỗ trợ kỹ thuật, bạn có thể sử dụng tính năng chat trực tuyến trên trang web của chúng tôi, gửi email đến support@inkspire.vn, hoặc điền vào biểu mẫu liên hệ. Đội ngũ hỗ trợ của chúng tôi làm việc từ 8:00 đến 22:00 hàng ngày và sẽ phản hồi trong vòng 24 giờ.",
      category: 'general',
      relatedLinks: [
        { text: "Trung tâm trợ giúp", url: "/help-center" },
        { text: "Liên hệ", url: "/contact" }
      ]
    },
    {
      question: "Tôi có thể chia sẻ tài khoản với người khác không?",
      answer: "Không, việc chia sẻ tài khoản với người khác vi phạm điều khoản sử dụng của Inkspire. Mỗi tài khoản chỉ được sử dụng bởi một người dùng duy nhất. Nếu phát hiện tài khoản được sử dụng từ nhiều thiết bị khác nhau cùng lúc, chúng tôi có quyền tạm khóa tài khoản để điều tra.",
      category: 'account',
      relatedLinks: [
        { text: "Điều khoản sử dụng", url: "/terms-of-use" }
      ]
    },
    {
      question: "Inkspire có cung cấp dịch vụ tư vấn cá nhân không?",
      answer: "Có, Inkspire cung cấp dịch vụ tư vấn cá nhân với các nghệ nhân thư pháp có kinh nghiệm. Bạn có thể đặt lịch buổi tư vấn 1-1 thông qua trang 'Dịch vụ tư vấn' trên website. Giá cả sẽ phụ thuộc vào thời lượng và nghệ nhân bạn chọn.",
      category: 'general',
      relatedLinks: [
        { text: "Đặt lịch tư vấn", url: "/consultation" },
        { text: "Danh sách nghệ nhân", url: "/artists" }
      ]
    }
  ];

  // Giả lập thời gian tải dữ liệu
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  // Dữ liệu câu hỏi phổ biến
  const popularQuestions = [
    { question: "Thư pháp là gì?", url: "/faq?q=thư-pháp" },
    { question: "Làm thế nào để bắt đầu học thư pháp?", url: "/faq?q=bắt-đầu" },
    { question: "Tôi có thể thanh toán khóa học bằng những phương thức nào?", url: "/faq?q=thanh-toán" },
    { question: "Các khóa học trên Inkspire có chứng chỉ không?", url: "/faq?q=chứng-chỉ" },
  ];

  return (
    <div className="py-12 bg-gray-50 min-h-screen">
      {/* Banner */}
      <Banner
        title="FAQ - Câu hỏi thường gặp"
        subtitle="Hỗ trợ nhanh chóng và hiệu quả cho mọi thắc mắc của bạn"
        ctaText="Đặt câu hỏi ngay"
        ctaLink="/feedback"
        imageSrc="./banner/faq.png"
      />

      <div className="container mx-auto px-4 md:px-8 lg:px-16 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Sidebar - Bộ lọc và tìm kiếm */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Tìm kiếm */}
              <FAQSearch
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
              />

              {/* Danh mục */}
              <FAQCategories
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
              />

              {/* Câu hỏi phổ biến */}
              <FAQPopularQuestions popularQuestions={popularQuestions} />

              {/* Bài viết liên quan */}
              <FAQRelatedArticles />

              {/* Phần thống kê */}
              <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg shadow-md p-6">
                <h3 className="text-xl font-bold text-amber-800 mb-4">Thống kê</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Tổng số câu hỏi:</span>
                    <span className="font-semibold text-amber-700">{faqData.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Cập nhật gần nhất:</span>
                    <span className="font-semibold text-amber-700">15/06/2023</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-700">Đánh giá hữu ích:</span>
                    <span className="font-semibold text-amber-700">92%</span>
                  </div>
                </div>
              </div>

              {/* Trung tâm hỗ trợ */}
              <FAQHelpCenter />
            </div>
          </div>

          {/* Nội dung chính - Câu hỏi và form phản hồi */}
          <div className="lg:col-span-2 space-y-8">
            {/* Tiêu đề */}
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-serif font-bold text-gray-800">
                Câu hỏi thường gặp
              </h2>
              <div className="text-sm text-gray-500">
                {isLoading ? (
                  <span className="flex items-center">
                    <i className="fa-solid fa-spinner fa-spin mr-2"></i> Đang tải...
                  </span>
                ) : (
                  <span>
                    Hiển thị {faqData.filter(faq =>
                      (activeCategory === 'all' || faq.category === activeCategory) &&
                      (!searchQuery ||
                        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()))
                    ).length} / {faqData.length} câu hỏi
                  </span>
                )}
              </div>
            </div>

            {/* Hiển thị loading hoặc danh sách câu hỏi */}
            {isLoading ? (
              <div className="bg-white rounded-lg shadow-md p-12 text-center">
                <div className="animate-spin text-amber-500 text-4xl mb-4">
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

            {/* Form phản hồi */}
            <FAQFeedback />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQ;