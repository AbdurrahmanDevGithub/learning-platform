import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { logout } from "../redux/features/AuthSlice";
import { useSelector, useDispatch } from "react-redux";
import { jwtDecode } from 'jwt-decode';
import { toast, ToastContainer } from 'react-toastify';

const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout());
  };

  const handleManageClick = () => {
    try {
      const token = localStorage.getItem('token')
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role;
      if (role != 'tutor') {
        toast.error("Only tutors can access this page");
        return;
      } else if (role == 'tutor') {
        navigate("/courses")
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleUploadClick = () => {
    try {
      const token = localStorage.getItem('token')
      const decodedToken = jwtDecode(token);
      const role = decodedToken.role;
      if (role != 'tutor') {
        toast.error("Only tutors can access this page");
        return;
      } else if (role == 'tutor') {
        navigate("/uploadcourse")
      }
    } catch (error) {
      console.log(error);
    }
  }


  return (
    <Container>
      <nav className="navbar">
        <div className="navbar-brand">
          <FontAwesomeIcon icon={faGraduationCap} className="brand-icon" />
        </div>
        <ul className="navbar-link">
          <li><Link to="/">Dashboard</Link></li>


          <a href="#" className="nav-link">
            Tutor ▼
          </a>
          <ul className="dropdown">
            <li className="dropdown-item" onClick={() => handleManageClick()}>Manage Course </li>
            <li className="dropdown-item" onClick={() => handleUploadClick()}>Upload Course</li>
          </ul>

          <li><Link to="/allcourses">View Courses</Link></li>
          <li><Link to="/mycourses">My Courses</Link></li>
          <li><Link to="/viewbook">Get Books</Link></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        {isAuthenticated ? (
          <>
            <button onClick={handleLogout} className="signin-button">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="signin-button">
            <FontAwesomeIcon icon={faSignInAlt} className="icon" />
            Sign In
          </Link>
        )}
      </nav>
      <ToastContainer />
    </Container>
  );
};

const Container = styled.div`
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    z-index: 10;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: transparent;
    padding: 2rem 12rem;
    animation: slideDown 1s ease-in-out;
  }

  .navbar a {
    text-decoration: none;
    color: white;
    font-weight: 1300;
    font-size: 20px;
    transition: color 0.3s ease, transform 0.3s ease;
  }

  .navbar a:hover {
    color: #0202a1;
    transform: scale(1.1);
  }

  .navbar-brand {
    font-size: 4.2rem;
    font-weight: 900;
    color: white;
    animation: fadeIn 1.2s ease-in-out;
  }

  .navbar-link {
    display: flex;
    list-style: none;
    gap: 1.5rem;
    font-weight: 600;
    animation: slideUp 1.2s ease-in-out;
    position: relative;
  }

  .navbar-link li {
    font-size: 1rem;
    position: relative;
  }

  .navbar-link li a:hover {
    color: #0202a1;
  }

  .dropdown {
    list-style: none;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: rgba(255, 255, 255, 0.9);
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    padding: 0.7rem 0;
    display: none;
    z-index: 1000;
    min-width: 200px; 
  }

  .dropdown-item {
    padding: 0.8rem 1.5rem; 
    text-decoration: none;
    color: black;
    font-size: 1rem;
    display: block;
    transition: background-color 0.3s ease, color 0.3s ease;
  }

  .dropdown-item:hover {
    background: linear-gradient(135deg, navy, #0505f1); 
    color: white; 
    cursor: pointer;
  }

  .nav-link:hover + .dropdown,
  .dropdown:hover {
    display: block;
  }


  .signin-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    background: linear-gradient(135deg, white, #a69090);
    border: none;
    color: black;
    padding: 0.5rem 1rem;
    border-radius: 5px;
    font-weight: bold;
    cursor: pointer;
    transition: background 0.3s ease, transform 0.2s ease;
    font-size: 1.2rem;
    text-decoration: none;
    animation: bounceIn 1s ease;
  }

  .signin-button:hover {
    background: linear-gradient(135deg, navy, #0505f1);
    transform: scale(1.05);
    color: white;
  }

  .signin-button:active {
    transform: scale(0.95);
  }

  .icon {
    font-size: 1.2rem;
  }

  @keyframes slideDown {
    from {
      transform: translateY(-100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slideUp {
    from {
      transform: translateY(100%);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes bounceIn {
    0% {
      transform: scale(0.9);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }

  @media (max-width: 768px) {
    .navbar {
      flex-direction: column;
      padding: 1rem 2rem;
    }

    .navbar-brand {
      font-size: 1.2rem;
      margin-bottom: 1rem;
    }

    .navbar-link {
      flex-direction: column;
      gap: 1rem;
      font-size: 1.1rem;
      margin-bottom: 1rem;
    }

    .navbar-link li {
      text-align: center;
    }

    .signin-button {
      width: 100%;
      justify-content: center;
      padding: 0.8rem 0;
    }
  }

  @media (max-width: 480px) {
    .navbar {
      padding: 1rem;
    }

    .navbar-brand {
      font-size: 1.1rem;
    }

    .navbar-link {
      font-size: 1rem;
    }

    .signin-button {
      font-size: 0.9rem;
    }
  }
`;

export default Navbar;
