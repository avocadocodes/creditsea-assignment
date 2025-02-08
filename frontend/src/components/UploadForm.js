import React, { useState } from "react";
import axios from "axios";

const UploadForm = ({ fetchReports }) => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async (e) => {
    e.preventDefault();
    if (!file) return alert("Please select an XML file");

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      await axios.post("http://localhost:5000/api/upload", formData);
      fetchReports();
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-container">
      <h2>📂 Upload XML File</h2>
      <input type="file" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload"}
      </button>
    </div>
  );
};

export default UploadForm;
