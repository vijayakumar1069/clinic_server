🏥 Clinic Management System - Backend
A robust and scalable backend API for a comprehensive clinic management system built with Node.js, Express.js, and MongoDB. This system provides secure authentication, role-based access control, and comprehensive appointment management functionality.
🚀 Live Demo
Production URL: https://clinic-server-4fu5.onrender.com
📋 Table of Contents

Features
Tech Stack
System Architecture
API Endpoints
Installation
Environment Variables
Usage
Authentication Flow
Project Structure
Database Schema
Security Features
Contributing
License

✨ Features
🔐 Authentication & Authorization

JWT-based Authentication with secure token management
Role-based Access Control (Admin, Doctor(futue))
Token Blacklisting for secure logout
Password Encryption using bcrypt

👨‍⚕️ Admin Management

Admin login/logout functionality
Doctor management (CRUD operations)
Appointment oversight and management
Secure admin-only endpoints

🩺 Doctor Management

Doctor registration and authentication
Profile management
Appointment handling

📅 Appointment System

Comprehensive appointment CRUD operations
Admin and doctor-specific appointment views
Appointment status management

🛡️ Security Features

CORS configuration for cross-origin requests
Input validation and sanitization
Error handling middleware
Token expiration and blacklisting

🛠️ Tech Stack
Backend Technologies

Node.js - Runtime environment
Express.js - Web framework
MongoDB - NoSQL database
Mongoose - MongoDB object modeling

Authentication & Security

JWT (jsonwebtoken) - Token-based authentication
bcrypt - Password hashing
CORS - Cross-origin resource sharing
Cookie Parser - Cookie handling

Development Tools

dotenv - Environment variable management
body-parser - Request body parsing
ES6 Modules - Modern JavaScript modules

🏗️ System Architecture
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend      │    │   Backend API   │    │   Database      │
│   (Client)      │◄──►│   (Express.js)  │◄──►│   (MongoDB)     │
└─────────────────┘    └─────────────────┘    └─────────────────┘
                              │
                              ▼
                    ┌─────────────────┐
                    │  Middleware     │
                    │  - Auth         │
                    │  - CORS         │
                    │  - Error        │
                    └─────────────────┘
🔗 API Endpoints
Authentication Endpoints
POST /api/admin-auth/admin-login     # Admin login
POST /api/admin-auth/admin-logout    # Admin logout (Protected)
Admin Management
GET    /api/admin-doctor/get-doctors                          # Get all doctors (Admin only)
POST   /api/admin-doctor//add-doctor                          # Create new doctor (Admin only)
PUT    /api/admin-doctor/update-doctor/:id/                   # Update doctor (Admin only)
DELETE /api/admin-doctor/delete-doctor/:id                    # Delete doctor (Admin only)
GET    /api//all-doctors                                      # public (appointForm dropdown)  
Appointment Management
GET    /api/appointment//get-appointments                    # Get appointments(Admin Only)
POST   /api//book-an-appointmet                              # Create appointment (public)



🚀 Installation
Prerequisites

Node.js (v14 or higher)
MongoDB (local or cloud instance)
npm or yarn package manager

Step-by-step Setup

**Clone the repository**

bash git clone https://github.com/vijayakumar1069/clinic_server.git
cd clinic_server

**Install dependencies**

bash npm install

**Set up environment variables**

bash cp .env.example .env
# Edit .env file with your configuration

Start MongoDB

bash# For local MongoDB
mongod

# Or use MongoDB Atlas (cloud) - update connection string in .env

Run the application

bash# Development mode
npm run dev

# Production mode
npm start
The server will start on http://localhost:5000 (or your specified PORT).
🔧 Environment Variables
Create a .env file in the root directory:
env# Server Configuration
PORT=5000
NODE_ENV=development

# Database Configuration
MONGO_URI=mongodb://localhost:27017/clinic_management
# Or for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/clinic_management

# JWT Configuration
JWT_SECRET_KEY=your_super_secret_jwt_key_here

# CORS Configuration
CLIENT_DEV_URL=http://localhost:3000
ALLOWED_ORIGINS=http://localhost:3000,https://yourdomain.com
Required Environment Variables

PORT - Server port (default: 5000)
MONGO_URI - MongoDB connection string
JWT_SECRET_KEY - Secret key for JWT token signing
CLIENT_URL - Frontend application URL for CORS

💻 Usage
Starting the Server
bash# Development with auto-reload
npm run dev

# Production
npm start
Testing API Endpoints
You can test the API using tools like:

Postman - Import the API collection
curl - Command line testing
Insomnia - REST client

