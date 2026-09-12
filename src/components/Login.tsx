import { useState } from "react";
import { login } from "../api/authAPI";

interface LoginProps {
    onLogin: () => void;
    onRegister: () => void;
}

function Login({ onLogin, onRegister }: LoginProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        setError("");

        if (!email || !password) {
            setError("Please enter your email and password.");
            return;
        }

        try {
            setLoading(true);

            await login(email, password);

            onLogin();
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Unable to sign in."
            );
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-page">
            <div className="auth-card">

                <div className="auth-brand">
                    <h1>Seek AI</h1>
                    <p>Query your documents. Seek your answers.</p>
                </div>

                <div className="auth-heading">
                    <h2>Welcome back!</h2>
                    <p>Sign in to continue to your documents.</p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">

                    <div className="auth-field">
                        <label htmlFor="email">Email</label>

                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(event) =>
                                setEmail(event.target.value)
                            }
                            placeholder="you@example.com"
                            autoComplete="email"
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="password">Password</label>

                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            placeholder="Enter your password"
                            autoComplete="current-password"
                        />
                    </div>

                    {error && (
                        <p className="auth-error">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        className="auth-submit"
                        disabled={loading}
                    >
                        {loading ? "Signing in.." : "Sign In"}
                    </button>
                </form>

                <div className="auth-switch">
                    <span>Don't have an account?</span>

                    <button
                        type="button"
                        onClick={onRegister}
                    >
                        Create an account
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Login;