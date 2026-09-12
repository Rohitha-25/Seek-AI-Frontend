import { useEffect, useState } from "react";
import type { Document } from "./types";
import { getDocuments } from "./api/documentAPI";
import Upload from "./components/Upload";
import Chat from "./components/Chat";

import "./App.css";
import {
  FileSearchCorner,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";

import { getToken, logout } from "./api/authAPI";
import Register from "./components/Register";
import Login from "./components/Login";

function App() {
  const [authenticated, setAuthenticated] = useState(!!getToken());
  const [showRegister, setShowRegister] = useState(false);

  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  useEffect(() => {
    if (!authenticated) {
      return;
    }

    getDocuments()
      .then(setDocuments)
      .catch(() => setDocuments([]));
  }, [authenticated]);

  function handleUpload(doc: Document) {
    setDocuments((prev) => [...prev, doc]);
    setSelectedId(doc.id);
  }

  function handleDelete(id: number) {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));

    if (selectedId === id) {
      setSelectedId(null);
    }
  }

  function handleLogout() {
    logout();
    setAuthenticated(false);
  }

  if (!authenticated) {
    if (showRegister) {
      return (
        <Register
          onRegister={() => setAuthenticated(true)}
          onLogin={() => setShowRegister(false)}
        />
      );
    }

    return (
      <Login
        onLogin={() => setAuthenticated(true)}
        onRegister={() => setShowRegister(true)}
      />
    );
  }

  const selectedDocument =
    documents.find((d) => d.id === selectedId) ?? null;

  return (
    <div className={`app-interface ${sidebarOpen ? "sidebar-open" : "sidebar-closed"}`}>

      <div className="documents-sidebar-wrapper">
        {sidebarOpen && (
          <div className="sidebar-top">
            <span className="sidebar-title">DOCUMENTS</span>

            <button
              className="sidebar-toggle"
              onClick={() => setSidebarOpen(false)}
              aria-label="Close documents sidebar"
              title="Close sidebar"
            >
              <PanelLeftClose size={18} />
            </button>
          </div>
        )}

        <Upload
          documents={documents}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onUpload={handleUpload}
          onDelete={handleDelete}
        />
      </div>

      {!sidebarOpen && (
        <button
          className="sidebar-open-button"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open documents sidebar"
          title="Open sidebar"
        >
          <PanelLeftOpen size={18} />
        </button>
      )}

      <main className="app-main">
        <header className="app-header">
          <div className="header-left" />
          <div className="app-title">
            <h1>
              <FileSearchCorner
                size={21}
                strokeWidth={2.2}
                className="title-icon"
              />
              Seek AI
            </h1>

            <p>Query your documents. Seek your answers.</p>
          </div>

          <div className="header-right">
            <button
              onClick={handleLogout}
              className="logout-button"
            >
              Logout
            </button>
          </div>
        </header>

        <Chat selectedDocument={selectedDocument} />
      </main>

    </div>
  );
}

export default App;