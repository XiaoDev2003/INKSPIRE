import React from 'react';
import Modal from './Modal';
import { FaExclamationTriangle, FaCheck, FaTimes } from 'react-icons/fa';

/**
 * Component ConfirmModal dùng để hiển thị hộp thoại xác nhận
 * @param {Object} props - Props của component
 * @param {boolean} props.isOpen - Trạng thái hiển thị của modal
 * @param {Function} props.onClose - Hàm xử lý khi đóng modal
 * @param {Function} props.onConfirm - Hàm xử lý khi xác nhận
 * @param {string} props.title - Tiêu đề của modal
 * @param {string} props.message - Nội dung thông báo
 * @param {string} props.confirmText - Nội dung nút xác nhận
 * @param {string} props.cancelText - Nội dung nút hủy
 * @param {string} props.type - Loại modal: 'warning', 'danger', 'success', 'info'
 */
const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = 'Xác nhận',
  message = 'Bạn có chắc chắn muốn thực hiện hành động này?',
  confirmText = 'Xác nhận',
  cancelText = 'Hủy',
  type = 'warning',
}) => {
  // Xác định màu sắc và biểu tượng dựa trên loại modal
  const typeConfig = {
    warning: {
      icon: <FaExclamationTriangle className="text-amber-500 text-2xl" />,
      confirmButtonClass: 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500',
    },
    danger: {
      icon: <FaExclamationTriangle className="text-red-500 text-2xl" />,
      confirmButtonClass: 'bg-red-600 hover:bg-red-700 focus:ring-red-500',
    },
    success: {
      icon: <FaCheck className="text-green-500 text-2xl" />,
      confirmButtonClass: 'bg-green-600 hover:bg-green-700 focus:ring-green-500',
    },
    info: {
      icon: <FaExclamationTriangle className="text-blue-500 text-2xl" />,
      confirmButtonClass: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500',
    },
  };

  const { icon, confirmButtonClass } = typeConfig[type] || typeConfig.warning;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size="sm">
      <div className="flex flex-col items-center text-center">
        <div className="mb-4">{icon}</div>
        <p className="text-gray-700 mb-6">{message}</p>
        <div className="flex space-x-4 w-full justify-center">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
          >
            <FaTimes className="inline-block mr-2" />
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 text-white rounded-lg focus:outline-none focus:ring-2 transition-colors ${confirmButtonClass}`}
          >
            <FaCheck className="inline-block mr-2" />
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;