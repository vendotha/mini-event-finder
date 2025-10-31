# Mini Event Finder

This project is a full-stack event discovery application. It features a Node.js/Express backend API and a React/TypeScript frontend.

## 🚀 Live Demo

* **Frontend (Vercel):** [https://minieventfinderslanup.vercel.app/](https://minieventfinderslanup.vercel.app/)
* **Backend API (Render):** [https://slanup-backend-xyz.onrender.com/api/events](https://slanup-backend-xyz.onrender.com/api/events) *(Note: Replace with your actual Render URL)*

---

## 🛠️ Tech Stack

* **Frontend:** React, TypeScript, Vite, Axios, React Router, Tailwind CSS
* **Backend:** Node.js, Express, TypeScript, CORS
* **Deployment:** Vercel (Frontend), Render (Backend)

---

## ⚙️ Setup and Running Locally

To run this project on your local machine, you'll need to run both the backend and frontend servers.

### Prerequisites

* [Node.js](https://nodejs.org/) (v18 or later)
* [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### 1. Backend (API)

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/vendotha/mini-event-finder.git](https://github.com/vendotha/mini-event-finder.git)
    cd mini-event-finder
    ```

2.  **Navigate to the backend folder:**
    ```bash
    cd backend
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Run the server:**
    ```bash
    npm run dev
    ```
    The server will start on `http://localhost:5001`.

### 2. Frontend (React App)

1.  **Open a new terminal** in the root `mini-event-finder` directory.

2.  **Navigate to the frontend folder:**
    ```bash
    cd frontend
    ```

3.  **Install dependencies:**
    ```bash
    npm install
    ```

4.  **Run the app:**
    ```bash
    npm run dev
    ```
    The React app will open on `http://localhost:5173`.

---

## 📄 Environment Variables

The frontend relies on an environment variable to know where to find the backend API.

1.  In the `frontend` folder, create a file named `.env.local`.
2.  Add the following line, pointing to your local backend server:

    ```
    VITE_API_BASE_URL=http://localhost:5001
    ```

This project uses `import.meta.env.VITE_API_BASE_URL` to fetch data, which allows it to use this local variable during development and a different one (set in Vercel) for production.

---

## Endpoints (API Documentation)

The backend provides three RESTful endpoints:

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/events` | Retrieves a list of all events. |
| `GET` | `/api/events/:id` | Retrieves the details for a single event by its ID. |
| `POST` | `/api/events` | Creates a new event. Requires a JSON body. |

### Example `POST` Body:
```json
{
  "title": "My New Event",
  "description": "A test event.",
  "location": "Hyderabad",
  "date": "2025-12-01",
  "maxParticipants": 20
}
