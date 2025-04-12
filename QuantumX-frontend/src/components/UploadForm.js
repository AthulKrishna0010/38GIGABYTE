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

// Hidden input field for file selection
const HiddenFileInput = styled.input`
  display: none;
`;

// Styled label acting as a button to trigger file selection
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

// Container to display the name of the selected file
const FileName = styled.div`
  margin: 0.5rem 0 0.2rem 0;
  font-size: 0.9rem;
  color: #2d3748;
  background-color: #edf2f7;
  padding: 0.4rem 0.8rem;
  border-radius: 8px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

// Styled upload button, conditionally rendered once a file is selected
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

// Section to display the download link and preview button after upload
const URLSection = styled.div`
  margin-top: 1.5rem;
  display: flex;
  gap: 1rem;
  align-items: center;
`;

// Styled anchor tag for the download link
const DownloadLink = styled.a`
  color: rgb(17, 207, 26);
  font-weight: 500;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }
`;

// Styled preview button to open the file in a new tab
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

// Styled component for error messages
const ErrorMessage = styled.p`
  margin-top: 1rem;
  color: #e53e3e; /* Friendly red color for errors */
  font-size: 1rem;
  background-color: #fef2f2; /* Soft red background */
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid #fbd5d5; /* Subtle border */
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
`;

// Main UploadForm component
const UploadForm = ({ onUploadSuccess }) => {
  // State to track the selected file
  const [file, setFile] = useState(null);

  // State to store the download URL after successful upload
  const [downloadUrl, setDownloadUrl] = useState("");

  // State to track and display error messages
  const [error, setError] = useState("");

  // Function to handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile); // Save the selected file in state
      setError(""); // Clear any existing error
      localStorage.setItem("uploadedFilePath", selectedFile.name); // Optionally save the file name locally
      console.log("✅ File path saved to local storage:", selectedFile.name);
    }
  };

  // Function to handle file upload
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload on form submit

    if (!file) {
      alert("No file selected. Please choose a file."); // Alert if no file is selected
      return;
    }

    const formData = new FormData();
    formData.append("image", file); // Append the selected file to form data

    try {
      // API request to upload the file
      const res = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json(); // Parse the server response

      if (data.downloadUrl) {
        setDownloadUrl(data.downloadUrl); // Store the download URL in state
        onUploadSuccess(data.downloadUrl); // Notify the parent component
      } else {
        setError("No text found. Please try again with a valid file."); // Show error if no URL is returned
      }
    } catch (err) {
      setError("An error occurred while uploading. Please try again later."); // Catch and display upload errors
    }
  };

  return (
    <FormWrapper onSubmit={handleSubmit}>
      <CustomButton htmlFor="fileInput">Choose File</CustomButton>
      <HiddenFileInput id="fileInput" type="file" onChange={handleFileChange} />
      {file && <FileName>{file.name}</FileName>} {/* Display file name if selected */}
      {file && <SubmitButton type="submit">Upload</SubmitButton>} {/* Show upload button only if file exists */}
      {error && <ErrorMessage>{error}</ErrorMessage>} {/* Show error message if there's an error */}
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
