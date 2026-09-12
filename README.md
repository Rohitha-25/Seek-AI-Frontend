## 📄 Seek AI — Document Query Application — Frontend

#### React + TypeScript frontend for seek, a RAG (Retrieval-Augmented Generation) application that lets users upload documents and ask natural-language questions about its content.

### Overview
Seek AI is a client-based application that allows users to:

1. Create an account or sign in using JWT-based authentication.
2. Upload a document (PDF, DOCX, PPTX, TXT).
3. Select a document to query from the sidebar.
4. Ask natural-language questions about its content through a chat interface.
5. Receive AI-generated answers grounded in the document's actual content through the backend's     RAG pipeline.
6. Delete documents associated with their account.
7. Sign out securely.

### Tech Stack
<table>
  <tr>
    <th>Purpose</th>
    <th>Technology</th>
  </tr>
  <tr>
    <td>Framework</td>
    <td>React</td>
  </tr>
  <tr>
    <td>Language</td>
    <td>TypeScript</td>
  </tr>
  <tr>
    <td>Build Tool</td>
    <td>Vite</td>
  </tr>
  <tr>
    <td>Authentication</td>
    <td>JWT</td>
  </tr>
  <tr>
    <td>Icons</td>
    <td>Lucide React</td>
  </tr>
  <tr>
    <td>Styling</td>
    <td>Plain CSS</td>
  </tr>
</table>

### Project Structure
```
seek-frontend
├── src
│   ├── App.tsx
│   ├── api
│   │   ├── authAPI.ts
│   │   └── documentAPI.ts
│   ├── components
│   │   ├── Chat.tsx
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── Upload.tsx
│   └── types.ts
```

<table>
  <tr>
    <th>File</th>
    <th>Responsibility</th>
  </tr>
  <tr> 
    <td>authAPI.ts</td> 
    <td>Handles user registration, login, logout, and JWT token management.</td> 
  </tr>
  <tr>
    <td>documentAPI.ts</td>
    <td>Centralizes all HTTP calls (uploadDocument, getDocuments, queryDocument, deleteDocument).</td>
  </tr>
  <tr> 
    <td>Login.tsx</td> 
    <td>Provides the user login interface and handles authentication.</td> 
  </tr> 
  <tr> 
    <td>Register.tsx</td> 
    <td>Provides the user registration interface and validates account creation input.</td> 
  </tr>
  <tr>
    <td>Upload.tsx</td>
    <td>Renders the upload button and document list; handles file selection and deletion.</td>
  </tr>
  <tr>
    <td>Chat.tsx</td>
    <td>Renders the chat interface; sends questions to the selected document and displays answers.</td>
  </tr>
  <tr>
    <td>App.tsx</td>
    <td>Manages authentication state, document state, sidebar state, and composes the application interface.</td>
  </tr>
</table>

### Features
- JWT-based user registration and login.
- Protected document operations using authenticated API requests.
- Upload PDF, DOCX, PPTX, or TXT files.
- View documents associated with the authenticated user.
- Select a document to start a chat session.
- Ask questions and receive AI-generated, context-grounded answers.
- Delete documents.
- Logout and clear the active authentication token.

### Authentication Flow
```
Register / Login
       ↓
    JWT Token
       ↓
 Stored in Client
       ↓
Authenticated API Requests
       ↓
Document Operations
```

Protected document requests include the JWT as a bearer token:
```
Authorization: Bearer <token>
```

### Local Setup
```
Node.js + npm
```

#### Run the application:
```
npm install
npm run dev
```

### Terminology
<table>
  <tr>
    <th>Term</th>
    <th>Meaning</th>
  </tr>
  <tr> 
    <td>JWT</td> 
    <td>JSON Web Token — used to authenticate users and authorize protected document requests.</td> 
  </tr>
  <tr>
    <td>RAG</td>
    <td>Retrieval-Augmented Generation — the pattern the backend uses to answer questions.</td>
  </tr>
  <tr>
    <td>Embedding</td>
    <td>A numeric vector representation of text's meaning (handled entirely server-side).</td>
  </tr>
</table>

#### Related Repository
https://github.com/Rohitha-25/Seek-AI-Backend
