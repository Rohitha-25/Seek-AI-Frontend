import { useState } from "react";
import { register } from "../api/authAPI";

interface RegisterProps {
    onRegister: () => void;
    onLogin: () => void;
}

function Register({ onRegister, onLogin }: RegisterProps) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        setError("");

        if (!email || !password || !confirmPassword) {
            setError("Please fill in all fields.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Passwords do not match.");
            return;
        }

        if (password.length < 6) {
            setError("Password must be at least 6 characters.");
            return;
        }

        try {
            setLoading(true);

            await register(email, password);

            onRegister();
        } catch (err) {
            setError(
                err instanceof Error
                    ? err.message
                    : "Unable to create your account."
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
                    <h2>Create your account</h2>
                    <p>
                        Sign up to securely store and query your documents.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="auth-form">

                    <div className="auth-field">
                        <label htmlFor="register-email">
                            Email
                        </label>

                        <input
                            id="register-email"
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
                        <label htmlFor="register-password">
                            Password
                        </label>

                        <input
                            id="register-password"
                            type="password"
                            value={password}
                            onChange={(event) =>
                                setPassword(event.target.value)
                            }
                            placeholder="Password must be at least 6 characters"
                            autoComplete="new-password"
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="register-confirm-password">
                            Confirm Password
                        </label>

                        <input
                            id="register-confirm-password"
                            type="password"
                            value={confirmPassword}
                            onChange={(event) =>
                                setConfirmPassword(event.target.value)
                            }
                            placeholder="Re-enter your password"
                            autoComplete="new-password"
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
                        {loading
                            ? "Creating account.."
                            : "Create Account"}
                    </button>
                </form>

                <div className="auth-switch">
                    <span>Already have an account?</span>

                    <button
                        type="button"
                        onClick={onLogin}
                    >
                        Sign in
                    </button>
                </div>

            </div>
        </div>
    );
}

export default Register;