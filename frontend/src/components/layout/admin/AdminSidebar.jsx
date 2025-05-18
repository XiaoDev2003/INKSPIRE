import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaUsers,
  FaList,
  FaFont,
  FaImages,
  FaComments,
  FaQuestionCircle,
  FaTimes,
  FaTachometerAlt,
  FaCog,
} from "react-icons/fa";

const AdminSidebar = ({ sidebarOpen, setSidebarOpen, onLogout }) => {
  const location = useLocation();

  const menuItems = [
    { path: "/admin", icon: <FaTachometerAlt />, label: "Tổng quan" },
    { path: "/admin/users", icon: <FaUsers />, label: "Người dùng" },
    { path: "/admin/categories", icon: <FaList />, label: "Danh mục" },
    { path: "/admin/items", icon: <FaFont />, label: "Font chữ" },
    { path: "/admin/gallery", icon: <FaImages />, label: "Thư viện ảnh" },
    { path: "/admin/comments", icon: <FaComments />, label: "Bình luận" },
    { path: "/admin/feedback", icon: <FaComments />, label: "Phản hồi" },
    { path: "/admin/faq", icon: <FaQuestionCircle />, label: "FAQ" },
    { path: "/under-development", icon: <FaCog />, label: "Cài đặt" },
  ];

  // Phân loại menu items thành các nhóm
  const menuGroups = {
    main: menuItems.slice(0, 1),
    content: menuItems.slice(1, 5),
    interaction: menuItems.slice(5, 7),
    system: menuItems.slice(7),
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <>
      {/* Sidebar Desktop */}
      <div
        className={`${sidebarOpen ? "w-64" : "w-20"} fixed top-0 left-0 z-30 hidden h-screen overflow-y-auto bg-gradient-to-b from-amber-800 to-amber-900 text-white shadow-lg transition-all duration-300 ease-in-out md:block`}
      >
        <div className="p-4">
          <div className="w-full">
            <img
              src="/logo_white.png"
              alt="Inkspire"
              className="h-18 w-full object-contain"
            />
          </div>
        </div>

        <div className="mt-2 mb-6 px-4">
          <div className="h-0.5 w-full rounded bg-amber-700/50"></div>
        </div>

        <div className="overflow-y-auto px-3 py-2">
          <nav className="space-y-6">
            {/* Menu chính */}
            <div>
              {sidebarOpen && (
                <h3 className="mb-2 px-3 text-xs font-semibold text-amber-300 uppercase">
                  Chính
                </h3>
              )}
              <ul className="space-y-1">
                {menuGroups.main.map((item) => (
                  <MenuItem
                    key={item.path}
                    item={item}
                    isActive={isActive(item.path)}
                    sidebarOpen={sidebarOpen}
                  />
                ))}
              </ul>
            </div>

            {/* Menu nội dung */}
            <div>
              {sidebarOpen && (
                <h3 className="mb-2 px-3 text-xs font-semibold text-amber-300 uppercase">
                  Nội dung
                </h3>
              )}
              <ul className="space-y-1">
                {menuGroups.content.map((item) => (
                  <MenuItem
                    key={item.path}
                    item={item}
                    isActive={isActive(item.path)}
                    sidebarOpen={sidebarOpen}
                  />
                ))}
              </ul>
            </div>

            {/* Menu tương tác */}
            <div>
              {sidebarOpen && (
                <h3 className="mb-2 px-3 text-xs font-semibold text-amber-300 uppercase">
                  Tương tác
                </h3>
              )}
              <ul className="space-y-1">
                {menuGroups.interaction.map((item) => (
                  <MenuItem
                    key={item.path}
                    item={item}
                    isActive={isActive(item.path)}
                    sidebarOpen={sidebarOpen}
                  />
                ))}
              </ul>
            </div>

            {/* Menu hệ thống */}
            <div>
              {sidebarOpen && (
                <h3 className="mb-2 px-3 text-xs font-semibold text-amber-300 uppercase">
                  Hệ thống
                </h3>
              )}
              <ul className="space-y-1">
                {menuGroups.system.map((item) => (
                  <MenuItem
                    key={item.path}
                    item={item}
                    isActive={isActive(item.path)}
                    sidebarOpen={sidebarOpen}
                  />
                ))}
              </ul>
            </div>
          </nav>
        </div>

        {/* Phần nút quay về trang chính đã được loại bỏ */}
      </div>

      {/* Sidebar Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="bg-opacity-50 fixed inset-0 z-20 bg-black transition-opacity md:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar Mobile */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-72 transform bg-gradient-to-b from-amber-800 to-amber-900 sm:w-64 md:hidden ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} overflow-y-auto transition-transform duration-300 ease-in-out`}
      >
        <div className="flex items-center justify-between p-4">
          <div className="w-full">
            <img
              src="/logo_white.png"
              alt="Inkspire"
              className="h-10 w-full object-contain"
            />
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="rounded-full p-2 text-amber-200 hover:bg-amber-700/50 hover:text-white"
          >
            <FaTimes className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-2 mb-6 px-4">
          <div className="h-0.5 w-full rounded bg-amber-700/50"></div>
        </div>

        <div className="flex-1 overflow-y-auto px-3 py-2">
          <nav className="space-y-6">
            {/* Menu chính */}
            <div>
              <h3 className="mb-2 px-3 text-xs font-semibold text-amber-300 uppercase">
                Chính
              </h3>
              <ul className="space-y-1">
                {menuGroups.main.map((item) => (
                  <MenuItem
                    key={item.path}
                    item={item}
                    isActive={isActive(item.path)}
                    sidebarOpen={true}
                    onClick={() => setSidebarOpen(false)}
                  />
                ))}
              </ul>
            </div>

            {/* Menu nội dung */}
            <div>
              <h3 className="mb-2 px-3 text-xs font-semibold text-amber-300 uppercase">
                Nội dung
              </h3>
              <ul className="space-y-1">
                {menuGroups.content.map((item) => (
                  <MenuItem
                    key={item.path}
                    item={item}
                    isActive={isActive(item.path)}
                    sidebarOpen={true}
                    onClick={() => setSidebarOpen(false)}
                  />
                ))}
              </ul>
            </div>

            {/* Menu tương tác */}
            <div>
              <h3 className="mb-2 px-3 text-xs font-semibold text-amber-300 uppercase">
                Tương tác
              </h3>
              <ul className="space-y-1">
                {menuGroups.interaction.map((item) => (
                  <MenuItem
                    key={item.path}
                    item={item}
                    isActive={isActive(item.path)}
                    sidebarOpen={true}
                    onClick={() => setSidebarOpen(false)}
                  />
                ))}
              </ul>
            </div>

            {/* Menu hệ thống */}
            <div>
              <h3 className="mb-2 px-3 text-xs font-semibold text-amber-300 uppercase">
                Hệ thống
              </h3>
              <ul className="space-y-1">
                {menuGroups.system.map((item) => (
                  <MenuItem
                    key={item.path}
                    item={item}
                    isActive={isActive(item.path)}
                    sidebarOpen={true}
                    onClick={() => setSidebarOpen(false)}
                  />
                ))}
              </ul>
            </div>
          </nav>
        </div>

        {/* Phần nút quay về trang chính và đăng xuất đã được loại bỏ */}
      </div>
    </>
  );
};

// Component MenuItem để hiển thị từng mục trong menu
const MenuItem = ({ item, isActive, sidebarOpen, onClick }) => {
  return (
    <li>
      <Link
        to={item.path}
        className={`flex items-center rounded-lg px-3 py-2 transition-colors duration-200 ${isActive ? "bg-amber-700 text-white" : "text-amber-100 hover:bg-amber-700/50"} ${!sidebarOpen ? "justify-center" : ""}`}
        onClick={onClick}
      >
        <span
          className={`text-lg ${isActive ? "text-white" : "text-amber-300"}`}
        >
          {item.icon}
        </span>
        {sidebarOpen && <span className="ml-3">{item.label}</span>}
      </Link>
    </li>
  );
};

export default AdminSidebar;