Example API call:
bash# Admin login
curl -X POST http://localhost:5000/api/admin-auth/admin-login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@clinic.com", "password": "password123"}'
🔐 Authentication Flow
1. Login Process
javascript// Admin/Doctor login
POST /api/admin-auth/admin-login
{
  "email": "admin@example.com",
  "password": "securepassword"
}

// Response
{
  "success": true,
  "message": "Logged in successfully",
  "data": { /* user data */ },
  "token": "jwt_token_here"
}
2. Protected Routes
javascript// Include JWT token in headers
Authorization: Bearer <jwt_token>
3. Logout Process
javascript// Token gets blacklisted
POST /api/admin-auth/admin-logout
Authorization: Bearer <jwt_token>
📁 Project Structure
clinic-management-backend/
├── controllers/
│   ├── adminControllers/
│   │   └── admin.controller.js
│   
│   └── appointmentControllers/
├── middleware/
│   ├── verifyToken.js
│   ├── hasRole.js
│   └── errorHandler.js
├── models/
│   ├── admin.schema.js
│   ├── doctor.schema.js
│   ├── appointment.schema.js
│   └── blacklistedToken.js
├── routes/
│   ├── adminRoutes/
│   │   ├── admin.routes.js
│   │   └── admin.doctor.js
│   ├
│   │   
│   └── appointmentsRoutes/
│       ├── appointment.route.js
│       └── admin.appointment.route.js
├── utils/
│   ├── connectToDB.js
│   ├── corsOptions.js
│   └── errorHandler.js
├── .env
├── .gitignore
├── package.json
└── server.js
🗄️ Database Schema
Admin Schema
javascript{
  _id: ObjectId,
  email: String (unique),
  password: String (hashed),
  role: String (default: "admin"),
  createdAt: Date,
  updatedAt: Date
}
Doctor Schema
javascript{
  _id: ObjectId,
  name: String,
  email: String (unique),
 
  specialization: String,
  
  
  availableTimeSlot:enum["morning", "afternoon", "evening", "night"],
  adminId:objectId
  createdAt: Date,
  updatedAt: Date
}
Appointment Schema
javascript{
  _id: ObjectId,
  name: String,
  email: String,
  mobile: String,
  doctorId: ObjectId (ref: Doctor),
  date: Date,
  time: String,
 
  createdAt: Date,
  updatedAt: Date
}
Blacklisted Token Schema
javascript{
  _id: ObjectId,
  token: String,
  userId: ObjectId,
  expiresAt: Date,
  createdAt: Date
}
🔒 Security Features
1. JWT Token Management

Secure token generation with expiration
Token blacklisting on logout
Automatic token cleanup

2. Password Security

bcrypt hashing with salt rounds
No plain text password storage

3. CORS Configuration

Configurable allowed origins
Secure cross-origin requests

4. Input Validation

Request body validation
SQL injection prevention
XSS protection

5. Error Handling

Centralized error handling
No sensitive data exposure
Proper HTTP status codes

🧪 Testing
Manual Testing
bash# Test admin login
curl -X POST http://localhost:5000/api/admin-auth/admin-login \
  -H "Content-Type: application/json" \
  -d '{"email": "admin@test.com", "password": "password123"}'

# Test protected route
curl -X GET http://localhost:5000/api/admin-doctor \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
Automated Testing (Future Enhancement)

Unit tests with Jest
Integration tests with Supertest
Database testing with MongoDB Memory Server

🚀 Deployment
Production Deployment (Render)
This application is deployed on Render at: https://clinic-server-4fu5.onrender.com
Deployment Steps

Build the application

bashnpm run build

Set environment variables in your hosting platform
Deploy to your preferred platform

Render
Heroku
AWS
DigitalOcean



Environment Considerations

Use production MongoDB URI
Set NODE_ENV=production
Configure proper CORS origins
Use strong JWT secret keys

🤝 Contributing

Fork the repository
Create a feature branch (git checkout -b feature/amazing-feature)
Commit your changes (git commit -m 'Add some amazing feature')
Push to the branch (git push origin feature/amazing-feature)
Open a Pull Request

Development Guidelines

Follow ES6+ standards
Use meaningful commit messages
Add comments for complex logic
Update documentation for new features

📝 License
This project is licensed under the MIT License - see the LICENSE file for details.
👨‍💻 Author
Vijayakumar

GitHub: https://github.com/vijayakumar1069

Email:vijay.r20799@gmail.com

🙏 Acknowledgments

Express.js community for excellent documentation
MongoDB team for the robust database solution
JWT.io for authentication standards
All contributors and testers


Made with ❤️ for better healthcare management
