# 🛍️ ShowCase - Social Commerce Platform

<div align="center">


**Discover Products Through Social Content**

[![Made with React](https://img.shields.io/badge/React-19. 1.0-61DAFB?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=node. js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb)](https://www.mongodb.com/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-v4-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[Report Bug](https://github.com/ankitkumarchoudhary01/ShowCase/issues) · [Request Feature](https://github.com/ankitkumarchoudhary01/ShowCase/issues)

</div>

---

## 📋 Table of Contents

- [About the Project](#about-the-project)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Database Schema](#database-schema)
- [Usage](#usage)


---

## 🎯 About the Project

**ShowCase** is a modern full-stack social commerce platform that bridges the gap between social media engagement and e-commerce.  By merging influencer marketing with product discovery, ShowCase enables users to explore products through engaging brand and user-generated content, creating a seamless shopping experience. 

### 💡 Problem Statement

Traditional e-commerce lacks the engagement and trust that comes from social proof and influencer recommendations. Users want to: 
- Discover products through authentic content
- See real user experiences and reviews
- Access exclusive deals and offers
- Follow their favorite brands and influencers

### ✨ Solution

ShowCase provides an integrated platform where:
- **Brands** can post sponsored content with direct product links
- **Users** share authentic product experiences with their community
- **Shoppers** discover products through engaging social feeds
- **Everyone** benefits from exclusive offers and promotions

---

## 🚀 Features

### 🎨 Frontend Features
- ✅ **Dual Feed System**: Separate brand-sponsored and user-generated content streams
- ✅ **Product Discovery**: Browse trending products with ratings and detailed views
- ✅ **Infinite Scrolling**: Server-side pagination for seamless browsing
- ✅ **Dynamic Offers**: Real-time promotional deals with validity tracking
- ✅ **User Profiles**: Complete profile system with social stats and badges
- ✅ **Responsive Design**: Mobile-first UI built with TailwindCSS v4
- ✅ **Hashtag Support**: Content discovery through trending hashtags
- ✅ **Search & Filter**: Advanced filtering by category, type, and price range

### 🔧 Backend Features
- ✅ **RESTful API**: 15+ endpoints with comprehensive CRUD operations
- ✅ **JWT Authentication**: Secure user sessions with token-based auth
- ✅ **Password Encryption**:  Bcrypt hashing for secure credential storage
- ✅ **File Upload**: Cloudinary integration for optimized media management
- ✅ **Pagination**: Server-side pagination reducing load times
- ✅ **Data Validation**: Mongoose schema validation and sanitization
- ✅ **Error Handling**: Centralized error handling with meaningful responses
- ✅ **CORS Enabled**: Cross-origin resource sharing for frontend integration

### 🔐 Security Features
- 🔒 JWT token authentication
- 🔒 Protected routes middleware
- 🔒 Password hashing with bcrypt
- 🔒 Input validation and sanitization
- 🔒 Environment-based configuration
- 🔒 Secure cookie handling

---

## 🛠️ Tech Stack

### Frontend
![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=for-the-badge&logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7. 0.3-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4.1.11-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![React Router](https://img.shields.io/badge/React_Router-7.6.3-CA4245?style=for-the-badge&logo=react-router&logoColor=white)

### Backend
![Node.js](https://img.shields.io/badge/Node.js-LTS-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.1.0-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-6.18.0-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Mongoose](https://img.shields.io/badge/Mongoose-8.17.1-880000?style=for-the-badge&logo=mongoose&logoColor=white)

### Additional Technologies
- **Authentication**: JSON Web Tokens (JWT), Bcrypt
- **Media Storage**: Cloudinary CDN
- **File Upload**: Multer
- **HTTP Client**: Axios
- **Development**:  ESLint, Vite HMR
- **Package Manager**: npm

---

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  React 19 + Vite + TailwindCSS + React Router        │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ↓ HTTP/HTTPS (Axios)
┌─────────────────────────────────────────────────────────────┐
│                      Application Layer                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │         Express. js REST API (15+ Endpoints)          │   │
│  │  • Authentication Middleware (JWT)                   │   │
│  │  • CORS Configuration                                │   │
│  │  • Multer File Upload                                │   │
│  │  • Error Handling                                    │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ↓ Mongoose ODM
┌─────────────────────────────────────────────────────────────┐
│                       Database Layer                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │                    MongoDB Atlas                      │   │
│  │  • brandPostData     • userPostData                  │   │
│  │  • products          • offers                        │   │
│  │  • user              • reviews                       │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                              │
                              ↓ CDN Upload
┌─��───────────────────────────────────────────────────────────┐
│                      External Services                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │            Cloudinary (Media Storage)                │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher) - [Download](https://nodejs.org/)
- **npm** (v9 or higher) - Comes with Node.js
- **MongoDB** (v6 or higher) - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Git** - [Download](https://git-scm.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/ankitkumarchoudhary01/ShowCase.git
   cd ShowCase
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory: 
   ```bash
   touch .env
   ```
   
   Add the following variables (see [Environment Variables](#environment-variables) section):
   ```env
   MONGODB_URI_OF=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   PORT=5000
   ```

4. **Start MongoDB** (if running locally)
   ```bash
   mongod
   ```

5. **Run the application**

   **Development mode (with hot reload):**
   ```bash
   # Terminal 1 - Start backend server
   node server.js
   
   # Terminal 2 - Start frontend dev server
   npm run dev
   ```
   
   **Production build:**
   ```bash
   npm run build
   npm run preview
   ```

6. **Access the application**
   - Frontend:  http://localhost:5173
   - Backend API: http://localhost:5000

---

## 🔐 Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# MongoDB Configuration
MONGODB_URI_OF=mongodb://localhost:27017/showcase
# Or for MongoDB Atlas: 
# MONGODB_URI_OF=mongodb+srv://<username>:<password>@cluster. mongodb.net/showcase

# JWT Secret Key (generate a random secure string)
JWT_SECRET=your_super_secret_jwt_key_minimum_32_characters

# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Server Configuration
PORT=5000
NODE_ENV=development
```

### How to Get Credentials: 

**MongoDB Atlas:**
1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Click "Connect" → "Connect your application"
4. Copy the connection string

**Cloudinary:**
1. Sign up at [Cloudinary](https://cloudinary.com/)
2. Go to Dashboard
3. Copy Cloud Name, API Key, and API Secret

**JWT Secret:**
Generate a secure random string:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /api/register
Content-Type: application/json

{
  "name": "John Doe",
  "username": "johndoe",
  "email": "john@example. com",
  "password": "SecurePass123"
}
```

#### Login
```http
POST /api/login
Content-Type: application/json

{
  "username": "johndoe",
  "password": "SecurePass123"
}

Response:
{
  "token":  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.. .",
  "user": { ... }
}
```

### Brand Posts Endpoints

#### Get Brand Posts (Paginated)
```http
GET /api/brandPostData? page=1
Authorization: Bearer <token>

Response:
{
  "posts": [... ],
  "totalPosts": 50,
  "hasMore": true
}
```

#### Create Brand Post
```http
POST /api/brandPostData
Authorization:  Bearer <token>
Content-Type: multipart/form-data

{
  "brandName": "Nike",
  "caption": "New Air Max Release! ",
  "hashtags": ["#nike", "#airmax"],
  "productLink": "https://example.com/product",
  "productId": 123,
  "image": <file>
}
```

### User Posts Endpoints

#### Get User Posts (Paginated)
```http
GET /api/userPostData?page=1
Authorization:  Bearer <token>
```

#### Create User Post
```http
POST /api/userPostData
Authorization: Bearer <token>
Content-Type: multipart/form-data

{
  "caption": "Love this product!",
  "hashtags": ["#review", "#authentic"],
  "image": <file>
}
```

### Products Endpoints

#### Get All Products
```http
GET /api/products? page=1&limit=10
```

#### Get Product by ID
```http
GET /api/products/: id
```

### Offers Endpoints

#### Get All Offers
```http
GET /api/offers
```

#### Filter Offers by Category
```http
GET /api/offers?category=Fashion&type=Voucher
```

### User Profile Endpoints

#### Get User Profile
```http
GET /api/users/: username
```

#### Get Current User
```http
GET /api/users/me
Authorization: Bearer <token>
```

#### Update User Profile
```http
PUT /api/users/: username
Authorization: Bearer <token>
Content-Type: application/json

{
  "bio": "Fashion enthusiast",
  "location": "New York",
  "socials": {
    "instagram": "@johndoe",
    "twitter":  "@johndoe"
  }
}
```

---

## 🗄️ Database Schema

### User Schema
```javascript
{
  name: String (required),
  username: String (required, unique),
  bio: String,
  location: String,
  joinDate: String,
  profilePic: String (required),
  stats: {
    orders: Number,
    likes: Number,
    reviews: Number,
    followers: Number,
    following: Number,
    posts: Number
  },
  badges: [String],
  socials: {
    instagram: String,
    linkedin: String,
    twitter: String
  }
}
```

### Brand Post Schema
```javascript
{
  id: Number (required, unique),
  brandName: String (required),
  imageUrl: String (required),
  caption: String,
  hashtags: [String],
  productLink: String,
  productId: Number (required)
}
```

### User Post Schema
```javascript
{
  id: Number (required, unique),
  username: String (required),
  profilePic: String (required),
  imageUrl: String (required),
  caption: String (required),
  hashtags: [String] (required),
  postLink: String (required)
}
```

### Product Schema
```javascript
{
  id: Number (required, unique),
  name: String (required),
  brand: String (required),
  image: String (required),
  price: Number (required, min: 0),
  isTrending: Boolean,
  rating: Number (required, min: 0, max: 5),
  timestamps: true
}
```

### Offer Schema
```javascript
{
  id: Number (required, unique),
  title: String (required),
  code: String (required, uppercase),
  description: String (required),
  validity: String (required),
  expiryDate: Date (required),
  minCartValue: Number (required),
  conditions: String,
  category:  Enum ['Fashion', 'Electronics', 'All Categories', 'Footwear', 'Grocery', 'Others'],
  type: Enum ['Voucher', 'Bank Offer', 'Combo'],
  discountValue: Number,
  isActive: Boolean,
  usageLimit: Number (required),
  usedCount: Number,
  platform: Enum ['Web', 'App', 'Both'],
  image: String (required)
}
```

---

## 💻 Usage

### Running the Application

1. **Start the Backend Server**
   ```bash
   node server.js
   ```
   Server will run on:  http://localhost:5000

2. **Start the Frontend Development Server**
   ```bash
   npm run dev
   ```
   App will run on: http://localhost:5173

### Development Workflow

1. **Frontend Development**
   - Components are in `/src/components`
   - Pages are in `/src/pages`
   - Vite provides hot module replacement (HMR)
   - TailwindCSS classes for styling

2. **Backend Development**
   - API routes are in `/routes`
   - Models are in `/models`
   - Middleware in `/middleware`
   - Server configuration in `server.js`

3. **Testing API Endpoints**
   
   Use tools like: 
   - **Postman**:  [Download](https://www.postman.com/)
   - **Thunder Client** (VS Code Extension)
   - **cURL** commands

   Example cURL request:
   ```bash
   curl -X GET http://localhost:5000/api/products \
     -H "Authorization: Bearer YOUR_JWT_TOKEN"
   ```

---


<div align="center">

### ⭐ Star this repository if you find it helpful!

Made with ❤️ by [Ankit Kumar Choudhary](https://github.com/ankitkumarchoudhary01)

[Back to Top](#-showcase---social-commerce-platform)

</div>
