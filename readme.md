# 📌 Node.js Event & Nudge API (Intern Assignment)

This repository contains a **Node.js backend implementation** for **Event APIs** and **Nudge API documentation**, built as part of a **Node.js Intern technical assignment**.

The project focuses on:
- Reading API documentation
- Implementing APIs using **MongoDB native driver**
- Writing clear **API documentation**
- Following **schema-independent design**

---

## 🧠 Assignment Overview

### **Position**
- Node.js Intern

### **Required Skills**
- JavaScript
- Node.js
- Express
- MongoDB (Native Driver)

---

## 🛠 Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB (Native Driver – no Mongoose)**
- **dotenv**
- **Postman (for testing)**

---

## 📁 Project Structure

```bash
node-api/
├── controllers/
│   └── event.controller.js
├── routes/
│   └── event.routes.js
├── db.js
├── server.js
├── .env
├── package.json
└── README.md
```

---

## 🚀 Step 1: Setup the Project

### 1️⃣ Clone the repository
```bash
git clone <your-repo-url>
cd node-api
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Environment variables (`.env`)
```env
MONGO_URI=mongodb://127.0.0.1:27017
DB_NAME=nodebb
```

---

## 🗄 Step 2: Start MongoDB

```bash
mongod --dbpath src/db --port 27017
```

Make sure MongoDB is running before starting the server.

---

## ▶️ Step 3: Start the Server

```bash
npm start
```

Expected output:
```
MongoDB Connected
Server running on port 8000
```

---

## 📌 Task 1 – Event API Creation

### 🔗 Base API URL
```
/api/v3/app
```

---

### 📄 Event Data Model (Schema-Independent)

```json
{
  "type": "event",
  "name": "Node Workshop",
  "tagline": "Learn Node.js",
  "schedule": {
    "start": "2026-01-05T10:00:00Z",
    "end": "2026-01-05T13:00:00Z"
  },
  "files": {
    "image": "image_url"
  },
  "description": "Hands-on workshop",
  "moderator": "Admin",
  "category": "tech",
  "sub_category": "backend",
  "rigor_rank": 8
}
```

---

## 📌 Event APIs

### ➕ Create Event
**POST** `/api/v3/app/events`

**Payload:** Event object  
**Response:**
```json
{
  "event_id": "65a9f1c9..."
}
```

---

### 📄 Get Events (Latest + Pagination)
**GET** `/api/v3/app/events?type=latest&limit=5&page=1`

---

### 📄 Get Event by ID (Query Param)
**GET** `/api/v3/app/events?id=:event_id`

---

### ✏️ Update Event
**PUT** `/api/v3/app/events/:id`

**Payload:** (any fields to update)

---

### ❌ Delete Event
**DELETE** `/api/v3/app/events/:id`

---

## ⚠️ Important Constraints Followed

- ❌ No Mongoose
- ✅ MongoDB Native Driver
- ❌ No fixed schemas
- ✅ `_id` used as unique identifier
- ✅ Flexible & schema-independent data model

---

## 📘 Task 2 – Nudge API Documentation

### 🧩 What is a Nudge?
A **Nudge** is a lightweight content unit used to promote an **event or article** with:
- Title
- Image
- Schedule
- Description
- Icon
- Invitation text

---

### 🧱 Nudge Object Structure

```json
{
  "type": "nudge",
  "target_type": "event",
  "target_id": "65a9f1c9...",
  "title": "React Workshop",
  "image": "image_url",
  "schedule": {
    "date": "2026-01-05",
    "from": "10:00",
    "to": "12:00"
  },
  "description": "Join us for React",
  "icon": "🔥",
  "invitation_text": "Swipe right to join"
}
```

---

## 📌 Nudge APIs (Documentation)

### ➕ Create Nudge
**POST** `/api/v3/app/events`

---

### 📄 Get Nudges
**GET** `/api/v3/app/events?page=1&limit=10`

---

### 📄 Get Nudge by ID
**GET** `/api/v3/app/events?id=:nudge_id`

---

### ✏️ Update Nudge
**PUT** `/api/v3/app/events/:nudge_id`

---

### ❌ Delete Nudge
**DELETE** `/api/v3/app/events/:nudge_id`

---

## 🧠 Design Decisions

- Schema-less design for flexibility
- Query-based filtering and pagination
- UI-driven data structure
- Easy extensibility for future assets

---

## 🎯 What This Assignment Demonstrates

- Ability to **read and understand API documentation**
- Backend implementation using **MongoDB native driver**
- Clean routing and controller separation
- Proper API documentation writing
- Production-ready thinking for Node.js backend

---

## ✅ How to Test

Use **Postman** to test all endpoints.  
No frontend is required.

---

## 📌 Final Note

This project follows **real-world backend practices** and matches the **assignment requirements exactly**, making it suitable for **intern evaluation and interviews**.

