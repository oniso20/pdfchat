import React, { useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner, faUpload } from "@fortawesome/free-solid-svg-icons";
import "./Intro.css"; // Import the CSS file

const Intro = () => {
  const [file, setFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [fileName, setFileName] = useState(null); // New state variable

  const handleFileInputChange = (event) => {
    setFile(event.target.files[0]);
    setFileName(event.target.files[0].name); // Set fileName to the name of the selected file
  };

  const handleUpload = async () => {
    try {
      setIsUploading(true);

      const formData = new FormData();
      formData.append("file", file, file.name);

      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "application/json",
        },
      };

      const response = await axios.post("/api/upload_pdf", formData, config);

      console.log(response.data);

      setUploadStatus(
        `File uploaded successfully with ID: ${response.data.docId}`
      );
    } catch (error) {
      console.error(error);
      setUploadStatus("Failed to upload file");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="intro-container">
      <div className="intro-header">
        <h1>PDF Chat</h1>
        <p>
          Upload a PDF document and ask questions about it. Our AI assistant
          will help you find the answers!
        </p>
      </div>
      <div className="file-upload">
        <input
          type="file"
          id="fileInput"
          accept=".pdf"
          onChange={handleFileInputChange}
        />
        <label htmlFor="fileInput">
          <FontAwesomeIcon icon={faUpload} /> Upload PDF
        </label>
        {fileName && <p className="file-selected">{`${fileName} selected`}</p>}{" "}
        <button onClick={handleUpload} disabled={!file || isUploading}>
          {isUploading ? <FontAwesomeIcon icon={faSpinner} spin /> : "Send"}
        </button>
      </div>
      {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
    </div>
  );
};

export default Intro;
