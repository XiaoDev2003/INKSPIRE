import React from "react";
import { Box, Container, Section } from "../components/ui/Layout";
import Banner from "../components/ui/Banner";

const Test = () => {
  return (
    <>
      <Section>
        <Container size="banner">
          <Banner
            title="Bút lông cổ điển"
            subtitle="Hiểu hơn về công cụ truyền thống"
            ctaText="Tìm hiểu thêm"
            ctaLink="/brushes"
            imageSrc="./banner/home.png"
          />
        </Container>
      </Section>
      Hello
    </>
  );
};

export default Test;
