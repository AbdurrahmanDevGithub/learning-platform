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
                    <li><a href="#home">Home</a></li>
                    <li><a href="#about">About</a></li>
                    <li><a href="#services">Services</a></li>
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
`;

export default Navbar