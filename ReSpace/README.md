# ReSpace — Smart Public Space Utilization & Community Platform

ReSpace is a full-stack **MERN (MongoDB, Express.js, React.js, Node.js)** web application built to discover, reserve, and activate underused public and community spaces. It bridges the gap between underutilized civic venues (courtyards, park amphitheaters, rooftops, library maker labs, community halls) and local community groups, organizers, and residents.

---

## 1. Problem Statement & Solution

### The Problem
"Unused or poorly utilized public spaces coexist with communities that lack suitable spaces." Across cities, public infrastructure frequently sits idle during off-peak hours due to fragmented reservation workflows, lack of transparency, and inefficient approval systems.

### The Solution
ReSpace offers a centralized digital platform featuring:
- Real-time space discovery with location, capacity, and facility filtering.
- Automated time-slot conflict validation on space bookings.
- Community activity hosting linked directly to public space venues.
- Role-based authorization (`USER` and `ADMIN`) with backend protected REST APIs.
- Persistent document storage in MongoDB through Mongoose ODM.

---

## 2. Architecture & Data Flow Diagram

```
+-----------------------------------------------------------------------+
|                           React 18 Frontend                           |
|      (Pages, Glassmorphic UI, Axios Service Layer, AuthContext)       |
+-----------------------------------------------------------------------+
                                    │
                         HTTP REST API Requests
                                    │
                                    ▼
+-----------------------------------------------------------------------+
|                          Express.js REST API                          |
|    (Routes, JWT & Admin Auth Middleware, Conflict Validation Engine)  |
+-----------------------------------------------------------------------+
                                    │
                           Mongoose ORM / ODM
                                    │
                                    ▼
+-----------------------------------------------------------------------+
|                           MongoDB Database                            |
|             (Users, Spaces, Bookings, Activities Collections)          |
+-----------------------------------------------------------------------+
```

### Data Flow Execution Example:
1. **User Action**: User submits a booking request on React frontend.
2. **REST Call**: `axios` sends `POST /api/bookings` with Bearer JWT token.
3. **Middleware**: Express `protect` middleware verifies JWT, attaches `req.user`.
4. **Business Logic**: `bookingController` verifies space existence, capacity limit, and checks for time slot conflicts against existing approved bookings in MongoDB.
5. **Database**: Mongoose saves the `Booking` document to MongoDB.
6. **Response**: Express sends `201 Created` JSON payload back to React.
7. **UI Update**: React Context and UI update dynamically to reflect real-time status.

---

## 3. Technology Stack

- **Frontend**: React 18, Vite, Tailwind CSS (Custom Dark Futuristic Glassmorphism), Lucide React Icons, React Router v6, Axios.
- **Backend**: Node.js, Express.js REST APIs, Cors, Dotenv, Bcryptjs, JsonWebToken.
- **Database**: MongoDB (via Mongoose ODM) with fallback MongoMemoryServer support.
- **Security**: Password hashing (Bcryptjs), JWT Token authentication, role-based protection (`protect`, `admin`).

---

## 4. Folder Structure

```
ReSpace/
│
├── client/                     # React Frontend
│   ├── src/
│   │   ├── assets/             # Static graphics
│   │   ├── components/         # Navbar, Footer, SpaceCard, ActivityCard, BookingModal, AdminSpaceModal, Toast
│   │   ├── context/            # AuthContext, ToastContext
│   │   ├── pages/              # LandingPage, ExploreSpacesPage, SpaceDetailPage, UserDashboardPage, MyRequestsPage, ActivitiesPage, AdminDashboardPage, ProfilePage, LoginPage, RegisterPage
│   │   ├── services/           # api.js, authService, spaceService, bookingService, activityService, adminService
│   │   ├── App.jsx             # Route definitions & guards
│   │   ├── index.css           # Tailwind + Glassmorphism styles
│   │   └── main.jsx            # Entry point
│   ├── package.json
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/                     # Express Backend REST API
│   ├── config/                 # db.js (Mongoose connection & fallback)
│   ├── controllers/            # authController, spaceController, bookingController, activityController, adminController
│   ├── middleware/             # authMiddleware, errorMiddleware
│   ├── models/                 # User.js, Space.js, Booking.js, Activity.js
│   ├── routes/                 # authRoutes, spaceRoutes, bookingRoutes, activityRoutes, adminRoutes
│   ├── utils/                  # generateToken, seedData
│   ├── server.js               # Express application entry point
│   └── package.json
│
├── .env                        # Root environment configuration
├── .env.example
├── README.md                   # System documentation
└── package.json                # Root package for running client & server concurrently
```

---

## 5. Environment Variables (`.env`)

Create a `.env` file in the root directory:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/respace
JWT_SECRET=respace_super_secret_jwt_key_2026_cat2_project
JWT_EXPIRE=30d
NODE_ENV=development
```

---

## 6. Installation & Execution Commands

### Prerequisites
- Node.js (v18+)
- npm (v9+)
- MongoDB (Local instance or Atlas connection URI, fallback in-memory server is automatically initialized if local MongoDB service is offline)

### Step-by-Step Setup

1. **Install All Dependencies**:
   ```bash
   npm run postinstall
   ```

2. **Seed MongoDB Database** (Populates demo users, sample public spaces, and activities):
   ```bash
   npm run seed
   ```

3. **Run Both Backend and Frontend Concurrently**:
   ```bash
   npm run dev
   ```

- **Frontend URL**: `http://localhost:3000`
- **Backend API URL**: `http://localhost:5000/api`

