import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./auth.css";
import { toast } from "react-toastify";
import BASE_URL from "../config";

function Register() {
  const [formData,setFormData] = useState({
    firstName:"",
    lastName:"",
    username:"",
    email:"",
    password:""
  })
  const navigate = useNavigate();

  const changeHandler = (e) => {
    const {name,value} = e.target;
    setFormData((prev) => ({
        ...prev,
        [name]:value
    }))
  }

  const submitHandler = async(e) => {
    e.preventDefault();
    try{
      await axios.post(`${BASE_URL}/auth/register`,formData);
      toast.success("You have registered successfully");
      navigate("/login");
    }
    catch(err){
      console.log(err);
      toast.error("Registration failed");
    }
  }

  return (
    <div className="auth-container">
      <div className="auth-left">
        <h1>JobTracker</h1>
        <p>Start managing your career today 💼</p>
      </div>

      <div className="auth-right">
        <h2>Register</h2>

        <form onSubmit={submitHandler}>
          <input 
            name="firstName" 
            type="text" 
            placeholder="First Name" required
            value={formData.firstName}
            onChange={changeHandler} 
          />
          <input 
            name="lastName" 
            type="text" 
            placeholder="Last Name" required
            value={formData.lastName}
            onChange={changeHandler} 
          />
          <input 
            name="username" 
            type="text" 
            placeholder="User Name" required
            value={formData.username}
            onChange={changeHandler} 
          />
          <input 
            name="email" 
            type="email" 
            placeholder="Email" required
            value={formData.email}
            onChange={changeHandler} 
          />
          <input 
            name="password" 
            type="password" 
            placeholder="Password" required
            value={formData.password}
            onChange={changeHandler}
           />

          <button type="submit">Register</button>
        </form>

        <p>
          Already have an account? <a href="/login">Login</a>
        </p>
      </div>

    </div>
  );
}

export default Register;