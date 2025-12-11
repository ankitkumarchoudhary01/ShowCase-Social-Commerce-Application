import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from'./routes/auth.cjs';
//import productRoutes from './routes/prods.cjs'

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI_OF, {
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error(err));

// Cloudinary Config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Multer Config
const storage = multer.memoryStorage();
const upload = multer({ storage });

// =======================
// 1️⃣ Define Post Schema
// =======================


const postSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  brandName: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  caption: {
    type: String
  },
  hashtags: {
    type: [String]
  },
  productLink: {
    type: String
  },
  productId: {
    type: Number,
    required: true
  }
});

const brandPost = mongoose.model("Post", postSchema, "brandPostData");

const userPostSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  username: {
    type: String,
    required: true,
    trim: true
  },
  profilePic: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true
  },
  hashtags: {
    type: [String],
    required: true,
  },
  postLink: {
    type: String,
    required: true
  }
});

const UserPost = mongoose.model('UserPost', userPostSchema,"userPostData");

const offerSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true
  },
  code: {
    type: String,
    required: true,
    uppercase: true,
    trim: true
  },
  description: {
    type: String,
    required: true
  },
  validity: {
    type: String,
    required: true
  },
  expiryDate: {
    type: Date,
    required: true
  },
  minCartValue: {
    type: Number,
    required: true,
    min: 0
  },
  conditions: {
    type: String
  },
  category: {
    type: String,
    enum: ['Fashion', 'Electronics', 'All Categories', 'Footwear', 'Grocery', 'Others'],
    default: 'Others'
  },
  type: {
    type: String,
    enum: ['Voucher', 'Bank Offer', 'Combo'],
    required: true
  },
  discountValue: {
    type: Number,
    default: null
  },
  isActive: {
    type: Boolean,
    default: true
  },
  usageLimit: {
    type: Number,
    required: true,
    min: 1
  },
  usedCount: {
    type: Number,
    default: 0,
    min: 0
  },
  platform: {
    type: String,
    enum: ['Web', 'App', 'Both'],
    required: true
  },
  image: {
    type: String,
    required: true
  }
});

const Offer = mongoose.model('Offer', offerSchema,"offers");

const productSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true,
    unique: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  image: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  isTrending: {
    type: Boolean,
    default: false
  },
  rating: {
    type: Number,
    required: true,
    min: 0,
    max: 5
  }
}, { timestamps: true });

const Product = mongoose.model('Product', productSchema,"products");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  bio: {
    type: String,
    default: ''
  },
  location: {
    type: String,
    default: ''
  },
  joinDate: {
    type: String, // stored as "Mar 2024", or you can change to Date type
    required: true
  },
  profilePic: {
    type: String,
    required: true
  },
  stats: {
    orders: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    followers: { type: Number, default: 0 },
    following: { type: Number, default: 0 },
    posts: { type: Number, default: 0 }
  },
  badges: {
    type: [String],
    default: []
  },
  socials: {
    instagram: { type: String, default: '' },
    linkedin: { type: String, default: '' },
    twitter: { type: String, default: '' }
  }
}, { timestamps: true });


const User = mongoose.model('User', userSchema,"user");



// =======================
// 2️⃣ Fetch posts from DB
// =======================
app.get("/api/brandPostData", async (req, res) => {
  try {
    // Read page number from query string (default: 1)
    const page = parseInt(req.query.page) || 1;
    const limit = 4; // number of posts per request

    // Calculate how many documents to skip
    const skip = (page - 1) * limit;

    const posts = await brandPost.find()
      .sort({ createdAt: -1 }) // newest first
      .skip(skip)
      .limit(limit);

    // Count total documents for frontend pagination logic
    const totalPosts = await brandPost.countDocuments();

    res.json({
      posts,
      totalPosts,
      hasMore: skip + posts.length < totalPosts
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});


app.get("/api/userPostData", async (req, res) => {
  try {
    // Read page number from query string (default: 1)
    const page = parseInt(req.query.page) || 1;
    const limit = 4; // number of posts per request

    // Calculate how many documents to skip
    const skip = (page - 1) * limit;

    const posts = await UserPost.find()
      .sort({ createdAt: -1 }) // newest first
      .skip(skip)
      .limit(limit);

    // Count total documents for frontend pagination logic
    const totalPosts = await UserPost.countDocuments();

    res.json({
      posts,
      totalPosts,
      hasMore: skip + posts.length < totalPosts
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

// Get all brand posts without pagination
app.get("/api/offers", async (req, res) => {
  try {
    const posts = await Offer.find().sort({ createdAt: -1 }); // newest first
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

app.get("/api/products", async (req, res) => {
  try {
    // Read page number from query string (default: 1)
    const page = parseInt(req.query.page) || 1;
    const limit = 4; // number of posts per request

    // Calculate how many documents to skip
    const skip = (page - 1) * limit;

    const posts = await Product.find()
      .sort({ createdAt: -1 }) // newest first
      .skip(skip)
      .limit(limit);

    // Count total documents for frontend pagination logic
    const totalPosts = await Product.countDocuments();

    res.json({
      posts,
      totalPosts,
      hasMore: skip + posts.length < totalPosts
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch posts" });
  }
});

app.get("/api/products/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // Find product by ID
    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    console.error(err);

    // If the ID format is invalid, handle the error
    if (err.name === "CastError") {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    res.status(500).json({ error: "Failed to fetch product" });
  }
});


app.get("/api/users/:username", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
    console.log("Profile fetched")
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

import jwt from "jsonwebtoken";

// Middleware to authenticate user
function authenticateToken(req, res, next) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ error: "Access denied" });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = decoded; // decoded contains { id, username, ... }
    next();
  });
}

// Route to get current logged in user's profile
app.get("/api/users/me", authenticateToken, async (req, res) => {
  try {
    const user = await User.findOne(req.user.username)
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


app.use('/api', authRoutes);
//app.use('/api/prod', productRoutes);


app.listen(5000, () => console.log("Server running on http://localhost:5000"));
