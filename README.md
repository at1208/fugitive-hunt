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

---

## 📂 Project Structure

```
├── prisma/                 # Prisma ORM setup
│   ├── schema.prisma       # Database schema
│   ├── seed.ts             # Seeding initial data
│   └── migrations/         # Migration files
│
├── pages/                  # Next.js Pages
│   ├── index.tsx           # Homepage
│   ├── game/               # Game components
│   ├── api/                # API routes (Next.js Server Actions)
│
├── components/             # Reusable UI components
├── hooks/                  # Custom React hooks
├── styles/                 # Tailwind CSS styling
├── utils/                  # Utility functions
│
├── .env                    # Environment variables
├── package.json            # Project dependencies
├── tsconfig.json           # TypeScript config
└── next.config.ts          # Next.js config
```

---

## 🛠 Database Schema (Prisma ORM)

This project uses **Prisma ORM** with **MySQL**. The main tables include:

### **Vehicle Table**

Stores different vehicle types.

```prisma
model Vehicle {
  id    String @id @default(uuid())
  kind  String @unique
  range Int
  count Int
  assignments CopAssignment[]
}
```

### **City Table**

Stores the cities where fugitives hide.

```prisma
model City {
  id    String @id @default(uuid())
  name  String @unique
  distance Int
  fugitives Fugitive[]
}
```

### **Cop Table**

Stores police officers.

```prisma
model Cop {
  id    String @id @default(uuid())
  name  String @unique
}
```

### **Cop Assignment Table**

Tracks cop assignments to vehicles and cities.

```prisma
model CopAssignment {
  id         String @id @default(uuid())
  gameplayId String
  copId      String
  cityId     String
  vehicleId  String
}
```

### **Fugitive Table**

Tracks fugitives and their locations.

```prisma
model Fugitive {
  id     String @id @default(uuid())
  name   String @unique
  cityId String
}
```

---

## ✅ Design Pattern Used

The project follows the **Repository Pattern**:

- **Backend API** (Next.js Server Actions) handles all business logic.
- **Frontend (React + Next.js)** consumes the API.
- **Centralized validation** using `Zod` & `React Hook Form`.

---

## 🔍 Validation Strategy

### **Client-Side Validation (React Hook Form + Zod)**

```tsx
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
});
```

### **Server-Side Validation (Zod)**

```ts
import * as z from "zod";
const assignmentSchema = z.object({
  copId: z.string().uuid(),
  cityId: z.string().uuid(),
  vehicleId: z.string().uuid(),
});
```

---

## 🔄 API Handling with React Query

### **Fetching Data**

```tsx
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
const fetchVehicles = async () => {
  return axios.get("/api/vehicles");
};
export function useVehicles() {
  return useQuery({ queryKey: ["vehicles"], queryFn: fetchVehicles });
}
```

### **Mutating Data (Refetch on Update)**

```tsx
import { useMutation, useQueryClient } from "@tanstack/react-query";
const assignCop = async (assignment) =>
  axios.post("/api/assignments", assignment);
export function useAssignCop() {
  const queryClient = useQueryClient();
  return useMutation(assignCop, {
    onSuccess: () => queryClient.invalidateQueries(["assignments"]),
  });
}
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

This README provides a **detailed overview** of the project 🚀
# fugitive-hunt
