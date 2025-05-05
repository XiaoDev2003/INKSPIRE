  import Header from "./components/layout/Header"
  import Navbar from "./components/layout/Navbar"
  import Main from "./components/layout/Main"
   import Footer from "./components/layout/Footer"


  function App() {
    return (
      <>
        <Header />
        <Navbar />
        <Main />
        <Footer />
      </>
    );
  }
  {
    /* Redirect về trang chủ khi không tìm thấy đường dẫn
    <Route path="*" element={<Navigate to="/" replace />} /> */
  }

  export default App;
