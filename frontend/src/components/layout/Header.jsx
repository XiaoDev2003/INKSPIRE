import React from "react";
import { Link } from "react-router-dom";
import { Box, Container, Section } from "../ui/Layout"

const Header = () => {
  return (

    <header className="bg-amber-50 shadow-md h-20 flex items-center justify-center">
      <Container className="mx-auto">
        <div className="flex justify-center">
          <Link to="/">
            <img
              src="./logo.png"
              alt="Logo Inkspire"
              className="w-36 object-contain"
            />
          </Link>
        </div>
      </Container>
    </header>
  );
};

export default Header;