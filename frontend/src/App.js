import React, { useEffect, useState } from "react";
import axios from "axios";
import UploadForm from "./components/UploadForm";
import ReportList from "./components/ReportList";
import "./index.css"; 

const App = () => {
  const [reports, setReports] = useState([]);

  const fetchReports = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/reports");
      setReports(data);
    } catch (error) {
      console.error("Error fetching reports", error);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  return (
    <div className="container">
      <h1>💳 Credit Report Dashboard</h1>
      <UploadForm fetchReports={fetchReports} />
      <ReportList reports={reports} />
    </div>
  );
};

export default App;
