import React from "react";
import { Link } from "react-router-dom";
import { Container, Section } from "../ui/ui.js";
import { VisitorPopup } from "../common/common";

const Header = () => {
  return (
    <Section
      as="header"
      className="flex h-24 items-center justify-center bg-amber-50 relative"
    >
      <Container className="flex justify-center items-center">
        <Link to="/" className="flex justify-center">
          <img
            src="./logo.png"
            alt="Logo Inkspire"
            className="w-42 object-cover md:ml-15"
          />
        </Link>
        <VisitorPopup />
      </Container>
    </Section>
  );
}

export default Header;
