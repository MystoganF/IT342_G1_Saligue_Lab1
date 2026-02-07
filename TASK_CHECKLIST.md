# IT342 Lab 2: User Registration and Authentication - Task Checklist

**Student Name:** [Your Name]
**Section:** G1
**Repository:** IT342_G1_Saligue_Lab1
**Lab Due:** [Date]

## 📊 Overall Progress
- [ ] Backend (Spring Boot)
- [ ] Web Application (React)
- [ ] Documentation
- [ ] Submission

## ✅ DONE Tasks

### Backend - Spring Boot Setup
- [x] Initialize Spring Boot project ✓
  - Commit: [Enter your commit hash here]
- [x] Configure project structure ✓
  - Commit: [Enter your commit hash here]


### Web Application - React Setup
- [x] Create React app with TypeScript ✓
  - Commit: [Enter your commit hash here]
- [x] Install required dependencies (react-router-dom, axios) ✓
  - Commit: [Enter your commit hash here]
- [x] Set up basic project structure ✓
  - Commit: [Enter your commit hash here]

## 🔄 IN-PROGRESS Tasks

### Backend Development
- [ ] Implement User entity/model
  - Status: Working on it
- [ ] Create AuthController with endpoints:
  - [ ] POST /api/auth/register
  - [ ] POST /api/auth/login
  - [ ] GET /api/user/me
- [ ] Implement password encryption with BCrypt
- [ ] Create UserRepository
- [ ] Implement JWT authentication
- [ ] Add CORS configuration
- [ ] Set up MySQL database connection 
- [ ] Configure application.properties 


### Web Application Development
- [ ] Create Login page component
  - Status: Basic structure done
- [ ] Create Register page component
  - Status: Basic structure done
- [ ] Create Dashboard/Profile page
  - Status: Basic structure done
- [ ] Implement authentication context/state
- [ ] Connect to backend API using axios
- [ ] Implement form validation
- [ ] Add protected routing

## 📋 TODO Tasks

### Backend Features
- [ ] Add request/response DTOs
- [ ] Implement input validation
- [ ] Add error handling
- [ ] Write unit tests
- [ ] Add API documentation (Swagger/OpenAPI)

### Web Application Features
- [ ] Style pages with CSS/UI library
- [ ] Implement logout functionality
- [ ] Add form error handling
- [ ] Implement loading states
- [ ] Add success/error notifications
- [ ] Make responsive design

### Integration & Testing
- [ ] Test register API from React
- [ ] Test login API from React
- [ ] Test protected endpoint
- [ ] Test error scenarios
- [ ] Cross-browser testing

### Documentation
- [ ] Update FRS PDF with:
  - [ ] ERD diagram
  - [ ] UML diagrams (from previous activity)
  - [ ] Web UI screenshots:
    - [ ] Register page
    - [ ] Login page
    - [ ] Dashboard/Profile page
    - [ ] Logout functionality
- [ ] Update README.md with setup instructions
- [ ] Add API documentation

### Submission Preparation
- [ ] Verify all requirements are met
- [ ] Test complete flow
- [ ] Update this checklist with commit hashes
- [ ] Push final code to GitHub
- [ ] Submit GitHub link in MS Teams

## 🔧 Technical Requirements Checklist

### Backend Requirements
- [ ] MySQL database connection
- [ ] Password encryption (BCrypt)
- [ ] JWT token authentication
- [ ] RESTful API endpoints
- [ ] CORS enabled for React app
- [ ] Error handling

### Web Application Requirements
- [ ] Register page (form with: name, email, password)
- [ ] Login page (form with: email, password)
- [ ] Dashboard/Profile page (protected)
- [ ] Logout functionality
- [ ] API integration with axios
- [ ] Token storage/management

### Repository Structure
- [ ] `/backend` - Spring Boot application
- [ ] `/web` - React application
- [ ] `/mobile` - (empty or placeholder)
- [ ] `/docs` - FRS PDF and documentation
- [ ] `README.md` - Project documentation
- [ ] `TASK_CHECKLIST.md` - This file

## 📝 Notes
- Mobile app will be implemented in the next session
- Passwords must never be stored in plain text
- Include screenshots of working web UI in FRS
- Every DONE task must include a commit hash
- Mark incomplete features as TODO

## 🔗 Useful Commands

### Backend (Spring Boot)
```bash
cd backend
./mvnw spring-boot:run