import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color:rgb(214, 197, 197);
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #eee;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImage = styled.img`
  height: 70px;
  margin-right: 20px;
  border-radius: 8px; /* or '50%' for a circular logo */
`;


const LogoText = styled.h1`
  font-size: 1.5rem;
  font-weight: 40px;
  color: #333;
  margin: 0;
`;

const Nav = styled.nav`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
  }

  li {
    margin-left: 50px;

    &:first-child {
      margin-left: 0;
    }
  }

  a {
    text-decoration: none;
    color: #555;
    font-weight: 500;

    &:hover {
      color: #007bff; /* Example hover color */
    }
  }
`;

function Header() {
  return (
    <HeaderContainer>
      <Logo>
        <LogoImage src="https://t3.ftcdn.net/jpg/01/62/70/68/240_F_162706804_5WrJz6ziqhwfDQu9889AN1QJA8kdIIoD.jpg" alt="TinyPNG Logo" />
        <LogoText>Snap2Bill</LogoText>
      </Logo>
      <Nav>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/pricing">Pricing</a></li>
          <li><a href="/about">About US</a></li>
          <li><a href="/blog">Blog</a></li>
        </ul>
      </Nav>
    </HeaderContainer>
  );
}

export default Header;