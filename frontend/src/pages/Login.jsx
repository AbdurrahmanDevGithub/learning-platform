import { useState } from 'react'
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/features/AuthSlice';

const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:3001/api/account/signin", {
        email,
        password,
      });

      if (response.status === 200) {
        dispatch(
          loginSuccess({
            token: response.data.token,
            username: response.data.username,
          })
        );
        toast.success("Login successful!", { position: "top-right" });
        navigate("/");
      }
      else {
        setError("User name or Password incorect, Please try again");
      }

    }
    catch (error) {
      setError("An error occurred please try again later");
      console.log(error);
    }
  }

  return (


    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -50 }}
      transition={{ duration: 0.5 }}
    >

      <Container>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <h1>Learning</h1>
          </div>

          <input
            type="email"
            placeholder='sample@gmail.com'
            name='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder='Enter your password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type='submit'>Login</button>
          <span>
            Don't have an account ? <Link to="/register">Register</Link>
          </span>

        </form>
      </Container>
      <ToastContainer />
    </motion.div>

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
