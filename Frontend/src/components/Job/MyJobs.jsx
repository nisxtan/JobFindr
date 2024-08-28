import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaCheck } from "react-icons/fa6";
import { RxCross2 } from "react-icons/rx";
import { Context } from "../../main";
import { useNavigate } from "react-router-dom";

const JobCard = ({
  job,
  editingMode,
  onEnableEdit,
  onDisableEdit,
  onUpdateJob,
  onDeleteJob,
  onInputChange,
}) => (
  <div className="card" key={job._id}>
    <div className="content">
      <div className="short_fields">
        <div>
          <span>Title:</span>
          <input
            type="text"
            disabled={editingMode !== job._id}
            value={job.title}
            onChange={(e) => onInputChange(job._id, "title", e.target.value)}
          />
        </div>
        <div>
          <span>Country:</span>
          <input
            type="text"
            disabled={editingMode !== job._id}
            value={job.country}
            onChange={(e) => onInputChange(job._id, "country", e.target.value)}
          />
        </div>
        <div>
          <span>City:</span>
          <input
            type="text"
            disabled={editingMode !== job._id}
            value={job.city}
            onChange={(e) => onInputChange(job._id, "city", e.target.value)}
          />
        </div>
        <div>
          <span>Category:</span>
          <select
            value={job.category}
            onChange={(e) => onInputChange(job._id, "category", e.target.value)}
            disabled={editingMode !== job._id}
          >
            <option value="null">Select category</option>

            <option value="Graphics & Design">Graphics & Design</option>
            <option value="Mobile App Development">
              Mobile App Development
            </option>
            <option value="Frontend Web Development">
              Frontend Web Development
            </option>
            <option value="MERN Stack Development">
              MERN STACK Development
            </option>
            <option value="Account & Finance">Account & Finance</option>
            <option value="Artificial Intelligence">
              Artificial Intelligence
            </option>
            <option value="Video Animation">Video Animation</option>
            <option value="MEAN Stack Development">
              MEAN STACK Development
            </option>
            <option value="MEVN Stack Development">
              MEVN STACK Development
            </option>
            <option value="Data Entry Operator">Data Entry Operator</option>
          </select>
        </div>
        <div>
          <span>Salary: </span>
          {job.fixedSalary ? (
            <input
              type="number"
              disabled={editingMode !== job._id}
              value={job.fixedSalary}
              onChange={(e) =>
                onInputChange(job._id, "fixedSalary", e.target.value)
              }
            />
          ) : (
            <div>
              <input
                type="number"
                disabled={editingMode !== job._id}
                value={job.salaryFrom}
                onChange={(e) =>
                  onInputChange(job._id, "salaryFrom", e.target.value)
                }
              />
              <input
                type="number"
                disabled={editingMode !== job._id}
                value={job.salaryTo}
                onChange={(e) =>
                  onInputChange(job._id, "salaryTo", e.target.value)
                }
              />
            </div>
          )}
        </div>
        <div>
          <span>Expired:</span>
          <select
            value={job.expired.toString()}
            onChange={(e) =>
              onInputChange(job._id, "expired", e.target.value === "true")
            }
            disabled={editingMode !== job._id}
          >
            <option value="true">TRUE</option>
            <option value="false">FALSE</option>
          </select>
        </div>
      </div>
      <div className="long_field">
        <div>
          <span>Description:</span>
          <textarea
            rows={5}
            value={job.description}
            disabled={editingMode !== job._id}
            onChange={(e) =>
              onInputChange(job._id, "description", e.target.value)
            }
          />
        </div>
        <div>
          <span>Location:</span>
          <textarea
            value={job.location}
            rows={5}
            disabled={editingMode !== job._id}
            onChange={(e) => onInputChange(job._id, "location", e.target.value)}
          />
        </div>
      </div>
    </div>
    <div className="button_wrapper">
      <div className="edit_btn_wrapper">
        {editingMode === job._id ? (
          <>
            <button onClick={() => onUpdateJob(job._id)} className="check_btn">
              <FaCheck />
            </button>
            <button onClick={() => onDisableEdit()} className="cross_btn">
              <RxCross2 />
            </button>
          </>
        ) : (
          <button onClick={() => onEnableEdit(job._id)} className="edit_btn">
            Edit
          </button>
        )}
      </div>
      <button onClick={() => onDeleteJob(job._id)} className="delete_btn">
        Delete
      </button>
    </div>
  </div>
);

const MyJobs = () => {
  const [myJobs, setMyJobs] = useState([]);
  const [editingMode, setEditingMode] = useState(null);
  const { isAuthorized, user } = useContext(Context);
  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const { data } = await axios.get(
          "http://localhost:4000/api/v1/job/getmyjob",
          { withCredentials: true }
        );
        console.log(data.myJobs); // Log the data to check the category values
        setMyJobs(data.myJobs);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to fetch jobs");
        setMyJobs([]);
      }
    };
    fetchJobs();
  }, []);

  useEffect(() => {
    if (!isAuthorized || (user && user.role !== "Employer")) {
      navigateTo("/");
    }
  }, [isAuthorized, user, navigateTo]);

  const handleEnableEdit = (jobId) => {
    setEditingMode(jobId);
  };

  const handleDisableEdit = () => {
    setEditingMode(null);
  };

  const handleUpdateJob = async (jobId) => {
    const updatedJob = myJobs.find((job) => job._id === jobId);
    try {
      const { data } = await axios.put(
        `http://localhost:4000/api/v1/job/update/${jobId}`,
        updatedJob,
        { withCredentials: true }
      );
      toast.success(data.message);
      setEditingMode(null);
      // Update the jobs list after successful update
      setMyJobs((prevJobs) =>
        prevJobs.map((job) =>
          job._id === jobId ? { ...job, ...updatedJob } : job
        )
      );
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to update job");
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      const { data } = await axios.delete(
        `http://localhost:4000/api/v1/job/delete/${jobId}`,
        { withCredentials: true }
      );
      toast.success(data.message);
      setMyJobs((prevJobs) => prevJobs.filter((job) => job._id !== jobId));
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete job");
    }
  };

  const handleInputChange = (jobId, field, value) => {
    setMyJobs((prevJobs) =>
      prevJobs.map((job) =>
        job._id === jobId ? { ...job, [field]: value } : job
      )
    );
  };

  return (
    <div className="myJobs page">
      <div className="container">
        <h1>Your Posted Jobs</h1>
        {myJobs.length > 0 ? (
          <div className="banner">
            {myJobs.map((job) => (
              <JobCard
                key={job._id}
                job={job}
                editingMode={editingMode}
                onEnableEdit={handleEnableEdit}
                onDisableEdit={handleDisableEdit}
                onUpdateJob={handleUpdateJob}
                onDeleteJob={handleDeleteJob}
                onInputChange={handleInputChange}
              />
            ))}
          </div>
        ) : (
          <p>You've not posted any job or may have deleted all of your jobs!</p>
        )}
      </div>
    </div>
  );
};

export default MyJobs;
