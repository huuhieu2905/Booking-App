import React, { useState } from "react";

export default function CloudinaryTest() {
  const [files, setFiles] = useState([]); // Store selected files
  const [uploadedUrls, setUploadedUrls] = useState([]); // Store URLs of uploaded files

  const handleFileUpload = async (e) => {
    const selectedFiles = Array.from(e.target.files); // Get selected files as an array
    if (selectedFiles.length === 0) return;

    setFiles(selectedFiles); // Update state with selected files

    // Prepare form data for each file
    const uploadedUrlsTemp = [];
    for (const file of selectedFiles) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://localhost:4000/cloudinary-upload", {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          uploadedUrlsTemp.push(data.secure_url); // Add uploaded URL to temp array
        } else {
          console.error("Upload failed for file:", file.name);
        }
      } catch (error) {
        console.error("Error uploading file:", file.name, error);
      }
    }

    setUploadedUrls(uploadedUrlsTemp); // Update state with all uploaded URLs
  };

  return (
    <div style={{ padding: 20 }}>
      <div style={{ margin: 10 }}>
        <label style={{ margin: 10 }}>Cloudinary (multiple files):</label>
        <input
          type="file"
          multiple // Allow selecting multiple files
          onChange={handleFileUpload}
        />
      </div>

      {files.length > 0 && (
        <div>
          <p>Selected Files:</p>
          <ul>
            {files.map((file, index) => (
              <li key={index}>{file.name}</li>
            ))}
          </ul>
        </div>
      )}

      {uploadedUrls.length > 0 && (
        <div>
          <p>Uploaded Images:</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
            {uploadedUrls.map((url, index) => (
              <img
                key={index}
                src={url}
                alt={`Uploaded ${index + 1}`}
                style={{ width: "150px", height: "auto", marginTop: "10px" }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
