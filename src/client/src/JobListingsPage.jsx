import React, { useEffect, useState } from "react";

const JobListingsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [keyword, setKeyword] = useState("");

  // Fetch jobs
  const fetchJobs = async () => {
    const query = new URLSearchParams({
      title,
      location,
      keyword,
    });

    try {
      const res = await fetch(`/api/jobs/search?${query.toString()}`);
      const data = await res.json();
      setJobs(data);
    } catch (err) {
      console.error("Error fetching jobs:", err);
    }
  };

  // Load jobs initially
  useEffect(() => {
    fetchJobs();
  }, []);

  const handleSearch = () => {
    fetchJobs();
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Job Listings</h1>

      {/* Search Bar */}
      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "20px",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Search by job title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{
            padding: "10px",
            width: "250px",
            borderRadius: "8px",
            border: "1px solid gray",
          }}
        />

        <input
          type="text"
          placeholder="Location..."
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          style={{
            padding: "10px",
            width: "200px",
            borderRadius: "8px",
            border: "1px solid gray",
          }}
        />

        <input
          type="text"
          placeholder="Keyword..."
          value={keyword}
          onChange={(e) => setKeyword(e.target.value)}
          style={{
            padding: "10px",
            width: "200px",
            borderRadius: "8px",
            border: "1px solid gray",
          }}
        />

        <button
          onClick={handleSearch}
          style={{
            padding: "10px 20px",
            borderRadius: "8px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
          }}
        >
          Search
        </button>
      </div>

      <div>
        {jobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          jobs.map((job) => (
            <div
              key={job.id}
              style={{
                border: "1px solid #ddd",
                padding: "15px",
                marginBottom: "15px",
                borderRadius: "10px",
                background: "#f9f9f9",
              }}
            >
              <h2>{job.job_title}</h2>
              <p>
                <strong>Company:</strong> {job.company_name}
              </p>
              <p>
                <strong>Location:</strong> {job.job_location}
              </p>
              <p>{job.job_description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default JobListingsPage;
