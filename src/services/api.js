import axios from 'axios';

// Base URL for your backend
const API_BASE_URL = 'https://puffpuffman.onrender.com/api';

// Create axios instance with default config
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// ==========================================
// MENU API CALLS
// ==========================================

// Get all menu items
export const getMenuItems = async () => {
    try {
        const response = await api.get('/menu');
        return response.data;
    } catch (error) {
        console.error('Error fetching menu:', error);
        throw error;
    }
};

// Get menu items by category
export const getMenuByCategory = async (category) => {
    try {
        const response = await api.get(`/menu/category/${category}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching category:', error);
        throw error;
    }
};

// Get popular items
export const getPopularItems = async () => {
    try {
        const response = await api.get('/menu/popular');
        return response.data;
    } catch (error) {
        console.error('Error fetching popular items:', error);
        throw error;
    }
};

// ==========================================
// CART API CALLS
// ==========================================

// Get session ID (or create one)
const getSessionId = () => {
    let sessionId = localStorage.getItem('sessionId');
    if (!sessionId) {
        // Generate random session ID
        sessionId = 'session_' + Math.random().toString(36).substr(2, 9);
        localStorage.setItem('sessionId', sessionId);
    }
    return sessionId;
};

// Get cart
export const getCart = async () => {
    try {
        const sessionId = getSessionId();
        const response = await api.get(`/cart/${sessionId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching cart:', error);
        throw error;
    }
};

// Add item to cart
export const addToCart = async (menuItemId, quantity = 1) => {
    try {
        const sessionId = getSessionId();
        const response = await api.post(`/cart/${sessionId}/add`, {
            menuItemId,
            quantity
        });
        return response.data;
    } catch (error) {
        console.error('Error adding to cart:', error);
        throw error;
    }
};

// Update cart item quantity
export const updateCartItem = async (menuItemId, quantity) => {
    try {
        const sessionId = getSessionId();
        const response = await api.put(`/cart/${sessionId}/update`, {
            menuItemId,
            quantity
        });
        return response.data;
    } catch (error) {
        console.error('Error updating cart:', error);
        throw error;
    }
};

// Remove item from cart
export const removeFromCart = async (menuItemId) => {
    try {
        const sessionId = getSessionId();
        const response = await api.delete(`/cart/${sessionId}/remove/${menuItemId}`);
        return response.data;
    } catch (error) {
        console.error('Error removing from cart:', error);
        throw error;
    }
};

// Clear cart
export const clearCart = async () => {
    try {
        const sessionId = getSessionId();
        const response = await api.delete(`/cart/${sessionId}`);
        return response.data;
    } catch (error) {
        console.error('Error clearing cart:', error);
        throw error;
    }
};


// ==========================================
// ORDER API CALLS
// ==========================================

// Create order from cart
export const createOrder = async (orderData) => {
    try {
        const sessionId = getSessionId();
        const response = await api.post('/orders', {
            ...orderData,
            sessionId
        });
        return response.data;
    } catch (error) {
        console.error('Error creating order:', error);
        throw error;
    }
};

// Get all orders (for admin)
export const getAllOrders = async (status = null) => {
    try {
        const params = status ? { status } : {};
        const response = await api.get('/orders', { params });
        return response.data;
    } catch (error) {
        console.error('Error fetching orders:', error);
        throw error;
    }
};

// Get single order
export const getOrder = async (orderId) => {
    try {
        const response = await api.get(`/orders/${orderId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching order:', error);
        throw error;
    }
};

// Update order status
export const updateOrderStatus = async (orderId, status) => {
    try {
        const response = await api.patch(`/orders/${orderId}/status`, { status });
        return response.data;
    } catch (error) {
        console.error('Error updating order status:', error);
        throw error;
    }
};

// Lookup order by order number
export const lookupOrder = async (orderNumber) => {
    try {
        const response = await api.get(`/orders/lookup/${orderNumber}`);
        return response.data;
    } catch (error) {
        console.error('Error looking up order:', error);
        throw error;
    }
};

export default api;