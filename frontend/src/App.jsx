import Header from "./components/layout/Header";
import Navbar from "./components/layout/Navbar";
import Main from "./components/layout/Main";
import Footer from "./components/layout/Footer";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  // Hàm kiểm tra nếu đường dẫn hiện tại là trang admin
  const isAdminRoute = () => {
    return location.pathname.startsWith("/admin");
  };

  return (
    <>
      {!isAdminRoute() && <Header />}
      {!isAdminRoute() && <Navbar />}
      <Main />
      {!isAdminRoute() && <Footer />}
    </>
  );
}

export default App;

/* Nô tả code
      - useLocation() : lấy đối tượng location trả về url hiện tại
      - isAdminRoute : trả về pathname bắt đầu là /admin
      - !isAdminRoute : hàm not
*/
