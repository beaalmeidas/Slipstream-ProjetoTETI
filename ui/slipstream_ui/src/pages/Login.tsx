import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/api";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await api.post("/auth/login", { email, password });

            // Save token in localStorage
            localStorage.setItem("token", response.data.token);

            // Save user info
            localStorage.setItem("user", JSON.stringify(response.data.user));

            setLoading(false);
            alert("Login successful!");
            // Redirect to home page or dashboard
            navigate("/dashboard");
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
            <h1 style={styles.title}>Login</h1>
            <form onSubmit={handleLogin} style={styles.form}>
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
                    {loading ? "Loading..." : "Login"}
                </button>
                {error && <p style={styles.error}>{error}</p>}
            </form>
            <p style={styles.text}>
                Don't have an account?{" "}
                <button
                    style={styles.linkButton}
                    onClick={() => navigate("/register")}
                >
                    Register
                </button>
            </p>
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
    text: {
        marginTop: "1rem",
    },
    linkButton: {
        background: "none",
        border: "none",
        color: "#FF6064",
        cursor: "pointer",
        textDecoration: "underline",
        padding: 0,
        fontSize: "1rem",
    },
};

export default Login;
