import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { signupRoute } from '../utils/APIRoutes';
import axios from 'axios';

const Register = () => {

  const navigate = useNavigate();

  const [values, setValues] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
    role: "user"
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    theme: "dark"
  };

  useEffect(() => {
    if (localStorage.getItem('app-user')) {
      navigate('/login');
    }
  }, [navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (handleValidation()) {
      const { username, email, password, role } = values;
      setLoading(true);

      try {
        const { data } = await axios.post(signupRoute, {
          username,
          email,
          password,
          role
        });

        if (data.status === false) {
          toast.error(data.msg, toastOptions);
        }

        if (data.status === true) {
          localStorage.setItem('app-user', JSON.stringify(data.newUser));
          localStorage.setItem("token", data.token);
        }
        navigate('/');
      }
      catch (error) {
        console.log("Error during registration: ", error);
        toast.error("Something went wrong. Please try again.", toastOptions);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleValidation = () => {
    const { password, confirmpassword, username, email } = values;

    if (password !== confirmpassword) {
      toast.error("Password and Confirm password should be the same", toastOptions);
      return false;
    }

    if (username.length < 3) {
      toast.error("Username should be greater than 3 characters", toastOptions);
      return false;
    }

    if (password.length < 8) {
      toast.error("Password should be equal to or greater than 8 characters", toastOptions);
      return false;
    }

    if (email === "") {
      toast.error("Email is required", toastOptions);
      return false;
    }

    return true;
  };

  const handleChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(prev => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(prev => !prev);
  };

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
            type="text"
            placeholder='Username'
            name='username'
            onChange={(e) => handleChange(e)}
          />

          <input
            type="email"
            placeholder='Email'
            name='email'
            onChange={(e) => handleChange(e)}
          />

          <div className="password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder='Password'
              name='password'
              onChange={(e) => handleChange(e)}
            />
            <button type="button" onClick={togglePasswordVisibility}>
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="password-field">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder='Confirm Password'
              name='confirmpassword'
              onChange={(e) => handleChange(e)}
            />
            <button type="button" onClick={toggleConfirmPasswordVisibility}>
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="roles">
            <label>
              <input
                type="radio"
                name="role"
                value="tutor"
                onChange={(e) => handleChange(e)}
                checked={values.role === "tutor"}
              />
              <span>Admin</span>
            </label>

            <label>
              <input
                type="radio"
                name="role"
                value="user"
                onChange={(e) => handleChange(e)}
                checked={values.role === "user"}
              />
              <span>User</span>
            </label>
          </div>

          <button type='submit' disabled={loading}>
            {loading ? "Creating Account..." : "Create User Account"}
          </button>
          <span>
            Already have an account? <Link to="/login">Login</Link>
          </span>

        </form>
      </Container>
      <ToastContainer />
    </motion.div>

  )
};

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

    .password-field {
      display: flex;
      align-items: center;
      position: relative;

      button {
        background: transparent;
        border: none;
        color: #997af0;
        position: absolute;
        right: 10px;
        cursor: pointer;
        font-size: 0.8rem;
      }
    }

    .roles {
      display: flex;
      justify-content: space-between;

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
          border: 0.2rem solid #3005a4;
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

      &:disabled {
        background-color: #6c54d0;
        cursor: not-allowed;
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
