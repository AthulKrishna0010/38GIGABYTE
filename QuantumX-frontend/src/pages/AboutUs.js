import React from "react";
import styled from "styled-components";

// Wrapper for the entire About Us section
const AboutWrapper = styled.div`
  padding: 2rem 1rem;
  background-color: #f8f9fa;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

// A styled container for each section with white background and box shadow
const Section = styled.div`
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 960px;
`;

// A styled header for each section
const SectionHeader = styled.h2`
  font-size: 1.75rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 1rem;
  text-align: center;
`;

// Paragraph style for section text
const Paragraph = styled.p`
  font-size: 1rem;
  color: #555;
  line-height: 1.6;
  text-align: center;
`;

// List style for the Future Goals section
const GoalsList = styled.ul`
  list-style: disc;
  margin-top: 1rem;
  padding-left: 2rem;
  font-size: 1rem;
  color: #555;
`;

// Grid layout for the team members section
const TeamMembers = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); /* Adapts to 4x1 or 2x2 layout */
  gap: 1rem;
  width: 100%;
`;

// Styled container for each team member
const TeamMember = styled.div`
  background-color: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  text-align: center;
  width: 100%;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
`;

// Name styling for team members
const MemberName = styled.h3`
  font-size: 1.25rem;
  color: #007bff;
  margin-bottom: 0.5rem;
`;

// Role styling for team members
const MemberRole = styled.p`
  font-size: 1rem;
  color: #666;
`;

// Main AboutUs component
const AboutUs = () => {
  return (
    <AboutWrapper>
      {/* Motive Section */}
      <Section>
        <SectionHeader>Motive</SectionHeader>
        <Paragraph>
          Snap2Bill was created to simplify the process of managing bills and receipts. We aim to make life easier by providing an intuitive platform that extracts important details effortlessly and streamlines the workflow for everyone, from professionals to students.
        </Paragraph>
      </Section>

      {/* Future Goals Section */}
      <Section>
        <SectionHeader>Future Goals</SectionHeader>
        <GoalsList>
          <li>Integrate secure storage for card bills, allowing users to save their data privately.</li>
          <li>Expand support for various international bill formats.</li>
          <li>Implement AI-driven analytics for expenditure tracking and insights.</li>
          <li>Introduce multi-user collaboration for businesses and households.</li>
        </GoalsList>
      </Section>

      {/* The Team Section */}
      <Section>
        <SectionHeader>The Snap2Team</SectionHeader>
        <TeamMembers>
          {/* Individual team member cards */}
          <TeamMember>
            <MemberName>Athul Krishna</MemberName>
            <MemberRole>React and Node Developer</MemberRole>
          </TeamMember>
          <TeamMember>
            <MemberName>Jeshwin G T</MemberName>
            <MemberRole>Web Designer</MemberRole>
          </TeamMember>
          <TeamMember>
            <MemberName>Noel Varghese</MemberName>
            <MemberRole>React and Node Developer</MemberRole>
          </TeamMember>
          <TeamMember>
            <MemberName>Tushar S</MemberName>
            <MemberRole>AI/ML Engineer</MemberRole>
          </TeamMember>
        </TeamMembers>
      </Section>
    </AboutWrapper>
  );
};

export default AboutUs;
