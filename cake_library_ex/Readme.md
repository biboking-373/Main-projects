Hello All ...

This has been an exciting journey in making this work and being able to do this project I learnt alot. But! there are just somethings that can't be explained. I have decided to stop pursuing the frontend part of this project because of mine own interests.... and i do not mean the frontend API's part that I consider it part of the backend 😂 LOL!!. By frontend I mean the Visuals.. the design, why you may ask ... I am not interested that much but to be more precise it's not in me, I just love the backend feel of things, the building of API's to help people do things behind the scenes... I like it, I like the back as you may say 😂😂😂😂... For now I have reached upto where i could but that doesn't mean I will not explore the world of building visuals, ohh i will but not right now..... so enjoy and thank you for the time....

Down here is a generated detail of how the app goes....

skip the vue.js on the frontend part....

you can check the services/ part...etc

THANKS 

A full-stack social recipe sharing platform built with Vue.js frontend and Node.js/Express backend.

---

## 📁 Project Structure

### Backend

The backend is a **Node.js/Express server** that handles all API operations and database interactions.

**Location:** `/backend/`

**Key Responsibilities:**
- User authentication (login, registration, JWT tokens)
- Recipe post management (create, read, update, delete)
- Like/engagement system
- Comments and community interactions
- Database connectivity with MongoDB
- Request validation and error handling

**Main Components:**

- **`server.js`** - Express application entry point with route setup
- **`config/`** - Configuration files
  - `database.js` - MongoDB connection setup
  - `email.js` - Email service configuration
- **`routes/`** - API endpoint definitions
  - `AUTH/Authroutes.js` - Authentication endpoints
  - `Posts/Postroutes.js` - Recipe post endpoints
  - `Likes/Likeroutes.js` - Like/engagement endpoints
  - `Comments/Commentroutes.js` - Comment endpoints
- **`controller/`** - Business logic for each feature
  - `Authcontroller.js` - User authentication logic
  - `Postscontroller.js` - Recipe post management
  - `Likescontroller.js` - Like handling
  - `Commentcontroller.js` - Comment operations
- **`middleware/`** - Request processing middleware
  - `Authmiddleware.js` - JWT verification and authentication
  - `Postsmiddleware.js` - Post validation
  - `Commentmiddleware.js` - Comment validation
  - `Likemiddleware.js` - Like validation
- **`models/`** - MongoDB schemas
  - `usermodel.js` - User database schema
  - `postsmodel.js` - Recipe post schema
  - `likesmodel.js` - Like/engagement schema
  - `commentmodel.js` - Comment schema

**Tech Stack:**
- Express.js (REST API framework)
- MongoDB & Mongoose (Database)
- JWT (Authentication)
- bcrypt (Password encryption)
- Nodemailer (Email service)
- Multer (File upload)
- Winston (Logging)
- CORS (Cross-origin requests)

---

### Frontend

The frontend is a **Vue.js single-page application** that provides the user interface for the recipe social platform.

**Location:** `/frontend/`

**Key Responsibilities:**
- User authentication UI (login, registration)
- Recipe feed and browsing
- Post creation and management
- Like and comment interactions
- User profile and dashboard
- Responsive design with Bootstrap

**Main Components:**

- **`src/App.vue`** - Root Vue component
- **`src/main.js`** - Application entry point with router and Pinia setup
- **`router/`** - Vue Router navigation
  - `index.js` - Router configuration
  - `guards/` - Route protection
    - `authGuard.js` - Authentication checks
    - `postGuard.js` - Post access validation
    - `commentGuard.js` - Comment access validation
    - `userGuard.js` - User profile access
- **`views/`** - Main page components
  - `authentication.vue` - Login/registration page
  - `posts.vue` - Recipe feed display
  - `Explore.vue` - Browse recipes
  - `Profile.vue` - User profile page
- **`components/`** - Reusable UI components
  - `AUTH/` - Login and Registration forms
  - `Posts/` - Feed, post display, and status creation
  - `User/` - User dashboard components
- **`services/`** - API integration and state management
  - `api/` - Axios API calls
    - `auth.js` - Authentication API
    - `post.js` - Post API
    - `like.js` - Like API
    - `comment.js` - Comment API
    - `axios.js` - Axios configuration with interceptors
  - `store/` - Pinia state management
    - `Auth/` - Authentication state
    - `Posts/` - Recipe posts state
    - `Like/` - Likes state
    - `Comment/` - Comments state

**Tech Stack:**
- Vue 3 (UI framework)
- Vue Router (Navigation)
- Pinia (State management)
- Axios (HTTP client)
- Bootstrap 5 (CSS framework)
- Vite (Build tool)
- DOMPurify (XSS protection)
- FontAwesome (Icons)

---

## 🔄 How Backend and Frontend Work Together

### Request Flow:

1. **User Action** (Frontend) → User clicks button or submits form in Vue component
2. **API Call** (Frontend) → Axios service makes HTTP request to backend
3. **Route Handling** (Backend) → Express route receives request
4. **Middleware Processing** (Backend) → Validation, authentication checks
5. **Controller Logic** (Backend) → Business logic executes (auth, posts, comments, etc.)
6. **Database Interaction** (Backend) → Mongoose models query/update MongoDB
7. **Response** (Backend) → JSON response sent back to frontend
8. **State Update** (Frontend) → Pinia store updates with new data
9. **UI Render** (Frontend) → Vue components re-render with updated data

### Key Integration Points:

- **Authentication Flow**: Frontend sends credentials → Backend validates with bcrypt and JWT → Frontend stores token
- **Recipe Posts**: Frontend form submits → Backend validates and saves to MongoDB → Feed updates in frontend
- **Likes & Comments**: Frontend sends engagement → Backend records in database → Real-time UI updates
- **Protected Routes**: Frontend guards check token → Backend middleware verifies JWT on each request

---

## 🚀 Getting Started

### Backend Setup:
```bash
cd backend
npm install
npm run dev  # Starts with nodemon on port 3130
```

### Frontend Setup:
```bash
cd frontend
npm install
npm run dev  # Starts Vite dev server
```

Set up `.env` file in backend with `MONGODB_URI` and `FRONTEND_API`.