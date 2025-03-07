A simple Markdown editor with real-time preview and formatting, built using **React (Vite) + TypeScript** for the frontend and **Node.js + Express** for the backend.

## Table of Contents

- [Project Overview](#project-overview)
- [Folder Structure](#folder-structure)
- [Installation & Running the Application](#installation--running-the-application)
- [Technologies Used](#technologies-used)
- [Contributing](#contributing)
- [License](#license)

## Project Overview
This project is a full-stack Markdown Editor that allows users to write and preview Markdown content in real-time. The main features include:

1. **Real-Time Markdown Preview**: Write Markdown and instantly see the formatted output.
2. **Modular Architecture**: Clean separation of frontend and backend for scalability.
3. **Fast and Optimized**: Uses **Vite** for a blazing-fast development experience.
4. **Linting and Formatting**: Configured with ESLint for code quality.
5. **Real-Time Communication**: Utilizes **socket.io** and **socket.io-client** for real-time updates and communication between the frontend and backend.

## Folder Structure

```plaintext
markdown-editor/
├── backend
│   ├── node_modules/                  # Dependencies
│   ├── src/
│   │   ├── services/
│   │   │   ├── markdown-service.ts     # Markdown processing service
│   │   ├── index.ts                    # Entry point for backend server
│   ├── package.json
│   ├── pnpm-lock.yaml
│   ├── tsconfig.json
│   ├── .gitignore
├── frontend
│   ├── node_modules/                   # Dependencies
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── MarkdownEditor.tsx      # Markdown Editor Component
│   │   ├── pages/
│   │   │   ├── Home.tsx                # Home Page
│   │   ├── styles/
│   │   │   ├── global.css              # Global Styles
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── vite-env.d.ts
│   ├── package.json
│   ├── .gitignore
│   ├── eslint.config.js
└── README.md
```

## Installation & Running the Application

### Prerequisites
- Node.js (>=14.x)
- pnpm (or npm/yarn)

### Cloning the Repository
1. Clone the repository:
    ```sh
    git clone https://github.com/gulshanb098/markdown-editor.git
    ```
2. Navigate to the project directory:
    ```sh
    cd markdown-editor
    ```

### Backend
1. Navigate to the `backend` directory:
    ```sh
    cd backend
    ```
2. Install dependencies:
    ```sh
    pnpm install
    ```
3. Start the backend server:
    ```sh
    pnpm dev
    ```

### Frontend
1. Navigate to the `frontend` directory:
    ```sh
    cd frontend
    ```
2. Install dependencies:
    ```sh
    pnpm install
    ```
3. Start the frontend development server:
    ```sh
    pnpm dev
    ```

## Technologies Used
- **Frontend**: React, Vite, TypeScript
- **Backend**: Node.js, Express
- **Styling**: CSS
- **Linting**: ESLint

## License
This project is licensed under the MIT License.

## Using Marked for Markdown
