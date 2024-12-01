import styled from "styled-components"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignInAlt } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <Container>
            <nav className="navbar">
                <div className="navbar-brand">
                    Learning
                </div>
                <ul className="navbar-link">
                    <li><Link to="/">Dashboard</Link></li>
                    <li><Link to="/courses">Manage Courses</Link></li>
                    <li><Link to="/uplodecourse">Uploade Courses</Link></li>
                    <li><a href="#contact">Contact</a></li>
                </ul>
                <button className="signin-button">
                    <FontAwesomeIcon icon={faSignInAlt} className="icon" />
                     <Link to="/login">Sign In</Link>
                </button>
            </nav>
        </Container>

    )
}

const Container = styled.div`
    .navbar {
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #01011b;
        padding: 1rem 6rem;
    }

    .navbar a {
        text-decoration: none;
        color: white;
    }

    .navbar-brand {
        font-size: 1.5rem;
        font-weight: bold;
        color: #997af0;
    }

    .navbar-link {
        display: flex;
        list-style: none;
        gap: 1.5rem;
        font-weight: 600;
    }

    .navbar-link li {
        font-size: 1rem;
        transition: color 0.3s ease;
    }

    .navbar-link li a:hover {
        color: #997af0;
    }

    .signin-button {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        background: linear-gradient(135deg, #3005a4, #997af0);
        border: none;
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        font-weight: bold;
        cursor: pointer;
        transition: background 0.3s ease, transform 0.2s ease;
        font-size: 1rem;
    }

    .signin-button:hover {
        background: linear-gradient(135deg, #997af0, #3005a4);
        transform: scale(1.05);
    }

    .signin-button:active {
        transform: scale(0.95);
    }

    .icon {
        font-size: 1.2rem;
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
