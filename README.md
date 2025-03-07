# Fugitive Hunt - Game Platform

## 📌 Project Overview

Fugitive Hunt is a **thrilling strategy game** where players assign cops to cities, track fugitives, and manage vehicles. This project includes both **frontend (Next.js 14)** and **backend (Prisma ORM with MySQL)**, providing a seamless user experience with **React Query for API handling**.

## 🚀 Tech Stack

### **Frontend**

- **Next.js 14** (React Framework)
- **React 19** (UI Components)
- **TailwindCSS 4** (Styling)
- **Ant Design 5** (UI Components)
- **Framer Motion** (Animations)
- **React Hook Form** (Form Handling)
- **Zod** (Validation)

### **Backend**

- **Prisma ORM** (Database Management)
- **MySQL** (Relational Database)
- **Axios** (API Requests)

### **State Management & API Handling**

- **React Query (@tanstack/react-query)**
- **Next.js Server Actions** (API Routes)

### **Testing**

- **Jest (Unit & Integration Testing)**
- **React Testing Library (Component Testing)** (API Routes)

---

## 📂 Project Structure

```
├── prisma/                 # Prisma ORM setup
│   ├── schema.prisma       # Database schema
│   ├── seed.ts             # Seeding initial data
│   └── migrations/         # Migration files
│
├── app/                    # Next.js App Router
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   ├── game/               # Game components
│   ├── api/                # API handlers (Next.js Server Actions)
│
├── components/             # Reusable UI components
│
├── .env                    # Environment variables
├── package.json            # Project dependencies
├── tsconfig.json           # TypeScript config
└── next.config.ts          # Next.js config
```

---

## ✅ Design Pattern Used

The project follows the **Repository Pattern**:

- **Backend API** (Next.js Server Actions) handles all business logic.
- **Frontend (React + Next.js)** consumes the API.
- **Centralized validation** using `Zod` & `React Hook Form`.

---

## 🔄 Data Seeding

Before running the seed command, initialize the Prisma Client:

```sh
npx prisma generate
```

Then, seed the database with initial data:

```sh
npm run seed
```

---

## 🚀 Setup Instructions

### **1️⃣ Install Dependencies**

```sh
yarn install
```

### **2️⃣ Set Up Environment Variables**

Create a `.env` file with:

```
DATABASE_URL="mysql://user:password@localhost:3306/fugitive_game"
```

```sh
npx prisma generate
```

### **3️⃣ Run Database Migrations**

```sh
yarn prisma migrate dev
```

### **4️⃣ Start the Project**

```sh
yarn dev
```

Runs the **Next.js server** on `http://localhost:3000`.

---

## 🔗 Summary

✅ **Next.js 14 + Prisma + React Query**
✅ **MySQL Database with Prisma ORM**
✅ **Client & Server Validation with Zod**
✅ **API Handling with React Query**
✅ **TailwindCSS & Ant Design UI**

# fugitive-hunt
