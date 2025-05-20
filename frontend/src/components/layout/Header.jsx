import React from "react";
import { Link } from "react-router-dom";
import { Container, Section } from "../ui/ui.js";
import { VisitorPopup } from "../common/common";

const Header = () => {
  return (
    <Section
      as="header"
      className="relative flex h-24 items-center justify-center bg-amber-50"
    >
      <Container className="flex items-center justify-center">
        <Link to="/" className="flex justify-center">
          <img
            src="/logo.png"
            alt="Logo Inkspire"
            className="w-40 object-cover"
          />
        </Link>
        <VisitorPopup />
      </Container>
    </Section>
  );
}

export default Header;