---

## 7. Demo Credentials for CAT2 Viva Evaluation

| Account Type | Email | Password | Role / Access Rights |
| :--- | :--- | :--- | :--- |
| **System Admin** | `admin@respace.com` | `admin123` | Full Admin Dashboard, Space Management CRUD, Booking Approval/Rejection, User Management |
| **Community User** | `user@respace.com` | `user123` | Space Browsing, Booking Requests, Host & Join Activities, Personal Dashboard |

*(Note: On the Login Page, click the **Quick Viva Demo Credentials** buttons for instant 1-click authentication!)*

---

## 8. REST API Documentation

### Authentication (`/api/auth`)
- `POST /api/auth/register` — Register a new user account in MongoDB
- `POST /api/auth/login` — Authenticate credentials and return JWT bearer token
- `GET /api/auth/me` — Fetch current logged in profile (Protected)
- `PUT /api/auth/profile` — Update user profile & password (Protected)

### Public Spaces (`/api/spaces`)
- `GET /api/spaces` — Retrieve public spaces with search & category filters
- `GET /api/spaces/:id` — Get single space details
- `POST /api/spaces` — Create new public space (Admin/Owner)
- `PUT /api/spaces/:id` — Update space document (Admin/Owner)
- `DELETE /api/spaces/:id` — Delete space document (Admin/Owner)

### Space Bookings (`/api/bookings`)
- `GET /api/bookings` — Get authenticated user's bookings (Protected)
- `POST /api/bookings` — Create space booking request with conflict validation (Protected)
- `GET /api/bookings/:id` — Get booking by ID (Protected)
- `PUT /api/bookings/:id` — Update booking status: approve/reject (Admin) or cancel (User)
- `DELETE /api/bookings/:id` — Delete booking request (Protected)

### Community Activities (`/api/activities`)
- `GET /api/activities` — Get community activities
- `GET /api/activities/:id` — Get activity details
- `POST /api/activities` — Create community activity linked to a space (Protected)
- `PUT /api/activities/:id` — Update activity details (Protected)
- `DELETE /api/activities/:id` — Delete activity (Protected)
- `POST /api/activities/:id/join` — Join activity (Protected)
- `POST /api/activities/:id/leave` — Leave activity (Protected)

### Admin Operations (`/api/admin`)
- `GET /api/admin/stats` — Real-time database metrics counts (Protected/Admin)
- `GET /api/admin/users` — List all registered users (Protected/Admin)
- `PUT /api/admin/users/:id/role` — Update user role (Protected/Admin)
- `DELETE /api/admin/users/:id` — Remove user account (Protected/Admin)
- `GET /api/admin/bookings` — List all booking requests across system (Protected/Admin)

---

## 9. Database Collections & Schema Specifications

### `User` Collection
- `name`: String
- `email`: String (Unique)
- `password`: String (Bcrypt Hash)
- `role`: Enum ('user', 'admin')
- `avatar`: String
- `organization`: String
- `bio`: String

### `Space` Collection
- `name`: String
- `description`: String
- `location`: `{ address, city, state, zipCode }`
- `category`: Enum ('Park', 'Community Hall', 'Library', 'Sports Ground', 'Auditorium', 'Rooftop', 'Courtyard', 'Co-working')
- `capacity`: Number
- `facilities`: Array of Strings
- `image`: String
- `isAvailable`: Boolean
- `hourlyRate`: Number
- `rules`: Array of Strings

### `Booking` Collection
- `user`: ObjectId (Ref User)
- `space`: ObjectId (Ref Space)
- `activity`: ObjectId (Ref Activity, optional)
- `requestedDate`: Date
- `startTime`: String ("HH:MM")
- `endTime`: String ("HH:MM")
- `purpose`: String
- `expectedParticipants`: Number
- `status`: Enum ('pending', 'approved', 'rejected', 'cancelled')
- `adminNotes`: String

### `Activity` Collection
- `title`: String
- `description`: String
- `category`: String
- `organizer`: ObjectId (Ref User)
- `space`: ObjectId (Ref Space)
- `date`: Date
- `startTime`: String
- `endTime`: String
- `participants`: Array of ObjectIds (Ref User)
- `status`: Enum ('upcoming', 'ongoing', 'completed', 'cancelled')

---

## 10. Viva Demonstration Walkthrough

During your CAT2 project viva presentation:
1. **User Registration & Login**: Show that registering a user inserts a document into MongoDB `users` collection and returns a signed JWT.
2. **Space Browsing & Filtering**: Demonstrate filtering spaces by category and capacity retrieved dynamically from MongoDB `spaces`.
3. **Booking Request & Conflict Engine**: Submit a booking for a specific date and time slot. Point out that the request appears in MongoDB `bookings` with status `"pending"`. Submit an overlapping request to demonstrate backend conflict detection.
4. **Admin Approval**: Log in as `admin@respace.com`, open the Admin Panel, and approve the pending request. Verify that MongoDB updates status to `"approved"`.
5. **Status Sync**: Switch back to the user account to observe that the user dashboard and "My Requests" page instantly display the approved status.
6. **Activity Module**: Create an activity ("Youth Coding Workshop"), join it, and demonstrate full CRUD operations interacting directly with MongoDB.
