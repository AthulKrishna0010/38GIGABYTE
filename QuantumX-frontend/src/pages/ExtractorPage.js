// src/pages/ExtractorPage.js
import React, { useState } from "react";
import styled from "styled-components";
import UploadForm from "../components/UploadForm";
import Intro from "../pages/Intro";
import appInfoImg from "../assets/app-info.jpg"; // Path to the app info image

// Wrapper for the entire page layout
const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 3rem 1rem;
  background-color: #f8f9fa; /* Light background for a clean look */
  display: flex;
  justify-content: center;
`;

// Container for central content on the page
const Container = styled.div`
  width: 100%;
  max-width: 960px;
  background-color: #ffffff; /* White background for contrast */
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05); /* Subtle shadow for emphasis */
  padding: 2rem;
`;

// Title styling for section headers
const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: bold;
  color: #333; /* Dark text for readability */
  text-align: center;
  margin-bottom: 2rem;
`;

// Row layout for flexbox arrangement
const Row = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: space-between; /* Ensures proper spacing between columns */
  align-items: flex-start;
`;

// Column layout for individual content blocks
const Column = styled.div`
  flex: 1;
  min-width: 280px; /* Ensures minimum width for small screens */
`;

// Styling for app information image
const AppImage = styled.img`
  width: 100%;
  border-radius: 12px; /* Rounded corners for better visuals */
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1); /* Light shadow for depth */
`;

// Wrapper for extracted text results
const ResultBox = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f1f3f5; /* Slightly off-white background */
  border-radius: 12px;
  border: 1px solid #dee2e6; /* Border for subtle visual separation */
  white-space: pre-wrap; /* Ensures text wraps properly */
`;

// Header for result section
const ResultTitle = styled.h3`
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #444; /* Medium-dark color for headers */
`;

// Paragraph styling for result text
const ResultText = styled.p`
  font-size: 0.95rem;
  color: #222; /* Slightly darker text for readability */
`;

const ExtractorPage = () => {
  // State to store extracted text from the file upload
  const [text, setText] = useState("");

  return (
    <>
      {/* Intro component for introductory content */}
      <Intro />
      <PageWrapper>
        <Container>
          <Row>
            {/* Column for displaying the app information image */}
            <Column>
              <AppImage src={appInfoImg} alt="App Info" />
            </Column>
            {/* Column for the upload form */}
            <Column>
              <Title>Upload Your File</Title>
              <UploadForm onUploadSuccess={setText} /> {/* Handles file upload and success callback */}
            </Column>
          </Row>
        </Container>
      </PageWrapper>
    </>
  );
};

export default ExtractorPage;
