import { LoginForm } from "@/components/Login-form";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const navigate = useNavigate()
  const [data, setData] = useState({
    username: '',
    password: '',
  });

  const submitHandler: () => void = async (e: React.FormEvent) => {
    e.preventDefault();

    console.log(data)

    try {
      const response = await axios.post("http://localhost:3000/api/v1/signin", {
        username: data.username,
        password: data.password,
      });
      const jwt = response.data.token;
      localStorage.setItem("token", jwt);
      navigate("/dashboard")
    } catch (error) {
      console.log(error.error);
    }
  };

  return (
    <div className="w-full h-screen bg-neutral-950 flex items-center justify-center">
      <LoginForm setData={setData} submitHandler={submitHandler} />
    </div>
  );
};

export default Signin;
