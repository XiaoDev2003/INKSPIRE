import React from "react";

const Header = () => {
  return (
    <div>
      <header className="flex h-30 justify-between bg-white px-5">
        <div className="flex items-center">
          <img src="../public/logo.png" alt="Logo" className="w-45" />
        </div>
        <div className="flex items-center gap-5">
          <a href="" className="cursor-pointer">
            Đăng nhập
          </a>
          <a href="" className="cursor-pointer">
            Đăng ký
          </a>
        </div>
      </header>
    </div>
  );
};

export default Header;
