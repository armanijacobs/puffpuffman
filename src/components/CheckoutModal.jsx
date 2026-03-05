import { useState } from 'react';
import { createOrder } from '../services/api';

function CheckoutModal({ isOpen, onClose, cart }) {
    const [formData, setFormData] = useState({
        customerName: '',
        customerPhone: '',
        customerEmail: '',
        scheduledTime: '',
        orderType: 'pickup',
        specialInstructions: '',
        paymentMethod: 'cash'
    });

    const [loading, setLoading] = useState(false);
    const [orderConfirmation, setOrderConfirmation] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validation
        if (!formData.customerName || !formData.customerPhone || !formData.customerEmail) {
            alert('Please fill in all required fields');
            return;
        }

        if (!formData.scheduledTime) {
            alert('Please select a pickup time');
            return;
        }

        try {
            setLoading(true);

            const orderData = {
                ...formData,
                scheduledTime: new Date(formData.scheduledTime).toISOString()
            };

            const response = await createOrder(orderData);

            // Show confirmation
            setOrderConfirmation(response.order);

            // Generate email content
            const emailSubject = `Order Confirmation - ${response.order.orderNumber}`;
            const emailBody = `
Thank you for your order!

Order Number: ${response.order.orderNumber}
Total: £${response.order.totalPrice.toFixed(2)}
Pickup Time: ${new Date(response.order.scheduledTime).toLocaleString()}

Items:
${response.order.items.map(item => `${item.quantity}x ${item.name} - £${(item.price * item.quantity).toFixed(2)}`).join('\n')}

See you soon at PuffPuffMan!
`;

            // Log for now (later we'll send real email)
            console.log('EMAIL TO:', response.order.customerEmail);
            console.log('SUBJECT:', emailSubject);
            console.log('BODY:', emailBody);

            // Trigger cart update
            window.dispatchEvent(new Event('cartUpdated'));

        } catch (err) {
            console.error('Order creation failed:', err);
            alert('Failed to create order. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleNewOrder = () => {
        setOrderConfirmation(null);
        setFormData({
            customerName: '',
            customerPhone: '',
            customerEmail: '',
            scheduledTime: '',
            orderType: 'pickup',
            specialInstructions: ''
        });
        onClose();
    };

    if (!isOpen) return null;

    // Show confirmation screen if order placed
    if (orderConfirmation) {
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div className="absolute inset-0 bg-black bg-opacity-50" onClick={handleNewOrder} />

                <div className="relative bg-white rounded-lg p-8 max-w-md w-full shadow-2xl">
                    <div className="text-center">
                        <div className="text-6xl mb-4">✅</div>
                        <h2 className="text-3xl font-bold mb-4">Order Confirmed!</h2>

                        <div className="bg-gray-100 rounded-lg p-6 mb-6">
                            <p className="text-sm text-gray-600 mb-2">Your Order Number</p>
                            <p className="text-3xl font-bold text-blue-600 mb-4">
                                {orderConfirmation.orderNumber}
                            </p>

                            <div className="text-left space-y-2 text-sm">
                                <p><strong>Name:</strong> {orderConfirmation.customerName}</p>
                                <p><strong>Phone:</strong> {orderConfirmation.customerPhone}</p>
                                <p><strong>Email:</strong> {orderConfirmation.customerEmail}</p>
                                <p><strong>Pickup Time:</strong> {new Date(orderConfirmation.scheduledTime).toLocaleString()}</p>
                                <p><strong>Total:</strong> £{orderConfirmation.totalPrice.toFixed(2)}</p>
                            </div>
                        </div>

                        <p className="text-gray-600 mb-6">
                            We've sent a confirmation to {orderConfirmation.customerEmail}
                        </p>

                        <button
                            onClick={handleNewOrder}
                            className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 font-bold"
                        >
                            Done
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Show checkout form
    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen p-4">
                <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />

                <div className="relative bg-white rounded-lg w-full max-w-2xl shadow-2xl">
                    {/* Header */}
                    <div className="flex justify-between items-center p-6 border-b">
                        <h2 className="text-2xl font-bold">Checkout</h2>
                        <button onClick={onClose} className="text-3xl hover:text-gray-600">×</button>
                    </div>

                    {/* Order Summary */}
                    <div className="p-6 bg-gray-50 border-b">
                        <h3 className="font-bold mb-3">Order Summary</h3>
                        <div className="space-y-2 text-sm">
                            {cart?.items.map(item => (
                                <div key={item.menuItem._id} className="flex justify-between">
                                    <span>{item.quantity}x {item.menuItem.name}</span>
                                    <span>£{(item.price * item.quantity).toFixed(2)}</span>
                                </div>
                            ))}
                            <div className="border-t pt-2 flex justify-between font-bold text-lg">
                                <span>Total</span>
                                <span>£{cart?.totalPrice.toFixed(2)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Checkout Form */}
                    <form onSubmit={handleSubmit} className="p-6">
                        <div className="space-y-4">
                            {/* Customer Name */}
                            <div>
                                <label className="block text-sm font-bold mb-2">
                                    Name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="text"
                                    name="customerName"
                                    value={formData.customerName}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="John Doe"
                                    required
                                />
                            </div>

                            {/* Phone */}
                            <div>
                                <label className="block text-sm font-bold mb-2">
                                    Phone <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="tel"
                                    name="customerPhone"
                                    value={formData.customerPhone}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="07123456789"
                                    required
                                />
                            </div>

                            {/* Email */}
                            <div>
                                <label className="block text-sm font-bold mb-2">
                                    Email <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="email"
                                    name="customerEmail"
                                    value={formData.customerEmail}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="john@example.com"
                                    required
                                />
                            </div>

                            {/* Order Type */}
                            <div>
                                <label className="block text-sm font-bold mb-2">Order Type</label>
                                <select
                                    name="orderType"
                                    value={formData.orderType}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="pickup">Pickup</option>
                                    <option value="delivery">Delivery</option>
                                </select>
                            </div>

                            {/* Payment Method */}
                            <div>
                                <label className="block text-sm font-bold mb-2">Payment Method</label>
                                <select
                                    name="paymentMethod"
                                    value={formData.paymentMethod}
                                    onChange={handleChange}
                                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="cash">Pay with Cash (on pickup)</option>
                                    <option value="card" disabled>Pay with Card (coming soon)</option>
                                </select>
                            </div>

                            {/* Scheduled Time */}
                            <div>
                                <label className="block text-sm font-bold mb-2">
                                    Pickup Time <span className="text-red-500">*</span>
                                </label>
                                <input
                                    type="datetime-local"
                                    name="scheduledTime"
                                    value={formData.scheduledTime}
                                    onChange={handleChange}
                                    min={new Date().toISOString().slice(0, 16)}
                                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            {/* Special Instructions */}
                            <div>
                                <label className="block text-sm font-bold mb-2">
                                    Special Instructions (Optional)
                                </label>
                                <textarea
                                    name="specialInstructions"
                                    value={formData.specialInstructions}
                                    onChange={handleChange}
                                    rows="3"
                                    className="w-full border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="Extra spicy, no onions, etc."
                                    maxLength="500"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="mt-6 flex gap-4">
                            <button
                                type="button"
                                onClick={onClose}
                                className="flex-1 border border-gray-300 py-3 rounded-lg hover:bg-gray-50 font-bold"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                className="flex-1 bg-green-500 text-white py-3 rounded-lg hover:bg-green-600 font-bold disabled:bg-gray-400"
                            >
                                {loading ? 'Placing Order...' : 'Place Order'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default CheckoutModal;