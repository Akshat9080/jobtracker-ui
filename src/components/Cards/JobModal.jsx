import React, { useState } from "react";
import "./JobModal.css";
import axios from "axios";
import { toast } from "react-toastify";
import BASE_URL from "../../config";

const JobModal = ({ onClose,refreshJob,refreshStats,job }) => {

  const [formData, setFormData] = useState({
    companyName: job?.companyName || "",
    role: job?.role || "",
    status: job?.status || "APPLIED",
    appliedDate: job?.appliedDate || ""
  });
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    try{
        const token = localStorage.getItem("token");
        if(job){
            await axios.put(
                `${BASE_URL}/jobs/update/${job.id}`,
                formData,
        {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
                
            )
        }
        else {
            await axios.post(
        `${BASE_URL}/jobs/create`,
        formData,
        {
            headers: {
            Authorization: `Bearer ${token}`,
            },
        }
        );
        }
        refreshJob();
        refreshStats();
        toast.success("Job Added Successfully");
    }
    catch(err){
        toast.error("Something went wrong!!")
    }
    onClose();
  };

  console.log("Form Data:", formData);

  return (
    <div className="modal-overlay">
    <div style={{
      background: "white",
      padding: "30px",
      borderRadius: "10px",
      width: "400px",
      zIndex: 100000
    }}>
      <h2>Add Job</h2>

        <form onSubmit={handleSubmit} className="modal-form">

          <input
            type="text"
            name="companyName"
            placeholder="Company Name"
            value={formData.companyName}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="role"
            placeholder="Role"
            value={formData.role}
            onChange={handleChange}
            required
          />

          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="APPLIED">APPLIED</option>
            <option value="INTERVIEW">INTERVIEW</option>
            <option value="OFFER">OFFER</option>
            <option value="REJECTED">REJECTED</option>
          </select>

          <input
            type="date"
            name="appliedDate"
            value={formData.appliedDate}
            onChange={handleChange}
            required
          />

          <div className="modal-actions">
            <button type="submit" className="save-btn">Save</button>
            <button type="button" className="cancel-btn" onClick={onClose}>Cancel</button>
          </div>

        </form>

    </div>
  </div>
  );
};

export default JobModal;
