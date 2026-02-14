IT342 Lab 2: User Registration and Authentication - Task Checklist

Student Name: Saligue
Section: G1
Repository: IT342_G1_Saligue_Lab1
Lab Due: [Current Date]

📊 Overall Progress

 Backend (Spring Boot) - IN PROGRESS

 Web Application (React) - COMPLETED

 Documentation - IN PROGRESS

 Submission

✅ DONE Tasks
Backend - Spring Boot Setup

 Initialize Spring Boot project ✓

Commit: Initial commit: Lab 2 backend and frontend setup

 Configure project structure ✓

Commit: feat(backend): file structure implementation

Web Application - React Setup

 Create React app with TypeScript ✓

Commit: Initial commit: Lab 2 backend and frontend setup

 Install required dependencies (react-router-dom, axios) ✓

Commit: Initial commit: Lab 2 backend and frontend setup

 Set up basic project structure ✓

Commit: Initial commit: Lab 2 backend and frontend setup

Web Application - Pages (Completed)

 Create Login page component ✓

Commit: feat(login): implement UI for authentication page

Features: Split layout, form validation, loading states, responsive design

 Create Register page component ✓

Commit: feat(register): implement UI for registration page

Features: Form with username, email, phone, password, confirm password

 Create Landing Page ✓

Commit: feat(landing): implement UI for landing page

Features: Navbar with Home, About, Gallery, Product, Contact links, Profile/Login toggle

 Create Profile page component ✓

Commit: feat(profile): implement UI for profile page

Features: Edit profile form, password change with current password requirement

 Create Navbar component ✓

Commit: feat(landing): implement UI for landing page

Features: Dynamic auth display (Login/Register when logged out, Profile when logged in)

 Set up React Router ✓

Commit: Initial commit: Lab 2 backend and frontend setup

Routes: /, /login, /register, /profile

🔄 IN-PROGRESS Tasks
Backend Development

 Implement User entity/model ✓

Commit: part of initial backend commit

 Create UserRepository

Status: Pending

 Set up MySQL database connection

Status: Configuration in progress

 Configure application.properties

Status: Basic setup done

 Implement password encryption with BCrypt

 Implement JWT authentication

 Create AuthController with endpoints:

 POST /api/auth/register

 POST /api/auth/login

 GET /api/user/me

 Add CORS configuration

Web Application Development

 Implement form validation ✓

Commit: animation(login-module): added soft animations and animation(login&landing modules): added soft animations

Status: COMPLETED on Login/Register pages

 Implement loading states ✓

Commit: animation(login-module): added soft animations and animation(login&landing modules): added soft animations

 Connect to backend API using axios

Status: Pending backend completion

 Implement authentication context/state

Status: Pending backend completion

 Add protected routing

Status: Pending backend completion

📋 TODO Tasks
Backend Features

 Add request/response DTOs

 Implement input validation

 Add error handling

 Write unit tests

 Add API documentation (Swagger/OpenAPI)

Web Application Features

 Implement logout functionality

Status: Navbar has logout button (non-functional)

 Connect React forms to backend API

 Add success/error notifications

 Make responsive design improvements

Integration & Testing

 Test register API from React

 Test login API from React

 Test protected endpoint

 Test error scenarios

 Cross-browser testing

Documentation

 Update FRS PDF with:

 ERD diagram

 UML diagrams (from previous activity)

 Web UI screenshots:

 Login page ✓

 Register page ✓

 Dashboard/Profile page ✓

 Logout functionality (pending backend)

 Update README.md with setup instructions

 Add API documentation

Submission Preparation

 Complete backend implementation

 Connect frontend to backend

 Test complete authentication flow

 Take screenshots for documentation

 Update this checklist with all commit hashes

 Push final code to GitHub

 Submit GitHub link in MS Teams

🔧 Technical Requirements Checklist
Backend Requirements

 MySQL database connection

 Password encryption (BCrypt)

 JWT token authentication

 RESTful API endpoints

 CORS enabled for React app

 Error handling

Web Application Requirements

 Register page (form with: username, email, password, phone) ✓

 Login page (form with: username/email, password) ✓

 Dashboard/Profile page (protected) ✓

 Logout functionality (pending backend)

 API integration with axios (pending backend)

 Token storage/management (pending backend)

Repository Structure

 /backend - Spring Boot application ✓

 /web - React application ✓

 /mobile - (empty or placeholder) ✓

 /docs - FRS PDF and documentation

 README.md - Project documentation

 TASK_CHECKLIST.md - This file ✓

📝 Notes

✅ Frontend UI is COMPLETED (Login, Register, Landing, Profile pages)

✅ Navbar component with dynamic auth display

✅ All React pages have dark theme consistent design

✅ Form validation and loading states implemented

⏳ Backend development in progress

⏳ Integration between frontend and backend pending

Mobile app will be implemented in the next session

Passwords must never be stored in plain text

Include screenshots of working web UI in FRS

Every DONE task must include a commit hash

Mark incomplete features as TODO