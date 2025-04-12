// Import React to define a functional component
import React from "react";

// Import styled-components to write CSS directly in JS
import styled from "styled-components";

// Wrapper for the entire intro section
const IntroWrapper = styled.div`
  background-color: #ffffff; // Clean white background
  padding: 2.5rem 2rem; // Spacing inside the container
  margin: 2rem auto; // Vertical spacing and center alignment
  max-width: 800px; // Restrict the width for readability
  border-radius: 16px; // Smooth, rounded corners
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05); // Soft shadow for depth
  text-align: center; // Center-align text content
`;

// Main heading style for the intro
const Heading = styled.h1`
  font-size: 2.2rem; // Large heading size
  font-weight: bold;
  color: #2d3748; // Dark slate-gray text
  margin-bottom: 1rem; // Spacing below the heading
`;

// Paragraph text style for the intro description
const SubText = styled.p`
  font-size: 1.05rem; // Slightly larger body text
  color: #4a5568; // Medium gray text color
  line-height: 1.7; // Better spacing between lines for readability
`;

// Special style for highlighting part of the text
const Highlight = styled.span`
  color: #3182ce; // Blue color to draw attention
  font-weight: 600; // Semi-bold for emphasis
`;

// Define the functional component
const Intro = () => {
  return (
    // Container for the intro section
    <IntroWrapper>
      {/* Heading with highlighted product name */}
      <Heading>
        Welcome to <Highlight>Snap2Bill</Highlight>
      </Heading>

      {/* Description of the app's functionality */}
      <SubText>
        Snap2Bill lets you effortlessly extract text from your bills, invoices, and receipts.
        Just upload your file — our smart engine handles the rest.
        Say goodbye to manual data entry and hello to streamlined document processing.
      </SubText>
    </IntroWrapper>
  );
};

// Export the component so it can be used elsewhere in the app
export default Intro;
