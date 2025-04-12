// Import React for building components
import React from "react";

// Import styled-components to use CSS-in-JS styling
import styled from "styled-components";

// Styled wrapper for the entire pricing section
const PricingWrapper = styled.div`
  padding: 2rem 1rem; // Add spacing around the content
  background-color: #f8f9fa; // Light gray background
  display: flex;
  flex-direction: column;
  align-items: center; // Center content horizontally
`;

// Styled heading for the pricing section title
const Title = styled.h2`
  font-size: 2rem; // Large font size
  font-weight: bold;
  color: #333; // Dark gray color
  margin-bottom: 1rem; // Space below the title
`;

// Styled box for displaying the free trial message
const TrialMessage = styled.div`
  margin-bottom: 2rem; // Space below the message
  padding: 1rem 2rem; // Internal padding
  background-color: #f4f4f4; // Very light gray (almost white) background
  border-radius: 12px; // Rounded corners
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2); // Shadow for depth
  text-align: center;
  font-size: 1.5rem; // Slightly larger font
  font-weight: 600; // Bold font
  color: #007bff; // Bright blue text
  transition: transform 0.3s ease; // Smooth transition effect on hover

  &:hover {
    transform: scale(1.05); // Slight zoom effect on hover
  }
`;

// Container for all pricing cards laid out in a grid
const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); // Two columns
  gap: 1.5rem; // Space between grid items
  width: 100%;
  max-width: 960px; // Limits the width to improve readability
`;

// Individual pricing card
const Card = styled.div`
  background-color: #fff; // White background
  border: 1px solid #ddd; // Light border
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1); // Soft shadow
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05); // Zoom effect on hover
  }
`;

// Title of each pricing plan
const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  color: #007bff; // Blue heading
  margin-bottom: 1rem;
`;

// Price text of each plan
const CardPrice = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: #444; // Darker gray
  margin-bottom: 0.5rem;
`;

// Description of each plan
const CardDescription = styled.p`
  font-size: 0.9rem; // Slightly smaller font
  color: #666; // Medium gray
  margin-bottom: 1rem;
`;

// Button for subscribing to a plan
const SubscribeButton = styled.button`
  background-color: #007bff; // Blue background
  color: white; // White text
  padding: 0.5rem 1rem; // Spacing inside the button
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #0056b3; // Darker blue on hover
  }
`;

// Main Pricing component definition
const Pricing = () => {
  // Array of plan objects with title, price, and description
  const plans = [
    { title: "Per Year", price: "2000 Rs/year", description: "Best value for long-term users." },
    { title: "Per Month", price: "200 Rs/month", description: "Perfect for short-term projects." },
    { title: "Per Week", price: "60 Rs/week", description: "Flexible plan for quick tasks." },
    { title: "Student Offer", price: "1000 Rs/year", description: "Discounted plan for students." },
  ];

  return (
    <PricingWrapper>
      {/* Section heading */}
      <Title>Pricing Plans</Title>

      {/* Free trial promotional message */}
      <TrialMessage>FREE ONE WEEK TRIAL - Explore all features risk-free!</TrialMessage>

      {/* Render pricing cards dynamically from the plans array */}
      <CardsContainer>
        {plans.map((plan, index) => (
          <Card key={index}>
            <CardTitle>{plan.title}</CardTitle>
            <CardPrice>{plan.price}</CardPrice>
            <CardDescription>{plan.description}</CardDescription>
            <SubscribeButton>Subscribe</SubscribeButton>
          </Card>
        ))}
      </CardsContainer>
    </PricingWrapper>
  );
};

// Export the Pricing component to be used in other parts of the app
export default Pricing;
