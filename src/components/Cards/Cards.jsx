import React, { useEffect, useState } from 'react';
import './Cards.css';
import axios from 'axios';
import JobModal from './JobModal';
import { toast } from 'react-toastify';
import BASE_URL from '../../config';

const Cards = () => {

  const [statsData, setStatsData] = useState(null);
  const [jobData, setJobData] = useState([]);
  const [showJobModal, setShowJobModal] = useState(false);
  const [filter, setFilter] = useState("ALL");
  const [selectedJobs, setSelectedJob] = useState(null);

  const statsHandler = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BASE_URL}/jobs/stats`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStatsData(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  const jobHandler = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.get(`${BASE_URL}/jobs/all`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setJobData(res.data);
    } catch (err) {
      console.log(err.response?.data || err.message);
    }
  };

  useEffect(() => {
    statsHandler();
    jobHandler();
  }, []);

  const closeJobModal = () => {
    setShowJobModal(false);
  };

  const stats = [
    { label: "Total",     count: statsData?.total,     color: "#4A90E2" },
    { label: "Applied",   count: statsData?.applied,   color: "#F5A623" },
    { label: "Interview", count: statsData?.interview, color: "#9B59B6" },
    { label: "Offer",     count: statsData?.offer,     color: "#27AE60" },
    { label: "Rejected",  count: statsData?.rejected,  color: "#E74C3C" },
  ];

  const filteredJobs = filter === "ALL"
    ? jobData
    : jobData.filter(job => job.status === filter);

  const deleteHandler = async (id) => {
    try{
      const token = localStorage.getItem("token");
      const res = await axios.delete(`${BASE_URL}/jobs/delete/${id}`,
        {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
      );
      toast.success("Deleted successfully");
      jobHandler();
      statsHandler();
    }
    catch(err){
      toast.error("Something went wrong!!")
    }
  }

  return (
    <>
      {showJobModal && (
        <JobModal onClose={closeJobModal} refreshJob={jobHandler} refreshStats={statsHandler} job={selectedJobs}/>
      )}

      <div className="container">

        {/* Stats */}
        <div className="stats-container">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card" style={{ background: stat.color }}>
              <h3>{stat.count ?? 0}</h3>
              <p>{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="filter-container">
          <div className="filter-buttons">
            {["ALL", "APPLIED", "INTERVIEW", "OFFER", "REJECTED"].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`filter-btn ${filter === f ? "active" : "inactive"}`}
              >
                {f}
              </button>
            ))}
          </div>

          <button
            className="add-btn"
            onClick={() => {
              setSelectedJob(null)
              setShowJobModal(true)
            }}
          >
            + Add Job
          </button>
        </div>

        {/* Jobs */}
        <div className="jobs-container">
          {filteredJobs?.map(job => (
            <div key={job.id} className="job-card">
              <div className="job-info">
                <h3>{job.companyName}</h3>
                <p className="job-role">{job.role}</p>
                <p className="job-date">Applied: {job.appliedDate}</p>
              </div>
              <div className="actions">
                <span className={`status ${job.status.toLowerCase()}`}>
                  {job.status}
                </span>
                <button className="edit-btn" onClick={() => {
                  setSelectedJob(job)
                  setShowJobModal(true)
                }}>Edit</button>
                <button className="delete-btn" onClick={() => deleteHandler(job.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>

      </div>
    </>
  );
};

export default Cards;
