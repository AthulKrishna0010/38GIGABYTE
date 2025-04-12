import React from 'react';
import styled from 'styled-components';

// Styled container for the header section
const HeaderContainer = styled.header`
  background-color: rgb(214, 197, 197); /* Soft background color for visual appeal */
  padding: 20px; /* Adds spacing inside the header */
  display: flex; /* Flexbox layout for positioning */
  justify-content: space-between; /* Space between logo and navigation */
  align-items: center; /* Aligns items vertically in the center */
  border-bottom: 1px solid #eee; /* Adds a subtle border at the bottom */
`;

// Wrapper for the logo section
const Logo = styled.div`
  display: flex; /* Displays logo image and text side by side */
  align-items: center; /* Vertically centers logo image and text */
`;

// Styling for the logo image
const LogoImage = styled.img`
  height: 70px; /* Sets the height of the logo image */
  margin-right: 20px; /* Adds space between the image and logo text */
  border-radius: 8px; /* Rounded corners for the logo */
  /* Use '50%' for circular logos */
`;

// Styling for the logo text
const LogoText = styled.h1`
  font-size: 1.5rem; /* Sets font size for the logo text */
  font-weight: 40px; /* Adjusts weight for better emphasis */
  color: #333; /* Dark color for readability */
  margin: 0; /* Removes default margin for cleaner layout */
`;

// Styling for the navigation section
const Nav = styled.nav`
  ul {
    list-style: none; /* Removes default list styles */
    padding: 0; /* Removes default padding */
    margin: 0; /* Removes default margin */
    display: flex; /* Horizontal layout for navigation items */
  }

  li {
    margin-left: 50px; /* Space between navigation items */

    &:first-child {
      margin-left: 0; /* Removes margin from the first item */
    }
  }

  a {
    text-decoration: none; /* Removes default underline on links */
    color: #555; /* Neutral text color */
    font-weight: 500; /* Boldens the link text for better visibility */

    &:hover {
      color: #007bff; /* Changes text color on hover for interactivity */
    }
  }
`;

// Functional component for the header
function Header() {
  return (
    <HeaderContainer>
      {/* Logo section with image and text */}
      <Logo>
        <LogoImage src="https://t3.ftcdn.net/jpg/01/62/70/68/240_F_162706804_5WrJz6ziqhwfDQu9889AN1QJA8kdIIoD.jpg" alt="TinyPNG Logo" />
        <LogoText>Snap2Bill</LogoText>
      </Logo>
      {/* Navigation section */}
      <Nav>
        <ul>
          <li><a href="/">Home</a></li> {/* Link to Home page */}
          <li><a href="/pricing">Pricing</a></li> {/* Link to Pricing page */}
          <li><a href="/about">About US</a></li> {/* Link to About Us page */}
          <li><a href="/blog">Blog</a></li> {/* Link to Blog page */}
        </ul>
      </Nav>
    </HeaderContainer>
  );
}

export default Header;
