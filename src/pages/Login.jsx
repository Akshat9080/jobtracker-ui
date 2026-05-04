import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import BASE_URL from "../config";
import "./auth.css";

function Login() {
  const [formData , setFormData] = useState({
    username:"",
    password:""
  })
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const changeHandler = (e) => {
    const { name,value }= e.target;
    setFormData((prev) => ({
        ...prev,
        [name]:value
    }))
  }

  const submitHandler = async(e) => {
    e.preventDefault();
    setLoading(true);
    try{
      const res = await axios.post(`${BASE_URL}/auth/login`,formData);

      const token = res.data.token;

      localStorage.setItem("token",token);

      const decoded = jwtDecode(token);

      localStorage.setItem("name",decoded.sub);

      toast.success("Login Successful!🚀");

      navigate("/dashboard");
    }
    catch(err){
      toast.error("Looks like you haven't registered. Please register 😄");
    }
    finally{
      setLoading(false);
    }
  }


  return (
    <div className="auth-container">
      {/* Left Side */}
      <div className="auth-left">
        <h1>JobTracker</h1>
        <p>Track your job applications smartly 🚀</p>
      </div>

      {/* Right Side */}
      <div className="auth-right">
        <h2>Login</h2>

        <form onSubmit={submitHandler}>
          <input 
            name="username" 
            type="text"
            placeholder="Enter your username" required 
            value={formData.username} 
            onChange={changeHandler} 
          />
          <input 
            name="password" 
            type="password" 
            placeholder="Password" required 
            value={formData.password} 
            onChange={changeHandler} 
          />

          <button type="submit" disabled={loading}>
            {loading ? (
          <>
            <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
                aria-hidden="true"
            />
            Please wait...
          </>
          ) : ("Login")}
          </button>
        </form>

        <p>
          Don't have an account? <a href="/register">Register</a>
        </p>
      </div>

    </div>
  );
}

export default Login;