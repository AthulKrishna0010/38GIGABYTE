import React from "react";
import styled from "styled-components";

const IntroWrapper = styled.div`
  background-color: #ffffff;
  padding: 2.5rem 2rem;
  margin: 2rem auto;
  max-width: 800px;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.05);
  text-align: center;
`;

const Heading = styled.h1`
  font-size: 2.2rem;
  font-weight: bold;
  color: #2d3748;
  margin-bottom: 1rem;
`;

const SubText = styled.p`
  font-size: 1.05rem;
  color: #4a5568;
  line-height: 1.7;
`;

const Highlight = styled.span`
  color: #3182ce;
  font-weight: 600;
`;

const Intro = () => {
  return (
    <IntroWrapper>
      <Heading>Welcome to <Highlight>Snap2Bill</Highlight></Heading>
      <SubText>
        Snap2Bill lets you effortlessly extract text from your bills, invoices, and receipts.
        Just upload your file — our smart engine handles the rest.
        Say goodbye to manual data entry and hello to streamlined document processing.
      </SubText>
    </IntroWrapper>
  );
};

export default Intro;
