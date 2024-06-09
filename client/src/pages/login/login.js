import React, { useState, useContext } from 'react';
import Navbar from '../common/Navbar/navbar';
import Loader from '../../Loader/Loader';
import { useNavigate } from "react-router-dom";
import './login.css';

// Router hook for navigation
import { redirect } from "react-router-dom";

// Context for managing user points
import PointsContext from '../../context/pointsContext';

// Login component definition
const Login = () => {
    // Context hook for login function
    const { login } = useContext(PointsContext);
    //router hook
    const navigate = useNavigate();
    // State hooks for email, password, and loading status
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // Handler for the login button click event
    const handleLogin = async () => {
        // Display loader
        setLoading(true);

        // Early return if email or password is not provided
        if (!email || !password) {
            console.error("Email and password are required.");
            setLoading(false);
            return;
        }

        try {
            // API call to the login endpoint
            const response = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/login`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: 'POST',
                body: JSON.stringify({ email, password })
            });

            // Parsing the JSON response
            const data = await response.json();

            // Check for successful login status
            if (data.status === "success") {
                // Store the JWT token in local storage
                localStorage.setItem("token", data.data.token);
                localStorage.setItem("user", JSON.stringify(data.data.user));
                // Call the login function from the context
                login();
                navigate("/imagegenerator");

            } else {
                console.error("Login failed. Please try again.");
            }
        } catch (error) {

            console.error("Login failed. Please try again.");
            console.error(error);
        }

        // Hide loader
        setLoading(false);
    }

    return (
        <div>
            <Navbar page='login' />

            <div className="auth-container">
                <div className="auth-form">
                    <input
                        className="auth-input"
                        type="email"
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                    /><br />
                    <input
                        className="auth-input"
                        type="password"
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                    /><br /><br />
                    <button className="auth-button" onClick={handleLogin} disabled={loading}>
                        {loading ? <Loader /> : 'Login'}
                    </button>

                </div>
            </div>
        </div>

    )
}

export default Login;
