import React, { useState } from "react";
import styled from "styled-components";

// Styled wrapper for the form layout
const FormWrapper = styled.form`
  padding: 1rem;
  border: 2px dashed #cbd5e0;
  border-radius: 12px;
  background-color: #f7fafc;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const HiddenFileInput = styled.input`
  display: none;
`;

const CustomButton = styled.label`
  background-color: #4299e1;
  color: white;
  padding: 0.6rem 1.2rem;
  font-weight: 500;
  border-radius: 8px;
  cursor: pointer;
  display: inline-block;
  transition: background 0.3s ease;

  &:hover {
    background-color: #3182ce;
  }
`;

const FileName = styled.div`
  margin: 0.5rem 0 0.2rem 0;
  font-size: 0.9rem;
  color: #2d3748;
  background-color: #edf2f7;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const SubmitButton = styled.button`
  margin-top: 1rem;
  background-color: #3182ce;
  color: white;
  padding: 0.5rem 1.5rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2b6cb0;
  }
`;

const URLSection = styled.div`
  margin-top: 1.5rem;
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const DownloadLink = styled.a`
  color: rgb(17, 207, 26);
  font-weight: 500;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

const PreviewButton = styled.button`
  background-color: #4299e1;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2b6cb0;
  }
`;

const ErrorMessage = styled.p`
  margin-top: 1rem;
  color: #e53e3e;
  font-size: 1rem;
  background-color: #fef2f2;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid #fbd5d5;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
`;

const UploadForm = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);
  const [downloadUrl, setDownloadUrl] = useState("");
  const [error, setError] = useState("");

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      // Reset states to clear all previous outputs
      setFile(selectedFile); // Set the new file
      setDownloadUrl(""); // Clear the download button
      setError(""); // Clear any error messages
      console.log("✅ New file selected:", selectedFile.name);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("No file selected. Please choose a file.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (data.downloadUrl) {
        setDownloadUrl(data.downloadUrl); // Show the download button and preview
        onUploadSuccess(data.downloadUrl); // Notify parent
      } else {
        setError("No text found. Please try again with a valid file.");
      }
    } catch (err) {
      setError("An error occurred while uploading. Please try again later.");
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <CustomButton htmlFor="fileInput">Choose File</CustomButton>
      <HiddenFileInput id="fileInput" type="file" onChange={handleFileChange} />
      {file && <FileName>{file.name}</FileName>}
      {file && <SubmitButton type="submit">Upload</SubmitButton>}
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {downloadUrl && (
        <URLSection>
          <DownloadLink href={downloadUrl} target="_blank" rel="noopener noreferrer">
            Download PDF
          </DownloadLink>
          <PreviewButton onClick={() => window.open(downloadUrl, "_blank")}>
            Preview PDF
          </PreviewButton>
        </URLSection>
      )}
    </FormWrapper>
  );
};

export default UploadForm;
