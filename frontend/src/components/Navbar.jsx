import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt, faGraduationCap } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { logout } from "../redux/features/AuthSlice";
import { useSelector, useDispatch } from "react-redux";

const Navbar = () => {
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <Container>
      <nav className="navbar">
        <div className="navbar-brand">
          <FontAwesomeIcon icon={faGraduationCap} className="brand-icon" />
        </div>
        <ul className="navbar-link">
          <li><Link to="/">Dashboard</Link></li>
          <li><Link to="/courses">Manage Courses</Link></li>
          <li><Link to="/uplodecourse">Upload Courses</Link></li>
          <li><a href="#contact">Contact</a></li>
          <li><Link to="/allcourses">View Courses</Link></li>
          <li><Link to="/mycourses">My Courses</Link></li>
        </ul>

        {isAuthenticated ? (
          <button onClick={handleLogout} className="signin-button">
            Logout
          </button>
        ) : (
          <Link to="/login" className="signin-button">
            <FontAwesomeIcon icon={faSignInAlt} className="icon" />
            Sign In
          </Link>
        )}
      </nav>
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
    animation: slideDown 1s ease-in-out; /* Navbar slide-in animation */
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
    animation: slideUp 1.2s ease-in-out; /* Slide-up animation for links */
  }

  .navbar-link li {
    font-size: 1rem;
    transition: color 0.3s ease;
  }

  .navbar-link li a:hover {
    color: #0202a1;
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
    animation: bounceIn 1s ease; /* Button animation on load */
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

  /* Keyframes for animations */
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

  /* Mobile Responsiveness */
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
