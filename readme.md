#  Node.js API

This repository contains a **Node.js backend implementation** for **Event APIs** and **Nudge API documentation**.

The project focuses on:
- Reading API documentation
- Implementing APIs using **MongoDB native driver**
- Writing clear **API documentation**
- Following **schema-independent design**

---

##  Tech Stack

- **Node.js**
- **Express.js**
- **MongoDB (Native Driver – no Mongoose)**
- **dotenv**
- **Postman (for testing)**

---
## VIDEO EXPLAINATION:

---
##  Project Structure

```bash
Node-Api
├── node_modules
├── package.json
├── package-lock.json
├── server.js
├── src
   ├── collection
   │   └── collection.js
   ├── db
   ├── db.js
   ├── middleware
   │   └── upload.js
   └── routes
       └── routes.js
```

---
## Inatalling MongoDB in system Link:
```bash
https://www.mongodb.com/try/download/community
```
## 🚀 Step 1: Setup the Project

### 1️ Clone the repository
```bash
git clone <your-repo-url>
cd node-api
```

### 2️ Install dependencies
```bash
npm init -y
npm install express mongodb dotenv
```
After installation change in `package.json`
From:
```bash
"main": "index.js",
"scripts": {
"test": "echo \"Error: no test specified\" && exit 1"
}
```
TO
```
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "node server.js"
  }
```
---

### 3️ Environment variables (`.env`)
```env
MONGO_URI=mongodb://127.0.0.1:27017
DB_NAME=nodebb
```

---
##  Step 2: create a DB directory

```bash
cd Node-Api
```
```bash
mkdir src/db
```
##  Step 3: Start MongoDB

```bash
mongod --dbpath src/db
```
Make sure MongoDB is running before starting the server.

---

## ▶️ Step 4: Start the Server

```bash
node server.js
```

Expected output:
```
MongoDB Connected
Server running on port 3000
```

---

##  Task 1 – Event API Creation

###  Base API URL
```
/api/v3/app
```

---

###  Event Data Model (Schema-Independent)

```json
type:"event"
uid:18 (user id)
name: Name of the event
tagline: A proper tag-line for the event
schedule: (Date + time) Timestamp
description: String
files[image]: Image file (File upload)
moderator: A user who is going to host
category: Category of the event
sub_category: Sub category
rigor_rank: Integer value
attendees: Array of user Id's who is attending the event
```

---

##  Event APIs

### ➕ Create Event
**POST** `/api/v3/app/events`

**Payload:** Event object  
**Response:**
```json
{
  "message": "Nudge created successfully",
  "event_id": "65a9f1c9..."
}
```

---

###  Get Events (Latest + Pagination)
**GET** `/api/v3/app/events?type=latest&limit=5&page=1`

---

###  Get Event by ID (Query Param)
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

##  Task 2 – Nudge API Documentation

###  What is a Nudge?
A **Nudge** is a lightweight content unit used to promote an **event or article** with:
- Title
- Image
- Schedule
- Description
- Icon
- Invitation text

---

###  Nudge Object Structure

```json
type:"nudge"
uid:18 (user id)
name: Name of the event
tagline: A proper tag-line for the event
schedule: (Date + time) Timestamp
description: String
files[image]: Image file (File upload)
moderator: A user who is going to host
category: Category of the event
sub_category: Sub category
rigor_rank: Integer value
attendees: Array of user Id's who is attending the nudge
```

---

##  Nudge APIs (Documentation)

### ➕ Create Nudge
**POST** `/api/v3/app/Nudge`

---

###  Get Nudges
**GET** `/api/v3/app/Nudge?page=1&limit=10`

---

###  Get Nudge by ID
**GET** `/api/v3/app/Nudge?id=:nudge_id`

---

### ✏️ Update Nudge
**PUT** `/api/v3/app/Nudge/:nudge_id`

---

### ❌ Delete Nudge
**DELETE** `/api/v3/app/Nudge/:nudge_id`

---

##  Design Decisions

- Schema-less design for flexibility
- Query-based filtering and pagination
- UI-driven data structure
- Easy extensibility for future assets

---

##  What This Assignment Demonstrates

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

##  Final Note

This project follows **real-world backend practices** and matches the **assignment requirements exactly**, making it suitable for **intern evaluation and interviews**.

