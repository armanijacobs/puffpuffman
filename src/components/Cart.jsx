import { useState, useEffect } from 'react';
import { getCart, updateCartItem, removeFromCart, clearCart } from '../services/api';
import { Link } from 'react-router-dom';

function Cart() {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch cart when component loads
    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            setLoading(true);
            const data = await getCart();
            setCart(data);
            setError(null);
        } catch (err) {
            setError('Failed to load cart');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateQuantity = async (menuItemId, newQuantity) => {
        try {
            const updatedCart = await updateCartItem(menuItemId, newQuantity);
            setCart(updatedCart);
        } catch (err) {
            alert('Failed to update quantity');
            console.error(err);
        }
    };

    const handleRemoveItem = async (menuItemId) => {
        try {
            const updatedCart = await removeFromCart(menuItemId);
            setCart(updatedCart);
        } catch (err) {
            alert('Failed to remove item');
            console.error(err);
        }
    };

    const handleClearCart = async () => {
        if (!window.confirm('Are you sure you want to clear your cart?')) {
            return;
        }

        try {
            await clearCart();
            fetchCart(); // Refresh cart
        } catch (err) {
            alert('Failed to clear cart');
            console.error(err);
        }
    };

    if (loading) {
        return <div className="container mx-auto p-6 text-center">Loading cart...</div>;
    }

    if (error) {
        return <div className="container mx-auto p-6 text-center text-red-500">{error}</div>;
    }

    if (!cart || cart.items.length === 0) {
        return (
            <div className="container mx-auto p-6 text-center">
                <h2 className="text-3xl font-bold mb-4">Your Cart is Empty</h2>
                <p className="text-gray-600 mb-8">Add some delicious items from our menu!</p>
                <Link
                    to="/menu"
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition"
                >
                    Browse Menu
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-4xl font-bold">Your Cart</h1>
                <button
                    onClick={handleClearCart}
                    className="text-red-500 hover:text-red-700 underline"
                >
                    Clear Cart
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-4">
                    {cart.items.map((item) => (
                        <div
                            key={item.menuItem._id}
                            className="border rounded-lg p-4 flex items-center gap-4"
                        >
                            {/* Item Image */}
                            <img
                                src={item.menuItem.image}
                                alt={item.menuItem.name}
                                className="w-24 h-24 object-cover rounded"
                            />

                            {/* Item Details */}
                            <div className="flex-grow">
                                <h3 className="text-xl font-bold">{item.menuItem.name}</h3>
                                <p className="text-gray-600 text-sm">{item.menuItem.description}</p>
                                <p className="text-lg font-bold text-green-600 mt-2">
                                    £{item.price.toFixed(2)}
                                </p>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handleUpdateQuantity(item.menuItem._id, item.quantity - 1)}
                                    className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition"
                                    disabled={item.quantity <= 1}
                                >
                                    -
                                </button>
                                <span className="px-4 py-1 border rounded">{item.quantity}</span>
                                <button
                                    onClick={() => handleUpdateQuantity(item.menuItem._id, item.quantity + 1)}
                                    className="bg-gray-200 px-3 py-1 rounded hover:bg-gray-300 transition"
                                >
                                    +
                                </button>
                            </div>

                            {/* Item Total */}
                            <div className="text-right">
                                <p className="text-lg font-bold">
                                    £{(item.price * item.quantity).toFixed(2)}
                                </p>
                                <button
                                    onClick={() => handleRemoveItem(item.menuItem._id)}
                                    className="text-red-500 hover:text-red-700 text-sm mt-2"
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="lg:col-span-1">
                    <div className="border rounded-lg p-6 sticky top-6">
                        <h2 className="text-2xl font-bold mb-4">Order Summary</h2>

                        <div className="space-y-2 mb-4">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>£{cart.totalPrice.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-sm text-gray-600">
                                <span>Delivery</span>
                                <span>Calculated at checkout</span>
                            </div>
                        </div>

                        <div className="border-t pt-4 mb-6">
                            <div className="flex justify-between text-xl font-bold">
                                <span>Total</span>
                                <span>£{cart.totalPrice.toFixed(2)}</span>
                            </div>
                        </div>

                        <Link
                            to="/checkout"
                            className="block w-full bg-green-500 text-white text-center py-3 rounded-lg hover:bg-green-600 transition font-bold"
                        >
                            Proceed to Checkout
                        </Link>

                        <Link
                            to="/menu"
                            className="block w-full text-center mt-4 text-blue-500 hover:underline"
                        >
                            Continue Shopping
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;