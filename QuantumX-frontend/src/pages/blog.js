// Import React library
import React from "react";

// Import styled-components for writing CSS-in-JS
import styled from "styled-components";

// Styled wrapper for the entire blog section
const BlogWrapper = styled.div`
  padding: 2rem 1rem; /* Vertical and horizontal padding */
  background-color: #f8f9fa; /* Light gray background */
  display: flex;
  flex-direction: column;
  align-items: center; /* Center content horizontally */
`;

// Styled container that holds the blog content
const BlogContainer = styled.div`
  background-color: #ffffff; /* White background for a clean look */
  border-radius: 12px; /* Rounded corners */
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
  padding: 2rem; /* Padding inside the container */
  max-width: 960px; /* Limit the width for readability */
  text-align: center; /* Center the text */
`;

// Styled heading for the blog title
const BlogHeader = styled.h2`
  font-size: 2rem; /* Large font size */
  font-weight: bold; /* Bold text */
  color: #333; /* Dark gray color for better readability */
  margin-bottom: 1rem; /* Spacing below the heading */
`;

// Styled paragraph for blog content
const BlogParagraph = styled.p`
  font-size: 1.25rem; /* Slightly larger font for body text */
  color: #555; /* Medium gray text color */
  line-height: 1.6; /* Line spacing for better readability */
`;

// Functional component for the Blog page
const Blog = () => {
  return (
    // Outer wrapper to style the whole blog section
    <BlogWrapper>
      {/* Main container holding the blog content */}
      <BlogContainer>
        {/* Blog heading */}
        <BlogHeader>Welcome to Snap2Bill Blog</BlogHeader>

        {/* Blog description text */}
        <BlogParagraph>
          Snap2Bill was designed with a simple yet powerful mission: to make bill and receipt management effortless for everyone. 
          Whether you’re a student, professional, or small business owner, our app offers seamless extraction of essential details 
          and ensures you spend less time organizing and more time focusing on what truly matters.
        </BlogParagraph>
      </BlogContainer>
    </BlogWrapper>
  );
};

// Export the Blog component so it can be used in other parts of the app
export default Blog;
