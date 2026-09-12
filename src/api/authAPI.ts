const BASE_URL = "http://localhost:8080/api/auth";

export interface AuthResponse {
    token: string;
    email: string;
}

export async function register(email: string, password: string) {
    const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(
            errorBody?.message ?? errorBody?.error ?? "Registration failed"
        );
    }

    const data: AuthResponse = await response.json();

    localStorage.setItem("seek_token", data.token);
    localStorage.setItem("seek_email", data.email);

    return data;
}

export async function login(email: string, password: string) {
    const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            email,
            password,
        }),
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(
            errorBody?.message ?? errorBody?.error ?? "Invalid email or password"
        );
    }

    const data: AuthResponse = await response.json();

    localStorage.setItem("seek_token", data.token);
    localStorage.setItem("seek_email", data.email);

    return data;
}

export function logout() {
    localStorage.removeItem("seek_token");
    localStorage.removeItem("seek_email");
}

export function getToken() {
    return localStorage.getItem("seek_token");
}

export function isAuthenticated() {
    return !!localStorage.getItem("seek_token");
}