// routes/products.js
const express = require('express');
const Prod = require( "../models/Prod.jsx"); // Mongoose model

const router = express.Router();

// Get product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await Prod.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
