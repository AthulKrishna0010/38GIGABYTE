import React, { useState } from "react";
import styled from "styled-components";

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

const UploadForm = ({ onUploadSuccess }) => {
  const [file, setFile] = useState(null);

  // Handle file selection
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      localStorage.setItem("uploadedFilePath", selectedFile.name); // Save file path to local storage
      console.log("✅ File path saved to local storage:", selectedFile.name);
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
        alert("No file selected. Please choose a file.");
        return;
    }

    // Declare and initialize formData
    const formData = new FormData();
    formData.append("image", file); // Attach the selected file

    try {
        const res = await fetch("http://localhost:5000/api/upload", {
            method: "POST",
            body: formData,
        });

        const data = await res.json();

        if (data.downloadUrl) {
            console.log("✅ Upload success. PDF generated:", data.downloadUrl);
            window.open(data.downloadUrl, "_blank"); // Open PDF in new tab
        } else {
            console.error("❌ No PDF generated. Server response:", data);
        }
    } catch (err) {
        console.error("❌ Upload failed:", err);
    }
};



  return (
    <FormWrapper onSubmit={handleSubmit}>
      <CustomButton htmlFor="fileInput">Choose File</CustomButton>
      <HiddenFileInput id="fileInput" type="file" onChange={handleFileChange} />
      {file && <FileName>{file.name}</FileName>}
      <SubmitButton type="submit">Upload</SubmitButton>
    </FormWrapper>
  );
};

export default UploadForm;
