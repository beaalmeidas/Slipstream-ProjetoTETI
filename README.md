# Slipstream F1 API

Formula 1 management API providing CRUD operations for Teams, Drivers, and Races, as well as reviewing grands-prix.

This project was developed for the Special Topics in IT course, Computer Science 2025.2.

It was built with Express, TypeScript, Prisma, and Swagger.

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [How to Run](#how-to-run)
- [Screenshots](#screenshots)

---

## Features

- CRUD operations for Teams, Drivers, and Races
- Prisma ORM for database management
- Swagger documentation for all endpoints
- Form validation with Zod
- Error handling with custom messages

---

## Technologies Used

- Node.js
- TypeScript
- Express
- Prisma
- Swagger

---

## How to Run

**1.** Clone the repository
```
git clone https://github.com/beaalmeidas/Slipstream-ProjetoTETI
```

</br>

**2.** Open the folder in a terminal or IDE
```bash
cd Slipstream-ProjetoTETI

# 'code .' to open on VSCode
```

</br>

**3.** Install the dependencies
```
npm install
```

</br>

**4.** Setup the environment variables according to the example .env

```bash
cp .env.example .env

# on Windows: Copy-Item .env.example .env
```

</br>

**5.** Run the Prisma migrations

This will move all the models intro de database.

```
npx prisma migrate dev --name init
```
</br>

**6.** Start the development server
```
npm run dev
```
Server will run on http://localhost:3000 (or the port defined in .env).
Swagger will run on http://localhost:3000/api-docs.

</br>

---

```
Slipstream-ProjetoTETI/ 
├── assets/ 
│   ├── country-flags/
│   ├── driver-photos/
│
├── ui/ /* pasta na qual eu quero colocar o frontend */ 
│
├── api/ 
│   ├── node_modules/
│   ├── prisma/
│   │   ├── migrations/
│   │   ├── schema.prisma
│   ├── src/
│   │   ├── prisma/
│   │   │   └── client.ts
│   │   ├── generated/
│   │   │   └── prisma/
│   │   ├── routes/
│   │   │   └── index.ts
│   │   │   └── userRoutes.ts
│   │   │   └── driverRoutes.ts
│   │   │   └── raceRoutes.ts
│   │   │   └── teamRoutes.ts
│   │   ├── controllers/
│   │   │   └── userController.ts
│   │   │   └── driverController.ts
│   │   │   └── raceController.ts
│   │   │   └── raceController.ts
│   │   ├── schemas/
│   │   │   └── userSchema.ts
│   │   │   └── driverSchema.ts
│   │   │   └── raceSchema.ts
│   │   │   └── teamSchema.ts
│   │   ├── services/
│   │   │   └── authService.ts
│   │   │   └── userService.ts
│   │   │   └── driverService.ts
│   │   │   └── raceService.ts
│   │   │   └── teamService.ts
│   │   ├── types/
│   │   │   └── swager-jsdoc.d.ts
│   │   ├── utils/
│   │   │   └── auth/
│   │   │       └── auth.middleware.js
│   │   │       └── jwt.ts
│   │   │   └── serviceError.ts
│   │   │   └── validateSchema.ts
│   │   └── .env
│   │   └── .gitignore
│   │   └── app.ts
│   │   └── server.ts
│   ├── package-lock.json
│   ├── package.json
│   └── tsconfig.json
│
├── .env
├── .env-example
├── .gitignore
└── README.md
```