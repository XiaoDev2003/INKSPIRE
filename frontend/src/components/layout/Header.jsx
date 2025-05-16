import React from "react";
import { Link } from "react-router-dom";
import { Container, Section } from "../ui/ui.js";

const Header = () => {
  return (
    <Section
      as="header"
      className="flex h-24 items-center justify-center bg-amber-50 md:pr-20"
    >
        <Link to="/">
          <img
            src="./logo.png"
            alt="Logo Inkspire"
            className="w-42 object-cover"
          />
        </Link>
    </Section>
  );
};

export default Header;
