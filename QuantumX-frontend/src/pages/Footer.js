import React from "react";
import styled from "styled-components";

// Footer Wrapper
const FooterWrapper = styled.footer`
  background-color: #333; /* Dark background */
  color: #fff; /* Light text */
  padding: 1.5rem 0;
  text-align: center;
`;

const FooterContainer = styled.div`
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: space-between;
  align-items: center;
`;

const FooterLinks = styled.div`
  display: flex;
  gap: 1.5rem;

  a {
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const CopyrightText = styled.p`
  font-size: 0.85rem;
  margin: 0;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <FooterContainer>
        <FooterLinks>
          <a href="/">Home</a>
          <a href="/pricing">Pricing</a>
          <a href="/about">About Us</a>
          <a href="/blog">Blog</a>
        </FooterLinks>
        <CopyrightText>© 2025 Snap2Bill. All Rights Reserved.</CopyrightText>
      </FooterContainer>
    </FooterWrapper>
  );
};

export default Footer;
