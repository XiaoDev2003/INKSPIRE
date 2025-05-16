import React from 'react'
import MainRouter from '../../config/routes'
import { ScrollToTopButton } from '../common/common'
import { useLocation } from 'react-router-dom'

const Main = () => {
  const location = useLocation();

  // Kiểm tra nếu đường dẫn hiện tại là trang admin
  const isAdminRoute = () => {
    return location.pathname.startsWith('/admin');
  };

  return (
    <>
      <MainRouter />
      {!isAdminRoute() && <ScrollToTopButton />}
    </>
  )
}
export default Main