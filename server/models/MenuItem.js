const mongoose = require('mongoose');

// This is the BLUEPRINT for a menu item
const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,           // Must be text
        required: true,         // Can't be empty
        trim: true             // Removes extra spaces
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,           // Must be a number
        required: true,
        min: 0                 // Can't be negative
    },
    category: {
        type: String,
        required: true,
        enum: ['originals', 'toppings', 'special offers']  // Only these 3 allowed
    },
    image: {
        type: String,
        default: 'https://via.placeholder.com/300'  // Default image if none provided
    },
    available: {
        type: Boolean,          // true or false
        default: true          // New items are available by default
    },
    popular: {
        type: Boolean,
        default: false         // Mark popular items
    }
}, {
    timestamps: true         // Auto-adds createdAt and updatedAt dates
});

// Export this so other files can use it
module.exports = mongoose.model('MenuItem', menuItemSchema);