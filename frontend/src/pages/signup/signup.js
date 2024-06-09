import React, { useState } from 'react';
import Navbar from '../common/Navbar/navbar';
import { useNavigate } from "react-router-dom";
import Loader from '../../Loader/Loader';
import './signup.css';

const Signup = () => {
    const navigate = useNavigate();
    // State hooks for email, password, and loading status
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    // Handler for the signup button click event
    const handleSignup = async () => {
        // Display loader
        setLoading(true);

        // Early return if email or password is not provided
        if (!email || !password) {
            toast.error("Email and password are required.");
            setLoading(false);
            return;
        }

        try {
            // API call to the signup endpoint
            const response = await fetch(`${process.env.BACKEND_URL}/api/v1/auth/signup`, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: 'POST',
                body: JSON.stringify({ email, password })
            });

            // Parsing the JSON response
            const data = await response.json();

            // Display success toast notification if the signup is successful
            if (data.status === "success") {
                console.log("Signup successful. Please login.");
                navigate("/login");
            }
            // Logging the response data for debugging purposes
            console.log(data);
        } catch (error) {
            // Display error toast notification

            console.error(error);
        }

        // Hide loader
        setLoading(false);
    }

    return (
        <div >
            <Navbar page='signup' />
            <div className="signup-container">
                <div className="signup-form">
                    <input
                        className="signup-input"
                        type="email"
                        placeholder="Enter your email"
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <br />
                    <input
                        className="signup-input"
                        type="password"
                        placeholder="Enter your password"
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <br /><br />
                    <button className="signup-button" onClick={handleSignup} disabled={loading}>
                        {loading ? <Loader /> : 'Sign Up'}
                    </button>
                </div>
            </div>
        </div>
    )
}

// Exporting the Signup component
export default Signup;
