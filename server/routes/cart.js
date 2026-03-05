const express = require('express');
const router = express.Router();
const Cart = require('../models/Cart');
const MenuItem = require('../models/MenuItem');

// ==========================================
// GET CART by sessionId
// URL: GET /api/cart/:sessionId
// ==========================================
router.get('/:sessionId', async (req, res) => {
    try {
        let cart = await Cart.findOne({ sessionId: req.params.sessionId })
            .populate('items.menuItem');  // Get full menu item details

        if (!cart) {
            // If cart doesn't exist, create empty one
            cart = new Cart({
                sessionId: req.params.sessionId,
                items: []
            });
        }

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching cart', error: error.message });
    }
});

// ==========================================
// ADD ITEM TO CART
// URL: POST /api/cart/:sessionId/add
// Body: { menuItemId, quantity }
// ==========================================
// ==========================================
// ADD ITEM TO CART
// URL: POST /api/cart/:sessionId/add
// Body: { menuItemId, quantity }
// ==========================================
router.post('/:sessionId/add', async (req, res) => {
    try {
        const { menuItemId, quantity } = req.body;

        // Find the menu item
        const menuItem = await MenuItem.findById(menuItemId);
        if (!menuItem) {
            return res.status(404).json({ message: 'Menu item not found' });
        }

        // Find or create cart
        let cart = await Cart.findOne({ sessionId: req.params.sessionId });

        if (!cart) {
            cart = new Cart({
                sessionId: req.params.sessionId,
                items: []
            });
        }

        // Check if item already in cart
        const existingItemIndex = cart.items.findIndex(
            item => item.menuItem.toString() === menuItemId
        );

        if (existingItemIndex > -1) {
            // Item exists, update quantity
            cart.items[existingItemIndex].quantity += quantity || 1;
        } else {
            // New item, add to cart
            cart.items.push({
                menuItem: menuItemId,
                quantity: quantity || 1,
                price: menuItem.price
            });
        }

        // CALCULATE TOTAL MANUALLY
        cart.totalPrice = cart.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);

        await cart.save();

        // Populate and return
        await cart.populate('items.menuItem');
        res.json(cart);

    } catch (error) {
        console.error('Add to cart error:', error);  // ADD THIS for debugging
        res.status(500).json({ message: 'Error adding to cart', error: error.message });
    }
});

// ==========================================
// UPDATE ITEM QUANTITY
// URL: PUT /api/cart/:sessionId/update
// Body: { menuItemId, quantity }
// ==========================================
// ==========================================
// UPDATE ITEM QUANTITY
// URL: PUT /api/cart/:sessionId/update
// Body: { menuItemId, quantity }
// ==========================================
router.put('/:sessionId/update', async (req, res) => {
    try {
        const { menuItemId, quantity } = req.body;

        const cart = await Cart.findOne({ sessionId: req.params.sessionId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const itemIndex = cart.items.findIndex(
            item => item.menuItem.toString() === menuItemId
        );

        if (itemIndex === -1) {
            return res.status(404).json({ message: 'Item not in cart' });
        }

        if (quantity <= 0) {
            // Remove item if quantity is 0 or less
            cart.items.splice(itemIndex, 1);
        } else {
            // Update quantity
            cart.items[itemIndex].quantity = quantity;
        }

        // CALCULATE TOTAL MANUALLY
        cart.totalPrice = cart.items.reduce((total, item) => {
            return total + (item.price * item.quantity);
        }, 0);

        await cart.save();
        await cart.populate('items.menuItem');

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error updating cart', error: error.message });
    }
});

// ==========================================
// REMOVE ITEM FROM CART
// URL: DELETE /api/cart/:sessionId/remove/:menuItemId
// ==========================================
router.delete('/:sessionId/remove/:menuItemId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ sessionId: req.params.sessionId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = cart.items.filter(
            item => item.menuItem.toString() !== req.params.menuItemId
        );

        await cart.save();
        await cart.populate('items.menuItem');

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: 'Error removing item', error: error.message });
    }
});

// ==========================================
// CLEAR CART
// URL: DELETE /api/cart/:sessionId
// ==========================================
router.delete('/:sessionId', async (req, res) => {
    try {
        const cart = await Cart.findOne({ sessionId: req.params.sessionId });
        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        cart.items = [];
        await cart.save();

        res.json({ message: 'Cart cleared', cart });
    } catch (error) {
        res.status(500).json({ message: 'Error clearing cart', error: error.message });
    }
});

module.exports = router;

