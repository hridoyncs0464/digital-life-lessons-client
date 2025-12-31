# 🌱 Digital Life Lessons

![Project Banner](https://images.unsplash.com/photo-1591696205602-89a7e208bfa2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080)

---

## 🔗 Live Links

- **Live Website:** [https://digital-life-lessons-5c16e.web.app](https://digital-life-lessons-5c16e.web.app)  
- **Server API:** [https://digital-life-lessons-server-omega.vercel.app](https://digital-life-lessons-server-omega.vercel.app)

**Admin Login:**  
- Email: `admin1234@gmail.com`  
- Password: `admin1234H`

---

## 📘 Project Overview

Digital Life Lessons is a **full-stack web platform** for users to create, store, and share meaningful life lessons, personal growth insights, and wisdom from real-life experiences.  

It encourages **mindful reflection, lifelong learning, and community-driven growth** by letting users explore public lessons while securely managing private insights.  

This project was developed as part of **Programming Hero – Batch 12, Assignment 11 (Category 03)**.

---

## 🎯 Key Features

### 🔐 Authentication System
- Email & password login  
- Google authentication  
- Firebase-based secure authentication  

### 🧠 Life Lesson Management
- Create, update, delete personal life lessons  
- Public and private visibility options  
- Free and Premium access control  

### 🌍 Public Lesson Browsing
- Browse public lessons without login  
- Filter by category and emotional tone  
- Search lessons by keyword  
- Pagination for performance  

### ⭐ Premium System
- Free vs Premium feature comparison  
- Stripe one-time payment (৳1500 lifetime access)  
- Premium lessons blurred/locked for Free users  

### ❤️ Engagement & Interaction
- Like lessons  
- Save lessons to favourites  
- Comment on lessons  
- Share lessons on social media  

### 🛡️ Dashboard (User & Admin)
- **User Dashboard:** lesson stats, favourites, profile  
- **Admin Dashboard:** manage users, lessons, reports, moderation  

### 📱 Responsive & Professional UI
- Mobile, tablet, and desktop ready  
- Modern layout with Tailwind CSS & DaisyUI  

---

## 🧩 Pages & Routes

### Public Pages
- Home  
- Login  
- Register  
- Public Lessons  
- 404 Not Found  

### Protected Pages
- Add Lesson  
- My Lessons  
- Update Lesson  
- Lesson Details  
- Favourites  
- Pricing / Upgrade  
- Dashboard (User & Admin)  
- Payment Success & Cancel  

---

## 🛠️ Technology Stack

**Frontend:** React.js (Vite), React Router DOM, Tailwind CSS, DaisyUI, Lottie React, Axios / Fetch API, React Hot Toast / SweetAlert  
**Backend:** Node.js, Express.js, MongoDB, Firebase Admin SDK, Stripe Integration  
**Authentication:** Firebase (Email & Google)  
**Extras:** Dark/Light Theme Toggle, PDF Export, Pagination, Search/Filter/Sort  

---

## 🔐 Security & Best Practices
- Environment variables for Firebase and API URLs  
- Protected routes with authentication guards  
- Reload-safe routing  
- No Lorem Ipsum or browser alert() used  

---

## 🏃‍♂️ How to Run Locally

### Client
```bash
# Clone the repository
git clone https://github.com/username/B12-A11_Category-03.git

# Navigate to client folder
cd client

# Install dependencies
npm install

# Create .env file with Firebase config & API base URL
# Example:
REACT_APP_FIREBASE_API_KEY=your_firebase_api_key
REACT_APP_FIREBASE_AUTH_DOMAIN=your_firebase_auth_domain
REACT_APP_API_BASE_URL=http://localhost:5000

# Start client
npm start

# Open in browser
http://localhost:3000
# Navigate to server folder
cd server

# Install dependencies
npm install

# Create .env file with:
# Example:
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000

# Start server
npm run dev
