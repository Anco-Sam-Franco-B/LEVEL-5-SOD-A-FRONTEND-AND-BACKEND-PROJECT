# 🎓 Student Management System

A full-stack **Student Management System** built with **React (Vite)** frontend and **Express (Node.js)** backend with **MySQL** database.

## ✨ Features

- 🔐 **User Authentication** — Register, Login, Logout with JWT tokens
- 📋 **Student CRUD** — Create, Read, Update, Delete student records
- 🛡️ **Protected Routes** — All student operations require authentication
- 🎨 **Responsive UI** — Tailwind CSS with gradient design
- 🔄 **Auto Token Handling** — Axios interceptors manage auth tokens

## 🏗️ Tech Stack

| Layer      | Technology                 |
| ---------- | -------------------------- |
| Frontend   | React 19, Vite 8, Tailwind CSS 3 |
| Backend    | Node.js, Express 5         |
| Database   | MySQL (via mysql2)         |
| Auth       | JWT, bcryptjs, cookie-parser |
| State Mgmt | Zustand                    |

## 📁 Project Structure

```
├── backend/
│   ├── server.js          # Express server with API routes
│   ├── database.js        # MySQL database connection
│   ├── AuthMiddleware.js  # JWT verification middleware
│   ├── .env.example       # Environment variable template
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   └── axios.js       # Axios instance with auth interceptor
│   │   ├── store/
│   │   │   └── authStore.js   # Zustand auth state management
│   │   ├── components/
│   │   │   └── NavBar.jsx     # Navigation with auth-aware links
│   │   ├── pages/
│   │   │   ├── Students.jsx   # Student list (protected)
│   │   │   ├── CreateForm.jsx # Create student (protected)
│   │   │   ├── UpdateForm.jsx # Update student (protected)
│   │   │   ├── Login.jsx      # Login page
│   │   │   ├── Register.jsx   # Registration page
│   │   │   └── NotFound.jsx   # 404 page
│   │   ├── App.jsx            # Root with protected routing
│   │   ├── main.jsx           # Entry point
│   │   └── index.css          # Tailwind imports
│   ├── index.html
│   ├── tailwind.config.js
│   └── package.json
├── database/
│   └── schema.sql         # MySQL table definitions
└── README.md
```

## 🚀 Setup Instructions

### Prerequisites

- **Node.js** (v18+)
- **MySQL** server running locally
- **npm** or **pnpm** package manager

### Step 1: Database Setup

1. Start your MySQL server
2. Run the schema file to create the database and tables:

```bash
mysql -u root -p < database/schema.sql
```

This creates the `school` database, `student` table, and `users` table.

### Step 2: Backend Setup

```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Edit .env with your configuration (especially JWT_SECRET!)
```

**`.env` configuration:**
```
PORT=8000
JWT_SECRET=your_strong_random_secret_key_here
JWT_EXPIRESIN=1d
NODE_ENV=development
```

### Step 3: Database Configuration

Edit `backend/database.js` if your MySQL credentials differ from the defaults:

```js
const con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',        // ← change if you have a MySQL password
    database: 'school'
});
```

### Step 4: Run Backend

```bash
npm run dev
```

Server starts on `http://localhost:8000`. You should see:
```
Database Connected!
Server is running on port 8000
```

### Step 5: Frontend Setup

Open a **new terminal** and:

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start dev server
npm run dev
```

Frontend starts on `http://localhost:5173`.

### Step 6: Use the App

1. Open `http://localhost:5173` in your browser
2. **Register** a new account
3. **Login** with your credentials
4. **Create**, **View**, **Update**, and **Delete** student records

## 📡 API Reference

| Method | Endpoint        | Auth Required | Description            |
| ------ | --------------- | ------------- | ---------------------- |
| POST   | `/register`     | No            | Create new user        |
| POST   | `/login`        | No            | Login & get JWT token  |
| POST   | `/logout`       | No            | Clear auth cookie      |
| GET    | `/students`     | Yes           | Get all students       |
| GET    | `/student/:id`  | Yes           | Get student by ID      |
| POST   | `/create`       | Yes           | Create new student     |
| PUT    | `/update/:id`   | Yes           | Update student record  |
| DELETE | `/delete/:id`   | Yes           | Delete student record  |

## 🛠️ Build for Production

```bash
cd frontend
npm run build
```

Production build output is in `frontend/dist/`.

## 📝 License

ISC
