const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Cart = require('../models/Cart');

// ==========================================
// CREATE ORDER FROM CART
// URL: POST /api/orders
// Body: { sessionId, customerName, customerPhone, customerEmail, scheduledTime, orderType, deliveryAddress?, specialInstructions? }
// ==========================================
router.post('/', async (req, res) => {
  try {
    const {
      sessionId,
      customerName,
      customerPhone,
      customerEmail,
      scheduledTime,
      orderType,
      deliveryAddress,
      specialInstructions,
      paymentMethod
    } = req.body;

    // Validation
    if (!sessionId || !customerName || !customerPhone || !customerEmail || !scheduledTime) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Get cart
    const cart = await Cart.findOne({ sessionId }).populate('items.menuItem');

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: 'Cart is empty' });
    }

    // Create order items from cart
    const orderItems = cart.items.map(item => ({
      menuItem: item.menuItem._id,
      name: item.menuItem.name,
      price: item.price,
      quantity: item.quantity
    }));

    // GENERATE ORDER NUMBER MANUALLY
    const date = new Date().toISOString().slice(0, 10).replace(/-/g, '');
    const count = await Order.countDocuments();
    const orderNumber = `ORD-${date}-${String(count + 1).padStart(4, '0')}`;

    // Create order
    const order = new Order({
      orderNumber,  // ADD THIS
      customerName,
      customerPhone,
      customerEmail,
      items: orderItems,
      totalPrice: cart.totalPrice,
      orderType: orderType || 'pickup',
      scheduledTime: new Date(scheduledTime),
      deliveryAddress: orderType === 'delivery' ? deliveryAddress : undefined,
      specialInstructions,
      status: 'pending',
      paymentStatus: 'pending',
      paymentMethod: paymentMethod || 'cash'
    });

    await order.save();

    // Clear cart after order is placed
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();

    res.status(201).json({
      message: 'Order created successfully',
      order
    });

  } catch (error) {
    console.error('Order creation error:', error);
    res.status(500).json({ message: 'Error creating order', error: error.message });
  }
});

// ==========================================
// GET ALL ORDERS (for restaurant owner)
// URL: GET /api/orders
// Query params: ?status=pending&limit=50
// ==========================================
router.get('/', async (req, res) => {
  try {
    const { status, limit = 50 } = req.query;

    const query = status ? { status } : {};

    const orders = await Order.find(query)
      .populate('items.menuItem')
      .sort({ createdAt: -1 })  // Newest first
      .limit(parseInt(limit));

    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching orders', error: error.message });
  }
});

// ==========================================
// GET SINGLE ORDER
// URL: GET /api/orders/:orderId
// ==========================================
router.get('/:orderId', async (req, res) => {
  try {
    const order = await Order.findById(req.params.orderId)
      .populate('items.menuItem');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching order', error: error.message });
  }
});

// ==========================================
// UPDATE ORDER STATUS
// URL: PATCH /api/orders/:orderId/status
// Body: { status: 'confirmed' | 'preparing' | 'ready' | 'completed' | 'cancelled' }
// ==========================================
router.patch('/:orderId/status', async (req, res) => {
  try {
    const { status } = req.body;

    const validStatuses = ['pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }

    const order = await Order.findByIdAndUpdate(
      req.params.orderId,
      { status },
      { new: true }  // Return updated document
    ).populate('items.menuItem');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json({ message: 'Order status updated', order });
  } catch (error) {
    res.status(500).json({ message: 'Error updating order', error: error.message });
  }
});

// ==========================================
// GET ORDER BY ORDER NUMBER (for customer lookup)
// URL: GET /api/orders/lookup/:orderNumber
// ==========================================
router.get('/lookup/:orderNumber', async (req, res) => {
  try {
    const order = await Order.findOne({ orderNumber: req.params.orderNumber })
      .populate('items.menuItem');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: 'Error finding order', error: error.message });
  }
});

module.exports = router;