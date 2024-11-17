import React, { useState } from 'react'
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from 'react';
import axios from 'axios';
import { loginRoute } from '../utils/APIRoutes';

const Login = () => {

  const navigate = useNavigate();

  const [values, setValues] = useState({
    email: "",
    password: ""
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    theme: "dark"
  }

  useEffect(() => {
    if(localStorage.getItem('app-user')){
      navigate('/')
    }
  },[]);

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (handleValidation()) {
      const {  email, password } = values;
  
      try {
        const { data } = await axios.post(loginRoute, {
          email,
          password,
        });
  
        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        }
  
        if (data.status === true) {
          localStorage.setItem("app-user", JSON.stringify(data.user));

        
        }
        
        navigate("/");
      } catch (ex) {
        console.error("Error during login:", ex);
        toast.error("Something went wrong. Please try again.", toastOptions);
      }
    }
  };
  

  const handleValidation = () => {
    const{password,email} = values;

    if(email.trim() === "" || password.trim() === ""){
      toast.error(
        "email and password are required", toastOptions
      );
      return false
    }
    return true;
  }

  const handleChange = (event) => {
    setValues({...values, [event.target.name]: event.target.value});
  }

  return (
    <>
      <Container>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <h1>Learning</h1>
          </div>

          <input
            type="email"
            placeholder='email'
            name='email'
            onChange={(e) => handleChange(e)}
          />

          <input
            type="password"
            placeholder='password'
            name='password'
            onChange={(e) => handleChange(e)}
          />

          <button type='submit'>Login</button>
          <span>
            Don't have an account ? <Link to="/register">Register</Link>
          </span>

        </form>
      </Container>
      <ToastContainer/>
    </>
  )
}



const Container = styled.div`

  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: transparent;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;

    h1 {
    color: white;
    text-transform: uppercase;
    }
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: #120529;
    border-radius: 2rem;
    padding: 4rem 5rem;

    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #3005a4;
      border-radius: 0.4rem;
      color: white;
      width: 100%;
      font-size: 1rem;

      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
      
    }

    button {
      background-color: #997af0;
      color: white;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.5s ease-in-out;

      &:hover {
        background-color: #3005a4;
      }
    }

    span {
      color: white;
      text-transform: uppercase;

      a {
        color: #4206e4;
        text-decoration: none;
        font-weight: bold;
      }
    }

  }


`;



export default Login;
