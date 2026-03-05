import { useState, useEffect } from 'react';
import { getCart, updateCartItem, removeFromCart } from '../services/api';
import CheckoutModal from './CheckoutModal';


function CartModal({ isOpen, onClose }) {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

    useEffect(() => {
        if (isOpen) {
            fetchCart();
        }
    }, [isOpen]);

    const fetchCart = async () => {
        try {
            setLoading(true);
            const data = await getCart();
            setCart(data);
        } catch (err) {
            console.error('Failed to load cart:', err);
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
        }
    };

    const handleRemoveItem = async (menuItemId) => {
        try {
            const updatedCart = await removeFromCart(menuItemId);
            setCart(updatedCart);
            window.dispatchEvent(new Event('cartUpdated'));
        } catch (err) {
            alert('Failed to remove item');
        }
    };

    const handleCheckout = () => {
        // TODO: Open checkout modal
        setIsCheckoutOpen(true);
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl flex flex-col">
                {/* Header */}
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-2xl font-bold">Your Cart</h2>
                    <button
                        onClick={onClose}
                        className="text-3xl hover:text-gray-600"
                    >
                        ×
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6">
                    {loading ? (
                        <p>Loading...</p>
                    ) : !cart || cart.items.length === 0 ? (
                        <p className="text-center text-gray-500">Your cart is empty</p>
                    ) : (
                        <div className="space-y-4">
                            {cart.items.map(item => (
                                <div key={item.menuItem._id} className="border rounded p-3">
                                    <div className="flex gap-3">
                                        <img
                                            src={item.menuItem.image}
                                            alt={item.menuItem.name}
                                            className="w-20 h-20 object-cover rounded"
                                        />
                                        <div className="flex-1">
                                            <h3 className="font-bold">{item.menuItem.name}</h3>
                                            <p className="text-green-600 font-bold">£{item.price.toFixed(2)}</p>

                                            <div className="flex items-center gap-2 mt-2">
                                                <button
                                                    onClick={() => handleUpdateQuantity(item.menuItem._id, item.quantity - 1)}
                                                    className="bg-gray-200 px-2 rounded"
                                                    disabled={item.quantity <= 1}
                                                >
                                                    -
                                                </button>
                                                <span>{item.quantity}</span>
                                                <button
                                                    onClick={() => handleUpdateQuantity(item.menuItem._id, item.quantity + 1)}
                                                    className="bg-gray-200 px-2 rounded"
                                                >
                                                    +
                                                </button>
                                                <button
                                                    onClick={() => handleRemoveItem(item.menuItem._id)}
                                                    className="ml-auto text-red-500 text-sm"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {cart && cart.items.length > 0 && (
                    <div className="border-t p-6">
                        <div className="flex justify-between text-xl font-bold mb-4">
                            <span>Total:</span>
                            <span>£{cart.totalPrice.toFixed(2)}</span>
                        </div>
                        <button
                            onClick={handleCheckout}
                            className="w-full bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 font-bold"
                        >
                            Checkout
                        </button>
                    </div>
                )}
            </div>

            <CheckoutModal
                isOpen={isCheckoutOpen}
                onClose={() => setIsCheckoutOpen(false)}
                cart={cart}
            />
        </div>
    );
}

export default CartModal;