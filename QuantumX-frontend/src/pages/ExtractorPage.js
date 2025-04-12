// src/pages/ExtractorPage.js
import React, { useState } from "react";
import styled from "styled-components";
import UploadForm from "../components/UploadForm";
import Intro from "../pages/Intro";
import appInfoImg from "../assets/app-info.jpg"; // adjust path as needed


const PageWrapper = styled.div`
  min-height: 100vh;
  padding: 3rem 1rem;
  background-color: #f8f9fa;
  display: flex;
  justify-content: center;
`;

const Container = styled.div`
  width: 100%;
  max-width: 960px;
  background-color: #ffffff;
  border-radius: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.05);
  padding: 2rem;
`;

const Title = styled.h2`
  font-size: 1.75rem;
  font-weight: bold;
  color: #333;
  text-align: center;
  margin-bottom: 2rem;
`;

const Row = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
`;

const Column = styled.div`
  flex: 1;
  min-width: 280px;
`;

const AppImage = styled.img`
  width: 100%;
  border-radius: 12px;
  
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
`;

const ResultBox = styled.div`
  margin-top: 2rem;
  padding: 1rem;
  background-color: #f1f3f5;
  border-radius: 12px;
  border: 1px solid #dee2e6;
  white-space: pre-wrap;
`;

const ResultTitle = styled.h3`
  font-weight: 600;
  margin-bottom: 0.5rem;
  color: #444;
`;

const ResultText = styled.p`
  font-size: 0.95rem;
  color: #222;
`;

const ExtractorPage = () => {
  const [text, setText] = useState("");

  return (
    <>
    <Intro />
    <PageWrapper>
      <Container>
        
        <Row>
          <Column>
            <AppImage src={appInfoImg} alt="App Info" />
          </Column>
          <Column>
          <Title>Upload Your File</Title>
            <UploadForm onUploadSuccess={setText} />
          </Column>
        </Row>

        
      </Container>
    </PageWrapper>
    </>
  );
};

export default ExtractorPage;
