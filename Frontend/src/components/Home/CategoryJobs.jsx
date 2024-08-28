import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, Link } from "react-router-dom";

const CategoryJobs = () => {
  const [jobs, setJobs] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const category = query.get("category");

  useEffect(() => {
    const fetchJobsByCategory = async () => {
      if (category) {
        try {
          const response = await axios.get(
            `http://localhost:4000/api/v1/job/getallByCategory?category=${encodeURIComponent(
              category
            )}`
          );
          setJobs(response.data.jobs);
        } catch (error) {
          console.error("Error fetching jobs:", error);
        }
      }
    };

    fetchJobsByCategory();
  }, [category]);

  return (
    <section className="category-jobs page">
      <div className="container">
        <h1>{category} Jobs</h1>
        <div className="banner">
          {jobs.length > 0 ? (
            jobs.map((job) => (
              <div className="card" key={job._id}>
                <p>{job.title}</p>
                <p>{job.category}</p>
                <p>{job.country}</p>
                <Link to={`/job/${job._id}`}>Job Details</Link>
              </div>
            ))
          ) : (
            <p>No jobs available in this category.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CategoryJobs;
