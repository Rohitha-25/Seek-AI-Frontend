const BASE_URL = "http://localhost:8080/api/documents";

function getAuthHeaders() {
    const token = localStorage.getItem("seek_token");

    if (!token) {
        throw new Error("User not authenticated!");
    }

    return {
        Authorization: `Bearer ${token}`,
    };
}

export async function uploadDocument(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${BASE_URL}/upload`, {
        method: "POST",
        headers: getAuthHeaders(),
        body: formData,
    });

    if (!response.ok) {
        throw new Error("Failed to upload document");
    }

    return response.json();
}

export async function getDocuments() {
    const response = await fetch(BASE_URL, {
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error("Failed to fetch documents");
    }

    return response.json();
}

export async function queryDocument(documentId: number, query: string) {
    const response = await fetch(`${BASE_URL}/${documentId}/query`, {
        method: "POST",
        headers: {
            ...getAuthHeaders(),
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ query }),
    });

    if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.error ?? "Failed to get an answer");
    }

    return response.json();
}

export async function deleteDocument(documentId: number) {
    const response = await fetch(`${BASE_URL}/${documentId}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
    });

    if (!response.ok) {
        throw new Error("Failed to delete document");
    }
}