# 🎓 Student Management System

> A full-stack web application for managing student records with JWT-based authentication. Built with **React 19 + Vite 8** on the frontend and **Express 5 + MySQL** on the backend.

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Project Structure](#-project-structure)
- [Database Schema](#-database-schema)
- [Setup Instructions](#-setup-instructions)
- [Authentication Flow](#-authentication-flow)
- [API Reference](#-api-reference)
- [Frontend Architecture](#-frontend-architecture)
- [State Management](#-state-management)
- [Security Notes](#-security-notes)
- [Troubleshooting](#-troubleshooting)
- [Production Build](#-production-build)
- [License](#-license)

---

## 🌟 Overview

This is a **Student Management System** that allows authorized users to perform CRUD operations (Create, Read, Update, Delete) on student records. The application uses JWT (JSON Web Token) authentication to secure all student data operations. Users must register an account and log in before accessing any student management features.

---

## ✨ Features

| Feature | Description |
|---------|-------------|
| 🔐 **User Authentication** | Register, Login, and Logout with JWT tokens stored in both localStorage and httpOnly cookies |
| 📋 **Student CRUD** | Full Create, Read, Update, Delete operations on student records |
| 🛡️ **Protected Routes** | All student management pages require authentication; unauthenticated users are redirected to Login |
| 🔄 **Auto Token Handling** | Axios request interceptor automatically attaches Bearer token; response interceptor handles 401 (auto-logout) |
| 🎨 **Responsive UI** | Tailwind CSS with gradient navbar, card-style forms, and mobile-friendly layout |
| ⚡ **Fast Dev Experience** | Vite 8 for instant HMR (Hot Module Replacement) on the frontend; Nodemon for auto-restart on the backend |

---

## 🏗️ Tech Stack

### Frontend

| Technology    | Version   | Purpose                        |
|---------------|-----------|--------------------------------|
| React         | 19.x      | UI component library           |
| Vite          | 8.x       | Build tool & dev server        |
| Tailwind CSS  | 3.x       | Utility-first CSS framework    |
| React Router  | 7.x       | Client-side routing            |
| Zustand       | 5.x       | Lightweight state management   |
| Axios         | 1.x       | HTTP client with interceptors  |

### Backend

| Technology    | Version   | Purpose                        |
|---------------|-----------|--------------------------------|
| Node.js       | 18+       | JavaScript runtime             |
| Express       | 5.x       | Web framework & API routing    |
| MySQL2        | 3.x       | MySQL database driver          |
| jsonwebtoken  | 9.x       | JWT creation & verification    |
| bcryptjs      | 3.x       | Password hashing               |
| cookie-parser | 1.x       | HTTP cookie parsing            |
| dotenv        | 17.x      | Environment variable loading   |
| cors          | 2.x       | Cross-Origin Resource Sharing  |
| nodemon       | 3.x       | Auto-restart on file changes   |

---

## 🏛️ Architecture

```
┌──────────────┐         ┌──────────────┐         ┌──────────┐
│   Browser    │  HTTP   │   Express    │   SQL   │  MySQL   │
│  (React 19)  │────────▶│   Server     │────────▶│  School  │
│ localhost    │◀────────│ localhost    │◀────────│  Database│
│ :5173        │  JSON   │ :8000        │  Rows   │          │
└──────────────┘         └──────────────┘         └──────────┘
       │                        │
       │  JWT Token in          │  JWT Middleware
       │  Authorization: Bearer │  verifies token
       │  header + httpOnly     │  on protected routes
       │  cookie                │
       ▼                        ▼
  ┌──────────────┐         ┌──────────────┐
  │  Zustand     │         │  bcryptjs    │
  │  Auth Store  │         │  Password    │
  │  (localStorage)│        │  Hashing     │
  └──────────────┘         └──────────────┘
```

**Auth Flow (simplified):**
1. User submits login credentials → Backend verifies against MySQL `users` table
2. If valid, backend creates a JWT signed with `JWT_SECRET`, sends it in response body + sets an httpOnly cookie
3. Frontend stores the JWT in Zustand (backed by localStorage) → All subsequent API calls include `Authorization: Bearer <token>` header via Axios interceptor
4. Protected backend routes use `verifyToken` middleware to decode & validate the JWT before processing the request
5. On 401 (expired/invalid token), the Axios response interceptor auto-clears auth state and redirects to `/login`

---

## 📁 Project Structure

```
├── backend/
│   ├── server.js              # Express server entry point — all API routes
│   ├── database.js            # MySQL connection using mysql2
│   ├── AuthMiddleware.js      # JWT verification middleware (verifyToken)
│   ├── .env                   # Environment variables (PORT, JWT_SECRET, etc.)
│   ├── .env.example           # Template for .env with comments
│   ├── package.json           # Backend dependencies & scripts
│   └── node_modules/          # Installed dependencies
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js       # Axios instance with auth interceptors
│   │   ├── store/
│   │   │   └── authStore.js   # Zustand store for auth state (token + user)
│   │   ├── components/
│   │   │   └── NavBar.jsx     # Navigation bar — auth-aware (Login/Register vs Logout)
│   │   ├── pages/
│   │   │   ├── Students.jsx   # Student list table with Update/Delete actions (protected)
│   │   │   ├── CreateForm.jsx # Form to create a new student (protected)
│   │   │   ├── UpdateForm.jsx # Form to update existing student data (protected)
│   │   │   ├── Login.jsx      # Login form — email + password
│   │   │   ├── Register.jsx   # Registration form — username + email + password
│   │   │   └── NotFound.jsx   # 404 page for unknown routes
│   │   ├── App.jsx            # Root component — Router + ProtectedRoute wrapper
│   │   ├── main.jsx           # React entry point
│   │   └── index.css          # Tailwind directives (@tailwind base/components/utilities)
│   ├── public/
│   │   └── favicon.svg        # Browser tab icon
│   ├── index.html             # HTML template with root div
│   ├── vite.config.js         # Vite configuration (React plugin)
│   ├── tailwind.config.js     # Tailwind content paths & theme
│   ├── postcss.config.js      # PostCSS with Tailwind & autoprefixer
│   ├── eslint.config.js       # ESLint flat config
│   └── package.json           # Frontend dependencies & scripts
│
├── database/
│   └── schema.sql             # MySQL schema — school database, student + users tables
│
├── .gitignore                 # Git ignore rules
└── README.md                  # This file
```

---

## 🗄️ Database Schema

Located in `database/schema.sql`. Run with:

```bash
mysql -u root -p < database/schema.sql
```

### Table: `student`

Stores all student records.

| Column   | Type           | Constraints              |
|----------|----------------|--------------------------|
| id       | INT            | AUTO_INCREMENT, PK       |
| fname    | VARCHAR(100)   | NOT NULL                 |
| lname    | VARCHAR(100)   | NOT NULL                 |
| email    | VARCHAR(150)   | NOT NULL                 |
| address  | VARCHAR(255)   | NOT NULL                 |

### Table: `users`

Stores registered user accounts for authentication.

| Column   | Type           | Constraints              |
|----------|----------------|--------------------------|
| id       | INT            | AUTO_INCREMENT, PK       |
| username | VARCHAR(100)   | NOT NULL                 |
| email    | VARCHAR(150)   | NOT NULL, UNIQUE         |
| password | VARCHAR(255)   | NOT NULL (bcrypt hash)   |

> ⚠️ **Note:** The password column stores a bcrypt hash (not plain text). The hashing is done server-side in `POST /register` using `bcryptjs` with a salt round of 2.

---

## 🚀 Setup Instructions

### Prerequisites

- **Node.js** v18+ ([Download](https://nodejs.org/))
- **MySQL** server running locally ([Download](https://dev.mysql.com/downloads/))
- **npm** (comes with Node.js) or **pnpm**

### Step 1: Database Setup

```bash
# Start your MySQL server first, then:
mysql -u root -p < database/schema.sql
```

Enter your MySQL root password when prompted. This creates the `school` database, `student` table, and `users` table with the correct schema.

### Step 2: Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Then edit `backend/.env` with your configuration:

```env
PORT=8000
JWT_SECRET=your_strong_random_secret_key_here
JWT_EXPIRESIN=1d
NODE_ENV=development
```

> 🔑 **JWT_SECRET** is critical for security — generate a strong random string. You can use `openssl rand -hex 32` to create one.

### Step 3: Database Connection

If your MySQL setup uses credentials different from the defaults, edit `backend/database.js`:

```javascript
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',           // Change if you set a MySQL password
    database: 'school'
});
```

### Step 4: Run Backend Server

```bash
cd backend
npm run dev
```

Expected output:
```
Database Connected!
Server is running on port 8000
```

The backend is now live at `http://localhost:8000`.

### Step 5: Frontend Setup

Open a **new terminal** (keep the backend running):

```bash
cd frontend
npm install
npm run dev
```

The frontend dev server starts at `http://localhost:5173` with hot module replacement.

### Step 6: Use the Application

1. Open `http://localhost:5173` in your browser
2. You'll be redirected to the **Login** page (all student pages are protected)
3. Click **Register** to create a new account
4. Log in with your credentials
5. You can now **Create**, **View**, **Update**, and **Delete** student records
6. Click **Logout** in the navbar to end your session

---

## 🔐 Authentication Flow

### Registration (`POST /register`)

```
User → [Register Form] → Frontend (axios) → Backend → bcrypt.hash(password) → INSERT INTO users → Response
```

- Password is hashed with bcryptjs (salt rounds: 2) before storage
- On success, the user is redirected to the Login page

### Login (`POST /login`)

```
User → [Login Form] → Frontend (axios) → Backend → SELECT user → bcrypt.compare(password) → JWT.sign() → Response
```

1. Backend looks up user by email in the `users` table
2. Compares the provided password with the stored bcrypt hash
3. If valid, creates a JWT containing `{ id, email }` signed with `JWT_SECRET`
4. Sets an **httpOnly cookie** (`token`) for server-side session management
5. Returns the **JWT token** in the response body for client-side storage
6. Frontend stores the token in Zustand + localStorage

### Authenticated Requests

Every subsequent API call (to protected routes) goes through the **Axios request interceptor**, which automatically adds:

```
Authorization: Bearer <jwt_token>
```

The backend `AuthMiddleware.js` extracts and verifies this token. If valid, `req.user` is populated with `{ id, email }` and the request proceeds to the route handler.

### Token Expiry & Auto-Logout

- Token expiration is controlled by `JWT_EXPIRESIN` (default: `1d` = 1 day)
- When the backend returns a **401** status, the Axios **response interceptor**:
  1. Calls `logout()` on the Zustand store (clears localStorage)
  2. Redirects the user to `/login`

### Logout (`POST /logout`)

- Backend clears the httpOnly cookie (`res.clearCookie("token")`)
- Frontend calls `logout()` to clear Zustand state + localStorage
- User is redirected to `/login`

---

## 📡 API Reference

### Base URL

```
http://localhost:8000
```

### Authentication Endpoints

---

#### `POST /register` — Create a new user account

<details>
<summary>Request / Response</summary>

**Request body:**
```json
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success response (201):**
```json
{
  "message": "User account created!"
}
```

**Error response (400) — missing fields:**
```json
{
  "message": "All inputs are required!"
}
```

**Error response (500) — database error (e.g., duplicate email):**
```json
{
  "message": "Internal Server Error",
  "errorMessage": "Duplicate entry 'john@example.com' for key 'users.email'"
}
```
</details>

---

#### `POST /login` — Authenticate and receive JWT

<details>
<summary>Request / Response</summary>

**Request body:**
```json
{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Success response (200):**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "message": "Login successful"
}
```
Also sets an httpOnly cookie named `token`.

**Error response (404) — invalid credentials:**
```json
{
  "message": "Invalid user email addres"
}
```
or
```json
{
  "message": "Invalid user password!"
}
```
</details>

---

#### `POST /logout` — End session

<details>
<summary>Request / Response</summary>

**No request body required.**

**Success response (200):**
```json
{
  "success": true,
  "message": "Logged out successfully"
}
```
Clears the httpOnly `token` cookie.
</details>

---

### Student CRUD Endpoints

> All student endpoints require the `Authorization: Bearer <token>` header.

---

#### `GET /students` — Get all students

<details>
<summary>Request / Response</summary>

**Headers:** `Authorization: Bearer <token>`

**Success response (200):**
```json
{
  "message": "Students data fetched",
  "result": [
    {
      "id": 1,
      "fname": "John",
      "lname": "Doe",
      "email": "john.doe@example.com",
      "address": "123 Main St"
    },
    {
      "id": 2,
      "fname": "Jane",
      "lname": "Smith",
      "email": "jane.smith@example.com",
      "address": "456 Oak Ave"
    }
  ]
}
```
</details>

---

#### `GET /student/:id` — Get a single student by ID

<details>
<summary>Request / Response</summary>

**Headers:** `Authorization: Bearer <token>`
**URL params:** `id` (integer)

**Success response (200):**
```json
{
  "message": "Student data Fetched",
  "result": {
    "id": 1,
    "fname": "John",
    "lname": "Doe",
    "email": "john.doe@example.com",
    "address": "123 Main St"
  }
}
```
</details>

---

#### `POST /create` — Create a new student

<details>
<summary>Request / Response</summary>

**Headers:** `Authorization: Bearer <token>`

**Request body:**
```json
{
  "fname": "John",
  "lname": "Doe",
  "email": "john.doe@example.com",
  "address": "123 Main St, City"
}
```

**Success response (201):**
```json
{
  "message": "Student created successfully"
}
```

**Error response (400) — missing fields:**
```json
{
  "message": "All inputs are required"
}
```
</details>

---

#### `PUT /update/:id` — Update an existing student

<details>
<summary>Request / Response</summary>

**Headers:** `Authorization: Bearer <token>`
**URL params:** `id` (integer)

**Request body:**
```json
{
  "fname": "Johnathan",
  "lname": "Doe",
  "email": "john.doe@example.com",
  "address": "789 New Street"
}
```

**Success response (200):**
```json
{
  "message": "Student updated successfully!"
}
```
</details>

---

#### `DELETE /delete/:id` — Delete a student

<details>
<summary>Request / Response</summary>

**Headers:** `Authorization: Bearer <token>`
**URL params:** `id` (integer)

**Success response (200):**
```json
{
  "message": "Student record deleted successfully!"
}
```
</details>

---

### API Summary Table

| Method | Endpoint          | Auth Required | Description              |
|--------|-------------------|---------------|--------------------------|
| POST   | `/register`       | ❌ No         | Create a new user account |
| POST   | `/login`          | ❌ No         | Login and get JWT token   |
| POST   | `/logout`         | ❌ No         | Clear auth cookie          |
| GET    | `/students`       | ✅ Yes        | Get all student records    |
| GET    | `/student/:id`    | ✅ Yes        | Get a single student       |
| POST   | `/create`         | ✅ Yes        | Create a new student       |
| PUT    | `/update/:id`     | ✅ Yes        | Update a student record    |
| DELETE | `/delete/:id`     | ✅ Yes        | Delete a student record    |

---

## ⚛️ Frontend Architecture

### Component Tree

```
<App>
  └── <BrowserRouter>
        ├── <NavBar />
        │     ├── Logo: "Student MS" (links to /)
        │     ├── [Authenticated]: Students, New Student, Logout button
        │     └── [Not Authenticated]: Login, Register links
        │
        └── <Routes>
              ├── /login     → <Login />              (public)
              ├── /register  → <Register />            (public)
              ├── /          → <ProtectedRoute> → <Students />
              ├── /create    → <ProtectedRoute> → <CreateForm />
              ├── /update/:id→ <ProtectedRoute> → <UpdateForm />
              └── *          → <NotFound />            (catch-all 404)
```

### ProtectedRoute Wrapper

Defined in `App.jsx`:

```jsx
function ProtectedRoute({ children }) {
  const token = useAuthStore((state) => state.token)
  if (!token) {
    return <Navigate to="/login" replace />
  }
  return children
}
```

If the user has no token in the Zustand store, they are immediately redirected to `/login` with a replace navigation (no back-button to the protected page).

### Routing Details

| Path           | Component      | Access    | Description              |
|----------------|----------------|-----------|--------------------------|
| `/login`       | Login          | Public    | User login form          |
| `/register`    | Register       | Public    | User registration form   |
| `/`            | Students       | Protected | Student list table       |
| `/create`      | CreateForm     | Protected | New student form         |
| `/update/:id`  | UpdateForm     | Protected | Edit existing student    |
| `*`            | NotFound       | Public    | 404 page                 |

---

## 🧠 State Management

### Zustand Auth Store (`frontend/src/store/authStore.js`)

```javascript
const useAuthStore = create((set) => ({
  token: localStorage.getItem('token'),
  user: JSON.parse(localStorage.getItem('user') || 'null'),

  login: (token, user) => {
    localStorage.setItem('token', token)
    localStorage.setItem('user', JSON.stringify(user))
    set({ token, user })
  },

  logout: () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    set({ token: null, user: null })
  },
}))
```

**How it works:**

1. **Initialization:** On page load, the store reads `token` and `user` from `localStorage`. This persists authentication across browser refreshes.
2. **Login:** `login(token, user)` writes to both `localStorage` and the in-memory Zustand state simultaneously.
3. **Logout:** `logout()` removes from `localStorage` and resets state to `null`.
4. **Consumption:** Components access the store via `useAuthStore((state) => state.token)` — the component only re-renders when the selected slice changes.

### Axios Instance (`frontend/src/api/axios.js`)

```javascript
const api = axios.create({
  baseURL: 'http://localhost:8000',
})

// Request interceptor — attaches Bearer token
api.interceptors.request.use((config) => {
  const token = useAuthStore.getState().token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// Response interceptor — handles 401 auto-logout
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      useAuthStore.getState().logout()
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)
```

**Note:** The Login and Register pages use `axios` directly (not the `api` instance) because no token exists at the time of authentication. All other pages import `api` from this module to get automatic token injection.

---

## ⚠️ Security Notes

### SQL Injection Risk

The current backend builds SQL queries using **string interpolation** with user input (e.g., `` `SELECT * FROM student WHERE id='${id}'` ``). This is a **SQL injection vulnerability**. For a production application, you should **refactor to use parameterized queries** with `mysql2`'s prepared statement syntax:

```javascript
// Safer approach with parameterized queries:
con.query('SELECT * FROM student WHERE id = ?', [id], (err, data) => {
  // ...
})
```

### Password Hashing

- Passwords are hashed with `bcryptjs` using 2 salt rounds. For production, consider increasing this to 10–12 rounds.
- The original plain-text password is never stored or logged.

### JWT Security

- **JWT_SECRET** should be a long, random string stored only in the `.env` file (never committed to Git)
- Token expiration (`JWT_EXPIRESIN`) limits the window of vulnerability if a token is leaked
- The httpOnly cookie flag (`httpOnly: true`) prevents client-side JavaScript from reading the cookie, mitigating XSS attacks
- The `secure` flag is only enabled in production (`NODE_ENV === "production"`) to require HTTPS
- The `sameSite: "strict"` flag prevents CSRF attacks by not sending the cookie on cross-origin requests

### Environment Variables

`backend/.env` is **gitignored** to prevent accidental exposure of secrets. Always use the `.env.example` template as a starting point.

---

## 🔧 Troubleshooting

### "Database Not Connected!"

- Ensure MySQL server is running (`mysql -u root -p` should work)
- Check credentials in `backend/database.js` match your MySQL setup
- Run `database/schema.sql` to create the database and tables

### "No token provided" / 401 errors

- You need to **Register** and **Login** before accessing student pages
- Check that your browser allows localStorage (required for token persistence)
- Try clearing localStorage (`localStorage.clear()` in browser console) and logging in again
- Verify `Authorization: Bearer <token>` header is being sent in the Network tab

### CORS errors in browser

- Ensure the backend is running on port 8000
- The backend has `cors()` middleware enabled for all origins (development only)
- For production, configure CORS to only allow your frontend origin

### Blank page / white screen

- Open browser Developer Tools (F12) → Console tab to check for JavaScript errors
- Verify all `npm install` commands completed without errors
- Run `npm run build` in the frontend directory to check for compilation errors

### Port already in use

- Change the port in `backend/.env` (e.g., `PORT=8001`)
- Update the frontend's `baseURL` in `frontend/src/api/axios.js` and the direct `axios.post` calls in `Login.jsx` and `Register.jsx` to match

---

## 🛠️ Production Build

### Frontend

```bash
cd frontend
npm run build
```

Output is generated in `frontend/dist/` — a set of static HTML, CSS, and JS files ready to be served by any web server (Nginx, Apache, or even the Express backend).

### Preview Production Build Locally

```bash
cd frontend
npm run preview
```

This starts a local server serving the production build at `http://localhost:4173`.

### Deployment Checklist

- [ ] Set `JWT_SECRET` to a strong random value
- [ ] Set `NODE_ENV=production` in `.env`
- [ ] Increase bcrypt salt rounds to 10–12 in `server.js` (`bcrypt.hash(password, 10)`)
- [ ] Refactor SQL queries to use parameterized statements
- [ ] Configure CORS to only allow your frontend domain
- [ ] Use HTTPS in production (set up SSL/TLS certificate)
- [ ] Run database migration scripts against the production MySQL instance

---

## 📝 License

This project is licensed under the **ISC License**. See the [LICENSE](LICENSE) file for details.

---

<div align="center">
  <sub>Built with ❤️ using React, Express, and MySQL</sub>
</div>
