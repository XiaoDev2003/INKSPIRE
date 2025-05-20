// src/components/common/common.js
// File này export tất cả các components từ thư mục common

import Banner from './section/Banner';
import Banner2 from './section/Banner2';
import BoxCount from './section/BoxCount';
import AccordionItem from './section/AccordionItem';
import ProtectedRoute from './ProtectedRoute';
import ScrollToTopButton from './button/ScrollToTopButton';

// Modals
import ConfirmModal from './modals/ConfirmModal';
import FormModal from './modals/FormModal';
import LoginModal from './modals/LoginModal';
import RegisterModal from './modals/RegisterModal';

// Popups
import VisitorPopup from './popup/VisitorPopup';

export {
  Banner,
  BoxCount,
  AccordionItem,
  ProtectedRoute,
  ScrollToTopButton,
  ConfirmModal,
  FormModal,
  LoginModal,
  RegisterModal,
  VisitorPopup,
  Banner2,

};

// Export mặc định tất cả các components
export default {
  Banner,
  BoxCount,
  AccordionItem,
  ProtectedRoute,
  ScrollToTopButton,
  ConfirmModal,
  FormModal,
  LoginModal,
  RegisterModal,
  VisitorPopup,
  Banner2,
};