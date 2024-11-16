import React from 'react'
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  return (
    <>
      <Container>
        <form>
          <div className="brand">
            <h1>Learning</h1>
          </div>

          <input
            type="text"
            placeholder='username'
            name='username'
          />

          <input
            type="password"
            placeholder='password'
            name='password'
          />

          <button type='submit'>Login</button>
          <span>
            Don't have an account ? <Link to="/register">Register</Link>
          </span>

        </form>
      </Container>
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
