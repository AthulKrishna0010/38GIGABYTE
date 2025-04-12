import React from "react";
import styled from "styled-components";

// Wrapper for the blog section
const BlogWrapper = styled.div`
  padding: 2rem 1rem;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const BlogContainer = styled.div`
  background-color: #ffffff; /* White background */
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); /* Shadow for a clean look */
  padding: 2rem;
  max-width: 960px;
  text-align: center;
`;

const BlogHeader = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
`;

const BlogParagraph = styled.p`
  font-size: 1.25rem;
  color: #555;
  line-height: 1.6;
`;

const Blog = () => {
  return (
    <BlogWrapper>
      <BlogContainer>
        <BlogHeader>Welcome to Snap2Bill Blog</BlogHeader>
        <BlogParagraph>
          Snap2Bill was designed with a simple yet powerful mission: to make bill and receipt management effortless for everyone. 
          Whether you’re a student, professional, or small business owner, our app offers seamless extraction of essential details 
          and ensures you spend less time organizing and more time focusing on what truly matters.
        </BlogParagraph>
      </BlogContainer>
    </BlogWrapper>
  );
};

export default Blog;
