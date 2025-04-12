import React from "react";
import styled from "styled-components";

// Wrapper for the pricing section
const PricingWrapper = styled.div`
  padding: 2rem 1rem;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
`;

const TrialMessage = styled.div`
  margin-bottom: 2rem;
  padding: 1rem 2rem;
  background-color: #f4f4f4; /* Dark white background */
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2); /* Eye-catching shadow */
  text-align: center;
  font-size: 1.5rem; /* Slightly larger text for emphasis */
  font-weight: 600; /* Bolder text for prominence */
  color: #007bff; /* Vibrant blue text color */
  transition: transform 0.3s ease; /* Subtle hover effect */

  &:hover {
    transform: scale(1.05); /* Slight scaling for interactivity */
  }
`;

const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Creates a 2x2 grid */
  gap: 1.5rem;
  width: 100%;
  max-width: 960px;
`;

const Card = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 1.5rem;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.25rem;
  font-weight: bold;
  color: #007bff;
  margin-bottom: 1rem;
`;

const CardPrice = styled.p`
  font-size: 1.5rem;
  font-weight: bold;
  color: #444;
  margin-bottom: 0.5rem;
`;

const CardDescription = styled.p`
  font-size: 0.9rem;
  color: #666;
  margin-bottom: 1rem;
`;

const SubscribeButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;

  &:hover {
    background-color: #0056b3;
  }
`;

const Pricing = () => {
  const plans = [
    { title: "Per Year", price: "$100/year", description: "Best value for long-term users." },
    { title: "Per Month", price: "$15/month", description: "Perfect for short-term projects." },
    { title: "Per Week", price: "$5/week", description: "Flexible plan for quick tasks." },
    { title: "Student Offer", price: "$50/year", description: "Discounted plan for students." },
  ];

  return (
    <PricingWrapper>
      <Title>Pricing Plans</Title>
      <TrialMessage>FREE ONE WEEK TRIAL - Explore all features risk-free!</TrialMessage>
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

export default Pricing;
