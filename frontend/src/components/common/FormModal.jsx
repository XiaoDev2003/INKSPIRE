import React from 'react';
import Modal from './Modal';
import { FaSave, FaTimes } from 'react-icons/fa';

/**
 * Component FormModal dùng để hiển thị form trong modal
 * @param {Object} props - Props của component
 * @param {boolean} props.isOpen - Trạng thái hiển thị của modal
 * @param {Function} props.onClose - Hàm xử lý khi đóng modal
 * @param {Function} props.onSubmit - Hàm xử lý khi submit form
 * @param {string} props.title - Tiêu đề của modal
 * @param {React.ReactNode} props.children - Nội dung form
 * @param {string} props.submitText - Nội dung nút submit
 * @param {string} props.cancelText - Nội dung nút hủy
 * @param {boolean} props.isLoading - Trạng thái loading của form
 * @param {string} props.size - Kích thước của modal
 */
const FormModal = ({
  isOpen,
  onClose,
  onSubmit,
  title = 'Form',
  children,
  submitText = 'Lưu',
  cancelText = 'Hủy',
  isLoading = false,
  size = 'md',
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} size={size}>
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {children}
        </div>

        <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors flex items-center"
            disabled={isLoading}
          >
            <FaTimes className="mr-2" />
            {cancelText}
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 transition-colors flex items-center"
            disabled={isLoading}
          >
            <FaSave className="mr-2" />
            {isLoading ? 'Đang xử lý...' : submitText}
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default FormModal;