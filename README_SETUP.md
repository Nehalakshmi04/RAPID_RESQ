
# 🚀 Rapid Rescue - Setup Guide

## 1. Backend Setup

```bash
cd rapid-rescue
npm install
npm run dev
```

Make sure MongoDB is running locally or replace `MONGO_URI` in `.env` with your Atlas connection string.

## 2. Frontend Setup

```bash
cd frontend
npm install
npm start
```

Runs on `http://localhost:3000`

## 3. Example API Request (Use Postman)

POST http://localhost:5000/api/auth/register

```json
{
  "name": "Neha",
  "email": "neha@example.com",
  "password": "neha123"
}
```

---
