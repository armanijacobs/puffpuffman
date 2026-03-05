const express = require('express');
const router = express.Router();
const MenuItem = require('../models/MenuItem');

// ==========================================
// ROUTE 1: GET ALL MENU ITEMS
// URL: GET /api/menu
// Purpose: Get all available menu items
// ==========================================
router.get('/', async (req, res) => {
    try {
        // Find all items where available = true
        const menuItems = await MenuItem.find({ available: true })
            .sort({ category: 1, name: 1 });  // Sort by category, then name

        res.json(menuItems);  // Send back as JSON
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// ==========================================
// ROUTE 2: GET ITEMS BY CATEGORY
// URL: GET /api/menu/category/mains
// Purpose: Filter menu by category
// ==========================================
router.get('/category/:category', async (req, res) => {
    try {
        const category = req.params.category;  // Get category from URL

        const menuItems = await MenuItem.find({
            category: category,
            available: true
        });

        res.json(menuItems);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// ==========================================
// ROUTE 3: GET POPULAR ITEMS
// URL: GET /api/menu/popular
// Purpose: Get items marked as popular
// ==========================================
router.get('/popular', async (req, res) => {
    try {
        const popularItems = await MenuItem.find({
            popular: true,
            available: true
        });

        res.json(popularItems);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
});

// ==========================================
// ROUTE 4: ADD NEW MENU ITEM
// URL: POST /api/menu
// Purpose: Create a new dish (for testing now, admin later)
// ==========================================
router.post('/', async (req, res) => {
    try {
        // Create new item from request body
        const menuItem = new MenuItem({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: req.body.image,
            popular: req.body.popular || false
        });

        // Save to database
        const savedItem = await menuItem.save();

        res.status(201).json(savedItem);  // 201 = Created successfully
    } catch (error) {
        res.status(400).json({ message: 'Invalid data', error: error.message });
    }
});

module.exports = router;