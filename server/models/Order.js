const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
    menuItem: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'MenuItem',
        required: true
    },
    name: String,
    price: Number,
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
});

const orderSchema = new mongoose.Schema({
    orderNumber: {
        type: String,
        required: true,
        unique: true
    },
    customerName: {
        type: String,
        required: true,
        trim: true
    },
    customerPhone: {
        type: String,
        required: true
    },
    customerEmail: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    items: [orderItemSchema],
    totalPrice: {
        type: Number,
        required: true,
        min: 0
    },
    orderType: {
        type: String,
        enum: ['pickup', 'delivery'],
        required: true,
        default: 'pickup'
    },
    scheduledTime: {
        type: Date,
        required: true
    },
    deliveryAddress: {
        street: String,
        city: String,
        postcode: String,
        notes: String
    },
    status: {
        type: String,
        enum: ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'],
        default: 'pending'
    },
    specialInstructions: {
        type: String,
        maxLength: 500
    },
    paymentStatus: {
        type: String,
        enum: ['pending', 'paid', 'failed'],
        default: 'pending'
    },
    paymentMethod: {
        type: String,
        enum: ['card', 'cash', 'pending'],
        default: 'pending'
    }
}, {
    timestamps: true
});

// NO PRE-SAVE HOOK - we'll generate orderNumber manually in route

module.exports = mongoose.model('Order', orderSchema);