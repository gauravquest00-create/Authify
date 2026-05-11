# 🔐 Authify - Complete Authentication System

<div align="center">

![Authify Logo](https://via.placeholder.com/120x120?text=🚀)

**Production-ready authentication system with Email, Google & GitHub OAuth**

[![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
[![Node](https://img.shields.io/badge/Node-18.x-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green.svg)](https://mongodb.com/)
[![License](https://img.shields.io/badge/License-ISC-blue.svg)](LICENSE)

</div>

---

## ✨ Features

- ✅ Email/Password Authentication (Login & Register)
- ✅ Google OAuth Login (One-click sign in)
- ✅ GitHub OAuth Login (One-click sign in)
- ✅ Forgot Password with email reset link
- ✅ Reset Password functionality
- ✅ Remember Me option
- ✅ Dark/Light Theme toggle with persistence
- ✅ Responsive Design (Mobile first)
- ✅ Protected Routes (JWT based)
- ✅ Modern Dashboard with stats
- ✅ Split Screen UI (Desktop) & Card UI (Mobile)
- ✅ Professional Animations (Framer Motion)
- ✅ MongoDB Atlas Integration
- ✅ JWT Token Authentication
- ✅ Environment Variables Support

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Purpose |
|------------|---------|---------|
| React | 18.2.0 | UI Framework |
| React Router DOM | v7 | Routing |
| Axios | ^1.16.0 | API calls |
| Framer Motion | ^12.38.0 | Animations |
| @react-oauth/google | ^0.13.5 | Google OAuth |
| JWT Decode | ^4.0.0 | Token decoding |
| React Scripts | 5.0.1 | Build tool |

### Backend
| Technology | Version | Purpose |
|------------|---------|---------|
| Node.js | 18.x | Runtime |
| Express | ^5.2.1 | Web framework |
| MongoDB | Atlas | Database |
| Mongoose | ^9.6.2 | ODM |
| JWT | ^9.0.3 | Authentication |
| Bcryptjs | ^3.0.3 | Password hashing |
| CORS | ^2.8.6 | Cross-origin requests |
| Axios | ^1.16.0 | HTTP requests |

---

## 🚀 Quick Start

### Prerequisites

- Node.js (v18.x or higher)
- npm or yarn
- MongoDB Atlas account (free tier) - [Sign up here](https://www.mongodb.com/cloud/atlas)
- Google Cloud Console account - [Sign up here](https://console.cloud.google.com)
- GitHub account - [Sign up here](https://github.com)

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/gauravquest00-create/Authify.git
cd Authify

2. Install Frontend Dependencies
cd frontend
npm install

3. Install Backend Dependencies
cd ../server
npm install

🔧 Environment Variables Setup
Frontend .env (create in frontend/ folder)

REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id_here
REACT_APP_GITHUB_CLIENT_ID=your_github_client_id_here

Backend .env (create in server/ folder)
PORT=5000
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/Authify
JWT_SECRET=your_super_secret_key_here
GOOGLE_CLIENT_ID=your_google_client_id_here
GITHUB_CLIENT_ID=your_github_client_id_here
GITHUB_CLIENT_SECRET=your_github_client_secret_here


🔑 OAuth Setup Guides
📧 Google OAuth Setup (Step-by-Step)
Step 1: Create Google Cloud Project
Go to Google Cloud Console
Click "Create Project" (or select existing)
Name: Authify → Click "Create"
Step 2: Configure OAuth Consent Screen
APIs & Services → OAuth consent screen
Select "External" → Click "Create"
Fill in:
App name: Authify
User support email: Your email
Developer contact: Your email
Click "Save and Continue"
Scopes → Click "Save and Continue"
Test users → Add your email → "Save and Continue"
Step 3: Create OAuth Client ID
APIs & Services → Credentials
Click "+ Create Credentials" → "OAuth client ID"
Application type: Web application
Name: Authify Web App
Authorized JavaScript origins:
http://localhost:3000
https://your-vercel-app.vercel.app

Authorized redirect URIs:
http://localhost:3000
https://your-vercel-app.vercel.app

Click "Create"
Copy Client ID → Add to .env files
Step 4: Enable APIs
APIs & Services → Library
Search "People API" → Enable
Search "Google+ API" → Enable

\\\
🐙 GitHub OAuth Setup (Step-by-Step)
Step 1: Register OAuth App
Go to GitHub Settings → Developer settings
Click "OAuth Apps" → "New OAuth App"
Fill in:
Application name: Authify
Homepage URL: http://localhost:3000
Application description: Authentication system
Authorization callback URL: http://localhost:3000/auth/github/callback
Click "Register application"
Step 2: Get Credentials
Copy Client ID
Click "Generate a new client secret"
Copy Client Secret (save it now, won't show again)
Step 3: Add to .env files
env
GITHUB_CLIENT_ID=your_client_id_here
GITHUB_CLIENT_SECRET=your_client_secret_here
Step 4: Production Callback URL (for Vercel)
After deploying to Vercel, add:
text
https://your-app.vercel.app/auth/github/callback

🗄️ MongoDB Atlas Setup (Step-by-Step)
Step 1: Create Cluster
Go to MongoDB Atlas
Click "Create Cluster"
Select FREE tier (M0)
Choose region (Mumbai / Singapore)
Click "Create Cluster" (wait 2-3 minutes)
Step 2: Create Database User
Database Access → "Add New Database User"
Username: authify
Password: your_strong_password
Roles: Read and write to any database
Click "Add User"
Step 3: Network Access (IP Whitelist)
Network Access → "+ Add IP Address"
IP Address: 0.0.0.0/0
Comment: Allow all (Render deployment)
Click "Confirm"
Step 4: Get Connection String
Clusters → Click "Connect"
Select "Drivers"
Copy connection string:
text
mongodb+srv://authify:your_password@cluster.mongodb.net/database_name?retryWrites=true&w=majority
Add to .env as MONGODB_URI


🚀 Running Locally
Start Backend Server
cd server
npm start
Expected output:
🚀 Server running on port 5000
✅ MongoDB Connected

Start Frontend App
cd frontend
npm start
Open http://localhost:3000

🌐 Deployment
Deploy Backend to Render (Free)
Push code to GitHub

Go to Render.com

Click "New +" → "Web Service"

Connect your GitHub repository

Settings:

Name: authify-backend

Root Directory: server

Build Command: npm install

Start Command: node index.js

Add Environment Variables (all from .env)

Click "Create Web Service"

Get your URL: https://authify-backend.onrender.com

Deploy Frontend to Vercel (Free)
Go to Vercel.com

Click "Add New" → "Project"

Import your GitHub repository

Settings:

Framework Preset: React

Root Directory: frontend

Build Command: npm run build

Add Environment Variables:

text
REACT_APP_API_URL=https://your-backend.onrender.com/api
REACT_APP_GOOGLE_CLIENT_ID=your_google_client_id
REACT_APP_GITHUB_CLIENT_ID=your_github_client_id
Click "Deploy"

Get your URL: https://authify.vercel.app



🔐 API Endpoints
Method	Endpoint	Description	Auth Required
POST	/api/auth/register	Register new user	❌
POST	/api/auth/login	Login user	❌
POST	/api/auth/google	Google OAuth login	❌
POST	/api/auth/github	GitHub OAuth login	❌
GET	/api/auth/me	Get current user	✅
POST	/api/auth/forgot-password	Send reset link	❌
POST	/api/auth/change-password	Change password	❌
POST	/api/auth/reset-password/:token	Reset password	❌



🧪 Testing
Test API with cURL

# Register
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@test.com","password":"12345678"}'

# Login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"12345678"}'



📝 Environment Variables Reference
Frontend (Vercel / Local)
Variable	Description	Required
REACT_APP_API_URL	Backend API URL	✅ Yes
REACT_APP_GOOGLE_CLIENT_ID	Google OAuth Client ID	✅ Yes
REACT_APP_GITHUB_CLIENT_ID	GitHub OAuth Client ID	✅ Yes
Backend (Render / Local)
Variable	Description	Required
PORT	Server port (5000)	✅ Yes
MONGODB_URI	MongoDB connection string	✅ Yes
JWT_SECRET	JWT signing secret	✅ Yes





⚠️ Common Issues & Fixes
CORS Error
Solution: Add your frontend URL to backend CORS allowedOrigins

MongoDB Connection Error
Solution: Add 0.0.0.0/0 to MongoDB Atlas IP whitelist

Google OAuth Error
Solution: Add frontend URL to Authorized JavaScript origins

GitHub OAuth Error
Solution: Add callback URL to GitHub OAuth app settings

Build Failed (ESLint)
Solution: Use CI=false npm run build

🚨 Troubleshooting
Problem	Solution
Server won't start	Check port 5000 is free
MongoDB connection fails	Check IP whitelist in Atlas
Login returns 401	Check JWT_SECRET in .env
Google login fails	Check Client ID and redirect URIs
GitHub login fails	Check Client ID and callback URL
CORS error	Add frontend URL to backend CORS
GOOGLE_CLIENT_ID	Google OAuth Client ID	✅ Yes
GITHUB_CLIENT_ID	GitHub OAuth Client ID	✅ Yes
GITHUB_CLIENT_SECRET	GitHub OAuth Client Secret	✅ Yes




👨‍💻 Author
Authify Team

GitHub: @gauravquest00-create

