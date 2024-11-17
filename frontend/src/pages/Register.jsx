import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { signupRoute } from '../utils/APIRoutes';
import axios from 'axios'

const Register = () => {

  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: ""
    // roles: [],
  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    theme: "dark"
  };

  useEffect(() => {
    if (localStorage.getItem('app-user')) {
      navigate('/');
    }
  }, []);



const handleSubmit = async (event) => {
  event.preventDefault();

  if(handleValidation()){
    const { username, email, password } = values;      //{ username, email, password, roles }

    const {data} = await axios.post(signupRoute, {
      username,
      email,
      password,
      // roles
    });

    if(data.status === false){
      toast.error(data.msg, toastOptions);
    }

    if(data.status === true){
      localStorage.setItem('app-user',JSON.stringify(data.newUser))
      
    }

    navigate('/')
    

  }
}


  const handleValidation = () => {

    const { password, confirmpassword, username, email } = values;

    if (password !== confirmpassword) {
      toast.error(
        "Password and Confirm password should be same", toastOptions
      );
      return false;
    }

    if (username.length < 3) {
      toast.error(
        "Username should be grater than 3 chracters", toastOptions
      );
      return false;
    }

    if (password.length < 8) {
      toast.error(
        "password should be equal or grater than 8 chracters", toastOptions
      );
      return false;
    }

    if (email === "") {
      toast.error(
        "Email is required", toastOptions
      )
      return false;
    }

    return true;

  }


  const handleChange = (event) => {
    setValues({...values, [event.target.name]: event.target.value})
  }

  // const handleCheckBoxChange = (event) => {
  //   const {value, checked} = event.target;

  //   setValues((prevValues) => {
  //     if(checked){
  //       return {...prevValues, roles: [...prevValues.roles, value]};
  //     }
  //     else{
  //       return{
  //         ...prevValues,
  //         roles: prevValues.roles.filter((role) => role !== value),
  //       };
  //     }
  //   })
  // }


  return (
    <>
      <Container>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <h1>Learning</h1>
          </div>

          <input
            type="text"
            placeholder='username'
            name='username'
            onChange={(e) => handleChange(e)}
          />

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

          <input
            type="password"
            placeholder='ConfirmPassword'
            name='confirmpassword'
            onChange={(e) => handleChange(e)}
          />

          <div className="roles">
            <label>
              <input 
              type="checkbox"
              name='role'
              value='Admin'
              // onChange={handleCheckBoxChange} 
              />
              <span>Admin</span>
            </label>

            <label>
              <input 
              type="checkbox"
              name='role'
              value='User' 
              // onChange={handleCheckBoxChange}
              />
             <span>User</span>
            </label>
          </div>

          

          <button type='submit'>Create User Account</button>
          <span>
            Already have an account ? <Link to="/login">Login</Link>
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

    .roles {
      display: flex;
      justify-content: space-between;;

      label {
        color: white;
        font-size: 1rem;
        display: flex;
        align-items: center;

        input {
          accent-color: #997af0;
          margin-right: 0.5rem;
          appearance: none;
          width: 20px;
          height: 20px;
          border: 2px solid #997af0;
          border-radius: 50%;
          cursor: pointer;
          transition: background-color 0.3s, border-color 0.3s;
        }

        input:checked {
          background-color: #997af0;
          border-color: #3005a4; 
        }

        input:checked + span {
          color: #997af0; 
        }

        span {
        margin-left: 0.5rem;
        color: #3005a4;
        font-weight: bold;
      }
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



export default Register;
