import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-amber-50 shadow-md h-20 flex items-center justify-center">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <Link to="/">
            <img
              src="./logo.png"
              alt="Logo Inkspire"
              className="w-36 object-contain"
            />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;