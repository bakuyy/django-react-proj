import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../constants";
import "../styles/Form.css";

function Form({ route, method }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null); 
    const navigate = useNavigate();

    // Determine the form's name based on the method
    const name = method === "login" ? "Login" : "Register";

    // Handle form submission
    const handleSubmit = async (e) => {
        setLoading(true);
        setError(null); 
        e.preventDefault();

        try {
            // Make an API request with the provided route and credentials
            const res = await api.post(route, { username, password });

            if (method === "login") {
                // Store tokens and navigate to the home page on successful login
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
                navigate("/");
            } else {
                // Navigate to the login page on successful registration
                navigate("/login");
            }
        } catch (error) {
            console.error("API Error:", error);
            // Set an error message to be displayed in the form
            setError("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="form-container">
            <h1>{name}</h1>
            {/* Render error message if there is an error */}
            {error && <p className="error-message">{error}</p>}
            <input
                className="form-input"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                required
            />
            <input
                className="form-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
            />
            <button className="form-button" type="submit" disabled={loading}>
                {loading ? "Loading..." : name}
            </button>
        </form>
    );
}

export default Form;
