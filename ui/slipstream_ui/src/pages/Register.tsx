import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

const Register = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccess("");
        setLoading(true);

        try {
            const response = await api.post("/user/create", { username, email, password });

            setLoading(false);
            setSuccess("Account created successfully!");
            setTimeout(() => navigate("/"), 1500);
        } catch (err: any) {
            setLoading(false);
            if (err.response && err.response.data?.message) {
                setError(err.response.data.message);
            } else {
                setError("Server connection error.");
            }
        }
    };

    return (
        <div style={styles.container}>
            <h1 style={styles.title}>Register</h1>
            <form onSubmit={handleRegister} style={styles.form}>
                <input
                    style={styles.input}
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <input
                    style={styles.input}
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    style={styles.input}
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" style={styles.button} disabled={loading}>
                    {loading ? "Loading..." : "Register"}
                </button>
                {error && <p style={styles.error}>{error}</p>}
                {success && <p style={styles.success}>{success}</p>}
            </form>
        </div>
    );
};

const styles: any = {
    container: {
        backgroundColor: "#1e1e2f",
        color: "#fff",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        fontFamily: "Arial, sans-serif",
    },
    title: {
        fontSize: "2rem",
        marginBottom: "1rem",
    },
    form: {
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        width: "300px",
    },
    input: {
        padding: "0.8rem",
        borderRadius: "5px",
        border: "none",
        fontSize: "1rem",
    },
    button: {
        padding: "0.8rem",
        borderRadius: "5px",
        border: "none",
        backgroundColor: "#FF6064",
        color: "#fff",
        cursor: "pointer",
        fontSize: "1rem",
    },
    error: {
        color: "red",
    },
    success: {
        color: "green",
    },
};

export default Register;
