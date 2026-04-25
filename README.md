# 🚗 UTeM Ride

A campus ride-sharing application for **Universiti Teknikal Malaysia Melaka (UTeM)** students and staff. Book rides, share trips, and navigate campus — all from your phone.

---

## 📸 Screenshots

> _Coming soon — app is under active development._

---

## 🏗️ Project Structure

This is a **monorepo** containing both the mobile app and the backend API.

```
utemride/
├── app/                    # Expo Router screens (file-based routing)
│   ├── _layout.tsx         # Root layout with font loading & providers
│   ├── index.tsx           # Splash screen with animated loading dots
│   ├── login.tsx           # Login & Registration screen
│   ├── terms.tsx           # Terms of Service
│   └── privacy.tsx         # Privacy Policy
├── src/
│   ├── api/                # API client (Axios + auto IP detection)
│   ├── assets/             # Images, fonts, and static resources
│   ├── components/         # Reusable UI components
│   ├── constants/          # Brand colors & design tokens
│   └── types/              # Shared TypeScript type definitions
├── backend/
│   ├── src/
│   │   ├── auth/           # JWT authentication module
│   │   ├── users/          # User profile CRUD module
│   │   ├── rides/          # Ride management module
│   │   └── prisma/         # Prisma database service
│   ├── prisma/
│   │   └── schema.prisma   # Database schema (Users, Drivers, Rides)
│   └── docker-compose.yml  # PostgreSQL + PostGIS container
└── docs/                   # Project documentation
```

---

## ⚡ Tech Stack

### Mobile App
| Technology | Purpose |
|---|---|
| [Expo](https://expo.dev/) (SDK 54) | React Native framework & tooling |
| [Expo Router](https://docs.expo.dev/router/) v6 | File-based navigation |
| [NativeWind](https://www.nativewind.dev/) v4 | TailwindCSS for React Native |
| [TypeScript](https://www.typescriptlang.org/) | Type safety |
| [Axios](https://axios-http.com/) | HTTP client with JWT interceptors |
| [Expo Secure Store](https://docs.expo.dev/versions/latest/sdk/securestore/) | Encrypted token storage |

### Backend API
| Technology | Purpose |
|---|---|
| [NestJS](https://nestjs.com/) v11 | Modular Node.js framework |
| [Prisma](https://www.prisma.io/) v7 | Type-safe ORM |
| [PostgreSQL](https://www.postgresql.org/) + [PostGIS](https://postgis.net/) | Database with geospatial support |
| [Passport](http://www.passportjs.org/) + JWT | Authentication |
| [Socket.IO](https://socket.io/) | Real-time communication (planned) |
| [Docker](https://www.docker.com/) | Containerized database |

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v20+
- [Docker Desktop](https://www.docker.com/products/docker-desktop/)
- [Expo Go](https://expo.dev/go) app on your phone
- A code editor (VS Code recommended)

### 1. Clone the Repository

```bash
git clone https://github.com/<your-username>/utemride.git
cd utemride
```

### 2. Install Dependencies

```bash
# Install mobile app dependencies
npm install

# Install backend dependencies
cd backend
npm install
```

### 3. Start the Database

Make sure Docker Desktop is running, then:

```bash
cd backend
docker-compose up -d
```

This starts a PostgreSQL container on `localhost:5432`.

> 📖 For a detailed Docker walkthrough, see [`docs/docker-setup-guide.md`](docs/docker-setup-guide.md)

### 4. Configure Environment

Create a `backend/.env` file:

```env
DATABASE_URL="postgresql://postgres:postgres_password@localhost:5432/utemride?schema=public"
JWT_SECRET="your-super-secret-key-change-in-production"
JWT_EXPIRATION="7d"
PORT=3000
```

### 5. Run Database Migrations

```bash
cd backend
npx prisma migrate dev --name init
```

### 6. Start the Backend

```bash
cd backend
npm run start:dev
```

The API will be available at `http://localhost:3000/api/v1`

### 7. Start the Mobile App

In a separate terminal, from the project root:

```bash
npm start
```

Scan the QR code with Expo Go on your phone.

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/auth/register` | Create a new account |
| `POST` | `/api/v1/auth/login` | Login with email & password |

### Users
| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/v1/users/me` | Get current user profile |
| `PATCH` | `/api/v1/users/me` | Update current user profile |

### Rides
| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/v1/rides` | Request a new ride |
| `GET` | `/api/v1/rides` | Get user's ride history |
| `GET` | `/api/v1/rides/:id` | Get ride details |
| `PATCH` | `/api/v1/rides/:id/cancel` | Cancel a ride |

> 🔒 All endpoints except `/auth/*` require a Bearer token in the `Authorization` header.

---

## 🗄️ Database Schema

```
┌──────────┐       ┌──────────┐       ┌──────────┐
│  Users   │──1:1──│ Drivers  │       │  Rides   │
│──────────│       │──────────│       │──────────│
│ id       │       │ id       │       │ id       │
│ email    │       │ userId   │  ┌───▶│ riderId  │
│ password │       │ license  │  │    │ driverId │◀──┐
│ name     │───────│ vehicle  │  │    │ pickup   │   │
│ role     │  │    │ verified │  │    │ dropoff  │   │
│ studentId│  │    └──────────┘  │    │ status   │   │
└──────────┘  │                  │    │ fare     │   │
              └──────────────────┘    └──────────┘   │
              └──────────────────────────────────────┘
```

---

## 🛠️ Useful Commands

```bash
# View database tables in browser
cd backend && npx prisma studio

# Reset database completely
cd backend && npx prisma migrate reset

# Generate Prisma client after schema changes
cd backend && npx prisma generate

# Build backend for production
cd backend && npm run build

# Stop the database
cd backend && docker-compose down
```

---

## 📄 License

This project is for educational purposes at UTeM.

---

## 👤 Author

**Hanif** — UTeM Student

---

<p align="center">
  <i>Built with ☕ and late nights at UTeM 🎓</i>
</p>
